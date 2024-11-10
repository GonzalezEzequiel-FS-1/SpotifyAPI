import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import SubmitBtn from "../Components/Buttons/SubmitBtn";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

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
      await axios.post(`http://localhost:3069/api/token/refresh`,{
        user:user
      },{
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
      <Title>Welcome {user}</Title>
      <SubTitle>GET YOUR PROFILE</SubTitle>
      <SubmitBtn onClick={handleGetProfile} text="Get Profile" />
      {loading && <p>Loading...</p>} {/* Show loading indicator */}
      <SubmitBtn onClick={handleLogout} text={"Log Out"} />
    </Container>
  );
};

export default Home;

const Container = styled.form`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border: 1px solid #99999950;
  border-radius: 10px;
  box-shadow: 0px 0px 15px 10px #0a122a;
  align-items: center;
  gap: 1rem;
  margin-top: 2rem;
  max-width: 28rem;
  padding: 2rem;
`;

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
