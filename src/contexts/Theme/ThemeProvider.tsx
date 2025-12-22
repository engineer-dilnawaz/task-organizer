// import { useState, type PropsWithChildren } from "react";

// import { LOCAL_STORAGE_KEYS } from "../../constants/app";
// import { ThemeContext } from "./ThemeContext";

// export const ThemeProvider = ({ children }: PropsWithChildren) => {
//   const [isDark, setIsDark] = useState(() => {
//     const persistedPreference = localStorage.getItem(LOCAL_STORAGE_KEYS.THEME);
//     return persistedPreference
//       ? (JSON.parse(persistedPreference) as unknown as boolean)
//       : false;
//   });

//   const toggleTheme = () => {
//     setIsDark((prev) => !prev);
//     localStorage.setItem(LOCAL_STORAGE_KEYS.THEME, JSON.stringify(isDark));
//   };

//   return (
//     <ThemeContext.Provider
//       value={{
//         isDark,
//         toggleTheme,
//       }}
//     >
//       {children}
//     </ThemeContext.Provider>
//   );
// };
