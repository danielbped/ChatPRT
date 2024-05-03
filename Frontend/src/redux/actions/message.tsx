import { ActionMessageType, GET_MESSAGES } from '../actionTypes/message'

export const getMessages = (action: ActionMessageType): ActionMessageType => {
  return {
    type: GET_MESSAGES,
    payload: action.payload
  }
}