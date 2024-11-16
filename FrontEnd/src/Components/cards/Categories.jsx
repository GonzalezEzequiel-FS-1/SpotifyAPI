import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import CircularIndeterminate from "../Progress/CircularProgress";
import PropTypes from "prop-types";

export default function Categories() {
    const [categories, setCategories] = useState([]);
    const [playlists, setPlaylists] = useState([]);
    const [tracks, setTracks] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [displayedData, setDisplayedData] = useState("category");
    const [currentItem, setCurrentItem] = useState({});

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
                setPlaylists(playlistData);  // Set the playlists correctly
                setDisplayedData("playlist");
                setCurrentItem(response.data);
            }
        } catch (error) {
            console.error(error.message);
        }
    };

    const handleTracks = async (playlistId) => {
        try {
            const response = await axios.post("http://localhost:3069/api/playlists/tracks", { playlistId }, { withCredentials: true });
            if (response) {
                setTracks(response.data);
                setDisplayedData("track");
                setCurrentItem(response.data);
            }
        } catch (error) {
            console.error(error.message);
        }
    };

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
                tracks.map((track) => (
                    <SingleCategory
                        key={track.id}
                        array={track}
                        title={track.name}
                        icon={track.icons}
                        id={track.id}
                    />
                ))
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
    grid-template-rows: repeat(2, 1fr); 
    grid-auto-flow: column; 
    gap: 2rem;
    overflow-x: auto; 
    padding: 1rem;
    width: 100%;
`;
const SectionTitle = styled.h2`
`
const CardContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #55555590;
    gap: 0.5rem;
    padding: .5rem;
    width: 10rem;
    height: 10rem;
    position:relative;
    border-radius: 20px;
    box-shadow: 5px 5px 20px black;
    transition: all .25s ease-in-out;
    border:3px solid #555555;
    &:hover {
        transform: scale(1.1);
        top: .15rem;
        border: 0px solid #00000000;
    }
`;

const Title = styled.p`
    font-family: "Roboto";
    line-height: 85%;
    font-weight: 800;
    color: white;
    letter-spacing: .25rem;
    text-align: center;
    position: absolute;
    top: .5rem;
    text-decoration: none;
    max-width: 80%;
    transition: all .15s ease-in-out;
    &:hover {
        color: #FF000050;
    }
`;

const Thumbnail = styled.img`
    width: 100px;
    height: auto;
    max-height: 100px;
    object-fit: cover;
    position: absolute;
    bottom: 0.75rem;
    cursor: pointer;
    transition: all .25s ease-in-out;
    border-radius: 20px;
    box-shadow: 5px 5px 15px black;
    &:hover {
        filter: blur(4px);
        transform: scale(.99);
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
