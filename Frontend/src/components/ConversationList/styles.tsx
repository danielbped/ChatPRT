import styled from "styled-components"

const StyledConversationList = styled.div`
  height: 70vh;
  margin-top: 5rem;
  overflow-y: auto;
  overflow-x: hidden;

  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-track {
    background: #333333;
  }

  &::-webkit-scrollbar-thumb {
    background: #171717;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #131313;
  }
`

const StyledImage = styled.img`
  width: 1.5rem;
  margin-right: .5rem
`

const StyledNewConversationButton = styled.button`
  position: fixed;
  top: 0;
  padding: 1rem 2rem 1rem 1rem;
  color: #FFFFFF;
  background-color: transparent;
  border: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  width: 20%;
  margin-bottom: 1rem;

  &:hover {
    background-color: #333333;
    transition: .3s;
  }
`

const StyledIconSection = styled.p`
  font-size: 1.3rem;
  margin-left: .5rem;
  display: flex;
  justify-content: center;
  align-items: center;
`

const StyledLogoSection = styled.div`
  display: flex;
  align-items: center;
  font-weight: bold;
`

const StyledNoMessages = styled.p`
  text-align: center;
  margin: 1rem;
`

export {
  StyledConversationList,
  StyledImage,
  StyledNewConversationButton,
  StyledIconSection,
  StyledLogoSection,
  StyledNoMessages
}