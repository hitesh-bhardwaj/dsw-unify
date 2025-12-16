"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import LiveBarChart from "@/components/common/Graphs/graphs";

// ✅ use single reusable component


const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

const GuardrailsDashboard = () => {
  const [preInference, setPreInference] = useState(156);
  const [postInference, setPostInference] = useState(43);
  const [avgLatency, setAvgLatency] = useState(0.112);

  // Update KPIs every 3s (same cadence as chart)
  useEffect(() => {
    const id = setInterval(() => {
      setPreInference((prev) =>
        clamp(prev + (Math.floor(Math.random() * 40) - 20), 50, 300)
      );
      setPostInference((prev) =>
        clamp(prev + (Math.floor(Math.random() * 20) - 10), 20, 150)
      );
      setAvgLatency((prev) =>
        clamp(prev + (Math.random() * 0.02 - 0.01), 0.08, 0.2)
      );
    }, 3000);

    return () => clearInterval(id);
  }, []);

  return (
    <div className="w-full py-3">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-medium mb-2">
            Guardrails &amp; Safety Metrics
          </h1>
          <p className="text-foreground/80 text-sm">
            Safety and policy enforcement monitoring
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="!pb-0 !py-7">
            <CardContent className="!space-y-5">
              <div className="text-sm font-medium">Pre-Inference Triggers</div>
              <div className="text-4xl font-bold text-primary">
                {preInference}
              </div>
              <p className="text-sm text-foreground/80">
                Requests blocked by pre-inference guardrails
              </p>
            </CardContent>
          </Card>

          <Card className="!pb-0 !py-7">
            <CardContent className="!space-y-5">
              <div className="text-sm font-medium">Post-Inference Triggers</div>
              <div className="text-4xl font-bold text-red">{postInference}</div>
              <p className="text-sm text-foreground/80">
                Requests blocked by post-inference guardrails
              </p>
            </CardContent>
          </Card>

          <Card className="!pb-0 !py-7">
            <CardContent className="!space-y-5">
              <div className="text-sm font-medium">Avg Guardrail Latency</div>
              <div className="text-4xl font-bold text-[#111111]">
                {avgLatency.toFixed(3)}s
              </div>
              <p className="text-sm text-foreground/80">
                Time spent in guardrail checks
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">Guardrail Activity Over Time</CardTitle>
          </CardHeader>

          <CardContent className="pt-4 flex items-center justify-center">
            <LiveBarChart
              height={400}
              width="90%"
              updateMs={3000}
              maxPoints={8}
              barCategoryGap="30%"
              barGap={6}
              barSize={45} 
              series={[
                {
                  dataKey: "preInference",
                  name: "Pre-Inference",
                  color: "#f97316",
                  min: 50,
                  max: 400,
                  base: 220,
                  jitter: 120,
                },
                {
                  dataKey: "postInference",
                  name: "Post-Inference",
                  color: "#ef4444",
                  min: 20,
                  max: 180,
                  base: 90,
                  jitter: 60,
                },
              ]}
              yAxisFormatter={(v) => Number(v).toFixed(0)}
              tooltipFormatter={(v, name) => [Number(v).toFixed(0), name]}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GuardrailsDashboard;
