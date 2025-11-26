"use client";

import { useEffect, useState } from "react";
import { Star, Copy } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { Bin, Editor, Eye, SynthWave } from "./Icons";
import Link from "next/link";

const skeletonShownMap = new Map();
export function PromptCard({ prompt, minSkeletonMs = 500 }) {
  const {
    id,
    name,
    description,
    icon,
    rating,
    version,
    tags = [],
    uses,
    lastUpdated,
    preview,
    variant = "light",
  } = prompt || {};

  const isDark = variant === "dark";

  // keep a skeleton up for at least `minSkeletonMs`
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
    return <PromptCardSkeleton />;
  }

  return (
    <Link href={`/agent-studio/prompts/${id}`}>
    <div className="group w-full h-full">
      <Card
        className={cn(
          "overflow-hidden w-full h-full transition-all hover:shadow-lg duration-500 ease-out py-5 border-border-color-1 group-hover:bg-sidebar-accent dark:group-hover:bg-sidebar-accent group-hover:text-white group-hover:border-border-color-1 bg-background"
        )}
      >
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between mb-4">
            {/* Icon, Rating, and Version */}
            <div className="flex items-center gap-3">
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
                  {icon ?? <SynthWave />}
                </span>
              </div>

              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="text-xs text-black dark:text-white">{rating}</span>
                <Badge
                  variant="secondary"
                  className={cn(
                    "px-1.5 py-1 ml-1.5 rounded-sm border border-foreground text-foreground bg-transparent",
                    "  duration-500 ease-out"
                  )}
                >
                  {version}
                </Badge>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "h-7 w-7 flex items-center justify-center px-1 py-1 hover:bg-white  dark:text-white  group-hover:text-black dark:group-hover:text-white duration-500 ease-out dark:hover:bg-accent"
                )}
              >
                <Eye />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "h-7 w-7 flex items-center justify-center px-1 py-1 text-foreground",
                  "hover:bg-white dark:hover:bg-accent group-hover:text-foreground duration-500 ease-out"
                )}
              >
                <Copy className="!h-full !w-full" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "h-7 w-7 flex items-center justify-center px-1 py-1 text-primary",
                  "hover:bg-white dark:hover:bg-accent group-hover:text-primary duration-500 ease-out"
                )}>
                <Editor />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "h-7 w-7 flex items-center justify-center px-1 py-1 text-red-600",
                  "hover:bg-white dark:hover:bg-accent group-hover:text-red-600 duration-500 ease-out"
                )}
              >
                <Bin />
              </Button>
            </div>
          </div>

<div className="flex flex-col gap-3 mb-5">
          {/* Title */}
          <h3 className="text-xl text-black dark:text-white font-medium mb-2">{name}</h3>

          {/* Description */}
          <p
            className={cn(
              "text-sm mb-5 text-gray-600 dark:text-foreground dark:group-hover:text-foreground  transition-all duration-500 ease-out"
            )}
          >
            {description}
          </p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1">
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
        </CardHeader>

        <CardContent
          className={cn(
            isDark
              ? "bg-white dark:bg-background"
              : "bg-white border-border-color-2 dark:bg-background border dark:group-hover:bg-background",
            "w-[92%] mx-auto py-5 rounded-xl px-4 duration-500 ease-out"
          )}
        >
          {/* Usage stats */}
          <div className="flex items-center justify-between text-sm mb-3">
            <span className="text-foreground">{uses} uses</span>
            <span className="text-foreground">Updates {lastUpdated}</span>
          </div>

          {/* Preview */}
          <div
            className={cn(
              "rounded-lg p-3 text-xs duration-500 ease-out dark:group-hover:bg-sidebar-accent dark:text-white/80",
              isDark
                ? "bg-sidebar-accent text-gray-600"
                : "bg-sidebar-accent text-gray-600"
            )}
          >
            {preview}
          </div>
        </CardContent>
      </Card>
    </div>
    </Link>
  );
}

/* ---------------------------------------------
   Skeleton that mirrors the PromptCard layout
---------------------------------------------- */
export function PromptCardSkeleton() {
  return (
    <div className="group w-full h-full">
      <Card className="overflow-hidden w-full h-full transition-all duration-500 ease-out py-5 bg-background border border-border-color-2">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-black/30">
                <Skeleton className="h-full w-full rounded" />
              </div>
              <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-5 w-10 rounded-sm" />
              </div>
            </div>

            <div className="flex items-center gap-1">
              <Skeleton className="h-7 w-7 rounded" />
              <Skeleton className="h-7 w-7 rounded" />
              <Skeleton className="h-7 w-7 rounded" />
              <Skeleton className="h-7 w-7 rounded" />
            </div>
          </div>

          <Skeleton className="h-6 w-2/3 mb-2" />
          <Skeleton className="h-4 w-11/12 mb-4" />

          <div className="flex flex-wrap gap-1">
            <Skeleton className="h-6 w-16 rounded-full" />
            <Skeleton className="h-6 w-20 rounded-full" />
            <Skeleton className="h-6 w-14 rounded-full" />
          </div>
        </CardHeader>

        <CardContent className="w-[92%] mx-auto py-5 rounded-xl px-4 border border-black/10 bg-sidebar-accent">
          <div className="flex items-center justify-between text-sm mb-3">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-24" />
          </div>
          <div className="rounded-lg p-3">
            <Skeleton className="h-16 w-full rounded" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
