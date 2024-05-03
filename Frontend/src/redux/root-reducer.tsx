import { combineReducers } from 'redux'

import userReducer from './reducers/user'
import conversationReducer from './reducers/conversation'
import messageReducer from './reducers/message'

const rootReducer = combineReducers({
  userReducer,
  conversationReducer,
  messageReducer
})

export default rootReducer