import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Dropdown } from "semantic-ui-react";
import axios from "axios";

function EditGamePage(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState("");
  const [allGenres, setAllGenres] = useState("")
  const [genre, setGenre] = useState("");
  const [price, setPrice] = useState("");
  const [allPlatforms, setAllPlatforms] = useState("")
  const [platform, setPlatform] = useState("");
  const [image, setImage] = useState("");
  const [images, setImages] = useState([]);
  const [videoUrl, setVideoUrl] = useState("")

  const { gameId } = useParams();

  const navigate = useNavigate();

  const API_URL = "https://api-json-server.adaptable.app";

  useEffect(() => {
    axios
      .get(`${API_URL}/games/${gameId}`)
      .then((response) => {
        setTitle(response.data.title);
        setDescription(response.data.description);
        setRating(response.data.rating);
        setGenre(response.data.genre);
        setPrice(response.data.price);
        setPlatform(response.data.platform);
        setImage(response.data.image_url);
        setImages(response.data.images);
        setVideoUrl(response.data.video_url);
        console.log(response.data.platform)
      })
      .catch((error) => {
        console.log("Error: ", error);
      });

    axios
      .get(`${API_URL}/games`)
      .then((response) => {
        setAllGenres(getGenres(response.data));
        setAllPlatforms(getPlatforms(response.data));
      })
      .catch((error) => {
        console.log("Error: ", error);
      });

      
      console.log(genre)
      console.log(allGenres)

  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestBody = {
      title: title,
      description: description,
      rating: rating,
      genre: genre,
      price: price,
      platform: platform,
      free: price <= 0 ? true : false,
      image_url: image,
      images: images,
      video_url: videoUrl
    };

    console.log(images);

    axios
      .put(`${API_URL}/games/${gameId}`, requestBody)
      .then(() => {
        navigate(`/games/${gameId}`);
      })
      .catch((error) => {
        console.log("Error: ", error);
      });

  };

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

  function sortObject(data) {
    return data.sort((a, b) => {
      return a.text.localeCompare(b.text);
    });
  }

  function SplitString(inputString) {
    if (inputString.length === 0) return [];

    console.log(inputString)
    const outputArray = inputString.split(",");

    return outputArray;
  }

  return (
    <>
      <div className="InputsContainer">
        <div className="AddGameDiv">
          <h1>EDIT GAME</h1>
          <div className="FormDiv">
            <form onSubmit={handleSubmit}>
              <label>
                <p>Title</p>
                <input
                  type="text"
                  name="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </label>
              <label>
                <p> Description</p>
                <textarea
                  name="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </label>
              <label>
                <p>Rating</p>
                <input
                  type="number"
                  name="rating"
                  min={1}
                  max={10}
                  step=".01"
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                />
              </label>
              <label className="GenreLabel">
                <p>Genres</p>
                <Dropdown
                  placeholder="GENRES"
                  fluid={true}
                  multiple
                  selection
                  required={true}
                  value={genre}
                  onChange={(e, data) => setGenre(data.value)}
                  options={allGenres}
                />
              </label>
              <label className="PlatformLabel">
                <p>Platforms</p>
                <Dropdown
                  placeholder="PLATFORMS"
                  fluid={true}
                  multiple
                  selection
                  required={true}
                  value={platform}
                  onChange={(e, data) => setPlatform(data.value)}
                  options={allPlatforms}
                />
              </label>

              <label>
                <p>Price</p>
                <input
                  type="number"
                  name="price"
                  step=".01"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </label>
              <label>
                <p>Image</p>
                <input
                  type="text"
                  name="image"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                />
              </label>
              <label>
                <p>Game Images</p>
                <input
                  type="text"
                  name="images"
                  value={images}
                  onChange={(e) => setImages(SplitString(e.target.value))}
                />
              </label>
              <button className="UpdateButton">Update</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditGamePage;
