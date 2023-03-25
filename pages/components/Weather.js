import React, { useState } from "react";

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Your city name is: ${city}`);
  };

  return (
    <div class="flex min-h-screen flex-col items-center justify-center bg-gray-50">
      <h1 class="mb-8 text-4xl font-bold">Weather App</h1>
      <form
        class="mb-8 flex flex-col sm:flex-row items-center sm:space-x-4"
        onSubmit={handleSubmit}
      >
        <input
          class="border border-green-500 rounded-md px-4 py-2 mb-4 sm:mb-0 w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-green-500"
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
        />
        <button
          class="rounded-md bg-green-500 px-4 py-2 font-bold text-white shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
          type="submit"
        >
          Get Weather
        </button>
      </form>
      {weatherData && (
        <div class="w-full max-w-xl rounded-lg bg-white p-8 shadow-md">
          <p class="mb-4 text-5xl font-bold text-green-500"></p>
          <p class="text-lg font-medium text-gray-500"></p>
        </div>
      )}
    </div>
  );
};

export default Weather;
