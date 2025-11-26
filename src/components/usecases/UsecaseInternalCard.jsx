"use client";

import { useEffect, useState } from "react";
import { Copy } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Bin, Editor, Eye, SynthWave, Calendar, FileTimeout, People } from "../Icons";

const skeletonShownMap = new Map();

export default function UsecaseInternalCard({ usecase, slug, minSkeletonMs = 500 }) {
  const {
    id,
    name,
    ModelSlug,
    description,
    icon: Icon,
    tags = [],
    versions,
    features,
    status,
    lastUpdated,
    createdAt,
    variant = "light",
  } = usecase || {};

  const isDark = variant === "dark";
  const [isModalOpen, setIsModalOpen] = useState(false);

  // keep skeleton visible for minSkeletonMs
  const [showSkeleton, setShowSkeleton] = useState(() => {
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

  if (showSkeleton) return <UsecaseInternalCardSkeleton />;

  return (
    <div className="group w-full h-full">
    <Link href={`/ai-studio/use-cases/${slug}/${ModelSlug}/`}>
      <Card
        onClick={() => setIsModalOpen(true)}
        className={cn(
          "h-full transition-all duration-300 hover:bg-sidebar-accent group gap-0 py-5 hover:border-border-color-2 cursor-pointer flex flex-col justify-between"
        )}
      >
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between mb-4">
            {/* Icon */}
            <div className="flex gap-2 items-end">

            <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-sidebar-accent border #DCDCDC text-black transition-all dark:text-white dark:group-hover:text-black group-hover:bg-foreground group-hover:text-background duration-300 p-3">
              {Icon && <Icon className="h-6 w-6" />}
            </div>
            <p className={`text-xs border px-2 py-1 rounded-full ${status==='Deployed'? 'border-badge-green': 'border-red-500'}`}>
                {status}
            </p>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "h-7 w-7 flex items-center justify-center text-foreground px-1 py-1",
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
        </CardHeader>

        <CardContent
          className={cn(
            isDark ? "bg-background" : "bg-white dark:bg-background",
            "w-full mx-auto pt-4 space-y-4 dark:group-hover:bg-sidebar-accent group-hover:bg-sidebar-accent rounded-xl duration-500 ease-out"
          )}
        >
          {/* Tags */}
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

          {/* Versions + Features */}
          <div
            className={cn(
              "flex items-center justify-between rounded-lg p-3 px-5 text-sm py-6  duration-500 bg-white dark:bg-background dark:group-hover:bg-background ease-out group-hover:bg-white border border-border-color-2"
            )}
          >
            <div className="flex items-center gap-2 ">
              <div className="w-4 h-4">
                <Calendar className="text-primary group-hover:text-primary transition-all duration-500 ease-out dark:text-foreground " />
              </div>
              <span className=" text-foreground text-xs">{versions} Versions</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4">
                <People className="text-badge-blue group-hover:text-badge-blue transition-all duration-500 ease-out dark:text-foreground " />
              </div>
              <span className=" text-foreground text-xs">{features} features</span>
            </div>
          </div>

          {/* Last Updated */}
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
    </Link>

    </div>
  );
}

/* ------------------ Skeleton Loader ------------------ */

export function UsecaseInternalCardSkeleton() {
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
