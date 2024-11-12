import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import SignIn from './Pages/SignIn'
import SignUp from './Pages/SignUp'
import FourOhFour from './Pages/FourOhFour'
import NavBar from './Components/NavBar'
import styled from 'styled-components'
import SpotiLoad from './Pages/SpotiLoad'
import ProtectedRoute from './Components/ProtectedRoute'
import { useAuth } from './context/AuthContext'

export default function App() {
  //Using isAuthenticated to show or hide the navbar
  const { isAuthenticated } = useAuth();

  return (
    <RouterContainer>
      <MainContainer>
        {isAuthenticated && <NavBar />}
        <Routes>
          <Route path='/signin' element={<SignIn />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/*' element={<FourOhFour />} />
          <Route path='/spotify-login' element={<SpotiLoad />} />
          <Route
            path='/home/:user'
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
        </Routes>
      </MainContainer>
    </RouterContainer>
  );
}
const RouterContainer = styled(Router)`
  display:flex;
  flex-direction: column;
  align-items: center;


`
const MainContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  height:100vh;
  width:100vw;
  background: linear-gradient(
    90deg,
    #000 0%,
    #000 25%,
    #1f0c23 40%,
    #1f0c23 40%,
    #010101 45%,
    #010101 60%,
    #0e1a0c 65%,
    #0e1a0c 75%,
    #000 80%
  );
`;
const SideBar = styled(NavBar)`
transform: translateX(-20.5rem);
transition: all 1s ease-in-out;
    &:hover{
        background-color: red;
        transform: translateX(0);
    }
  `;
