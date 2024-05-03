import { ActionConversationType, GET_CONVERSATIONS } from '../actionTypes/conversation'

export const getConversations = (action: ActionConversationType): ActionConversationType => {
  return {
    type: GET_CONVERSATIONS,
    payload: action.payload
  }
}