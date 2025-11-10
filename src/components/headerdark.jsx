"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { ThemeToggler } from "@/components/animate-ui/primitives/effects/theme-toggler";

export const ThemeTogglerBtn = () => {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [dir, setDir] = useState("");
  useEffect(() => {
    const html = document.documentElement;
    const htmlIsDark = html.classList.contains("dark");
    if (htmlIsDark) {
      setDir("rtl");
    } 
  }, []);

  return (
    <ThemeToggler
      theme={theme}
      resolvedTheme={resolvedTheme}
      setTheme={setTheme}
      direction={dir}
    >
      {({ effective, toggleTheme }) => {
        const htmlIsDark =
          typeof document !== "undefined" &&
          document.documentElement.classList.contains("dark");

        const effectiveFixed = htmlIsDark ? "dark" : effective;
        const nextTheme = effectiveFixed === "dark" ? "light" : "dark";


        return (
          <button
            onClick={() => {
              toggleTheme(nextTheme);
              if (nextTheme == "dark") {
                setDir("rtl");
              } else {
                setDir("ltr");
              }
            }}
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
