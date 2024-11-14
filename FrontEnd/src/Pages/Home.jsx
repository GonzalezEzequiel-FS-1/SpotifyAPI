import styled from "styled-components";
//import SubmitBtn from "../Components/Buttons/SubmitBtn";
import Categories from "../Components/cards/Categories";
import { useEffect } from "react";

const Home = () => {

  useEffect(() => {
    // Optional: Add any logic if needed on component mount
  }, []);

  return (
    <Container>
      <TopContainer>
      </TopContainer>
      <BottomFull>
        <BottomRight>
        </BottomRight>
        <BottomLeft>
          <Categories />
        </BottomLeft>
      </BottomFull>
    </Container>
  );
};

export default Home;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  box-shadow: 0px 0px 15px 10px #0a122a;
  align-items: center;
  gap: 1rem;
  width: 100vw;
  height: 100vh;
  padding: 2rem;
`;

const TopContainer = styled.div`
  height: 40%;
`;

const BottomRight = styled.div`
  background-color: orange;
  width: 40vw;
  height: 100%;
  
`;

const BottomLeft = styled.div`
  width: 60vw;
  overflow: scroll;
`;

const BottomFull = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 50%;
  position: absolute;
  bottom: 0;
  background-color: red;
`;
