const INITIAL_STATE = {
  id: null,
  email: "",
  password: "",
  cart: [],
  redirectHome: false,
  transaction: [],
}

export const userReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case "LOGIN":
      return {
        ...state,
        id: payload.id,
        email: payload.email,
        password: payload.password,
        cart: payload.cart,
        redirectHome: true,
      }
    case "REGISTER":
      return {
        ...state,
        id: payload.id,
        email: payload.email,
        password: payload.password,
        cart: payload.cart,
        redirectHome: true,
      }
    case "GET_TRANS":
      console.log(payload)
      return {
        ...state,
        transaction: payload,
      }
    case "DELETE_TRANS":
      return {
        ...state,
        transaction: [],
      }
    case "LOGOUT":
      return INITIAL_STATE
    default:
      return state
  }
}
