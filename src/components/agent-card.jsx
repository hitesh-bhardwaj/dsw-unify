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
      <Link href={`/agent-studio/agents/${id}`} className="block">
          <Card
          className={cn(
            "overflow-hidden hover:bg-sidebar-accent group  hover:shadow-xl cursor-pointer transition-all duration-500 ease-out bg-background border border-border-color-1 dark:hover:bg-sidebar-accent hover:text-white hover:border-border-color-1 py-5"
          )}
        >
          <CardHeader className="">
            <div className="flex items-start justify-between">
              {/* Icon */}
              <div
                className={cn(
                  "flex h-14 w-14 items-center justify-center rounded-lg relative bg-sidebar-accent border border-color-2 dark:bg-background group-hover:bg-black transition-all dark:group-hover:bg-white duration-500 ease-out "
                )}
              >
                <span
                  className={cn(
                    "w-full h-full flex justify-center items-center dark:group-hover:text-black p-4 text-black dark:text-white group-hover:text-white transition-all duration-500 ease-out "
                  )}
                >
                  {icon}
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
            <h3 className="mt-7 text-xl font-medium text-foreground  transition-all duration-500 ease-out ">
              {name}
            </h3>

            {/* Description */}
            <p
              className={cn(
                "text-sm text-gray-600 dark:text-foreground  dark-hover:text-foreground  transition-all duration-500 ease-out "
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
                  "rounded-full border border-color-2 px-3 py-1 bg-white dark:bg-background text-xs font-light transition-all duration-500 ease-out dark:group-hover:bg-background"
                )}>
                  {tag.label}
                </Badge>
              ))}
            </div>

            {/* Footer stats */}
            <div
              className={cn(
                "flex items-center justify-between border border-color-2 rounded-lg p-3 text-sm py-6 dark:group-hover:bg-background duration-500 ease-out",
                isDark ? "bg-background" : "bg-background  border border-color-2"
              )}
            >
              <div className="flex items-center gap-2 font-medium">
                <div className="w-4 h-4">
                  <Calendar className="text-primary transition-all duration-500 ease-out dark:text-foreground " />
                </div>
                <span className=" text-foreground">{lastActivity}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4">
                  <FileTimeout className="text-badge-blue  transition-all duration-500 ease-out dark:text-foreground " />
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
