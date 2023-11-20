import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import axios from 'axios'

const API_URL = "http://localhost:5005"

function RecommendedGamesPage() {

    const [gamesList, setGamesList] = useState(null)
    let recommendedGames = null;

    let selectedFilter = "";

    useEffect(() => {
        axios.get(API_URL + "/games")
            .then((response) => {
                setGamesList(response.data)
            })
            .catch((error) => {
                console.log("An error occurred: ")
                console.log(error)
            })
    }, [selectedFilter])

    // For now, sort games by rating
    function sortGamesbByRating() {
        // Deep copy of array in order to avoid modifying the original array
        recommendedGames = structuredClone(gamesList)

        // First sort by rating, descending
        recommendedGames.sort((a, b) => b.rating - a.rating)

        // Then sort by alphabetical order
        recommendedGames.sort((a, b) => {
            if (a.rating === b.rating) {
                return a.title.localeCompare(b.title)
            }
        })
        // Show only top 10
        recommendedGames.splice(10);
    }

    return (
        <>
            <h1>Top 10 sorted by Rating (descending)</h1>
            <div className="GamesListDiv">
                {gamesList === null
                    ? <h1>Game list loading...</h1>
                    :
                    (
                        sortGamesbByRating(),
                        recommendedGames.map((game) => {
                            return (
                                <div className="GamesListImageDiv" key={game.id}>
                                    <Link to={`/games/${game.id}`}>
                                        <img src={game.image_url} />
                                    </Link>
                                </div>
                            )
                        })
                    )}
            </div>
        </>
    )
}

export default RecommendedGamesPage