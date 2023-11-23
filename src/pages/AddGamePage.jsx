import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Dropdown } from "semantic-ui-react";
import GameDetailsContainer from "../components/GameDetailsContainer";
import axios from "axios";

const API_URL = "https://api-json-server.adaptable.app";

function AddGamePage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState(0);
  const [price, setPrice] = useState(0);
  const [genre, setGenre] = useState("");
  const [platform, setPlatform] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [images, setImages] = useState([]);
  const [videoUrl, setVideoUrl] = useState("")

  const [genresList, setGenresList] = useState(null);
  const [platformsList, setPlatformsList] = useState(null);

  const navigate = useNavigate();

  const defaultImageUrl = "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"

  useEffect(() => {
    axios
      .get(API_URL + "/games")
      .then((response) => {
        setGenresList(getGenres(response.data));
        setPlatformsList(getPlatforms(response.data));
      })
      .catch((error) => {
        console.log("An error occurred: ");
        console.log(error);
      });
  }, []);

  function getGenres(data) {
    const allGenres = data.map((elm) => elm.genre);
    const temp = looper(allGenres);
    const genres = sortObject(temp);
    return genres;
  }

  function getPlatforms(data) {
    const allPlatforms = data.map((elm) => elm.platform);
    let temp = looper(allPlatforms);
    const platforms = sortObject(temp);
    return platforms;
  }

  // Function to sort Genre and Platform alphabetically
  function sortObject(data) {
    return data.sort((a, b) => {
      return a.text.localeCompare(b.text);
    });
  }

  function looper(type) {
    const newArray = [];

    for (let i = 0; i < type.length; i++) {
      for (let j = 0; j < type[i].length; j++) {
        const exists = newArray.some((elm) => elm.key === type[i][j]);
        if (!exists) {
          newArray.push({
            key: type[i][j],
            text: type[i][j],
            value: type[i][j],
          });
        }
      }
    }

    return newArray;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestBody = {
      title: title,
      description: description,
      rating: parseFloat(rating),
      price: parseFloat(price),
      genre: genre,
      platform: platform,
      image_url: setDefaultImageUrl(imageUrl),
      images: images,
      video_url: videoUrl,
      free: price <= 0 ? true : false,
    };

    axios
      .post(API_URL + "/games", requestBody)
      .then((response) => {
        navigate("/games");
      })
      .catch((error) => {
        console.log("An error occurred: ");
        console.log(error);
      });
  };

  const handlePlatformSelection = (event, data) => {
    setPlatform(data.value);
  };

  const handleGenreSelection = (event, data) => {
    setGenre(data.value);
  };

  function setDefaultImageUrl(imageUrl) {
    if (imageUrl.length === 0) return defaultImageUrl

    return imageUrl
  }

  return (
    <div>
      <div className="InputsContainer">
        <div className="AddGameDiv">
          <h1>ADD GAME</h1>
          <form onSubmit={handleSubmit}>
            <label className="TitleLabel">
              <p>Title</p>
              <input
                type="text"
                name="title"
                required={true}
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
            </label>
            <label className="DescriptionLabel">
              <p>Description</p>
              <textarea
                type="text"
                name="description"
                required={true}
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
            </label>
            <div className="RatingPriceInputs">
              <label className="RatingLabel">
                <p>Rating</p>
                <input
                  type="number"
                  name="rating"
                  required={true}
                  min={1}
                  max={10}
                  step=".01"
                  value={rating}
                  onChange={(e) => {
                    setRating(e.target.value);
                  }}
                />
              </label>
              <label className="PriceLabel">
                <p>Price</p>
                <input
                  type="number"
                  name="price"
                  required={true}
                  min={0}
                  step=".01"
                  value={price}
                  onChange={(e) => {
                    setPrice(e.target.value);
                  }}
                />
              </label>
            </div>
            <div className="DropdownInput">
              <label className="GenreLabel">
                <p>Genres</p>
                <Dropdown
                  placeholder="GENRES"
                  fluid={false}
                  multiple
                  selection
                  required={true}
                  onChange={handleGenreSelection}
                  options={genresList}
                />
              </label>
              <label className="PlatformLabel">
                <p>Platforms</p>
                <Dropdown
                  placeholder="PLATFORMS"
                  fluid={false}
                  multiple
                  selection
                  required={true}
                  onChange={handlePlatformSelection}
                  options={platformsList}
                />
              </label>
            </div>
            <label className="ImageLabel">
              <p>Image URL</p>
              <input
                type="text"
                name="image_url"
                value={imageUrl}
                onChange={(e) => {
                  setImageUrl(e.target.value);
                }}
              />
            </label>
            <label className="VideoLabel">
              <p>Youtube Video</p>
              <input
                type="text"
                name="video_url"
                value={videoUrl}
                onChange={(e) => {
                  setVideoUrl(e.target.value);
                }}
              />
            </label>
            <button className="AddGameButton">Add Game</button>
          </form>
        </div>
        <div>
          <GameDetailsContainer title={title} imageUrl={imageUrl} description={description} rating={rating} price={price} genre={genre} platform={platform}/>
        </div>
      </div>
    </div>
  );
}

export default AddGamePage;
