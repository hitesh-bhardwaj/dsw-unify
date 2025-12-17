"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { DoubleAreaChart } from "@/components/common/Graphs/graphs";

const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

const TrafficMetricsDashboard = () => {
  // ===== Totals that update =====
  const [metrics, setMetrics] = useState({
    totalRequests: 12_847,
    totalSessions: 3_421,
  });

  // Update totals every 3s
  useEffect(() => {
    const id = setInterval(() => {
      setMetrics((prev) => ({
        totalRequests: prev.totalRequests + Math.floor(Math.random() * 15 + 5),
        totalSessions: prev.totalSessions + Math.floor(Math.random() * 3 + 1),
      }));
    }, 3000);

    return () => clearInterval(id);
  }, []);

  return (
    <div className="w-full mx-auto space-y-5 py-3">
      <div className="space-y-3">
        <h1 className="text-2xl font-medium">Traffic &amp; Usage Metrics</h1>
        <p className="text-sm text-gray-600">
          Volume of interactions with the agent
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 gap-6">
        <Card className="!pb-0 !py-5 border border-border-color-0">
          <CardHeader className="space-y-3">
            <CardDescription>Agent Requests Total</CardDescription>
            <CardTitle className="text-3xl font-semibold">
              {metrics.totalRequests.toLocaleString()}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">Number of agent invocations</p>
          </CardContent>
        </Card>

        <Card className="!pb-0 !py-5 border border-border-color-0">
          <CardHeader className="space-y-3">
            <CardDescription>Agent Sessions Total</CardDescription>
            <CardTitle className="text-3xl font-semibold">
              {metrics.totalSessions.toLocaleString()}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              Number of sessions/conversations started
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Live Chart */}
      <Card className="border border-border-color-0 shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="font-medium text-xl text-gray-900">
            Traffic Over Time
          </CardTitle>
        </CardHeader>

        <CardContent className="pt-4 flex items-center justify-center">
          <DoubleAreaChart
            live={true}
            dataKey1="requests"
            dataKey2="sessions"
            name1="Requests"
            name2="Sessions"
            color1="#1130C7"
            color2="#6BC631"
            height={350}
            width="90%"
            showDots={false}
            makePoint={(now) => {
              const hour = now.getHours();

              const requests = clamp(
                Math.round(100 + hour * 10 + Math.random() * 50),
                80,
                600
              );

              const sessions = clamp(
                Math.round(50 + hour * 5 + Math.random() * 30),
                40,
                300
              );

              return {
                time: now.getTime(),
                requests,
                sessions,
              };
            }}
            maxPoints={8}
            updateMs={3000}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default TrafficMetricsDashboard;