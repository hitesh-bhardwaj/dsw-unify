"use client";

import { useEffect, useState, useRef } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { SynthWave } from "./Icons";
import { Bounce } from "./animations/Animations";

// Track which LLMs have already shown their skeleton
const skeletonShownMap = new Map();

/**
 * Component to display a card representing an LLM (Large Language Model).
 *
 * @param {Object} props - The component props.
 * @param {Object} props.llm - The LLM data object.
 * @param {string} props.llm.id - The unique identifier of the LLM.
 * @param {string} props.llm.name - The name of the LLM.
 * @param {string} props.llm.description - The description of the LLM.
 * @param {string} props.llm.status - The status of the LLM (e.g., "active").
 * @param {Array<{label: string}>} [props.llm.tags=[]] - An array of tags associated with the LLM.
 * @param {React.ReactNode} props.llm.icon - The icon for the LLM.
 * @param {boolean} [props.llm.deploy] - Whether the LLM is currently deploying.
 * @param {boolean} [props.llm.performance] - Whether to show performance stats instead of usage stats.
 * @param {string|number} [props.llm.accuracy] - The accuracy of the LLM (if performance is true).
 * @param {string|number} [props.llm.latency] - The latency of the LLM (if performance is true).
 * @param {string|number} [props.llm.requests] - The number of requests (if performance is false).
 * @param {string|number} [props.llm.avgres] - The average response time (if performance is false).
 * @param {number} [minSkeletonMs=500] - The minimum time in milliseconds to show the skeleton loader.
 * @returns {React.JSX.Element} The rendered LLMCard component.
 */
export function LLMCard({ llm, index, minSkeletonMs = 500, view }) {
  const { id, name, description, status, tags = [], icon } = llm || {};

  const [showSkeleton, setShowSkeleton] = useState(() => {
    // Only show skeleton if it hasn't been shown for this LLM before
    return !skeletonShownMap.has(id);
  });

  const isGrid = view === "grid";
  const isList = view === "list";

  useEffect(() => {
    if (showSkeleton && id) {
      const t = setTimeout(() => {
        setShowSkeleton(false);
        skeletonShownMap.set(id, true);
      }, minSkeletonMs);
      return () => clearTimeout(t);
    }
  }, [minSkeletonMs, id, showSkeleton]);

  if (showSkeleton) {
    return <LLMCardSkeleton />;
  }

  return (
    <Bounce>
      <Link href={`/agent-studio/llms/${id}`} className="block  h-full">
        <Card
          className={cn(
            "feature-card-hover-container overflow-hidden group hover:shadow-md cursor-pointer transition-all duration-300 bg-background border border-border-color-0 hover:border-white/20 py-5",
            isList && "!gap-0"
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
                  backgroundColor: `rgb(from var(--icon-color-${
                    (index % 4) + 1
                  }) r g b / 0.1)`,
                }}
              >
                <span
                  className={cn(
                    "w-full h-full flex justify-center items-center p-4 "
                  )}
                >
                  {icon}
                </span>
                {status?.toLowerCase() === "active" && (
                  <span className="w-3 h-3 rounded-full bg-badge-green absolute -top-0.5 -right-0.5 animate-pulse" />
                )}
              </div>

              {/* Status badge */}
              {!llm?.deploy ? (
                <Badge
                  className={cn(
                    "rounded-full px-3 py-1 text-xs font-medium transition-all duration-300 group-hover:text-white group-hover:border-white ",
                    status === "active"
                      ? "bg-white/10 text-foreground border border-badge-green"
                      : "bg-white/10 text-foreground px-4 border border-foreground"
                  )}
                >
                  {status === "active" ? "Active" : "Draft"}
                </Badge>
              ) : (
                <Badge className="rounded-full px-3 py-1 text-xs font-medium text-foreground bg-white/10 border border-[#2563FB] group-hover:text-white group-hover:border-white transition-all duration-300">
                  Deploying
                </Badge>
              )}
            </div>

            {/* Name */}
            <h3 className="mt-7 text-xl font-medium text-foreground group-hover:text-white transition-colors duration-300">
              {name}
            </h3>

            {/* Description */}
            <p className="text-sm text-gray-600 dark:text-foreground group-hover:text-white/90 transition-colors duration-300">
              {description}
            </p>
          </CardHeader>

          <CardContent>
            {/* Tags */}
            <div className="my-4 flex flex-wrap gap-1 ">
              {tags.map((tag, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className={cn(
                    "rounded-full border border-border-color-2 px-3 py-1  text-xs font-light transition-all duration-300 group-hover:text-white group-hover:border-white/60 bg-white/10 dark:group-hover:bg-white/10 dark:bg-card"
                  )}
                >
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Footer */}
            {!llm?.deploy ? (
              llm?.performance ? (
                <div className="flex flex-col gap-4 rounded-lg p-3 text-sm py-6 bg-white/10 dark:bg-card dark:group-hover:bg-white/10 text-foreground border-border-color-2 border group-hover:border-white/60 transition-all duration-300 ">
                  <p className="group-hover:text-white transition-colors duration-300">
                    Performance
                  </p>
                  <div className="w-full h-full flex justify-between">
                    <div className="w-[35%] h-full flex flex-col">
                      <p className="font-medium group-hover:text-white transition-colors duration-300">
                        {llm.accuracy}
                      </p>
                      <p className="text-black/60 dark:text-foreground/80 group-hover:text-white/80 transition-colors duration-300">
                        Accuracy
                      </p>
                    </div>
                    <div className="w-[1px] bg-foreground/40 group-hover:bg-white/40 transition-colors duration-300" />
                    <div className="w-[40%] h-full flex flex-col">
                      <p className="font-medium group-hover:text-white transition-colors duration-300">
                        {llm.latency}
                      </p>
                      <p className="text-black/60 dark:text-foreground/80 group-hover:text-white/80 transition-colors duration-300">
                        Latency
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-4 rounded-lg p-3 text-sm py-6 bg-white/10 dark:bg-card dark:group-hover:bg-white/10 text-foreground border-border-color-2 border group-hover:border-white/60 transition-all duration-300">
                  <p className="group-hover:text-white transition-colors duration-300">
                    Usage Stats
                  </p>
                  <div className="w-full h-full flex justify-between">
                    <div className="w-[35%] h-full flex flex-col">
                      <p className="font-medium group-hover:text-white transition-colors duration-300">
                        {llm.requests}
                      </p>
                      <p className="text-black/60 dark:text-foreground/80 group-hover:text-white/80 transition-colors duration-300">
                        Requests
                      </p>
                    </div>
                    <div className="w-[1px] bg-foreground/40 group-hover:bg-white/40 transition-colors duration-300" />
                    <div className="w-[40%] h-full flex flex-col">
                      <p className="font-medium group-hover:text-white transition-colors duration-300">
                        {llm.avgres}
                      </p>
                      <p className="text-black/60 dark:text-foreground/80 group-hover:text-white/80 transition-colors duration-300">
                        Avg. Response
                      </p>
                    </div>
                  </div>
                </div>
              )
            ) : (
              <div className="flex flex-col gap-4 rounded-lg p-3 text-sm py-6 bg-white/10 dark:bg-card dark:group-hover:bg-white/10 text-foreground border-border-color-2 border group-hover:border-white/30 transition-all duration-300">
                <p className="group-hover:text-white transition-colors duration-300">
                  Deploying Status
                </p>
                <div className="w-full flex flex-col gap-4">
                  <p className="text-primary group-hover:text-white transition-colors duration-300">
                    Progress:75%
                  </p>
                  <div className="w-full h-[4px] rounded-full bg-black/15 overflow-hidden">
                    <div className="w-[75%] h-full bg-primary rounded-full" />
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </Link>
    </Bounce>
  );
}

/* -----------------------------
   Skeleton that mirrors the card
------------------------------ */
/**
 * Skeleton component for the LLMCard.
 *
 * @returns {React.JSX.Element} The rendered LLMCardSkeleton component.
 */
export function LLMCardSkeleton() {
  return (
    <Bounce>
      <div className="block h-full">
        <Card className="overflow-hidden hover:shadow-xl transition-all duration-500 ease-out bg-background border border-border-color-0 h-full py-5">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-black/40 relative">
                <Skeleton className="h-full w-full rounded" />
              </div>
              <div className="rounded-full text-xs font-medium bg-gray-200">
                <Skeleton className="h-6 w-16" />
              </div>
            </div>

            <div className="mt-7 space-y-2">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-5/6" />
            </div>
          </CardHeader>

          <CardContent>
            {/* Tags */}
            <div className="mb-10 flex flex-wrap gap-1">
              <Skeleton className="h-6 w-20 rounded-full" />
              <Skeleton className="h-6 w-24 rounded-full" />
              <Skeleton className="h-6 w-16 rounded-full" />
            </div>

            {/* Footer (generic placeholder) */}
            <div className="flex flex-col gap-4 rounded-lg p-3 text-sm py-6 bg-sidebar-accent border border-black/10">
              <Skeleton className="h-4 w-24" />
              <div className="w-full h-full flex justify-between">
                <div className="w-[35%] h-full flex flex-col gap-2">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-16" />
                </div>
                <div className="w-[1px] bg-foreground/40/20" />
                <div className="w-[40%] h-full flex flex-col gap-2">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-28" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Bounce>
  );
}
