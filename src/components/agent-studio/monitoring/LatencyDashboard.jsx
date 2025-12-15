import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const LatencyDashboard = () => {
  const [endToEnd, setEndToEnd] = useState(1.85);
  const [processing, setProcessing] = useState(0.78);
  const [toolInvocation, setToolInvocation] = useState(0.42);
  const [chartData, setChartData] = useState([
    { time: '00:00', endToEnd: 1.65, processing: 0.55, toolInvocation: 0.25 },
    { time: '04:00', endToEnd: 1.58, processing: 0.58, toolInvocation: 0.32 },
    { time: '08:00', endToEnd: 1.62, processing: 0.65, toolInvocation: 0.35 },
    { time: '12:00', endToEnd: 2.15, processing: 1.05, toolInvocation: 0.45 },
    { time: '16:00', endToEnd: 2.05, processing: 1.08, toolInvocation: 0.42 },
    { time: '20:00', endToEnd: 1.68, processing: 0.62, toolInvocation: 0.38 },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      // Update metrics with random variations
      setEndToEnd(prev => Math.max(1.2, Math.min(2.5, prev + (Math.random() * 0.2 - 0.1))));
      setProcessing(prev => Math.max(0.4, Math.min(1.2, prev + (Math.random() * 0.1 - 0.05))));
      setToolInvocation(prev => Math.max(0.2, Math.min(0.6, prev + (Math.random() * 0.08 - 0.04))));

      // Update chart data
      setChartData(prevData => 
        prevData.map(item => ({
          ...item,
          endToEnd: Math.max(1.2, Math.min(2.5, item.endToEnd + (Math.random() * 0.15 - 0.075))),
          processing: Math.max(0.4, Math.min(1.2, item.processing + (Math.random() * 0.1 - 0.05))),
          toolInvocation: Math.max(0.2, Math.min(0.6, item.toolInvocation + (Math.random() * 0.06 - 0.03))),
        }))
      );
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full py-3">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-medium  mb-2">Latency & Performance Metrics</h1>
          <p className="text-foreground/80">Speed and efficiency of agent responses</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="!pb-0 !py-7">
            <CardContent className='!space-y-5'>
              <div className="text-sm font-medium "> End-to-End Latency </div>
              <div className="text-4xl font-medium">{endToEnd.toFixed(2)}s</div>
              <p className="text-sm text-slate-500">Total time from request to response</p>
            </CardContent>
          </Card>

          <Card className="!pb-0 !py-7">
            <CardContent className='!space-y-5'>
              <div className="text-sm font-medium "> Processing Latency </div>
              <div className="text-4xl font-medium">{processing.toFixed(2)}s</div>
              <p className="text-sm text-slate-500">Time in agent's internal logic</p>
            </CardContent>
          </Card>

          <Card className="!pb-0 !py-7">
            <CardContent className='!space-y-5'>
              <div className="text-sm font-medium "> Tool Invocation Latency </div>
              <div className="text-4xl font-medium">{toolInvocation.toFixed(2)}s</div>
              <p className="text-sm text-slate-500">Latency for tool invocations</p>
            </CardContent>
          </Card>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">Latency Breakdown Over Time</CardTitle>
          </CardHeader>
          <CardContent className='pt-4 flex items-center justify-center'>
            <ResponsiveContainer width="90%" height={400}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="5 5" stroke="#94a3b8"   />
                <XAxis 
                  dataKey="time" 
                  stroke="#64748b"
                  style={{ fontSize: '14px' }}
                />
                <YAxis 
                  stroke="#64748b"
                  style={{ fontSize: '14px' }}
                  domain={[0, 2.5]}
                  ticks={[0, 0.6, 1.1, 1.6, 2.2]}
                  tickFormatter={(value) => `${value.toFixed(1)}s`}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#fff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                  }}
                  formatter={(value) => `${value.toFixed(2)}s`}
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
                <Line 
                  type="monotone" 
                  dataKey="endToEnd" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  name="End-to-End"
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="processing" 
                  stroke="#22c55e" 
                  strokeWidth={2}
                  name="Processing"
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="toolInvocation" 
                  stroke="#f97316" 
                  strokeWidth={2}
                  name="Tool Invocation"
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LatencyDashboard;