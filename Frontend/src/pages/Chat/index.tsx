import { useEffect, useState } from "react"
import useConversationData from "../../hooks/useConversationData"
import { LoginResponse } from "../../interfaces/login-data.interface"
import { StyledChat, RightSection } from "./styles"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { useLocalStorage } from "@uidotdev/usehooks"
import SideBar from "../../components/SideBar"
import { useDispatch } from "react-redux"
import { SET_CONVERSATION } from "../../redux/actionTypes/conversation"
import { Conversation } from "../../interfaces/conversation-data.interface"
import MessageSection from "../../components/MessagesSection"
import ChatSection from "../../components/ChatSection"

const Chat = () => {
  const [token, setToken] = useLocalStorage<LoginResponse | null>("token", null)
  const [selectedConversation, setSelectedConversation] = useState<Conversation | undefined | null>(null)
  const user = useSelector((rootReducer: any) => rootReducer.userReducer)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { data } = useConversationData(user.id, token)

  const handleConversation = (conversation: Conversation) => setSelectedConversation(conversation)

  useEffect(() => {
    if (data && data.length && selectedConversation) {
      setSelectedConversation(data?.find((item) => item.id === selectedConversation?.id))
    }
  }, [selectedConversation?.id, data])

  useEffect(() => {
    dispatch({
      type: SET_CONVERSATION,
      payload: {
        conversation: selectedConversation
      }
    })
  }, [selectedConversation?.id])

  useEffect(() => {
    if (user.id === '') {
      setToken(null)
      navigate('/login')
    }
  }, [user.id])

  return (
    <StyledChat>
      <SideBar setConversation={ handleConversation } />
      <RightSection>
        <MessageSection conversation={ selectedConversation } />
        <ChatSection conversation={ selectedConversation } />
      </RightSection>
    </StyledChat>
  )
}

export default Chat