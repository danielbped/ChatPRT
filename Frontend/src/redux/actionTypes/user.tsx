import { User } from "../../interfaces/user-data.interface"

export type ActionUserType = {
  type: string,
  payload: User
}

export const GET_USER = 'GET_USER'
export const LOGOUT = 'LOGOUT'