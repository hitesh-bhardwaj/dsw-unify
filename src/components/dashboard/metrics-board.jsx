"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { MetricCard } from "@/components/home/metric-card";
import { ListIcon, GridIcon, Eye } from "@/components/Icons";
import { ManageCardsModal } from "./manage-cards-modal";
import Link from "next/link";

/**
 * MetricsBoard component displaying platform metrics with list/grid view options.
 * Features smooth scrolling with LERP animation and drag-to-reorder functionality.
 *
 * @param {Object} props - The component props.
 * @param {Array<Object>} props.metricsData - Array of metric data objects.
 * @param {string} props.view - Current view mode ("list" or "grid").
 * @param {function} props.setView - Function to update view mode.
 * @param {boolean} [props.isLoading=false] - Loading state indicator.
 * @returns {React.JSX.Element} The rendered MetricsBoard component.
 */
export function MetricsBoard({ metricsData, view, setView, isLoading = false }) {
  // State for reorderable items
  const [items, setItems] = useState(metricsData);

  // Initialize visibility - all cards visible by default
  const [cardVisibility, setCardVisibility] = useState(() => {
    const initial = {};
    metricsData.forEach((_, index) => {
      initial[index] = true;
    });
    return initial;
  });

  // Update items when metricsData changes (from API)
  useEffect(() => {
    setItems(metricsData);
  }, [metricsData]);

  const scrollRef = useRef(null);

  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // DRAG/SCROLL refs
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  // LERP for smooth scroll
  const targetScroll = useRef(0);
  const currentScroll = useRef(0);
  const animationFrame = useRef(null);

  // Drag & drop for LIST
  const dragIndex = useRef(null);
  const dragOver = useRef(null);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setShowLeft(el.scrollLeft > 0);
    setShowRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  };

  const smoothScroll = () => {
    const el = scrollRef.current;
    if (!el) return;

    currentScroll.current += (targetScroll.current - currentScroll.current) * 0.1;

    if (Math.abs(targetScroll.current - currentScroll.current) < 0.5) {
      currentScroll.current = targetScroll.current;
    }

    el.scrollLeft = currentScroll.current;
    checkScroll();

    animationFrame.current = requestAnimationFrame(smoothScroll);
  };

  const handleScrollClick = (dir) => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = dir === "left" ? -300 : 300;
    targetScroll.current = el.scrollLeft + amount;
    targetScroll.current = Math.max(0, Math.min(targetScroll.current, el.scrollWidth - el.clientWidth));
  };

  const handleMouseDown = (e) => {
    if (!scrollRef.current) return;
    isDown.current = true;
    scrollRef.current.classList.add("cursor-grabbing");
    startX.current = e.pageX - scrollRef.current.offsetLeft;
    scrollLeft.current = targetScroll.current = scrollRef.current.scrollLeft;
  };

  const handleMouseLeave = () => {
    if (!scrollRef.current) return;
    isDown.current = false;
    scrollRef.current.classList.remove("cursor-grabbing");
  };

  const handleMouseUp = () => {
    if (!scrollRef.current) return;
    isDown.current = false;
    scrollRef.current.classList.remove("cursor-grabbing");
  };

  const handleMouseMove = (e) => {
    if (!isDown.current || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX.current) * 1;
    targetScroll.current = scrollLeft.current - walk;
    targetScroll.current = Math.max(0, Math.min(targetScroll.current, scrollRef.current.scrollWidth - scrollRef.current.clientWidth));
  };

  const handleDrop = () => {
    if (dragIndex.current === null || dragOver.current === null) return;
    if (dragIndex.current === dragOver.current) return;

    setItems((prev) => {
      const updated = [...prev];
      const [moved] = updated.splice(dragIndex.current, 1);
      updated.splice(dragOver.current, 0, moved);
      return updated;
    });

    dragIndex.current = dragOver.current = null;
  };

  // Start animation on mount
  useEffect(() => {
    animationFrame.current = requestAnimationFrame(smoothScroll);
    return () => cancelAnimationFrame(animationFrame.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Restart smooth scroll when switching back to LIST
  useEffect(() => {
    if (view === "list") {
      cancelAnimationFrame(animationFrame.current);
      animationFrame.current = requestAnimationFrame(smoothScroll);

      if (scrollRef.current) {
        currentScroll.current = scrollRef.current.scrollLeft;
        targetScroll.current = currentScroll.current;
        checkScroll();
      }
    } else {
      cancelAnimationFrame(animationFrame.current);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [view]);

  return (
    <>
      <motion.div layout="position" className="space-y-4 overflow-hidden">
        {/* Header */}
        <div className="flex items-end justify-between px-6 flex-wrap gap-3">
          <div className="space-y-1">
            <h1 className="text-3xl font-medium text-foreground">Overview</h1>
            <p className="text-sm dark:text-foreground text-black/60">
              Key platform metrics and activity at a glance
            </p>
          </div>
          <div className="space-x-1 flex items-center gap-1">

            <Link href={"#"} onClick={() => setIsModalOpen(true)} className="border border-border-color-0 rounded-md py-1.5 p-1.5 flex items-center gap-3 text-sm">
              <div className="h-5 w-5 text-[#111111] dark:text-white">
                <Eye />
              </div>
              Manage Cards
            </Link>

            <TooltipProvider delayDuration={0}>
              <div className="inline-flex border border-border-color-0 rounded-md overflow-hidden py-1.5 px-2 gap-5">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button onClick={() => setView("list")} className="cursor-pointer">
                      <ListIcon className={`${view === "list" ? "opacity-100" : "opacity-[0.4]"}`} />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent side="top">
                    <p>List View</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <button onClick={() => setView("grid")} className="cursor-pointer">
                      <GridIcon className={`${view === "grid" ? "opacity-100" : "opacity-[0.4]"}`} />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent side="top">
                    <p>Grid View</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </TooltipProvider>
          </div>
        </div>

        {/* Metrics Wrapper */}
        <AnimatePresence mode="popLayout">
          {view === "list" && (
            <motion.div
              key="list"
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.1 }}
              className="relative"
            >
              {showLeft && (
                <button
                  onClick={() => handleScrollClick("left")}
                  className="absolute cursor-pointer left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black shadow-lg hover:bg-neutral-900 transition-colors flex items-center justify-center dark:bg-white"
                >
                  <ChevronLeft className="w-6 h-6 text-white dark:text-black" />
                </button>
              )}
              {showRight && (
                <button
                  onClick={() => handleScrollClick("right")}
                  className="absolute cursor-pointer right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black flex items-center justify-center dark:bg-white"
                >
                  <ChevronRight className="w-6 h-6 text-white dark:text-black" />
                </button>
              )}

              <div
                ref={scrollRef}
                onScroll={checkScroll}
                className="flex gap-4 overflow-x-auto px-6 cursor-grab select-none py-1 scrollbar-hide"
                onMouseDown={handleMouseDown}
                onMouseLeave={handleMouseLeave}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                {items.map((m) => (
                  <motion.div
                    key={m.label}
                    layoutId={`metric-${m.label}`}
                    layout
                    className="min-w-[280px]"
                    transition={{ type: "spring", stiffness: 100, damping: 20 }}
                  >
                    <MetricCard {...m} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {view === "grid" && (
            <motion.ul
              key="grid"
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.1 }}
              className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-6"
            >
              {items.map((m, i) => (
                <motion.li
                  key={m.label}
                  layoutId={`metric-${m.label}`}
                  layout
                  draggable
                  onDragStart={() => (dragIndex.current = i)}
                  onDragEnter={() => (dragOver.current = i)}
                  onDragEnd={handleDrop}
                  onDragOver={(e) => e.preventDefault()}
                  className="cursor-move"
                  transition={{ type: "spring", stiffness: 100, damping: 25 }}
                >
                  <div className="min-w-auto lg:min-w-[280px]">
                    <MetricCard {...m} />
                  </div>
                </motion.li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </motion.div>
      <ManageCardsModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        metricsData={metricsData}
        cardVisibility={cardVisibility}
        setCardVisibility={setCardVisibility}
      />

    </>
  );
}
