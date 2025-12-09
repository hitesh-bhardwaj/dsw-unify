"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { Bin, Editor, Eye, Calendar } from "../../Icons";
import HotEncoding from "./TransformationCard";
import CopyButton from "@/components/animate-ui/components/buttons/CopyButton";

const skeletonShownMap = new Map();

export function FeatureCard({ feature, view, minSkeletonMs = 500 }) {
  const {
    id,
    name,
    description,
    icon: Icon,
    inputParams,
    tags = [],
    lastUpdated,
    codeExamples,
    variant = "light",
  } = feature || {};

  const isDark = variant === "dark";

  const [isModalOpen, setIsModalOpen] = useState(false);

  // keep a skeleton up for at least `minSkeletonMs`
  const [showSkeleton, setShowSkeleton] = useState(() => {
    // Only show skeleton if it hasn't been shown for this test before
    return !skeletonShownMap.has(id);
  });

  const previewCode = codeExamples?.split("\n")?.slice(0, 3)?.join("\n");

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
    return <FeatureCardSkelton />;
  }

  return (
    <>
      {view === "grid" && (
        <Card
          onClick={() => setIsModalOpen(true)}
          className={cn(
            "feature-card-hover-container h-full flex flex-col justify-between transition-all duration-300 group gap-0 py-5 hover:border-white/20 cursor-pointer hover:shadow-md"
          )}
        >
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between mb-4">
              {/* Icon, Rating, and Version */}
              <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-sidebar-accent border text-foreground transition-all group-hover:bg-white group-hover:text-black group-hover:border-white duration-300 p-3">
                {Icon && <Icon className="h-6 w-6" />}
              </div>

              {/* Action buttons */}
              <div
                className={cn(
                  "flex items-center gap-1 transition-opacity duration-300",
                  "opacity-0 pointer-events-none", // hidden by default
                  "group-hover:opacity-100 group-hover:pointer-events-auto" // visible on hover
                )}
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "h-7 w-7 flex items-center justify-center text-foreground px-1 py-1 ",
                    "hover:bg-white/30 group-hover:text-white transition-colors duration-300"
                  )}
                >
                  <Eye />
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "h-7 w-7 flex items-center justify-center px-1 py-1 text-foreground",
                    "hover:bg-white/30 group-hover:text-white transition-colors duration-300"
                  )}
                >
                  <Editor />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "h-7 w-7 flex items-center justify-center px-1 py-1 text-white",
                    "hover:bg-white/30 group-hover:text-white transition-colors duration-300"
                  )}
                >
                  <Bin />
                </Button>
              </div>
            </div>

            {/* Title */}
            <h3 className="text-xl font-medium mb-2 group-hover:text-white transition-colors duration-300">
              {name}
            </h3>

            {/* Description */}
            <p className="text-xs text-muted-foreground line-clamp-2 group-hover:text-white/90 transition-colors duration-300">
              {description}
            </p>

            {/* Tags */}
          </CardHeader>

          <CardContent
            className={cn(
              isDark ? "bg-background" : "",
              "w-full mx-auto pt-5 space-y-4 rounded-xl duration-300 "
            )}
          >
            <div className="flex flex-wrap gap-1 pt-2">
              {tags.map((tag, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className={cn(
                    "rounded-full border border-color-2 px-3 py-1 dark:bg-background text-xs font-light transition-all duration-300 group-hover:text-white group-hover:border-white/30 bg-white/10 dark:group-hover:bg-white/10"
                  )}
                >
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Formatted Code Block */}
            <pre className="w-full whitespace-pre dark:bg-background border-border-color-2 border overflow-x-auto rounded-lg text-foreground/80 group-hover:text-white/80 bg-white/10 dark:group-hover:bg-white/10 group-hover:border-white/30 py-5 px-4 text-xs font-mono transition-all duration-300">
              <code>{previewCode}</code>
            </pre>

            <div className="flex items-end gap-3 pl-2">
              <div className="w-5 h-5">
                <Calendar className="text-foreground/80 group-hover:text-white transition-colors duration-300" />
              </div>
              <span className="text-foreground/80 text-xs group-hover:text-white/80 transition-colors duration-300">
                {" "}
                Updated {lastUpdated}
              </span>
            </div>
          </CardContent>
        </Card>
      )}

      {view === "list" && (
        <Card
          onClick={() => setIsModalOpen(true)}
          className={cn(
            "w-full cursor-pointer rounded-xl border border-orange-200 hover:shadow-md transition-all duration-300 px-6 py-6",
            "bg-white dark:bg-background"
          )}
        >
          {/* Top Row */}
          <div className="flex items-start justify-between">
            {/* LEFT: Icon + Title + Desc + Tags */}
            <div className="flex flex-col w-full max-w-[75%]">
              {/* Icon */}
              <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-sidebar-accent border p-3 mb-4">
                {Icon && <Icon className="h-20 w-20" />}
              </div>

              {/* Title */}
              <h3 className="text-2xl font-medium text-foreground mb-1">
                {name}
              </h3>

              {/* Description */}
              <p className="text-[15px] text-muted-foreground mb-3">
                {description}
              </p>

              {/* Tags */}
              <div className="flex gap-2 flex-wrap mb-4">
                {tags.map((tag, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="text-xs px-3 py-1 rounded-full bg-gray-100"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* RIGHT: Hover Buttons */}
            <div
              className={cn(
                "flex items-center gap-2 transition-opacity duration-300",
                "opacity-0 pointer-events-none",
                "group-hover:opacity-100 group-hover:pointer-events-auto"
              )}
            >
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Eye className="w-4 h-4" />
              </Button>

              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Editor className="w-4 h-4" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-red-500"
              >
                <Bin className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t  border-border-color-2" />

          {/* Code Block */}
          <pre className="w-full text-foreground bg-sidebar-accent dark:bg-background border border-border-color-2 rounded-lg text-xs p-4 overflow-x-auto">
            <code>{previewCode}</code>
          </pre>

          {/* Footer */}
          <div className="flex items-center gap-2 mt-4 text-xs text-muted-foreground">
            <Calendar className="w-4 h-4" />
            Updated {lastUpdated}
          </div>

          <HotEncoding
            open={isModalOpen}
            onOpenChange={setIsModalOpen}
            feature={feature}
          />
        </Card>
      )}

      <HotEncoding
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        feature={feature}
      />
    </>
  );
}

/**
 * Skeleton component for FeatureCard.
 *
 * @returns {React.JSX.Element} The rendered FeatureCardSkelton component.
 */
export function FeatureCardSkelton() {
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

        <CardContent className="w-[92%] mx-auto pt-5 rounded-xl px-4 border border-black/10 bg-sidebar-accent">
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
