import { NavLink } from "react-router-dom";
import Homepage from "../pages/Homepage";
import GamesListPage from "../pages/GamesListPage";
import AddGamePage from "../pages/AddGamePage";
import RecommendedGamesPage from "../pages/RecommendedGamesPage";
import RandomGamePage from "../pages/RandomGamePage";

function Navbar() {
  return (
    <div className="Container">
      <nav className="Sidebar">
        <div className="Gamehub">
          <span>GAMEHUB</span>
          <div className="menuIcon">
            <div className="menuBar"></div>
            <div className="menuBar"></div>
            <div className="menuBar"></div>
          </div>
        </div>
        <NavLink to="/" element={<Homepage />} className={"NavLink"}>
          <div>
            <i className="home icon"></i>
          </div>
          <span className="sidebarLinks">Home</span>
        </NavLink>
       <hr className="hrSidebar"/>
        <NavLink to="/games" element={<GamesListPage />} className={"NavLink"}>
          <div>
            <i className="th icon"></i>
          </div>
          <span className="sidebarLinks">Browse</span>
        </NavLink>
        <hr className="hrSidebar"/>
        <NavLink
          to="/random"
          element={<RandomGamePage />}
          className={"NavLink"}
        >
          <div>
            <i className="random icon"></i>
          </div>
          <span className="sidebarLinks">Random</span>
        </NavLink>
        <hr className="hrSidebar"/>
        <NavLink to="/add" element={<AddGamePage />} className={"NavLink"}>
          <div>
            <i className="plus icon"></i>
          </div>
          <span className="sidebarLinks">Add Game</span>
        </NavLink>
        <hr className="hrSidebar"/>
        <NavLink
          to="/recommended"
          element={<RecommendedGamesPage />}
          className={"NavLink"}
        >
          <div>
            <i className="thumbs up icon"></i>
          </div>
          <span className="sidebarLinks">Recommended</span>
        </NavLink>
      </nav>
    </div>
  );
}

export default Navbar;
