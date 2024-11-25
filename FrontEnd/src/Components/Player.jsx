import { useEffect, useState, useContext } from "react";
import axios from "axios";
import PlayerContext from "../context/PlayerContext"; // Import the context

const SpotifyPlayer = () => {
    const [accessToken, setAccessToken] = useState(null);
    const { currentSong, isPlaying, playSong, pauseSong } = useContext(PlayerContext); 

    const fetchAccessToken = async () => {
        try {
            const response = await axios.post('http://localhost:3069/api/token', {}, {
                withCredentials: true,
            });
            const token = response.data.accessToken;
            console.log(token);
            setAccessToken(token);
        } catch (error) {
            console.error("Error fetching access token", error);
        }
    };

    useEffect(() => {
        
        fetchAccessToken();
    }, []);

    useEffect(() => {
        
        if (accessToken) {
            window.onSpotifyWebPlaybackSDKReady = () => {
                const player = new window.Spotify.Player({
                    name: "My Spotify Player",
                    getOAuthToken: (cb) => { cb(accessToken); },
                    volume: 0.5,
                });

                // Error handling
                player.on("initialization_error", (e) => {
                    console.error("Failed to initialize the player", e);
                });

                player.on("authentication_error", (e) => {
                    console.error("Authentication failed", e);
                });

                player.on("account_error", (e) => {
                    console.error("Failed to retrieve account info", e);
                });

                player.on("playback_error", (e) => {
                    console.error("Playback error", e);
                });

                // Device ready event
                player.on("ready", ({ device_id }) => {
                    console.log("Player is ready with device ID:", device_id);
                });

                
                player.on("player_state_changed", (state) => {
                    console.log("Playback state changed", state);
                    if (state.paused && isPlaying) {
                        playSong(currentSong); 
                    }
                    if (!state.paused && !isPlaying) {
                        pauseSong(); 
                    }
                });

               
                player.connect();

                
                if (isPlaying && currentSong) {
                    player.play({
                        uris: [currentSong.uri],
                    });
                } else {
                    player.pause();
                }
            };

            
            const script = document.createElement("script");
            script.src = "https://sdk.scdn.co/spotify-player.js";
            script.async = true;
            document.body.appendChild(script);
        }
    }, [accessToken, currentSong, isPlaying, playSong, pauseSong]); 

    return (
        <div>
            <h2>Spotify Web Player</h2>
            <p>Controls</p>
            <div>
                {currentSong ? (
                    <div>
                        <h3>{currentSong.name}</h3>
                        <p>{currentSong.artist}</p>
                    </div>
                ) : (
                    <p>No song playing</p>
                )}
            </div>
        </div>
    );
};

export default SpotifyPlayer;
