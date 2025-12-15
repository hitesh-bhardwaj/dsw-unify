import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const TrafficMetricsDashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [metrics, setMetrics] = useState({
    totalRequests: 12847,
    totalSessions: 3421
  });

  // Generate initial data
  const generateTimeData = () => {
    const data = [];
    const now = new Date();
    const startTime = new Date(now.setHours(0, 0, 0, 0));
    
    for (let i = 0; i <= 20; i++) {
      const time = new Date(startTime.getTime() + (i * 60 * 60 * 1000));
      const hour = time.getHours();
      
      // Create realistic patterns with some randomness
      const baseRequests = 100 + (hour * 10) + Math.random() * 50;
      const baseSessions = 50 + (hour * 5) + Math.random() * 30;
      
      data.push({
        time: `${hour.toString().padStart(2, '0')}:00`,
        requests: Math.round(baseRequests),
        sessions: Math.round(baseSessions)
      });
    }
    
    return data;
  };

  const [chartData, setChartData] = useState(generateTimeData());

  // Update metrics and chart data every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
      
      // Update total metrics with small increments
      setMetrics(prev => ({
        totalRequests: prev.totalRequests + Math.floor(Math.random() * 15) + 5,
        totalSessions: prev.totalSessions + Math.floor(Math.random() * 3) + 1
      }));

      // Update chart data - shift and add new point
      setChartData(prevData => {
        const newData = [...prevData];
        newData.shift(); // Remove first element
        
        const lastPoint = newData[newData.length - 1];
        const currentHour = new Date().getHours();
        const nextHour = (parseInt(lastPoint.time.split(':')[0]) + 1) % 24;
        
        // Add new point with slight variation
        newData.push({
          time: `${nextHour.toString().padStart(2, '0')}:00`,
          requests: Math.round(lastPoint.requests + (Math.random() * 40 - 20)),
          sessions: Math.round(lastPoint.sessions + (Math.random() * 20 - 10))
        });
        
        return newData;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getSixTicks = (data) => {
  if (!data?.length) return [];
  const n = data.length;
  const idx = [0, 1, 2, 3, 4, 5].map(i => Math.round((i * (n - 1)) / 5));
  // unique + stable
  return Array.from(new Set(idx)).map(i => data[i]?.time).filter(Boolean);
};

const xTicks = getSixTicks(chartData);

  return (
    <div className="w-full mx-auto  space-y-5 py-3">
      <div className='space-y-3'>
        <h1 className="text-2xl font-medium">Traffic & Usage Metrics</h1>
        <p className="text-sm text-gray-600 ">Volume of interactions with the agent</p>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <Card className='!pb-0 !py-5 border border-border-color-0'>
          <CardHeader className="space-y-3">
            <CardDescription>Agent Requests Total</CardDescription>
            <CardTitle className="text-3xl font-semibold">{metrics.totalRequests.toLocaleString()}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">Number of agent invocations</p>
          </CardContent>
        </Card>

        <Card className='!pb-0 !py-5 border border-border-color-0'>
          <CardHeader className="space-y-3">
            <CardDescription>Agent Sessions Total</CardDescription>
            <CardTitle className="text-3xl font-semibold">{metrics.totalSessions.toLocaleString()}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">Number of sessions/conversations started</p>
          </CardContent>
        </Card>
      </div>

      <Card className="border border-border-color-0 shadow-sm">
  <CardHeader className="pb-2">
    <CardTitle className="font-medium text-xl text-gray-900">
      Traffic Over Time
    </CardTitle>
  </CardHeader>

  <CardContent className="pt-4 flex items-center justify-center">
    <ResponsiveContainer width="90%" height={350}>
      <AreaChart data={chartData} margin={{ top: 20, right: 24, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="colorRequests" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#1130C7" stopOpacity={0.35} />
            <stop offset="95%" stopColor="#1130C7" stopOpacity={0.03} />
          </linearGradient>
          <linearGradient id="colorSessions" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#6BC631" stopOpacity={0.30} />
            <stop offset="95%" stopColor="#6BC631" stopOpacity={0.03} />
          </linearGradient>
        </defs>

        {/* Dashed grid (slightly darker) */}
        <CartesianGrid strokeDasharray="5 5" stroke="#94a3b8"   />

        {/* X axis: hide axis line/tick lines, show only 6 labels */}
        <XAxis
          dataKey="time"
          axisLine={false}
          tickLine={false}
          tick={{ fill: "#111111", fontSize: 12 }}
          interval="preserveStartEnd"
          tickCount={6}
          minTickGap={20}
          // interval={0}
           ticks={xTicks}        

        />

        {/* Y axis: hide axis line/tick lines, subtle ticks */}
        <YAxis
          axisLine={false}
          tickLine={false}
          tick={{ fill: "#111111", fontSize: 12 }}
          width={36}
        />

        <Tooltip
          cursor={{ strokeDasharray: "4 6", stroke: "#94a3b8" }}
          contentStyle={{
            backgroundColor: "rgba(255,255,255,0.95)",
            border: "1px solid #e2e8f0",
            borderRadius: "10px",
            boxShadow: "0 8px 24px rgba(15, 23, 42, 0.08)",
          }}
          labelStyle={{ color: "#0f172a", fontWeight: 600 }}
          itemStyle={{ color: "#334155" }}
        />
        <Legend
  iconType="circle"
  wrapperStyle={{
    paddingTop: 14,
    color: "#334155",
    fontSize: 12,
  }}
  formatter={(value) => (
    <span style={{ color: "#334155", fontWeight: 400 }}>
      {value}
    </span>
  )}
/>


        <Area
          type="monotone"
          dataKey="requests"
          stroke="#3b82f6"
          fill="url(#colorRequests)"
          strokeWidth={2}
          dot={false}
          name="Requests"
        />
        <Area
          type="monotone"
          dataKey="sessions"
          stroke="#22c55e"
          fill="url(#colorSessions)"
          strokeWidth={2}
          dot={false}
          name="Sessions"
        />
      </AreaChart>
    </ResponsiveContainer>
  </CardContent>
</Card>

    </div>
  );
};

export default TrafficMetricsDashboard;