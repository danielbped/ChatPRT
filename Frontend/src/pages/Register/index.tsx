import { ChangeEventHandler, useEffect, useState } from "react"
import RegisterForm from "../../components/RegisterForm"
import { StyledRegister } from "./styles"
import { RegisterData } from "../../interfaces/register-data.interface"
import useRegisterMutate from "../../hooks/useRegisterMutate"
import { useLocalStorage } from "@uidotdev/usehooks"
import { useNavigate } from "react-router-dom"
import { LoginResponse } from "../../interfaces/login-data.interface"
import { GET_USER } from "../../redux/actionTypes/user"
import { useDispatch } from "react-redux"
import SideSection from "../../components/SideSection"

const Register = () => {
  const [token, setToken] = useLocalStorage<LoginResponse | null>("token", null)
  const [registerData, setRegisterData] = useState<RegisterData>({
    firstName: undefined,
    lastName: undefined,
    email: undefined,
    password: undefined,
    confirmPassword: undefined
  })

  useEffect(() => {
    if (token) {
      return handleNavigate("chat")
    }
  }, [token])

  const { mutate, data, isSuccess, isError, error } = useRegisterMutate()

  const handleRegister: ChangeEventHandler<HTMLInputElement> = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setRegisterData({ ...registerData, [name]: value })
  }

  const disableSubmit = () => {
    const { password, confirmPassword } = registerData

    return Object.values(registerData).some(field => !field)
      || Number(password?.length) < 8
      || password !== confirmPassword
  }

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleNavigate = (route: string) => navigate(`/${route}`)

  const submit = () => {
    !disableSubmit() && mutate(registerData)
  }

  useEffect(() => {
    if (isSuccess && data.data) {
      // @ts-ignore:next-line
      setToken(data.data.token)

      dispatch({
        type: GET_USER,
        // @ts-ignore:next-line
        payload: data.data.user,
      })

      handleNavigate('chats')
    }
  }, [isSuccess, data])

  return (
    <StyledRegister>
      <RegisterForm
        handleRegister={ handleRegister }
        submit={ submit }
        isError={ isError }
        // @ts-ignore:next-line
        error={ error?.response.data.message }
        handleNavigate={ handleNavigate }
        disabledButton={ disableSubmit() }
      />
      <SideSection />
    </StyledRegister>
  )
}

export default Register