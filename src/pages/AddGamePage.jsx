import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from 'axios'

const API_URL = "http://localhost:5005"

function AddGamePage() {

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [rating, setRating] = useState(0)
    const [price, setPrice] = useState(0)
    const [genre, setGenre] = useState("")
    const [platform, setPlatform] = useState("")
    const [imageUrl, setImageUrl] = useState("")

    const navigate = useNavigate()

    const handleSubmit = ((e) => {
        e.preventDefault()

        const requestBody = {
            title: title,
            description: description,
            rating: parseFloat(rating),
            price: parseFloat(price),
            genre: SplitString(genre),
            platform: SplitString(platform),
            image_url: imageUrl,
            free: (price <= 0 ? true : false)
        }

        axios.post(API_URL + "/games", requestBody)
            .then((response) => {
                navigate("/games")
            })
            .catch((error) => {
                console.log("An error occurred: ")
                console.log(error)
            })

    })

    function SplitString(inputString) {

        if (inputString.length === 0) return [];

        const outputArray = inputString.split(',')

        return outputArray;
    }

    return (
        <div className="FormDiv">
            <form onSubmit={handleSubmit}>
                <label>
                    <p>Title</p>
                    <input
                        type="text"
                        name="title"
                        required={true}
                        value={title}
                        onChange={(e) => { setTitle(e.target.value) }}
                    />
                </label>
                <label>
                    <p>Description</p>
                    <textarea
                        type="text"
                        name="description"
                        required={true}
                        value={description}
                        onChange={(e) => { setDescription(e.target.value) }}
                    />
                </label>
                <label>
                    <p>Rating</p>
                    <input
                        type="number"
                        name="rating"
                        required={true}
                        min={0}
                        max={10}
                        step=".01"
                        value={rating}
                        onChange={(e) => { setRating(e.target.value) }}
                    />
                </label>
                <label>
                    <p>Price</p>
                    <input
                        type="number"
                        name="price"
                        required={true}
                        min={0}
                        step=".01"
                        value={price}
                        onChange={(e) => { setPrice(e.target.value) }}
                    />
                </label>
                <label>
                    <p>Genre(s)</p>
                    <input
                        type="text"
                        name="genre"
                        required={true}
                        value={genre}
                        placeholder="Separate genres with a comma"
                        onChange={(e) => { setGenre(e.target.value) }}
                    />
                </label>
                <label>
                    <p>Platform(s)</p>
                    <input
                        type="text"
                        name="platform"
                        required={true}
                        value={platform}
                        placeholder="Separate platforms with a comma"
                        onChange={(e) => { setPlatform(e.target.value) }}
                    />
                </label>
                <label>
                    <p>Image URL</p>
                    <input
                        type="text"
                        name="image_url"
                        required={true}
                        value={imageUrl}
                        onChange={(e) => { setImageUrl(e.target.value) }}
                    />
                </label>
                <button className="FormButton">Add Game</button>
            </form>
        </div>

    )
}

export default AddGamePage