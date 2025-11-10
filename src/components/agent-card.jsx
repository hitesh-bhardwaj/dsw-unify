"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton"; // <— shadcn/ui Skeleton
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Calendar, FileTimeout, SynthWave } from "./Icons";
import { Bounce } from "./animations/Animations";


const skeletonShownMap = new Map();

export function AgentCard({ agent,minSkeletonMs = 500 }) {
  const {
    id,
    name,
    description,
    icon,
    status,
    tags = [],
    lastActivity,
    requestCount,
    variant = "light",
  } = agent;

  const isDark = variant === "dark";

  // Show skeleton for 500ms, then show real data
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

    
  if (showSkeleton) {
    // Skeleton that mirrors the real card's structure
    return (
      <Bounce>
        <div className="block">
          <Card className="overflow-hidden hover:shadow-xl transition-all duration-500 ease-out bg-background border border-border-color-1 py-5">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex h-14 w-14 items-center justify-center rounded-lg relative bg-foreground/40 dark:bg-sidebar-accent">
                  <Skeleton className="h-15 w-15 rounded-lg" />
                  {/* <span className="w-3 h-3 rounded-full bg-badge-green absolute -top-0.5 -right-0.5 opacity-40" /> */}
                </div>
                <div className="rounded-full text-xs font-medium bg-[#DEDEDE] dark:bg-foreground">
                  <Skeleton className="h-6 w-16" />
                </div>
              </div>

              <div className="mt-7 space-y-2">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-5/6" />
              </div>
            </CardHeader>

            <CardContent>
              <div className="mb-20 flex flex-wrap gap-1">
                <Skeleton className="h-6 w-20 rounded-full" />
                <Skeleton className="h-6 w-24 rounded-full" />
                <Skeleton className="h-6 w-16 rounded-full" />
              </div>

              <div className="flex items-center justify-between rounded-lg p-3 text-sm py-6 bg-sidebar-accent border">
                <div className="flex items-center gap-2 font-medium">
                  <Skeleton className="h-4 w-4 rounded" />
                  <Skeleton className="h-4 w-24" />
                </div>
                <div className="flex items-center gap-2">
                  <Skeleton className="h-4 w-4 rounded" />
                  <Skeleton className="h-4 w-20" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </Bounce>
    );
  }

  // Real content after 500ms
  return (
    <Bounce>
      <Link href={`/agents/${id}`} className="block group">
        <Card
          className={cn(
            "overflow-hidden  hover:shadow-xl cursor-pointer transition-all duration-500 ease-out bg-background border border-border-color-1 group-hover:bg-active-card dark:group-hover:bg-sidebar-accent group-hover:text-white group-hover:border-border-color-1 py-5"
          )}
        >
          <CardHeader className="">
            <div className="flex items-start justify-between">
              {/* Icon */}
              <div
                className={cn(
                  "flex h-14 w-14 items-center justify-center rounded-lg relative bg-foreground dark:bg-sidebar-accent dark:group-hover:bg-background group-hover:bg-white transition-all duration-500 ease-out "
                )}
              >
                <span
                  className={cn(
                    "w-full h-full flex justify-center items-center  p-4.5 text-white group-hover:text-black dark:group-hover:text-foreground transition-all duration-500 ease-out "
                  )}
                >
                  {icon ?? <SynthWave />}
                </span>
                <span
                  className={cn(
                    "w-3 h-3 rounded-full bg-badge-green absolute -top-0.5 -right-0.5 animate-pulse",
                    status === "active" ? "" : "hidden"
                  )}
                ></span>
              </div>

              {/* Status badge */}
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
            </div>

            {/* Agent name */}
            <h3 className="mt-7 text-xl font-medium text-foreground group-hover:text-white transition-all duration-500 ease-out ">
              {name}
            </h3>

            {/* Description */}
            <p
              className={cn(
                "text-sm text-gray-600 dark:text-foreground group-hover:text-background dark-hover:text-foreground  transition-all duration-500 ease-out "
              )}
            >
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
                    "rounded-full px-3.5 py-1 text-xs font-normal",
                    tag.color === "yellow" &&
                      "bg-badge-yellow text-foreground group-hover:bg-white group-hover:text-black transition-all duration-500 ease-out ",
                    tag.color === "blue" &&
                      "bg-badge-blue text-white group-hover:bg-white group-hover:text-black transition-all duration-500 ease-out ",
                    tag.color === "green" &&
                      "bg-badge-mint text-foreground group-hover:bg-white group-hover:text-black transition-all duration-500 ease-out ",
                    tag.color === "orange" &&
                      "bg-badge-yellow text-foreground group-hover:bg-white group-hover:text-black transition-all duration-500 ease-out ",
                    tag.color === "purple" &&
                      "bg-purple-500 text-white group-hover:bg-white group-hover:text-black transition-all duration-500 ease-out "
                  )}
                >
                  {tag.label}
                </Badge>
              ))}
            </div>

            {/* Footer stats */}
            <div
              className={cn(
                "flex items-center justify-between rounded-lg p-3 text-sm py-6 dark:group-hover:bg-background duration-500 ease-out",
                isDark ? "bg-background" : "bg-sidebar-accent border"
              )}
            >
              <div className="flex items-center gap-2 font-medium">
                <div className="w-4 h-4">
                  <Calendar className="text-primary group-hover:text-foreground transition-all duration-500 ease-out dark:text-foreground " />
                </div>
                <span className=" text-foreground">{lastActivity}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4">
                  <FileTimeout className="text-badge-blue group-hover:text-foreground transition-all duration-500 ease-out dark:text-foreground " />
                </div>
                <span className="font-medium text-foreground">{requestCount}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    </Bounce>
  );
}
