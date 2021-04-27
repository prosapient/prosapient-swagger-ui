import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import { load } from "./fontawesome-loader"

load()

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
)
