import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import styled from "styled-components"
import SubmitBtn from "../Components/Buttons/SubmitBtn";
import axios from "axios";

const Home = () => {
  const navigate = useNavigate()
  const handleLogout = async (e) =>{
    e.preventDefault()
    try {
      const response = await axios.get("http://localhost:3069/api/logout")
      if(response){
        console.log(`User Signed off successfully`)
        navigate('/signin')
        
      }
    } catch (error) {
      console.log(error.message)
    }
    

  } 



  return (
    <Container>
      <SubmitBtn onClick={handleLogout} text={"Log Out"} />
      
    </Container>
  );
};


export default Home;

const Container = styled.div`
`