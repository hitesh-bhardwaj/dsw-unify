"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import LiveBarChart from "@/components/common/Graphs/graphs";

const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

const ErrorMetricsDashboard = () => {
  const [agentErrors, setAgentErrors] = useState(51);
  const [llmErrors, setLlmErrors] = useState(31);
  const [toolErrors, setToolErrors] = useState(29);

  // Keep the KPI cards updating every 3s (same cadence as the chart)
  useEffect(() => {
    const id = setInterval(() => {
      setAgentErrors((prev) =>
        clamp(prev + (Math.floor(Math.random() * 10) - 5), 30, 80)
      );
      setLlmErrors((prev) =>
        clamp(prev + (Math.floor(Math.random() * 8) - 4), 20, 60)
      );
      setToolErrors((prev) =>
        clamp(prev + (Math.floor(Math.random() * 8) - 4), 15, 50)
      );
    }, 3000);

    return () => clearInterval(id);
  }, []);

  return (
    <div className="space-y-6 py-3">
      <div className="space-y-2">
        <h1 className="text-2xl font-medium">Error Metrics</h1>
        <p className="text-slate-600">
          Failures across agent, LLM, and integrated tools
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="!pb-0 !py-7">
          <CardContent className="!space-y-5">
            <div className="text-sm font-medium">Agent Errors</div>
            <div className="text-4xl font-medium text-red">{agentErrors}</div>
            <p className="text-sm text-slate-500">Failed agent responses</p>
          </CardContent>
        </Card>

        <Card className="!pb-0 !py-7">
          <CardContent className="!space-y-5">
            <div className="text-sm font-medium">LLM Errors</div>
            <div className="text-4xl font-medium text-primary">{llmErrors}</div>
            <p className="text-sm text-slate-500">LLM timeouts &amp; failures</p>
          </CardContent>
        </Card>

        <Card className="!pb-0 !py-7">
          <CardContent className="!space-y-5">
            <div className="text-sm font-medium">Tool Errors</div>
            <div className="text-4xl font-medium text-badge-yellow">
              {toolErrors}
            </div>
            <p className="text-sm">Tool invocation errors</p>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl">Error Distribution Over Time</CardTitle>
        </CardHeader>

        <CardContent className="pt-4 flex items-center justify-center">
          <LiveBarChart
            height={400}
            width="90%"
            updateMs={3000}
            maxPoints={5}
            barSize={45}
            barCategoryGap="20%"
            barGap={4}
            series={[
              {
                dataKey: "agentErrors",
                name: "Agent Errors",
                color: "#ef4444",
                min: 50,
                max: 350,
                base: 200,
                jitter: 120,
              },
              {
                dataKey: "llmErrors",
                name: "LLM Errors",
                color: "#f97316",
                min: 30,
                max: 250,
                base: 140,
                jitter: 90,
              },
              {
                dataKey: "toolErrors",
                name: "Tool Errors",
                color: "#eab308",
                min: 30,
                max: 250,
                base: 120,
                jitter: 85,
              },
            ]}
            yAxisFormatter={(v) => Number(v).toFixed(0)}
            tooltipFormatter={(v, name) => [Number(v).toFixed(0), name]}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default ErrorMetricsDashboard;
