"use client";

import { use} from "react";
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

export default function LLMsDetailPage({ params }) {
  const { id } = use(params);
   const items = [
    {
      id: "configuration",
      value: "configuration",
      label: "Configuration",
      name: "Configuration",
      render: () =>
           <LLMConfigurationGrid/>
         
    },
    {
      id: "usage-metric",
      value: "usage-metric",
      label: "Usage Metric",
      name: "Usage Metric",
     render: () =>
          <EmptyCard children={"Usage Metric configuration coming soon..."}/>
    },
    {
      id: "deployment-logs",
      value: "deployment-logs",
      label: "Deployment Logs",
      name: "Deployment Logs",
     render: () =>
          <EmptyCard children={"Deployments Logs configuration coming soon..."}/>
    },
    {
      id: "api-details",
      value: "api-details",
      label: "API Details",
      name: "API Details",
     render: () =>
          <EmptyCard children={"API Details configuration coming soon..."}/>
    }
  ];

  // Mock data - in real app, fetch based on id
  const llm = {
    id: id,
    name: "GPT-4 Turbo",
    description: "OpenAI API Model | Version: 2024-04-09",
    status: "active",
    request: "1,234",
    avgRes: "2.3s",
    upTime: "99.2%",
    cost: "$45.67",
  };
  
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="bg-background p-6 space-y-6 h-full">
        <FadeUp>
          <div className="flex items-center justify-between mb-10">
            <div className="flex gap-3">
              <LeftArrowAnim link={"/llms"} />
              <div className="space-y-2">
                <div className="w-fit flex gap-2">
                  <h1 className="text-xl font-medium">{llm.name}</h1>
                  {
                    (llm.status = "active" && (
                      <Badge
                        className={
                          " py-1 text-xs font-medium bg-badge-green text-white"
                        }
                      >
                        Active
                      </Badge>
                    ))
                  }
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
        <FadeUp delay={0.05}>
          <div className="w-full flex gap-4">
            <div className="w-[25%] h-fit rounded-2xl border border-black/20 flex flex-col justify-center items-center py-8 hover:shadow-xl duration-500 ease-out">
              <p className="text-3xl font-medium text-green">
                <CountUp value={llm.request} duration={1.2} startOnView once />
              </p>
              <p className="text-black/60">Total Requests</p>
            </div>
            <div className="w-[25%] h-fit rounded-2xl border border-black/20 flex flex-col justify-center items-center py-8 hover:shadow-xl duration-500 ease-out">
              <p className="text-3xl font-medium text-badge-blue">
                <CountUp value={llm.avgRes} duration={1.2} startOnView once />
              </p>
              <p className="text-black/60">Avg. Response Time</p>
            </div>
            <div className="w-[25%] h-fit rounded-2xl border border-black/20 flex flex-col justify-center items-center py-8 hover:shadow-xl duration-500 ease-out">
              <p className="text-3xl font-medium text-yellow">
                <CountUp value={llm.upTime} duration={1.2} startOnView once />
              </p>
              <p className="text-black/60">Uptime</p>
            </div>
            <div className="w-[25%] h-fit rounded-2xl border border-black/20 flex flex-col justify-center items-center py-8 hover:shadow-xl duration-500 ease-out">
              <p className="text-3xl font-medium text-red">
                <CountUp value={llm.cost} duration={1.2} startOnView once />
              </p>
              <p className="text-black/60">This Month Cost</p>
            </div>
          </div>

        </FadeUp>
         <FadeUp delay={0.05}>
                      <AnimatedTabsSection
                       items={items}
                          // ctx={ctx}
                          defaultValue="configuration"/>
                          </FadeUp>
      </div>
    </div>
  );
}
