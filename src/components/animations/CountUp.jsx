"use client"
import { useEffect, useMemo, useRef, useState } from "react";
import { animate, useInView, useMotionValue } from "framer-motion";

export default function CountUp({
  value,
  duration = 1.5, 
  delay = 0,    
  startOnView = true,
  once = true,
  className,
}) {
  const parseValue = (raw) => {
    const str = String(raw).trim();
    // [prefix][number][suffix]
    const match = str.match(
      /^([^\d+\-]*)([+\-]?\d{1,3}(?:,\d{3})*(?:\.\d+)?|[+\-]?\d*(?:\.\d+)?)(.*)$/
    );
    if (!match) return { prefix: "", number: 0, suffix: str, decimals: 0 };

    const [, prefix, numPart, suffix] = match;
    const clean = (numPart || "0").replace(/,/g, "");
    const number = Number.isFinite(parseFloat(clean)) ? parseFloat(clean) : 0;

    const dotIdx = clean.indexOf(".");
    const decimals = dotIdx === -1 ? 0 : clean.length - dotIdx - 1;

    return { prefix: prefix || "", number, suffix: suffix || "", decimals };
  };

  const formatNumber = (n, decimals) =>
    decimals === 0 ? Math.round(n).toString() : n.toFixed(decimals);

  const { prefix, number: target, suffix, decimals } = useMemo(
    () => parseValue(value),
    [value]
  );

  const [display, setDisplay] = useState(
    `${prefix}${formatNumber(0, decimals)}${suffix}`
  );
  const motion = useMotionValue(0);

  const ref = useRef(null);
  const inView = useInView(ref, { once, margin: "0px 0px -20% 0px" });

  // Start when visible (or immediately if startOnView=false)
  useEffect(() => {
    const shouldStart = startOnView ? inView : true;
    if (!shouldStart) return;

    const controls = animate(motion, target, {
      duration,
      delay,
      ease: "easeOut",
      onUpdate: (latest) => {
        setDisplay(`${prefix}${formatNumber(latest, decimals)}${suffix}`);
      },
    });

    return () => controls.stop();
  }, [inView, startOnView, target, duration, delay, decimals, prefix, suffix, motion]);

  // Re-animate if the raw value changes after mount
  useEffect(() => {
    if (startOnView && !inView) return;
    const controls = animate(motion, target, {
      duration,
      ease: "easeOut",
      onUpdate: (latest) => {
        setDisplay(`${prefix}${formatNumber(latest, decimals)}${suffix}`);
      },
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <span ref={ref} className={className} aria-label={`${value}`}>
      {display}
    </span>
  );
}
