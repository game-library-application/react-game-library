import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:5005";

function GamesListPage() {
  const [gamesList, setGamesList] = useState(null);
  const [displayList, setDisplayList] = useState(null)
  const [genresList, setGenresList] = useState(null)
  const [platformsList, setPlatformsList] = useState(null)
  const [searchGames, setSearchGames] = useState("");


  useEffect(() => {
    axios
      .get(API_URL + "/games")
      .then((response) => {
        setGamesList(response.data);
        setDisplayList(response.data)
        return response
      })
      .then((response) => {
        setGenresList(getGenres(response.data))
        setPlatformsList(getPlatforms(response.data))
      })
      .catch((error) => {
        console.log("An error occurred: ");
        console.log(error);
      });
  }, []);

  // Search related functions
  const handleSearch = (e) => {
    e.preventDefault();

    setSearchGames(e.target.value);
  };

  useEffect(() => {

    const games = searchGames === "" ? gamesList : gamesList.filter((game) => {
      return game.title.toLowerCase().includes(searchGames.toLowerCase());
    })

    setDisplayList(games);
    
  }, [searchGames])

  // Populate states for filters
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

  // Handle selected filters
  const filterPlatformHandler = (event) => {
    if (event.target.checked) {
      setDisplayList(gamesList.filter((elm) => {
        return elm.platform.includes(event.target.value)
      }))
    } else {
      setDisplayList(gamesList)
    }
  }

  const filterGenreHandler = (event) => {
    if (event.target.checked) {
      setDisplayList(gamesList.filter((elm) => {
        return elm.genre.includes(event.target.value)
      }))
    } else {
      setDisplayList(gamesList)
    }
  }

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
      <div className="FilterOptionsDiv">
        Genres
        <div className="GenresDiv">
          {genresList === null
            ? <h3>Loading...</h3>
            : (
              genresList.map((genre, index) => {
                return (
                  <span className="GenresCheckbox" key={index}>
                    <label>
                      {genre}
                      <input
                        type="checkbox"
                        onChange={filterGenreHandler}
                        value={genre}
                      />
                    </label>
                  </span>
                )
              })
            )
          }
        </div>
      </div>
      <div className="FilterOptionsDiv">
        Platforms
        <div className="GenresDiv">
          {platformsList === null
            ? <h3>Loading...</h3>
            : (
              platformsList.map((platform, index) => {
                return (
                  <span className="GenresCheckbox" key={index}>
                    <label>
                      {platform}
                      <input
                        type="checkbox"
                        onChange={filterPlatformHandler}
                        value={platform}
                      />
                    </label>
                  </span>
                )
              })
            )
          }
        </div>
      </div>
      <div className="GamesListDiv">
        {displayList === null ? (
          <h1>Game list loading...</h1>
        ) : (
          displayList.map((game) => {
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
