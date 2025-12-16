"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// ✅ use OUR reusable components + hook
import {
  DoubleAreaChart,
  SingleAreaChart,
  CustomLineChart,
  useLiveSeries,
} from "@/components/common/Graphs/graphs";

const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

const LLMDashboard = () => {
  // ===== Live series for Token Usage (inputTokens + outputTokens) =====
  const tokenLive = useLiveSeries({
    updateMs: 3000,
    maxPoints: 20,
    timeKey: "time",
    makePoint: (now) => {
      const inputTokens = clamp(Math.round(120 + Math.random() * 480), 100, 600);
      const outputTokens = clamp(Math.round(80 + Math.random() * 220), 50, 300);
      return {
        time: now.getTime(),
        inputTokens,
        outputTokens,
      };
    },
  });

  // ===== Live series for Cost (line) =====
  const costLive = useLiveSeries({
    updateMs: 3000,
    maxPoints: 20,
    timeKey: "time",
    makePoint: (now) => {
      const cost = clamp(100 + Math.random() * 300, 100, 400);
      return {
        time: now.getTime(),
        cost: +cost.toFixed(2),
      };
    },
  });

  // ===== KPI values (cards) derived from latest chart points =====
  const latestTokens = tokenLive.data?.[tokenLive.data.length - 1];
  const latestCost = costLive.data?.[costLive.data.length - 1];

  const [inferenceLatency, setInferenceLatency] = useState(1.2);
  const [inputTokensTotal, setInputTokensTotal] = useState(251_508);
  const [outputTokensTotal, setOutputTokensTotal] = useState(137_905);
  const [totalCost, setTotalCost] = useState(48.16);

  useEffect(() => {
    // latency drifts smoothly
    setInferenceLatency((prev) => {
      const next = prev + (Math.random() * 0.2 - 0.1);
      return clamp(next, 0.8, 2.0);
    });

    // accumulate totals based on latest per-interval token usage
    if (latestTokens) {
      setInputTokensTotal((prev) =>
        clamp(prev + latestTokens.inputTokens, 200_000, 350_000)
      );
      setOutputTokensTotal((prev) =>
        clamp(prev + latestTokens.outputTokens, 100_000, 200_000)
      );
    }

    // accumulate total cost from latest cost point (scaled small so it doesn't explode)
    if (latestCost) {
      setTotalCost((prev) => clamp(prev + latestCost.cost / 1000, 30, 70));
    }
  }, [latestTokens, latestCost]);

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
        {/* Token Usage Over Time (use our DoubleAreaChart) */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl">Token Usage Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <DoubleAreaChart
              data={tokenLive.data}
              xAxisTicks={tokenLive.ticks}
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
              // stacked effect isn't in DoubleAreaChart; if you want stacked,
              // use 2x SingleAreaChart with stacked=true, or tell me and I'll add "stackId" support.
            />
          </CardContent>
        </Card>

        {/* LLM Cost Over Time (use our CustomLineChart) */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl">LLM Cost Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <CustomLineChart
              data={costLive.data}
              xAxisTicks={costLive.ticks}
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

export default LLMDashboard;
