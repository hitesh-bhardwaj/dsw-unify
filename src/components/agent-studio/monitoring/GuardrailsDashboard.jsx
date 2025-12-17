"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CustomBarChart } from "@/components/common/Graphs/graphs";
import * as monitoringApi from "@/lib/api/monitoring";

const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

const GuardrailsDashboard = ({ agentId }) => {
  const [metrics, setMetrics] = useState({
    preInference: 0,
    postInference: 0,
    avgLatency: 0,
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
        const data = await monitoringApi.getGuardrailMetrics(agentId);
        setMetrics(data);
      } catch (err) {
        setError(err.message || "Failed to load guardrail metrics");
        console.error("Error fetching guardrail metrics:", err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchMetrics();
  }, [agentId]);

  if (isLoading) {
    return (
      <div className="w-full py-3">
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-medium mb-2">Guardrails & Safety Metrics</h1>
            <p className="text-foreground text-sm">Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full py-3">
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-medium mb-2">Guardrails & Safety Metrics</h1>
            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
          </div>
        </div>
      </div>
    );
  }

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
                {metrics.preInference}
              </div>
              <p className="text-sm text-foreground">
                Requests blocked by pre-inference guardrails
              </p>
            </CardContent>
          </Card>

          <Card className="!pb-0 !py-7">
            <CardContent className="!space-y-5">
              <div className="text-sm">Post-Inference Triggers</div>
              <div className="text-4xl font-bold text-red">{metrics.postInference}</div>
              <p className="text-sm text-foreground">
                Requests blocked by post-inference guardrails
              </p>
            </CardContent>
          </Card>

          <Card className="!pb-0 !py-7">
            <CardContent className="!space-y-5">
              <div className="text-sm">Avg Guardrail Latency</div>
              <div className="text-4xl font-bold text-foreground dark:text-foreground">
                {(metrics.avgLatency || 0).toFixed(3)}s
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