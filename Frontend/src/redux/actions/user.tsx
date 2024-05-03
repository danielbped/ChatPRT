import { GET_USER, LOGOUT, ActionUserType } from '../actionTypes/user'

export const getUser = (action: ActionUserType): ActionUserType => {
  return {
    type: GET_USER,
    payload: action.payload
  }
}

export const logout = (): ActionUserType => {
  return {
    type: LOGOUT,
    payload: {
      firstName: '',
      lastName: '',
      id: '',
      email: ''
    },
  }
}