import axios from "axios"
import styled from "styled-components"
import {useState, useEffect} from 'react'


export const UserPLaylist = () => {
  const [userData, setUserData] = useState([]);
  const handleGetFavorites = async (e) => {
    e.preventDefault()
    console.log('Starting handleGetFavorites')
    try{
      const response = await axios.post('http://localhost:3069/api/user/favorites',
        {}, { withCredentials: true }
      )
    console.log(response.data.data.items)
    const userPlaylists = response.data.data;
    setUserData(userPlaylists)
  
    }catch(err){
      console.log(err.message)
    }
    
  }
  return (
    <Container>
      <Text>Hello, World</Text>
      {userData.map((item)=>(
        <Favorites
          key={item.id}
          array={item}
          title={item.name}
          icon={item.icons}
          id={item.id}

        /> 
      ))}
      <button onClick={handleGetFavorites}>CLICK ME!!!</button>
    </Container>
  )
}
const Favorites =()=>{
  console.log("Test")
}

const Container = styled.div`
  background-color:honeydew;
  height:100%;
`
const Text = styled.p`
  color:red;
  font-family: "Roboto";
  font-size: 4rem;
  font-weight: 900;
`

