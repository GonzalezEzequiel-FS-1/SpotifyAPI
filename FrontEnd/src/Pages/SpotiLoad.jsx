import styled from "styled-components";
import SubmitBtn from "../Components/Buttons/SubmitBtn";
const SpotiLoad = () => {
    const handleSpotifyConnect = () => {
        window.location.href = 'http://localhost:3069/api/auth'; 
    };

    return (
        <Container>
            <InfoBox>
                <Title>One More Step!</Title>
                <SubTitle>Connect your Spotify account to access more features.</SubTitle>
                <SubmitBtn onClick={handleSpotifyConnect} text={"Login to Spotify"}>Connect to Spotify</SubmitBtn>
            </InfoBox>
        </Container>
    );
};

export default SpotiLoad;

const Title = styled.h1`
    font-family: "Catamaran", "Sans Serif";
    letter-spacing: .20rem;
    text-transform: capitalize;
    text-align: left;
`
const Container = styled.div`
    display:flex;
    align-items: center;
    justify-content: center;
`

const SubTitle = styled.p`
    font-family: Sintony;
    font-size: 1rem;
    text-align: center;
    color:#121212;
    font-weight: 600;
`

const InfoBox = styled.div`
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