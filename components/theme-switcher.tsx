"use client";

import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { IconMoon, IconSun } from "@tabler/icons-react";

export default function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex flex-shrink-0 items-center bg-primary px-4 py-2 rounded-full shadow-lg hover:bg-primary/80 transition-all font-semibold whitespace-nowrap hover:scale-105 active:scale-95">
        <div className="h-6 w-14 rounded-sm bg-primary-foreground/80 animate-pulse duration" />
      </div>
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      aria-label="Toggle theme"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="flex flex-shrink-0 items-center gap-2 text-primary-foreground bg-primary px-4 py-2 rounded-full shadow-lg hover:bg-primary/80 transition-all font-semibold whitespace-nowrap hover:scale-105 active:scale-95"
    >
      {isDark ? <IconSun /> : <IconMoon />}
      <span>{isDark ? "Light" : "Dark"}</span>
    </button>
  );
}