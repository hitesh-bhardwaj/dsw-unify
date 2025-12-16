"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CustomLineChart, DoubleAreaChart, useLiveSeries } from "@/components/common/Graphs/graphs";

const PerformanceTab = () => {
  // Live data for Response Time Percentiles (Line Chart)
  const responseTime = useLiveSeries({
    maxPoints: 20,
    updateMs: 3000,
    timeKey: "time",
    makePoint: (now) => ({
      time: now.getTime(),
      endToEnd: 0.25 + Math.random() * 0.15,           // Range: 0.25-0.40
      processing: 0.65 + Math.random() * 0.20,         // Range: 0.65-0.85
      toolInvocation: 0.45 + Math.random() * 0.15,     // Range: 0.45-0.60
    }),
  });

  // Live data for Token Usage Over Time (Stacked Area Chart)
  const tokenUsage = useLiveSeries({
    maxPoints: 20,
    updateMs: 3000,
    timeKey: "time",
    makePoint: (now) => ({
      time: now.getTime(),
      inputTokens: 30000 + Math.random() * 10000,      // Range: 30k-40k
      outputTokens: 50000 + Math.random() * 20000,     // Range: 50k-70k
    }),
  });

  return (
    <div className="space-y-6 py-3 bg-slate-50 min-h-screen">
      <div className="space-y-2">
        <h1 className="text-2xl font-medium ">Performance Analytics</h1>
      </div>

      {/* Response Time Percentiles - Line Chart */}
      <Card className="border border-border-color-0">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl font-medium">Response Time Percentiles</CardTitle>
        </CardHeader>
        <CardContent className="pt-0 flex items-center justify-center">
          <CustomLineChart
            data={responseTime.data}
            lines={[
              { dataKey: "processing", name: "Processing (s)", color: "#6BC631" },
              { dataKey: "toolInvocation", name: "Tool Invocation", color: "#FFC71F" },

            ]}
            height={350}
            width="90%"
            showGrid={true}
            showLegend={true}
            strokeWidth={2}
            dotSize={0}
            activeDotSize={6}
            yAxisDomain={[0, 2.5]}
            yAxisTicks={[0, 0.55, 1.1, 1.65, 2.2]}
            yAxisFormatter={(v) => Number(v).toFixed(2)}
            tooltipFormatter={(v) => `${Number(v).toFixed(3)}s`}
            margin={{ top: 20, right: 30, left: 10, bottom: 20 }}
          />
        </CardContent>
      </Card>

      {/* Token Usage Over Time - Stacked Area Chart */}
      <Card className="shadow-lg border-slate-200">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl font-medium">Token Usage Over Time</CardTitle>
        </CardHeader>
        <CardContent className="pt-0 flex items-center justify-center">
          <DoubleAreaChart
            data={tokenUsage.data}
            dataKey1="inputTokens"
            dataKey2="outputTokens"
            name1="Input Tokens"
            name2="Output Tokens"
            color1="#6BC631"
            color2="#3354F4"
            height={350}
            width="90%"
            showGrid={true}
            showLegend={true}
            strokeWidth={2}
            gradientOpacity1={{ start: 0.7, end: 0.1 }}
            gradientOpacity2={{ start: 0.7, end: 0.1 }}
            margin={{ top: 20, right: 30, left: 10, bottom: 20 }}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default PerformanceTab;