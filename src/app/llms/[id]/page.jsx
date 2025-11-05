"use client";

import { use, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ConfigureIcon } from "@/components/Icons";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Card, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Bar, BarChart } from "recharts";
import CountUp from "@/components/animations/CountUp";
import Tabs from "@/components/common/Tabs";
import LeftArrowAnim from "@/components/animations/LeftArrowAnim";
import { FadeUp } from "@/components/animations/Animations";
import { RippleButton } from "@/components/ui/ripple-button";

export default function LLMsDetailPage({ params }) {
  const { id } = use(params);
  const [tab, setTab] = useState("Configuration");

  const tabs = [
    { id: "Configuration", label: "Configuration" },
    {
      id: "Usage Metric",
      label: "Usage Metric",
    },
    {
      id: "Deployment Logs",
      label: "Deployment Logs",
    },
    {
      id: "API Details",
      label: "API Details",
    },
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

  useEffect(() => {
    if (tab === "Configuration") {
      // Just bump the id; Recharts will replay the animation for shapes with this animationId.
      setAnimationId((id) => id + 1);
    }
  }, [tab]);
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
        <FadeUp delay={0.1}>
          <Tabs tabs={tabs} value={tab} onValueChange={setTab} />
        </FadeUp>
        <div className="flex-1 pt-0 h-auto w-full relative overflow-hidden">
          <div
            className={cn(
              "relative inset-0  pt-0 transition-all h-full",
              tab === "Configuration"
                ? "translate-x-0 opacity-100 duration-500 ease-out"
                : "-translate-x-[40%] opacity-0 pointer-events-none duration-500 ease-out"
            )}
          >
            <FadeUp delay={0.15}>
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
                        className={` h-full bg-primary rounded-full relative duration-700 ease-in-out ${
                          tab == "Configuration" ? "w-[70%] delay-300" : "w-0"
                        }`}
                      />

                      <div className="w-5 h-5 rounded-full bg-background border-3 border-black -ml-1 relative z-[2] " />
                    </div>
                  </div>
                  <div className="">
                    <label className="text-sm  text-[#111111]">
                      Max Tokens
                    </label>
                    <Input
                      readOnly
                      placeholder="4096"
                      className="h-11 border-[#AAAAAA] mt-2"
                    />
                  </div>

                  <div className="space-y-2">
                    <p>Tags</p>
                    <div className="flex gap-2">
                      <Badge
                        className={
                          "bg-transparent border border-black/20 text-foreground font-normal"
                        }
                      >
                        general purpose
                      </Badge>
                      <Badge
                        className={
                          "bg-transparent border border-black/20 text-foreground font-normal"
                        }
                      >
                        api-based
                      </Badge>
                      <Badge
                        className={
                          "bg-transparent border border-black/20 text-foreground font-normal"
                        }
                      >
                        production
                      </Badge>
                    </div>
                  </div>
                </div>
              </Card>
              <Card
                className={cn(
                  "overflow-hidden   cursor-pointer transition-all duration-500 ease-out bg-background border border-black/30 group-hover:bg-active-card group-hover:text-white group-hover:border-black h-full pt-7 pb-3 w-full"
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
                        className={"h-30 w-full px-6 pt-8"}
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
                            className="!rounded-b-0 "
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

            </FadeUp>
          </div>
          <div
            className={cn(
              "absolute inset-0 pt-0 transition-all",
              tab === "Usage Metric"
                ? "translate-x-0 opacity-100 duration-500 ease-out"
                : tab === "Configuration"
                ? "translate-x-[40%] opacity-0 pointer-events-none duration-300 ease-out"
                : "-translate-x-[40%] opacity-0 pointer-events-none duration-300 ease-out"
            )}
          >
            <div className="w-full h-full rounded-xl border border-black/20 flex justify-center items-center">
              <p>No Usage Metric available at this point </p>
            </div>
          </div>
          <div
            className={cn(
              "absolute inset-0  pt-0 transition-all",
              tab === "Deployment Logs"
                ? "translate-x-0 opacity-100 duration-500 ease-out"
                : tab === "Usage Metric" || tab === "Configuration"
                ? "translate-x-[40%] opacity-0 pointer-events-none duration-300 ease-out"
                : "-translate-x-[40%] opacity-0 pointer-events-none duration-300 ease-out"
            )}
          >
            <div className="w-full h-full rounded-xl border border-black/20 flex justify-center items-center">
              <p>No Deployment Logs available at this point </p>
            </div>
          </div>
          <div
            className={cn(
              "absolute inset-0 pt-0 transition-all",
              tab === "API Details"
                ? "translate-x-0 opacity-100 duration-500 ease-out"
                : "translate-x-[40%] opacity-0 pointer-events-none duration-300 ease-out"
            )}
          >
            <div className="w-full h-full rounded-xl border border-black/20 flex justify-center items-center">
              <p>No API Details to show</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
