import React, { Component } from "react"
import { Button, Container, Table } from "react-bootstrap"
import { connect } from "react-redux"
import CartModal from "../Components/CartModal"
import ErrModal from "../Components/ErrModal"
import { getUserCart, delCart, addCart, onCheckOut } from "../Config/Redux/Actions"

class Cart extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showModal: false,
      showModalErr: [false, "", ""],
      checkOutModal: [false, "", ""],
      onCart: [],
      qty: null,
    }
  }

  componentDidMount() {
    getUserCart()
  }

  onEdit = (product) => {
    this.setState({ showModal: true, onCart: product, qty: product.qty })
  }

  closeCart = () => {
    this.setState({ showModal: false })
  }

  onChangeQty = (type) => {
    switch (type) {
      case "+":
        if (this.state.qty >= this.state.onCart.stock) {
          return this.setState({
            showModalErr: [true, "Error!", "Barang yang ditambahkan sudah melebihi stok"],
          })
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

  onAddCart = () => {
    let addCartProduct = { ...this.state.onCart }
    addCartProduct.qty = this.state.qty
    this.props.addCart(this.props.idUser, addCartProduct)
    this.setState({ onCart: [], showModal: false, qty: null })
  }

  closeModal = () => {
    return this.setState({ showModalErr: [false, "", ""] })
  }

  closeCheckOutModal = () => {
    return this.setState({ checkOutModal: [false, "", ""] })
  }

  onCheckOut = () => {
    return this.setState({
      checkOutModal: [true, "Cart", "Mau lanjut ke checkout?"],
    })
  }

  buttonModal = () => {
    this.setState({ checkOutModal: [false, "", ""] })
    this.props.onCheckOut()
  }

  render() {
    return (
      <div>
        <Container>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>No</th>
                <th>Nama Product</th>
                <th>Quantity</th>
                <th colSpan={3}>Action</th>
              </tr>
            </thead>
            <tbody>
              {this.props.cart.map((item, index) => {
                return (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.qty}</td>
                    <td>
                      <Button onClick={() => this.onEdit(item)}>Edit</Button>
                    </td>
                    <td>
                      <Button onClick={() => this.props.delCart(item.id)}>Delete</Button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </Table>
          <Button onClick={this.onCheckOut}>Check Out</Button>
        </Container>
        <CartModal
          product={this.state.onCart}
          show={this.state.showModal}
          handleClose={this.closeCart}
          onChangeQty={this.onChangeQty}
          qty={this.state.qty}
          onAddCart={this.onAddCart}
        />
        <ErrModal
          show={this.state.showModalErr}
          handleClose={this.closeModal}
          handleOk={this.closeModal}
        />
        <ErrModal
          show={this.state.checkOutModal}
          handleClose={this.closeCheckOutModal}
          handleOk={this.buttonModal}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  cart: state.userReducer.cart,
  idUser: state.userReducer.id,
})

export default connect(mapStateToProps, { getUserCart, delCart, addCart, onCheckOut })(Cart)
