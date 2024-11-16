import styled from "styled-components";
import PropTypes from "prop-types";
export default function SingleCategory({array,title, icon, id}) {
  return (
    <MainContainer>
   {
    array.map((category, index) => (
        <CardContainer key={index}>
            <Title>{title}</Title>
            <Thumbnail
                src={icon[0]?.url || ''}
                width={100}
                height={100}
                alt={category.title}
                id={id}
                onClick={(e) => {
                    e.preventDefault();
                }}
            />
        </CardContainer>
    ))
}

</MainContainer>
  )
}

SingleCategory.propTypes = {
    array: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
    icon: PropTypes.array.isRequired, // Assuming icon is an array of objects
    id: PropTypes.string.isRequired,
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