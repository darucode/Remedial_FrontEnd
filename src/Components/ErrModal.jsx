import React, { Component } from "react"
import { Button, Modal } from "react-bootstrap"

export default class ErrModal extends Component {
  render() {
    return (
      <>
        <Modal
          show={this.props.show[0]}
          onHide={this.props.handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>{this.props.show[1]}</Modal.Title>
          </Modal.Header>
          <Modal.Body>{this.props.show[2]}</Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={this.props.handleOk}>
              Ok
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    )
  }
}
