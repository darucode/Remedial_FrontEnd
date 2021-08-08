import React, { Component } from "react"
import { Button, Container, Table } from "react-bootstrap"
import axios from "axios"
import { connect } from "react-redux"
import { onCancelCheckout, getTransaction } from "../Config/Redux/Actions/transactionAction"

class History extends Component {
  componentDidMount() {
    this.props.getTransaction()
  }

  render() {
    return (
      <div>
        <Container>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID Transaksi</th>
                <th>Nama Produk</th>
                <th>Quantity</th>
                <th>Status Pembayaran</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {this.props.transaction.map((item) => {
                return (
                  <tr>
                    <td>{item.id}</td>
                    <td>
                      {item.history.map((item2) => {
                        return (
                          <>
                            <p>{item2.name}</p>
                          </>
                        )
                      })}
                    </td>
                    <td>
                      {item.history.map((item2) => {
                        return (
                          <>
                            <p>{item2.qty}</p>
                          </>
                        )
                      })}
                    </td>
                    <td>{item.status}</td>
                    <td>
                      <Button onClick={() => this.props.onCancelCheckout(item.id)}>
                        Batalkan Transaksi
                      </Button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </Table>
        </Container>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  transaction: state.userReducer.transaction,
})

export default connect(mapStateToProps, { onCancelCheckout, getTransaction })(History)
