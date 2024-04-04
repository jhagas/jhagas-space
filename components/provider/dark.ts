import { useEffect, useState } from "react";
import { create } from "zustand";

type Store = {
  dark: boolean;
  toggleDark: () => void;
  setDark: (value: boolean) => void;
};

export const darkState = create<Store>()((set) => ({
  dark: false,
  toggleDark: () => set((state) => ({ dark: !state.dark })),
  setDark: (value: boolean) => set(() => ({ dark: value })),
}));

export function useDark() {
  const { dark, toggleDark, setDark } = darkState();
  const [changed, setChanged] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("dark");
    setDark(stored ? JSON.parse(stored) : false);
  }, []);

  useEffect(() => {
    if (changed) {
      localStorage.setItem("dark", JSON.stringify(dark));
    }
    setChanged(true);
  }, [dark, changed]);

  return [dark, toggleDark] as const;
}
