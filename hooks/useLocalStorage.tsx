import { useEffect } from "react";
import { useState } from "react";

export function useLocalStorage<T>(key: string, fallbackValue: T) {
  const [value, setValue] = useState(fallbackValue);
  const [changed, setChanged] = useState(false);
  useEffect(() => {
    const stored = localStorage.getItem(key);
    setValue(stored ? JSON.parse(stored) : fallbackValue);
  }, [fallbackValue, key]);

  useEffect(() => {
    if (changed) {
      localStorage.setItem(key, JSON.stringify(value));
    }
    setChanged(true);
  }, [key, value, changed]);

  return [value, setValue] as const;
}