"use client";

import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { Bin, Editor, Eye, SynthWave } from "./Icons";
import Link from "next/link";
import CopyButton from "./animate-ui/components/buttons/CopyButton";

const skeletonShownMap = new Map();

/**
 * Component to display a card for a prompt.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.prompt - The prompt data.
 * @param {string} props.prompt.id - The ID of the prompt.
 * @param {string} props.prompt.name - The name of the prompt.
 * @param {string} props.prompt.description - The description of the prompt.
 * @param {React.ReactNode} props.prompt.icon - The icon for the prompt.
 * @param {string|number} props.prompt.rating - The rating of the prompt.
 * @param {string} props.prompt.version - The version of the prompt.
 * @param {Array<{label: string}>} [props.prompt.tags=[]] - The tags associated with the prompt.
 * @param {string|number} props.prompt.uses - The number of uses.
 * @param {string} props.prompt.lastUpdated - The last updated timestamp or text.
 * @param {string} props.prompt.preview - The preview text of the prompt.
 * @param {"light"|"dark"} [props.prompt.variant="light"] - The variant of the card.
 * @param {number} [minSkeletonMs=500] - The minimum time to show the skeleton loader.
 * @returns {React.JSX.Element} The rendered PromptCard component.
 */
export function PromptCard({ prompt,index,view, minSkeletonMs = 500 }) {
  const {
    id,
    name,
    slug,
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

     const isGrid = view === "grid";
  const isList = view === "list";
  
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
    <Link href={`/agent-studio/prompts/${slug}`}>
    <div className="group w-full h-full">
      <Card
        className={cn(
          "feature-card-hover-container overflow-hidden w-full h-full transition-all hover:drop-shadow-xl duration-300 py-5 border-border-color-0 hover:border-transparent bg-background"
        )}
      >
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between mb-4">
            {/* Icon, Rating, and Version */}
            <div className="flex items-center gap-3">
               <div
                className={cn(
                  "flex h-14 w-14 items-center justify-center rounded-lg relative bg-sidebar-accent text-foreground group-hover:!bg-white group-hover:!text-black  transition-all duration-300"
                )}
                 style={{
                color: `var(--icon-color-${(index % 4) + 1})`,
                backgroundColor: `rgb(from var(--icon-color-${(index % 4) + 1}) r g b / 0.1)`
              }}
              >
                <span
                  className={cn(
                    "w-full h-full flex justify-center items-center p-4.5"
                  )}
                >
                  {icon ?? <SynthWave />}
                </span>
              </div>

              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400  transition-colors duration-300" />
                <span className="text-xs text-foreground group-hover:text-white transition-colors duration-300">{rating}</span>
                <Badge
                  variant="secondary"
                  className={cn(
                    "px-1.5 py-1 ml-1.5 rounded-sm border border-foreground text-foreground bg-transparent group-hover:text-white group-hover:border-white transition-all duration-300"
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
                  "h-7 w-7 opacity-0 group-hover:opacity-100 flex items-center justify-center px-1 py-1 text-white hover:bg-white/30 group-hover:text-white transition-colors duration-300"
                )}
              >
                <Eye />
              </Button>
              
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "h-7 w-7 opacity-0 group-hover:opacity-100 flex items-center justify-center px-1 py-1 text-white hover:bg-white/30 group-hover:text-white transition-colors duration-300"
                )}>
                <Editor />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "h-7 w-7 flex opacity-0 group-hover:opacity-100 items-center justify-center px-1 py-1 text-white hover:bg-white/30 group-hover:text-white transition-colors duration-300"
                )}
              >
                <Bin />
              </Button>
            </div>
          </div>

<div className="flex flex-col gap-3 mb-5">
          {/* Title */}
          <h3 className="text-xl text-foreground font-medium mb-2 group-hover:text-white transition-colors duration-300">{name}</h3>

          {/* Description */}
          <p
            className={cn(
              "text-sm mb-5 text-gray-600 dark:text-foreground group-hover:text-white/90 transition-colors duration-300"
            )}
          >
            {description}
          </p>
          </div>

          {/* Tags */}
         <div className=" flex flex-wrap gap-1">
              {tags.map((tag, index) => (
                <Badge
                key={index}
                variant="secondary"
                className={cn(
                  "rounded-full border border-color-2 px-3 py-1 dark:bg-background text-xs font-light transition-all duration-300 group-hover:text-white group-hover:border-white/60 bg-white/10 dark:group-hover:bg-white/10", tag === "+1 more" ? "border-primary" : "border-color-2"
                )}>
                  {tag}
                </Badge>
              ))}
            </div>
        </CardHeader>

        <CardContent
          className={cn(
            isDark ? "bg-background" : "",
            "w-[92%] mx-auto py-5  border border-border-color-2 group-hover:border-white/60 rounded-xl px-4 duration-300", isList && 'w-[97%]'
          )}
        >
          {/* Usage stats */}
          <div className="flex items-center justify-between text-sm mb-3">
            <span className="text-foreground text-xs group-hover:text-white transition-colors duration-300">{uses} uses</span>
            <span className="text-foreground text-xs group-hover:text-white transition-colors duration-300">Updates {lastUpdated}</span>
          </div>

          {/* Preview */}
          <div
            className={cn(
              "rounded-lg p-3 bg-sidebar-accent text-xs border-transparent group-hover:bg-transparent  dark:bg-background dark:group-hover:bg-white/10 text-gray-600 dark:text-white/80 group-hover:text-white/80 border group-hover:border-white/60 transition-all"
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
/**
 * Skeleton component for PromptCard.
 *
 * @returns {React.JSX.Element} The rendered PromptCardSkeleton component.
 */
export function PromptCardSkeleton() {
  return (
    <div className="group w-full h-full">
      <Card className="overflow-hidden w-full h-full transition-all duration-500 ease-out py-5 bg-background border border-border-color-0">
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
