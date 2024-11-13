import styled from "styled-components";
import bg from '../assets/bg.jpg';
import pic from "../assets/pic.png";
import SubmitBtn from "../Components/Buttons/SubmitBtn";
import getUserName from "../../utils/getUserName";
import { useState } from "react";
import axios from "axios"

export default function Profile() {
    // State to hold the username
    const [userName, setUserName] = useState(null);

    // Function to load the data
    const getName = async () => {
        
        const name = await getUserName(); 
        if (name) {
            setUserName(name);
        } else {
            console.log("Failed to fetch username.");
        }
    };
    const loadProfile = async () =>{
        try{
        const userProfile = await axios.get('http://localhost:3069/api/profile', {
            withCredentials: true,
        })
        console.log(userProfile.data)
        }catch(error){
            console.error(error.message)
        }
    }

  return (
    <Container>
        <TopBanner></TopBanner>
        <AvatarContainer>
            <Avatar src={pic}/>
        </AvatarContainer>
        <BottomPortion><SubmitBtn 
            onClick={getName}
            text="GET NAME"
        /><Text>{userName}</Text>
        <SubmitBtn 
            onClick={loadProfile}
            text="LOAD DATA"
        />
        </BottomPortion>
    </Container>
  )
}

const Container = styled.div`
    display:flex;
    width:100%;
    height:100%;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    
`
const TopBanner = styled.div`
    width:100%;
    height:20%;
    background-image: url(${bg});
    filter:blur(3px);
    background-color:black;
    border:1rem solid black;
    position:absolute;

`
const AvatarContainer = styled.div`
    width: 10rem;
    height:10rem;
    border-radius: 50%;
    overflow: hidden;
    border:.5rem solid  #00000050;
    display:flex;
    align-items: center;
    justify-content: center;
    position:relative;
    top:10%
    
`
const Avatar = styled.img`
    object-fit: cover;
`
const BottomPortion = styled.div`
    width:100%;
    height:80%;
    background-color:"#555555"
`
const Text = styled.h1`
    color:white;
    font-size:20rem;
`