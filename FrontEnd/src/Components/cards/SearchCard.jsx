import axios from "axios"
import styled from "styled-components"
import { useState } from 'react'
import TextField from '../Fields/TextField'


export const SearchCard = () => {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([],)
  const [type, setType] = useState("track")
  
  const handleSearch = async (e) => {
    e.preventDefault()
  
    try {
      const response = await axios.post('http://localhost:3069/api/search/',
        {
          query,
          type
        }, {
        withCredentials: true
      }
      )
      
      const searchResults = response.data.data.tracks.items
      console.log(searchResults)
      setResults(searchResults)

    } catch (err) {
      console.log(err.message)
    }

  }
  const handleSearchType = async (e) => {
    setType(e.target.value)
  }
  
  return (
    <Container>
      <Text>Hello, World</Text>
      <Form onSubmit={handleSearch}>
        <TextField
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search"
        />
        <select value={type} onChange={handleSearchType}>

          <option value={"track"}>Song</option>
          <option value={"album"}>Album</option>
          <option value={"playlist"}>Playlist</option>
          <option value={"artist"}>Artist</option>
        </select>

        <button type="submit">CLICK ME!!!</button>

      </Form>
      {results.map((result)=>(
        <div key={result.id}>
          <p>{result.name}</p>
          <img src={result.album.images[0].url}></img>
          <p>{result.artists[0].name}</p>
          <button onClick={()=>{console.log(result.id)}}>PLAY</button>
        </div>
      ))}

    </Container>
  )
}


const Container = styled.div`
  background-color:honeydew;
  height:100%;
`
const Text = styled.p`
  color:red;
  font-family: "Roboto";
  font-size: 4rem;
  font-weight: 900;
`

const Form = styled.form`
  width:100%;
  background-color: red;
`