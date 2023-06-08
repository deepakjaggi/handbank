import useHttpGetRequest from "./useHttpGetRequest";
import ApiEndpoints from "../api-endpoints";
import { WeatherData } from "../types/weather-data";
import { Coordinates } from "../types/coordinates";
import { useContext, useEffect } from "react";
import { UnitSystemContext } from "../types/context";

function useWeatherForLocation(location: string) {
  const getLocationCoordinatesRequest = useHttpGetRequest<Coordinates[]>(
    ApiEndpoints.coordinates()
  );

  const getWeatherDataRequest = useHttpGetRequest<WeatherData>(
    ApiEndpoints.weather()
  );

  const units = useContext(UnitSystemContext);

  useEffect(() => {
    retrieveWeatherForLocationData();
  }, []);

  async function retrieveWeatherForLocationData() {
    const locationCoordinates =
      await getLocationCoordinatesRequest.executeRequest({ location });

    if (locationCoordinates.data && locationCoordinates.data.length > 0) {
      getWeatherDataRequest.executeRequest({
        lat: locationCoordinates.data[0].lat,
        lon: locationCoordinates.data[0].lon,
        units,
      });
    }
  }

  const isLoading =
    getLocationCoordinatesRequest.isLoading || getWeatherDataRequest.isLoading;
  const requestError =
    getLocationCoordinatesRequest.error || getWeatherDataRequest.error;

  return {
    isLoading,
    error:
      getWeatherDataRequest.data == null
        ? { message: "Location not found" }
        : requestError,
    data: getWeatherDataRequest.data,
  };
}

export default useWeatherForLocation;
