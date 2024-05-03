import PrismaImage from '../../assets/prisma.png'
import { StyledSideSection, StyledSideSectionImage, StyledSideSectionTitle } from './styles'

const SideSection = (): JSX.Element => {
  return (
    <StyledSideSection>
      <StyledSideSectionTitle>ChatPRT</StyledSideSectionTitle>
      <StyledSideSectionImage src={ PrismaImage } alt="Logo do ChatPRT"/>
    </StyledSideSection>
  )
}

export default SideSection