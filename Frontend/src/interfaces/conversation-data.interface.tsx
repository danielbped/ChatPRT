import { LoginResponse } from "./login-data.interface"
import { Message } from "./message-data.interface"
import { User } from "./user-data.interface"

export interface Conversation {
  id: string
  user: User
  messages: Message[]
  createdAt: Date
  updatedAt: Date
}

export interface ConversationResponse {
  data: Conversation[]
}

export interface NewConversationData {
  user: string, token: LoginResponse | null
}

export interface DeleteConversationData {
  conversation: string, token: LoginResponse | null
}

export interface ConversationData extends Conversation {}