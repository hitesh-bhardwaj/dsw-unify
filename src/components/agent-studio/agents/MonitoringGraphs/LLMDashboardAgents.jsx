"use client";

import React, { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  DoubleAreaChart,
  CustomLineChart,
} from "@/components/common/Graphs/graphs";

const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

const LLMDashboardAgents = () => {
  // ✅ Static KPI values (no time updates)
  const [inferenceLatency] = useState(1.2);
  const [inputTokensTotal] = useState(251_508);
  const [outputTokensTotal] = useState(137_905);
  const [totalCost] = useState(48.16);

  // ✅ Static token chart data (generated once)
  const tokenData = useMemo(() => {
    const now = Date.now();
    return Array.from({ length: 20 }, (_, i) => {
      const inputTokens = clamp(Math.round(120 + Math.random() * 480), 100, 600);
      const outputTokens = clamp(Math.round(80 + Math.random() * 220), 50, 300);

      return {
        time: now - (19 - i) * 3000,
        inputTokens,
        outputTokens,
      };
    });
  }, []);

  // ✅ Static cost chart data (generated once)
  const costData = useMemo(() => {
    const now = Date.now();
    return Array.from({ length: 20 }, (_, i) => {
      const cost = clamp(100 + Math.random() * 300, 100, 400);
      return {
        time: now - (19 - i) * 3000,
        cost: +cost.toFixed(2),
      };
    });
  }, []);

  const tokenTicks = useMemo(() => tokenData.map((d) => d.time), [tokenData]);
  const costTicks = useMemo(() => costData.map((d) => d.time), [costData]);

  const costLines = useMemo(
    () => [{ dataKey: "cost", name: "Cost", color: "#10b981" }],
    []
  );

  return (
    <div className="space-y-6 w-full py-3">
      <div className="space-y-2">
        <h1 className="text-2xl font-medium">LLM &amp; Token Usage Metrics</h1>
        <p className="text-sm text-foreground/80">
          Language model operational costs and usage
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="!pb-0 !py-7">
          <CardContent className="!space-y-5">
            <div className="text-sm font-medium">LLM Inference Latency</div>
            <div className="text-2xl font-medium">{inferenceLatency.toFixed(2)}s</div>
            <p className="text-sm">Average LLM response time</p>
          </CardContent>
        </Card>

        <Card className="!pb-0 !py-7">
          <CardContent className="!space-y-5">
            <div className="text-sm font-medium">Input Tokens</div>
            <div className="text-2xl font-medium">{inputTokensTotal.toLocaleString()}</div>
            <p className="text-sm text-foreground/80">Total prompt tokens sent</p>
          </CardContent>
        </Card>

        <Card className="!pb-0 !py-7">
          <CardContent className="!space-y-5">
            <div className="text-sm font-medium">Output Tokens</div>
            <div className="text-2xl font-medium">{outputTokensTotal.toLocaleString()}</div>
            <p className="text-sm text-foreground/80">Total completion tokens generated</p>
          </CardContent>
        </Card>

        <Card className="!pb-0 !py-7">
          <CardContent className="!space-y-5">
            <div className="text-sm font-medium">Total Token Cost</div>
            <div className="text-4xl font-bold text-slate-900 mb-2">
              ${totalCost.toFixed(2)}
            </div>
            <p className="text-sm text-slate-500">Total LLM usage cost (USD)</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl">Token Usage Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <DoubleAreaChart
              data={tokenData}
              xAxisTicks={tokenTicks}
              timeKey="time"
              dataKey1="inputTokens"
              dataKey2="outputTokens"
              name1="Input Tokens"
              name2="Output Tokens"
              color1="#3b82f6"
              color2="#22c55e"
              height={300}
              width="100%"
              showDots={false}
            />
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl">LLM Cost Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <CustomLineChart
              data={costData}
              xAxisTicks={costTicks}
              timeKey="time"
              dotSize={0}
              lines={costLines}
              height={300}
              width="100%"
              yAxisFormatter={(v) => Number(v).toFixed(0)}
              tooltipFormatter={(v, name) => [`$${Number(v).toFixed(2)}`, name]}
              strokeWidth={3}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LLMDashboardAgents;
