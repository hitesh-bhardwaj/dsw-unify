"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// ✅ use OUR reusable component + hook
import { SingleAreaChart, useLiveSeries } from "@/components/common/Graphs/graphs";

const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

const SuccessMetricsDashboard = () => {
  // Live chart series (rolling window). time is numeric timestamp (ms)
  const live = useLiveSeries({
    updateMs: 3000,
    maxPoints: 20,
    timeKey: "time",
    makePoint: (now) => {
      const rate = clamp(95 + Math.random() * 5, 95, 99.9);
      return {
        time: now.getTime(),
        rate: +rate.toFixed(1),
      };
    },
  });

  const latest = live.data?.[live.data.length - 1];

  const [successTotal, setSuccessTotal] = useState(15084);
  const [successRate, setSuccessRate] = useState(99.4);

  // KPIs update based on latest series (and a small drift for totals)
  useEffect(() => {
    if (latest?.rate != null) setSuccessRate(latest.rate);

    setSuccessTotal((prev) => {
      const delta = Math.floor(Math.random() * 200 - 100);
      return clamp(prev + delta, 14000, 17000);
    });
  }, [latest]);

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
              data={live.data}
              xAxisTicks={live.ticks}
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

export default SuccessMetricsDashboard;
