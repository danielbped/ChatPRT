import { formatDate } from "../../helpers/handleDate"
import { ResponseInterface } from "../../interfaces/components.interface"
import { StyledResponse, StyledResponseContent, StyledResponseTime, StyledResponseSection } from "./styles"

const Response = (props: ResponseInterface) => {
  return (
    <StyledResponse>
      <StyledResponseSection>
        <StyledResponseContent>
          { props.message.response }
          </StyledResponseContent>
        <StyledResponseTime>{formatDate(props.message.createdAt)}</StyledResponseTime>
      </StyledResponseSection>
    </StyledResponse>
  )
}

export default Response