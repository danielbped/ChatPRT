interface RegisterToken {
  data: string
}

export interface RegisterResponse {
  data: RegisterToken
}

export interface RegisterData {
  email?: string
  password?: string
  firstName?: string
  lastName?: string
  confirmPassword?: string
}
