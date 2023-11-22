import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import GameInfo from "../components/GameInfo";

function GameDetailsPage() {
  const [gameDetails, setGameDetails] = useState(null);
  const { gameId } = useParams();

  const navigate = useNavigate();

  const API_URL = "https://api-json-server.adaptable.app";

  useEffect(() => {
    axios
      .get(`${API_URL}/games/${gameId}`)
      .then((response) => {
        setGameDetails(response.data);
      })
      .catch((error) => {
        console.log("Something went wrong with the details");
        console.log(error);
      });
  }, []);

  const deleteGame = () => {
    axios
      .delete(`${API_URL}/games/${gameId}`)
      .then(() => {
        navigate("/games");
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  };

  return (
    <div>
      <div className="GameInfoContainer">
        <div className="GameInfoDetails">
          {gameDetails === null ? (
            <h1>Loading...</h1>
          ) : (
            <GameInfo game={gameDetails} />
          )}
          <div className="GameInfoButtons">
            <Link to={`/edit/${gameId}`}>
              <button className="EditButton">Edit</button>
            </Link>

            <button onClick={deleteGame} className="DeleteButton">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GameDetailsPage;
