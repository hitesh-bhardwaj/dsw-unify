"use client";

import React, { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const ErrorMetricsAgents = () => {
  // ✅ Static KPI values (never change)
  const [agentErrors] = useState(51);
  const [llmErrors] = useState(31);
  const [toolErrors] = useState(29);

  // ✅ Static chart data (never changes)
  const data = useMemo(
    () => [
      { name: "T-4", agentErrors: 220, llmErrors: 150, toolErrors: 120 },
      { name: "T-3", agentErrors: 260, llmErrors: 170, toolErrors: 140 },
      { name: "T-2", agentErrors: 240, llmErrors: 160, toolErrors: 130 },
      { name: "T-1", agentErrors: 280, llmErrors: 190, toolErrors: 150 },
      { name: "Now", agentErrors: 300, llmErrors: 200, toolErrors: 160 },
    ],
    []
  );

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
            <div className="text-4xl font-medium text-badge-yellow">{toolErrors}</div>
            <p className="text-sm">Tool invocation errors</p>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl">Error Distribution</CardTitle>
        </CardHeader>

        <CardContent className="pt-4" style={{ height: 400 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} barCategoryGap="20%" barGap={4}>
              <XAxis dataKey="name" />
              <YAxis tickFormatter={(v) => Number(v).toFixed(0)} />
              <Tooltip formatter={(v, name) => [Number(v).toFixed(0), name]} />

              <Bar dataKey="agentErrors" name="Agent Errors" fill="#ef4444" barSize={45} />
              <Bar dataKey="llmErrors" name="LLM Errors" fill="#f97316" barSize={45} />
              <Bar dataKey="toolErrors" name="Tool Errors" fill="#eab308" barSize={45} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default ErrorMetricsAgents;
