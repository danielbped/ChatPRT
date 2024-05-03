import { InputProps } from "../../interfaces/components.interface"
import { StyledInput, StyledInputSection, StyledLabel } from "./styles"

const Input = (props: InputProps) => {
  return (
    <StyledInputSection>
      <StyledLabel>
        { props.title }
      </StyledLabel>
      <StyledInput
        type={ props.type }
        name={ props.name }
        placeholder={ props.placeholder }
        onChange={ props.onChange }
        onKeyDown={ props.onKeyDown }
      />
    </StyledInputSection>
  )
}

export default Input