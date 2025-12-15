import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const GuardrailsDashboard = () => {
  const [preInference, setPreInference] = useState(156);
  const [postInference, setPostInference] = useState(43);
  const [avgLatency, setAvgLatency] = useState(0.112);
  const [chartData, setChartData] = useState([
    { time: '00:00', preInference: 110, postInference: 45 },
    { time: '04:00', preInference: 65, postInference: 25 },
    { time: '08:00', preInference: 250, postInference: 95 },
    { time: '12:00', preInference: 380, postInference: 145 },
    { time: '16:00', preInference: 190, postInference: 75 },
    { time: '20:00', preInference: 115, postInference: 50 },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      // Update metrics with random variations
      setPreInference(prev => Math.max(50, Math.min(300, prev + Math.floor(Math.random() * 40) - 20)));
      setPostInference(prev => Math.max(20, Math.min(150, prev + Math.floor(Math.random() * 20) - 10)));
      setAvgLatency(prev => Math.max(0.08, Math.min(0.2, prev + (Math.random() * 0.02 - 0.01))));

      // Update chart data
      setChartData(prevData => 
        prevData.map(item => ({
          ...item,
          preInference: Math.max(50, Math.min(400, item.preInference + Math.floor(Math.random() * 60) - 30)),
          postInference: Math.max(20, Math.min(180, item.postInference + Math.floor(Math.random() * 30) - 15)),
        }))
      );
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full py-3">
      <div className=" space-y-6">
        <div>
          <h1 className="text-2xl font-medium  mb-2">Guardrails & Safety Metrics</h1>
          <p className="text-foreground/80 text-sm">Safety and policy enforcement monitoring</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="!pb-0 !py-7">
            <CardContent className='!space-y-5'>
              <div className="text-sm font-medium ">Pre-Inference Triggers</div>
              <div className="text-4xl font-bold text-primary">{preInference}</div>
              <p className="text-sm text-foreground/80">Requests blocked by pre-inference guardrails</p>
            </CardContent>
          </Card>

          <Card className="!pb-0 !py-7">
            <CardContent className='!space-y-5'>
              <div className="text-sm font-medium ">Post-Inference Triggers</div>
              <div className="text-4xl font-bold text-red">{postInference}</div>
              <p className="text-sm text-foreground/80">Requests blocked by post-inference guardrails</p>
            </CardContent>
          </Card>

          <Card className="!pb-0 !py-7">
            <CardContent className='!space-y-5'>
              <div className="text-sm font-medium ">Avg Guardrail Latency</div>
              <div className="text-4xl font-bold text-[#111111]">{avgLatency.toFixed(3)}s</div>
              <p className="text-sm text-foreground/80">Time spent in guardrail checks</p>
            </CardContent>
          </Card>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">Guardrail Activity Over Time</CardTitle>
          </CardHeader>
          <CardContent className='pt-4 flex items-center justify-center'>
            <ResponsiveContainer width="90%" height={400}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="5 5" stroke="#94a3b8"  />
                <XAxis 
                  dataKey="time" 
                  stroke="#64748b"
                  style={{ fontSize: '14px' }}
                />
                <YAxis 
                  stroke="#64748b"
                  style={{ fontSize: '14px' }}
                />
                <Tooltip 
                cursor={{ fill: 'transparent' }}
                  contentStyle={{ 
                    backgroundColor: '#fff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                  }}
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
                <Bar 
                  dataKey="preInference" 
                  fill="#f97316" 
                  name="Pre-Inference"
                  radius={[4, 4, 0, 0]}
                />
                <Bar 
                  dataKey="postInference" 
                  fill="#ef4444" 
                  name="Post-Inference"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GuardrailsDashboard;