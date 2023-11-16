import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import axios from 'axios'

const API_URL = "http://localhost:5005"

function GamesListPage() {

    const [gamesList, setGamesList] = useState(null)

    useEffect(() => {
        axios.get(API_URL + "/games")
            .then((response) => {
                setGamesList(response.data)
            })
            .catch((error) => {
                console.log("An error occurred: ")
                console.log(error)
            })
    }, [])

    return (
        <>
            <div className="GamesListDiv">
                {gamesList === null
                    ? <h1>Game list loading...</h1>
                    : (gamesList.map((game) => {
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

export default GamesListPage