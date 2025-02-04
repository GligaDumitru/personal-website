"use client";

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

interface ThemeContextType {
  mode: string;
  setMode: Dispatch<SetStateAction<string>>;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setMode] = useState("");

  const handleThemeChange = () => {
    const isLocalStorageThemeDark = localStorage.theme === "dark";
    const hasThemeInLocalStorage = "theme" in localStorage;
    const isPreferedColorSchemeDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    // Checks local storage and user's preferred color scheme to set initial theme mode,
    // then applies CSS class for dark or light mode.
    if (
      isLocalStorageThemeDark ||
      (!hasThemeInLocalStorage && isPreferedColorSchemeDark)
    ) {
      setMode("dark");
      document.documentElement.classList.add("dark");
    } else {
      setMode("light");
      document.documentElement.classList.remove("dark");
    }
  };

  useEffect(() => {
    handleThemeChange();
  }, [mode]);

  return (
    <ThemeContext.Provider value={{ mode, setMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
}
