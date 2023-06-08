import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DashboardPage from "./pages/Dashboard";
import LocationPage from "./pages/Location";
import SettingsPage from "./pages/Settings";
import "./App.scss";

function App() {
  return (
    <Router basename="/weather">
      <Routes>
        <Route path="/settings" element={<SettingsPage />} />
        <Route path=":location" element={<LocationPage />} />
        <Route path="" element={<DashboardPage />} />
      </Routes>
      <PhotoAuthor />
    </Router>
  );
}

function PhotoAuthor() {
  return (
    <div className="photo-author has-text-grey" aria-label="Photo Credits">
      Photo by{" "}
      <a href="https://unsplash.com/@xcrap?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
        César Couto
      </a>{" "}
      on{" "}
      <a href="https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
        Unsplash
      </a>
    </div>
  );
}

export default App;
