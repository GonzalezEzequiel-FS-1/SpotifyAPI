import styled from "styled-components";
import SubmitBtn from "../Components/Buttons/SubmitBtn";
//import TextField from "../Components/Fields/TextField";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import LogoImg from '../assets/SpotNetLogo.png';
import { useAuth } from '../context/AuthContext';
import MUIField from "../Components/Fields/MUIField";

export default function Signin() {
    const navigate = useNavigate();
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:3069/api/signin", {
                user_name: userName,
                password: password
            }, {
                withCredentials: true
            });
            if (response.status === 200) {
                login();
                navigate(`/home`);
            }
        } catch (error) {
            console.error(`DOES NOT WORK: ${error}`);
            setError("Login failed. Please check your credentials.");
        }
    };

    return (
        <Container onSubmit={handleSubmit}>
            <TopContainer>
                {error ? (
                    <ErrorField>{error}</ErrorField>
                ) : (
                    <Logo src={LogoImg} alt="SpotNet Logo" />
                )}
            </TopContainer>
            <TitleContainer>
                <Title>Sign in</Title>
            </TitleContainer>

            <FieldContainer>
                {/* <Label>User Name</Label> */}
                <MUIField
                    label="User Name"
                    placeholder=""
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                />
            
                {/* <Label>Password</Label> */}
                <MUIField
                    label="Password"
                    placeholder=""
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            
                <SubmitBtn type="submit" text={"SUBMIT"} />
            </FieldContainer>
            <SubTitle>No account?<TextLink to={"/signup"}>Create one!</TextLink></SubTitle>
            <BottomText>By logging in, you are accepting our terms of service and privacy policy </BottomText>
        </Container>
    );
}

const Logo = styled.img`
    width: 20%;
    max-width: 20%; 
    height: auto; 
`;
const TitleContainer = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column; 
    width:100%;
`;

const Container = styled.form`
    display:flex;
    flex-direction: column;
    background-color: #FFFFFF80;
    border:1px solid 99999950;
    border-radius:10px;
    box-shadow: 0px 0px 15px 10px #0A122A;
    align-items: center;
    gap:1rem;
    margin-top: 2rem;
    max-width: 28rem;
    padding:2rem;
`;
const FieldContainer = styled.div`
    display:flex;
    flex-direction: column;
    align-items: center;
    gap:1rem;
    width: 100%;
`;
// const Label = styled.label`
//     text-align:left;
//     font-family: "Palanquin";
//     font-weight:700;
// `;
const Title = styled.h3`
    font-family: "Catamaran", "Sans Serif";
    letter-spacing: .10rem;
    text-transform: capitalize;
    text-align: left;
`;
const SubTitle = styled.p`
    font-family: Sintony;
    font-size: 1rem;
    line-height: 10%;
    color:#121212;
    font-weight: 600;
`;
const TopContainer = styled.div`
    width:100%;
    font-size: 1.5rem;
    display:flex;
    align-items: center;
    flex-direction:column;
`;
const TextLink = styled(Link)`
    text-decoration: none;
    margin-left:.25rem;
    color:#ffffff80;
    cursor: pointer;
`;
const BottomText = styled.p`
    font-family: Sintony;
    font-size: .8rem;
    line-height: 90%;
    text-align: center;
    margin-top:1rem;
    color:#ffffff80;
    font-weight: 600;
`;
const ErrorField = styled.p`
    color:red;
    font-size:.75rem;
    font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
    letter-spacing: .25rem;
    text-transform: uppercase;
    text-align: center;
`;
