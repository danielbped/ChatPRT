import { RegisterFormInterface } from "../../interfaces/components.interface"
import Button from "../Button"
import Input from "../Input"
import { StyledButtonSection, StyledInputSection, StyledRegisterForm, StyledRegisterFormTitle } from "./styles"


const RegisterForm = (props: RegisterFormInterface) => {
  return (
    <StyledRegisterForm>
      <StyledRegisterFormTitle>
        Novo(a) Usuário(a)
      </StyledRegisterFormTitle>
      <StyledInputSection>
        <Input
          type='text'
          name='firstName'
          onChange={ props.handleRegister }
          placeholder='Jon'
          title='Nome'
        />
        <Input
          type='text'
          name='lastName'
          onChange={ props.handleRegister }
          placeholder='Snow'
          title='Sobrenome'
        />
        <Input
          type='text'
          name='email'
          onChange={ props.handleRegister }
          placeholder='email@email.com'
          title='E-mail'
        />
        <Input
          type='password'
          name='password'
          onChange={ props.handleRegister }
          placeholder='********'
          title='Senha'
        />
        <Input
          type='password'
          name='confirmPassword'
          onChange={ props.handleRegister }
          placeholder='********'
          title='Confirmar senha'
        />
      </StyledInputSection>
      <StyledButtonSection>
        <Button
          title='Cadastrar'
          onClick={ () => props.submit() }
          disabled={ props.disabledButton }
        />
        <Button
          title='Voltar'
          onClick={ () => props.handleNavigate('login') }
        />
      </StyledButtonSection>
      { props.isError && <p>{ props.error }</p> }
    </StyledRegisterForm>
  )
}

export default RegisterForm