import React from "react";
import useWeatherForLocation from "../../hooks/useWeatherForLocation";
import FormattedTemperature from "../FormattedTemperature";
import styles from "./LocationWeatherDetails.module.scss";

export interface Props {
  location: string;
}

const LocationWeatherDetails = ({ location }: Props) => {
  const weatherData = useWeatherForLocation(location);

  if (weatherData.isLoading) return <div>Data is loading</div>;
  if (weatherData.error || weatherData.data == null) return <ErrorState />;

  return (
    <div className="columns is-align-content-center">
      <div className="column">
        <div className={styles.container}>
          <div className="is-size-3" aria-label="Conditions">
            {weatherData.data.weather[0].main}
          </div>
          <div className="is-size-1" aria-label="Current temperature">
            <FormattedTemperature
              value={weatherData.data.main.temp.toFixed(0)}
            />
          </div>
          <div>
            <span aria-label="Highest expected temperature">
              <span aria-hidden>H: </span>
              <FormattedTemperature
                value={weatherData.data.main.temp_max.toFixed(0)}
              />
            </span>
            <span aria-hidden> | </span>
            <span aria-label="Lowest expected temperature">
              <span aria-hidden>L: </span>
              <FormattedTemperature
                value={weatherData.data.main.temp_min.toFixed(0)}
              />
            </span>
          </div>
        </div>
      </div>
      <div className="column">
        <div className={styles.container}>
          <LabeledValue
            label="Sunrise"
            value={new Date(
              weatherData.data.sys.sunrise * 1000
            ).toLocaleTimeString()}
          />

          <LabeledValue
            label="Sunset"
            value={new Date(
              weatherData.data.sys.sunset * 1000
            ).toLocaleTimeString()}
          />
          <LabeledValue
            label="Humidity"
            value={weatherData.data.main.humidity}
            unit="%"
          />
          <LabeledValue
            label="Visibility"
            value={(weatherData.data.visibility / 1000).toFixed(1)}
            unit="Km"
          />
        </div>
      </div>
    </div>
  );
};

function ErrorState() {
  return (
    <div className="notification is-warning">
      Something went wrong! We could not fetch the information you need.
    </div>
  );
}

function LabeledValue({
  label,
  value,
  unit,
}: {
  label: string;
  value: any;
  unit?: string;
}) {
  return (
    <div className={styles.labeledValue}>
      <span className="is-size-6">{label}</span>
      <span className="is-size-5">
        {value}
        {unit}
      </span>
    </div>
  );
}

export default LocationWeatherDetails;
