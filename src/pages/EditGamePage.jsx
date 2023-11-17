import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function EditGamePage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState("");
  const [genre, setGenre] = useState("");
  const [price, setPrice] = useState("");
  const [platform, setPlatform] = useState("");
  const [image, setImage] = useState("");

  const { gameId } = useParams();

  const navigate = useNavigate();

  const API_URL = "http://localhost:5005";

  useEffect(() => {
    axios
      .get(`${API_URL}/games/${gameId}`)
      .then((response) => {
        setTitle(response.data.title);
        setDescription(response.data.description);
        setRating(response.data.rating);
        setGenre(response.data.genre.toString());
        setPrice(response.data.price);
        setPlatform(response.data.platform.toString());
        setImage(response.data.image_url);
      })
      .catch((error) => {
        console.log("Something went wrong getting the details");
        console.log(error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestBody = {
      title: title,
      description: description,
      rating: rating,
      genre: SplitString(genre),
      price: price,
      platform: SplitString(platform),
      free: price <= 0 ? true : false,
      image_url: image,
    };

    axios
      .put(`${API_URL}/games/${gameId}`, requestBody)
      .then(() => {
        navigate(`/games/${gameId}`);
      })
      .catch((error) => {
        console.log("Something went wrong updating the game");
        console.log(error);
      });
  };

  function SplitString(inputString) {
    if (inputString.length === 0) return [];
    console.log(inputString);
    const outputArray = inputString.split(",");

    return outputArray;
  }

  return (
    <>
      <h1>Editing Game</h1>
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
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            />
          </label>
          <label>
            <p>Genre</p>
            <input
              type="text"
              name="genre"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
            />
          </label>
          <label>
            <p>Price</p>
            <input
              type="number"
              name="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </label>
          <label>
            <p>Platform</p>
            <input
              type="text"
              name="platform"
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
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
          <button className="FormButton">Update</button>
        </form>
      </div>
    </>
  );
}

export default EditGamePage;
