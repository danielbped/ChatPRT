import styled from "styled-components"

const StyledResponse = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  align-self: flex-start;
  text-align: justify;
`

const StyledResponseTime = styled.p`
  align-self: flex-end;
  font-size: .7rem;
  margin-top: .5rem;
`

const StyledResponseContent = styled.p`

`

const StyledResponseSection = styled.div`
  background-color: #4F4E4D;
  padding: 1rem;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  width: 50%;
`

export {
  StyledResponse,
  StyledResponseContent,
  StyledResponseTime,
  StyledResponseSection
}