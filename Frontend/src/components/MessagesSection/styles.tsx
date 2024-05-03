import styled from "styled-components"

const StyledMessageSection = styled.div`
  background-color: #1E1E1E;
  color: #FFFFFF;
  height: 75vh;
  overflow-y: auto;
  width: 100%;
  padding: 2rem;
  display: flex;
  flex-direction: column;
`

const StyledNoConversationSelected = styled.div`
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
`

export {
  StyledMessageSection,
  StyledNoConversationSelected
}