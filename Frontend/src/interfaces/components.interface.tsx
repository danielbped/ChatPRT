import { MouseEventHandler } from "react"
import { ChangeEventHandler } from "react"
import { Conversation } from "./conversation-data.interface"
import { Message } from "./message-data.interface"

export interface MessagesSectionInterface {
  conversation?: Conversation | null
}

export interface ChatSectionInterface {
  conversation?: Conversation | null
}

export interface MessageInterface {
  message: Message
}

export interface ResponseInterface {
  message: Message
}

export interface SideBarInterface {
  setConversation: (conversation: Conversation) => void
}

export interface RegisterFormInterface {
  handleRegister: ChangeEventHandler<HTMLInputElement>
  handleNavigate: (route: string) => void
  submit: () => void
  isError: boolean
  error: string
  disabledButton: boolean
}

export interface MessageListInterface {
  conversations: Message[]
}

export interface ConversationInterface {
  conversation: Conversation
  handleClick: (id: string) => void
  setConversation: (conversation: Conversation) => void
}

export interface ConversationListInterface {
  setConversation: (conversation: Conversation) => void
}

export interface InputProps {
  type: string
  name: string
  placeholder: string
  title: string
  onChange: ChangeEventHandler<HTMLInputElement>
  onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void
}

export interface ButtonProps {
  title: string
  onClick: MouseEventHandler<HTMLButtonElement>
  disabled?: boolean
}

export interface ErrorMessageProps {
  message: string
}

export interface LoginFormInterface {
  handleLogin: ChangeEventHandler<HTMLInputElement>
  handleNavigate: (route: string) => void
  submit: () => void
  isError: boolean
  error: string
  handleKeyPress: (event: React.KeyboardEvent<HTMLInputElement>) => void
}