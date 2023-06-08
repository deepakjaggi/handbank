import { useContext, useEffect, useState } from "react";
import ApiEndpoints from "../api-endpoints";
import { UnitSystemContext } from "../types/context";
import { WeatherData } from "../types/weather-data";
import useHttpGetRequest from "./useHttpGetRequest";

interface CurrentPositionState {
  isLoading: boolean;
  error: { message: string } | null;
}

function useWeatherForCurrentPosition() {
  const [currentPositionState, setCurrentPositionState] =
    useState<CurrentPositionState>({
      isLoading: true,
      error: null,
    });

  const units = useContext(UnitSystemContext);

  const getWeatherDataRequest = useHttpGetRequest<WeatherData>(
    ApiEndpoints.weather()
  );

  useEffect(() => {
    if (!navigator.geolocation) {
      setCurrentPositionState({
        isLoading: false,
        error: { message: "Navigation is not available" },
      });

      return;
    }

    navigator.geolocation.getCurrentPosition(
      positionSuccessHandler,
      positionErrorHandler
    );
  }, []);

  function positionSuccessHandler(position: GeolocationPosition) {
    setCurrentPositionState({
      isLoading: false,
      error: null,
    });

    getWeatherDataRequest.executeRequest({
      lat: position.coords.latitude,
      lon: position.coords.longitude,
      units,
    });
  }

  function positionErrorHandler(error: GeolocationPositionError) {
    setCurrentPositionState({
      isLoading: false,
      error: { message: error.message },
    });
  }

  const isLoading =
    currentPositionState.isLoading || getWeatherDataRequest.isLoading;
  const error = currentPositionState.error || getWeatherDataRequest.error;

  return {
    isLoading,
    error,
    data: getWeatherDataRequest.data,
  };
}

export default useWeatherForCurrentPosition;
