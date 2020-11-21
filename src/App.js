import React from "react"
import { Provider } from "react-redux"

import "antd/dist/antd.css"
import "./App.css"

import Layout from "./layouts"
import Loading from "./components/Loading"

import store from "./store"

const App = () => {
  return <Provider store={store}>
    <div style={{ padding: 8, height: "100vh" }}>
      <Loading />
      <Layout />
    </div>
  </Provider>
}

export default App
