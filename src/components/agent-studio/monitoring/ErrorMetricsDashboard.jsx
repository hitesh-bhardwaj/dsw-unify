import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ErrorMetricsDashboard = () => {
  const [agentErrors, setAgentErrors] = useState(51);
  const [llmErrors, setLlmErrors] = useState(31);
  const [toolErrors, setToolErrors] = useState(29);

  const [errorData, setErrorData] = useState([
    { time: '00:00', agentErrors: 95, llmErrors: 55, toolErrors: 45 },
    { time: '04:00', agentErrors: 185, llmErrors: 95, toolErrors: 135 },
    { time: '08:00', agentErrors: 295, llmErrors: 195, toolErrors: 235 },
    { time: '12:00', agentErrors: 95, llmErrors: 55, toolErrors: 55 },
    { time: '16:00', agentErrors: 245, llmErrors: 145, toolErrors: 95 },
    { time: '20:00', agentErrors: 145, llmErrors: 135, toolErrors: 95 },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setAgentErrors(prev => Math.max(30, Math.min(80, prev + Math.floor(Math.random() * 10 - 5))));
      setLlmErrors(prev => Math.max(20, Math.min(60, prev + Math.floor(Math.random() * 8 - 4))));
      setToolErrors(prev => Math.max(15, Math.min(50, prev + Math.floor(Math.random() * 8 - 4))));

      setErrorData(prevData =>
        prevData.map(item => ({
          ...item,
          agentErrors: Math.max(50, Math.min(350, item.agentErrors + Math.floor(Math.random() * 60 - 30))),
          llmErrors: Math.max(30, Math.min(250, item.llmErrors + Math.floor(Math.random() * 50 - 25))),
          toolErrors: Math.max(30, Math.min(250, item.toolErrors + Math.floor(Math.random() * 50 - 25))),
        }))
      );
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6 py-3">
      <div className='space-y-2'>
        <h1 className="text-2xl font-medium">Error Metrics</h1>
        <p className="text-slate-600">Failures across agent, LLM, and integrated tools</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="!pb-0 !py-7">
          <CardContent className='!space-y-5'>
            <div className="text-sm font-medium ">Agent Errors</div>
            <div className="text-4xl font-medium text-red">{agentErrors}</div>
            <p className="text-sm text-slate-500">Failed agent responses</p>
          </CardContent>
        </Card>

        <Card className="!pb-0 !py-7">
          <CardContent className='!space-y-5'>
            <div className="text-sm font-medium ">LLM Errors</div>
            <div className="text-4xl font-medium text-primary">{llmErrors}</div>
            <p className="text-sm text-slate-500">LLM timeouts & failures</p>
          </CardContent>
        </Card>

        <Card className="!pb-0 !py-7">
          <CardContent className='!space-y-5'>
            <div className="text-sm font-medium ">Tool Errors</div>
            <div className="text-4xl font-medium text-badge-yellow">{toolErrors}</div>
            <p className="text-sm ">Tool invocation errors</p>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl">Error Distribution Over Time</CardTitle>
        </CardHeader>
        <CardContent className='pt-4 flex items-center justify-center'>
          <ResponsiveContainer width="90%" height={400}>
            <BarChart data={errorData}>
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
                dataKey="agentErrors"
                fill="#ef4444"
                name="Agent Errors"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="llmErrors"
                fill="#f97316"
                name="LLM Errors"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="toolErrors"
                fill="#eab308"
                name="Tool Errors"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default ErrorMetricsDashboard