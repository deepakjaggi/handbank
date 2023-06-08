import React from "react";
import { useLocalStorage } from "../../hooks/useLocalStorate";
import { UNITS_STORAGE_KEY } from "../../storage-keys";
import { UnitSystem } from "../../types/units";

const SettingsUnitSystemSelector = () => {
  const { value, updateValue } = useLocalStorage(
    UNITS_STORAGE_KEY,
    UnitSystem.Metric
  );

  function handleImperialClick() {
    updateValue(UnitSystem.Imperial);
  }

  function handleMetricClick() {
    updateValue(UnitSystem.Metric);
  }

  return (
    <div className="buttons">
      <button className="button" onClick={handleMetricClick}>
        Metric {value === UnitSystem.Metric ? "✅" : "⬜"}
      </button>
      <button className="button" onClick={handleImperialClick}>
        Imperial {value === UnitSystem.Imperial ? "✅" : "⬜"}
      </button>
    </div>
  );
};

export default SettingsUnitSystemSelector;
