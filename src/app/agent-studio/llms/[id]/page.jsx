"use client";

import { use, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ConfigureIcon } from "@/components/Icons";
import { Badge } from "@/components/ui/badge";
import CountUp from "@/components/animations/CountUp";
import LeftArrowAnim from "@/components/animations/LeftArrowAnim";
import { RippleButton } from "@/components/ui/ripple-button";
import AnimatedTabsSection from "@/components/common/TabsPane";
import EmptyCard from "@/components/common/EmptyCard";
import LLMConfigurationGrid from "@/components/llm-configuration-grid";
import { Skeleton } from "@/components/ui/skeleton";
import { ScaleDown } from "@/components/animations/Animations";

export default function LLMsDetailPage({ params }) {
  const { id } = use(params);

  function slugToTitle(slug) {
  if (!slug) return "";
  
  return slug
    .split("-")                
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))  
    .join(" ");                
}

    const title = slugToTitle(id);

  // show the metrics skeleton only once per LLM id
  const [mounted, setMounted] = useState(false);
  const [showMetricsSkeleton, setShowMetricsSkeleton] = useState(true);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const STORAGE_KEY = `LLMsDetail:metricsSkeletonShown:${id ?? "global"}`;
    const alreadyShown = localStorage.getItem(STORAGE_KEY) === "1";

    if (alreadyShown) {
      setShowMetricsSkeleton(false);
      return;
    }
    const t = setTimeout(() => {
      setShowMetricsSkeleton(false);
      localStorage.setItem(STORAGE_KEY, "1");
    }, 500);

    return () => clearTimeout(t);
  }, [mounted, id]);

  const items = [
    {
      id: "configuration",
      value: "configuration",
      label: "Configuration",
      name: "Configuration",
      render: () => <LLMConfigurationGrid id={`configuration:${id}`} />,
    },
    {
      id: "usage-metric",
      value: "usage-metric",
      label: "Usage Metric",
      name: "Usage Metric",
      render: () => (
        <EmptyCard children={"Usage Metric configuration coming soon..."} />
      ),
    },
    {
      id: "deployment-logs",
      value: "deployment-logs",
      label: "Deployment Logs",
      name: "Deployment Logs",
      render: () => (
        <EmptyCard children={"Deployments Logs configuration coming soon..."} />
      ),
    },
    {
      id: "api-details",
      value: "api-details",
      label: "API Details",
      name: "API Details",
      render: () => (
        <EmptyCard children={"API Details configuration coming soon..."} />
      ),
    },
  ];

  // Mock data
  const llm = {
    id,
    name: "GPT-4 Turbo",
    description: "OpenAI API Model | Version: 2024-04-09",
    status: "active",
    request: "1,234",
    avgRes: "2.3s",
    upTime: "99.2%",
    cost: "$45.67",
  };

  if (!mounted) return null;

  return (
    <div className="flex flex-col h-full w-full overflow-hidden">
      {/* Header */}
      <ScaleDown>
        <div className="bg-background p-6 space-y-6 h-full">
          <div className="flex items-center justify-between mb-10">
            <div className="flex gap-3">
              <LeftArrowAnim link={"/agent-studio/llms"} />
              <div className="space-y-2">
                <div className="w-fit flex gap-2 items-center">
                  <h1 className="text-xl font-medium">{title}</h1>
                  <Badge className="py-1 text-xs font-medium bg-transparent text-foreground border border-badge-green">
                    Active
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 pl-0.5 dark:text-foreground">
                  {llm.description}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <RippleButton>
                <Button className="bg-primary hover:bg-[#E64A19] text-white gap-2">
                  <div className="w-5">
                    <ConfigureIcon />
                  </div>
                  Configure
                </Button>
              </RippleButton>
            </div>
          </div>

          {/* Metrics row – skeleton only once per id */}
          {showMetricsSkeleton ? (
            <div className="w-full flex gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="w-[25%] h-fit rounded-2xl border border-border-color-0 flex flex-col justify-center items-center py-8 hover:shadow-xl duration-500 ease-out"
                >
                  <Skeleton className="h-8 w-28 mb-3" />
                  <Skeleton className="h-4 w-40" />
                </div>
              ))}
            </div>
          ) : (
            <div className="w-full flex gap-4">
              <div className="w-[25%] h-fit rounded-2xl border border-border-color-0 flex flex-col items-start py-4 gap-10 px-5 hover:shadow-xl duration-500 ease-out countUpContainer">
                <p className="text-foreground/60 text-sm ">Total Requests</p>
                <p className="text-3xl font-medium dark:text-foreground text-foreground">
                  <CountUp value={llm.request} duration={1.2} startOnView once />
                </p>
                
              </div>
              <div className="w-[25%] h-fit rounded-2xl border border-border-color-0 flex flex-col items-start py-4 gap-10 px-5 hover:shadow-xl duration-500 ease-out countUpContainer">
                <p className="text-foreground/60 text-sm">Avg. Response Time</p>
                <p className="text-3xl font-medium dark:text-foreground text-foreground">
                  <CountUp value={llm.avgRes} duration={1.2} startOnView once />
                </p>
                
              </div>
              <div className="w-[25%] h-fit rounded-2xl border border-border-color-0 flex flex-col items-start py-4 gap-10 px-5 hover:shadow-xl duration-500 ease-out countUpContainer">
                <p className="text-foreground/60 text-sm">Uptime</p>
                <p className="text-3xl font-medium dark:text-foreground text-foreground">
                  <CountUp value={llm.upTime} duration={1.2} startOnView once />
                </p>
              </div>
              <div className="w-[25%] h-fit rounded-2xl border border-border-color-0 flex flex-col items-start py-4 gap-10 px-5 hover:shadow-xl duration-500 ease-out countUpContainer">
                <p className="text-foreground/60 text-sm">This Month Cost</p>

                <p className="text-3xl font-medium dark:text-foreground text-foreground">
                  <CountUp value={llm.cost} duration={1.2} startOnView once />
                </p>
              </div>
            </div>
          )}

          <AnimatedTabsSection items={items} defaultValue="configuration" />
        </div>
      </ScaleDown>
    </div>
  );
}
