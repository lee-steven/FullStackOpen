import React, { useState, useEffect} from 'react'
import axios from 'axios'

const Weather = ({capital}) => {
    const api_key = process.env.REACT_APP_API_KEY
    const [weather, setWeather] = useState({
        current: {
            temperature: 0,
            weather_icons: "",
            wind_speed: 0,
            wind_direction: "",
        }
    })

    useEffect(() => {
        axios
            .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${capital}`)
            .then(response => {
                setWeather(response.data)
            })
    }, [api_key, capital])
    

    return (
        <div>
            <h4>Weather in {capital}</h4>
            <img src={weather.current.weather_icons} alt="Weather" />
            <div><strong>Temperature:</strong> {weather.current.temperature}</div>
            <div><strong>Wind:</strong> {weather.current.wind_speed} mph in direction {weather.current.wind_direction}</div>
        </div>
    )
}

export default Weather