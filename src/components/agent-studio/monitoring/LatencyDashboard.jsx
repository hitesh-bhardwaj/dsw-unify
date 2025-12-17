"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CustomLineChart } from "@/components/common/Graphs/graphs";
import * as monitoringApi from "@/lib/api/monitoring";

const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
const LINES = [
  { dataKey: "endToEnd", name: "End-to-End", color: "var(--badge-blue)" },
  { dataKey: "processing", name: "Processing", color: "var(--badge-green)" },
  { dataKey: "toolInvocation", name: "Tool Invocation", color: "var(--primary)" },
];

const LatencyDashboard = ({ agentId }) => {
  const [metrics, setMetrics] = useState({
    endToEnd: 0,
    processing: 0,
    toolInvocation: 0,
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
        const data = await monitoringApi.getLatencyMetrics(agentId);
        setMetrics(data);
      } catch (err) {
        setError(err.message || "Failed to load latency metrics");
        console.error("Error fetching latency metrics:", err);
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
          <h1 className="text-2xl font-medium">Latency Metrics</h1>
          <p className="text-sm text-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full py-3">
        <div className="space-y-3">
          <h1 className="text-2xl font-medium">Latency Metrics</h1>
          <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full py-3">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-medium mb-2">
            Latency &amp; Performance Metrics
          </h1>
          <p className="text-foreground text-sm">Speed and efficiency of agent responses</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="!pb-0 !py-7">
            <CardContent className="!space-y-5">
              <div className="text-sm">End-to-End Latency</div>
              <div className="text-4xl font-semibold">{Number(metrics.endToEnd || 0).toFixed(2)}s</div>
              <p className="text-sm text-foreground">Total time from request to response</p>
            </CardContent>
          </Card>

          <Card className="!pb-0 !py-7">
            <CardContent className="!space-y-5">
              <div className="text-sm">Processing Latency</div>
              <div className="text-4xl font-semibold">{Number(metrics.processing || 0).toFixed(2)}s</div>
              <p className="text-sm text-foreground">Time in agent&apos;s internal logic</p>
            </CardContent>
          </Card>

          <Card className="!pb-0 !py-7">
            <CardContent className="!space-y-5">
              <div className="text-sm">Tool Invocation Latency</div>
              <div className="text-4xl font-semibold">
                {Number(metrics.toolInvocation || 0).toFixed(2)}s
              </div>
              <p className="text-sm text-foreground">Latency for tool invocations</p>
            </CardContent>
          </Card>
        </div>

        <Card className="">
          <CardHeader>
            <CardTitle className="text-2xl">Latency Breakdown Over Time</CardTitle>
          </CardHeader>

          <CardContent className="pt-4 flex items-center justify-center">
            <CustomLineChart
              live={true}
              timeKey="time"
              lines={LINES}
              dotSize={0}
              height={400}
              width="90%"
              yAxisDomain={[0, 2.5]}
              yAxisTicks={[0, 0.6, 1.1, 1.6, 2.2]}
              yAxisFormatter={(v) => `${Number(v).toFixed(1)}s`}
              tooltipFormatter={(v, name) => [`${Number(v).toFixed(2)}s`, name]}
              makePoint={(now) => {
                const endToEnd = clamp(1.2 + Math.random() * 1.3, 1.2, 2.5);
                const processing = clamp(0.4 + Math.random() * 0.8, 0.4, 1.2);
                const toolInvocation = clamp(0.2 + Math.random() * 0.4, 0.2, 0.6);

                return {
                  time: now.getTime(),
                  endToEnd: +endToEnd.toFixed(2),
                  processing: +processing.toFixed(2),
                  toolInvocation: +toolInvocation.toFixed(2),
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

export default LatencyDashboard;
