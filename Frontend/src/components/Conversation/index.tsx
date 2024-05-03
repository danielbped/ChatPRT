import { useState } from 'react'
import { ConversationInterface } from '../../interfaces/components.interface'
import { StyledConversation, StyledTextConversation, StyledRemoveButton } from './styles'
import { MdDelete } from "react-icons/md"

const Conversation = (props: ConversationInterface) => {
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false)

  const handleDelete = (id: string) => {
    if (confirmDelete) {
      return props.handleClick(id)
    }
    
    setConfirmDelete(true)
    setTimeout(() => setConfirmDelete(false), 2000)
  }

  const handleTextSize = (props: ConversationInterface) => {
    const text = props.conversation.messages[props.conversation.messages.length - 1].response;
    return text.length > 20 ? text.slice(0, 20) + '...' : text
  }

  return (
    <StyledConversation onClick={ () => props.setConversation(props.conversation) }>
      { props.conversation.messages.length
        ? <StyledTextConversation>{ handleTextSize(props) }</StyledTextConversation>
        : <StyledTextConversation>Conversa vazia</StyledTextConversation>
      }
      <StyledRemoveButton
        onClick={ () => handleDelete(props.conversation.id) }
        $confirmDelete={ confirmDelete }
      >
        <MdDelete />
      </StyledRemoveButton>
    </StyledConversation>
  )
}

export default Conversation