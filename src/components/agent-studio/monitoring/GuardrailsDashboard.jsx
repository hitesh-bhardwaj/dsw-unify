"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CustomBarChart } from "@/components/common/Graphs/graphs";

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
          <p className="text-foreground text-sm">
            Safety and policy enforcement monitoring
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="!pb-0 !py-7">
            <CardContent className="!space-y-5">
              <div className="text-sm">Pre-Inference Triggers</div>
              <div className="text-4xl font-bold text-primary">
                {preInference}
              </div>
              <p className="text-sm text-foreground">
                Requests blocked by pre-inference guardrails
              </p>
            </CardContent>
          </Card>

          <Card className="!pb-0 !py-7">
            <CardContent className="!space-y-5">
              <div className="text-sm">Post-Inference Triggers</div>
              <div className="text-4xl font-bold text-red">{postInference}</div>
              <p className="text-sm text-foreground">
                Requests blocked by post-inference guardrails
              </p>
            </CardContent>
          </Card>

          <Card className="!pb-0 !py-7">
            <CardContent className="!space-y-5">
              <div className="text-sm">Avg Guardrail Latency</div>
              <div className="text-4xl font-bold text-[#111111] dark:text-foreground">
                {avgLatency.toFixed(3)}s
              </div>
              <p className="text-sm text-foreground">
                Time spent in guardrail checks
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="">
          <CardHeader>
            <CardTitle className="text-2xl">Guardrail Activity Over Time</CardTitle>
          </CardHeader>

          <CardContent className="pt-4 flex items-center justify-center">
            <CustomBarChart
              live={true}
              timeKey="timeLabel"
              bars={[
                {
                  dataKey: "preInference",
                  name: "Pre-Inference",
                  color: "var(--primary)",
                },
                {
                  dataKey: "postInference",
                  name: "Post-Inference",
                  color: "var(--red)",
                },
              ]}
              height={400}
              width="90%"
              barCategoryGap="30%"
              barGap={6}
              barSize={45}
              yAxisFormatter={(v) => Number(v).toFixed(0)}
              tooltipFormatter={(v, name) => [Number(v).toFixed(0), name]}
              makePoint={(now) => {
                const preInference = clamp(
                  Math.round(220 + (Math.random() * 2 - 1) * 120),
                  50,
                  400
                );
                const postInference = clamp(
                  Math.round(90 + (Math.random() * 2 - 1) * 60),
                  20,
                  180
                );

                return {
                  time: now.getTime(),
                  timeLabel: now.toLocaleTimeString([], {
                    minute: "2-digit",
                    second: "2-digit",
                  }),
                  preInference,
                  postInference,
                };
              }}
              maxPoints={8}
              updateMs={3000}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GuardrailsDashboard;