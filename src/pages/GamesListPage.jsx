import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:5005";

function GamesListPage() {
  const [gamesList, setGamesList] = useState(null);
  const [searchGames, setSearchGames] = useState("");


  useEffect(() => {
    axios
      .get(API_URL + "/games")
      .then((response) => {
        setGamesList(response.data);
      })
      .catch((error) => {
        console.log("An error occurred: ");
        console.log(error);
      });
  }, []);
  const handleSearch = (e) => {
    e.preventDefault();
    setSearchGames(e.target.value);
  };

  const games = gamesList === null ? [] : gamesList.filter((game) => {
    return game.title.toLowerCase().includes(searchGames.toLowerCase());
  });

  return (
    <>
      <div>
        <input
          type="search"
          value={searchGames}
          placeholder="Search a game..."
          onChange={handleSearch}
        />
      </div>

      <div className="GamesListDiv">
        {games === null ? (
          <h1>Game list loading...</h1>
        ) : (
          games.map((game) => {
            return (
              <div className="GamesListImageDiv" key={game.id}>
                <Link to={`/games/${game.id}`}>
                  <img src={game.image_url} />
                </Link>
              </div>
            );
          })
        )}
      </div>
    </>
  );
}

export default GamesListPage;
