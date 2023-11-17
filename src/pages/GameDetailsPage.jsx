import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import GameInfo from "../components/GameInfo";

function GameDetailsPage() {
  const [gameDetails, setGameDetails] = useState([]);
  const { gameId } = useParams();

  const API_URL = "http://localhost:5005"

  useEffect(() => {
    axios
      .get(API_URL + `/games/${gameId}`)
      .then((response) => {
        console.log(response.data);
        setGameDetails(response.data);
      })
      .catch((error) => {
        console.log("Something went wrong with the details");
        console.log(error);
      });
  }, []);

  return (
    <div>
      <h1>Game Info</h1>
      
  
      <GameInfo game={gameDetails} />
   

      <Link to="/edit">
        <button>Edit</button>
      </Link>

      <button>Delete</button>
    </div>
  );
}

export default GameDetailsPage;
