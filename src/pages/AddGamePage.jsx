import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Dropdown } from "semantic-ui-react";
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

  const [genresList, setGenresList] = useState(null);
  const [platformsList, setPlatformsList] = useState(null);

  const navigate = useNavigate();

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
      image_url: imageUrl,
      images: images,
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
                  min={0}
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
                required={true}
                value={imageUrl}
                onChange={(e) => {
                  setImageUrl(e.target.value);
                }}
              />
            </label>
            <button className="AddGameButton">Add Game</button>
          </form>
        </div>
        <div className="PageContainer">
          <h1 className="TitleAdd">
            {title.toUpperCase() === "" ? "TITLE" : title.toUpperCase()}
          </h1>
          <div className="GameAddContainer">
            <div className="InfoDiv">
              <div className="ImageDescriptionDiv">
                <div className="ImageAdd">
                  {imageUrl === "" ? (
                    ""
                    ) : (
                    <img src={imageUrl} 
                    style={{width:"460px", height:"216px", objectFit:"cover", borderRadius:"30px"}}/>
                  )}
                </div>
                <p>
                  {description === ""
                    ? "Brief description about the game..."
                    : description}
                </p>
              </div>
              <div className="hr"></div>
              <div className="StatisticsAdd">
                <div className="RatingPriceAdd">
                  <h3>RATING</h3>
                  <p>{rating === "" ? "?/10" : rating}/10</p>
                  <h3 className="PriceH3">PRICE</h3>
                  <p>{price === "" ? "? €" : price} €</p>
                </div>
                <div className="PlatformGenreAdd">
                <h3 className="GenresH3">GENRES</h3>
                  <div className="ButtonsAdd">
                    {genre === "" ? (
                      <p>No genres</p>
                    ) : (
                      genre.map((genre, index) => (
                        <button key={index}>{genre}</button>
                      ))
                    )}
                  </div>
                  <h3 className="PlatformsH3">PLATFORMS</h3>
                  <div className="ButtonsAdd">
                    {platform === "" ? (
                      <p>No platforms</p>
                    ) : (
                      platform.map((platform, index) => (
                        <button key={index}>{platform}</button>
                      ))
                    )}
                  </div>
                </div>     
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddGamePage;
