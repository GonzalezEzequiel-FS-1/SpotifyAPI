import styled from "styled-components";
import SubmitBtn from "../Components/Buttons/SubmitBtn";
import TextField from "../Components/Fields/TextField";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
const API_URL = `http://localhost:3069/api/signup`;
import LogoImg from '../assets/SpotNetLogo.png';

export default function SignUp() {
    const [user, setUser] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirm) {
            setError("Passwords do not match");
            return;
        }
        try {
            await axios.post(API_URL, {
                "user_name": user,
                "email": email,
                "password": password,
            }, { withCredentials: true });

            // Make a request to the backend /redirect route with user_name as query parameter
            const response = await axios.get(`http://localhost:3069/api/redirect`, {
                params: { user_name: user },
                withCredentials: true
            });

            // Redirect to the URL provided by the backend
            window.location.href = response.data.redirectURL;
        } catch (error) {
            setError(error.response?.data?.message || error.message);
        }
    }

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
                <Title>Sign up</Title>
                <SubTitle>Create an account or<TextLink to={"/signin"}>Sign in</TextLink></SubTitle>
            </TitleContainer>

            <FieldContainer>
                <Label>User Name</Label>
                <TextField
                    placeholder=""
                    type="text"
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
                />
            </FieldContainer>
            <FieldContainer>
                <Label>Email</Label>
                <TextField
                    placeholder=""
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </FieldContainer>
            <FieldContainer>
                <Label>Password</Label>
                <TextField
                    placeholder=""
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </FieldContainer>
            <FieldContainer>
                <Label>Confirm Password</Label>
                <TextField
                    placeholder=""
                    type="password"
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                />
            </FieldContainer>

            <SubmitBtn type="submit" text={"SUBMIT"} />
            <BottomText>By signing up to create an account, you are accepting our terms of service and privacy policy </BottomText>
        </Container>
    )
}

const Logo = styled.img`
    width: 20%;
    max-width: 20%; 
    height: auto; 
`;
const TitleContainer = styled.div`
display: flex;
align-items: flex-start;
flex-direction: column;
width:100%;
`

const Container = styled.form`
    display:flex;
    flex-direction: column;
    background-color: #FFF;
    border:1px solid 99999950;
    border-radius:10px;
    box-shadow: 0px 0px 15px 10px #0A122A;
    align-items: center;
    gap:1rem;
    margin-top: 2rem;
    max-width: 28rem;
    padding:2rem;
`
const FieldContainer = styled.div`
    display:flex;
    flex-direction: column;
    align-items: left;
    gap:0rem;

`
const Label = styled.label`
    text-align:left;
    font-family: "Palanquin";
    font-weight:700;
`
const Title = styled.h3`
    font-family: "Catamaran", "Sans Serif";
    letter-spacing: .10rem;
    text-transform: capitalize;
    text-align: left;
`
const SubTitle = styled.p`
    font-family: Sintony;
    font-size: 1rem;
    line-height: 10%;
    color:#121212;
    font-weight: 600;
`
const TopContainer = styled.div`
    width:100%;
    font-size: 1.5rem;
    display:flex;
    align-items: center;
    flex-direction:column;
`
const TextLink = styled(Link)`
    text-decoration: none;
    margin-left:.25rem;
    color:#999999;
    cursor: pointer;
`
const BottomText = styled.p`
    font-family: Sintony;
    font-size: .8rem;
    line-height: 90%;
    text-align: center;
    margin-top:1rem;
    color:#999999;
    font-weight: 600;
`
const ErrorField = styled.p`
    color:red;
    font-size:.75rem;
    font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
    letter-spacing: .25rem;
    text-transform: uppercase;
    text-align: center;
`
