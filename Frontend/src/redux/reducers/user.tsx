import { ActionUserType, GET_USER } from '../actionTypes/user'

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  id: ''
}

const userReducer = (state = initialState, action: ActionUserType) => {
  switch (action.type) {
    case GET_USER:
      return {
        ...state,
        firstName: action.payload.firstName,
        id: action.payload.id,
        lastName: action.payload.lastName,
        email: action.payload.email,
      }
    default:
      return state
  }
}

export default userReducer