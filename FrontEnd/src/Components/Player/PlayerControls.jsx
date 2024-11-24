import styled from "styled-components";
import usePlayer from "../../context/usePlayer";
import { useState } from "react";
import PropTypes from "prop-types";

const PlayerControls = () => {
    const { currentSong, isPlaying, playSong, pauseSong } = usePlayer();
    const [song, setSong] = useState("");

    const handlePlay = () => {
        playSong(song || "Default Song");
    };

    return (
        <Container>
            {currentSong ? (
                <>

                    <SpotifyEmbed trackUrl={currentSong.id} />
                </>
            ) : (
                <Text>No Media Selected</Text>
            )}


        </Container>
    );
};

// SpotifyEmbed Component to display the embedded player
const SpotifyEmbed = ({ trackUrl }) => {
    const trackId = trackUrl?.split("/").pop();

    return (
        trackId && (
            <IframeContainer>
                <Iframe
                    src={`https://open.spotify.com/embed/track/${trackId}`}
                    //frameBorder="0"
                    
                    allow="encrypted-media"
                    title="Spotify Player"
                ></Iframe>
            </IframeContainer>
        )
    );
};


SpotifyEmbed.propTypes = {
    trackUrl: PropTypes.string.isRequired,
};

export default PlayerControls;

const Container = styled.div`
  width: 100%;
  display: flex;
  height:50%;
  align-items: center;
  justify-content: center;
`;

const Text = styled.p`
  color: #fff;
  font-size: 1.5rem;
  height: 100%;
  padding: 0.5rem;
  font-family: "Palanquin", sans;
  font-weight: 600;
  letter-spacing: 0.1rem;
`;


const IframeContainer = styled.div`
    width:fit-content;
    height:fit-content;

`;
const Iframe = styled.iframe`
    width:80rem;
    height:18rem;
    margin-top:50px;
    margin-bottom:0px;
    border:none;
    padding:0;
`