import { Route, Routes } from 'react-router-dom'

import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Homepage from './pages/Homepage'
import GamesListPage from './pages/GamesListPage'
import GameDetailsPage from './pages/GameDetailsPage'
import AddGamePage from './pages/AddGamePage'
import EditGamePage from './pages/EditGamePage'

import './App.css'

function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={< Homepage />} />
        <Route path="/games" element={< GamesListPage />} />
        <Route path="/games/:gameId" element={< GameDetailsPage />} />  
        <Route path="/add" element={< AddGamePage />} />  
        <Route path="/edit/:gameId" element={< EditGamePage />} />  
      </Routes>
      <Footer />
    </>
  )
}

export default App
