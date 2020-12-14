import React, { useCallback, useEffect, useState } from 'react'
import "./Content.css"
import axios from "axios"
import Loader from "../Loader/Loader.js"

const Content = () => {

    const [categories, setCategories] = useState([])
    const [jokeCategory, setJokeCategory] = useState(null)
    const [joke, setJoke] = useState("")
    const [loading, setLoading] = useState(true)

    const handleJoke = useCallback(() => {
        jokeCategory && axios.get(`https://api.chucknorris.io/jokes/random?category=${jokeCategory}`).then(({ data: { value } }) => {
            setLoading(false);
            setJoke(value);
        }).catch((err) => {
            console.log(err)
        })
    }, [jokeCategory]
    )

    useEffect(() => {
        axios.get("https://api.chucknorris.io/jokes/categories").then(({ data }) => {
            setCategories(data);
            setLoading(false)
        }).catch((err) => {
            console.log(err)
        })
    }, [])

    useEffect(() => {
        handleJoke()
    }, [handleJoke])

    const handleCategoryChange = (event) => {
        setLoading(true)

        setJokeCategory(event.target.value)

    }

    return (
        <>{
            loading ? <Loader /> :

                <div className="content">
                    <div className="options">
                        <label htmlFor="categories"> Choose a joke  category: </label>
                        <select onChange={handleCategoryChange} id="categories">
                            <option >{jokeCategory ? jokeCategory : ""}</option>
                            {categories.map((category, index) => (
                                <option key={index} value={category}>{category}</option>
                            ))}

                        </select>
                    </div>
                    {
                        jokeCategory ?

                            <>
                                <div className="card">
                                    <img src="https://assets.chucknorris.host/img/avatar/chuck-norris.png" alt="logo" />
                                    <p className="joke">
                                        {joke}
                                    </p>
                                </div>
                                <button className="jokeButton" onClick={() => handleJoke()}>Get another {jokeCategory}{" "}joke</button>
                            </>
                            : <h3 className="selectJoke">please select a category</h3>
                    }
                </div>
        }
        </>
    )
}

export default Content
