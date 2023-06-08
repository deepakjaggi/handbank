import { useContext } from "react";
import { UnitSystemContext } from "../../types/context";
import { UnitSystem } from "../../types/units";

interface Props {
  value: number | string;
}

const FormattedTemperature = ({ value }: Props) => {
  return (
    <>
      {value} <UnitSymbol />
    </>
  );
};

const UnitSymbol = () => {
  const units = useContext(UnitSystemContext);

  function getSymbol() {
    switch (units) {
      case UnitSystem.Metric:
        return "°C";
      case UnitSystem.Imperial:
        return "°F";
      default:
        return "K";
    }
  }

  return <span>{getSymbol()}</span>;
};

export default FormattedTemperature;
