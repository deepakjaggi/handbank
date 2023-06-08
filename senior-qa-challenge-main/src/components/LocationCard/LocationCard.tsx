import React from "react";
import useWeatherForLocation from "../../hooks/useWeatherForLocation";
import WeatherCard from "../WeatherCard";

export interface Props {
  location: string;
}

const LocationCard = ({ location }: Props) => {
  const weatherData = useWeatherForLocation(location);

  return (
    <WeatherCard
      isLoading={weatherData.isLoading}
      error={weatherData.error}
      data={weatherData.data}
      location={location}
    />
  );
};

export default LocationCard;
