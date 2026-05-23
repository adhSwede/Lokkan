import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";

export const DarkModeSwitch = () => {
  const [dark, setDark] = useState(() => {
    // Check localStorage first, fallback to system preference
    const saved = localStorage.getItem("darkMode");
    if (saved !== null) {
      return saved === "true";
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    // Apply the dark class on mount and when dark state changes
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    // Persist to localStorage
    localStorage.setItem("darkMode", String(dark));
  }, [dark]);

  const toggle = () => {
    setDark(!dark);
  };

  return (
    <button
      onClick={toggle}
      className="z-1 w-fit items-center rounded transition-colors hover:bg-(--color-hover)"
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {dark ? (
        <Sun className="h-5 w-5 text-white" />
      ) : (
        <Moon className="h-5 w-5" />
      )}
    </button>
  );
};
