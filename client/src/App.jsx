import {BrowserRouter ,Route, Routes} from 'react-router-dom'
import SignUpPage from "./pages/SignUpPage"
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import PingBackend from './pages/PingBackend'


function App() {
  

  return (
    <>
    <BrowserRouter>
    <Routes>
     <Route path="/" element = {<HomePage />}/>
     <Route path="/signup" element = {<SignUpPage />}/>
     <Route path='/login' element ={<LoginPage />}/>
     <Route path='/ping-backend' element={<PingBackend/>}/>
    </Routes>
    </BrowserRouter>

 
    </>
  )
}

export default App
