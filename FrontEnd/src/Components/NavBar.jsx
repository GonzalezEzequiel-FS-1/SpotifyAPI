import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import pic from "../assets/pic.png"
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import {useEffect, useState} from "react"

export default function NavBar (){
    const [image, setImage] =useState(null)

    const handleImageLoad = async () =>{
        try {
            const response = await axios.get('http://localhost:3069/api/profile',{},{withCredentials:true})
        const userData = response.data
        console.log(`DATA FROM NAVBAR >>>>>>> ${userData}<<<<<<<<<<<`)
        } catch (error) {
            console.log(error.message)
        }
        
    }
    
    const navigate=useNavigate();
    const { logout } = useAuth();
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


    return(
        <Container>
            <TopContainers><Avatar to={"/profile"}></Avatar></TopContainers>
            <TopContainers>
                <LinkText to={"/home"}>Home</LinkText>
                <LinkText to={"/search"}>Search</LinkText>
                <LinkText to={"/home"}>Library</LinkText>
            </TopContainers>
            <TopContainers onClick={handleImageLoad}></TopContainers>
            <TopContainers><LinkText to={"/home"} onClick={handleLogout}>Log Out</LinkText></TopContainers>
        </Container>
    )
}

const Container = styled.nav`
    display:flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-around;
    padding:1rem;
    gap: 1rem;
    width:15%;
    height:100%;
    position: fixed;
    z-index: 10;
    
    transition: transform, 1s ease-in-out;
    //background-color:red;
    background-color:#55555500;
    filter: blur(10px);
    transform: translateX(-53vw);
     &:hover{
        filter:blur(0);
        background-color: #22222220;
        transform: translateX(-47vw);
    }
`
const LinkText=styled(Link)`
    color:#fff;
    font-size:1.5rem;
    margin:1 1rem;
    text-decoration: none;
    font-family: "Sintony", sans-serif;
    font-weight: 700;
    letter-spacing: .15rem;
    transition: .15s all ease-in-out;
    &:hover{
        transform: scale(1.1);
        font-weight: 400;
    }&:active{
        transform: scale(.99);
        font-weight: 100;
    }
`
const TopContainers = styled.div`
    display:flex;
    flex-direction: column;
    align-items: center;
    width:80%;
    height:20%;
    gap:2rem;
    padding:1rem;

    &:nth-of-type(1){
        height:20%;
    }
    &:nth-of-type(2){
        height:20%;
    }
    &:nth-of-type(3){
        height:50%;
        text-align: end;
    }
    &:nth-of-type(4){
        height:10%;
    }
`
const Avatar = styled(Link)`
background-image: url(${pic});
background-position: center;
background-repeat: no-repeat;
background-size:cover;
width:80%;
height:100%;

border-radius: 20px;
`
