"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
// import { Moon, Sun } from "lucide-react";
import { ThemeToggler } from "@/components/animate-ui/primitives/effects/theme-toggler";
import { Moon, Sun } from "./Icons";

/**
 * A button component that toggles the application's theme between light and dark modes.
 * It uses the `next-themes` hook to manage theme state and the `ThemeToggler` component for transition effects.
 *
 * @returns {React.JSX.Element} The rendered ThemeTogglerBtn component.
 */
export const ThemeTogglerBtn = () => {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [dir, setDir] = useState("ltr");
  const [mounted, setMounted] = useState(false);

  // Read theme from localStorage on mount to align with server-injected class.
  useEffect(() => {
    setMounted(true);
    const stored =
      typeof window !== "undefined" ? localStorage.getItem("theme") : null;
    const initial = stored || resolvedTheme || theme;
    if (stored) {
      setTheme(stored);
    }
    if (initial === "dark") {
      setDir("rtl");
    } else {
      setDir("ltr");
    }
  }, [resolvedTheme, theme, setTheme]);

  return (
    <ThemeToggler
      theme={theme}
      resolvedTheme={resolvedTheme}
      setTheme={setTheme}
      direction={dir}
    >
      {({ effective, toggleTheme }) => {
        // During SSR/first paint, render a stable placeholder to avoid hydration mismatch.
        if (!mounted) {
          return (
            <button
              aria-label="Toggle theme"
              className="text-foreground hover:text-foreground !cursor-pointer hover:bg-sidebar-accent duration-300 p-2 rounded-md"
              type="button"
            >
              <Sun className="!h-5 !w-auto" aria-hidden />
            </button>
          );
        }

        const effectiveFixed = effective || resolvedTheme || "light";
        const nextTheme = effectiveFixed === "dark" ? "light" : "dark";

        return (
          <button
            onClick={() => {
              toggleTheme(nextTheme);

              // Save theme only, as requested
              if (typeof window !== "undefined") {
                localStorage.setItem("theme", nextTheme);
              }

              if (nextTheme === "dark") {
                setDir("rtl");
              } else {
                setDir("ltr");
              }
            }}
            className="text-foreground hover:text-foreground !cursor-pointer hover:bg-sidebar-accent duration-300 p-2 rounded-md relative"
            type="button"
          >
            <Sun
              className={`!h-5 !w-auto duration-300 absolute ${
                effectiveFixed === "dark"
                  ? "rotate-360 delay-500 "
                  : "opacity-0 scale-[0.1]"
              } `}
            />

            <Moon
              className={`!h-5 !w-auto duration-300 ${
                effectiveFixed === "dark"
                  ? "rotate-360 opacity-0 delay-500 scale-[0.1]"
                  : "rotate-0 delay-300"
              }`}
            />
          </button>
        );
      }}
    </ThemeToggler>
  );
};
