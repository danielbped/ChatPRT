import { User } from "./user-data.interface"

interface LoginToken {
  token: string
  user: User
}

export interface LoginResponse {
  data: LoginToken
}

export interface LoginData {
  email?: string
  password?: string
}