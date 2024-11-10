import { useNavigate } from "react-router-dom";
import styled from "styled-components"
import SubmitBtn from "../Components/Buttons/SubmitBtn";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
const Home = () => {
  const { logout } = useAuth()
  const navigate = useNavigate()
  const handleLogout = async (e) =>{
    e.preventDefault()
    try {
      const response = await axios.get("http://localhost:3069/api/logout")
      if(response){
        console.log(`works`)
        
      }
    } catch (error) {
      console.log(error.message)
      logout()
        console.log(`User Signed off successfully`)
        navigate('/signin')
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