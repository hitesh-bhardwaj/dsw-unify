"use client";
import React, { useEffect, useState } from "react";
import { Bar, BarChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { month: "January", desktop: 156 },
  { month: "February", desktop: 116 },
  { month: "March", desktop: 130 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 190 },
  { month: "June", desktop: 114 },
  { month: "January", desktop: 146 },
  { month: "February", desktop: 89 },
  { month: "March", desktop: 107 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 95 },
  { month: "June", desktop: 34 },
  { month: "May", desktop: 129 },
  { month: "June", desktop: 84 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--primary)",
  },
};

const TestingGraph = ({tab}) => {
  console.log(tab)
    const [animationId, setAnimationId] = useState(0);
   useEffect(() => {
      if (tab === "analytics") {
        // Just bump the id; Recharts will replay the animation for shapes with this animationId.
        setAnimationId((id) => id + 1);
      }
    }, [tab]);
  return (
    <>
      <Card className={"!pb-0 bg-sidebar-accent"}>
        <CardHeader>
          <CardTitle>Test Performance Over Time</CardTitle>
          <CardDescription>
            Success rates and response times for the last 30 days
          </CardDescription>
        </CardHeader>
        <CardContent className="px-30 h-[32vh] ">
          <ChartContainer config={chartConfig} className={"!h-full !w-full"}>
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
                radius={[3, 3, 0, 0]}
                barSize={30}
                animationId={animationId}
                animationBegin={0} // delay in ms before starting
                animationDuration={800}
                animationEasing="ease-out"
                className="!rounded-b-0 "
              />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </>
  );
};

export default TestingGraph;
