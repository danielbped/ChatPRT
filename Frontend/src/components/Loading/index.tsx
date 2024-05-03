import { PulseLoader } from "react-spinners"
import { StyledLoading } from "./styles"

const Loading = () => {
  return (
    <StyledLoading>
      <PulseLoader color="#737293" />
    </StyledLoading>
  )
}

export default Loading