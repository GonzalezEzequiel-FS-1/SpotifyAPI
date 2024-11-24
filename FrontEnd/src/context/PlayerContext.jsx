import { createContext, useState } from "react";
import PropTypes from "prop-types";

const PlayerContext = createContext()

export const PlayerProvider = ({children}) =>{
    const [currentSong, setCurrentSong] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const playSong = (song) => {
        setCurrentSong(song),
        setIsPlaying(true);
    };
    const pauseSong = () => {
        setIsPlaying(false)
    };
    return (
        <PlayerContext.Provider value={{currentSong, isPlaying, playSong, pauseSong}}>
            {children}
        </PlayerContext.Provider>
    )
}

PlayerProvider.propTypes ={
    children: PropTypes.node
}
export default PlayerContext;