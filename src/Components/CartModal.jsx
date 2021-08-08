import React, { Component } from "react"
import { Button, FormControl, InputGroup, Modal } from "react-bootstrap"

export default class CartModal extends Component {
  render() {
    return (
      <>
        <Modal
          show={this.props.show}
          onHide={this.props.handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>{this.props.product.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Mohon input jumlah barang yang ingin dibeli!</p>
            <InputGroup>
              <FormControl
                value={this.props.qty}
                min={1}
                max={this.props.product.stock}
                onChange={(e) => this.props.handleChange(e)}
              />
              <Button
                variant="outline-secondary"
                onClick={() => this.props.onChangeQty("-")}
                disabled={this.props.qty === 1 ? true : false}
              >
                -
              </Button>
              <Button variant="outline-secondary" onClick={() => this.props.onChangeQty("+")}>
                +
              </Button>
            </InputGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={this.props.onAddCart}>
              Add To Cart
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    )
  }
}
