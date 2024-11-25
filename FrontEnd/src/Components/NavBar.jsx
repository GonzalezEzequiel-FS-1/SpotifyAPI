import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import pic from "../assets/pic.png"
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react"
import CircularIndeterminate from "./Progress/CircularProgress";

export default function NavBar() {
    // State to hold the username
    const [display_name, setDisplayName] = useState('');

    const [userAvatar, setUserAvatar] = useState(null)
    const [loading, setLoading] = useState(true)

    const loadProfile = async () => {
        setLoading(true);
        try {
            const { data } = await axios.get(`http://localhost:3069/api/profile`, {
                withCredentials: true,
            });

            const profile = data.profile;
            setDisplayName(profile.display_name || '');
            const avatarUrl = profile.images?.[0]?.url || '';
            setUserAvatar(avatarUrl);
        } catch (error) {
            console.error('Error fetching profile:', error.message);
        } finally {
            setLoading(false);
        }
    };



    const navigate = useNavigate();
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
    useEffect(() => {
        loadProfile()
    }, [])

    return (
        <Container>
            <TopContainers>
                <Link to={"/profile"}>
                    {loading ? (
                        <CircularIndeterminate />
                    ) : (
                        <Avatar src={userAvatar || pic} />
                    )}
                </Link>
                <Text>{display_name}</Text>
            </TopContainers>

            <TopContainers>
                <LinkText to={"/home"}>Home</LinkText>
                <LinkText to={"/search"}>Search</LinkText>
                <LinkText to={"/home"}>Library</LinkText>
            </TopContainers>
            <TopContainers></TopContainers>
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
    background-color:#55555500;
    filter: blur(10px);
    transform: translateX(-53vw);
     &:hover{
        filter:blur(0);
        background-color: #22222220;
        transform: translateX(-47vw);
    }
`
const LinkText = styled(Link)`
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
    padding:1rem;

    &:nth-of-type(1){
        height:20%;
        gap: 0.5rem;
    }
    &:nth-of-type(2){
        height:20%;
        gap:2rem;
    }
    &:nth-of-type(3){
        height:50%;
        text-align: end;
        gap:2rem;
    }
    &:nth-of-type(4){
        height:10%;
        gap:2rem;
    }
`
const Avatar = styled.img`
min-width: 8rem;
background-position: center;
background-repeat: no-repeat;
background-size:cover;
width:80%;
height:100%;

border-radius: 20px;
`
const Text = styled.p`
    margin-top: 0px;
    color:#fff;
    font-size:1.5rem;
    margin:1 1rem;
    text-decoration: none;
    font-family: "Roboto", sans-serif;
    font-weight: 900;
    letter-spacing: .20rem;
    transition: .15s all ease-in-out;
    &:hover{
        transform: scale(1.1);
        font-weight: 400;
    }&:active{
        transform: scale(.99);
        font-weight: 100;
    }
`
