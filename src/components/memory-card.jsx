"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import Link from "next/link";
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

export function MemoryCard({ memories, index, minSkeletonMs = 500, view }) {
  const {
    id,
    name,
    description,
    status,
    tags = [],
    entries,
    size,
    icon,
  } = memories || {};

  const [showSkeleton, setShowSkeleton] = useState(() => {
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
  }, [showSkeleton, id, minSkeletonMs]);

  if (showSkeleton) return <MemoryCardSkeleton />;

  return (
    <Bounce>
      <Link href={`/agent-studio/memories/${id}`} className="block h-full">
        <Card
          className={cn(
            "feature-card-hover-container group overflow-hidden cursor-pointer transition-all duration-300 bg-background border border-border-color-0 hover:drop-shadow-xl hover:border-transparent  py-5 h-full gap-2"
          )}
        >
          <CardHeader>
            <div className="flex items-end gap-2">
              {/* Icon */}
              <div
                className={cn(
                  "flex h-14 w-14 items-center justify-center rounded-lg relative bg-sidebar-accent text-foreground group-hover:!bg-white group-hover:!text-black  transition-all duration-300"
                )}
                 style={{
                color: `var(--icon-color-${(index % 4) + 1})`,
                backgroundColor: `rgb(from var(--icon-color-${(index % 4) + 1}) r g b / 0.1)`
              }}
              >
                <span className="w-full h-full flex items-center justify-center p-4">
                  {icon}
                </span>

                {/* Active dot */}
                {status === "active" && (
                  <span className="w-3 h-3 rounded-full bg-badge-green absolute -top-0.5 -right-0.5 animate-pulse" />
                )}
              </div>

              {/* Status */}
             <Badge
                className={cn(
                  "rounded-full px-3 py-1 text-xs font-medium bg-white/10 border transition-all  group-hover:text-white group-hover:border-white dark:bg-background dark:group-hover:bg-white/10",
                  status === "active"
                    ? "border-badge-green text-foreground"
                    : "border-badge-sea-green text-foreground px-4 opacity-[0.8]"
                )}
              >
                {status === "active" ? "Active" : "Beta"}
              </Badge>
            </div>

            {/* Title */}
            <h3 className="mt-7 text-xl font-medium text-foreground group-hover:text-white transition-colors ">
              {name}
            </h3>

            {/* Description */}
            <p className="text-sm text-gray-600 dark:text-foreground group-hover:text-white/90 transition-colors ">
              {description}
            </p>
          </CardHeader>

          <CardContent>
            {/* Tags */}
            <div className="my-4 flex flex-wrap gap-1">
              {tags.map((tag, i) => (
                <Badge
                  key={i}
                  variant="secondary"
                  className="rounded-full border border-border-color-2 px-3 py-1 text-xs font-light bg-white/10 transition-all  group-hover:text-white group-hover:border-white/60 dark:bg-card dark:group-hover:bg-white/10"
                >
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Stats */}
            <div className={`flex items-center  rounded-lg p-4 py-6 text-sm bg-white/10 dark:bg-card dark:group-hover:bg-white/10 border border-border-color-2 group-hover:border-white/60 transition-all ${view==='list'? 'justify-between': 'justify-center gap-20'}`}>
              <div className="flex flex-col gap-1">
                <p className="text-sm font-medium group-hover:text-white  ">
                  {entries}
                </p>
                <p className="text-foreground/70 group-hover:text-white/80">
                  Entries
                </p>
              </div>

              <div className="w-[1px] h-10 bg-foreground/30 group-hover:bg-white/60  " />

              <div className="flex flex-col gap-1 text-left">
                <p className="text-sm font-medium group-hover:text-white ">
                  {size}
                </p>
                <p className="text-foreground/70 group-hover:text-white/80">
                  Size
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    </Bounce>
  );
}

/* ---------------- Skeleton ---------------- */

export function MemoryCardSkeleton() {
  return (
    <Bounce>
      <Card className="overflow-hidden bg-background border border-border-color-0 py-5 h-full">
        <CardHeader>
          <div className="flex items-start gap-2">
            <Skeleton className="h-14 w-14 rounded-lg" />
            <Skeleton className="h-6 w-16 rounded-full" />
          </div>

          <div className="mt-7 space-y-2">
            <Skeleton className="h-6 w-2/3" />
            <Skeleton className="h-4 w-full" />
          </div>
        </CardHeader>

        <CardContent>
          <div className="mb-6 flex gap-2">
            <Skeleton className="h-6 w-16 rounded-full" />
            <Skeleton className="h-6 w-20 rounded-full" />
          </div>

          <div className="flex items-center justify-between rounded-lg p-4 border">
            <div className="space-y-2">
              <Skeleton className="h-5 w-12" />
              <Skeleton className="h-4 w-16" />
            </div>
            <Skeleton className="h-10 w-[1px]" />
            <div className="space-y-2">
              <Skeleton className="h-5 w-14" />
              <Skeleton className="h-4 w-12" />
            </div>
          </div>
        </CardContent>
      </Card>
    </Bounce>
  );
}
