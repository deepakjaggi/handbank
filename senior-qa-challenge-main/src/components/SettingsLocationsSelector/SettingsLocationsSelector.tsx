import { useLocalStorage } from "../../hooks/useLocalStorate";
import { useLocations } from "../../hooks/useLocations";
import { LOCATIONS_STORAGE_KEY } from "../../storage-keys";

const SettingsLocationsSelector = () => {
  const { locations, addLocation, removeLocation } = useLocations();

  return (
    <div>
      {locations.map(mapLocation)}
      <button className="button" onClick={handleAddLocation}>
        ➕ Add new location
      </button>
    </div>
  );

  function handleLocationRemoval(location: string) {
    removeLocation(location);
  }

  function handleAddLocation() {
    const newLocation = prompt("Please type in the new location...");

    if (!newLocation) return;

    addLocation(newLocation);
  }

  function mapLocation(location: string) {
    return (
      <div className="mb-3 is-flex ">
        <div>
          <button
            className="delete is-medium has-background-danger mt-1"
            onClick={() => handleLocationRemoval(location)}
            aria-label={`Remove ${location}`}
          />
        </div>
        <span className="is-size-4 ml-2">{location}</span>
      </div>
    );
  }
};

export default SettingsLocationsSelector;
