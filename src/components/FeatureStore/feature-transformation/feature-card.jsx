"use client";

import { useEffect, useState } from "react";
import { Star, Copy } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { Bin, Editor, Eye, Calendar } from "../../Icons";
import HotEncoding from "./TransformationCard";

const skeletonShownMap = new Map();
export function FeatureCard({ feature, minSkeletonMs = 500 }) {
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

  const previewCode = codeExamples
  ?.split("\n")
  ?.slice(0, 3)
  ?.join("\n");


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

      <Card
      onClick={() => setIsModalOpen(true)}
        className={cn(
          "h-full flex flex-col justify-between transition-all duration-300 hover:bg-sidebar-accent group gap-0 py-5 hover:border-border-color-2 cursor-pointer "
        )}
      >
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between mb-4">
            {/* Icon, Rating, and Version */}
            <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-sidebar-accent border #DCDCDC text-black transition-all dark:text-white dark:group-hover:text-black group-hover:bg-foreground group-hover:text-background duration-300 p-3">
              {Icon && <Icon className="h-6 w-6" />}
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "h-7 w-7 flex items-center justify-center text-foreground px-1 py-1 ",
                  "hover:bg-white dark:hover:bg-accent group-hover:text-foreground duration-500 ease-out"
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
                )}
              >
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

          {/* Title */}
          <h3 className="text-xl font-medium mb-2">{name}</h3>

          {/* Description */}
          <p className="text-xs text-muted-foreground line-clamp-2">
            {description}
          </p>

          {/* Tags */}
        </CardHeader>

        <CardContent
          className={cn(
            isDark ? "bg-background" : "bg-white dark:bg-background dark:group-hover:bg-sidebar-accent ",
            "w-full mx-auto pt-5 space-y-4 group-hover:bg-sidebar-accent rounded-xl duration-300 "
          )}
        >
          <div className="flex flex-wrap gap-1 pt-2">
            {tags.map((tag, index) => (
              <Badge
                key={index}
                variant="secondary"
                className={cn(
                  "rounded-full border border-color-2 px-3 py-1 bg-white dark:bg-background text-xs font-light transition-all duration-500 ease-out dark:group-hover:bg-background"
                )}
              >
                {tag}
              </Badge>
            ))}
          </div>

          {/* Formatted Code Block */}
          <pre className="w-full whitespace-pre bg-white dark:bg-background border-border-color-2 border dark:group-hover:bg-background overflow-x-auto rounded-lg  text-foreground/80  py-5 px-4 text-xs font-mono ">
            <code>{previewCode}</code>
          </pre>

          <div className="flex items-center gap-2  pl-2">
            <div className="w-4 h-4">
              <Calendar className="text-foreground/80 group-hover:text-foreground transition-all duration-500 ease-out  " />
            </div>
            <span className=" text-foreground/80 text-xs ">
              {" "}
              Updated {lastUpdated}
            </span>
          </div>
        </CardContent>
      </Card>
      <HotEncoding open={isModalOpen} onOpenChange={setIsModalOpen} feature={feature} />
      
    </>
  );
}

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
