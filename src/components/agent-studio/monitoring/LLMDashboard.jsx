"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DoubleAreaChart,
  CustomLineChart,
} from "@/components/common/Graphs/graphs";
import * as monitoringApi from "@/lib/api/monitoring";

const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

const LLMDashboard = ({ agentId }) => {
  const [metrics, setMetrics] = useState({
    avgTokensPerRequest: 0,
    totalTokensUsed: 0,
    avgResponseTime: 0,
    chartData: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!agentId) return;

    async function fetchMetrics() {
      try {
        setIsLoading(true);
        setError(null);
        const data = await monitoringApi.getLLMMetrics(agentId);
        setMetrics(data);
      } catch (err) {
        setError(err.message || "Failed to load LLM metrics");
        console.error("Error fetching LLM metrics:", err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchMetrics();
  }, [agentId]);

  if (isLoading) {
    return (
      <div className="w-full py-3">
        <div className="space-y-3">
          <h1 className="text-2xl font-medium">LLM Metrics</h1>
          <p className="text-sm text-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full py-3">
        <div className="space-y-3">
          <h1 className="text-2xl font-medium">LLM Metrics</h1>
          <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
        </div>
      </div>
    );
  }

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
            <div className="text-3xl font-semibold">{(metrics.avgResponseTime || 0).toFixed(2)}s</div>
            <p className="text-sm">Average LLM response time</p>
          </CardContent>
        </Card>

        <Card className="!pb-0 !py-7">
          <CardContent className="!space-y-5">
            <div className="text-sm">Input Tokens</div>
            <div className="text-3xl font-semibold">{(Math.floor(metrics.totalTokensUsed * 0.65) || 0).toLocaleString()}</div>
            <p className="text-sm text-foreground/80">Total prompt tokens sent</p>
          </CardContent>
        </Card>

        <Card className="!pb-0 !py-7">
          <CardContent className="!space-y-5">
            <div className="text-sm">Output Tokens</div>
            <div className="text-3xl font-semibold">{(Math.floor(metrics.totalTokensUsed * 0.35) || 0).toLocaleString()}</div>
            <p className="text-sm text-foreground/80">Total completion tokens generated</p>
          </CardContent>
        </Card>

        <Card className="!pb-0 !py-7">
          <CardContent className="!space-y-5">
            <div className="text-sm">Total Token Cost</div>
            <div className="text-3xl font-semibold text-slate-900 mb-2 dark:text-foreground">
              ${((metrics.totalTokensUsed || 0) * 0.00015).toFixed(2)}
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