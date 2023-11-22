import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Dropdown } from 'semantic-ui-react'
import axios from "axios";

const API_URL = "https://api-json-server.adaptable.app";

function GamesListPage() {
  const [gamesList, setGamesList] = useState(null);
  const [displayList, setDisplayList] = useState(null)
  const [genresList, setGenresList] = useState(null)
  const [platformsList, setPlatformsList] = useState(null)
  const [searchGames, setSearchGames] = useState("");

  const priceOptions = [
    {
      key: "All",
      text: "All",
      value: "All"
    },
    {
      key: "Free",
      text: "Free",
      value: "Free"
    },
    {
      key: "Paid",
      text: "Paid",
      value: "Paid"
    }
  ]

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

    const newArray = [
      {
        key: "All",
        text: "All",
        value: "All"
      }
    ];

    for (let i = 0; i < type.length; i++) {
      for (let j = 0; j < type[i].length; j++) {
        const exists = newArray.some(elm => elm.key === type[i][j])
        if (!exists) {
          newArray.push({
            key: type[i][j],
            text: type[i][j],
            value: type[i][j]
          })
        }
      }
    }
    return newArray
  }

  // Handle selected filters
  const filterGenreHandler = (event, data) => {
    setDisplayList(gamesList.filter((elm) => {
      return elm.genre.includes(data.value)
    }))
    if (data.value === "All") setDisplayList(gamesList)
  }

  const filterPlatformHandler = (event, data) => {
    setDisplayList(gamesList.filter((elm) => {
      return elm.platform.includes(data.value)
    }))
    if (data.value === "All") setDisplayList(gamesList)
  }

  const filterPriceHandler = (event, data) => {
    if (data.value === "Free") setDisplayList(gamesList.filter(elm => {
      return !elm.price
    }))
    if (data.value === "Paid") setDisplayList(gamesList.filter(elm => {
      return elm.price
    }))
    if (data.value === "All") setDisplayList(gamesList)
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
      <div className="DropdownDiv"> // Fazer flex disto em row?
        <div>
          <label>
            Genres
            <Dropdown
              placeholder='Select Genre'
              fluid={false}
              selection
              onChange={filterGenreHandler}
              options={genresList}
            />
          </label>
        </div>
        <div>
          <label>
            Platforms
            <Dropdown
              placeholder='Select Platform'
              fluid={false}
              selection
              onChange={filterPlatformHandler}
              options={platformsList}
            />
          </label>
        </div>
        <div>
          <label>
            Price
            <Dropdown
              placeholder='Select Platform'
              fluid={false}
              selection
              onChange={filterPriceHandler}
              options={priceOptions}
            />
          </label>
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
