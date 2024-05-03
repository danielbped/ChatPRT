import { Conversation } from "../../interfaces/conversation-data.interface"

export type ActionConversationType = {
  type: string,
  payload: {
    conversations: Conversation[],
    conversation: string
  }
}

export const GET_CONVERSATIONS = 'GET_CONVERSATIONS'
export const SET_CONVERSATION = 'SET_CONVERSATION'