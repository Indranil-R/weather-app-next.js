import axios from "axios";
import React, { useState } from "react";

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (city !== "") {
      fetchWeather(city);
    }
  };
  const fetchWeather = async () => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.NEXT_PUBLIC_WEATHER_API}`;
    const response = await axios.get(url);
    setWeatherData(response.data);
    console.log(weatherData);
    // console.log(weatherData.main.temp)
  };
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50">
      <h1 className="mb-8 text-4xl font-bold">Weather App</h1>
      <form
        className="mb-8 flex flex-col sm:flex-row items-center sm:space-x-4"
        onSubmit={handleSubmit}
      >
        <input
          className="border border-green-500 rounded-md px-4 py-2 mb-4 sm:mb-0 w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-green-500"
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
        />
        <button
          className="rounded-md bg-green-500 px-4 py-2 font-bold text-white shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
          type="submit"
        >
          Get Weather
        </button>
      </form>
      {weatherData && (
        <div className="w-full max-w-xl rounded-lg bg-white p-8 shadow-md">
          <h1 className="text-2xl font-bold mb-4">
            Weather for {weatherData.name}, {weatherData.sys.country}
          </h1>
          <p className="mb-4 text-5xl font-bold text-green-500">
            {Math.round(weatherData.main.temp - 273.15)}°C
          </p>
          <p className="text-lg font-medium text-gray-500">
            {weatherData.weather[0].description}
          </p>
        </div>
      )}
    </div>
  );
};

export default Weather;
