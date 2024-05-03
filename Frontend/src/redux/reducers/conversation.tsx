import { GET_CONVERSATIONS, ActionConversationType, SET_CONVERSATION } from '../actionTypes/conversation'

const initialState = {
  data: [],
  conversation: null,
}

const userReducer = (state = initialState, action: ActionConversationType) => {
  switch (action.type) {
    case GET_CONVERSATIONS:
      return{ 
        ...state,
        data: action.payload.conversations
      }
    case SET_CONVERSATION:
      return{ 
        ...state,
        conversation: action.payload.conversation
      }
    default:
      return state
  }
}

export default userReducer