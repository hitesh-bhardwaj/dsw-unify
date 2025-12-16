"use client";

import React from "react";
import {
  CustomBarChart,
  CustomLineChart,
  DoubleAreaChart,
  SingleAreaChart,
  useLiveSeries,
} from "@/components/common/Graphs/graphs";

const ChartComponentsDemo = () => {
  // 1) Double Area (requests + sessions)
  const liveArea2 = useLiveSeries({
    updateMs: 3000,
    maxPoints: 20,
    timeKey: "time",
    makePoint: (now) => ({
      time: now,
      requests: Math.round(200 + Math.random() * 400),
      sessions: Math.round(80 + Math.random() * 220),
    }),
  });

  // 2) Single Area (cost)
  const liveArea1 = useLiveSeries({
    updateMs: 3000,
    maxPoints: 20,
    timeKey: "time",
    makePoint: (now) => ({
      time: now,
      cost: +(100 + Math.random() * 400).toFixed(2),
    }),
  });

  // 3) Line Chart (requests + sessions + latency)
  const liveLines = useLiveSeries({
    updateMs: 3000,
    maxPoints: 20,
    timeKey: "time",
    makePoint: (now) => ({
      time: now,
      requests: Math.round(200 + Math.random() * 400),
      sessions: Math.round(80 + Math.random() * 220),
      latency: +(0.8 + Math.random() * 2.2).toFixed(2),
    }),
  });

  // 4) Bar Chart (requests + sessions)
  const liveBars = useLiveSeries({
    updateMs: 3000,
    maxPoints: 12,
    timeKey: "time",
    makePoint: (now) => ({
      time: now,
      requests: Math.round(200 + Math.random() * 400),
      sessions: Math.round(80 + Math.random() * 220),
    }),
  });

  return (
    <div className="p-8 space-y-12 bg-gray-50 min-h-screen">
      <div>
        <h1 className="text-3xl font-bold mb-2">Reusable Chart Components</h1>
        <p className="text-gray-600">
          Live charts updating every 3 seconds (rolling window)
        </p>
      </div>

      {/* Double Area Chart */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Double Area Chart</h2>
        <DoubleAreaChart
          data={liveArea2.data}
          xAxisTicks={liveArea2.ticks}
          dataKey1="requests"
          dataKey2="sessions"
          name1="Requests"
          name2="Sessions"
          color1="#1130C7"
          color2="#6BC631"
        />
      </div>

      {/* Single Area Chart */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Single Area Chart</h2>
        <SingleAreaChart
          data={liveArea1.data}
          xAxisTicks={liveArea1.ticks}
          dataKey="cost"
          name="Cost ($)"
          color="#8b5cf6"
          showDots={true}
        />
      </div>

      {/* Line Chart */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Multi-Line Chart</h2>
        <CustomLineChart
          data={liveLines.data}
          xAxisTicks={liveLines.ticks}
          lines={[
            { dataKey: "requests", name: "Requests", color: "#3b82f6" },
            { dataKey: "sessions", name: "Sessions", color: "#22c55e" },
            { dataKey: "latency", name: "Latency", color: "#f97316" },
          ]}
          yAxisFormatter={(value) => Number(value).toFixed(0)}
          tooltipFormatter={(value) => [Number(value).toFixed(2), ""]}
        />
      </div>

      {/* Bar Chart */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Bar Chart</h2>
        <CustomBarChart
          data={liveBars.data}
          xAxisTicks={liveBars.ticks}
          bars={[
            { dataKey: "requests", name: "Requests", color: "#3b82f6" },
            { dataKey: "sessions", name: "Sessions", color: "#22c55e" },
          ]}
          barSize={40}
        />
      </div>

      {/* Usage Example */}
      <div className="bg-gray-800 text-white p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Usage Example</h2>
        <pre className="text-sm overflow-x-auto whitespace-pre-wrap bg-gray-900 p-4 rounded">
{`const live = useLiveSeries({
  updateMs: 3000,
  maxPoints: 20,
  makePoint: (now) => ({ time: now, value: Math.random() * 100 })
});

<SingleAreaChart
  data={live.data}
  xAxisTicks={live.ticks}
  dataKey="value"
/>`}
        </pre>
      </div>
    </div>
  );
};

export default ChartComponentsDemo;
