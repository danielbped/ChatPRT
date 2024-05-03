import { LoginFormInterface } from "../../interfaces/components.interface"
import { useEffect, useState } from 'react'
import Button from "../Button"
import ErrorMessage from "../ErrorMessage"
import Input from "../Input"
import { StyledButtonSection, StyledInputSection, StyledLoginForm, StyledLoginFormTitle, StyledRegisterCTA, StyledRegisterLink } from "./styles"

const LoginForm = (props: LoginFormInterface) => {
  const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false)

  useEffect(() => {
    if (props.isError) {
      setShowErrorMessage(true)

      setTimeout(() => setShowErrorMessage(false), 5000)
    }
  }, [props.isError])

  return (
    <StyledLoginForm>
      <StyledLoginFormTitle>
        Login
      </StyledLoginFormTitle>
      <StyledInputSection>
        <Input
          type='text'
          name='email'
          onChange={ props.handleLogin }
          placeholder='email@email.com'
          title='E-mail'
          onKeyDown={ props.handleKeyPress }
        />
        <Input
          type='password'
          name='password'
          onChange={ props.handleLogin }
          placeholder='********'
          title='Senha'
          onKeyDown={ props.handleKeyPress }
        />
      </StyledInputSection>
      <StyledButtonSection>
        <Button
          title='Entrar'
          onClick={ () => props.submit() }
        />
        { showErrorMessage && <ErrorMessage message={ props.error } /> }
        <StyledRegisterCTA>
          Não possui conta?
          <StyledRegisterLink
            onClick={ () => props.handleNavigate('register')
          }>
            { " " }
            Registrar
          </StyledRegisterLink>
        </StyledRegisterCTA>
      </StyledButtonSection>
    </StyledLoginForm>
  )
}

export default LoginForm