import { Message } from "../../interfaces/message-data.interface"

export type ActionMessageType = {
  type: string,
  payload: Message[]
}

export const GET_MESSAGES = 'GET_MESSAGES'