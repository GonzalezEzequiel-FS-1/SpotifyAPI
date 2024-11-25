import { useContext } from "react";
import PlayerContext from "./PlayerContext";

const usePlayer = () => useContext(PlayerContext)

export default usePlayer;