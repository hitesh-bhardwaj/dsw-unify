"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Input } from "./ui/input";
import { SearchIcon } from "./Icons";

/* ---------- easing + hook ---------- */
const defaultEase = (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);

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
        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-[#333333]">
          {icon}
        </div>
      ) : null}

      <Input
        placeholder={animatedPlaceholder}
        value={value}
        onChange={onChange}
        className={["h-11 bg-white border-black/30 py-6 text-[#333333]", icon ? "pl-12" : "", className]
          .filter(Boolean)
          .join(" ")}
        {...rest}
      />
    </div>
  );
}

/* ---------- friendly wrapper (accepts both APIs) ---------- */
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
