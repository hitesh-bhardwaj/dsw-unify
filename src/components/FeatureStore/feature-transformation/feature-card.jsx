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

/**
 * Component to display a card for a feature transformation.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.feature - The feature data.
 * @param {string} props.feature.id - The ID of the feature.
 * @param {string} props.feature.name - The name of the feature.
 * @param {string} props.feature.description - The description of the feature.
 * @param {React.ReactNode} props.feature.icon - The icon for the feature.
 * @param {Array} props.feature.inputParams - The input parameters for the feature.
 * @param {Array<string>} [props.feature.tags=[]] - The tags associated with the feature.
 * @param {string} props.feature.lastUpdated - The last updated timestamp or text.
 * @param {string} props.feature.codeExamples - The code examples for the feature.
 * @param {"light"|"dark"} [props.feature.variant="light"] - The variant of the card.
 * @param {number} [minSkeletonMs=500] - The minimum time to show the skeleton loader.
 * @returns {React.JSX.Element} The rendered FeatureCard component.
 */
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
            <div className="flex items-center gap-1">
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
                <CopyButton />
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
                  "h-7 w-7 flex items-center justify-center px-1 py-1 text-red-600",
                  "hover:bg-white/30 group-hover:text-white transition-colors duration-300"
                )}
              >
                <Bin />
              </Button>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-xl font-medium mb-2 group-hover:text-white transition-colors duration-300">{name}</h3>

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

          <div className="flex items-center gap-2 pl-2">
            <div className="w-4 h-4">
              <Calendar className="text-foreground/80 group-hover:text-white transition-colors duration-300" />
            </div>
            <span className="text-foreground/80 text-xs group-hover:text-white/80 transition-colors duration-300">
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
