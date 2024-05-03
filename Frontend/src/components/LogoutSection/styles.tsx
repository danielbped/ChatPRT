import styled from "styled-components"

const StyledLogoutSection = styled.div`
  position: fixed;
  bottom: 0;
  width: 10%;
  background-color: #171717;
`

const StyledLogoutButton = styled.button`
  transform: scaleX(-1);
  border: 1px solid white;
  background-color: #333333;
  color: white;
  padding: .3rem .2rem 0rem .3rem;
  margin: 1rem;
  cursor: pointer;
  font-size: 1.5rem;
  opacity: 0.5;

  &:hover {
    opacity: 1;
    transition: all.3s ease-in-out;
  }
`

export {
  StyledLogoutSection,
  StyledLogoutButton
}