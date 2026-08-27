"use client";

import { createContext, ReactNode, useContext, useEffect, useState } from "react";

export type ThemeMode = "light" | "dark";

interface ThemeContextType {
  mode: ThemeMode;
  toggleMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setMode] = useState<ThemeMode>("light");

  // The blocking inline script in app/layout.tsx already applies the
  // correct "dark" class before paint (avoids a flash of wrong theme).
  // This just syncs React state to that DOM state after hydration, for
  // the toggle button's icon; it never writes on mount.
  useEffect(() => {
    // Deliberately synchronous: reads the class the pre-hydration inline
    // script already applied. Doing this in the lazy useState initializer
    // instead would run during static-export SSR (no `document`) and
    // mismatch the client's first hydration pass.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMode(
      document.documentElement.classList.contains("dark") ? "dark" : "light"
    );
  }, []);

  const toggleMode = () => {
    setMode((prev) => {
      const next = prev === "light" ? "dark" : "light";
      document.documentElement.classList.toggle("dark", next === "dark");
      localStorage.theme = next;
      return next;
    });
  };

  return (
    <ThemeContext.Provider value={{ mode, toggleMode }}>
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
