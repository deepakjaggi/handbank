import React from "react";
import { Link } from "react-router-dom";
import CurrentPositionCard from "../components/CurrentPositionCard";
import Header from "../components/Header";
import LocationCard from "../components/LocationCard";
import { useLocations } from "../hooks/useLocations";
import UnitSystemProvider from "../providers/UnitSystemProvider";

function DashboardPage() {
  const { locations } = useLocations();

  return (
    <>
      <Header title="Dashboard" />
      <UnitSystemProvider>
        <div className="container">
          <div className="columns is-multiline is-centered">
            <div className="column is-one-quarter">
              <CurrentPositionCard />
            </div>
            {locations.map((location) => (
              <div key={location} className="column is-one-quarter">
                <LocationCard location={location} />
              </div>
            ))}
          </div>
        </div>
      </UnitSystemProvider>
      <div className="has-text-centered mt-5">
        <Link to="/settings">🔧 Settings</Link>
      </div>
    </>
  );
}

export default DashboardPage;
