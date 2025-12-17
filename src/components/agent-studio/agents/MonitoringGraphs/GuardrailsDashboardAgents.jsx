"use client";

import React, { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CustomBarChart } from "@/components/common/Graphs/graphs";

const GuardrailsDashboardAgents = () => {
  // Static KPI values
  const preInference = 156;
  const postInference = 43;
  const avgLatency = 0.112;

  // Static chart data (generated once)
  const data = useMemo(() => {
    const base = Date.now();
    
    return Array.from({ length: 8 }, (_, i) => {
      const t = new Date(base - (7 - i) * 3000);
      const timeLabel = t.toLocaleTimeString([], { 
        minute: "2-digit", 
        second: "2-digit" 
      });

      return {
        time: t.getTime(),
        timeLabel,
        preInference: Math.round(220 + (Math.random() * 2 - 1) * 120),
        postInference: Math.round(90 + (Math.random() * 2 - 1) * 60),
      };
    });
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
            <CustomBarChart
              data={data}
              timeKey="timeLabel"
              bars={[
                {
                  dataKey: "preInference",
                  name: "Pre-Inference",
                  color: "#f97316",
                },
                {
                  dataKey: "postInference",
                  name: "Post-Inference",
                  color: "#ef4444",
                },
              ]}
              height={400}
              width="90%"
              barCategoryGap="30%"
              barGap={6}
              barSize={45}
              yAxisFormatter={(v) => Number(v).toFixed(0)}
              tooltipFormatter={(v, name) => [Number(v).toFixed(0), name]}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GuardrailsDashboardAgents;