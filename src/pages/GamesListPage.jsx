import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Select from "react-select"
import axios from "axios";

const API_URL = "https://api-json-server.adaptable.app";

function GamesListPage() {
  const [gamesList, setGamesList] = useState(null);
  const [displayList, setDisplayList] = useState(null)
  const [genresList, setGenresList] = useState(null)
  const [platformsList, setPlatformsList] = useState(null)
  const [searchGames, setSearchGames] = useState("");

  const allOptions =
  {
    label: "All",
    value: "All"
  }

  const priceOptions = [
    {
      label: "All",
      value: "All"
    },
    {
      label: "Free",
      value: "Free"
    },
    {
      label: "Paid",
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
    const temp = looper(allGenres);
    const genres = sortObject(temp)
    genres.unshift(allOptions)
    return genres
  }

  function getPlatforms(data) {

    const allPlatforms = data.map((elm) => elm.platform)
    let temp = looper(allPlatforms);
    const platforms = sortObject(temp);
    platforms.unshift(allOptions)

    return platforms
  }

  // Function to sort Genre and Platform alphabetically
  function sortObject(data) {
    return data.sort((a, b) => {
      return a.value.localeCompare(b.value)
    })
  }

  function looper(type) {

    const newArray = []

    for (let i = 0; i < type.length; i++) {
      for (let j = 0; j < type[i].length; j++) {
        const exists = newArray.some(elm => elm.value === type[i][j])
        if (!exists) {
          newArray.push({
            label: type[i][j],
            value: type[i][j]
          })
        }
      }
    }
    return newArray
  }

  // Handle selected filters
  const filterGenreHandler = (event) => {
    setDisplayList(gamesList.filter((elm) => {
      return elm.genre.includes(event.value)
    }))
    if (event.value === "All") setDisplayList(gamesList)
  }

  const filterPlatformHandler = (event) => {
    console.log(event.value)
    setDisplayList(gamesList.filter((elm) => {
      return elm.platform.includes(event.value)
    }))
    if (event.value === "All") setDisplayList(gamesList)
  }

  const filterPriceHandler = (event) => {
    if (event.value === "Free") setDisplayList(gamesList.filter(elm => {
      return !elm.price
    }))
    if (event.value === "Paid") setDisplayList(gamesList.filter(elm => {
      return elm.price
    }))
    if (event.value === "All") setDisplayList(gamesList)
  }

  const customStyles = {
    menu: (provided) => ({
      ...provided,
      backgroundColor: "neutral0",
      border: "1px solid white",
      color: "white",
      position: "relative"
    }),
    control: (provided) => ({
      ...provided,
      backgroundColor: "neutral0",
      color: "white",
      width: "200px",

    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused || state.isHovered ? "transparent" : "transparent",
      "&:hover": {
        backgroundColor: "transparent",
        border: "1px solid white"

      }
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "white"
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "white",
    }),
    menuPortal: (provided, state) => ({
      ...provided,
      color: "transparent",
      zIndex: "9999"
    })/* ,
    menuList: (provided) => ({
      ...provided,
      "::-webkit-scrollbar-track": {
        background: "white"
      },
    }) */
  }

  return (
    <>
      <div className="GamesListPage">
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
        <div className="UserInputs">
          <div className="SearchBarDiv">
            <div className="cntr">
              <div className="cntr-innr">
                <label htmlFor="inpt_search" className="search">
                  <input
                    className="inpt_search"
                    type="text"
                    value={searchGames}
                    onChange={handleSearch}
                  />
                </label>
              </div>
            </div>
          </div>
          <div className="DropdownDiv">
            <div className="DropdownSelect">
              <Select
                placeholder={"Select genre"}
                styles={customStyles}
                onChange={filterGenreHandler}
                options={genresList}
              />
            </div>
            <div className="DropdownSelect">
              <Select
                placeholder={"Select platform"}
                styles={customStyles}
                onChange={filterPlatformHandler}
                options={platformsList}
              />
            </div>
            <div className="DropdownSelect">
              <Select
                placeholder={"Select price"}
                styles={customStyles}
                onChange={filterPriceHandler}
                options={priceOptions}
              />
            </div>
          </div>

        </div>
      </div>


    </>
  );
}

export default GamesListPage;