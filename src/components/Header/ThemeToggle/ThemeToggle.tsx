"use client";

import { useTheme } from "../../../context/ThemeProvider";
import { MoonIcon, SunIcon } from "../../../icons";

const ThemeToggle = () => {
  const { mode, toggleMode } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleMode}
      aria-label={
        mode === "light" ? "Switch to dark mode" : "Switch to light mode"
      }
      className="cursor-pointer p-2 border text-gray-500 hover:text-gray-800 hover:bg-gray-200 dark:hover:bg-neutral-700 focus:outline-none dark:text-neutral-400 dark:hover:text-neutral-200 border-gray-200 rounded-full"
    >
      {mode === "light" ? (
        <MoonIcon className="size-4" />
      ) : (
        <SunIcon className="size-4" />
      )}
    </button>
  );
};

export default ThemeToggle;
