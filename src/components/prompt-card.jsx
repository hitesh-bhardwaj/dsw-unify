"use client";

import { useEffect, useState } from "react";
import { Star, Copy } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { Bin, Editor, Eye, SynthWave } from "./Icons";

export function PromptCard({ prompt, minSkeletonMs = 500 }) {
  const {
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
  const [showSkeleton, setShowSkeleton] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setShowSkeleton(false), minSkeletonMs);
    return () => clearTimeout(t);
  }, [minSkeletonMs]);

  if (showSkeleton) {
    return <PromptCardSkeleton />;
  }

  return (
    <div className="group w-full h-full">
      <Card
        className={cn(
          "overflow-hidden w-full h-full transition-all hover:shadow-lg duration-500 ease-out py-5",
          "bg-background border border-black/30 group-hover:bg-active-card group-hover:text-white group-hover:border-black"
        )}
      >
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between mb-4">
            {/* Icon, Rating, and Version */}
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  "flex h-14 w-14 items-center justify-center rounded-lg relative bg-black",
                  "group-hover:bg-background duration-500 ease-out"
                )}
              >
                <span
                  className={cn(
                    "w-full h-full flex justify-center items-center p-4.5 text-white",
                    "group-hover:text-black duration-500 ease-out"
                  )}
                >
                  {icon ?? <SynthWave />}
                </span>
              </div>

              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="text-xs">{rating}</span>
                <Badge
                  variant="secondary"
                  className={cn(
                    "px-1.5 py-1 ml-1.5 rounded-sm border border-foreground text-foreground bg-transparent",
                    "group-hover:border-white group-hover:text-white duration-500 ease-out"
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
                  "h-7 w-7 flex items-center justify-center px-1 py-1 text-badge-blue",
                  "hover:bg-stone-700 group-hover:text-white duration-500 ease-out"
                )}
              >
                <Eye />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "h-7 w-7 flex items-center justify-center px-1 py-1 text-foreground",
                  "hover:bg-stone-700 group-hover:text-white duration-500 ease-out"
                )}
              >
                <Copy className="!h-full !w-full" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "h-7 w-7 flex items-center justify-center px-1 py-1 text-primary",
                  "hover:bg-stone-700 group-hover:text-white duration-500 ease-out"
                )}
              >
                <Editor />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "h-7 w-7 flex items-center justify-center px-1 py-1 text-red-600",
                  "hover:bg-stone-700 group-hover:text-white duration-500 ease-out"
                )}
              >
                <Bin />
              </Button>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-xl font-medium mb-2">{name}</h3>

          {/* Description */}
          <p
            className={cn(
              "text-sm mb-4 text-gray-600 group-hover:text-gray-300 transition-all duration-500 ease-out"
            )}
          >
            {description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1">
            {tags.map((tag, index) => (
              <Badge
                key={index}
                variant="secondary"
                className={cn(
                  "rounded-full px-3 py-1 text-xs font-light transition-all duration-500 ease-out",
                  tag.color === "yellow" &&
                    "bg-badge-yellow text-foreground group-hover:bg-background group-hover:text-black",
                  tag.color === "blue" &&
                    "bg-badge-blue text-white group-hover:bg-background group-hover:text-black",
                  tag.color === "green" &&
                    "bg-badge-mint text-foreground group-hover:bg-background group-hover:text-black",
                  tag.color === "orange" &&
                    "bg-transparent border-primary text-primary group-hover:text-white group-hover:border-white",
                  tag.color === "orange" &&
                    isDark &&
                    "bg-transparent border border-white text-white group-hover:bg-background group-hover:text-black"
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
              ? "bg-background"
              : "bg-sidebar-accent border border-black/10",
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
              "rounded-lg p-3 text-xs duration-500 ease-out",
              isDark
                ? "bg-sidebar-accent text-gray-600"
                : "bg-background text-gray-600"
            )}
          >
            {preview}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

/* ---------------------------------------------
   Skeleton that mirrors the PromptCard layout
---------------------------------------------- */
export function PromptCardSkeleton() {
  return (
    <div className="group w-full h-full">
      <Card className="overflow-hidden w-full h-full transition-all duration-500 ease-out py-5 bg-background border border-black/30">
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
