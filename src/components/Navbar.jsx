import { NavLink } from 'react-router-dom'
import Homepage from '../pages/Homepage'
import GamesListPage from '../pages/GamesListPage'
import AddGamePage from '../pages/AddGamePage'
import RecommendedGamesPage from '../pages/RecommendedGamesPage'

function Navbar() {

    return (
        <>
            <nav className="Nav">
                <NavLink to="/" element={< Homepage />} className={"NavLink"}>Home</NavLink>
                <NavLink to="/games" element={< GamesListPage />} className={"NavLink"}>Browse Games</NavLink>
                <NavLink to="/recommended" element={< RecommendedGamesPage/>} className={"NavLink"}>Recommended Games</NavLink>
                <NavLink to="/add" element={< AddGamePage />} className={"NavLink"}>Add Game</NavLink>
            </nav>
        </>
    )
}

export default Navbar