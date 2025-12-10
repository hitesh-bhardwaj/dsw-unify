"use client";

import { Card, CardContent } from "@/components/ui/card";
import { ArrowUp, TrendingUp } from "lucide-react";
import { Area, AreaChart } from "recharts";
import { cn } from "@/lib/utils";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import CountUp from "../animations/CountUp";

/**
 * Component to display a metric card with a label, value, change percentage, and trend chart.
 *
 * @param {Object} props - The component props.
 * @param {string} props.label - The label for the metric.
 * @param {string|number} props.value - The value of the metric.
 * @param {number} props.change - The percentage change.
 * @param {Array<number>} props.trend - The trend data points for the chart.
 * @param {string} [props.className] - Additional class names.
 * @param {string} [props.color] - Optional custom color for the chart.
 * @returns {React.JSX.Element} The rendered MetricCard component.
 */
export function MetricCard({
  label,
  value,
  change,
  trend,
  className,
  color, // <-- optional custom color prop, e.g. "#6366f1" or "rgb(34,197,94)"
}) {
  // Prepare data for the chart (based on the MetricCard's `trend` prop)
  const chartData = trend.map((v, index) => ({
    index,
    value: v,
  }));

  const isPositive = change >= 0;

  // If no custom color is provided, pick based on positive/negative
  const chartColor =
    "#6bc631" || (isPositive ? "rgb(34, 197, 94)" : "rgb(239, 68, 68)");

  // Chart config for ChartContainer (not strictly required for color now,
  // but keeps it consistent with your other charts)
  const chartConfig = {
    value: {
      label,
      color: chartColor,
    },
  };

  // Make a safe id for the gradient (avoids spaces, etc.)
  const gradientId = `gradient-${String(label).replace(/\s+/g, "-")}`;

  return (
    <Card className={cn(" min-h-40 py-0 rounded-xl ", className)}>
      <CardContent className="p-5 flex items-end justify-between">
        <div className="flex flex-col items-start justify-between w-[70%] gap-4">
          <div className="space-y-2">
            <p className="text-sm  text-nowrap text-muted-foreground">{label}</p>
            <h3 className="text-3xl font-medium tracking-tight">
              <CountUp value={value} startOnView/></h3>
          </div>
          <div className="w-full flex gap-2 text-badge-green ">
            <div className="w-6 h-6 rounded-full bg-badge-green p-1 text-white flex items-center justify-center">
              <ArrowUp/>
            </div>
            <p className="font-semibold">
              <span>
              {isPositive ? "+" : ""}
              {change}%
            </span>
            </p>

          </div>
        </div>

        {/* Mini Area Chart using the interactive chart style */}
        <div className="h-16 w-[50%]">
          <ChartContainer config={chartConfig} className="h-full w-full">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="20%" stopColor={chartColor} stopOpacity={0.6} />
                  <stop offset="95%" stopColor={chartColor} stopOpacity={0} />
                </linearGradient>
              </defs>

              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    indicator="dot"
                    labelFormatter={(v) => `Point ${v}`}
                  />
                }
              />

              <Area
                type="natural"
                dataKey="value"
                stroke={chartColor}          // <-- line color
                strokeWidth={2}
                fill={`url(#${gradientId})`} // <-- gradient fill
                isAnimationActive={true}
                animationDuration={1000}
              />
            </AreaChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
}
