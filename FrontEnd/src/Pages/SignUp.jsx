import styled from "styled-components";
import SubmitBtn from "../Components/Buttons/SubmitBtn";
import TextField from "../Components/Fields/TextField";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const API_URL=`http://localhost:3069/api/user`
export default function SignUp() {
    const navigate = useNavigate();
    const[email, setEmail]=useState('')
    const[password, setPassword]=useState('')
    const[confirm, setConfirm]=useState('')
    const[error, setError]=useState(null)
    //const[loading, setLoading]=useState(true)



    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
        const response = await axios.post(`${API_URL}`,{
            user:{
                first_name:null,
                last_name:null,
                userName:null,
                email,
                password,
                birthday:null,
                favorites:null    
            }
            })
            console.log(response.data)
            //setLoading(false)
            navigate("/home")
    }catch(error){
        setError(error.message);
    }
}
    return (
        <Container onSubmit={handleSubmit}>
            <TopContainer>
                <ErrorField>{error}</ErrorField>
                <Title>Sign up</Title>
                <SubTitle>Create an account or<TextLink to={"/signin"}>Sign in</TextLink></SubTitle>
            </TopContainer>
            <FieldContainer>
                <Label>Email</Label>
                <TextField
                    placeholder=""
                    type="email"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                />
            </FieldContainer>
            <FieldContainer>
                <Label>Password</Label>
                <TextField
                    placeholder=""
                    type="password"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                />
            </FieldContainer>
            <FieldContainer>
                <Label>Confirm Password</Label>
                <TextField
                    placeholder=""
                    type="password"
                    value={confirm}
                    onChange={(e)=>setConfirm(e.target.value)}
                />
            </FieldContainer>



            <SubmitBtn type="submit" text={"SUBMIT"} />
            <BottomText>By signing up to create an account, you are accepting our terms of service and privacy policy </BottomText>
        </Container>
    )
}

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