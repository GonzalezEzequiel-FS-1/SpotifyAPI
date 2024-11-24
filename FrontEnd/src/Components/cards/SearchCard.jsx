import axios from "axios"
import styled from "styled-components"
import { useState } from 'react'
import usePlayer from "../../context/usePlayer"

export const SearchCard = ({song}) => {
  const { playSong } = usePlayer();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [type, setType] = useState("track");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSongPlayer = (song) => {
    console.log(song);
    playSong(song);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setError(null); // Reset error
    const trimmedQuery = query.trim();

    if (!trimmedQuery) {
      return;  // Optionally handle empty query case
    }

    setLoading(true);

    try {
      const response = await axios.post('http://localhost:3069/api/search/', {
        query: trimmedQuery,
        type
      }, {
        withCredentials: true
      });

      const searchResults = response.data.data.tracks.items;
      console.log(searchResults);
      setResults(searchResults);
    } catch (err) {
      setError('Failed to fetch search results');
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchType = async (e) => {
    setType(e.target.value);
  };

  return (
    <Container>
      <Form onSubmit={handleSearch}>
        <TextInput
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search"
          aria-label="Search for songs, albums, or artists"
        />
        <DropDown value={type} onChange={handleSearchType}>
          <DropOptions value="track">Song</DropOptions>
          <DropOptions value="album">Album</DropOptions>
          <DropOptions value="playlist">Playlist</DropOptions>
          <DropOptions value="artist">Artist</DropOptions>
        </DropDown>

        <SearchButton type="submit" disabled={loading}>
          {loading ? "Searching..." : "SEARCH"}
        </SearchButton>
      </Form>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <SearchContainer>
        {results.length === 0 && !loading && !error && <NoResultsMessage>No results found</NoResultsMessage>}

        {results.map((result) => (
          <SearchResults key={result.id} onClick={() => handleSongPlayer(result)}>
            <InfoContainer>
              <MainSearchText>{result.name}</MainSearchText>
              <SubSearchText>{result.artists[0]?.name}</SubSearchText>
            </InfoContainer>
            <SearchImage src={result.album.images[0]?.url} />
          </SearchResults>
        ))}
      </SearchContainer>
    </Container>
  );
};

const Container = styled.div`
  overflow: hidden;
  height: 100%;
  width: 80%;
  mask-image: linear-gradient(0deg, #00000000 0%, #000000 80%);
  -webkit-mask-image: linear-gradient(0deg, #00000000 0%, #000000 80%);
`;

const Form = styled.form`
  width: 100%;
  height: 10%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-bottom: 1rem;
`;

const SearchContainer = styled.div`
  overflow: scroll;
  height: 100%;
`;

const SearchResults = styled.div`
  overflow: hidden;
  position: relative;
  height: 20%;
  margin-bottom: 1rem;
  border-radius: 20px;
  border: 2px solid #f5f5f5;
  line-height: 30px;
  cursor: pointer;
  transition: all .5s ease-in-out;
  
  &:hover {
    height: 30%;
    margin: 1.5rem 0rem;
  }
`;

const SearchImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: blur(8px);
  filter: brightness(40%);
  z-index: 0;
`;

const MainSearchText = styled.p`
  text-align: center;
  font-size: 1.5rem;
  color: #fff;
  font-family: "Catamaran";
  font-weight: 800;
  letter-spacing: .25rem;
  margin-top: .5rem;
  line-height: 100%;
`;

const SubSearchText = styled.p`
  color: #ddd;
  font-family: 'Palanquin', "Serif";
  font-weight: 600;
  letter-spacing: .15rem;
`;

const SearchButton = styled.button`
  background-color: rgba(0, 0, 0, 0.5);
  color: #fff;
  font-family: "Catamaran";
  font-weight: 800;
  letter-spacing: .15rem;
  border: 2px solid  #999999;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
  width: fit-content;
  height: 100%;
`;

const DropDown = styled.select`
  background-color: rgba(0, 0, 0, 0.5);
  color: #fff;
  font-family: "Catamaran";
  font-weight: 800;
  letter-spacing: .15rem;
  border: 2px solid  #999999;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
  width: fit-content;
  height: 100%;
`;

const DropOptions = styled.option`
  background-color: rgba(0, 0, 0, 0.5);
  color: #fff;
  font-family: "Catamaran";
  font-weight: 800;
  letter-spacing: .15rem;
  border: none;
`;

const InfoContainer = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
  width: 100%;
  position: relative;
  z-index: 1;
  padding: 1rem;
`;

const TextInput = styled.input`
  color: #fff;
  font-size: 1.5rem;
  height: 100%;
  padding: 0.5rem;
  width: 55%;
  border-radius: 5px;
  border: 2px solid  #999999;
  background-color: #00000000;
  font-family: "Palanquin", sans;
  font-weight: 600;
  letter-spacing: .10rem;
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 1rem;
  text-align: center;
  margin-top: 1rem;
`;

const NoResultsMessage = styled.div`
  color: #777;
  font-size: 1.2rem;
  text-align: center;
  margin-top: 1rem;
`;

