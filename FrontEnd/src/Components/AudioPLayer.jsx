import PropTypes from "prop-types"
import styled from "styled-components"
export default function AudioPLayer({url}) {
  return (
    <Container>
      <Audio controls >
      <source src="" type="" />
      Your browser does not support the audio element.
      </Audio>
    </Container>
  )
}

const Container = styled.div`
    border-radius: 20px;
    margin-top: 0.5rem;
    box-shadow: 5px 5px 5px 1px #22222290;
`
const Audio = styled.audio`
`