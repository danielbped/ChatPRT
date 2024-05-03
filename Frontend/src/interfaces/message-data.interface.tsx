import { Conversation } from "./conversation-data.interface"

export interface Message {
  content: string
  response: string
  conversation: Conversation
  id: string
  createdAt: string
  updatedAt: string
}

export interface MessageResponse {
  data: Message[]
}

export interface MessageData extends Message {}