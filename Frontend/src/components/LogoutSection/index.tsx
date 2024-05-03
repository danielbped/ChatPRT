import { StyledLogoutSection, StyledLogoutButton } from "./styles"
import { useLocalStorage } from "@uidotdev/usehooks"
import { LoginResponse } from "../../interfaces/login-data.interface"
import { LOGOUT } from "../../redux/actionTypes/user"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { LuLogOut } from "react-icons/lu"

const LogoutSection = () => {
  const [_token, setToken] = useLocalStorage<LoginResponse | null>("token", null)
  const dispatch = useDispatch()
  
  const navigate = useNavigate()

  const handleLogout = () => {
    setToken(null)
    dispatch({ type: LOGOUT })
    navigate('/login')
  }

  return (
    <StyledLogoutSection>
      <StyledLogoutButton
        onClick={ () => handleLogout() }
        about="Sair"
      >
        <LuLogOut />
      </StyledLogoutButton>
    </StyledLogoutSection>
  )
}

export default LogoutSection