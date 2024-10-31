import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import styled from "styled-components"

const Home = () => {
  // Instantiate Location
  const location = useLocation();
  //Set useNavigte for something that shouldn't...
  const navigate = useNavigate()

  const saveToken = () => {
    try {
      // Assign a variable to a new instance of URLSearchParams to extract the token from the URL
      const queryParams = new URLSearchParams(location.search);

      // Search the URL for "access_token" and retrieve the value
      const userToken = queryParams.get("access_token");

      // Only save the token if it exists
      if (userToken) {
        localStorage.setItem("user-token", userToken);
        //Using navigate to clear the token from the url bar, it will still be on the history, not the best practice. But it works for now...
        navigate("/home")
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    saveToken();
  }, [location.search]);

  return (
    <Container>
      
      
    </Container>
  );
};


export default Home;

const Container = styled.div`
`