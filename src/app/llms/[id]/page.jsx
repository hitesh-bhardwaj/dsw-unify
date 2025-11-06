"use client";

import { use, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ConfigureIcon } from "@/components/Icons";
import { Badge } from "@/components/ui/badge";
import CountUp from "@/components/animations/CountUp";
import LeftArrowAnim from "@/components/animations/LeftArrowAnim";
import { FadeUp } from "@/components/animations/Animations";
import { RippleButton } from "@/components/ui/ripple-button";
import AnimatedTabsSection from "@/components/common/TabsPane";
import EmptyCard from "@/components/common/EmptyCard";
import LLMConfigurationGrid from "@/components/llm-configuration-grid";
import { Skeleton } from "@/components/ui/skeleton";

export default function LLMsDetailPage({ params }) {
  const { id } = use(params);

  const [showMetricsSkeleton, setShowMetricsSkeleton] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setShowMetricsSkeleton(false), 500);
    return () => clearTimeout(t);
  }, []);

  const items = [
    {
      id: "configuration",
      value: "configuration",
      label: "Configuration",
      name: "Configuration",
      render: () => <LLMConfigurationGrid />,
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
    id: id,
    name: "GPT-4 Turbo",
    description: "OpenAI API Model | Version: 2024-04-09",
    status: "active",
    request: "1,234",
    avgRes: "2.3s",
    upTime: "99.2%",
    cost: "$45.67",
  };

  return (
    <div className="flex flex-col h-full w-full overflow-hidden">
      {/* Header */}
      <div className="bg-background p-6 space-y-6 h-full">
        <FadeUp>
          <div className="flex items-center justify-between mb-10">
            <div className="flex gap-3">
              <LeftArrowAnim link={"/llms"} />
              <div className="space-y-2">
                <div className="w-fit flex gap-2 items-center">
                  <h1 className="text-xl font-medium">{llm.name}</h1>
                  <Badge className="py-1 text-xs font-medium bg-badge-green text-white">
                    Active
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 pl-0.5">
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
        </FadeUp>

        {/* Metrics row with 500ms skeletons */}
        <FadeUp delay={0.02}>
          {showMetricsSkeleton ? (
            <div className="w-full flex gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="w-[25%] h-fit rounded-2xl border border-black/20 flex flex-col justify-center items-center py-8 hover:shadow-xl duration-500 ease-out"
                >
                  <Skeleton className="h-8 w-28 mb-3" />
                  <Skeleton className="h-4 w-40" />
                </div>
              ))}
            </div>
          ) : (
            <div className="w-full flex gap-4">
              <div className="w-[25%] h-fit rounded-2xl border border-black/20 flex flex-col justify-center items-center py-8 hover:shadow-xl duration-500 ease-out countUpContainer">
                <p className="text-3xl font-medium text-green">
                  <CountUp value={llm.request} duration={1.2} startOnView once />
                </p>
                <p className="text-black/60 text-sm ">Total Requests</p>
              </div>
              <div className="w-[25%] h-fit rounded-2xl border border-black/20 flex flex-col justify-center items-center py-8 hover:shadow-xl duration-500 ease-out countUpContainer">
                <p className="text-3xl font-medium text-badge-blue">
                  <CountUp value={llm.avgRes} duration={1.2} startOnView once />
                </p>
                <p className="text-black/60 text-sm">Avg. Response Time</p>
              </div>
              <div className="w-[25%] h-fit rounded-2xl border border-black/20 flex flex-col justify-center items-center py-8 hover:shadow-xl duration-500 ease-out countUpContainer">
                <p className="text-3xl font-medium text-yellow">
                  <CountUp value={llm.upTime} duration={1.2} startOnView once />
                </p>
                <p className="text-black/60 text-sm">Uptime</p>
              </div>
              <div className="w-[25%] h-fit rounded-2xl border border-black/20 flex flex-col justify-center items-center py-8 hover:shadow-xl duration-500 ease-out countUpContainer">
                <p className="text-3xl font-medium text-red">
                  <CountUp value={llm.cost} duration={1.2} startOnView once />
                </p>
                <p className="text-black/60 text-sm">This Month Cost</p>
              </div>
            </div>
          )}
        </FadeUp>

        <FadeUp delay={0.04}>
          <AnimatedTabsSection items={items} defaultValue="configuration" />
        </FadeUp>
      </div>
    </div>
  );
}
