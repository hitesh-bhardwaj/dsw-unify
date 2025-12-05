"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils"; // or replace with your own classnames helper

/**
 * A custom scrollable area component with a styled scrollbar.
 *
 * @param {Object} props - The component props.
 * @param {string} [props.className] - Class name for the outer container.
 * @param {string} [props.viewportClassName] - Class name for the scrollable viewport.
 * @param {React.ReactNode} props.children - The content to be scrolled.
 * @param {number} [props.trackThickness=8] - The thickness of the scrollbar track.
 * @param {number} [props.trackInset=8] - The inset of the scrollbar from the right edge.
 * @param {number} [props.minThumbSize=32] - The minimum height of the scrollbar thumb.
 * @returns {React.JSX.Element} The rendered CustomScrollArea component.
 */
export default function CustomScrollArea({
  className,
  viewportClassName,
  children,
  trackThickness = 8,
  trackInset = 8,
  minThumbSize = 32,
}) {
  const viewportRef = useRef(null);
  const trackRef = useRef(null);
  const [thumbTop, setThumbTop] = useState(0);
  const [thumbHeight, setThumbHeight] = useState(minThumbSize);
  const [visible, setVisible] = useState(false);
  const draggingRef = useRef(null);

  const recalc = () => {
    const vp = viewportRef.current;
    const track = trackRef.current;
    if (!vp || !track) return;

    const { scrollHeight, clientHeight, scrollTop } = vp;
    const hasOverflow = scrollHeight > clientHeight + 1;
    setVisible(hasOverflow);

    if (!hasOverflow) {
      setThumbTop(0);
      setThumbHeight(minThumbSize);
      return;
    }

    const ratio = clientHeight / scrollHeight;
    const th = Math.max(Math.floor(ratio * track.clientHeight), minThumbSize);
    setThumbHeight(th);

    const maxThumbTop = track.clientHeight - th;
    const maxScrollTop = scrollHeight - clientHeight;
    const top = maxScrollTop > 0 ? (scrollTop / maxScrollTop) * maxThumbTop : 0;
    setThumbTop(top);
  };

  useEffect(() => {
    const vp = viewportRef.current;
    if (!vp) return;

    const onScroll = () => recalc();
    vp.addEventListener("scroll", onScroll, { passive: true });

    const ro = new ResizeObserver(recalc);
    ro.observe(vp);

    const mo = new MutationObserver(recalc);
    mo.observe(vp, { childList: true, subtree: true, characterData: true });

    recalc();
    return () => {
      vp.removeEventListener("scroll", onScroll);
      ro.disconnect();
      mo.disconnect();
    };
  }, []);

  useEffect(() => {
    const onMove = (e) => {
      if (!draggingRef.current || !viewportRef.current || !trackRef.current) return;
      const { startY } = draggingRef.current;
      const delta = e.clientY - startY;

      const trackHeight = trackRef.current.clientHeight;
      const maxThumbTop = trackHeight - thumbHeight;

      const vp = viewportRef.current;
      const maxScrollTop = vp.scrollHeight - vp.clientHeight;

      const newThumbTop = Math.min(Math.max(thumbTop + delta, 0), maxThumbTop);
      const scrollRatio = maxThumbTop > 0 ? newThumbTop / maxThumbTop : 0;
      const nextScrollTop = scrollRatio * maxScrollTop;

      vp.scrollTop = nextScrollTop;
      draggingRef.current = { startY: e.clientY, startScrollTop: nextScrollTop };
    };

    const onUp = () => {
      draggingRef.current = null;
      document.body.style.userSelect = "";
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
    };

    if (draggingRef.current) {
      document.addEventListener("mousemove", onMove);
      document.addEventListener("mouseup", onUp);
    }

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
    };
  }, [thumbHeight, thumbTop]);

  const onThumbMouseDown = (e) => {
    if (!viewportRef.current) return;
    draggingRef.current = { startY: e.clientY, startScrollTop: viewportRef.current.scrollTop };
    document.body.style.userSelect = "none";
  };

  const onTrackClick = (e) => {
    if (!viewportRef.current || !trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const clickY = e.clientY - rect.top;
    const isThumb = clickY >= thumbTop && clickY <= thumbTop + thumbHeight;
    if (isThumb) return;

    const vp = viewportRef.current;
    const direction = clickY < thumbTop ? -1 : 1;
    vp.scrollBy({ top: direction * vp.clientHeight * 0.9, behavior: "smooth" });
  };

  const coverWidth = useMemo(
    () => Math.max(trackThickness + trackInset * 2, 20),
    [trackThickness, trackInset]
  );

  // aria-valuenow as percentage (0–100)
  const ariaNow = (() => {
    const vp = viewportRef.current;
    if (!vp) return 0;
    const maxScrollTop = vp.scrollHeight - vp.clientHeight;
    if (maxScrollTop <= 0) return 0;
    return Math.round((vp.scrollTop / maxScrollTop) * 100);
  })();

  return (
    <div className={cn("absolute", className)}>
      {/* Scrollable viewport (native scroll; we just mirror it) */}
      <div ref={viewportRef} className={cn("overflow-y-auto pr-4", viewportClassName)}>
        {children}
      </div>

      {/* Opaque cover to visually hide the native scrollbar (no ::-webkit-scrollbar used) */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 right-0 h-full"
        style={{ width: coverWidth }}
      />

      {/* Custom scrollbar */}
      {visible && (
        <div
          ref={trackRef}
          className="absolute"
          style={{ top: 8, bottom: 8, right: trackInset, width: trackThickness }}
          onMouseDown={onTrackClick}
        >
          <div className="absolute inset-0 rounded-full bg-primary" />
          <div
            role="scrollbar"
            aria-orientation="vertical"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={ariaNow}
            className="absolute left-0 right-0 rounded-full cursor-pointer bg-primary hover:bg-[hsl(var(--foreground)/0.5)]"
            style={{ top: thumbTop, height: thumbHeight }}
            onMouseDown={onThumbMouseDown}
          />
        </div>
      )}
    </div>
  );
}
