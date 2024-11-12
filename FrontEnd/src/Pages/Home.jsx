import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import SubmitBtn from "../Components/Buttons/SubmitBtn";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import ArtistCard from "../Components/cards/ArtistCard";
import { useState } from "react";
import MUIBtn from "../Components/Buttons/MUIBtn";
import Player from '../Components/Player'

const Home = () => {

  const { user } = useParams();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get("http://localhost:3069/api/signout");
      if (response.status === 200) {
        logout();
        console.log(`User Signed off successfully`);
        localStorage.clear();
        navigate("/signin");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleGetProfile = async (e) => {
    e.preventDefault()
    //console.log(user);
    setLoading(true);
    try {
      await axios.post(`http://localhost:3069/api/token/check`, {
        user: user
      }, {
        withCredentials: true
      });
      //console.log(response.data.data.accessToken);
      // Handle the response data here, e.g., store it in a state
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   if (user) {
  //     localStorage.setItem("user_name", user);
  //   }
  // }, [user]);

  return (
    <Container>
      <TopContainer>
        <ArtistCard />
      </TopContainer>
        <BottomFull>
          <BottomRight></BottomRight>
          <BottomLeft></BottomLeft>
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
        height:100vh;
        padding: 2rem;
        `;
const TopContainer = styled.div`
        height:40%;
        `
const Title = styled.h3`
        font-family: "Catamaran", "Sans Serif";
        letter-spacing: 0.10rem;
        text-transform: capitalize;
        text-align: left;
        `;

const SubTitle = styled.p`
        font-family: Sintony;
        font-size: 1rem;
        line-height: 10%;
        color: #121212;
        font-weight: 600;
        `;

const BottomRight = styled.div`
  background-color: orange;
  width:40vw;
  height:100%;

`
const BottomLeft = styled.div`
  width:60vw;
  height: 100%;
  background-color: hotpink;
  position: relative;
`
const BottomFull = styled.div`
  display: flex;
  align-items: center;
  width:100%;
  height:50%;
  position: absolute;
  bottom: 0;
  background-color: red;
`