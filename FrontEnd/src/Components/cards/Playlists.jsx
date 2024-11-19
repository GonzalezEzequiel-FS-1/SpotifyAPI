import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import CircularIndeterminate from "../Progress/CircularProgress";

export default function Playlists() {
    const [categories, setCategories] = useState([]);
    const [singleCategory, setSingleCategory] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showSingle, setShowSingle] = useState(false);

    // Function to get the categories Data
    const handleCategories = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:3069/api/categories', { withCredentials: true });
            const categoriesData = response.data.data;
            setCategories(categoriesData);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Handle category link click
    const handleCatLink = async (catLink) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post('http://localhost:3069/api/categories', { catLink }, { withCredentials: true });
            const singleCatData = response.data;
            setSingleCategory(singleCatData);
            setShowSingle(true); 
        } catch (err) {
            setError(err.message); 
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        handleCategories();
    }, []);

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
            {showSingle ? (
                <SingleCategoryView singleCategory={singleCategory} />
            ) : (
                categories.map((category, index) => (
                    <CardContainer key={index}>
                        <Title>{category.name}</Title>
                        <Thumbnail
                            src={category.icons[0]?.url || ''}
                            width={100}
                            height={100}
                            alt={category.name}
                            onClick={() => handleCatLink(category.href)}
                        />
                    </CardContainer>
                ))
            )}
        </MainContainer>
    );
}

// Separate Single Category View (if you want to render it differently)
function SingleCategoryView() {
    return (
        <div>
            {/* <h1>{singleCategory.name}</h1>
            <p>{singleCategory.description}</p> */}
            {/* Add more details about the category if necessary */}
        </div>
    );
}

const MainContainer = styled.div`
    display: grid;
    grid-template-rows: repeat(2, 1fr); 
    grid-auto-flow: column; 
    gap: 2rem;
    overflow-x: auto; 
    padding: 1rem;
    width: 100%;
`;

const CardContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color:#55555590;
    gap: 0.5rem;
    padding: .5rem;
    width: 10rem;  
    height: 10rem;
    position:relative;
    border-radius: 20px;
    box-shadow: 5px 5px 20px black;
    transition: all .25s ease-in-out;
    border:3px solid #555555;
    &:hover{
        transform: scale(1.1);
        top:.15rem;
        border:0px solid #00000000;
    }
`;

const Title = styled.p`
    font-family: "Roboto";
    line-height: 85%;
    font-weight: 800;
    color:white;
    letter-spacing: .25rem;
    text-align: center;
    position:absolute;
    top: .5rem;
    text-decoration: none;
    max-width: 80%;
    transition: all .15s ease-in-out;
    &:hover{
        color:#FF000050;
    }
`;

const Thumbnail = styled.img`
    width: 100px;
    height: auto;
    max-height: 100px;
    object-fit: cover;
    position:absolute;
    bottom: 0.75rem;
    cursor:pointer;
    transition: all .25s ease-in-out;
    border-radius: 20px;
    box-shadow: 5px 5px 15px black;
    &:hover{
        filter: blur(4px);
        transform: scale(.99);
    }
`;

const ErrorMessage = styled.p`
    color:red;
    font-family: "Roboto";
    font-size:1rem;
`;

const Loading = styled(CircularIndeterminate)`
    position:relative;
    top:50%;
    left:50%;
    z-index:10;
`;

