import styled from "styled-components";
import { Link } from "react-router-dom";
import pic from "../assets/pic.png"


export default function NavBar (){

    return(
        <Container>
            <TopContainers><Avatar></Avatar></TopContainers>
            <TopContainers>
                <LinkText to={"/home/zeke"}>Home</LinkText>
                <LinkText to={"/home/zeke"}>Search</LinkText>
                <LinkText to={"/home/zeke"}>Library</LinkText>
            </TopContainers>
            <TopContainers><LinkText to={"/home"}>Nav and Profile</LinkText></TopContainers>

        </Container>
    )
}

const Container = styled.header`
    display:flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-between;
    padding:1rem;
    gap:1rem;
    width:20%;
    height:100%;
    position: fixed;
    left:0;
    transition: all, 1s ease-in-out;
    //background-color:red;
    background-color:#55555500;
    filter: blur(10px);
    transform: translateX(-20.5rem);
     &:hover{
        filter:blur(0);
        background-color: #22222220;
        transform: translateX(0);
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
    justify-content: center;
    width:80%;
    height:20%;
    gap:2rem;
    padding:1rem;
    &:nth-of-type(2){
        height:20%;
    }
    &:nth-of-type(3){
        height:50%;
    }
`
const Avatar = styled.div`
background-image: url(${pic});
background-position: center;
background-repeat: no-repeat;
background-size:cover;
width:80%;
height:100%;
background-color: white;
border-radius: 20px;
`
