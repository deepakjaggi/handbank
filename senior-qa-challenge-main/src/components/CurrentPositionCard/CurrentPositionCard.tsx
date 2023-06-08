import React from "react";
import useWeatherForCurrentPosition from "../../hooks/useWeatherForCurrentPosition";
import WeatherCard from "../WeatherCard";

const CurrentPositionCard = () => {
  const weatherData = useWeatherForCurrentPosition();

  return (
    <WeatherCard
      isLoading={weatherData.isLoading}
      error={weatherData.error}
      data={weatherData.data}
    />
  );
};

export default CurrentPositionCard;
