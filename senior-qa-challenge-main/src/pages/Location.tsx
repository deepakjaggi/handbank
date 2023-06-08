import React from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import LocationWeatherDetails from "../components/LocationWeatherDetails";
import UnitSystemProvider from "../providers/UnitSystemProvider";

function LocationPage() {
  const { location } = useParams();

  const decodedLocation = decodeURI(location as string);

  return (
    <>
      <Header title={location as string} withBackButton />
      <UnitSystemProvider>
        <div className="container">
          <LocationWeatherDetails location={decodedLocation} />
        </div>
      </UnitSystemProvider>
    </>
  );
}

export default LocationPage;
