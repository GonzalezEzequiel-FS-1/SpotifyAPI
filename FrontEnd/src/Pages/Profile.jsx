import styled from "styled-components";
import bg from '../assets/bg.jpg';
// import getUserName from "../../utils/getUserName";
import { useEffect, useState } from "react";
import axios from "axios"
import CircularIndeterminate from "../Components/Progress/CircularProgress";

export default function Profile() {
    // State to hold the username
    const [user_name, setUserName] = useState('');
    const [country, setCountry] = useState('');
    const [display_name, setDisplayName] = useState('');
    const [email, setEmail] = useState('');
    //const [external_url, setExternalUrl] = useState(null);
    const [followers, setFollowers] = useState(0);
    const [images, setImages] = useState([])
    const [loading, setLoading] = useState(true)

    const loadProfile = async () => {
        setLoading(true);
        try {
            const { data } = await axios.get('http://localhost:3069/api/profile', {
                withCredentials: true,
            });

            const profile = data.profile;

            setUserName(profile.id || '');
            setCountry(profile.country || '');
            setDisplayName(profile.display_name || '');
            setEmail(profile.email || '');
            setFollowers(profile.followers?.total || 0);
            setImages(profile.images || [])

            console.log("Profile Data:", data);
        } catch (error) {
            console.error('Error fetching profile:', error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadProfile()
    }, [])
    return loading
        ? (
            <CircularIndeterminate />
        ) : (
            <Container>
                <TopBanner></TopBanner>
                <AvatarContainer>
                    <Avatar src={images[0].url} />
                </AvatarContainer>
                <BottomPortion>
                <Title>User Profile</Title>
                    <DataContainer>
                        
                            <InfoSlot>
                                <DataTitle>User Name:</DataTitle>
                                <DataDesc>{user_name}</DataDesc>
                            </InfoSlot>
                            <InfoSlot>
                                <DataTitle>Display Name:</DataTitle>
                                <DataDesc>{display_name}</DataDesc>
                            </InfoSlot>
                            <InfoSlot>
                                <DataTitle>Country:</DataTitle>
                                <DataDesc>{country}</DataDesc>
                            </InfoSlot>
                        
                            <InfoSlot>
                                <DataTitle>Email:</DataTitle>
                                <DataDesc>{email}</DataDesc>
                            </InfoSlot>
                            <InfoSlot>
                                <DataTitle>Followers:</DataTitle>
                                <DataDesc>{followers}</DataDesc>
                            </InfoSlot>
                        
                    </DataContainer>
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
    overflow: hidden;
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
const BottomPortion = styled.div`
    position:relative;
    min-width: 400px;
    width:100%;
    height:100%;
    top:20%;
    display:flex;
    align-items:flex-start;
    justify-content: center;
    gap:2rem;
`
const Avatar = styled.img`
    object-fit: cover;
`
const DataTitle = styled.h1`
    color:#FFFFFF80;
    font-size:.75rem;
    font-family: "Catamaran","Sans Serif";
    text-transform: uppercase;
    letter-spacing: .05rem;
    transition: all .5s ease-in-out;
    &:hover{
        color:#800000;
    }
`
const DataDesc = styled.h1`
    color:white;
    font-size:1.5rem;
    font-family: "Palanquin","Sans Serif";
    text-transform: uppercase;
    letter-spacing: .05rem;
    transition: all .5s ease-in-out;
    &:hover{
        color:#800000;
    }
`
const Title = styled.p`
    position:absolute;
    text-transform: uppercase;
    letter-spacing: .05rem;
    color:white;
    top:-1.5rem;
    font-family: "Roboto";
    font-weight: 800;
    font-size: 2rem;
    transition: all .5s ease-in-out;
    &:hover{
        color:#800000;
    }
`
const InfoSlot = styled.div`
    display: flex;
    flex-direction: column;
    gap:0rem;
    line-height: 1.15rem;
`
const DataContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap:1rem;
    background-color: #55555550;
    padding:2rem;
    border: 0.15rem solid #aaaaaa50;
    border-radius: 20px;
    height:50%;
    box-shadow: 5px 5px 5px #222222;
`