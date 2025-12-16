"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// ✅ use OUR reusable component + live hook
import { CustomLineChart, useLiveSeries } from "@/components/common/Graphs/graphs";

const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

const LatencyDashboard = () => {
  // Live line series (rolling window). time is numeric timestamp (ms)
  const live = useLiveSeries({
    updateMs: 3000,
    maxPoints: 20,
    timeKey: "time",
    makePoint: (now) => {
      // generate reasonable latencies (seconds)
      const endToEnd = clamp(1.2 + Math.random() * 1.3, 1.2, 2.5);
      const processing = clamp(0.4 + Math.random() * 0.8, 0.4, 1.2);
      const toolInvocation = clamp(0.2 + Math.random() * 0.4, 0.2, 0.6);

      return {
        time: now.getTime(),
        endToEnd: +endToEnd.toFixed(2),
        processing: +processing.toFixed(2),
        toolInvocation: +toolInvocation.toFixed(2),
      };
    },
  });

  // KPI numbers driven from latest point (so cards match the chart)
  const latest = live.data?.[live.data.length - 1];

  const [endToEnd, setEndToEnd] = useState(1.85);
  const [processing, setProcessing] = useState(0.78);
  const [toolInvocation, setToolInvocation] = useState(0.42);

  useEffect(() => {
    if (!latest) return;
    setEndToEnd(latest.endToEnd ?? endToEnd);
    setProcessing(latest.processing ?? processing);
    setToolInvocation(latest.toolInvocation ?? toolInvocation);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [latest]);

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
              data={live.data}
              xAxisTicks={live.ticks}
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

export default LatencyDashboard;
