import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import SearchBar from "../Components/Fields/SearchBar";
import { TbMusicSearch } from "react-icons/tb";

import RightMenu from "./RightMenu";
export default function NavBar() {
    const location = useLocation();
    const isSignupOrSignIn = location.pathname === "/signup" || location.pathname === "/signin";

    return (
        <Container>
            <TopContainers>
                <LinkText to={"/home"}>LOGO</LinkText>
            </TopContainers>
            
            {!isSignupOrSignIn ? (
                <TopContainers>
                    <SearchIcon />
                    <SearchBar placeholder={"SEARCH"} />
                </TopContainers>
            ) : (
                <TopContainers></TopContainers>
            )}

            <TopContainers>
                <RightMenu/>
            </TopContainers>
        </Container>
    );
}

const Container = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: .5rem;
    gap: 1rem;
    width: 100%;
    background-color: #1ed760;
`;

const LinkText = styled(Link)`
    color: #fff;
    font-size: 1.5rem;
    margin: 1 1rem;
    text-decoration: none;
    font-family: "Sintony", sans-serif;
    font-weight: 700;
    letter-spacing: .15rem;
    transition: .15s all ease-in-out;

    &:hover {
        transform: scale(1.1);
        font-weight: 400;
    }
    
    &:active {
        transform: scale(.99);
        font-weight: 100;
    }
`;

const TopContainers = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 10%;

    &:nth-of-type(2) {
        width: 40%;
    }
`;

const SearchIcon = styled(TbMusicSearch)`
    position: absolute;
    left: 10%; 
    color: white;
    font-size: 1.5rem;
    cursor: pointer;
`;
