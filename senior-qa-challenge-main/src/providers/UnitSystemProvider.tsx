import { useLocalStorage } from "../hooks/useLocalStorate";
import { UNITS_STORAGE_KEY } from "../storage-keys";
import { UnitSystemContext } from "../types/context";
import { UnitSystem } from "../types/units";

const UnitSystemProvider = ({ children }: { children: React.ReactNode }) => {
  const { value } = useLocalStorage(UNITS_STORAGE_KEY);

  const contextValue = value ? (value as UnitSystem) : UnitSystem.Metric;

  return (
    <UnitSystemContext.Provider value={contextValue}>
      {children}
    </UnitSystemContext.Provider>
  );
};

export default UnitSystemProvider;
