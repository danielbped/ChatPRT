import styled from "styled-components"

const StyledConversation = styled.div`
  padding: 1rem 0 1rem 1rem;
  display: flex;
  align-items: center;
  text-align: justify;
  width: 95%;

  &:hover {
    cursor: pointer;
    opacity: .7;
    background-color: #131313;
    transition: all.3s ease-in-out;
  }
`

const StyledTextConversation = styled.p`
  width: 18rem;
`

const StyledRemoveButton = styled.button<{ $confirmDelete?: boolean }>`
  position: fixex;
  background-color: transparent;
  border: none;
  color: ${props => props.$confirmDelete ? '#EF4444' : '#FFF'};
  font-size: 1.1rem;
  opacity: .5;
  cursor: pointer;
  margin-right: 1rem;

  &:hover {
    opacity: 1;
    transition: all.3s ease-in-out;
  }
`

export {
  StyledConversation,
  StyledTextConversation,
  StyledRemoveButton
}