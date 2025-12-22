import { create } from "zustand";
import { persist } from "zustand/middleware";
import { LOCAL_STORAGE_KEYS } from "../constants/app";

type ThemeType = {
  isDark: boolean;
  toggleTheme: () => void;
};

export const useTheme = create<ThemeType>()(
  persist(
    (set) => ({
      isDark: false,
      toggleTheme: () =>
        set((state) => ({
          isDark: !state.isDark,
        })),
    }),
    {
      name: LOCAL_STORAGE_KEYS.THEME,
    }
  )
);
