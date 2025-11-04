"use client";

import { useEffect, useMemo, useRef } from "react";
import { motion, useAnimationControls, useInView } from "framer-motion";

// optional: if you have a cn helper, import it. Otherwise this tiny fallback works.
const cx = (...args) => args.filter(Boolean).join(" ");

function clampPercent(n) {
  return Math.max(0, Math.min(100, n));
}
function toPercentString(v, fallback) {
  const source = v ?? fallback ?? 0;
  if (typeof source === "number") return `${clampPercent(source)}%`;
  if (typeof source === "string") {
    const m = source.match(/(\d+(?:\.\d+)?)/);
    if (m?.[1]) return `${clampPercent(parseFloat(m[1]))}%`;
  }
  return "0%";
}

export default function AnimatedProgressBar({
  value,
  labelValue,
  animateOnMount = true,
  resetOnExit = true,
  playKey,
  duration = 1.2,
  delay = 0,
  ease = "easeInOut",
  inViewAmount = 0.4,
  inViewMargin = "-10% 0px -10% 0px",
  className,
  trackClassName = "w-full bg-gray-200 rounded-full h-2 relative overflow-hidden",
  barClassName = "bg-primary h-full absolute top-0 left-0 z-[5] rounded-full",
  ariaLabel = "progress",
  min = 0,
  max = 100,
}) {
  const targetWidth = useMemo(
    () => toPercentString(value, labelValue),
    [value, labelValue]
  );

  const ref = useRef(null);
  const inView = useInView(ref, { amount: inViewAmount, margin: inViewMargin });
  const controls = useAnimationControls();

  useEffect(() => {
    if (!animateOnMount) return;
    if (inView) {
      controls.start({
        width: targetWidth,
        transition: { duration, delay, ease },
      });
    } else if (resetOnExit) {
      controls.set({ width: "0%" });
    }
  }, [inView, targetWidth, animateOnMount, resetOnExit, controls, duration, delay, ease]);

  useEffect(() => {
    if (playKey === undefined) return;
    controls.set({ width: "0%" });
    controls.start({
      width: targetWidth,
      transition: { duration, delay, ease },
    });
  }, [playKey, targetWidth, controls, duration, delay, ease, inView]);

  const ariaNow = useMemo(() => {
    const m = targetWidth.match(/(\d+(?:\.\d+)?)%/);
    return m?.[1] ? Number(m[1]) : 0;
  }, [targetWidth]);

  return (
    <div className={cx("w-full", className)}>
      <div
        ref={ref}
        className={cx(trackClassName)}
        role="progressbar"
        aria-label={ariaLabel}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={clampPercent(ariaNow)}
      >
        <motion.div
          initial={{ width: animateOnMount ? "0%" : targetWidth }}
          animate={controls}
          className={cx(barClassName)}
        />
      </div>
    </div>
  );
}
