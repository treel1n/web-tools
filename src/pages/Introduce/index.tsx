import { NavPageContainer, Button } from "react-windows-ui";
import appInstaller from '../../utils/install'
import type { FC } from 'react'

const Introduce: FC = () => {
  const installHandle = () => {
    appInstaller.install()
  }

  return (
    <NavPageContainer animateTransition={true} hasPadding={true}>
      <h1>Web Tool</h1>
      <p>持续更新中...</p>
      <div className="app-hr"></div>
      <p>作为一个渐进式web应用，你可以下载下来离线使用它。</p>
      <Button
        type="primary"
        onClick={installHandle}
        value="Install"
        icon={<i className="icons10-download-2"></i>}
      />
    </NavPageContainer>
      
  )
}

export default Introduce