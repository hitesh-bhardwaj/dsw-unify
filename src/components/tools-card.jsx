"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { SynthWave } from "./Icons";
import { Bounce } from "./animations/Animations";

const skeletonShownMap = new Map();

/**
 * Component to display a card for tools.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.tools - The tool data.
 * @param {string} props.tools.id - The ID of the tool.
 * @param {string} props.tools.name - The name of the tool.
 * @param {string} props.tools.description - The description of the tool.
 * @param {string} props.tools.status - The status of the tool (e.g., "active").
 * @param {Array<{label: string}>} [props.tools.tags=[]] - The tags associated with the tool.
 * @param {React.ReactNode} props.tools.icon - The icon for the tool.
 * @param {number} [minSkeletonMs=500] - The minimum time to show the skeleton loader.
 * @returns {React.JSX.Element} The rendered ToolsCard component.
 */
export function ToolsCard({ tools,index, minSkeletonMs = 500 }) {
  const {id,name, description, status, tags = [],icon } = tools || {};

  // Keep a skeleton up for at least `minSkeletonMs`

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

  

  if (showSkeleton) return <ToolsCardSkeleton />;

  return (
    <Bounce>
      <Link href={`/agent-studio/tools/${id}`} className="block group h-full">
        <Card
          className={cn(
            "feature-card-hover-container overflow-hidden group hover:shadow-md cursor-pointer transition-all duration-300 bg-background border border-border-color-0 !py-5 h-full"
          )}
        >
          <CardHeader>
            <div className="flex items-end justify-start gap-2">
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
                  "rounded-full px-3 py-1 text-xs font-medium bg-white/10 dark:bg-background border border-badge-green text-foreground group-hover:text-white group-hover:border-white transition-all duration-300 dark:group-hover:bg-white/10",
                  status !== "active" && "border-badge-sea-green opacity-[0.8] px-4"
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

            <div className="border border-border-color-0 group-hover:border-white/30 h-full w-full rounded-lg flex px-5 min-h-20 items-center bg-white/10 dark:bg-background dark:group-hover:bg-white/10 transition-all duration-300">

            {/* Tags */}
            <div className="h-fit flex flex-wrap gap-1">
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
            </div>
          </CardContent>
        </Card>
      </Link>
    </Bounce>
  );
}

/* ---------------------------------------------
   Skeleton that mirrors the ToolsCard layout
---------------------------------------------- */
/**
 * Skeleton component for ToolsCard.
 *
 * @returns {React.JSX.Element} The rendered ToolsCardSkeleton component.
 */
export function ToolsCardSkeleton() {
  return (
    <Bounce>
      <div className="block group h-full">
        <Card className="overflow-hidden hover:shadow-xl transition-all duration-500 ease-out bg-background border border-border-color-0 !pt-5">
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

            {/* Name & description placeholders */}
            <div className="mt-7 space-y-2">
              <Skeleton className="h-6 w-2/3" />
              <Skeleton className="h-4 w-11/12" />
            </div>
          </CardHeader>

          <CardContent>
            {/* Tags skeleton */}
            <div className="mb-16 flex flex-wrap gap-1">
              <Skeleton className="h-6 w-20 rounded-full" />
              <Skeleton className="h-6 w-24 rounded-full" />
              <Skeleton className="h-6 w-16 rounded-full" />
            </div>
          </CardContent>
        </Card>
      </div>
    </Bounce>
  );
}
