import React from "react";
import { Link } from "react-router-dom";
import { WeatherData } from "../../types/weather-data";
import FormattedTemperature from "../FormattedTemperature";
import styles from "./WeatherCard.module.scss";

export interface Props {
  isLoading: boolean;
  error: { message: string } | null;
  data: WeatherData | null;
  location?: string;
}

const WeatherCard = ({ isLoading, error, data, location }: Props) => {
  if (isLoading)
    return (
      <Container>
        <div data-testid="weather-card-loading">Loading...</div>
      </Container>
    );

  if (error || data == null)
    return (
      <Container>
        <div data-testid="weather-card-error">
          We got stormy weather. {error?.message}
        </div>
      </Container>
    );

  const locationName = location || data.name;

  const temperatureValue = data.main.temp.toFixed(0);

  return (
    <Link
      to={`/${locationName}`}
      aria-label={`See weather for ${locationName}`}
      data-testid="weather-card"
    >
      <Container>
        <div className="is-flex is-justify-content-space-between">
          <div data-testid="weather-card-location">{locationName}</div>
          <div
            className="has-text-weight-bold has-text-right"
            aria-label={`${temperatureValue} degrees celsius`}
            data-testid="weather-card-temperature"
          >
            <FormattedTemperature value={temperatureValue} />
          </div>
        </div>
      </Container>
    </Link>
  );
};

function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className={`card ${styles.weatherCard}`}>
      <div className="card-content">
        <div className="content">{children}</div>
      </div>
    </div>
  );
}

export default WeatherCard;
