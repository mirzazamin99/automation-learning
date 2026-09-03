"use client";

import { useEffect, useState } from "react";
import { MoonIcon, SunIcon } from "./icons";

export function useTheme() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    // Syncs React state to the theme the blocking init script already
    // applied to the DOM before hydration — reading that external value
    // is exactly the case this rule means to allow.
    const current = document.documentElement.getAttribute("data-theme");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (current === "dark" || current === "light") setTheme(current);
  }, []);

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {
      // storage unavailable — theme just won't persist
    }
  };

  return { theme, toggle };
}

export default function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, toggle } = useTheme();

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      className={`flex h-10 w-10 items-center justify-center rounded-full text-foreground-dim transition-colors duration-300 ease-out hover:bg-surface-tint hover:text-foreground ${className}`}
    >
      {theme === "dark" ? (
        <SunIcon className="h-[1.15rem] w-[1.15rem]" />
      ) : (
        <MoonIcon className="h-[1.15rem] w-[1.15rem]" />
      )}
    </button>
  );
}
