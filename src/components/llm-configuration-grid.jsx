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

const skeletonShownMap = new Map();
const LLMConfigurationGrid = ({id, minSkeletonMs = 500}) => {
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
    desktop: {
      label: "Desktop",
      color: "var(--primary)",
    },
  };

  const [animationId, setAnimationId] = useState(0);
  const [showProgress, setShowProgress] = useState(false);
  // const [isLoading, setIsLoading] = useState(true)

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

  // Kick off your original animations right after skeleton disappears
  useEffect(() => {
    if (showSkeleton) return;
    setShowProgress(false);
    const timer = setTimeout(() => {
      setShowProgress(true);
      setAnimationId((id) => id + 1);
    }, 50);
    return () => clearTimeout(timer);
  }, [showSkeleton]);

  if (showSkeleton) {
    // Skeleton view (approximate structure of final UI)
    return (
      <div className="w-full h-fit grid grid-cols-2 gap-x-6 items-stretch">
        {/* Left card skeleton */}
        <Card className="overflow-hidden bg-background border border-black/30 h-full py-7 w-full">
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
        <Card className="overflow-hidden bg-background border border-black/30 h-full pt-7 pb-3 w-full">
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

  // Final (original) UI
  return (
    <>
      <div className="w-full h-fit grid grid-cols-2 gap-x-6 items-stretch">
        <Card
          className={cn(
            "overflow-hidden cursor-pointer transition-all duration-500 ease-out bg-background border border-black/30 group-hover:bg-active-card group-hover:text-white group-hover:border-black h-full py-7 w-full "
          )}
        >
          <div className="space-y-4 px-5">
            <CardHeader className="px-0">
              <h3 className=" text-xl font-medium text-black group-hover:text-white transition-all duration-500 ease-out ">
                Model Configuration
              </h3>
            </CardHeader>

            <div className="">
              <label className="text-sm  text-[#111111]">API key</label>
              <Input
                readOnly
                placeholder="123456789"
                className="h-11 border-[#AAAAAA] mt-2"
              />
            </div>

            <div className="space-y-2">
              <div className="w-full flex justify-between">
                <p>Temperature</p>
                <p>0.7</p>
              </div>
              <div className="w-full h-[4px] bg-black/15 rounded-full flex items-center">
                <div
                  className={`h-full bg-primary rounded-full relative duration-700 ease-in-out ${
                    showProgress ? "w-[70%]" : "w-0"
                  } delay-300`}
                />
                <div className="w-5 h-5 rounded-full bg-background border-3 border-black -ml-1 relative z-[2]" />
              </div>
            </div>

            <div className="">
              <label className="text-sm  text-[#111111]">Max Tokens</label>
              <Input
                readOnly
                placeholder="4096"
                className="h-11 border-[#AAAAAA] mt-2"
              />
            </div>

            <div className="space-y-2">
              <p>Tags</p>
              <div className="flex gap-2">
                <Badge className="bg-transparent border border-black/20 text-foreground font-normal">
                  general purpose
                </Badge>
                <Badge className="bg-transparent border border-black/20 text-foreground font-normal">
                  api-based
                </Badge>
                <Badge className="bg-transparent border border-black/20 text-foreground font-normal">
                  production
                </Badge>
              </div>
            </div>
          </div>
        </Card>

        <Card
          className={cn(
            "overflow-hidden cursor-pointer transition-all duration-500 ease-out bg-background border border-black/30 group-hover:bg-active-card group-hover:text-white group-hover:border-black h-full pt-7 pb-2 w-full"
          )}
        >
          <div className="space-y-4 px-5">
            <CardHeader className="px-0">
              <h3 className=" text-xl font-medium text-black group-hover:text-white transition-all duration-500 ease-out ">
                Usage Analytics
              </h3>
            </CardHeader>

            <div className="space-y-3">
              <p className="text-sm">Request Over Time</p>

              <div className="w-full h-fit bg-[#F6F6F6] rounded-xl overflow-hidden">
                <ChartContainer
                  config={chartConfig}
                  className="h-30 w-full px-6 pt-8"
                >
                  <BarChart
                    key={animationId}
                    accessibilityLayer
                    data={chartData}
                    margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
                  >
                    <ChartTooltip
                      cursor={false}
                      content={<ChartTooltipContent hideLabel />}
                    />
                    <Bar
                      dataKey="desktop"
                      fill="var(--color-desktop)"
                      radius={[5, 5, 0, 0]}
                      barSize={30}
                      animationBegin={0}
                      animationDuration={600}
                      animationEasing="ease-out"
                      animationId={animationId}
                      className="!rounded-b-0"
                    />
                  </BarChart>
                </ChartContainer>
              </div>
            </div>

            <div className="space-y-3">
              <p>Top Application</p>
              <div className="w-full h-fit rounded-xl bg-[#f6f6f6] space-y-2 p-4 text-sm">
                <div className="w-full flex justify-between">
                  <p>Customer Support Agent</p>
                  <p>45%</p>
                </div>
                <div className="w-full flex justify-between">
                  <p>Content Generation</p>
                  <p>45%</p>
                </div>
                <div className="w-full flex justify-between">
                  <p>Data Analysis</p>
                  <p>45%</p>
                </div>
              </div>
            </div>

            <div></div>
          </div>
        </Card>
      </div>
    </>
  );
};

export default LLMConfigurationGrid;
