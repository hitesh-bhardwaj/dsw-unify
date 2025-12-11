"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Bounce } from "../animations/Animations";
import { SynthWave } from "../Icons";

const skeletonShownMap = new Map();

/**
 * Component to display a console card with details about a memory or item.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.memories - The memory or item data.
 * @param {string} props.memories.id - The ID of the item.
 * @param {string} props.memories.name - The name of the item.
 * @param {string} props.memories.description - The description of the item.
 * @param {string} props.memories.status - The status of the item (e.g., "active").
 * @param {React.ReactNode} props.memories.icon - The icon for the item.
 * @param {number} [minSkeletonMs=500] - The minimum time to show the skeleton loader.
 * @returns {React.JSX.Element} The rendered ConsoleCard component.
 */
export function ConsoleCard({ memories, minSkeletonMs = 500 }) {
  const {id, name, description, status,icon} = memories || {};

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

  if (showSkeleton) return <GuardrailsCardSkeleton />;

  return (
    <Bounce>
      <Link href={`#`} className="block group h-full">
        <Card
          className={cn(
            "overflow-hidden h-full hover:shadow-xl cursor-pointer transition-all duration-500 ease-out bg-background border border-border-color-0 group-hover:bg-active-card dark:group-hover:bg-sidebar-accent group-hover:text-white group-hover:border-border-color-0 py-5"
          )}
        >
          <CardHeader>
            <div className="flex items-start justify-between">
              {/* Icon */}
              <div
                className={cn(
                  "flex h-14 w-14 items-center justify-center rounded-lg relative bg-foreground dark:bg-sidebar-accent dark:group-hover:bg-background transition-all duration-500 ease-out group-hover:bg-background"
                )}
              >
                <span
                  className={cn(
                    "w-full h-full flex justify-center items-center p-4 text-white group-hover:text-black transition-all duration-500 ease-out dark:group-hover:text-foreground"
                  )}
                >
                    {icon}
                  {/* <SynthWave /> */}
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
                  "rounded-full px-3 py-1 text-xs font-medium",
                  status === "active"
                    ? "bg-badge-green text-white"
                    : "bg-badge-sea-green text-white px-4"
                )}
              >
                {status === "active" ? "Active" : "Beta"}
              </Badge>
            </div>

            {/* Name */}
            <h3 className="mt-7 text-xl font-medium text-foreground group-hover:text-white transition-all duration-500 ease-out">
              {name}
            </h3>

            {/* Description */}
            <p className="text-sm text-gray-600 dark:text-foreground group-hover:text-white transition-all duration-500 ease-out">
              {description}
            </p>
          </CardHeader>

         
        </Card>
      </Link>
    </Bounce>
  );
}

/* ---------------------------------------------
   Skeleton that mirrors the GuardrailsCard layout
---------------------------------------------- */
/**
 * Skeleton component for ConsoleCard.
 *
 * @returns {React.JSX.Element} The rendered GuardrailsCardSkeleton component.
 */
export function GuardrailsCardSkeleton() {
  return (
    <Bounce>
      <div className="block group h-full">
        <Card className="overflow-hidden h-full hover:shadow-xl transition-all duration-500 ease-out bg-background border border-border-color-0 !py-5">
          <CardHeader>
            <div className="flex items-start justify-between">
              {/* Icon placeholder */}
              <div className="flex h-14 w-14 items-center justify-center rounded-lg relative bg-black/40">
                <Skeleton className="h-full w-full rounded" />
                {/* <span className="w-3 h-3 rounded-full bg-badge-green absolute -top-0.5 -right-0.5 opacity-40" /> */}
              </div>

              {/* Status badge placeholder */}
              <div className="rounded-full text-xs font-medium bg-gray-200">
                <Skeleton className="h-6 w-16" />
              </div>
            </div>

            {/* Name & Description placeholders */}
            <div className="mt-7 space-y-2">
              <Skeleton className="h-6 w-2/3" />
              <Skeleton className="h-4 w-11/12" />
            </div>
          </CardHeader>
        </Card>
      </div>
    </Bounce>
  );
}
