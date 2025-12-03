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
export function GuardrailsCard({ memories, minSkeletonMs = 500 }) {
  const {id, name, description, status, tags = [], triggers ,icon} = memories || {};

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
      <Link href={`/agent-studio/guardrails/${id}`} className="block group h-full">
        <Card
          className={cn(
           "overflow-hidden group hover:shadow-xl cursor-pointer transition-all duration-500 ease-out bg-background border border-border-color-1 hover:bg-sidebar-accent group-hover:bg-active-card dark:group-hover:bg-sidebar-accent group-hover:text-white group-hover:border-border-color-1 !py-5 h-full"
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
                    "w-full h-full flex justify-center items-center dark:group-hover:text-black p-3.5 text-black dark:text-white group-hover:text-white transition-all duration-500 ease-out "
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
                  "rounded-full px-3 py-1 text-xs bg-white font-medium",
                  status === "active"
                    ? "border-badge-green dark:bg-background dark:text-white text-black"
                    : "border-badge-sea-green dark:bg-background dark:text-foreground/80 text-black px-4 opacity-[0.8]"
                )}
              >
                {status === "active" ? "Active" : "Beta"}
              </Badge>
            </div>

            {/* Name */}
            <h3 className="mt-7 text-xl font-medium text-black dark:text-white transition-all duration-500 ease-out">
              {name}
            </h3>

            {/* Description */}
            <p className="text-sm text-foreground/80  dark-hover:text-foreground transition-all duration-500 ease-out">
              {description}
            </p>
          </CardHeader>

          <CardContent>
            {/* Tags */}
            <div className="mb-8 flex flex-wrap gap-1">
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

            {/* Footer stats */}
            <div className="flex items-center justify-between rounded-lg px-4 text-sm py-8 bg-background transition-all duration-500 ease-out border group-hover:bg-background">
              <div className="flex justify-between w-full">
                <span className="text-gray-600 dark:text-foreground/60">Triggers Today:</span>
                <span className="text-foreground font-medium">{triggers}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    </Bounce>
  );
}

/* ---------------------------------------------
   Skeleton that mirrors the GuardrailsCard layout
---------------------------------------------- */
export function GuardrailsCardSkeleton() {
  return (
    <Bounce>
      <div className="block group h-full">
        <Card className="overflow-hidden h-full hover:shadow-xl transition-all duration-500 ease-out bg-background border border-border-color-2 !py-5">
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

          <CardContent>
            {/* Tags skeleton */}
            <div className="mb-8 flex flex-wrap gap-1">
              <Skeleton className="h-6 w-20 rounded-full" />
              <Skeleton className="h-6 w-24 rounded-full" />
              <Skeleton className="h-6 w-16 rounded-full" />
            </div>

            {/* Footer stats skeleton */}
            <div className="flex items-center justify-between rounded-lg px-4 text-sm py-8 bg-sidebar-accent border">
              <div className="flex justify-between w-full">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-5 w-12" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Bounce>
  );
}
