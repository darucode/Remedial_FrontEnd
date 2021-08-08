import axios from "axios"
import React, { Component } from "react"
import { Card, Col, Container, Row, Button } from "react-bootstrap"
import { connect } from "react-redux"
import { Redirect } from "react-router-dom"
import CartModal from "../Components/CartModal"
import ErrModal from "../Components/ErrModal"
import NavbarBS from "../Components/Navbar"
import { addCart, getUserCart } from "../Config/Redux/Actions/transactionAction"

class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {
      product: [],
      showModal: [false, "", ""],
      toLogin: false,
      onCart: [],
      showCart: false,
      qty: 1,
    }
  }

  async componentDidMount() {
    getUserCart()
    const resProduct = await axios.get(`http://localhost:2000/products`)
    this.setState({ product: resProduct.data })
  }

  onAddCartDetail = (product) => {
    if (!this.props.email)
      return this.setState({
        showModal: [
          true,
          "Error!",
          "Silahkan login dulu sebelum menambahkan product ke keranjang!",
        ],
      })
    return this.setState({ onCart: product, showCart: true })
  }

  onAddCart = () => {
    let addCartProduct = { ...this.state.onCart }
    addCartProduct.qty = this.state.qty
    this.props.addCart(this.props.idUser, addCartProduct)
    this.setState({ onCart: [], showCart: false, qty: 1 })
  }

  onChangeQty = (type) => {
    switch (type) {
      case "+":
        if (this.state.qty >= this.state.onCart.stock) {
          return alert("Barang yang ditambahkan sudah melebihi stok")
        } else {
          return this.setState((prevState) => ({
            qty: prevState.qty + 1,
          }))
        }
      case "-":
        return this.setState((prevState) => ({
          qty: prevState.qty - 1,
        }))
      default:
        return
    }
  }

  closeCart = () => {
    this.setState({ onCart: [], showCart: false, qty: 1 })
  }

  buttonModal = () => {
    return this.setState({ toLogin: true })
  }

  closeModal = () => {
    return this.setState({ showModal: [false, "", ""] })
  }

  render() {
    if (this.state.toLogin) {
      return <Redirect to="/login" />
    }
    return (
      <div>
        <NavbarBS />
        <Container>
          <Row xs={1} md={2} className="g-4">
            {this.state.product.map((product) => (
              <Col>
                <Card>
                  <Card.Img variant="top" src={product.img} style={{ height: 300 }} />
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-center">
                      <Card.Title>{product.name}</Card.Title>
                      <Card.Text className="d-flex flex-column justify-content-between">
                        <p>Price : {product.price}</p>
                        <p>Stock : {product.stock}</p>
                      </Card.Text>
                      <Button variant="warning" onClick={() => this.onAddCartDetail(product)}>
                        Add To Cart
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
        <ErrModal
          show={this.state.showModal}
          handleClose={this.closeModal}
          handleOk={this.buttonModal}
        />
        <CartModal
          product={this.state.onCart}
          show={this.state.showCart}
          handleClose={this.closeCart}
          onChangeQty={this.onChangeQty}
          qty={this.state.qty}
          onAddCart={this.onAddCart}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  idUser: state.userReducer.id,
  email: state.userReducer.email,
  cart: state.userReducer.cart,
})

export default connect(mapStateToProps, { addCart, getUserCart })(Home)
