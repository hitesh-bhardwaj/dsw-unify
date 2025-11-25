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

export function LLMCard({ llm, minSkeletonMs = 500 }) {
  const { id, name, description, status, tags = [] } = llm || {};

  const [showSkeleton, setShowSkeleton] = useState(() => {
    // Only show skeleton if it hasn't been shown for this LLM before
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

  if (showSkeleton) {
    return <LLMCardSkeleton />;
  }

  return (
    <Bounce>
      <Link href={`/agent-studio/llms/${id}`} className="block  h-full">
        <Card
          className={cn(
            "overflow-hidden group hover:shadow-xl cursor-pointer transition-all hover:bg-sidebar-accent duration-500 ease-out",
            "bg-background border border-border-color-1 group-hover:bg-active-card dark:group-hover:bg-sidebar-accent group-hover:text-white group-hover:border-border-color-1 py-5"
          )}
        >
          <CardHeader>
            <div className="flex items-start justify-between">
              {/* Icon */}
              <div
                className={cn(
                  "flex h-14 w-14 items-center justify-center rounded-lg relative bg-sidebar-accent border border-color-2 dark:bg-background group-hover:bg-black transition-all dark:group-hover:bg-white duration-500 ease-out "
                )}
              >
                <span
                  className={cn(
                    "w-full h-full flex justify-center items-center dark:group-hover:text-black p-4.5 text-black dark:text-white group-hover:text-white transition-all duration-500 ease-out "
                  )}
                >
                  <SynthWave />
                </span>
                <span
                  className={cn(
                    "w-3 h-3 rounded-full bg-badge-green absolute -top-0.5 -right-0.5 animate-pulse",
                    status === "active" ? "" : "hidden"
                  )}
                />
              </div>

              {/* Status badge */}
              {!llm?.deploy ? (
                 <Badge
                className={cn(
                  "rounded-full px-3 py-1 text-xs font-medium ",
                  status === "active"
                    ? "bg-badge-green text-white"
                    : "bg-[#DEDEDE] text-foreground px-4 dark:bg-foreground dark:text-background"
                )}
              >
                {status === "active" ? "Active" : "Draft"}
              </Badge>
              ) : (
                <Badge className="rounded-full px-3 py-1 text-xs font-medium text-white bg-badge-sea-green">
                  Deploying
                </Badge>
              )}
            </div>

            {/* Name */}
            <h3 className="mt-7 text-xl font-medium  text-black dark:text-white transition-all duration-500 ease-out">
              {name}
            </h3>

            {/* Description */}
            <p className="text-sm text-gray-600 dark:text-foreground  dark-hover:text-foreground  transition-all duration-500 ease-out ">
              {description}
            </p>
          </CardHeader>

          <CardContent>
            {/* Tags */}
            <div className="mb-10 flex flex-wrap gap-1 ">
              {tags.map((tag, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className={cn(
                   "rounded-full border border-color-2 px-3 py-1 bg-white dark:bg-background text-xs font-light transition-all duration-500 ease-out dark:group-hover:bg-background"
                    
                  )}
                >
                  {tag.label}
                </Badge>
              ))}
            </div>

            {/* Footer */}
            {!llm?.deploy ? (
              llm?.performance ? (
                <div className="flex flex-col gap-4 rounded-lg p-3 text-sm py-6 bg-white dark:bg-background  text-foreground  border-border-color-2 border">
                  <p>Performance</p>
                  <div className="w-full h-full flex justify-between">
                    <div className="w-[35%] h-full flex flex-col">
                      <p className="font-medium">{llm.accuracy}</p>
                      <p className="text-black/60 dark:text-foreground/80">Accuracy</p>
                    </div>
                    <div className="w-[1px] bg-foreground/40" />
                    <div className="w-[40%] h-full flex flex-col">
                      <p className="font-medium">{llm.latency}</p>
                      <p className="text-black/60 dark:text-foreground/80">Latency</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-4 rounded-lg p-3 text-sm py-6 bg-white dark:bg-background  text-foreground  border-border-color-2 border transition-all duration-500 ease-out">
                  <p>Usage Stats</p>
                  <div className="w-full h-full flex justify-between">
                    <div className="w-[35%] h-full flex flex-col">
                      <p className="font-medium">{llm.requests}</p>
                      <p className="text-black/60 dark:text-foreground/80">Requests</p>
                    </div>
                    <div className="w-[1px] bg-foreground/40" />
                    <div className="w-[40%] h-full flex flex-col">
                      <p className="font-medium">{llm.avgres}</p>
                      <p className="text-black/60 dark:text-foreground/80">Avg. Response</p>
                    </div>
                  </div>
                </div>
              )
            ) : (
              <div className="flex flex-col gap-4 rounded-lg p-3 text-sm py-6 bg-sidebar-accent group-hover:text-foreground text-foreground group-hover:bg-background border-border-color-2 border transition-all duration-500 ease-out">
                <p>Deploying Status</p>
                <div className="w-full flex flex-col gap-4">
                  <p className="text-primary">Progress:75%</p>
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
export function LLMCardSkeleton() {
  return (
    <Bounce>
      <div className="block h-full">
        <Card className="overflow-hidden hover:shadow-xl transition-all duration-500 ease-out bg-background border border-border-color-2 h-full py-5">
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