"use client";

import React, { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CustomLineChart } from "@/components/common/Graphs/graphs";

const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

const LatencyDashboardAgents = () => {
  // Static KPI numbers
  const endToEnd = 1.85;
  const processing = 0.78;
  const toolInvocation = 0.42;

  // Static chart data (generated once)
  const data = useMemo(() => {
    const now = Date.now();

    return Array.from({ length: 20 }, (_, i) => {
      const endToEndVal = clamp(1.2 + Math.random() * 1.3, 1.2, 2.5);
      const processingVal = clamp(0.4 + Math.random() * 0.8, 0.4, 1.2);
      const toolInvocationVal = clamp(0.2 + Math.random() * 0.4, 0.2, 0.6);

      return {
        time: now - (19 - i) * 3000,
        endToEnd: +endToEndVal.toFixed(2),
        processing: +processingVal.toFixed(2),
        toolInvocation: +toolInvocationVal.toFixed(2),
      };
    });
  }, []);

  const ticks = useMemo(() => data.map((d) => d.time), [data]);

  const lines = useMemo(
    () => [
      { dataKey: "endToEnd", name: "End-to-End", color: "#3b82f6" },
      { dataKey: "processing", name: "Processing", color: "#22c55e" },
      { dataKey: "toolInvocation", name: "Tool Invocation", color: "#f97316" },
    ],
    []
  );

  return (
    <div className="w-full py-3">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-medium mb-2">
            Latency &amp; Performance Metrics
          </h1>
          <p className="text-foreground/80">Speed and efficiency of agent responses</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="!pb-0 !py-7">
            <CardContent className="!space-y-5">
              <div className="text-sm font-medium">End-to-End Latency</div>
              <div className="text-4xl font-medium">{Number(endToEnd).toFixed(2)}s</div>
              <p className="text-sm text-slate-500">Total time from request to response</p>
            </CardContent>
          </Card>

          <Card className="!pb-0 !py-7">
            <CardContent className="!space-y-5">
              <div className="text-sm font-medium">Processing Latency</div>
              <div className="text-4xl font-medium">{Number(processing).toFixed(2)}s</div>
              <p className="text-sm text-slate-500">Time in agent&apos;s internal logic</p>
            </CardContent>
          </Card>

          <Card className="!pb-0 !py-7">
            <CardContent className="!space-y-5">
              <div className="text-sm font-medium">Tool Invocation Latency</div>
              <div className="text-4xl font-medium">
                {Number(toolInvocation).toFixed(2)}s
              </div>
              <p className="text-sm text-slate-500">Latency for tool invocations</p>
            </CardContent>
          </Card>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">Latency Breakdown Over Time</CardTitle>
          </CardHeader>

          <CardContent className="pt-4 flex items-center justify-center">
            <CustomLineChart
              data={data}
              xAxisTicks={ticks}
              timeKey="time"
              lines={lines}
              dotSize={0}
              height={400}
              width="90%"
              yAxisDomain={[0, 2.5]}
              yAxisTicks={[0, 0.6, 1.1, 1.6, 2.2]}
              yAxisFormatter={(v) => `${Number(v).toFixed(1)}s`}
              tooltipFormatter={(v, name) => [`${Number(v).toFixed(2)}s`, name]}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LatencyDashboardAgents;