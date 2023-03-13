import { useState, useMemo } from "react";
import {
  NavPageContainer,
  Button,
  InputText,
  ListItem,
  Checkbox,
  TableView,
} from "react-windows-ui";
import DB from "../../utils/db";
import { fmtDate } from "../../utils/common";
import type { StoresMap } from "../../utils/db";

type CodeResult = {
  target: string;
  type: string;
  code: string;
  create_time: string;
};

const Code = () => {
  const [mobile, setMobile] = useState("");
  const [getting, setGetting] = useState(false);
  const [target, setTarget] = useState("");
  const [saveToHistory, setSaveToHistory] = useState(true);
  const [mobiles, setMobiles] = useState<StoresMap["Code"][]>([]);
  const [result, setResult] = useState<CodeResult[]>([]);

  const setToHistoryChange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    setSaveToHistory(target.checked);
  };

  useMemo(async () => {
    const mbs = await DB.getData("Code");
    setMobiles(mbs);
  }, []);

  const deleteMobile = async (id: number) => {
    await DB.deleteData("Code", id);
    setMobiles(mobiles.filter((item) => item.id !== id));
  };

  const copyHandle = async (code: string) => {
    await navigator.clipboard.writeText(code);
  };

  const getCode = async (m?: string) => {
    if (!mobile && !m) return;
    if (getting) return;
    setGetting(true);
    const target = m || mobile;
    try {
      const res = await fetch("//code.oraybeta.com/codes", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({
          target,
        }),
      });
      const codes = await res.json();
      setResult(codes);
      setTarget(target);
      if (!saveToHistory || m) {
        return setGetting(false);
      }
      await DB.addData("Code", { mobile });
      setMobiles(mobiles.concat({ mobile, id: Date.now() }));
      setGetting(false);
    } catch (e) {
      console.error(e);
      setGetting(false);
    }
  };

  return (
    <NavPageContainer animateTransition={true} hasPadding={true}>
      <h1>Code</h1>
      <p>获取测试环境验证码</p>
      <div className="app-hr"></div>
      <InputText
        value={mobile}
        onChange={(e: Event) => setMobile((e.target as HTMLInputElement).value)}
        placeholder="输入需要获取验证码的手机号码"
      />
      <Button
        style={{ marginLeft: 10 }}
        type="primary"
        isLoading={getting}
        onClick={() => getCode()}
        value="Get"
      />
      <p></p>
      <Checkbox
        onChange={setToHistoryChange}
        defaultChecked={saveToHistory}
        tooltip="Save to history"
        label="Save to history"
      />
      <div style={{ display: mobiles.length ? "block" : "none" }}>
        <p>Get from history</p>
        <div className="app-mt-10">
          {mobiles.map((item) => (
            <div key={item.id}>
              <ListItem
                title={
                  <span className="icons10-iphone" style={{ fontSize: 20 }}>
                    {item.mobile}
                  </span>
                }
                ItemEndComponent={
                  <div className="flex-align-center">
                    <Button
                      type="primary"
                      isLoading={getting}
                      onClick={() => {
                        getCode(item.mobile);
                      }}
                      value="Get"
                    />
                    <Button
                      style={{ marginLeft: 10 }}
                      icon={<i className="icons10-trash"></i>}
                      value=""
                      onClick={() => deleteMobile(item.id)}
                    />
                  </div>
                }
              />
            </div>
          ))}
        </div>
      </div>

      <p>
        Result：<span className="color-success">{target}</span>
      </p>
      {result.length ? (
        <TableView
          columns={[
            { title: "mobile", showSortIcon: false },
            { title: "time", showSortIcon: false },
            { title: "type", showSortIcon: false },
            { title: "action", showSortIcon: false },
          ]}
          rows={result.map((item) => [
            item.target,
            fmtDate(new Date(item.create_time)),
            item.code,
            <>
              <Button
                style={{ margin: 10 }}
                onClick={() => copyHandle(item.code)}
                value=""
                icon={<i className="icons10-copy"></i>}
              />
            </>,
          ])}
        />
      ) : null}
    </NavPageContainer>
  );
};

export default Code;
