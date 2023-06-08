import { useEffect, useState } from "react";

export function useLocalStorage(key: string, initialValue?: string) {
  const [value, setValue] = useState(localStorage.getItem(key));

  useEffect(() => {
    if (!initialValue) return;

    if (value == null) updateValue(initialValue);
  }, []);

  function updateValue(newValue: string) {
    localStorage.setItem(key, newValue);
    setValue(newValue);
  }

  return {
    updateValue,
    value,
  };
}
