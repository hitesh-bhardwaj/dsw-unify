"use client";

import React, { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SingleAreaChart } from "@/components/common/Graphs/graphs";

const SuccessMonitoringAgents = () => {
  // Static KPI values
  const successTotal = 15084;
  const successRate = 99.4;

  // Static chart data (generated once)
  const data = useMemo(() => {
    const now = Date.now();
    return Array.from({ length: 20 }, (_, i) => ({
      time: now - (19 - i) * 3000,
      rate: +(98 + Math.random() * 1.5).toFixed(1),
    }));
  }, []);

  const ticks = useMemo(() => data.map((d) => d.time), [data]);

  return (
    <div className="w-full py-3">
      <div className="space-y-3">
        <div className="space-y-3">
          <h1 className="text-2xl font-medium">Success Metrics</h1>
          <p className="text-sm text-foreground/80">
            Successful outcomes of agent interactions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="!pb-0 !py-7">
            <CardContent className="!space-y-5">
              <div className="text-sm font-medium">Agent Success Total</div>
              <div className="text-4xl font-bold text-badge-green">
                {successTotal.toLocaleString()}
              </div>
              <p className="text-sm">Count of successful agent responses</p>
            </CardContent>
          </Card>

          <Card className="!pb-0 !py-7">
            <CardContent className="!space-y-5">
              <div className="text-sm font-medium">Success Rate</div>
              <div className="text-4xl font-bold text-badge-green">
                {Number(successRate).toFixed(1)}%
              </div>
              <p className="text-sm">Percentage of successful responses</p>
            </CardContent>
          </Card>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">Success Rate Over Time</CardTitle>
          </CardHeader>

          <CardContent className="pt-4 flex items-center justify-center">
            <SingleAreaChart
              data={data}
              xAxisTicks={ticks}
              timeKey="time"
              dataKey="rate"
              name="Success Rate"
              color="#22c55e"
              height={400}
              width="90%"
              showDots={false}
              yAxisDomain={[90, 100]}
              yAxisTicks={[90, 93, 96, 100]}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SuccessMonitoringAgents;