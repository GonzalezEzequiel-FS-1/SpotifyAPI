import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import CircularIndeterminate from "../Progress/CircularProgress";
import PropTypes from "prop-types";
import usePlayer from "../../context/usePlayer";



export default function Categories({song}) {
    const { playSong } = usePlayer()
    const [categories, setCategories] = useState([]);
    const [playlists, setPlaylists] = useState([]);
    const [tracks, setTracks] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [displayedData, setDisplayedData] = useState("category");
    const [currentItem, setCurrentItem] = useState({});
    //const [bgColor, setBGColor] = useState("#5555550")

    const handleCategories = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:3069/api/categories', { withCredentials: true });
            const categoriesData = response.data.data;
            categoriesData ? setCategories(categoriesData) : console.log('Categories not found');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handlePlaylists = async (catId) => {
        try {
            const response = await axios.post(`http://localhost:3069/api/categories/playlists/`, { catId }, { withCredentials: true });
            if (response) {
                const playlistData = response.data.data.items;
                console.log(`RESPONSE DATA ====>>${JSON.stringify(playlistData)}`);
                setPlaylists(playlistData);
                setDisplayedData("playlist");
                setCurrentItem(response.data);
            }
        } catch (error) {
            console.error(error.message);
        }
    };

    const handleTracks = async (playlistId) => {
        try {
            console.log('Starting Set Tracks')
            const response = await axios.post("http://localhost:3069/api/categories/playlists/tracks", { playlistId }, { withCredentials: true });
            if (response) {

                const tracksData = response.data.data.items;
                console.log(tracksData)
                setTracks(tracksData);
                setDisplayedData("track");
                setCurrentItem(response.data);
            }
        } catch (error) {
            console.error(error.message);
        }
    };
    const handleSongPlayer = async (song) =>{
        console.log(`Image Clicked: ${song}`)
        playSong(song)
    }
    //Testing Purposes only
    const handleSearchTrack = async (trackId) => {
        const response = await axios.post('http://localhost:3069/api/search/track',{ trackId }, {withCredentials:true})
    }  


    /////


    useEffect(() => {
        handleCategories();
    
    }, [displayedData]);

    return loading ? (
        <MainContainer>
            <Loading />
        </MainContainer>
    ) : error ? (
        <ErrorMessage>{error}</ErrorMessage>
    ) : !Array.isArray(categories) || categories.length === 0 ? (
        <h1>No Categories Available</h1>
    ) : (
        <MainContainer>
            {displayedData === "category" ? (
                categories.map((category) => (

                    <SingleCategory
                        key={category.id}
                        array={category}
                        title={category.name}
                        icon={category.icons}
                        id={category.id}
                        onClick={() => handlePlaylists(category.id)}
                    />
                ))
            ) : displayedData === "playlist" ? (
                playlists.length > 0 ? (
                    playlists.map((playlist) => (
                        <CardContainer key={playlist.id} onClick={() => handleTracks(playlist.id)}>
                            <Title>{playlist.name}</Title>
                            <Thumbnail
                                src={playlist.images[0]?.url || 'default-image-url'}
                                alt={playlist.name}
                                width={100}
                                height={100}

                            />
                            {/* <p>{playlist.description}</p> */}
                        </CardContainer>
                    ))
                ) : (
                    <h2>No Playlists Available</h2>
                )
            ) : (
                tracks.map((trackItem) => {
                    const track = trackItem.track;
                    const albumImage = track.album.images[0]?.url; 

                    return (
                        <CardContainer key={track.id}>
                        <ImageCont>
                        
                            {albumImage && <Thumbnail src={albumImage} alt={track.name}  />}
                            <PlayMe  onClick={() =>  handleSongPlayer(track) }>PLAY</PlayMe>
                            </ImageCont>
                            <Title>{track.name}</Title>
                            <ArtistName>
                                {track.artists.map((artist) => artist.name).join(", ")}
                            </ArtistName>
                            <AlbumName>{track.album.name}</AlbumName>{
                                track.preview_url ?(
                                    track.preview_url && (
                                <AudioPlayer controls>
                                    <source src={track.preview_url} type="audio/mpeg" />
                                    Your browser does not support the audio element.
                                </AudioPlayer>
                            )
                                ):(
                                        <SubTitle>No Preview Available</SubTitle>
                                )
                            }
                            
                        </CardContainer>
                    );
                })

            )}
        </MainContainer>
    );
}

Categories.propTypes = {
    setCount: PropTypes.func.isRequired,
};

function SingleCategory({ title, icon, id, onClick }) {
    return (
        <CardContainer onClick={onClick}>
            <Title>{title}</Title>
            <Thumbnail
                src={icon[0]?.url || ''}
                width={100}
                height={100}
                alt={title}
                id={id}
            />
        </CardContainer>
    );
}

SingleCategory.propTypes = {
    array: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    icon: PropTypes.array.isRequired,
    id: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
};

const MainContainer = styled.div`
    display: grid;
    grid-template-rows: repeat(1, 1fr); 
    grid-auto-flow: column; 
    align-items: center;
    gap: 2rem;
    overflow-x: auto; 
    padding: 1rem;
    width: 100%;
    height:100%;
    filter: grayscale(0);
`;
const ImageCont = styled.div`
    display:flex;
    align-items:center;
    justify-content: center;

`


const PlayMe = styled.p`
    font-family: "Catamaran";
    font-size: 2rem;
    font-weight: 800;
    letter-spacing: 0.25rem;
    filter: blur(10px); /* Initially blurred */
    position: absolute;
    color: #00000000; /* Initially transparent */
    transition: all 0.5s ease-in-out;
    cursor: pointer;
    border-radius: 20px;
    border: 2px solid #f5f5f550;
    padding: 1rem;
    text-align: center;
    
    /* Hover effect to change background color */
    &:hover {
        background-color: #00000070;
    }
    
    /* Active effect to scale the text when clicked */
    &:active {
        transform: scale(0.8);
    }
`;

const Thumbnail = styled.img`
    width: auto;
    height: 80%;
    object-fit: cover;
    transition: transform 0.3s, filter 0.3s;
    border-radius: 20px;
    box-shadow: 5px 5px 15px black;
    cursor: pointer;
    
    &:hover {
        filter: brightness(0.8) blur(2px); /* Apply blur and brightness change on hover */
        transform: scale(1.05);
    }
`;

const CardContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    background-color: #55555590;
    gap: 0.5rem;
    margin-left: 2rem;
    overflow: hidden;
    width: 15rem;
    height: 98%;
    padding: 1rem;
    position: relative;
    border-radius: 20px;
    box-shadow: 5px 5px 20px black;
    transition: all 0.25s ease-in-out;
    border: 3px solid #555555;
    
    /* On hover of the container */
    &:hover {
        transform: scale(1.1);
        border: 0px solid #00000000;
    }
    
    /* Hover effect on the CardContainer to make PlayMe visible */
    &:hover ${PlayMe} {
        color: #f5f5f5; /* Make the text visible */
        filter: blur(0); /* Unblur text */
    }
`;


const Title = styled.p`
    font-family: "Roboto";
    line-height: 85%;
    font-size: 1rem;
    font-weight: 800;
    color: white;
    letter-spacing: .25rem;
    text-align: center;
    top: .5rem;
    text-decoration: none;
    max-width: 80%;
    transition: all .15s ease-in-out;
    &:hover {
        color: #FF000050;
    }
`;



const ErrorMessage = styled.p`
    color: red;
    font-family: "Roboto";
    font-size: 1rem;
`;

const Loading = styled(CircularIndeterminate)`
    position: relative;
    top: 50%;
    left: 50%;
    z-index: 10;
`;

const ArtistName = styled.p`
    font-size: 0.85rem;
    color: #ddd;
    text-align: center;
`;

const AlbumName = styled.p`
    font-size: 0.75rem;
    color: #aaa;
    text-align: center;
`;

const AudioPlayer = styled.audio`
    width: 100%;
    border-radius: 20px;
    margin-top: 0.5rem;
    background-color: white;
    box-shadow: 5px 5px 5px 1px #22222290;
`;

const SubTitle = styled.p`
    color:white;
    font-size:1rem;
    font-family: "Roboto";
`
