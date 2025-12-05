"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Input } from "./ui/input";
import { SearchIcon } from "./Icons";

/* ---------- easing + hook ---------- */
const defaultEase = (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);

/**
 * Hook to animate placeholder text like a typewriter.
 *
 * @param {string} text - The text to type out.
 * @param {Object} [options] - Configuration options.
 * @param {number} [options.baseSpeed=50] - Base typing speed in milliseconds.
 * @param {number} [options.pauseMs=1000] - Pause duration before looping.
 * @param {Function} [options.easing=defaultEase] - Easing function for typing speed variation.
 * @param {boolean} [options.loop=true] - Whether to loop the animation.
 * @returns {string} The currently animated placeholder text.
 */
export function useTypewriterPlaceholder(
  text,
  { baseSpeed = 50, pauseMs = 1000, easing = defaultEase, loop = true } = {}
) {
  const [placeholder, setPlaceholder] = useState("");
  const iRef = useRef(0);
  const timeoutRef = useRef(null);

  const safeText = String(text ?? "");

  useEffect(() => {
    if (!safeText) {
      setPlaceholder("");
      return;
    }

    const total = safeText.length;

    const step = () => {
      const i = iRef.current;

      if (i < total) {
        setPlaceholder(safeText.slice(0, i + 1));
        iRef.current = i + 1;

        const progress = total === 0 ? 0 : i / total;
        const eased = typeof easing === "function" ? easing(progress) : 0;
        const variableSpeed = Math.max(0, baseSpeed + eased * 100);

        timeoutRef.current = setTimeout(step, variableSpeed);
      } else if (loop) {
        timeoutRef.current = setTimeout(() => {
          setPlaceholder("");
          iRef.current = 0;
          timeoutRef.current = setTimeout(step, baseSpeed);
        }, pauseMs);
      } else {
        setPlaceholder(safeText);
      }
    };

    step();
    return () => timeoutRef.current && clearTimeout(timeoutRef.current);
  }, [safeText, baseSpeed, pauseMs, easing, loop]);

  return placeholder;
}

/* ---------- reusable input ---------- */
/**
 * Input component with a typewriter placeholder effect.
 *
 * @param {Object} props - The component props.
 * @param {string} props.placeholderText - The placeholder text to animate.
 * @param {string|number} [props.value] - The value of the input.
 * @param {function} [props.onChange] - Callback when the input value changes.
 * @param {string} [props.className] - Additional class names.
 * @param {React.ReactNode} [props.icon] - Icon to display in the input.
 * @param {number} [props.baseSpeed] - Base typing speed.
 * @param {number} [props.pauseMs] - Pause duration.
 * @param {Function} [props.easing] - Easing function.
 * @param {boolean} [props.loop] - Whether to loop the animation.
 * @returns {React.JSX.Element} The rendered TypewriterInput component.
 */
export function TypewriterInput({
  placeholderText,
  value,
  onChange,
  className,
  icon = <SearchIcon className="!h-4 !w-auto" />,
  baseSpeed = 50,
  pauseMs = 1000,
  easing = defaultEase,
  loop = true,
  ...rest
}) {
  const animatedPlaceholder = useTypewriterPlaceholder(placeholderText, {
    baseSpeed,
    pauseMs,
    easing,
    loop,
  });

  return (
    <div className="relative">
      {icon ? (
        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-border-color-3">
          {icon}
        </div>
      ) : null}

      <Input
        placeholder={animatedPlaceholder}
        value={value}
        onChange={onChange}
        className={["h-11 bg-background border-border-color-1 py-6 placeholder:text-border-color-3 ", icon ? "pl-12" : "", className]
          .filter(Boolean)
          .join(" ")}
        {...rest}
      />
    </div>
  );
}

/* ---------- friendly wrapper (accepts both APIs) ---------- */
/**
 * SearchBar component with a typewriter effect placeholder.
 *
 * @param {Object} props - The component props.
 * @param {string} [props.placeholder="Search Agents..."] - The placeholder text.
 * @param {string} [props.value] - The controlled value.
 * @param {function} [props.onChange] - The change handler.
 * @param {string} [props.searchQuery] - Legacy prop for search query.
 * @param {function} [props.setSearchQuery] - Legacy prop for setting search query.
 * @param {string} [props.className] - Additional class names.
 * @returns {React.JSX.Element} The rendered SearchBar component.
 */
export default function SearchBar({
  placeholder = "Search Agents...",
  // Preferred controlled API:
  value,
  onChange,
  // Legacy API:
  searchQuery,
  setSearchQuery,
  className,
  ...rest
}) {
  // If neither `value` nor `searchQuery` is provided, fall back to internal state.
  const [localValue, setLocalValue] = useState("");
  const isControlled = value !== undefined || searchQuery !== undefined;
  const inputValue = value ?? searchQuery ?? localValue;

  const handleChange = (e) => {
    // Preferred handler
    if (typeof onChange === "function") onChange(e);
    // Legacy handler
    if (typeof setSearchQuery === "function") setSearchQuery(e.target.value);
    // Uncontrolled fallback
    if (!isControlled) setLocalValue(e.target.value);
  };

  return (
    <TypewriterInput
      placeholderText={placeholder}     
      value={inputValue}
      onChange={handleChange}
      className={className}
      baseSpeed={50}
      pauseMs={1000}
      easing={defaultEase}
      loop
      {...rest}
    />
  );
}
