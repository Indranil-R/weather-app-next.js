import axios from "axios";
import { AiOutlineCloseCircle } from "react-icons/ai";
import {
  FaSun,
  FaCloud,
  FaCloudRain,
  FaSnowflake,
  FaBolt,
  FaCloudShowersHeavy,
  FaCloudDrizzle,
  FaSmog,
  FaWind,
  FaTint,
  FaCompass,
  FaExclamationTriangle,
} from "react-icons/fa";

const iconMapping = {
  Thunderstorm: FaCloudRain,
  Drizzle: FaCloudRain,
  Rain: FaCloudRain,
  Snow: FaSnowflake,
  Atmosphere: FaSmog,
  Clear: FaSun,
  Clouds: FaCloud,
  Mist: FaSmog,
  Haze: FaSmog,
  Dust: FaSmog,
};

import React, { useState } from "react";

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("");
  const [error, setError] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();

    if (city !== "") {
      fetchWeather(city);
    }
  };
  const fetchWeather = async () => {
    try {
      setWeatherData(null);
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.NEXT_PUBLIC_WEATHER_API}`;
      const response = await axios.get(url);
      setWeatherData(response.data);
      setError(null);
    } catch (error) {
      setWeatherData(null);
      setError(error.response?.data?.message || error.message);
      console.log(error);
    }
  };

  function WeatherIcon({ main }) {
    const Icon = iconMapping[main];
    return Icon ? <Icon /> : null;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold text-gray-500 mb-6">Weather App</h1>

      <form
        className="flex flex-col sm:flex-row items-center sm:space-x-4 p-4 rounded-md shadow-md bg-gray-100"
        onSubmit={handleSubmit}
      >
        <input
          className="border border-gray-300 rounded-md px-4 py-2 w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-gray-500 text-gray-500"
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
        />
        <button
          className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 transition-all duration-200"
          type="submit"
        >
          Get Weather
        </button>
      </form>

      {weatherData && (
        <div className="w-full max-w-md mt-8 bg-white rounded-lg shadow-md p-6 mx-auto">
          <p className="text-3xl font-bold mb-2 text-center">
            {weatherData.name}, {weatherData.sys.country}
          </p>
          <div className="flex items-center justify-center text-5xl font-medium text-gray-500 ">
            <WeatherIcon main={weatherData.weather[0].main} />
            <p className="ml-2">
              {Math.round(weatherData.main.temp - 273.15)}&deg;C
            </p>
          </div>
          <p className="text-lg text-gray-500 mt-2 text-center">
            {weatherData.weather[0].main}
          </p>
          <div className="flex justify-between items-center mt-6">
            <div className="flex items-center">
              <FaWind className="w-6 h-6 mr-2" />
              <p className="text-lg font-medium text-gray-500">
                {weatherData.wind.speed} m/s
              </p>
            </div>
            <div className="flex items-center">
              <FaTint className="w-6 h-6 mr-2" />
              <p className="text-lg font-medium text-gray-500">
                {weatherData.main.humidity}%
              </p>
            </div>
            <div className="flex items-center">
              <FaCompass className="w-6 h-6 mr-2" />
              <p className="text-lg font-medium text-gray-500">
                {weatherData.main.pressure} hPa
              </p>
            </div>
          </div>
        </div>
      )}
      {error && (
        <div className="w-full max-w-md mt-8 bg-white rounded-lg shadow-md p-6 mx-auto flex items-center">
          <div className="mr-2 text-red-600">
            <FaExclamationTriangle size={24} />
          </div>
          <p className="text-lg font-bold text-red-600">{error}</p>
        </div>
      )}
    </div>
  );
};

export default Weather;
