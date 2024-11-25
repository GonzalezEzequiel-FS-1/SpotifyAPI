import styled from "styled-components";
//import SubmitBtn from "../Components/Buttons/SubmitBtn";
import Categories from "../Components/cards/Categories";
import { useEffect, useState } from "react";
import { SearchCard } from "../Components/cards/SearchCard";
import PlayerControls from "../Components/Player/playerControls";


const Home = () => {
  const [count, setCount] = useState(0)

  const handleNext = (e) => {
    e.preventDefault()
    setCount(count + 1)
    console.log(count)
    if (count >= 2) {
      setCount(0)
    }
  }
 
  const handleBack = (e) => {
    e.preventDefault()
    setCount(count - 1)
    console.log(count)
    if (count <= 0) {
      setCount(2)
    }
  }
  useEffect(() => {


  }, [count]);

  return (
    <Container>
      <TopContainer>
      <PlayerControls />
      </TopContainer>
      
      <BottomFull>
        <BottomRight>
          <SearchCard />
        </BottomRight>
        <BottomLeft>
          
          <Mask>
            {count === 0 ? (
              
              <Categories setCount={setCount} />
            ) : count === 1 ? (
              <><button onClick={handleNext}>NEXT</button>
              <button onClick={handleBack}>BACK</button>
              {/* <Playlists /> */
                console.log("Playlist")
              }
              </>

            ) : count === 2 ? (
              <>
              {/* <Tracks /> */
                console.log('Tracks')
              }
              <button onClick={handleBack}>BACK</button>
              </>
            ) : null}


          </Mask>
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
  height: 60%;
  width:100%;
  display:flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const BottomRight = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  padding:0 4rem;

  justify-content: center;
  
  
`;
const Mask = styled.div`
  width: 60vw;
  overflow: auto;
  height: 100%;
  mask-image: linear-gradient(90deg, #00000000, #000000 10%, #000000 80%, #00000000);
  -webkit-mask-image: linear-gradient(90deg, #00000000, #000000 10%, #000000 80%, #00000000);

`

const BottomLeft = styled.div`
  width: 60%;
  height:100%;
  display: flex;
`;

const BottomFull = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 40%;
  position: absolute;
  bottom: 0;
`;
