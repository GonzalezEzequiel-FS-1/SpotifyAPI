import axios from "axios"
import { useEffect, useState } from "react"
import styled from "styled-components"
import CircularIndeterminate from "../Progress/CircularProgress";

export default function Categories() {
    //Set all States
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    //Function to get the categories Data
    const handleCategories = async () => {
        setLoading(true)
        try {
            const response = await axios.get('http://localhost:3069/api/categories', {
                withCredentials: true
            })
            const categoriesData = response.data.data;
            setCategories(categoriesData);
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        handleCategories()
        
    }, [])
    return loading ? (
        <CircularIndeterminate />
    ) : error ? (
        <ErrorMessage>{error}</ErrorMessage>
    ) : !Array.isArray(categories) || categories.length === 0 ? (
        <h1>No Categories Available</h1>
    ) : (
        <MainContainer>
            {categories.map((category, index) => (
                <CardContainer key={index}>
                    <Title>{category.name}</Title>
                    <Thumbnail src={
                        category.icons[0].url || ''
                        }
                        width={100}
                        height={100}
                        alt={category.name} />
                </CardContainer>
            ))}
        </MainContainer>
    );
    
}
const MainContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    grid-template-rows: repeat(2, 1fr); // This creates 2 equal rows
    gap: 1rem; // Adds space between items
    width: 100%; // Full-width container
    max-width: 1200px; // Optional max-width
    margin: 0 auto; // Center the container
`;

const CardContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color:blue;
    gap: 0.5rem;
    padding: .5rem;
    width: 10rem;  
    height: 10rem;
    position:relative;


`
const Title = styled.p`
z-index: 1;
font-family: "Roboto";
line-height: 85%;
font-weight: 800;
letter-spacing: .25rem;
text-align: center;
position:absolute;
top: 0.5rem;
 `
const Thumbnail = styled.img`
width: 100px;
height: auto;
max-height: 100px;
object-fit: cover;
position:absolute;
bottom: 0.5rem;
`;



const ErrorMessage = styled.p`
    color:red;
    font-family: "Roboto";
    font-size:1rem;
`