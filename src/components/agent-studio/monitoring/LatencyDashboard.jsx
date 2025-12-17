"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CustomLineChart } from "@/components/common/Graphs/graphs";

const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

const LatencyDashboard = () => {
  // KPI numbers that update
  const [endToEnd, setEndToEnd] = useState(1.85);
  const [processing, setProcessing] = useState(0.78);
  const [toolInvocation, setToolInvocation] = useState(0.42);

  // Update KPIs every 3s to match chart updates
  useEffect(() => {
    const id = setInterval(() => {
      const newEndToEnd = clamp(1.2 + Math.random() * 1.3, 1.2, 2.5);
      const newProcessing = clamp(0.4 + Math.random() * 0.8, 0.4, 1.2);
      const newToolInvocation = clamp(0.2 + Math.random() * 0.4, 0.2, 0.6);

      setEndToEnd(+newEndToEnd.toFixed(2));
      setProcessing(+newProcessing.toFixed(2));
      setToolInvocation(+newToolInvocation.toFixed(2));
    }, 3000);

    return () => clearInterval(id);
  }, []);

  const lines = useMemo(
    () => [
      { dataKey: "endToEnd", name: "End-to-End", color: "var(--badge-blue)" },
      { dataKey: "processing", name: "Processing", color: "var(--badge-green)" },
      { dataKey: "toolInvocation", name: "Tool Invocation", color: "var(--primary)" },
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
          <p className="text-foreground text-sm">Speed and efficiency of agent responses</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="!pb-0 !py-7">
            <CardContent className="!space-y-5">
              <div className="text-sm">End-to-End Latency</div>
              <div className="text-4xl font-semibold">{Number(endToEnd).toFixed(2)}s</div>
              <p className="text-sm text-foreground">Total time from request to response</p>
            </CardContent>
          </Card>

          <Card className="!pb-0 !py-7">
            <CardContent className="!space-y-5">
              <div className="text-sm">Processing Latency</div>
              <div className="text-4xl font-semibold">{Number(processing).toFixed(2)}s</div>
              <p className="text-sm text-foreground">Time in agent&apos;s internal logic</p>
            </CardContent>
          </Card>

          <Card className="!pb-0 !py-7">
            <CardContent className="!space-y-5">
              <div className="text-sm">Tool Invocation Latency</div>
              <div className="text-4xl font-semibold">
                {Number(toolInvocation).toFixed(2)}s
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
              lines={lines}
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