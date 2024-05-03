import { Conversation } from '../../interfaces/conversation-data.interface'
import ConversationItem from '../Conversation'
import { StyledConversationList, StyledImage, StyledNewConversationButton, StyledIconSection, StyledLogoSection, StyledNoMessages } from './styles'
import { useSelector } from "react-redux"
import { ConversationListInterface } from '../../interfaces/components.interface'
import useNewConversationMutate from '../../hooks/useNewConversationMutate'
import useDeleteConversationMutate from '../../hooks/useDeleteConversationMutate'
import { LoginResponse } from '../../interfaces/login-data.interface'
import { useLocalStorage } from "@uidotdev/usehooks"
import useConversationData from '../../hooks/useConversationData'
import Loading from '../Loading'
import PrismaImage from '../../assets/prisma.png'
import { BsChatLeftText } from "react-icons/bs"

const ConversationList = (props: ConversationListInterface) => {
  const user = useSelector((rootReducer: any) => rootReducer.userReducer)
  const [token, _setToken] = useLocalStorage<LoginResponse | null>("token", null)
  const sortData = (data: Conversation[]) => data.sort((a, b) => new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf())

  const newConversation = useNewConversationMutate()
  const deleteConversation = useDeleteConversationMutate()
  const { data, isLoading } = useConversationData(user.id, token)

  const handleNewConversation = () => {
    newConversation.mutate({
      user: user.id,
      token
    })
  }

  const handleDeleteConversation = (id: string) => {
    deleteConversation.mutate({
      conversation: id,
      token
    })
  }

  return (
    <StyledConversationList>
      <StyledNewConversationButton onClick={ () => handleNewConversation() }>
        <StyledLogoSection>
          <StyledImage src={ PrismaImage } alt="Logo do ChatPRT"/>
          Nova conversa
        </StyledLogoSection>
        <StyledIconSection>
          <BsChatLeftText />
        </StyledIconSection>
      </StyledNewConversationButton>
      { isLoading && <Loading /> }
      { 
        !data || data.length === 0
        && <StyledNoMessages>Nenhuma conversa iniciada</StyledNoMessages>
      }
      {
        data
        && data.length > 0
        && sortData(data).map((conversation) => (
          <ConversationItem
            key={ conversation.id }
            conversation={conversation}
            handleClick={ handleDeleteConversation }
            { ...props }
          />
        ))
      }
    </StyledConversationList>
  )
}

export default ConversationList