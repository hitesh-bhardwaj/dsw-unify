"use client";

import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";
import { Area, AreaChart, ResponsiveContainer } from "recharts";
import { cn } from "@/lib/utils";

export function MetricCard({ label, value, change, trend, className }) {
  // Prepare data for the sparkline chart
  const chartData = trend.map((value, index) => ({
    index,
    value,
  }));

  const isPositive = change >= 0;

  return (
    <Card className={cn("hover:shadow-lg transition-shadow py-0", className)}>
      <CardContent className="p-5 flex items-end justify-between">
        <div className="flex flex-col items-start justify-between mb-4">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">{label}</p>
            <h3 className="text-3xl font-semibold tracking-tight">{value}</h3>
          </div>
          <div
            className={cn(
              "flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium",
              isPositive
                ? "bg-green-500/10 text-green-600 dark:bg-green-500/20 dark:text-green-400"
                : "bg-red-500/10 text-red-600 dark:bg-red-500/20 dark:text-red-400"
            )}
          >
            <TrendingUp className="h-3 w-3" />
            <span>
              {isPositive ? "+" : ""}
              {change}%
            </span>
          </div>
        </div>

        {/* Sparkline Chart */}
        <div className="h-20 w-[50%]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id={`gradient-${label}`} x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="0%"
                    stopColor="rgb(34, 197, 94)"
                    stopOpacity={0.3}
                  />
                  <stop
                    offset="100%"
                    stopColor="rgb(34, 197, 94)"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <Area
                type="monotone"
                dataKey="value"
                stroke="rgb(34, 197, 94)"
                strokeWidth={2}
                fill={`url(#gradient-${label})`}
                isAnimationActive={true}
                animationDuration={1000}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
