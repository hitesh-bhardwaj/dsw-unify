"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DoubleAreaChart,
  CustomLineChart,
} from "@/components/common/Graphs/graphs";

const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

const LLMDashboard = () => {
  // KPI values that update
  const [inferenceLatency, setInferenceLatency] = useState(1.2);
  const [inputTokensTotal, setInputTokensTotal] = useState(251_508);
  const [outputTokensTotal, setOutputTokensTotal] = useState(137_905);
  const [totalCost, setTotalCost] = useState(48.16);

  // Update KPIs every 3s to match chart updates
  useEffect(() => {
    const id = setInterval(() => {
      // latency drifts smoothly
      setInferenceLatency((prev) => {
        const next = prev + (Math.random() * 0.2 - 0.1);
        return clamp(next, 0.8, 2.0);
      });

      // accumulate totals based on simulated token usage
      const inputTokens = clamp(Math.round(120 + Math.random() * 480), 100, 600);
      const outputTokens = clamp(Math.round(80 + Math.random() * 220), 50, 300);
      const cost = clamp(100 + Math.random() * 300, 100, 400);

      setInputTokensTotal((prev) =>
        clamp(prev + inputTokens, 200_000, 350_000)
      );
      setOutputTokensTotal((prev) =>
        clamp(prev + outputTokens, 100_000, 200_000)
      );
      setTotalCost((prev) => clamp(prev + cost / 1000, 30, 70));
    }, 3000);

    return () => clearInterval(id);
  }, []);

  const costLines = useMemo(
    () => [{ dataKey: "cost", name: "Cost", color: "var(--badge-green)" }],
    []
  );

  return (
    <div className="space-y-6 w-full py-3">
      <div className="space-y-2">
        <h1 className="text-2xl font-medium">LLM &amp; Token Usage Metrics</h1>
        <p className="text-sm text-foreground">
          Language model operational costs and usage
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="!pb-0 !py-7">
          <CardContent className="!space-y-5">
            <div className="text-sm">LLM Inference Latency</div>
            <div className="text-3xl font-semibold">{inferenceLatency.toFixed(2)}s</div>
            <p className="text-sm">Average LLM response time</p>
          </CardContent>
        </Card>

        <Card className="!pb-0 !py-7">
          <CardContent className="!space-y-5">
            <div className="text-sm">Input Tokens</div>
            <div className="text-3xl font-semibold">{inputTokensTotal.toLocaleString()}</div>
            <p className="text-sm text-foreground/80">Total prompt tokens sent</p>
          </CardContent>
        </Card>

        <Card className="!pb-0 !py-7">
          <CardContent className="!space-y-5">
            <div className="text-sm">Output Tokens</div>
            <div className="text-3xl font-semibold">{outputTokensTotal.toLocaleString()}</div>
            <p className="text-sm text-foreground/80">Total completion tokens generated</p>
          </CardContent>
        </Card>

        <Card className="!pb-0 !py-7">
          <CardContent className="!space-y-5">
            <div className="text-sm">Total Token Cost</div>
            <div className="text-3xl font-semibold text-slate-900 mb-2 dark:text-foreground">
              ${totalCost.toFixed(2)}
            </div>
            <p className="text-sm text-foreground/80">Total LLM usage cost (USD)</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Token Usage Over Time - Live */}
        <Card className="">
          <CardHeader>
            <CardTitle className="text-xl">Token Usage Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <DoubleAreaChart
              live={true}
              timeKey="time"
              dataKey1="inputTokens"
              dataKey2="outputTokens"
              name1="Input Tokens"
              name2="Output Tokens"
              color1="var(--badge-blue)"
              color2="var(--badge-green)"
              height={300}
              width="100%"
              showDots={false}
              makePoint={(now) => {
                const inputTokens = clamp(Math.round(120 + Math.random() * 480), 100, 600);
                const outputTokens = clamp(Math.round(80 + Math.random() * 220), 50, 300);
                return {
                  time: now.getTime(),
                  inputTokens,
                  outputTokens,
                };
              }}
              maxPoints={20}
              updateMs={3000}
            />
          </CardContent>
        </Card>

        {/* LLM Cost Over Time - Live */}
        <Card className="">
          <CardHeader>
            <CardTitle className="text-xl">LLM Cost Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <CustomLineChart
              live={true}
              timeKey="time"
              dotSize={0}
              lines={costLines}
              height={300}
              width="100%"
              yAxisFormatter={(v) => Number(v).toFixed(0)}
              tooltipFormatter={(v, name) => [`$${Number(v).toFixed(2)}`, name]}
              strokeWidth={3}
              makePoint={(now) => {
                const cost = clamp(100 + Math.random() * 300, 100, 400);
                return {
                  time: now.getTime(),
                  cost: +cost.toFixed(2),
                };
              }}
              maxPoints={20}
              updateMs={3000}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LLMDashboard;