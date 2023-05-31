import React, { lazy, Suspense } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { AppTheme, NavBar, NavBarLink, NavBarThemeSwitch, LoaderBar } from "react-windows-ui";
import Img from "@/assets/mountain.jpg";
import Introduce from './pages/Introduce'

const Lottery = lazy(() => import("./pages/Lottery"))

const SuspenseLoading: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (<Suspense fallback={<LoaderBar
    isLoading={true}
  />} children={children} />)
}

const App: React.FC = () => {
  return (
    <Router basename={'/'}>
      <AppTheme // To make app reactive with theme
        scheme="system" // Available props - 'light', 'dark' or 'system'
      />

      <NavBar
        title="Web Tools"
        shadowOnScroll={true}
        titleBarMobile={<span className="app-navbar-name">Web Tools</span>}
      >
        <NavBarThemeSwitch />
        <NavBarLink
          to="/"
          exact={true}
          text="Introduce"
          imgSrc={Img}
        />

        <h1>Tools</h1>
        <div className="app-hr"></div>

        <NavBarLink
          to="/lottery"
          text="Lottery"
          icon={<i className="icons10-emoji-smile"></i>}
        />

      </NavBar>

      <Routes>
        <Route path="/" element={<Introduce />} />
        <Route path="/lottery" element={<SuspenseLoading><Lottery /></SuspenseLoading>} />
      </Routes>

    </Router>
  )
}

export default App;