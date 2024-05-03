import { ButtonProps } from "../../interfaces/components.interface"
import { StyledButton } from "./styles"

const Button = (props: ButtonProps) => {
  return (
    <StyledButton
      onClick={ (e) => props.onClick(e) }
      disabled={ props.disabled }
    >
      {props.title}
    </StyledButton>
  )
}

export default Button