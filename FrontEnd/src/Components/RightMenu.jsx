import styled from "styled-components"
export default function RightMenu() {
  return (
    <Container>
        <Circle>a</Circle>
        <Circle>a</Circle>
        <Circle>a</Circle>
    </Container>
  )
}

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
`
const Circle = styled.div`
    background-color: red;
    border-radius: 50%;
    height:2.5rem;
    width:2.5rem;

`