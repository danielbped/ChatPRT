import styled from "styled-components"

const StyledMessage = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin: 1rem;
  text-align: justify;
`

const StyledMessageTime = styled.p`
  align-self: flex-end;
  font-size: .7rem;
  margin-top: .5rem;
`

const StyledMessageContent = styled.p`
  
`

const StyledMessageSection = styled.div`
  background-color: #171717;
  padding: 1rem;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
`

export {
  StyledMessage,
  StyledMessageTime,
  StyledMessageContent,
  StyledMessageSection
}