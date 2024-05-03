import { SideBarInterface } from '../../interfaces/components.interface'
import ConversationList from '../ConversationList'
import LogoutSection from '../LogoutSection'
import { StyledSideBar } from './styles'

const SideBar = (props: SideBarInterface) => {
  return (
    <StyledSideBar>
      <ConversationList { ...props } />
      <LogoutSection />
    </StyledSideBar>
  )
}

export default SideBar