"use client";

import React, { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CustomLineChart, DoubleAreaChart } from "@/components/common/Graphs/graphs";

const PerformanceTab = () => {
  const responseTimeData = useMemo(() => {
    const now = Date.now();
    return Array.from({ length: 20 }, (_, i) => ({
      time: now - (19 - i) * 3000,
      processing: 0.65 + Math.random() * 0.2,
      toolInvocation: 0.45 + Math.random() * 0.15,
    }));
  }, []);

  const tokenUsageData = useMemo(() => {
    const now = Date.now();
    return Array.from({ length: 20 }, (_, i) => ({
      time: now - (19 - i) * 3000,
      inputTokens: 30000 + Math.random() * 10000,
      outputTokens: 50000 + Math.random() * 20000,
    }));
  }, []);

  return (
    <div className="space-y-6 py-3 bg-slate-50 min-h-screen dark:!bg-background">
      <div className="space-y-2">
        <h1 className="text-2xl font-medium ">Performance Analytics</h1>
      </div>

      <Card className="border border-border-color-0">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl font-medium">Response Time Percentiles</CardTitle>
        </CardHeader>
        <CardContent className="pt-0 flex items-center justify-center">
          <CustomLineChart
            data={responseTimeData}
            lines={[
              { dataKey: "processing", name: "Processing (s)", color: "#6BC631" },
              { dataKey: "toolInvocation", name: "Tool Invocation", color: "#FFC71F" },
            ]}
            height={350}
            width="90%"
            showGrid
            showLegend
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

      <Card className="shadow-lg border-slate-200 dark:border-border-color-0 ">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl font-medium">Token Usage Over Time</CardTitle>
        </CardHeader>
        <CardContent className="pt-0 flex items-center justify-center">
          <DoubleAreaChart
            data={tokenUsageData}
            dataKey1="inputTokens"
            dataKey2="outputTokens"
            name1="Input Tokens"
            name2="Output Tokens"
            color1="#6BC631"
            color2="#3354F4"
            height={350}
            width="90%"
            showGrid
            showLegend
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