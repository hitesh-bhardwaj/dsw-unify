import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const SuccessMetricsDashboard = () => {
  const [successTotal, setSuccessTotal] = useState(15084);
  const [successRate, setSuccessRate] = useState(99.4);
  
  const [successData, setSuccessData] = useState([
    { time: '00:00', rate: 96.2 },
    { time: '04:00', rate: 95.8 },
    { time: '08:00', rate: 96.5 },
    { time: '12:00', rate: 97.8 },
    { time: '16:00', rate: 98.2 },
    { time: '20:00', rate: 99.5 },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      // Update metrics with random variations
      setSuccessTotal(prev => Math.max(14000, Math.min(17000, prev + Math.floor(Math.random() * 200 - 100))));
      setSuccessRate(prev => Math.max(95, Math.min(99.9, prev + (Math.random() * 0.4 - 0.2))));

      // Update chart data
      setSuccessData(prevData => 
        prevData.map(item => ({
          ...item,
          rate: Math.max(95, Math.min(100, item.rate + (Math.random() * 0.6 - 0.3))),
        }))
      );
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full py-3">
      <div className="space-y-3">
        <div className='space-y-3'>
          <h1 className="text-2xl font-medium ">Success Metrics</h1>
          <p className="text-sm text-foreground/80">Successful outcomes of agent interactions</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="!pb-0 !py-7">
            <CardContent className='!space-y-5'>
              <div className="text-sm font-medium "> Agent Success Total</div>
              <div className="text-4xl font-bold text-badge-green ">{successTotal.toLocaleString()}</div>
              <p className="text-sm ">Count of successful agent responses</p>
            </CardContent>
          </Card>

          <Card className="!pb-0 !py-7">
            <CardContent  className='!space-y-5'>
              <div className="text-sm font-medium "> Success Rate</div>
              <div className="text-4xl font-bold text-badge-green">{successRate.toFixed(1)}%</div>
              <p className="text-sm ">Percentage of successful responses</p>
            </CardContent>
          </Card>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">Success Rate Over Time</CardTitle>
          </CardHeader>
          <CardContent className='pt-4 flex items-center justify-center'>
            <ResponsiveContainer width="90%" height={400}>
              <AreaChart data={successData}>
                <defs>
                  <linearGradient id="successGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8}/>
                    <stop offset="50%" stopColor="#86efac" stopOpacity={0.6}/>
                    <stop offset="95%" stopColor="#dcfce7" stopOpacity={0.3}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="5 5" stroke="#94a3b8"  />
                <XAxis 
                  dataKey="time" 
                  stroke="#64748b"
                  style={{ fontSize: '14px' }}
                />
                <YAxis 
                  stroke="#64748b"
                  style={{ fontSize: '14px' }}
                  domain={[90, 100]}
                  ticks={[90, 93, 96, 100]}
                  tickFormatter={(value) => `${value}%`}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#fff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                  }}
                  formatter={(value) => `${value.toFixed(1)}%`}
                  labelStyle={{ color: '#475569' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="rate" 
                  stroke="#22c55e" 
                  strokeWidth={2}
                  fill="url(#successGradient)"
                  dot={{ r: 4, fill: '#22c55e', strokeWidth: 2, stroke: '#fff' }}
                  activeDot={{ r: 6, fill: '#22c55e', strokeWidth: 2, stroke: '#fff' }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SuccessMetricsDashboard;