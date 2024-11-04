import styled from "styled-components";
import { Link } from "react-router-dom";

export default function NavBar (){
    return(
        <Container>
            <TopContainers><LinkText to={"/home"}>LOGO</LinkText></TopContainers>
            <TopContainers><LinkText to={"/home"}>Search Bar</LinkText></TopContainers>
            <TopContainers><LinkText to={"/home"}>Nav and Profile</LinkText></TopContainers>

        </Container>
    )
}

const Container = styled.header`
    display:flex;
    align-items: center;
    justify-content: space-between;
    padding:1rem;
    gap:1rem;
    width:100%;
    background-color:#1ed760;
`
// const Text=styled.h1`
//     color:#fff;
//     font-size:1.5rem;
//     margin:1 1rem;
//     text-align: center;
// `
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
    align-items: center;
    justify-content: center;
    width:80%;
    &:nth-of-type(2){
        width:40%;
    }
`