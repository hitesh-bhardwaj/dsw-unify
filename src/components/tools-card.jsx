"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { SynthWave } from "./Icons";
import { Bounce } from "./animations/Animations";

export function ToolsCard({ tools, minSkeletonMs = 500 }) {
  const { name, description, status, tags = [] } = tools || {};

  // Keep a skeleton up for at least `minSkeletonMs`
  const [showSkeleton, setShowSkeleton] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setShowSkeleton(false), minSkeletonMs);
    return () => clearTimeout(t);
  }, [minSkeletonMs]);

  if (showSkeleton) return <ToolsCardSkeleton />;

  return (
    <Bounce>
      <Link href={`/#`} className="block group h-full">
        <Card
          className={cn(
            "overflow-hidden hover:shadow-xl cursor-pointer transition-all duration-500 ease-out",
            "bg-background border border-black/30 group-hover:bg-active-card group-hover:text-white group-hover:border-black !pt-5"
          )}
        >
          <CardHeader>
            <div className="flex items-start justify-between">
              {/* Icon */}
              <div
                className={cn(
                  "flex h-14 w-14 items-center justify-center rounded-lg relative bg-black",
                  "group-hover:bg-background transition-all duration-500 ease-out"
                )}
              >
                <span
                  className={cn(
                    "w-full h-full flex justify-center items-center p-4.5 text-white",
                    "group-hover:text-black transition-all duration-500 ease-out"
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
                {status === "active" ? "Active" : "Beta"}
              </Badge>
            </div>

            {/* Name */}
            <h3 className="mt-7 text-xl font-medium text-black group-hover:text-white transition-all duration-500 ease-out">
              {name}
            </h3>

            {/* Description */}
            <p className="text-sm text-gray-600 group-hover:text-white transition-all duration-500 ease-out">
              {description}
            </p>
          </CardHeader>

          <CardContent>
            {/* Tags */}
            <div className="mb-16 flex flex-wrap gap-1">
              {tags.map((tag, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className={cn(
                    "rounded-full px-3.5 py-1 text-xs font-normal transition-all duration-500 ease-out",
                    tag.color === "yellow" &&
                      "bg-badge-yellow text-foreground group-hover:bg-background group-hover:text-black",
                    tag.color === "blue" &&
                      "bg-badge-blue text-white group-hover:bg-background group-hover:text-black",
                    tag.color === "green" &&
                      "bg-badge-mint text-foreground group-hover:bg-background group-hover:text-black",
                    tag.color === "orange" &&
                      "bg-badge-yellow text-foreground group-hover:bg-background group-hover:text-black",
                    tag.color === "purple" &&
                      "bg-purple-500 text-white group-hover:bg-background group-hover:text-black"
                  )}
                >
                  {tag.label}
                </Badge>
              ))}
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
export function ToolsCardSkeleton() {
  return (
    <Bounce>
      <div className="block group h-full">
        <Card className="overflow-hidden hover:shadow-xl transition-all duration-500 ease-out bg-background border border-black/30 !pt-5">
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
