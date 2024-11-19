import axios from "axios"
import styled from "styled-components"
import { useState } from 'react'
import TextField from '../Fields/TextField'


export const SearchCard = () => {
  const [results, setResults] = useState([],)
  const handleSearch = async (e) => {
    e.preventDefault()
    console.log(results)
    try {
      const response = await axios.post('http://localhost:3069/api/search/',
        {query:results}, { withCredentials: true }
      )
      console.log(response.data.data.items)
      const searchResults = response.data.data;
      setResults(searchResults)

    } catch (err) {
      console.log(err.message)
    }

  }
  return (
    <Container>
      <Text>Hello, World</Text>
      <Form onSubmit={handleSearch}>
        <TextField
          type={"text"}
          value={results}
          onChange={(e) => setResults(e.target.value)}
          placeholder={"Search"}
        />

        <button type="submit">CLICK ME!!!</button>

      </Form>

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
  height: 100%;
  background-color: red;
`