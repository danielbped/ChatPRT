import styled from "styled-components"

const StyledButtonSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const StyledInputSection = styled.div`

`

const StyledLoginForm = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const StyledRegisterCTA = styled.p`
  font-size: .7rem;
  color: #737293;
`

const StyledRegisterLink = styled.span`
  font-weight: bold;
  color: #1E1E1E;

  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`

const StyledLoginFormTitle = styled.h1`
  font-weight: bold;
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #1E1E1E;
`

export {
  StyledButtonSection,
  StyledInputSection,
  StyledLoginForm,
  StyledLoginFormTitle,
  StyledRegisterLink,
  StyledRegisterCTA
}