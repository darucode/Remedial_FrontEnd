import React, { Component } from "react"
import { connect } from "react-redux"
import { BrowserRouter as Router, Route } from "react-router-dom"
import Home from "./Pages/Home"
import Login from "./Pages/Login"
import { keepLogin } from "./Config/Redux/Actions/userAction"
import Cart from "./Pages/Cart"
import History from "./Pages/History"

class App extends Component {
  componentDidMount() {
    this.props.keepLogin()
  }

  render() {
    return (
      <Router>
        <Route path="/" exact component={Home} />
        <Route path="/login" exact component={Login} />
        <Route path="/cart" exact component={Cart} />
        <Route path="/history" exact component={History} />
      </Router>
    )
  }
}

export default connect(null, { keepLogin })(App)
