import React, { useEffect, useState } from "react";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Bar, BarChart } from "recharts";
import CountUp from "../animations/CountUp";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { CustomBarChart } from "../common/Graphs/graphs";
import { Badge } from "../ui/badge";

const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
const MonitoringView = () => {
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

  const [driftedFeatures, setdriftedFeatures] = useState(156);
    const [postInference, setPostInference] = useState(43);
    const [avgLatency, setAvgLatency] = useState(0.112);
  
    // Update KPIs every 3s (same cadence as chart)
    useEffect(() => {
      const id = setInterval(() => {
        setdriftedFeatures((prev) =>
          clamp(prev + (Math.floor(Math.random() * 40) - 20), 50, 300)
        );
        setPostInference((prev) =>
          clamp(prev + (Math.floor(Math.random() * 20) - 10), 20, 150)
        );
        setAvgLatency((prev) =>
          clamp(prev + (Math.random() * 0.02 - 0.01), 0.08, 0.2)
        );
      }, 3000);
  
      return () => clearInterval(id);
    }, []);

  return (
    <div className="w-full space-y-5">
      <div className="w-full py-3">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-medium mb-2">
            Data Drift Metrics
          </h1>
         
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="!pb-0 !py-7">
            <CardContent className="!space-y-5">
              <div className="text-sm font-medium">No. of features</div>
              <div className="text-4xl font-bold text-badge-green">
                21
              </div>
            </CardContent>
          </Card>

          <Card className="!pb-0 !py-7">
            <CardContent className="!space-y-5">
              <div className="text-sm font-medium">No. of drifted features</div>
              <div className="text-4xl font-bold text-red">{driftedFeatures}</div>
             
            </CardContent>
          </Card>

        </div>

        <Card className="">
          <CardHeader className="flex items-center justify-between">
            <CardTitle className="text-xl font-medium">Dataset Drift</CardTitle>
            <Badge variant="outline" className="py-1 px-4 text-sm border-red fonr-medium">
  Drift detected at{" "}
  {new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  })}
</Badge>
          </CardHeader>

          <CardContent className="pt-4  flex items-center justify-center">
            <CustomBarChart
              live={true}
              timeKey="timeLabel"
              bars={[
                {
                  dataKey: "driftedFeatures",
                  name: "Drifted Features",
                  color: "#FF050A",
                }
              ]}
              height={300}
              width="90%"
              barCategoryGap="30%"
              barGap={6}
              showLegend={false}
              radius={[3,3,0,0]}
              barSize={45}
              yAxisFormatter={(v) => Number(v).toFixed(0)}
              tooltipFormatter={(v, name) => [Number(v).toFixed(0), name]}
              makePoint={(now) => {
                const driftedFeatures = clamp(
                  Math.round(220 + (Math.random() * 2 - 1) * 120),
                  50,
                  400
                );
                return {
                  time: now.getTime(),
                  timeLabel: now.toLocaleTimeString([], {
                    hour:"2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                  }),
                  driftedFeatures,
                 
                };
              }}
              maxPoints={8}
              updateMs={3000}
            />
          </CardContent>
        </Card>
      </div>
    </div>









      <h3 className="text-2xl font-medium mb-4">API Metrics</h3>

      <div className="flex gap-4">
        {metrics.map((item, index) => (
          <div
            key={index}
            className="flex flex-col gap-6 border border-border-color-0 rounded-lg py-6 px-4 w-full"
          >
            <span className="text-sm text-foreground/80">{item.title}</span>

            <span className="text-3xl font-medium mt-2">
              <CountUp value={item.value} startOnView/></span>
          </div>
        ))}
      </div>

      <div className=" rounded-xl border border-color-1 pt-5 px-2">
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

export default MonitoringView;
