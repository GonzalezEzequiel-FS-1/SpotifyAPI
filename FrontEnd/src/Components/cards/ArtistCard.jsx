import styled from 'styled-components'
import propTypes from 'prop-types'
import { PiPlayCircleFill } from "react-icons/pi";
import { PiPauseCircleBold } from "react-icons/pi";
import SkrillexCover from '../../assets/SkrillexCover.jpg'
import alphaFilter from '../../assets/alpha-filter.png'

export default function ArtistCard({ background, title, artist, onClick }) {
    return (
        <Container>
       
            <Title>{title}</Title>
            <Desc>{artist}</Desc>
            <Play />
        </Container>
    )
}

ArtistCard.propTypes = {
    background: propTypes.string.isRequired,
    title: propTypes.string.isRequired,
    onClick: propTypes.func.isRequired,
}

const Container = styled.div`
  position: relative;
  min-width: 350px;
  height: 350px;
  border-radius: 25px;
  flex-shrink: 0;
  padding: 20px;
  display: flex;
  align-items: flex-end;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;

  /* Apply the border for the metallic effect */
  border: 2px solid transparent;
  background-origin: border-box;
  background-clip: padding-box, border-box;

  /* Background Image and Transparent Middle */
  background-image: 
    linear-gradient(rgba(255, 255, 255, 0.1), rgba(0, 0, 0, 0.1)), /* Faded metallic overlay */
    url(${SkrillexCover}); /* Background image */
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  
  /* Box Shadow and Border Effects */
  box-shadow: 
    0 10px 30px rgba(0, 0, 0, 0.5),  /* Outer shadow */
    inset 0 -2px 10px rgba(255, 255, 255, 0.2), /* Inner top glow */
    inset 0 2px 10px rgba(0, 0, 0, 0.2); /* Inner bottom shadow */
  
  /* Creating transparent middle */
  background-clip: padding-box, border-box;
  -webkit-background-clip: padding-box; /* Support for older browsers */

  /* Hover effect */
  &:hover {
    transform: scale(1.05);
  }

  /* Reflection Light Effect */
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 25px;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(0, 0, 0, 0));
    mix-blend-mode: screen;
    pointer-events: none;
  }
`;



const Title = styled.p`
  color: white;
`

const Desc = styled.p`
  color: white;
`

// Center the Play button
const Play = styled(PiPlayCircleFill)`
  position: absolute;
  bottom: 0%;
  left: 50%;
  transform: translate(-50%, -10%);
  font-size: 3rem;
  color: #ffffff80;
  cursor: pointer; 
  &:hover{
    color:#ffffff99
  }
`

const Pause = styled(PiPauseCircleBold)`
`
