import React from "react";
import Header from "../components/Header";
import { SettingsLocationsSelector } from "../components/SettingsLocationsSelector";
import SettingsUnitSystemSelector from "../components/SettingsUnitSystemSelector";

function SettingsPage() {
  return (
    <>
      <Header title="Settings" withBackButton />
      <div className="container">
        <section className="section">
          <h2 className="title">Locations</h2>
          <p className="subtitle">Select the locations you want to see</p>
          <SettingsLocationsSelector />
        </section>

        <section className="section">
          <h2 className="title">Units</h2>
          <p className="subtitle">Select the unit system of your preference</p>
          <SettingsUnitSystemSelector />
        </section>
      </div>
    </>
  );
}

export default SettingsPage;
