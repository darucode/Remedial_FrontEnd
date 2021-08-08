import React, { Component } from "react"
import { Button, Container, Form } from "react-bootstrap"
import { connect } from "react-redux"
import { Redirect } from "react-router-dom"
import { isLength, isEmail, isInt } from "validator"
import { onLogin as login } from "../Config/Redux/Actions/userAction"

class Login extends Component {
  onLogin = (e) => {
    e.preventDefault()
    let email = this.refs.email.value
    let password = this.refs.password.value
    let alphabet = /[^A-Za-z]/
    let number = /[^0-9]/

    if (!isEmail(email)) {
      return alert("Mohon masukkan email yang valid!")
    }

    if (!isLength(password, { min: 6 }) || !number.test(password) || !alphabet.test(password)) {
      return alert("Password minimal 6 karakter dan mengandung angka!")
    }

    const newUser = {
      email,
      password,
      cart: [],
    }

    this.props.login(newUser)
  }

  render() {
    if (this.props.email) {
      return <Redirect to="/" />
    }
    return (
      <div>
        <Container>
          <Form className="position-absolute top-50 start-50 translate-middle w-25">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" ref="email" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" ref="password" />
            </Form.Group>

            <div className="d-flex justify-content-center">
              <Button variant="primary" type="submit" onClick={(e) => this.onLogin(e)}>
                Login
              </Button>
            </div>
          </Form>
        </Container>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  email: state.userReducer.email,
})

export default connect(mapStateToProps, { login })(Login)
