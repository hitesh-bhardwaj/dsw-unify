"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CustomBarChart } from "@/components/common/Graphs/graphs";
import * as monitoringApi from "@/lib/api/monitoring";

const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

const ErrorMetricsDashboard = ({ agentId }) => {
  const [metrics, setMetrics] = useState({
    agentErrors: 0,
    llmErrors: 0,
    toolErrors: 0,
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
        const data = await monitoringApi.getErrorMetrics(agentId);
        setMetrics(data);
      } catch (err) {
        setError(err.message || "Failed to load error metrics");
        console.error("Error fetching error metrics:", err);
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
          <h1 className="text-2xl font-medium">Error Metrics</h1>
          <p className="text-sm text-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full py-3">
        <div className="space-y-3">
          <h1 className="text-2xl font-medium">Error Metrics</h1>
          <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 py-3">
      <div className="space-y-2">
        <h1 className="text-2xl font-medium">Error Metrics</h1>
        <p className="text-foreground text-sm">
          Failures across agent, LLM, and integrated tools
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="!pb-0 !py-7">
          <CardContent className="!space-y-5">
            <div className="text-sm">Agent Errors</div>
            <div className="text-4xl font-medium text-red">{metrics.agentErrors}</div>
            <p className="text-sm ">Failed agent responses</p>
          </CardContent>
        </Card>

        <Card className="!pb-0 !py-7">
          <CardContent className="!space-y-5">
            <div className="text-sm">LLM Errors</div>
            <div className="text-4xl font-medium text-primary">{metrics.llmErrors}</div>
            <p className="text-sm ">LLM timeouts &amp; failures</p>
          </CardContent>
        </Card>

        <Card className="!pb-0 !py-7">
          <CardContent className="!space-y-5">
            <div className="text-sm">Tool Errors</div>
            <div className="text-4xl font-medium text-yellow">
              {metrics.toolErrors}
            </div>
            <p className="text-sm">Tool invocation errors</p>
          </CardContent>
        </Card>
      </div>

      <Card className="">
        <CardHeader>
          <CardTitle className="text-2xl">Error Distribution Over Time</CardTitle>
        </CardHeader>

        <CardContent className="pt-4 flex items-center justify-center">
          <CustomBarChart
  data={errorBarData}
  timeKey="timeLabel"
  bars={[
    { dataKey: "agentErrors", name: "Agent Errors", color: "var(--red)" },
    { dataKey: "llmErrors", name: "LLM Errors", color: "var(--primary)" },
    { dataKey: "toolErrors", name: "Tool Errors", color: "var(--yellow)" },
  ]}
  height={400}
  width="90%"
  barSize={45}
  barCategoryGap="20%"
  barGap={4}
  yAxisFormatter={(v) => Number(v).toFixed(0)}
  tooltipFormatter={(v, name) => [Number(v).toFixed(0), name]}
/>
        </CardContent>
      </Card>
    </div>
  );
};

export default ErrorMetricsDashboard;