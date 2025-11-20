"use client"
import React, { useEffect, useMemo, useRef, useState } from "react";

// tiny classnames helper (optional). Replace with your own `cn` if you have one.
function cx(...args) {
  return args.filter(Boolean).join(" ");
}

/**
 * Props:
 * - tabs: [{ id: string, label: ReactNode, content?: ReactNode }]
 * - defaultValue?: string
 * - value?: string (controlled)
 * - onValueChange?: (id) => void
 * - className?: string (wrapper)
 * - barClassName?: string (tab bar)
 * - contentClassName?: string
 * - activeTextClassName?: string
 * - inactiveTextClassName?: string
 * - renderContent?: boolean (default true)
 */
export default function Tabs({
  tabs,
  defaultValue,
  value,
  onValueChange,
  className,
  barClassName,
  contentClassName,
  activeTextClassName = "text-[#FF5722]",
  inactiveTextClassName = "text-foreground/80",
  renderContent = true,
}) {
  // uncontrolled fallback -> first tab
  const [internal, setInternal] = useState(
    value ?? defaultValue ?? (tabs?.[0]?.id || "")
  );
  // keep internal synced when controlled
  useEffect(() => {
    if (value != null) setInternal(value);
  }, [value]);

  const activeId = value ?? internal;
  const activeIndex = useMemo(
    () => Math.max(0, tabs.findIndex((t) => t.id === activeId)),
    [tabs, activeId]
  );

  const barRef = useRef(null);
  const btnRefs = useRef({}); // id -> button

  // indicator position/size state
  const [indicator, setIndicator] = useState({ left: 0, width: 0, height: 0 });

  const measure = () => {
    const btn = btnRefs.current[activeId];
    const bar = barRef.current;
    if (!btn || !bar) return;
    const barRect = bar.getBoundingClientRect();
    const btnRect = btn.getBoundingClientRect();
    setIndicator({
      left: btnRect.left - barRect.left,
      width: btnRect.width,
      height: btnRect.height,
    });
  };

  // measure on mount + changes + resize
  useEffect(() => {
    measure();
    const ro = new ResizeObserver(measure);
    if (barRef.current) ro.observe(barRef.current);
    window.addEventListener("resize", measure);
    return () => {
      window.removeEventListener("resize", measure);
      ro.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeId, tabs]);

  const setActive = (id) => {
    if (value == null) setInternal(id);
    onValueChange?.(id);
  };

  return (
    <div className={cx("w-full", className)}>
      {/* Tab bar */}
      <div
        ref={barRef}
        className={cx(
          "relative flex gap-4 bg-sidebar-accent p-1.5 rounded-lg border border-foreground/20",
          barClassName
        )}
      >
        {/* Animated indicator */}
        <div
          className="absolute top-1.5 bottom-1.5 rounded-lg bg-background border border-foreground/20 transition-all duration-300 ease-out"
          style={{
            transform: `translateX(${indicator.left-7}px)`,
            width: indicator.width,
            // optional: match exact height (minus vertical padding)
          }}
        />
        {tabs.map((t) => (
          <button
            key={t.id}
            ref={(el) => (btnRefs.current[t.id] = el)}
            onClick={() => setActive(t.id)}
            className={cx(
              "flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-medium transition-colors w-full relative z-10 cursor-pointer",
              activeId === t.id ? activeTextClassName : inactiveTextClassName
            )}
            type="button"
          >
            <span>{t.label}</span>
          </button>
        ))}
      </div>

    </div>
  );
}
