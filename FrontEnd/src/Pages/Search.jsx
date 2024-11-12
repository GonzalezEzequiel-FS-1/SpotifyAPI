import styled from 'styled-components'
import MUISearchField from '../Components/Fields/MUISearchField'
import { useState, useEffect } from 'react'
export default function Search() {
    const [search, setSearch] = useState('')
    const handleSearch = (e) =>{
        e.preventDefault()
        console.log(search)
    }
    useEffect(()=>{

    },[search])
  return (
    <Container onSubmit={handleSearch}>
      <MUISearchField
        required
          id="standard-search"
          label="search"
          type='text'
          value={search}
          onChange={(e)=>{setSearch(e.target.value)}}
          defaultValue=""
      />
      <Text>Hello World</Text>
    </Container>
  )
}
const Container = styled.form`
`

const Text = styled.h1`
    color:white;
`