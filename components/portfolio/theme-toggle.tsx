"use client";

import { MoonStar, SunMedium } from "lucide-react";

export function ThemeToggle() {
  const toggleTheme = () => {
    const currentTheme =
      document.documentElement.dataset.theme === "light" ? "light" : "dark";
    const nextTheme = currentTheme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = nextTheme;
    window.localStorage.setItem("theme", nextTheme);
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle color theme"
      className="theme-toggle glass-panel inline-flex h-11 w-11 items-center justify-center rounded-full"
    >
      <SunMedium className="theme-toggle-sun absolute h-5 w-5" />
      <MoonStar className="theme-toggle-moon absolute h-5 w-5" />
    </button>
  );
}
