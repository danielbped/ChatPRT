export const mockConversationsList = [
  {
    id: 'MOCK_ID',
    createdAt: new Date(),
    updatedAt: new Date(),
    user: {
      id: 'MOCK_USER_ID',
      firstName: 'MOCK_FIRST_NAME',
      lastName: 'MOCK_LAST_NAME',
      email: 'MOCK_EMAIL@EMAIL.COM',
      password: 'MOCK_PASSWORD',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    messages: [{
      id: 'MOCK_MESSAGE_ID',
      content: 'MOCK_CONTENT',
      response: 'MOCK_RESPONSE',
      conversation: {
        id: 'MOCK_ID',
        createdAt: new Date(),
        updatedAt: new Date(),
        user: {
          id: 'MOCK_USER_ID',
          firstName: 'MOCK_FIRST_NAME',
          lastName: 'MOCK_LAST_NAME',
          email: 'MOCK_EMAIL@EMAIL.COM',
          password: 'MOCK_PASSWORD',
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    }]
  },
  {
    id: 'MOCK_ID',
    createdAt: new Date(),
    updatedAt: new Date(),
    user: {
      id: 'MOCK_USER_ID',
      firstName: 'MOCK_FIRST_NAME',
      lastName: 'MOCK_LAST_NAME',
      email: 'MOCK_EMAIL@EMAIL.COM',
      password: 'MOCK_PASSWORD',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    messages: []
  },
]

export const mockUserId = 'MOCK_USER_ID'

export const mockConversationId = 'MOCK_CONVERSATION_ID'

export const mockHealthResponse = {
  message: "OK"
}

export const mockNewConversation = {
  user: {
    id: 'MOCK_USER_ID',
    firstName: 'MOCK_FIRST_NAME',
    lastName: 'MOCK_LAST_NAME',
    email: 'MOCK_EMAIL@EMAIL.COM',
    password: 'MOCK_PASSWORD',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
}

export const mockContent = 'MOCK_CONTENT'

export const mockResponse = 'MOCK_RESPONSE'

export const mockMessage = {
  id: 'MOCK_MESSAGE_ID',
  content: mockContent,
  response: mockResponse,
  conversation: mockConversationsList[0],
}

export const mockNewMessage = {
  content: mockContent,
  conversation: mockConversationsList[0],
}
export const mockWrongEmail = 'MOCK_WRONG_EMAIL'
export const mockWrongName = 'M'
export const mockWrongPassword = 'M'
export const mockNewUser = {
  firstName: 'MOCK_FIRST_NAME',
  lastName: 'MOCK_LAST_NAME',
  email: 'MOCK_EMAIL@EMAIL.COM',
  password: 'MOCK_PASSWORD',
}

export const mockUser = {
  ...mockNewUser,
  createdAt: new Date(),
  updatedAt: new Date(),
  id: mockUserId,
}

export const mockLogin = {
  email: 'MOCK_EMAIL@EMAIL.COM',
  password: 'MOCK_PASSWORD',
}

export const mockCreateUserResponse = {
  token: 'MOCK_TOKEN',
  user: {
    id: 'MOCK_USER_ID',
    firstName: 'MOCK_FIRST_NAME',
    lastName: 'MOCK_LAST_NAME',
    email: 'MOCK_EMAIL@EMAIL.COM',
  },
}

export const mockLoginResponse = {
  token: 'MOCK_TOKEN',
  user: {
    id: 'MOCK_USER_ID',
    firstName: 'MOCK_FIRST_NAME',
    lastName: 'MOCK_LAST_NAME',
    email: 'MOCK_EMAIL@EMAIL.COM',
    createdAt: new Date(),
    updatedAt: new Date()
  },
}

export const mockInvalidToken = 'Bearer'

export const mockValidToken = 'Bearer token'

export const mockCreateConversationResponse = {
  user: {
    id: 'MOCK_USER_ID',
    firstName: 'MOCK_FIRST_NAME',
    lastName: 'MOCK_LAST_NAME',
    email: 'MOCK_EMAIL@EMAIL.COM',
    password: 'MOCK_PASSWORD',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  id: 'MOCK_CONVERSATION_ID'
}