import { GET_MESSAGES, ActionMessageType } from '../actionTypes/message'

const initialState = {
  data: []
}

const userReducer = (state = initialState, action: ActionMessageType) => {
  switch (action.type) {
    case GET_MESSAGES:
      return{ 
        ...state,
        data: action.payload
      }
    default:
      return state
  }
}

export default userReducer