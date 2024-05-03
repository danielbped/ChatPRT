import { ErrorMessageProps } from "../../interfaces/components.interface"
import { StyledErrorMessage } from "./styles"

const ErrorMessage = (props: ErrorMessageProps) => {
  return (
    <StyledErrorMessage>{ props.message }</StyledErrorMessage>
  )
}

export default ErrorMessage