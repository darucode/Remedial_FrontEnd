import axios from "axios"
const TRANSACTION_API = `http://localhost:2000/transactions`
const USERS_API = `http://localhost:2000/users`
const PRODUCTS_API = `http://localhost:2000/products`

export const getUserCart = () => {
  return async (dispatch) => {
    const id = localStorage.getItem("idUsers")
    const res = await axios.get(`${USERS_API}/${id}`)
    return dispatch({
      type: "LOGIN",
      payload: res.data,
    })
  }
}

export const getTransaction = () => {
  return async (dispatch) => {
    const idUser = localStorage.getItem("idUsers")
    const res = await axios.get(`http://localhost:2000/transactions?idUsers=${idUser}`)
    return dispatch({
      type: "GET_TRANS",
      payload: res.data,
    })
  }
}

export const addCart = (id, product) => {
  return async (dispatch) => {
    // check Cart
    const getUserCart = await axios.get(`${USERS_API}/${id}`)
    const { cart } = getUserCart.data
    const checkProduct = cart.filter((item) => {
      return item.id === product.id
    })
    if (checkProduct.length) {
      cart.forEach((item) => {
        // if (item.id === product.id) return (item.qty += product.qty)
        if (item.id === product.id) {
          if (item.qty >= product.qty) {
            return (item.qty = product.qty)
          } else {
            return (item.qty = product.qty)
          }
        }
      })
    } else {
      cart.push(product)
    }
    const res = await axios.patch(`${USERS_API}/${id}`, { cart })
    return dispatch({
      type: "LOGIN",
      payload: res.data,
    })
  }
}

export const delCart = (idProduct) => {
  return async (dispatch) => {
    const id = localStorage.getItem("idUsers")
    const getUserCart = await axios.get(`${USERS_API}/${id}`)
    const { cart } = getUserCart.data
    const newCart = cart.filter((item) => {
      return item.id !== idProduct
    })
    const res = await axios.patch(`${USERS_API}/${id}`, { cart: newCart })
    return dispatch({
      type: "LOGIN",
      payload: res.data,
    })
  }
}

export const onCheckOut = () => {
  return async (dispatch) => {
    const id = +localStorage.getItem("idUsers")
    const getUserCart = await axios.get(`${USERS_API}/${id}`)
    const { cart } = getUserCart.data
    const getProducts = await axios.get(`${PRODUCTS_API}`)
    const newProducts = [...getProducts.data]
    cart.forEach((item) => {
      newProducts.forEach(async (product) => {
        if (product.id === item.id) {
          let stock = (product.stock -= item.qty)
          await axios.patch(`${PRODUCTS_API}/${product.id}`, { stock })
        }
      })
    })
    // const updateStock = await axios.put(`${PRODUCTS_API}`, newProducts)
    const updateHistory = await axios.post(`${TRANSACTION_API}`, {
      history: cart,
      idUsers: id,
      status: "Belum Dibayar",
    })
    const updateCartUser = await axios.patch(`${USERS_API}/${id}`, { cart: [] })
    updateCartUser.transaction = updateHistory.data
    return dispatch({
      type: "LOGIN",
      payload: updateCartUser.data,
    })
  }
}

export const onCancelCheckout = (id) => {
  return async (dispatch) => {
    const getTrans = await axios.get(`${TRANSACTION_API}/${id}`)
    const getProducts = await axios.get(`${PRODUCTS_API}`)
    const { history } = getTrans.data
    const newProducts = [...getProducts.data]
    history.forEach((item) => {
      newProducts.forEach(async (product) => {
        if (product.id === item.id) {
          let stock = (product.stock += item.qty)
          await axios.patch(`${PRODUCTS_API}/${product.id}`, { stock })
        }
      })
    })
    const delTrans = await axios.delete(`${TRANSACTION_API}/${id}`)
    return dispatch({
      type: "DELETE_TRANS",
    })
  }
}
