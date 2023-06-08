import { useEffect, useState } from "react";
import { LOCATIONS_STORAGE_KEY } from "../storage-keys";
import { useLocalStorage } from "./useLocalStorate";

export function useLocations() {
  const { value, updateValue } = useLocalStorage(
    LOCATIONS_STORAGE_KEY,
    JSON.stringify(["Berlin", "Porto"])
  );

  const locations = parseStorageValue(value);

  function addLocation(location: string) {
    updateValue(JSON.stringify([...locations, location]));
  }

  function removeLocation(location: string) {
    const newValue = locations.filter(
      (existingLocation) => existingLocation !== location
    );

    updateValue(JSON.stringify(newValue));
  }

  return {
    locations,
    addLocation,
    removeLocation,
  };
}

function parseStorageValue(value: string | null) {
  if (!value) return [];

  try {
    return JSON.parse(value) as string[];
  } catch (e) {
    return [];
  }
}
