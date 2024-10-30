import styled from "styled-components";
import SubmitBtn from "../Components/Buttons/SubmitBtn";
import TextField from "../Components/Fields/TextField";

const handleSubmit = () => {
    console.log(`TestButton`)
}
export default function SignUp() {
    return (
        <Container>
            <FieldContainer>
                <Label>Email</Label>
                <TextField
                    placeholder=""
                    type="text"
                />
            </FieldContainer>
            <FieldContainer>
                <Label>Password</Label>
                <TextField
                    placeholder=""
                    type="text"
                />
            </FieldContainer>
            <FieldContainer>
                <Label>Confirm Password</Label>
                <TextField
                    placeholder=""
                    type="text"
                />
            </FieldContainer>



            <SubmitBtn onClick={handleSubmit} text={"SUBMIT"} />
        </Container>
    )
}

const Container = styled.form`
    display:flex;
    flex-direction: column;
    background-color: #dddddd;
    border-radius:10px;
    box-shadow: 0px 0px 10px 1px #0A122A;
    align-items: center;
    gap:1rem;
    margin-top: 2rem;
    min-width: 400px;
    padding:2rem;
`
const FieldContainer = styled.div`
    display:flex;
    flex-direction: column;
    align-items: left;
    gap:0rem;

`
const Label = styled.label`
    text-align:left;
    font-family: "Palanquin";
    font-weight:700;
`
