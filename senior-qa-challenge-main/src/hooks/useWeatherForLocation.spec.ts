import useWeatherForLocation from "./useWeatherForLocation";
import useHttpGetRequest from "./useHttpGetRequest";
import { renderHook, waitFor } from "@testing-library/react";
import ApiEndpoints from "../api-endpoints";
import { WeatherData } from "../types/weather-data";

jest.mock("./useHttpGetRequest");

const useHttpGetRequestMock = useHttpGetRequest as jest.Mock;

const useHttpGetRequestDefaultValue = {
  isLoading: false,
  error: null,
  data: null,
  executeRequest: () => ({ data: null, error: null }),
};

describe("useWeatherForLocation", () => {
  beforeEach(() => {
    useHttpGetRequestMock.mockClear();
    useHttpGetRequestMock.mockReturnValue(useHttpGetRequestDefaultValue);
  });

  it("initialises the request to retrieve the coordinates", () => {
    renderHook(() => useWeatherForLocation("Oslo"));

    expect(useHttpGetRequestMock).toHaveBeenCalledWith(
      ApiEndpoints.coordinates()
    );
  });

  it("initialises the request to retrieve the weather data", () => {
    renderHook(() => useWeatherForLocation("Oslo"));

    expect(useHttpGetRequestMock).toHaveBeenCalledWith(ApiEndpoints.weather());
  });

  it("returns isLoading as true while a request is executing", () => {
    useHttpGetRequestMock.mockReturnValue({
      ...useHttpGetRequestDefaultValue,
      isLoading: true,
    });

    const { result } = renderHook(() => useWeatherForLocation("Oslo"));

    expect(result.current.isLoading).toBe(true);
  });

  it("returns isLoading as false when no request is executing", () => {
    useHttpGetRequestMock.mockReturnValue({
      ...useHttpGetRequestDefaultValue,
      isLoading: false,
    });

    const { result } = renderHook(() => useWeatherForLocation("Oslo"));

    expect(result.current.isLoading).toBe(false);
  });

  it("executes the request to retrieve the coordinates", () => {
    const location = "Bergen";

    const executeRequestMock = jest.fn(() => ({ data: null, error: null }));

    useHttpGetRequestMock.mockReturnValue({
      ...useHttpGetRequestDefaultValue,
      executeRequest: executeRequestMock,
    });

    renderHook(() => useWeatherForLocation(location));

    expect(executeRequestMock).toHaveBeenCalledWith({ location });
  });

  it("dooes not execute the request to retrieve the weather data if there are no coordinates data available", () => {
    const executeRequestMock = jest.fn(() => ({ data: [], error: null }));

    useHttpGetRequestMock.mockReturnValue({
      ...useHttpGetRequestDefaultValue,
      executeRequest: executeRequestMock,
    });

    renderHook(() => useWeatherForLocation("Oslo"));

    expect(executeRequestMock).toHaveBeenCalledTimes(1);
  });

  it("executes the request to retrieve the weather data if the coordinates data is available", async () => {
    const lat = 123,
      lon = 456;

    const executeRequestMock = jest.fn(() => ({
      data: [{ lat, lon }],
      error: null,
    }));

    useHttpGetRequestMock.mockReturnValue({
      ...useHttpGetRequestDefaultValue,
      executeRequest: executeRequestMock,
    });

    renderHook(() => useWeatherForLocation("Oslo"));

    await waitFor(() => {
      expect(executeRequestMock).toHaveBeenCalledTimes(2);
      expect(executeRequestMock).toHaveBeenCalledWith({ lat, lon });
    });
  });

  it("returns the error when the location was not found", () => {
    const error = { message: "Location not found" };

    useHttpGetRequestMock.mockReturnValue({
      ...useHttpGetRequestDefaultValue,
      executeRequest: () => ({ data: [], error: null }),
      error,
    });

    const { result } = renderHook(() => useWeatherForLocation("Oslo"));

    expect(result.current.error).toStrictEqual(error);
  });

  it("returns the weather data when coordinates and weather data requests are successful", () => {
    const data = getWeatherData();

    useHttpGetRequestMock
      .mockReturnValueOnce({
        ...useHttpGetRequestDefaultValue,
        executeRequest: () => ({
          data: [{ lat: 123, lon: 456 }],
          error: null,
        }),
      })
      .mockReturnValueOnce({
        ...useHttpGetRequestDefaultValue,
        data,
      });

    const { result } = renderHook(() => useWeatherForLocation("Oslo"));

    expect(result.current.data).toStrictEqual(data);
  });
});

function getWeatherData(): WeatherData {
  return {
    coord: { lon: 10.7986, lat: 59.9301 },
    weather: [
      { id: 803, main: "Clouds", description: "broken clouds", icon: "04n" },
    ],
    base: "stations",
    main: {
      temp: 8.94,
      feels_like: 7.45,
      temp_min: 8.66,
      temp_max: 10.41,
      pressure: 997,
      humidity: 47,
      sea_level: 997,
      grnd_level: 985,
    },
    visibility: 10000,
    wind: { speed: 2.67, deg: 195, gust: 8.62 },
    clouds: { all: 63 },
    dt: 1668012528,
    sys: {
      type: 2,
      id: 2007693,
      country: "NO",
      sunrise: 1667977117,
      sunset: 1668006161,
    },
    timezone: 3600,
    id: 3143244,
    name: "Oslo",
    cod: 200,
  };
}
