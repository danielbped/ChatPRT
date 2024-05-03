import { MessagesSectionInterface } from "../../interfaces/components.interface"
import * as Messages from "../../interfaces/message-data.interface"
import Message from "../Message"
import Response from "../Response"
import { StyledMessageSection, StyledNoConversationSelected } from "./styles"

const MessageSection = (props: MessagesSectionInterface) => {
  const sortData = (data: Messages.Message[]) => data.sort((a, b) => new Date(a.createdAt).valueOf() - new Date(b.createdAt).valueOf())

  return (
    <StyledMessageSection>
      { !props.conversation && <StyledNoConversationSelected>Nenhuma conversa selecionada.</StyledNoConversationSelected> }
      { props.conversation && sortData(props.conversation.messages).map((message) => (
        <div key={ message.id }>
          <Message message={ message } />
          <Response message={ message } />
        </div>
      ))}
    </StyledMessageSection>
  )
}

export default MessageSection