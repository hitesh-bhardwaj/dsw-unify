"use client";

import React, { useEffect, useState } from "react";
import { Card, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Bar, BarChart } from "recharts";
import { cn } from "@/lib/utils";
import AnimatedProgressBar from "../animations/ProgressBar";
import { SynthWave } from "../Icons";

/**
 * Component to display the storage strategy and related analytics.
 *
 * @param {Object} props - The component props.
 * @param {number} [props.minSkeletonMs=500] - The minimum time to show the skeleton loader.
 * @returns {React.JSX.Element} The rendered StorageStrategy component.
 */
const StorageStrategy = ({ minSkeletonMs = 500 }) => {
  const chartData = [
    { month: "January", desktop: 156 },
    { month: "February", desktop: 116 },
    { month: "March", desktop: 130 },
    { month: "April", desktop: 73 },
    { month: "May", desktop: 190 },
    { month: "June", desktop: 114 },
    { month: "January", desktop: 146 },
    { month: "February", desktop: 89 },
  ];

  const chartConfig = {
    desktop: { label: "Desktop", color: "var(--primary)" },
  };

  const [animationId, setAnimationId] = useState(0);
  const [showProgress, setShowProgress] = useState(false);

  // --- Show skeleton only once (global) ---
  const STORAGE_KEY = "LLMConfig:skeletonShown";
  const [mounted, setMounted] = useState(false);
  const [showSkeleton, setShowSkeleton] = useState(true);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const alreadyShown = localStorage.getItem(STORAGE_KEY) === "1";
    if (alreadyShown) {
      setShowSkeleton(false);
      return;
    }

    // First-ever visit: keep skeleton for at least minSkeletonMs, then disable forever
    const t = setTimeout(() => {
      setShowSkeleton(false);
      localStorage.setItem(STORAGE_KEY, "1");
    }, Math.max(0, minSkeletonMs));

    return () => clearTimeout(t);
  }, [mounted, minSkeletonMs]);

  // Kick off chart animations right after skeleton disappears
  useEffect(() => {
    if (showSkeleton) return;
    setShowProgress(false);
    const timer = setTimeout(() => {
      setShowProgress(true);
      setAnimationId((n) => n + 1);
    }, 50);
    return () => clearTimeout(timer);
  }, [showSkeleton]);

  if (!mounted) return null;

  if (showSkeleton) {
    return (
      <div className="w-full h-fit grid grid-cols-2 gap-x-6 items-stretch">
        {/* Left card skeleton */}
        <Card className="overflow-visible bg-background border border-border-color-0 py-7 w-full">
          <div className="space-y-4 px-5">
            <CardHeader className="px-0">
              <Skeleton className="h-6 w-44" />
            </CardHeader>

            <div>
              <Skeleton className="h-4 w-20 mb-2" />
              <Skeleton className="h-11 w-full" />
            </div>

            <div className="space-y-2">
              <div className="w-full flex justify-between items-center">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-10" />
              </div>
              <Skeleton className="h-4 w-full rounded-full" />
            </div>

            <div>
              <Skeleton className="h-4 w-24 mb-2" />
              <Skeleton className="h-11 w-full" />
            </div>

            <div className="space-y-2">
              <Skeleton className="h-4 w-12" />
              <div className="flex gap-2">
                <Skeleton className="h-6 w-28" />
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-6 w-24" />
              </div>
            </div>
          </div>
        </Card>

        {/* Right card skeleton */}
        <Card className="overflow-visible bg-background border border-border-color-0 pt-7 pb-3 w-full">
          <div className="space-y-4 px-5">
            <CardHeader className="px-0">
              <Skeleton className="h-6 w-40" />
            </CardHeader>

            <div className="space-y-4">
              <Skeleton className="h-4 w-36" />
              <div className="w-full h-34 bg-[#F6F6F6] rounded-xl p-6">
                <Skeleton className="h-full w-full" />
              </div>
            </div>

            <div className="space-y-3">
              <Skeleton className="h-4 w-28" />
              <div className="w-full rounded-xl bg-[#f6f6f6] space-y-3 p-4">
                <div className="w-full flex justify-between">
                  <Skeleton className="h-4 w-40" />
                  <Skeleton className="h-4 w-10" />
                </div>
                <div className="w-full flex justify-between">
                  <Skeleton className="h-4 w-40" />
                  <Skeleton className="h-4 w-10" />
                </div>
                <div className="w-full flex justify-between">
                  <Skeleton className="h-4 w-40" />
                  <Skeleton className="h-4 w-10" />
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  // Final UI
  return (
    <>
      <div className="space-y-4">
        <div className="w-full h-fit grid grid-cols-2 gap-x-6 items-stretch">
          <Card
            className={cn(
              "overflow-visible cursor-pointer transition-all bg-white duration-500 ease-out  border border-border-color-0 group-hover:bg-active-card group-hover:text-white group-hover:border-black py-7 w-full "
            )}
          >
            <div className="space-y-6 px-5 pb-10">
              <CardHeader className="px-0">
                <h3 className=" text-xl font-medium text-foreground group-hover:text-white transition-all duration-500 ease-out ">
                  Chunking Configuration
                </h3>
              </CardHeader>

              <div className="space-y-1">
                <p className="text-sm text-foreground dark:text-foreground font-medium">
                  Chunking Strategy
                </p>
                <p className="text-xs">
                  Recursively splits text using multiple separators
                </p>
              </div>

              <div className="space-y-2">
                <div className="w-full flex justify-between">
                  <p className="text-sm font-medium">Chunk Size</p>
                  <p className="text-sm">1000 chars</p>
                </div>
                <div className="w-full h-[4px] bg-sidebar-accent rounded-full flex items-center">
                  <AnimatedProgressBar
                    value={70}
                    duration={0.5}
                    ease="easeInOut"
                    animateOnMount
                    playKey={"storage-strategy"}
                    className="w-full"
                    trackClassName="w-full bg-gray-200 rounded-full h-2 relative overflow-hidden dark:bg-sidebar-accent"
                    barClassName="bg-[#2563FB] h-full absolute top-0 left-0 z-[5] rounded-full"
                  />
                </div>
                <p className="text-xs text-foreground/80">
                  Maximum characters per chunk
                </p>
              </div>
              <div className="space-y-2">
                <div className="w-full flex justify-between">
                  <p className="text-sm font-medium">Chunk Overlap</p>
                  <p className="text-sm">200 chars</p>
                </div>
                <div className="w-full h-[4px] bg-sidebar-accent rounded-full flex items-center">
                  <AnimatedProgressBar
                    value={40}
                    duration={0.5}
                    ease="easeInOut"
                    animateOnMount
                    playKey={"storage-strategy"}
                    className="w-full"
                    trackClassName="w-full bg-gray-200 rounded-full h-2 relative overflow-hidden dark:bg-sidebar-accent"
                    barClassName="bg-[#2563FB] h-full absolute top-0 left-0 z-[5] rounded-full"
                  />
                </div>
                <p className="text-xs text-foreground/80">
                  Overlapping characters between chunks
                </p>
              </div>

              <div className="space-y-2">
                <p>Separators</p>
                <div className="flex gap-2">
                  <Badge className="bg-transparent border border-border-color-0 text-foreground font-normal">
                    \n\n
                  </Badge>
                  <Badge className="bg-transparent border border-border-color-0 text-foreground font-normal">
                    \n
                  </Badge>
                  <Badge className="bg-transparent border border-border-color-0 text-foreground font-normal">
                    EOF
                  </Badge>
                </div>
              </div>
            </div>
          </Card>

          <Card
            className={cn(
              "overflow-visible cursor-pointer transition-all duration-500 ease-out bg-white border border-border-color-0 group-hover:bg-active-card group-hover:text-white group-hover:border-black pt-7 pb-2 w-full"
            )}
          >
            <div className="space-y-4 px-5">
              <CardHeader className="px-0">
                <h3 className=" text-xl font-medium text-foreground group-hover:text-white transition-all duration-500 ease-out ">
                  Embedding Configuration
                </h3>
              </CardHeader>

              <div className="space-y-3">
                <p className="text-sm">Embedding Model</p>
                <div className="!border  border-border-color-0 rounded-lg p-4 bg-white  text-xs flex justify-between items-center dark:bg-card">
                  <div className="flex gap-5">
                    <div className="">
                      <p className="text-sm">text-embedding-3-small</p>
                      <p className="text-foreground/80 mt-2 text-xs ">
                        Optimized for speed and cost efficiency
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="w-full flex items-center justify-between">
                  <p className="text-sm">Embedding Dimensions</p>
                  <p className="text-sm">1536</p>
                </div>

                <div className="!border  border-border-color-0 rounded-lg p-4 bg-white dark:bg-card text-xs flex justify-between items-center">
                  <div className="space-y-2 w-full">
                    <div className="w-full flex justify-between">
                      <p className="text-sm font-medium">Vector size</p>
                      <p className="text-sm">1536 dimensions</p>
                    </div>
                    <div className="w-full h-[4px] bg-sidebar-accent rounded-full flex items-center">
                      <AnimatedProgressBar
                        value={40}
                        duration={0.5}
                        ease="easeInOut"
                        animateOnMount
                        playKey={"storage-strategy"}
                        className="w-full"
                        trackClassName="w-full bg-gray-200 rounded-full h-2 relative overflow-hidden dark:bg-sidebar-accent"
                        barClassName="bg-[#2563FB] h-full absolute top-0 left-0 z-[5] rounded-full"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-sm">Storage Impact</p>
                <div className="!border  border-border-color-0 rounded-lg p-4 bg-white dark:bg-card text-xs space-y-3">
                  <div className="flex items-center justify-between w-full">
                    <p className="text-sm">Estimated vectors:</p>
                    <p className="text-xs ">1,250</p>
                  </div>
                  <div className="flex items-center justify-between w-full">
                    <p className="text-sm">Vector storage:</p>
                    <p className="text-xs ">7.32 MB</p>
                  </div>
                </div>
              </div>
              <div />
            </div>
          </Card>
        </div>
        <div>
          <Card
            className={cn(
              "overflow-visible cursor-pointer transition-all duration-500 ease-out bg-white border border-border-color-0 group-hover:bg-active-card group-hover:text-white group-hover:border-black pt-7 pb-2 w-full"
            )}
          >
            <div className="space-y-4 px-5">
              <CardHeader className="px-0">
                <h3 className=" text-xl font-medium text-foreground group-hover:text-white transition-all duration-500 ease-out ">
                  Performance Characteristics
                </h3>
              </CardHeader>
              <div className="space-y-3 flex gap-3">
                <div className="!border w-full border-border-color-0 rounded-lg p-4 bg-white dark:bg-card text-xs flex justify-between items-center">
                  <div className="space-y-2 max-h-28 w-full py-6 ">
                    <div className="w-full flex justify-between">
                      <p className="text-sm font-medium">Retrieval Speed</p>
                      <p className="text-sm">Fast</p>
                    </div>
                    <div className="w-full h-[4px] bg-sidebar-accent rounded-full flex items-center">
                      <AnimatedProgressBar
                        value={100}
                        duration={0.5}
                        ease="easeInOut"
                        animateOnMount
                        playKey={"storage-strategy"}
                        className="w-full"
                        trackClassName="w-full bg-gray-200 rounded-full h-2 relative overflow-hidden dark:bg-sidebar-accent"
                        barClassName="bg-[#6BC631] h-full absolute top-0 left-0 z-[5] rounded-full"
                      />
                    </div>
                  </div>
                </div>
                <div className="!border w-full max-h-28 border-border-color-0 rounded-lg p-4 bg-white dark:bg-card text-xs flex justify-between items-center">
                  <div className="space-y-2 w-full ">
                    <div className="w-full flex justify-between">
                      <p className="text-sm font-medium">Accuracy</p>
                      <p className="text-sm">High</p>
                    </div>
                    <div className="w-full h-[4px] bg-sidebar-accent rounded-full flex items-center">
                      <AnimatedProgressBar
                        value={100}
                        duration={0.5}
                        ease="easeInOut"
                        animateOnMount
                        playKey={"storage-strategy"}
                        className="w-full"
                        trackClassName="w-full bg-gray-200 rounded-full h-2 relative overflow-hidden dark:bg-sidebar-accent"
                        barClassName="bg-foreground h-full absolute top-0 left-0 z-[5] rounded-full"
                      />
                    </div>
                  </div>
                </div>
                <div className="!border w-full max-h-28 border-border-color-0 rounded-lg p-4 bg-white dark:bg-card text-xs flex justify-between items-center">
                  <div className="space-y-2 w-full">
                    <div className="w-full flex justify-between">
                      <p className="text-sm font-medium">Cost Efficiency</p>
                      <p className="text-sm">Good</p>
                    </div>
                    <div className="w-full h-[4px] bg-sidebar-accent rounded-full flex items-center">
                      <AnimatedProgressBar
                        value={100}
                        duration={0.5}
                        ease="easeInOut"
                        animateOnMount
                        playKey={"storage-strategy"}
                        className="w-full"
                        trackClassName="w-full bg-gray-200 rounded-full h-2 relative overflow-hidden dark:bg-sidebar-accent"
                        barClassName="bg-primary  h-full absolute top-0 left-0 z-[5] rounded-full"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div />
            </div>
          </Card>
        </div>
      </div>
    </>
  );
};

export default StorageStrategy;
