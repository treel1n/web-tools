import { useState, useMemo } from 'react'
import { NavPageContainer, Button, InputText, TextArea, Select, Dialog, Alert } from "react-windows-ui";
import styles from './index.module.less'
import DB from '../../utils/db'
import type { StoresMap } from '../../utils/db'

const Lottery = () => {
  const [memo, setMemo] = useState('')
  const [inputValue, setInputValue] = useState('')
  const [reward, setReward] = useState('Ready')
  const [history, setHistory] = useState<StoresMap['Lottery'][]>([])
  const [showResult, setShowResult] = useState(false)
  const [showSaveHistoryAlert, setshowSaveHistoryAlert] = useState(false)
  const [showEmptyAlert, setShowEmptyAlert] = useState(false)
  const [raffle, setRaffle] = useState(false)
  const [historySelect, setHistorySelect] = useState<number|string>()
  const [timer, setTimer] = useState<NodeJS.Timer>()

  useMemo(async () => {
    const res = await DB.getData('Lottery')
    setHistory(res)
    // if (res.length) {
    //   const selectValue = res[0].id
    //   setHistorySelect(selectValue)
    // }
    res.length && onHistorySelect(res[0].id, res)
  }, [])

  const parseFromInput = () => {
    const p = inputValue.trim().split('\n')
    return p.map(item => item.trim()).filter(item => !!item)
  }

  const start = () => {
    if (raffle) return
    const options = parseFromInput()
    const optionsLength = options.length
    if (!optionsLength) return setShowEmptyAlert(true)
    setRaffle(true)
    const t = setInterval(() => {
      const random = ~~(Math.random() * optionsLength)
      setReward(options[random])
    }, 20)
    setTimer(t)
  }
  const stop = () => {
    clearInterval(timer)
    setTimer(undefined)
    const options = parseFromInput()
    const optionsLength = options.length
    for (let i = 1; i <= 10; i++) {
      (function (j) {
        setTimeout(() => {
          const random = ~~(Math.random() * optionsLength)
          setReward(options[random])
          if (j === 10) {
            setShowResult(true)
            setRaffle(false)
          }
        }, j * j * 15);
      })(i);
    }
  }

  const saveToHistory  = async () => {
    if (!memo) return setshowSaveHistoryAlert(true)
    const options = parseFromInput()
    if (!options.length) return setShowEmptyAlert(true)
    const inHistory = history.find(item => item.memo === memo)
    if (inHistory) {
      const data = {
        memo,
        options,
        id: inHistory.id
      }
      await DB.updateData('Lottery', data)
      setHistory(history.map(item => {
        if (item.id !== inHistory.id) return item
        return data
      }))
      return
    }
    const data = {
      memo,
      options
    }
    await DB.addData('Lottery', {
      memo,
      options
    })
    setHistory(history.concat({
      id: Date.now(),
      ...data
    }))
  }

  const onHistorySelect = (id: number|string, h = history) => {
    const target = h.find(item => item.id === id)
    setInputValue(target!.options.join('\n'))
    setHistorySelect(id)
  }

  return (
    <NavPageContainer animateTransition={true} hasPadding={true}>
      <h1>Lottery</h1>
      <p>抽奖小工具</p>
      <div className="app-hr"></div>
      
      <div className={styles.lotteryConfigWarpper}>
        <TextArea
          value={inputValue}
          style={{ minWidth: '520px', minHeight: '200px' }}
          onChange={(e: Event) => setInputValue((e.target as HTMLInputElement).value)}
          placeholder={'一等奖\n二等奖\n三等奖'}
        />
        <div className={styles.lotteryConfigOperate}>
          <Button
            type="primary"
            onClick={raffle ? stop : start}
            value={raffle  ? 'Stop' : 'Start'}
            isLoading={raffle && !timer}
          />
          <InputText
            value={memo}
            onChange={(e: Event) => setMemo((e.target as HTMLInputElement).value)}
            placeholder="保存的备注名称一致则替换"
          />
          <Button
            style={{ marginTop: 10 }}
            type="primary"
            onClick={saveToHistory}
            value="Save to history"
          />
          {history.length ? <>
            <h5>Select from history</h5>
            <Select
              defaultValue={historySelect}
              onChange={onHistorySelect}
              data={history.map(item => ({
                label: item.memo,
                value: item.id
              }))}
            />
          </> : null}
          
        </div>
      </div>
      <div className="app-section-container-fg app-mt-20">
        <div className={[styles.lotteryBoard, styles.lotteryOverflow].join(' ')}>
          {reward}
        </div>
      </div>

      <Dialog
        isVisible={showResult}
        onBackdropPress={() => setShowResult(false)}>
          <Dialog.Body style={{padding: 15}}>
            <h2 className="app-m-0">Congratulate</h2>
            <p className={styles.lotteryOverflow}>{reward}</p>  
            <div style={{display: "flex", justifyContent: "flex-end"}}>
              <Button
                value="Ok"
                type="primary"
                onClick={() => setShowResult(false)}
              />
            </div>
          </Dialog.Body>
      </Dialog>

      <Alert
        isVisible={showSaveHistoryAlert}
        onBackdropPress={() => setshowSaveHistoryAlert(false)}
        title="Alert"
        message="请输入备注">
          <Alert.Footer>
            <Button
              type="primary"
              value="Ok"
              onClick={() => setshowSaveHistoryAlert(false)}
            />
          </Alert.Footer>
      </Alert>
      <Alert
        isVisible={showEmptyAlert}
        onBackdropPress={() => setShowEmptyAlert(false)}
        title="Alert"
        message="请输入抽奖内容">
          <Alert.Footer>
            <Button
              type="primary"
              value="Ok"
              onClick={() => setShowEmptyAlert(false)}
            />
          </Alert.Footer>
      </Alert>
    </NavPageContainer>
  )
}

export default Lottery