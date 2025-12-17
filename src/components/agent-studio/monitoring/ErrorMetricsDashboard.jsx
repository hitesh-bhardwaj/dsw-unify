"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CustomBarChart } from "@/components/common/Graphs/graphs";

const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

const ErrorMetricsDashboard = () => {
  // KPI values that update
  const [agentErrors, setAgentErrors] = useState(51);
  const [llmErrors, setLlmErrors] = useState(31);
  const [toolErrors, setToolErrors] = useState(29);

  // Update KPIs every 3s to match chart updates
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

  const errorBarData = [
  { timeLabel: "12:01", agentErrors: 220, llmErrors: 150, toolErrors: 120 },
  { timeLabel: "12:04", agentErrors: 180, llmErrors: 130, toolErrors: 110 },
  { timeLabel: "12:07", agentErrors: 260, llmErrors: 170, toolErrors: 140 },
  { timeLabel: "12:10", agentErrors: 210, llmErrors: 160, toolErrors: 125 },
  { timeLabel: "12:13", agentErrors: 240, llmErrors: 145, toolErrors: 135 },
];

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
            <div className="text-4xl font-medium text-red">{agentErrors}</div>
            <p className="text-sm ">Failed agent responses</p>
          </CardContent>
        </Card>

        <Card className="!pb-0 !py-7">
          <CardContent className="!space-y-5">
            <div className="text-sm">LLM Errors</div>
            <div className="text-4xl font-medium text-primary">{llmErrors}</div>
            <p className="text-sm ">LLM timeouts &amp; failures</p>
          </CardContent>
        </Card>

        <Card className="!pb-0 !py-7">
          <CardContent className="!space-y-5">
            <div className="text-sm">Tool Errors</div>
            <div className="text-4xl font-medium text-yellow">
              {toolErrors}
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