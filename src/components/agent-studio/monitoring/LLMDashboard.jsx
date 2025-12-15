import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const LLMDashboard = () => {
  const [inferenceLatency, setInferenceLatency] = useState(1.20);
  const [inputTokens, setInputTokens] = useState(251508);
  const [outputTokens, setOutputTokens] = useState(137905);
  const [totalCost, setTotalCost] = useState(48.16);
  
  const [tokenData, setTokenData] = useState([
    { time: '00:00', inputTokens: 120, outputTokens: 80 },
    { time: '04:00', timeValue: 4, inputTokens: 180, outputTokens: 95 },
    { time: '08:00', timeValue: 8, inputTokens: 420, outputTokens: 220 },
    { time: '12:00', timeValue: 12, inputTokens: 480, outputTokens: 250 },
    { time: '16:00', timeValue: 16, inputTokens: 350, outputTokens: 180 },
    { time: '20:00', timeValue: 20, inputTokens: 280, outputTokens: 140 },
  ]);

  const [costData, setCostData] = useState([
    { time: '00:00', cost: 180 },
    { time: '04:00', cost: 140 },
    { time: '08:00', cost: 120 },
    { time: '12:00', cost: 350 },
    { time: '16:00', cost: 320 },
    { time: '20:00', cost: 280 },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setInferenceLatency(prev => Math.max(0.8, Math.min(2.0, prev + (Math.random() * 0.2 - 0.1))));
      setInputTokens(prev => Math.max(200000, Math.min(350000, prev + Math.floor(Math.random() * 10000 - 5000))));
      setOutputTokens(prev => Math.max(100000, Math.min(200000, prev + Math.floor(Math.random() * 5000 - 2500))));
      setTotalCost(prev => Math.max(30, Math.min(70, prev + (Math.random() * 4 - 2))));

      setTokenData(prevData => 
        prevData.map(item => ({
          ...item,
          inputTokens: Math.max(100, Math.min(600, item.inputTokens + Math.floor(Math.random() * 60 - 30))),
          outputTokens: Math.max(50, Math.min(300, item.outputTokens + Math.floor(Math.random() * 40 - 20))),
        }))
      );

      setCostData(prevData => 
        prevData.map(item => ({
          ...item,
          cost: Math.max(100, Math.min(400, item.cost + Math.floor(Math.random() * 50 - 25))),
        }))
      );
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6 w-full py-3">
      <div className='space-y-2'>
        <h1 className="text-2xl font-medium">LLM & Token Usage Metrics</h1>
        <p className="text-sm text-foreground/80">Language model operational costs and usage</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className=" !pb-0 !py-7 ">
          <CardContent className='!space-y-5'>
            <div className="text-sm font-medium ">LLM Inference Latency</div>
            <div className="text-2xl font-medium ">{inferenceLatency.toFixed(2)}s</div>
            <p className="text-sm ">Average LLM response time</p>
          </CardContent>
        </Card>

        <Card className=" !pb-0 !py-7">
          <CardContent className='!space-y-5'>
            <div className="text-sm font-medium ">Input Tokens</div>
            <div className="text-2xl font-medium ">{inputTokens.toLocaleString()}</div>
            <p className="text-sm text-foreground/80">Total prompt tokens sent</p>
          </CardContent>
        </Card>

        <Card className="!pb-0 !py-7 ">
          <CardContent className='!space-y-5'>
            <div className="text-sm font-medium ">Output Tokens</div>
            <div className="text-2xl font-medium">{outputTokens.toLocaleString()}</div>
            <p className="text-sm text-foreground/80">Total completion tokens generated</p>
          </CardContent>
        </Card>

        <Card className=" !pb-0 !py-7">
          <CardContent className='!space-y-5'>
            <div className="text-sm font-medium ">Total Token Cost</div>
            <div className="text-4xl font-bold text-slate-900 mb-2">${totalCost.toFixed(2)}</div>
            <p className="text-sm text-slate-500">Total LLM usage cost (USD)</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl">Token Usage Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={tokenData}>
                <defs>
                  <linearGradient id="inputGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                    <stop offset="50%" stopColor="#93c5fd" stopOpacity={0.5}/>
                    <stop offset="95%" stopColor="#dbeafe" stopOpacity={0.2}/>
                  </linearGradient>
                  <linearGradient id="outputGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8}/>
                    <stop offset="50%" stopColor="#86efac" stopOpacity={0.5}/>
                    <stop offset="95%" stopColor="#dcfce7" stopOpacity={0.2}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="5 5" stroke="#94a3b8"   />
                <XAxis 
                  dataKey="time" 
                  stroke="#64748b"
                  style={{ fontSize: '12px' }}
                />
                <YAxis 
                  stroke="#64748b"
                  style={{ fontSize: '12px' }}
                />
                <Tooltip 
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
                <Area 
                  type="monotone" 
                  dataKey="inputTokens" 
                  stackId="1"
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  fill="url(#inputGradient)"
                  name="Input Tokens"
                  dot={{ r: 3, fill: '#3b82f6', strokeWidth: 2, stroke: '#fff' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="outputTokens" 
                  stackId="1"
                  stroke="#22c55e" 
                  strokeWidth={2}
                  fill="url(#outputGradient)"
                  name="Output Tokens"
                  dot={{ r: 3, fill: '#22c55e', strokeWidth: 2, stroke: '#fff' }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl">LLM Cost Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={costData}>
                <CartesianGrid strokeDasharray="5 5" stroke="#94a3b8"   />
                <XAxis 
                  dataKey="time" 
                  stroke="#64748b"
                  style={{ fontSize: '12px' }}
                />
                <YAxis 
                  stroke="#64748b"
                  style={{ fontSize: '12px' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#fff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                  }}
                  formatter={(value) => `$${value}`}
                />
                <Line 
                  type="monotone" 
                  dataKey="cost" 
                  stroke="#10b981" 
                  strokeWidth={3}
                  dot={{ r: 4, fill: '#10b981' }}
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

export default LLMDashboard