import { useState, useEffect } from "react";
import axios from "axios";
import GameInfo from "../components/GameInfo";

function RandomGamePage() {
  const [randomGame, setRandomGame] = useState(null);

  const API_URL = "http://localhost:5005";

  useEffect(() => {
    axios
      .get(`${API_URL}/games/`)
      .then((response) => {
        setRandomGame(
          response.data[Math.floor(Math.random() * response.data.length)]
        );
      })
      .catch((error) => {
        console.log("Error: ");
        console.log(error);
      });
  }, []);

  return (
    <div className="GameInfoContainer">
      <div className="GameInfoDetails">
      <div className="RandomGameDiv">
        {randomGame === null ? (
          <h1>Loading...</h1>
        ) : (
          <GameInfo game={randomGame} />
        )}
      </div>
      </div>
    </div>
  );
}

export default RandomGamePage;
