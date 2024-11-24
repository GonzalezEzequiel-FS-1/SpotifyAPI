import styled from 'styled-components'
import { useState } from 'react'
export default function Search() {
    const [search, setSearch] = useState('')
    const handleSearch = (e) => {
        e.preventDefault()
        console.log(search)
    }

    return (
        <Container onSubmit={handleSearch}>
            <SearchContainer>
                <Input
                    type={"text"}
                    value={search}
                    onChange={(e) =>  setSearch(e.target.value) }
                    placeholder={"Search"}
                />
            </SearchContainer>
        </Container>
    )
}
const Container = styled.div`
`


const SearchContainer = styled.form`
display:flex;
align-items: center;
justify-content: center;
gap:0;
height: fit-content;
width: 100%;
position:fixed;
top:1rem;
left:0;

`
const Input = styled.input`
    height:2.5rem;
    padding: 0.5rem;
    width:20rem;
    border-radius:5px;
    border:2px solid  #999999;
    background-color:#00000000;
    font-family:"Palanquin", sans;
    font-weight: 600;
    letter-spacing:.10rem;
    color:#555555;
    text-align: center;
    font-family: "arial black";
    &::placeholder{
        color:#555555;
        text-align: center;
    }
`