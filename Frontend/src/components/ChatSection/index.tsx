import { useState, useEffect } from 'react'
import { StyledChatSection, StyledChatSectionInput } from "./styles"
import useMessageMutate from '../../hooks/useMessageMutate'
import { useLocalStorage } from "@uidotdev/usehooks"
import { LoginResponse } from '../../interfaces/login-data.interface'
import { useSelector } from "react-redux"
import { Conversation } from '../../interfaces/conversation-data.interface'
import { ChatSectionInterface } from '../../interfaces/components.interface'

const ChatSection = (props: ChatSectionInterface) => {
  const [token, _setToken] = useLocalStorage<LoginResponse | null>("token", null)
  const conversation: Conversation = useSelector((rootReducer: any) => rootReducer.conversationReducer).conversation
  const [text, setText] = useState<string>('')

  const { mutate,  isSuccess, isPending } = useMessageMutate()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setText(value)
  }

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleClick()
    }
  }

  const handleClick = () => {
    !isPending && mutate({
      conversation: conversation.id,
      content: text,
      token
    })
  }

  useEffect(() => {
    if (isSuccess) {
      setText('')
    }
  }, [isSuccess])

  return (
    <StyledChatSection>
      {props.conversation && <>
        <StyledChatSectionInput
          type="text"
          name="message"
          placeholder="Como está o dia hoje?"
          value={text}
          onKeyDown={ handleKeyPress }
          onChange={handleChange}
          disabled={ isPending }
        />
      </>}
    </StyledChatSection>
  )
}

export default ChatSection
