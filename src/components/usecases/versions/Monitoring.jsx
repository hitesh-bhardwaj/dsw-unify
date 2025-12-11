import React from "react";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Bar, BarChart } from "recharts";
import CountUp from "@/components/animations/CountUp";

const Monitoring = () => {
  const chartData = [
    { month: "January", desktop: 50 },
    { month: "February", desktop: 150 },
    { month: "March", desktop: 90 },
    { month: "April", desktop: 130 },
    { month: "May", desktop: 50 },
    { month: "June", desktop: 80 },
    { month: "January", desktop: 120 },
    { month: "February", desktop: 89 },
    { month: "July", desktop: 116 },
    { month: "August", desktop: 130 },
    { month: "September", desktop: 70 },
    { month: "October", desktop: 130 },
    { month: "April", desktop: 190 },
    { month: "May", desktop: 50 },
  ];

  const chartConfig = {
    desktop: { label: "Desktop", color: "var(--badge-blue)" },
  };

  const metrics = [
    {
      title: "Request Rate",
      value: "94 ops/s",
    },
    {
      title: "Success",
      value: "95.7%",
    },
    {
      title: "Error 4xxx",
      value: "3 ops/s",
    },
    {
      title: "Error 5xxx",
      value: "0 ops/s",
    },
  ];

  const predictionData = [
    { month: "January", desktop: 50 },
    { month: "February", desktop: 150 },
    { month: "March", desktop: 90 },
    { month: "April", desktop: 130 },
    { month: "May", desktop: 50 },
    { month: "June", desktop: 80 },
    { month: "January", desktop: 120 },
    { month: "February", desktop: 89 },
    { month: "July", desktop: 116 },
    { month: "August", desktop: 130 },
    { month: "September", desktop: 70 },
    { month: "October", desktop: 130 },
    { month: "April", desktop: 190 },
    { month: "May", desktop: 50 },
  ];

  return (
    <div className="w-full space-y-5">
      <div className="w-full">
        <h2 className="text-2xl font-medium mb-4">Data Drift Metrics</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Total Features */}
          <div className="border border-border-color-0 rounded-xl p-4 flex flex-col justify-between gap-7">
            <p className="text-sm text-foreground/80 mb-2">No. of features</p>
            <p className="text-4xl font-medium text-badge-green">
              <CountUp value={21} startOnView/>
              </p>
          </div>

          {/* Drifted Features */}
          <div className="border border-border-color-0 rounded-xl p-4 flex flex-col justify-between gap-7">
            <p className="text-sm text-foreground/80 mb-2">
              No. of drifted features
            </p>
            <p className="text-4xl font-medium text-red-500">
              <CountUp value={14} startOnView/>

            </p>
          </div>
        </div>
      </div>

      <div className=" rounded-xl border border-color-1 pt-5 px-2">
        <div className="flex items-center justify-between mb-4 px-2">
          <h3 className="text-xl font-medium">Dataset Drift</h3>
                
          <div className="border border-red-500  text-xs px-3 py-1 rounded-full">
            Drift Detected at 16:34:17
          </div>
        </div>

        <div className="w-[85%] mx-auto h-[200px]  overflow-hidden ">
          <ChartContainer
            config={chartConfig}
            className="h-full w-full px-6 pt-8"
          >
            <BarChart
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
              />
            </BarChart>
          </ChartContainer>
        </div>
      </div>

      <h3 className="text-2xl font-medium mb-4 mt-10">API Metrics</h3>

      <div className="flex gap-4">
        {metrics.map((item, index) => (
          <div
            key={index}
            className="flex flex-col gap-8 border border-border-color-0 rounded-lg py-6 px-4 w-full"
          >
            <span className="text-sm text-foreground/80">{item.title}</span>

            <span className="text-3xl font-medium mt-2">
              <CountUp value={item.value} startOnView/></span>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-color-1 pt-5 px-2">
        <div className="flex items-center justify-between mb-4 px-2">
          <h3 className="text-xl font-medium">Latency</h3>
        </div>

        <div className="w-[85%] mx-auto h-[200px]  overflow-hidden ">
          <ChartContainer
            config={chartConfig}
            className="h-full w-full px-6 pt-8"
          >
            <BarChart
              data={predictionData}
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
              />
            </BarChart>
          </ChartContainer>
        </div>
      </div>
    </div>
  );
};

export default Monitoring;
