import { useState, useEffect } from "react"
import { Link, useAsyncError } from "react-router-dom"
import axios from 'axios'

const API_URL = "http://localhost:5005"

function RecommendedGamesPage() {

    const [gamesList, setGamesList] = useState(null)
    const [displayList, setDisplayList] = useState(null)
    const [recommendedGames, setRecommendedGames] = useState(null)
    const [genresList, setGenresList] = useState(null)
    const [platformsList, setPlatformsList] = useState(null)

    useEffect(() => {
        axios.get(API_URL + "/games")
            .then((response) => {
                setGamesList(response.data)
                setDisplayList(sortGamesbByRating(response.data))
                return response
            })
            .then((response) => {
                setRecommendedGames(sortGamesbByRating(response.data))
                setGenresList(getGenres(response.data))
                setPlatformsList(getPlatforms(response.data))
            })
            // One more .then that runs a function to set all useStates for each "filter by" arrays?
            .catch((error) => {
                console.log("An error occurred: ")
                console.log(error)
            })
    }, [])

    function getGenres(data) {

        const allGenres = data.map((elm) => elm.genre)
        const genres = looper(allGenres);

        return genres
    }

    function getPlatforms(data) {

        const allPlatforms = data.map((elm) => elm.platform)
        const platforms = looper(allPlatforms);
        return platforms
    }

    function looper(type) {

        const newArray = [];

        for (let i = 0; i < type.length; i++) {
            for (let j = 0; j < type[i].length; j++) {
                if (newArray.indexOf(type[i][j]) === -1) {
                    newArray.push(type[i][j])
                }
            }
        }
        return newArray
    }

    // For now, sort games by rating
    function sortGamesbByRating(data) {

        // Deep copy of array in order to avoid modifying the original array
        const gamesListClone = structuredClone(data)

        // First sort by rating, descending
        gamesListClone.sort((a, b) => b.rating - a.rating)

        // Then sort by alphabetical order
        gamesListClone.sort((a, b) => {
            if (a.rating === b.rating) {
                return a.title.localeCompare(b.title)
            }
        })

        // Show only top 10
        gamesListClone.splice(10);

        return gamesListClone;
    }

    const filterPlatformHandler = (event) => {
        if (event.target.checked) {
            setDisplayList(gamesList.filter((elm) => {
                return elm.platform.includes(event.target.value)
            }))
        } else {
            setDisplayList(recommendedGames)
        }
    }

    const filterGenreHandler = (event) => {
        if (event.target.checked) {
            setDisplayList(gamesList.filter((elm) => {
                return elm.genre.includes(event.target.value)
            }))
        } else {
            setDisplayList(recommendedGames)
        }
    }

    //
    // PASSAR TUDO PARA GAMESLISTPAGE E FAZER FILTERS COMO DROPDOWN, PARA SE PODER SELECCIONAR SÓ UM DE CADA VEZ
    //

    return (
        <>
            <h1>Top 10 sorted by Rating (descending)</h1>
            <div className="FilterOptionsDiv">
                Genres
                <br></br>
                <div className="GenresDiv">
                    {genresList === null
                        ? <h3>Loading...</h3>
                        : (
                            genresList.map((genre, index) => {
                                return (
                                    <div className="GenresCheckbox" key={index}>
                                        <label>
                                            {genre}
                                            <input
                                                type="checkbox"
                                                onChange={filterGenreHandler}
                                                value={genre}
                                            />
                                        </label>
                                        <br></br>
                                    </div>
                                )
                            })
                        )
                    }
                </div>
            </div>
            <div className="FilterOptionsDiv">
                Platforms
                <br></br>
                <div className="GenresDiv">
                    {platformsList === null
                        ? <h3>Loading...</h3>
                        : (
                            platformsList.map((platform, index) => {
                                return (
                                    <div className="GenresCheckbox" key={index}>
                                        <label>
                                            {platform}
                                            <input
                                                type="checkbox"
                                                onChange={filterPlatformHandler}
                                                value={platform}
                                            />
                                        </label>
                                        <br></br>
                                    </div>
                                )
                            })
                        )
                    }
                </div>
            </div>
            <div className="GamesListDiv">
                {displayList === null
                    ? <h1>Game list loading...</h1>
                    :
                    (
                        displayList.map((game) => {
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