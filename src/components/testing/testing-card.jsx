"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { AiGenerator, RunTestsIcon } from "../Icons";
import { Button } from "../ui/button";
import { Eye } from "lucide-react";
import { RippleButton } from "../ui/ripple-button";
import { Bin } from "../Icons";

// Track which tests have already shown their skeleton
const skeletonShownMap = new Map();

export function TestingCard({ test, minSkeletonMs = 500 }) {
  const {
    id,
    name,
    description,
    tags = [],
    tests,
    agent,
    lastrun,
    variant = "light",
  } = test || {};

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

  if (showSkeleton) return <TestingCardSkeleton />;

  return (
    <div className="">
      <Card
        className={cn(
          "overflow-hidden group hover:shadow-xl cursor-pointer transition-all duration-500 ease-out bg-background border border-border-color-1 hover:bg-sidebar-accent group-hover:bg-active-card dark:group-hover:bg-sidebar-accent group-hover:text-white group-hover:border-border-color-1 !py-5 h-full"
        )}
      >
        <CardHeader>
          <div className="flex items-center w-full justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-2 mt-4">
                {/* Name */}
                <h3 className="text-xl font-medium text-black dark:text-white transition-all duration-500 ease-out">
                  {name}
                </h3>

                {/* Tags */}
                <div className="flex flex-wrap gap-1">
                  {tags.map((tag, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className={cn(
                        "rounded-full border px-3 py-1 bg-white dark:bg-background text-xs font-light transition-all duration-500 ease-out dark:group-hover:bg-background",

                        // Conditional border color
                        tag.color === "green" && "border-badge-green",
                        tag.color === "orange" && "border-primary",
                        tag.color === "red" && "border-red-500"
                      )}
                    >
                      {tag.label}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-foreground/80 transition-all duration-500 ease-out">
                {description}
              </p>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "h-7 w-7 flex items-center bg-sidebar-accent justify-center px-1 py-1 text-foreground/80 hover:bg-white dark:text-foreground dark:hover:text-black"
                )}
              >
                <Eye />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "h-7 w-7 flex items-center bg-sidebar-accent justify-center px-1 py-1 text-red-500 hover:bg-white  dark:text-foreground dark:hover:text-black"
                )}
              >
                <Bin />
              </Button>

              <RippleButton>
                <Button
                  variant="outline"
                  className="gap-2 text-white bg-primary !border-none duration-300 ease-out dark:hover:bg-primary "
                >
                  <div className="!w-4">
                    <RunTestsIcon/>
                  </div>
                  Run Tests
                </Button>
              </RippleButton>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {/* Footer stats */}
          <div className="flex items-center justify-between text-sm py-4 group-hover:text-white">
            <div className="flex items-center gap-1 text-foreground/80">
              <span>{tests}</span>
              <span>tests</span>
            </div>
            <div className="flex items-center text-foreground/80">
              <span>Agent:&nbsp;</span>
              <span>{agent}</span>
            </div>
            <div className="flex items-center text-foreground/80">
              <span>Last run:&nbsp;</span>
              <span>{lastrun}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

/* ---------------------------------------------
   Skeleton that mirrors the TestingCard layout
---------------------------------------------- */
export function TestingCardSkeleton() {
  return (
    <div className="group">
      <Card className="overflow-hidden hover:shadow-xl transition-all duration-500 ease-out bg-background border border-border-color-2 !py-3 !pb-1 !pl-0">
        <CardHeader>
          <div className="flex items-center w-full justify-between">
            <div className="space-y-6 w-full">
              <div className="flex items-center gap-2 mt-4">
                <Skeleton className="h-6 w-44" />
                <div className="flex flex-wrap gap-1">
                  <Skeleton className="h-6 w-16 rounded-full" />
                  <Skeleton className="h-6 w-20 rounded-full" />
                  <Skeleton className="h-6 w-14 rounded-full" />
                </div>
              </div>
              <Skeleton className="h-4 w-11/12" />
            </div>

            <div className="flex items-center gap-2">
              <Skeleton className="h-7 w-7 rounded" />
              <Skeleton className="h-9 w-28 rounded" />
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="flex items-center justify-between text-sm py-4">
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-10" />
              <Skeleton className="h-4 w-10" />
            </div>
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-12" />
              <Skeleton className="h-4 w-20" />
            </div>
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-14" />
              <Skeleton className="h-4 w-24" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
