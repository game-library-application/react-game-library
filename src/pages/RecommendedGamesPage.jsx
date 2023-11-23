import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const API_URL = "https://api-json-server.adaptable.app";

function RecommendedGamesPage() {
  const [gamesList, setGamesList] = useState(null);
  let recommendedGames = null;

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

  // For now, sort games by rating
  function sortGamesbByRating() {
    // Deep copy of array in order to avoid modifying the original array
    recommendedGames = structuredClone(gamesList);

    // First sort by rating, descending
    recommendedGames.sort((a, b) => b.rating - a.rating);

    // Then sort by alphabetical order
    recommendedGames.sort((a, b) => {
      if (a.rating === b.rating) {
        return a.title.localeCompare(b.title);
      }
    });
    // Show only top 10
    recommendedGames.splice(10);
  }

  return (
    <>
      <div className="GamesListDiv">
        {gamesList === null ? (
          <h1>Game list loading...</h1>
        ) : (
          (sortGamesbByRating(),
            recommendedGames.map((game) => {
              return (
                <div className="GamesListImageDiv" key={game.id}>
                  <Link to={`/games/${game.id}`}>
                    <div className="GamesListImageDiv" key={game.id}>
                      <img src={game.image_url} />
                      <div className="BgDiv"></div>
                      <span className="TitleSpan">
                        <p className="title">{game.title.toUpperCase()}</p>
                      </span>
                    </div>
                  </Link>
                </div>
              );
            }))
        )}
      </div>
    </>
  );
}

export default RecommendedGamesPage;
