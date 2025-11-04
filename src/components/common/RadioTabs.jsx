"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";

// tiny classnames helper. Replace with your own `cn` if you have one.
function cx(...args) {
  return args.filter(Boolean).join(" ");
}

export default function RadioTabs({
  items = [],
  defaultValue,
  value,
  onValueChange,
  className,
  groupClassName,
  buttonClassName,
  dotColorClassName = "bg-[#FF5722]",
  activeClassName = " text-[#FF5722]",
  inactiveClassName = "border-transparent text-gray-700",
  equalWidth = true,
  ariaLabel = "Radio tabs",
  indicatorClassName = "rounded-lg bg-white border border-[#DCDCDC] transition-all duration-300 ease-out",
  indicatorOffsetX = 0, // set to -7 to mimic your earlier tweak
  indicatorInset = 6,   // equals tailwind top-1.5 / bottom-1.5 (~6px)
}) {
  // uncontrolled fallback -> first item
  const [internal, setInternal] = useState(
    value ?? defaultValue ?? (items?.[0]?.id || "")
  );

  // keep internal synced when controlled
  useEffect(() => {
    if (value != null) setInternal(value);
  }, [value]);

  const activeId = value ?? internal;

  const setActive = (id) => {
    if (items.find((it) => it.id === id)?.disabled) return;
    if (value == null) setInternal(id);
    onValueChange?.(id);
  };

  // refs for keyboard nav + measuring
  const btnRefs = useRef({});
  const barRef = useRef(null);

  const ids = useMemo(() => items.map((i) => i.id), [items]);
  const focusIndex = (idx) => {
    const clamped = Math.max(0, Math.min(ids.length - 1, idx));
    const id = ids[clamped];
    const el = btnRefs.current[id];
    if (el) el.focus();
  };

  const onKeyDown = (e) => {
    const idx = ids.indexOf(activeId);
    if (e.key === "ArrowRight") {
      e.preventDefault();
      for (let i = idx + 1; i < ids.length; i++) {
        if (!items[i].disabled) {
          setActive(ids[i]);
          focusIndex(i);
          break;
        }
      }
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      for (let i = idx - 1; i >= 0; i--) {
        if (!items[i].disabled) {
          setActive(ids[i]);
          focusIndex(i);
          break;
        }
      }
    } else if (e.key === "Home") {
      e.preventDefault();
      for (let i = 0; i < ids.length; i++) {
        if (!items[i].disabled) {
          setActive(ids[i]);
          focusIndex(i);
          break;
        }
      }
    } else if (e.key === "End") {
      e.preventDefault();
      for (let i = ids.length - 1; i >= 0; i--) {
        if (!items[i].disabled) {
          setActive(ids[i]);
          focusIndex(i);
          break;
        }
      }
    } else if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      const targetId = Object.entries(btnRefs.current).find(
        ([, el]) => el === document.activeElement
      )?.[0];
      if (targetId && !items.find((i) => i.id === targetId)?.disabled) {
        setActive(targetId);
      }
    }
  };

  // ----- Animated indicator (measure active button) -----
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

  useEffect(() => {
    measure();
    const ro = new ResizeObserver(measure);
    if (barRef.current) ro.observe(barRef.current);
    // Also observe each button to react to label/icon changes
    Object.values(btnRefs.current).forEach((el) => el && ro.observe(el));
    window.addEventListener("resize", measure);
    return () => {
      window.removeEventListener("resize", measure);
      ro.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeId, items]);

  return (
    <div className={cx("w-full", className)}>
      <div
        ref={barRef}
        role="radiogroup"
        aria-label={ariaLabel}
        className={cx(
          "relative flex gap-4 bg-[#F6F6F6] py-1.5 px-1.5 rounded-lg border border-gray-200",
          groupClassName
        )}
        onKeyDown={onKeyDown}
      >
        {/* Animated indicator */}
        <div
          className={cx("absolute transition-all duration-300 ease-out", indicatorClassName)}
          style={{
            left: 0,
            top: indicatorInset,
            bottom: indicatorInset,
            width: indicator.width,
            transform: `translateX(${indicator.left + indicatorOffsetX}px)`,
          }}
          aria-hidden="true"
        />

        {items.map(({ id, label, icon, disabled }) => {
          const Icon = icon && typeof icon === "function" ? icon : null;
          const isActive = activeId === id;
          return (
            <button
              key={id}
              ref={(el) => (btnRefs.current[id] = el)}
              role="radio"
              aria-checked={isActive}
              aria-disabled={disabled || undefined}
              disabled={disabled}
              onClick={() => setActive(id)}
              type="button"
              className={cx(
                "flex items-center gap-4 rounded-lg px-4 py-3 text-sm font-medium transition-colors cursor-pointer relative focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#FF5722] disabled:opacity-60 disabled:cursor-not-allowed z-10",
                equalWidth && "w-1/2",
                isActive ? activeClassName : inactiveClassName,
                buttonClassName
              )}
            >
              {/* radio bullet */}
              <span
                className={cx(
                  "h-5 w-5 rounded-full border flex items-center justify-center bg-white",
                  isActive ? "border-gray-300 " : "border-gray-300 "
                )}
                aria-hidden="true"
              >
                {isActive && (
                  <span className={cx("h-2.5 w-2.5 rounded-full animate-pulse", dotColorClassName)} />
                )}
              </span>

              {/* icon (if provided) */}
              <div className="flex gap-2">
              {Icon ? (
                <Icon className="!h-6 !w-auto" aria-hidden="true" />
              ) : (
                icon || null
              )}

              {/* label */}
              <span>{label}</span>

              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
