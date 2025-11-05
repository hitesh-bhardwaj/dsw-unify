"use client";

import React from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { ThemeToggler } from "@/components/animate-ui/primitives/effects/theme-toggler";

export const ThemeTogglerBtn = () => {
  const { theme, resolvedTheme, setTheme } = useTheme();

  return (
    <ThemeToggler
      theme={theme}
      resolvedTheme={resolvedTheme}
      setTheme={setTheme}
      direction="ltr"
    >
      {({ effective, toggleTheme }) => {
        // If <html> has class="dark", force effective to 'dark'
        const htmlIsDark =
          typeof document !== "undefined" &&
          document.documentElement.classList.contains("dark");

        const effectiveFixed = htmlIsDark ? "dark" : effective;
        const nextTheme = effectiveFixed === "dark" ? "light" : "dark";

        return (
          <button
            onClick={() => toggleTheme(nextTheme)}
            className="text-foreground hover:text-foreground !cursor-pointer hover:bg-sidebar-accent duration-300 p-2 rounded-md"
          >
            {effectiveFixed === "dark" ? (
              <Moon className="!h-5 !w-auto" />
            ) : (
              <Sun className="!h-5 !w-auto" />
            )}
          </button>
        );
      }}
    </ThemeToggler>
  );
};
