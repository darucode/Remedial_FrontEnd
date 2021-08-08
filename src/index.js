import React from "react"
import ReactDOM from "react-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import "./index.css"
import App from "./App"
import { createStore, applyMiddleware } from "redux"
import { Provider } from "react-redux"
import ReduxThunk from "redux-thunk"
import allReducers from "./Config/Redux/Reducers"

const globalStore = createStore(allReducers, applyMiddleware(ReduxThunk))

ReactDOM.render(
  <Provider store={globalStore}>
    <App />
  </Provider>,
  document.getElementById("root")
)
