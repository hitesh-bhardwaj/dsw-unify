"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SingleAreaChart } from "@/components/common/Graphs/graphs";
import * as monitoringApi from "@/lib/api/monitoring";

const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

const SuccessMetricsDashboard = ({ agentId }) => {
  const [metrics, setMetrics] = useState({
    successRate: 0,
    totalSuccessful: 0,
    totalFailed: 0,
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
        const data = await monitoringApi.getSuccessMetrics(agentId);
        setMetrics(data);
      } catch (err) {
        setError(err.message || "Failed to load success metrics");
        console.error("Error fetching success metrics:", err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchMetrics();
  }, [agentId]);

  if (isLoading) {
    return (
      <div className="w-full py-3">
        <div className="space-y-3">
          <h1 className="text-2xl font-medium">Success Metrics</h1>
          <p className="text-sm text-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full py-3">
        <div className="space-y-3">
          <h1 className="text-2xl font-medium">Success Metrics</h1>
          <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full py-3">
      <div className="space-y-3">
        <div className="space-y-2 mb-8">
          <h1 className="text-2xl font-medium">Success Metrics</h1>
          <p className="text-sm text-foreground/80">
            Successful outcomes of agent interactions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="!pb-0 !py-7">
            <CardContent className="!space-y-5">
              <div className="text-sm ">Agent Success Total</div>
              <div className="text-4xl font-semibold text-badge-green">
                {(metrics.totalSuccessful || 0).toLocaleString()}
              </div>
              <p className="text-sm">Count of successful agent responses</p>
            </CardContent>
          </Card>

          <Card className="!pb-0 !py-7">
            <CardContent className="!space-y-5">
              <div className="text-sm ">Success Rate</div>
              <div className="text-4xl font-semibold text-badge-green">
                {Number(metrics.successRate || 0).toFixed(1)}%
              </div>
              <p className="text-sm">Percentage of successful responses</p>
            </CardContent>
          </Card>
        </div>

        <Card className="">
          <CardHeader>
            <CardTitle className="text-2xl">Success Rate Over Time</CardTitle>
          </CardHeader>

          <CardContent className="pt-4 flex items-center justify-center">
            <SingleAreaChart
              live={true}
              timeKey="time"
              dataKey="rate"
              name="Success Rate"
              color="var(--badge-green)"
              height={400}
              width="90%"
              showDots={false}
              yAxisDomain={[90, 100]}
              yAxisTicks={[90, 93, 96, 100]}
              makePoint={(now) => {
                const rate = clamp(95 + Math.random() * 5, 95, 99.9);
                return {
                  time: now.getTime(),
                  rate: +rate.toFixed(1),
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

export default SuccessMetricsDashboard;