"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { SynthWave } from "./Icons";
import { Separator } from "./ui/separator";
import { Bounce } from "./animations/Animations";

const skeletonShownMap = new Map();

/**
 * Component to display a card for a knowledge base.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.agent - The agent data object containing knowledge base info.
 * @param {string} props.agent.id - The ID of the knowledge base.
 * @param {string} props.agent.name - The name of the knowledge base.
 * @param {string} props.agent.description - The description of the knowledge base.
 * @param {string} props.agent.status - The sync status (e.g., "active").
 * @param {string} props.agent.size - The size of the knowledge base.
 * @param {string|number} props.agent.documentsCount - The number of documents.
 * @param {"light"|"dark"} [props.agent.variant="light"] - The variant of the card.
 * @param {React.ReactNode} props.agent.icon - The icon for the knowledge base.
 * @param {number} [minSkeletonMs=500] - The minimum time to show the skeleton loader.
 * @returns {React.JSX.Element} The rendered KnowledgeCard component.
 */
export function KnowledgeCard({ agent, minSkeletonMs = 500 }) {
  const {
    id,
    name,
    description,
    status,
    size,
    documentsCount,
    variant = "light",
    icon
  } = agent || {};

  const isDark = variant === "dark";

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

  if (showSkeleton) return <KnowledgeCardSkeleton />;

  return (
    <Bounce>
      <Link href={`/agent-studio/knowledge-bases/${id}`} className="block  h-full">
        <Card
          className={cn(
            "feature-card-hover-container overflow-hidden group hover:shadow-md cursor-pointer transition-all duration-300 bg-background border border-border-color-1 hover:border-white/20 !py-5 h-full"
          )}
        >
          <CardHeader>
            <div className="flex items-end gap-3">
              {/* Icon */}
              <div
                className={cn(
                  "flex h-14 w-14 items-center justify-center rounded-lg relative bg-sidebar-accent border border-color-2 text-foreground group-hover:bg-white group-hover:text-black group-hover:border-white transition-all duration-300"
                )}
              >
                <span
                  className={cn(
                    "w-full h-full flex justify-center items-center p-4"
                  )}
                >
                  {icon}
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
                  "rounded-full px-3 py-1 text-xs font-medium bg-white/10 transition-all duration-300 group-hover:text-white group-hover:border-white",
                  status === "active"
                    ? "text-foreground border border-badge-green"
                    : "text-foreground px-4 border border-badge-sea-green"
                )}
              >
                {status === "active" ? "Synced" : "Syncing"}
              </Badge>
            </div>

            {/* Name */}
            <h3 className="mt-7 text-xl font-medium text-foreground group-hover:text-white transition-colors duration-300">
              {name}
            </h3>

            {/* Description */}
            <p className="text-sm text-foreground/80 group-hover:text-white/90 transition-colors duration-300">
              {description}
            </p>
          </CardHeader>

          <CardContent>
            {/* Footer stats */}
            <div
              className={cn(
                "flex items-center justify-between rounded-lg text-sm py-4 px-6 mt-15 bg-white/10 dark:bg-background dark:group-hover:bg-white/10 duration-300 border-border-color-2 border group-hover:border-white/30 transition-all"
              )}
            >
              <div className="flex flex-col items-start gap-1 font-medium">
                <span className="text-foreground text-lg font-medium group-hover:text-white transition-colors duration-300">
                  {size}
                </span>
                <span className="text-gray-600 dark:text-foreground/60 group-hover:text-white/80 transition-colors duration-300">Size</span>
              </div>

              <Separator className="rotate-90 !w-12 group-hover:bg-white/40 transition-colors duration-300" />

              <div className="flex flex-col items-start gap-1">
                <span className="font-medium text-foreground text-lg group-hover:text-white transition-colors duration-300">
                  {documentsCount}
                </span>
                <span className="text-gray-600 dark:text-foreground/60 group-hover:text-white/80 transition-colors duration-300">Documents</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    </Bounce>
  );
}

/* ---------------------------------------------
   Skeleton that mirrors the KnowledgeCard layout
---------------------------------------------- */
/**
 * Skeleton component for KnowledgeCard.
 *
 * @returns {React.JSX.Element} The rendered KnowledgeCardSkeleton component.
 */
export function KnowledgeCardSkeleton() {
  return (
    <Bounce>
      <div className="block group h-full">
        <Card className="overflow-hidden hover:shadow-xl transition-all duration-500 ease-out bg-background border border-border-color-2 !py-5 h-full">
          <CardHeader>
            <div className="flex items-start justify-between">
              {/* Icon placeholder */}
              <div className="flex h-14 w-14 items-center justify-center rounded-lg relative bg-black/40">
                <Skeleton className="h-full w-full rounded" />
                {/* <span className="w-3 h-3 rounded-full bg-badge-green absolute -top-0.5 -right-0.5 opacity-40" /> */}
              </div>

              {/* Status badge placeholder */}
              <div className="rounded-full  text-xs font-medium bg-gray-200">
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
            {/* Footer stats skeleton */}
            <div className="flex items-center justify-between rounded-lg text-sm py-4 px-6 mt-10 bg-sidebar-accent border">
              <div className="flex flex-col items-start gap-1">
                <Skeleton className="h-5 w-20" />
                <Skeleton className="h-4 w-10" />
              </div>

              <div className="h-8 w-0.5 bg-black/20 mx-4" />

              <div className="flex flex-col items-start gap-1">
                <Skeleton className="h-5 w-24" />
                <Skeleton className="h-4 w-16" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Bounce>
  );
}
