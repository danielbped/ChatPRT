import { formatDate } from "../../helpers/handleDate"
import { MessageInterface } from "../../interfaces/components.interface"
import { StyledMessage, StyledMessageContent, StyledMessageTime, StyledMessageSection } from "./styles"

const Message = (props: MessageInterface) => {
  return (
    <StyledMessage>
      <StyledMessageSection>
        <StyledMessageContent>{ props.message.content }</StyledMessageContent>
        <StyledMessageTime>{formatDate(props.message.createdAt)}</StyledMessageTime>
      </StyledMessageSection>
    </StyledMessage>
  )
}

export default Message