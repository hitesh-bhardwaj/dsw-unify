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
export function KnowledgeCard({ agent, minSkeletonMs = 500 }) {
  const {
    id,
    name,
    description,
    status,
    size,
    documentsCount,
    variant = "light",
  } = agent || {};

  const isDark = variant === "dark";

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

  if (showSkeleton) return <KnowledgeCardSkeleton />;

  return (
    <Bounce>
      <Link href={`/#`} className="block  h-full">
        <Card
          className={cn(
            "overflow-hidden group hover:shadow-xl cursor-pointer transition-all duration-500 ease-out bg-background border border-border-color-1 hover:bg-sidebar-accent group-hover:bg-active-card dark:group-hover:bg-sidebar-accent group-hover:text-white group-hover:border-border-color-1 !py-5 h-full   ",
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
              <Badge
                className={cn(
                  "rounded-full px-3 py-1 text-xs font-medium",
                  status === "active"
                    ? "bg-badge-green text-white"
                    : "bg-badge-sea-green text-white px-4 opacity-[0.8]"
                )}
              >
                {status === "active" ? "Synced" : "Syncing"}
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
            {/* Footer stats */}
            <div
              className={cn(
                "flex items-center justify-between rounded-lg text-sm py-4 px-6 mt-10 dark:group-hover:bg-background duration-500 ease-out bg-sidebar-accent border-border-color-2 border"
              )}
            >
              <div className="flex flex-col items-start gap-1 font-medium">
                <span className="text-foreground text-lg font-medium">
                  {size}
                </span>
                <span className="text-gray-600 dark:text-foreground/60">Size</span>
              </div>

              <Separator className="rotate-90 !w-12" />

              <div className="flex flex-col items-start gap-1">
                <span className="font-medium text-foreground text-lg">
                  {documentsCount}
                </span>
                <span className="text-gray-600 dark:text-foreground/60 ">Documents</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    </Bounce>
  );
}

/* ---------------------------------------------
   Skeleton that mirrors the KnowledgeCard layout
---------------------------------------------- */
export function KnowledgeCardSkeleton() {
  return (
    <Bounce>
      <div className="block group h-full">
        <Card className="overflow-hidden hover:shadow-xl transition-all duration-500 ease-out bg-background border border-border-color-2 !py-5 h-full">
          <CardHeader>
            <div className="flex items-start justify-between">
              {/* Icon placeholder */}
              <div className="flex h-14 w-14 items-center justify-center rounded-lg relative bg-black/40">
                <Skeleton className="h-full w-full rounded" />
                {/* <span className="w-3 h-3 rounded-full bg-badge-green absolute -top-0.5 -right-0.5 opacity-40" /> */}
              </div>

              {/* Status badge placeholder */}
              <div className="rounded-full  text-xs font-medium bg-gray-200">
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
            {/* Footer stats skeleton */}
            <div className="flex items-center justify-between rounded-lg text-sm py-4 px-6 mt-10 bg-sidebar-accent border">
              <div className="flex flex-col items-start gap-1">
                <Skeleton className="h-5 w-20" />
                <Skeleton className="h-4 w-10" />
              </div>

              <div className="h-8 w-0.5 bg-black/20 mx-4" />

              <div className="flex flex-col items-start gap-1">
                <Skeleton className="h-5 w-24" />
                <Skeleton className="h-4 w-16" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Bounce>
  );
}
