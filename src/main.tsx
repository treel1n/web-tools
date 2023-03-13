import React from 'react'
import ReactDOM from 'react-dom/client'
import "react-windows-ui/config/app-config.css";
import "react-windows-ui/dist/react-windows-ui-11.min.css";
import "react-windows-ui/icons/fonts/fonts.min.css";
import App from "./App";
import "./index.css"
import swRegister from './utils/swRegister';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
swRegister()
