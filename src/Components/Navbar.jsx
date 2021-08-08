import React, { Component } from "react"
import { Navbar, Container, NavbarBrand, Nav, NavDropdown } from "react-bootstrap"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { onLogout } from "../Config/Redux/Actions"

class NavbarBS extends Component {
  render() {
    return (
      <>
        {this.props.email ? (
          <Navbar bg="light" expand="lg">
            <Container>
              <Navbar.Brand href="#home">Shoes Shop</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ms-auto">
                  {this.props.cart.length !== 0 ? (
                    <Nav.Link as={Link} to="/cart">
                      Cart
                    </Nav.Link>
                  ) : null}
                  <NavDropdown title={this.props.email} id="basic-nav-dropdown">
                    {this.props.cart.length !== 0 ? (
                      <NavDropdown.Item as={Link} to="/cart">
                        Cart
                      </NavDropdown.Item>
                    ) : null}
                    <NavDropdown.Item as={Link} to="/history">
                      Transaction
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={this.props.onLogout}>Log Out</NavDropdown.Item>
                  </NavDropdown>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        ) : (
          <Navbar bg="light" expand="lg">
            <Container>
              <Navbar.Brand href="#home">Shoes Shop</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ms-auto">
                  <Nav.Link as={Link} to="/login">
                    Login
                  </Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        )}
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  email: state.userReducer.email,
  cart: state.userReducer.cart,
})

export default connect(mapStateToProps, { onLogout })(NavbarBS)
