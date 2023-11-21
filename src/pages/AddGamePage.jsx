import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Dropdown, FormDropdown } from 'semantic-ui-react'
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

    const [genresList, setGenresList] = useState(null)
    const [platformsList, setPlatformsList] = useState(null)

    const navigate = useNavigate()

    useEffect(() => {
        axios
            .get(API_URL + "/games")
            .then((response) => {
                setGenresList(getGenres(response.data))
                setPlatformsList(getPlatforms(response.data))
            })
            .catch((error) => {
                console.log("An error occurred: ");
                console.log(error);
            });
    }, []);

    function getGenres(data) {

        const allGenres = data.map((elm) => elm.genre)
        const temp = looper(allGenres);
        const genres = sortObject(temp)
        return genres
    }

    function getPlatforms(data) {

        const allPlatforms = data.map((elm) => elm.platform)
        let temp = looper(allPlatforms);
        const platforms = sortObject(temp);
        return platforms
    }

    // Function to sort Genre and Platform alphabetically
    function sortObject(data) {
        return data.sort((a, b) => {
            return a.text.localeCompare(b.text)
        })
    }

    function looper(type) {

        const newArray = []

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

    const handleSubmit = ((e) => {
        e.preventDefault()

        const requestBody = {
            title: title,
            description: description,
            rating: parseFloat(rating),
            price: parseFloat(price),
            genre: genre,
            platform: platform,//SplitString(platform),
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

    const handlePlatformSelection = (event, data) => {
        setPlatform(data.value)
    }

    const handleGenreSelection = (event, data) => {
        setGenre(data.value)
    }

    /* function SplitString(inputString) {

        if (inputString.length === 0) return [];

        const outputArray = inputString.split(',')

        return outputArray;
    } */

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
                {/* <label>
                    <p>Genre(s)</p>
                    <input
                        type="text"
                        name="genre"
                        required={true}
                        value={genre}
                        placeholder="Separate genres with a comma"
                        onChange={(e) => { setGenre(e.target.value) }}
                    />
                </label> */}
                <label>
                    Genres
                    <Dropdown
                        placeholder='GENRES'
                        fluid={false}
                        multiple
                        selection
                        onChange={handleGenreSelection}
                        options={genresList}
                    />
                </label>
                <label>
                    Platforms
                    <Dropdown
                        placeholder='PLATFORMS'
                        fluid={false}
                        multiple
                        selection
                        onChange={handlePlatformSelection}
                        options={platformsList}
                    />
                </label>


                {/* <label>
                    <p>Platform(s)</p>
                    <input
                        type="text"
                        name="platform"
                        required={true}
                        value={platform}
                        placeholder="Separate platforms with a comma"
                        onChange={(e) => { setPlatform(e.target.value) }}
                    />
                </label> */}
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