"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { Bin, Editor, Eye, Calendar } from "../../Icons";
import HotEncoding from "./TransformationCard";

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

  const isGrid = view === "grid";
  const isList = view === "list";

  return (
    <>
    <Card
      onClick={() => setIsModalOpen(true)}
      className={cn(
        "cursor-pointer transition-all duration-300 feature-card-hover-container group",
        
        isGrid && " h-full flex flex-col justify-between gap-0 py-5 hover:border-white/20 hover:shadow-md",
        // List view styles
        isList && "w-full rounded-xl hover:shadow-md px-6 py-6 bg-white dark:bg-background"
      )}
    >
      {/* Header Section */}
      <CardHeader className={cn(isGrid && "pb-2")}>
        <div className={cn(
          "flex items-center mb-4",
          isGrid && "justify-between",
          isList && "flex-col items-start w-full"
        )}>
          {/* Icon */}
          <div className={cn(
            "flex items-center justify-center rounded-lg border p-3 group-hover:bg-white group-hover:text-black group-hover:border-white duration-300",
            isGrid && "h-14 w-14 bg-sidebar-accent text-foreground transition-all   ",
            isList && "h-14 w-14 bg-sidebar-accent mb-4"
          )}>
            {Icon && <Icon className={cn(isGrid ? "h-6 w-6" : "h-20 w-20")} />}
          </div>

            <div className={cn(
              "flex items-center gap-1 transition-opacity duration-300",
              "opacity-0 pointer-events-none",
              "group-hover:opacity-100 group-hover:pointer-events-auto",
              `${isList?"absolute top-4 right-6 ":""}`
            )}>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 flex items-center justify-center text-foreground px-1 py-1 hover:bg-white/30 group-hover:text-white transition-colors duration-300"
              >
                <Eye />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 flex items-center justify-center px-1 py-1 text-foreground hover:bg-white/30 group-hover:text-white transition-colors duration-300"
              >
                <Editor />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 flex items-center justify-center px-1 py-1 text-white hover:bg-white/30 group-hover:text-white transition-colors duration-300"
              >
                <Bin />
              </Button>
            </div>
        </div>

        {/* Title */}
        <h3 className={cn(
          "font-medium mb-2  group-hover:text-white transition-colors duration-300",
          isGrid && "text-xl",
          isList && "text-2xl mb-1 group-hover:text-white"
        )}>
          {name}
        </h3>

        {/* Description */}
        <p className={cn(
          "text-muted-foreground group-hover:text-white/90 transition-colors duration-300",
          isGrid && "text-xs line-clamp-2 ",
          isList && "text-sm"
        )}>
          {description}
        </p>
      </CardHeader>

      {/* Content Section */}
      <CardContent className={cn(
        "w-full mx-auto space-y-4 rounded-xl duration-300",
        isGrid && "pt-5"
      )}>
        {/* Tags */}
        <div className={cn(
          "flex flex-wrap gap-1",
          isGrid && "pt-2",
          isList && "mb-4"
        )}>
          {tags.map((tag, index) => (
            <Badge
              key={index}
              variant="secondary"
              className={cn(
                "rounded-full px-3 py-1 text-xs font-light transition-all duration-300 border border-color-2 dark:bg-background group-hover:text-white group-hover:border-white/60 bg-white/10 dark:group-hover:bg-white/10",
              )}
            >
              {tag}
            </Badge>
          ))}
        </div>

        {isList && <div className="border-t border-border-color-2 group-hover:border-white/60" />}

        {/* Code Block */}
        <pre className={cn(
          "w-full whitespace-pre overflow-x-auto rounded-lg text-xs font-mono transition-all duration- dark:bg-background border-border-color-2 border text-foreground/80 group-hover:text-white/80 bg-white/10 dark:group-hover:bg-white/10 group-hover:border-white/60 py-5 px-4",
        )}>
          <code>{previewCode}</code>
        </pre>

        {/* Last Updated */}
        <div className={cn(
          "flex items-center gap-3",
          isGrid && "pl-2",
          isList && "mt-4"
        )}>
          <div className={cn(isGrid ? "w-5 h-5" : "w-4 h-4")}>
            <Calendar className={cn(
               "text-foreground/80 group-hover:text-white transition-colors duration-300",
             "w-4 h-4"
            )} />
          </div>
          <span className={cn(
            "text-xs text-foreground/80 group-hover:text-white/80 transition-colors duration-300",
          )}>
            Updated {lastUpdated}
          </span>
        </div>
      </CardContent>
    </Card>
   
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
