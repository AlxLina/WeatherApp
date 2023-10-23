import React from "react";

const Weather = props => (
        <div className="infoWeath">
        {props.city &&
            <div>
                <p>Location: {props.country}, {props.city}</p>
                <p>Temperature: {props.temp} &deg;C</p>
                <p>Sunrise: {props.sunrise}</p>
                <p>Sunset: {props.sunset}</p> 
                <p>Weather: {props.weather}</p>
            </div>
        }           
        <p className="error">{props.error}</p>   
    </div>
    )

export default Weather;