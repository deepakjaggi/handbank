import { UnitSystem } from "../types/units";

const ApiBaseUrl = "https://api.openweathermap.org";
const ApiAccessKey = "eb8a70f875f4e4baabc1399cec36e4b6";

const ApiEndpoints = {
  weather: (lat?: number, lon?: number, units?: UnitSystem) =>
    `${ApiBaseUrl}/data/2.5/weather?lat=${lat || ":lat"}&lon=${
      lon || ":lon"
    }&units=${units || ":units"}&appid=${ApiAccessKey}`,
  coordinates: (location?: string, units?: UnitSystem) =>
    `${ApiBaseUrl}/geo/1.0/direct?q=${location || ":location"}&limit=1&units=${
      units || ":units"
    }&appid=${ApiAccessKey}`,
};

export default ApiEndpoints;
