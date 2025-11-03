"use client";

import { use, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ConfigureIcon, EditIcon, LeftArrow } from "@/components/Icons";
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

export default function LLMsDetailPage({ params }) {
  const { id } = use(params);
  const [activeTab, setActiveTab] = useState("Configuration");

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

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="bg-white p-6 space-y-6">
        <div className="flex items-center justify-between mb-10">
          <div className="flex gap-3">
            <Link href="/llms" className="w-fit">
              <Button
                variant="ghost"
                size="icon"
                className="shrink-0 w-fit -mt-1"
              >
                <LeftArrow />
              </Button>
            </Link>
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
              <p className="text-sm text-gray-600 pl-0.5">{llm.description}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button className="bg-primary hover:bg-[#E64A19] text-white gap-2">
              <div className="w-5">
                {/* <EditIcon className={"text-white"} /> */}
                <ConfigureIcon />
              </div>
              Configure
            </Button>
          </div>
        </div>
        <div className="w-full flex gap-4">
          <div className="w-[25%] h-fit rounded-2xl border border-black/20 flex flex-col justify-center items-center py-8">
            <p className="text-3xl font-medium text-green">{llm.request}</p>
            <p className="text-black/60">Total Requests</p>
          </div>
          <div className="w-[25%] h-fit rounded-2xl border border-black/20 flex flex-col justify-center items-center py-8">
            <p className="text-3xl font-medium text-badge-blue">{llm.avgRes}</p>
            <p className="text-black/60">Total Requests</p>
          </div>
          <div className="w-[25%] h-fit rounded-2xl border border-black/20 flex flex-col justify-center items-center py-8">
            <p className="text-3xl font-medium text-yellow">{llm.upTime}</p>
            <p className="text-black/60">Total Requests</p>
          </div>
          <div className="w-[25%] h-fit rounded-2xl border border-black/20 flex flex-col justify-center items-center py-8">
            <p className="text-3xl font-medium text-red">{llm.cost}</p>
            <p className="text-black/60">Total Requests</p>
          </div>
        </div>
        <div className="flex gap-4 bg-[#F6F6F6] py-1.5 px-1.5 rounded-lg border border-gray-200">
          <button
            onClick={() => setActiveTab("Configuration")}
            className={cn(
              "flex items-center gap-2 rounded-lg border px-4 py-3 text-sm justify-center transition-colors w-1/2 cursor-pointer",
              activeTab === "Configuration"
                ? "border-[#DCDCDC] bg-white text-[#FF5722] font-medium"
                : "border-transparent text-gray-700 "
            )}
          >
            <span>Configuration</span>
          </button>

          <button
            onClick={() => setActiveTab("Usage Metric")}
            className={cn(
              "flex items-center gap-2 rounded-lg border px-4 py-3 text-sm justify-center transition-colors w-1/2 cursor-pointer",
              activeTab === "Usage Metric"
                ? "border-[#DCDCDC] bg-white text-[#FF5722] font-medium"
                : "border-transparent text-gray-700 "
            )}
          >
            <span>Usage Metric</span>
          </button>
          <button
            onClick={() => setActiveTab("Deployment Logs")}
            className={cn(
              "flex items-center gap-2 rounded-lg border px-4 py-3 text-sm justify-center transition-colors w-1/2 cursor-pointer",
              activeTab === "Deployment Logs"
                ? "border-[#DCDCDC] bg-white text-[#FF5722] font-medium"
                : "border-transparent text-gray-700 "
            )}
          >
            <span>Deployment Logs</span>
          </button>
          <button
            onClick={() => setActiveTab("API Details")}
            className={cn(
              "flex items-center gap-2 rounded-lg border px-4 py-3 text-sm justify-center transition-colors w-1/2 cursor-pointer",
              activeTab === "API Details"
                ? "border-[#DCDCDC] bg-white text-[#FF5722] font-medium"
                : "border-transparent text-gray-700 "
            )}
          >
            <span>API Details</span>
          </button>
        </div>
        <div className="w-full h-fit grid grid-cols-2 gap-x-6 items-stretch">
          <Card
            className={cn(
              "overflow-hidden  hover:shadow-xl cursor-pointer transition-all duration-500 ease-out bg-white border border-black/30 group-hover:bg-active-card group-hover:text-white group-hover:border-black h-full py-7 w-full"
            )}
          >
            <div className="space-y-4 px-5">
              <CardHeader className="px-0">
                <h3 className=" text-xl font-medium text-black group-hover:text-white transition-all duration-500 ease-out ">
                  Model Confugiration
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
                  <p>Temprature</p>
                  <p>0.7</p>
                </div>
                <div className="w-full h-[4px] bg-black/15 rounded-full">
                  <div className="w-[70%] h-full bg-primary rounded-full relative">
                    <div className="w-5 h-5 rounded-full absolute right-0 bg-white border-3 border-black top-1/2 -translate-y-1/2 "></div>
                  </div>
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
              "overflow-hidden  hover:shadow-xl cursor-pointer transition-all duration-500 ease-out bg-white border border-black/30 group-hover:bg-active-card group-hover:text-white group-hover:border-black h-full pt-7 pb-3 w-full"
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
      </div>
    </div>
  );
}
