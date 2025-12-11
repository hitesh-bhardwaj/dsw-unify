"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { SynthWave } from "./Icons";
import { Separator } from "./ui/separator";
import { Bounce } from "./animations/Animations";

const skeletonShownMap = new Map();

/**
 * Component to display a card for memory items.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.memories - The memory data object.
 * @param {string} props.memories.id - The ID of the memory.
 * @param {string} props.memories.name - The name of the memory.
 * @param {string} props.memories.description - The description of the memory.
 * @param {string} props.memories.status - The status of the memory (e.g., "active").
 * @param {Array<{label: string}>} [props.memories.tags=[]] - The tags associated with the memory.
 * @param {string|number} props.memories.entries - The number of entries.
 * @param {React.ReactNode} props.memories.icon - The icon for the memory.
 * @param {number} [minSkeletonMs=500] - The minimum time to show the skeleton loader.
 * @returns {React.JSX.Element} The rendered MemoryCard component.
 */
export function MemoryCard({ memories, minSkeletonMs = 500 }) {
  const { id, name, description, status, tags = [], entries ,icon} = memories || {};

  // Keep skeleton visible for at least `minSkeletonMs`

  const [showSkeleton, setShowSkeleton] = useState(() => {
    // Only show skeleton if it hasn't been shown for this test before
    return !skeletonShownMap.has(id);
  });

  useEffect(() => {
    if (showSkeleton && id) {
      const t = setTimeout(() => {
        setShowSkeleton(false);
        skeletonShownMap.set(id, true);
      }, minSkeletonMs);
      return () => clearTimeout(t);
    }
  }, [minSkeletonMs, id, showSkeleton]);

  if (showSkeleton) return <MemoryCardSkeleton />;

  return (
    <Bounce>
      <Link href={`/agent-studio/memories/${id}`} className="block group h-full">
        <Card
          className={cn(
            "feature-card-hover-container overflow-hidden group hover:shadow-md cursor-pointer transition-all duration-300 bg-background border border-border-color-0 hover:border-white/20 !py-5 h-full"
          )}
        >
          <CardHeader>
            <div className="flex items-end justify-start gap-2">
              {/* Icon */}
             <div
                className={cn(
                  "flex h-14 w-14 items-center justify-center rounded-lg relative bg-sidebar-accent border border-color-2 text-foreground group-hover:bg-white group-hover:text-black group-hover:border-white transition-all duration-300"
                )}
              >
                <span
                  className={cn(
                    "w-full h-full flex justify-center items-center p-4"
                  )}
                >
                  {icon}
                </span>
                <span
                  className={cn(
                    "w-3 h-3 rounded-full bg-badge-green absolute -top-0.5 -right-0.5 animate-pulse",
                    status === "active" ? "" : "hidden"
                  )}
                />
              </div>

              {/* Status badge */}
             <Badge
                className={cn(
                  "rounded-full px-3 py-1 text-xs font-medium bg-white/10 border transition-all duration-300 group-hover:text-white group-hover:border-white",
                  status === "active"
                    ? "border-badge-green text-foreground"
                    : "border-badge-sea-green text-foreground px-4 opacity-[0.8]"
                )}
              >
                {status === "active" ? "Active" : "Beta"}
              </Badge>
            </div>

            {/* Name */}
            <h3 className="mt-7 text-xl font-medium text-foreground group-hover:text-white transition-colors duration-300">
              {name}
            </h3>

            {/* Description */}
            <p className="text-sm text-foreground/80 group-hover:text-white/90 transition-colors duration-300">
              {description}
            </p>
          </CardHeader>

          <CardContent>

            <div className="border border-border-color-0 group-hover:border-white/30 h-full w-full rounded-lg flex px-5 py-2 min-h-20 items-center bg-white/10 dark:bg-background dark:group-hover:bg-white/10 transition-all duration-300">

            {/* Tags */}
            <div className="flex flex-wrap gap-1">
              {tags.map((tag, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className={cn(
                    "rounded-full border border-color-2 px-3 py-1 dark:bg-background text-xs font-light transition-all duration-300 group-hover:text-white group-hover:border-white/30 bg-white/10 dark:group-hover:bg-white/10"
                  )}
                >
                  {tag.label}
                </Badge>
              ))}
            </div>
            <div className="w-16 h-[0.2px] bg-border-color-3 group-hover:bg-white/40 rotate-90 transition-colors duration-300" />
            <div className="flex items-center justify-between rounded-lg p-3 text-sm py-4 duration-300">
              <div className="flex flex-col items-start gap-1">
                <span className="text-foreground font-medium text-lg group-hover:text-white transition-colors duration-300">
                  {entries}
                </span>
                <span className="text-gray-600 dark:text-foreground/60 group-hover:text-white/80 transition-colors duration-300">Entries</span>
              </div>
            </div>
                        </div>


            {/* Footer stats */}

          </CardContent>
        </Card>
      </Link>
    </Bounce>
  );
}

/* ---------------------------------------------
   Skeleton that mirrors the MemoryCard layout
---------------------------------------------- */
/**
 * Skeleton component for MemoryCard.
 *
 * @returns {React.JSX.Element} The rendered MemoryCardSkeleton component.
 */
export function MemoryCardSkeleton() {
  return (
    <Bounce>
      <div className="block group h-full">
        <Card className="overflow-hidden hover:shadow-xl transition-all duration-500 ease-out bg-background border border-border-color-0 !py-5">
          <CardHeader>
            <div className="flex items-start justify-between">
              {/* Icon placeholder */}
              <div className="flex h-14 w-14 items-center justify-center rounded-lg relative bg-black/40">
                <Skeleton className="h-full w-full rounded" />
                {/* <span className="w-3 h-3 rounded-full bg-badge-green absolute -top-0.5 -right-0.5 opacity-40" /> */}
              </div>

              {/* Status badge placeholder */}
              <div className="rounded-full text-xs font-medium bg-gray-200 dark:bg-background">
                <Skeleton className="h-6 w-16" />
              </div>
            </div>

            {/* Name & Description placeholders */}
            <div className="mt-7 space-y-2">
              <Skeleton className="h-6 w-2/3" />
              <Skeleton className="h-4 w-11/12" />
            </div>
          </CardHeader>

          <CardContent>
            {/* Tags skeleton */}
            <div className="mb-8 flex flex-wrap gap-1">
              <Skeleton className="h-6 w-20 rounded-full" />
              <Skeleton className="h-6 w-24 rounded-full" />
              <Skeleton className="h-6 w-16 rounded-full" />
            </div>

            {/* Footer stats skeleton */}
            <div className="flex items-center  justify-between rounded-lg p-3 text-sm py-4 bg-gray-100 dark:bg-background border">
              <div className="flex flex-col items-start gap-1">
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-4 w-12" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Bounce>
  );
}
