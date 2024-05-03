import LoginForm from "../../components/LoginForm"
import { StyledLogin } from "./styles"
import { LoginData, LoginResponse } from '../../interfaces/login-data.interface'
import useLoginMutate from "../../hooks/useLoginMutate"
import { useNavigate } from "react-router-dom"
import { useLocalStorage } from "@uidotdev/usehooks"
import { ChangeEventHandler, useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { GET_USER } from "../../redux/actionTypes/user"
import SideSection from "../../components/SideSection"

const Login = () => {
  const [token, setToken] = useLocalStorage<LoginResponse | null>("token", null)
  const [loginData, setLoginData] = useState<LoginData>({
    email: undefined,
    password: undefined
  })
  
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { mutate, isSuccess, data, isError, error } = useLoginMutate()
  const handleNavigate = (route: string) => navigate(`/${route}`)

  useEffect(() => {
    if (token) {
      return handleNavigate("chat")
    } else {
      return handleNavigate("login")
    }
  }, [token])

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      submit()
    }
  }

  const handleLogin: ChangeEventHandler<HTMLInputElement> = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setLoginData({ ...loginData, [name]: value })
  }

  const submit = () => {
    mutate(loginData)
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
    <StyledLogin>
      <SideSection />
      <LoginForm
        // @ts-ignore:next-line
        error={ error?.response.data.message }
        isError={ isError }
        submit={ submit }
        handleLogin={ handleLogin }
        handleNavigate={ handleNavigate }
        handleKeyPress={ handleKeyPress }
      />
    </StyledLogin>
  )
}

export default Login