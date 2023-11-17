import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import GameInfo from "../components/GameInfo";

function GameDetailsPage() {
  const [gameDetails, setGameDetails] = useState(null);
  const { gameId } = useParams();

  const navigate = useNavigate();

  const API_URL = "http://localhost:5005";

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
        console.log("Something went wrong while trying to delete");
        console.log(error);
      });
  };

  return (
    <div>
      <h1>Game Info</h1>
      {gameDetails === null ? (
        <h1>Loading...</h1>
      ) : (
        <GameInfo game={gameDetails} />
      )}
      <Link to="/edit">
        <button>Edit</button>
      </Link>

      <button onClick={deleteGame}>Delete</button>
    </div>
  );
}

export default GameDetailsPage;
