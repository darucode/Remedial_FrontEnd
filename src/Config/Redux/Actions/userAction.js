import axios from "axios"

const URL_API = `http://localhost:2000/users`

export const onLogin = (data) => {
  return async (dispatch) => {
    const { email, password } = data
    const checkUser = await axios.get(`${URL_API}?email=${email}&password${password}`)
    if (checkUser.data.length === 0) {
      const registerUser = await axios.post(`${URL_API}`, data)
      localStorage.setItem("idUsers", registerUser.data.id)
      return dispatch({
        type: "REGISTER",
        payload: registerUser.data,
      })
    }
    localStorage.setItem("idUsers", checkUser.data[0].id)
    return dispatch({
      type: "LOGIN",
      payload: checkUser.data[0],
    })
  }
}

export const keepLogin = () => {
  return async (dispatch) => {
    const idUser = localStorage.getItem("idUsers")
    if (idUser) {
      const getUser = await axios.get(`${URL_API}?id=${idUser}`)
      return dispatch({
        type: "LOGIN",
        payload: getUser.data[0],
      })
    }
  }
}

export const onLogout = () => {
  return async (dispatch) => {
    const idUser = localStorage.removeItem("idUsers")
    return dispatch({
      type: "LOGOUT"
    })
  }
}