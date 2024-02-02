import React, { useState } from "react";
import "./CSS/Weather.css";
import search_icon from "./Assets/search.png";
import clear_icon from "./Assets/clear.png";
import cloud_icon from "./Assets/cloud.png";
import drizzle_icon from "./Assets/drizzle.png";
import rain_icon from "./Assets/rain.png";
import snow_icon from "./Assets/snow.png";
import wind_icon from "./Assets/wind.png";
import humidity_icon from "./Assets/humidity.png";

const Weather = () => {

  //State for weather icon//
  let [wicon,setWicon] = useState(cloud_icon)

  // Search Function
  const search = async () => {
    // Getting City Name
    const element = document.getElementsByClassName("cityInput");
    if (element[0].value==="") {
      return 0;
    }
    // Fetching Data
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&type=accurate&APPID=dd94f859a0e52d6e4767fddf735f04a7`;
    let response = await fetch(url);
    let data = await response.json();
    const humidity = document.getElementsByClassName("humidity-percent");
    const wind = document.getElementsByClassName("wind-rate");
    const temperature = document.getElementsByClassName("weather-temp");
    const location = document.getElementsByClassName("weather-location");

    // Setting Data
    humidity[0].innerHTML = data.main.humidity +" %";
    wind[0].innerHTML = data.wind.speed+" km/h";
    temperature[0].innerHTML = Math.floor(data.main.temp)+"°c";
    location[0].innerHTML = data.name;

    // Setting Weather Icon
    if (data.weather[0].icon==="01d" || data.weather[0].icon==="01n") {setWicon(clear_icon);}
    else if (data.weather[0].icon==="02d" || data.weather[0].icon==="02n") {setWicon(cloud_icon);}
    else if (data.weather[0].icon==="03d" || data.weather[0].icon==="03n") {setWicon(drizzle_icon);}
    else if (data.weather[0].icon==="04d" || data.weather[0].icon==="04n") {setWicon(cloud_icon);}
    else if (data.weather[0].icon==="04d" || data.weather[0].icon==="04n") {setWicon(drizzle_icon);}
    else if (data.weather[0].icon==="09d" || data.weather[0].icon==="09n") {setWicon(rain_icon);}
    else if (data.weather[0].icon==="10d" || data.weather[0].icon==="10n") {setWicon(rain_icon);}
    else if (data.weather[0].icon==="13d" || data.weather[0].icon==="13n") {setWicon(snow_icon);}
    else {setWicon(clear_icon);}
  };

  // Search on Enter Key Press
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      search();
    }
  };

  return (
    <div className="container">
      <div className="top-bar">
        <input type="text" className="cityInput" placeholder="Search" onKeyDown={handleKeyPress}/>
        <div className="search-icon" onClick={search}>
          <img src={search_icon} alt="search"/>
        </div>
      </div>
      <div className="weather-image">
        <img src={wicon} alt="weather"/>
      </div>
      <div className="weather-temp">24°c</div>
      <div className="weather-location">London</div>
      <div className="data-container">
        <div className="element">
          <img className="icon" src={humidity_icon} alt="humidity" />
          <div className="data">
            <div className="humidity-percent">64%</div>
            <div className="text">Humidity</div>
          </div>
        </div>
        <div className="element">
          <img className="icon" src={wind_icon} alt="wind" />
          <div className="data">
            <div className="wind-rate">18 km/h</div>
            <div className="text">Wind Speed</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
