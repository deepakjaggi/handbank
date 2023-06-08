import { render, screen, within } from "@testing-library/react";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { WeatherData } from "../../types/weather-data";
import WeatherCard, { Props } from "./WeatherCard";

describe("WeatherCard", () => {
  it("renders the loading state", () => {
    renderComponent({
      isLoading: true,
      error: null,
      data: null,
    });

    expect(screen.getByTestId("weather-card-loading")?.textContent).toBe(
      "Loading..."
    );

    expect(screen.queryByTestId("weather-card-error")).toBeNull();
    expect(screen.queryByTestId("weather-card")).toBeNull();
  });

  it("renders the error state", () => {
    const message = "An error message";

    renderComponent({
      isLoading: false,
      error: { message },
      data: null,
    });

    expect(screen.getByTestId("weather-card-error")?.textContent).toBe(
      `We got stormy weather. ${message}`
    );

    expect(screen.queryByTestId("weather-card-loading")).toBeNull();
    expect(screen.queryByTestId("weather-card")).toBeNull();
  });

  it("renders the card as an anchor when the the data and location is present", () => {
    const location = "Oslo";

    renderComponent({
      isLoading: false,
      error: null,
      data: getWeatherData(),
      location,
    });

    const card = screen.getByTestId("weather-card") as HTMLAnchorElement;

    expect(screen.queryByTestId("weather-card-loading")).toBeNull();
    expect(screen.queryByTestId("weather-card-error")).toBeNull();

    expect(card.href).toMatch(`/${location}`);
  });

  it("renders the card as an anchor when the the data and location is not present", () => {
    const locationName = "Bergen";

    const weatherData = getWeatherData();
    weatherData.name = locationName;

    renderComponent({
      isLoading: false,
      error: null,
      data: weatherData,
    });

    const card = screen.getByTestId("weather-card") as HTMLAnchorElement;

    expect(screen.queryByTestId("weather-card-loading")).toBeNull();
    expect(screen.queryByTestId("weather-card-error")).toBeNull();

    expect(card.href).toMatch(`/${locationName}`);
  });

  it("renders the location in the weather card", () => {
    const location = "Oslo";

    renderComponent({
      isLoading: false,
      error: null,
      data: getWeatherData(),
      location,
    });

    const card = screen.getByTestId("weather-card");

    expect(within(card).getByTestId("weather-card-location")?.textContent).toBe(
      location
    );
  });

  it("renders the current temperature in the weather card", () => {
    const temperature = 21;

    const weatherData = getWeatherData();
    weatherData.main.temp = temperature;

    renderComponent({
      isLoading: false,
      error: null,
      data: weatherData,
    });

    const card = screen.getByTestId("weather-card");

    expect(
      within(card).getByTestId("weather-card-temperature")?.textContent
    ).toBe(`${temperature}°C`);
  });
});

function renderComponent(props: Props) {
  return render(
    <Router>
      <WeatherCard {...props} />
    </Router>
  );
}

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
