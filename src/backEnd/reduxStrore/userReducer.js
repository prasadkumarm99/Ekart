// User Reducer

defaultUserState = {
  first_name: "",
  last_name: "",
  email: "",
  password: ""
}

const userReducer = (user = defaultUserState, action) => {
  switch(action.type) {
    case 'REGISTER':
      return {}
    default:
      return state
  }
}