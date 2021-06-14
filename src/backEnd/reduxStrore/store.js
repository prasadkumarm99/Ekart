import { createStore, combineReducers } from "redux"

const getStore = () => {
  const store = createStore(
    combineReducers({
      users: userReducer,
      products: productReducer,
      cart: cartReducer
    })
  )
}


/*
const user = {
  first_name: "",
  last_name: "",
  email: "",
  password: ""
}

const product = {
  name: "",
  image: "",
  price: 0,
  variants: "",
  stock: 0,
  description: ""
}

const cart = []
*/