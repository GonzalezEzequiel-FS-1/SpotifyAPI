
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import SignIn from './Pages/SignIn'
import SignUp from './Pages/SignUp'
import FourOhFour from './Pages/FourOhFour'
import NavBar from './Components/NavBar'
import styled from 'styled-components'
import SpotiLoad from './Pages/SpotiLoad'

export default function App() {
  return (
    <Router>
    <MainContainer>
    <NavBar />
      <Routes>

          <Route path='/home' element={<Home />} />
          <Route path='/signin' element={<SignIn />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/*' element={<FourOhFour />} />
          <Route path='/spotify-login' element={<SpotiLoad />} />
      </Routes>
      </MainContainer>
    </Router>
  )
}

const MainContainer =  styled.div`
  display:flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background: linear-gradient(#26222A 90%, #23502D);
  height:100vh;
  width:100vw;
`
