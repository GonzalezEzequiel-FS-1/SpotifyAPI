import styled from 'styled-components';

export default function FourOhFour() {
    return (
        <Container>
            <p>ERROR</p>
            <h1>404</h1>
            <p>Page not found</p>
        </Container>
    )
}


export const Container = styled.div`
  display:flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width:100vw;
  height:100vh;
  background-color: darkgrey;
  font-size: 5rem;
`;