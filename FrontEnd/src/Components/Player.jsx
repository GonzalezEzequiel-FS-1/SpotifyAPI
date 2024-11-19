import styled from "styled-components"



export default function Player() {
  return (
    <Container>
      <h1>PLAYER</h1>
    </Container>
  )
}

const Container = styled.div`
    width:fit-content;
    height:10%;
    
    background-color:red;
    position:fixed;
    padding:.5rem;
    z-index: 1;
    bottom:0;
    display: flex;
    justify-content: center;
    color:#00000000;
    transition: all, 1s ease-in-out;
    //background-color:red;
    background-color:#55555510;
    filter: blur(1px);
    transform: translateY(4rem);
     &:hover{
        filter:blur(0);
        background-color: #22222220;
        transform: translateY(0);
        color:white;
        border-radius: 10px;
    }
`