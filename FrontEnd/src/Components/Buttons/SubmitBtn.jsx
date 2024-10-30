import styled from "styled-components"
import propTypes from "prop-types"
export default function SubmitBtn({ text, onClick }) {
    return (
        <>
            <Button onClick={onClick}>{text}</Button>
        </>
    )
}

SubmitBtn.propTypes = {
    text: propTypes.string.isRequired,
    onClick: propTypes.string.isRequired
}
const Button = styled.button`
    background-color:#1ed760;
    border:none;
    width:80%;
    padding: 0.5rem;
    border-radius:10px;
    font-family: "Sintony", sans-serif;
    font-weight: 700;
    letter-spacing: .15rem;
    transition: .15s all ease-in-out;
    &:active{
        transform: scale(.99);
        font-weight: 100;
    }
`