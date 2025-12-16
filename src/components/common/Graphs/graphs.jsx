import React from 'react';
import { Area, AreaChart, Line, LineChart, Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Double Area Chart Component
export const DoubleAreaChart = ({
  data,
  dataKey1,
  dataKey2,
  timeKey = 'time',
  name1 = 'Series 1',
  name2 = 'Series 2',
  color1 = '#3b82f6',
  color2 = '#22c55e',
  height = 350,
  width = '90%',
  showGrid = true,
  showLegend = true,
  showDots = false,
  strokeWidth = 2,
  gradientOpacity1 = { start: 0.35, end: 0.03 },
  gradientOpacity2 = { start: 0.30, end: 0.03 },
  xAxisTicks,
  margin = { top: 20, right: 24, left: 0, bottom: 0 }
}) => {
  return (
    <ResponsiveContainer width={width} height={height}>
      <AreaChart data={data} margin={margin}>
        <defs>
          <linearGradient id={`gradient1-${dataKey1}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={color1} stopOpacity={gradientOpacity1.start} />
            <stop offset="95%" stopColor={color1} stopOpacity={gradientOpacity1.end} />
          </linearGradient>
          <linearGradient id={`gradient2-${dataKey2}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={color2} stopOpacity={gradientOpacity2.start} />
            <stop offset="95%" stopColor={color2} stopOpacity={gradientOpacity2.end} />
          </linearGradient>
        </defs>

        {showGrid && <CartesianGrid strokeDasharray="5 5" stroke="#94a3b8" />}

        <XAxis
          dataKey={timeKey}
          axisLine={false}
          tickLine={false}
          tick={{ fill: "#111111", fontSize: 12 }}
          ticks={xAxisTicks}
        />

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

        {showLegend && (
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
        )}

        <Area
          type="monotone"
          dataKey={dataKey1}
          stroke={color1}
          fill={`url(#gradient1-${dataKey1})`}
          strokeWidth={strokeWidth}
          dot={showDots}
          name={name1}
        />
        <Area
          type="monotone"
          dataKey={dataKey2}
          stroke={color2}
          fill={`url(#gradient2-${dataKey2})`}
          strokeWidth={strokeWidth}
          dot={showDots}
          name={name2}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

// Single Area Chart Component
export const SingleAreaChart = ({
  data,
  dataKey,
  timeKey = 'time',
  name = 'Series',
  color = '#3b82f6',
  height = 350,
  width = '90%',
  showGrid = true,
  showLegend = true,
  showDots = false,
  strokeWidth = 2,
  gradientOpacity = { start: 0.8, end: 0.2 },
  stacked = false,
  xAxisTicks,
  margin = { top: 20, right: 24, left: 0, bottom: 0 }
}) => {
  return (
    <ResponsiveContainer width={width} height={height}>
      <AreaChart data={data} margin={margin}>
        <defs>
          <linearGradient id={`gradient-${dataKey}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={color} stopOpacity={gradientOpacity.start} />
            <stop offset="50%" stopColor={color} stopOpacity={(gradientOpacity.start + gradientOpacity.end) / 2} />
            <stop offset="95%" stopColor={color} stopOpacity={gradientOpacity.end} />
          </linearGradient>
        </defs>

        {showGrid && <CartesianGrid strokeDasharray="5 5" stroke="#94a3b8" />}

        <XAxis
          dataKey={timeKey}
          stroke="#64748b"
          style={{ fontSize: '12px' }}
          ticks={xAxisTicks}
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

        {showLegend && (
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
        )}

        <Area
          type="monotone"
          dataKey={dataKey}
          stackId={stacked ? "1" : undefined}
          stroke={color}
          strokeWidth={strokeWidth}
          fill={`url(#gradient-${dataKey})`}
          name={name}
          dot={showDots ? { r: 3, fill: color, strokeWidth: 2, stroke: '#fff' } : false}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

// Line Chart Component
export const CustomLineChart = ({
  data,
  lines = [{ dataKey: 'value', name: 'Value', color: '#3b82f6' }],
  timeKey = 'time',
  height = 400,
  width = '90%',
  showGrid = true,
  showLegend = true,
  strokeWidth = 2,
  dotSize = 4,
  activeDotSize = 6,
  yAxisDomain,
  yAxisTicks,
  yAxisFormatter,
  tooltipFormatter,
  xAxisTicks,
  margin = { top: 20, right: 24, left: 0, bottom: 0 }
}) => {
  return (
    <ResponsiveContainer width={width} height={height}>
      <LineChart data={data} margin={margin}>
        {showGrid && <CartesianGrid strokeDasharray="5 5" stroke="#94a3b8" />}

        <XAxis
          dataKey={timeKey}
          stroke="#64748b"
          style={{ fontSize: '14px' }}
          ticks={xAxisTicks}
        />

        <YAxis
          stroke="#64748b"
          style={{ fontSize: '14px' }}
          domain={yAxisDomain}
          ticks={yAxisTicks}
          tickFormatter={yAxisFormatter}
        />

        <Tooltip
          contentStyle={{
            backgroundColor: '#fff',
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
          }}
          formatter={tooltipFormatter}
        />

        {showLegend && (
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
        )}

        {lines.map((line, index) => (
          <Line
            key={index}
            type="monotone"
            dataKey={line.dataKey}
            stroke={line.color}
            strokeWidth={strokeWidth}
            name={line.name}
            dot={{ r: dotSize }}
            activeDot={{ r: activeDotSize }}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
};

// Bar Chart Component
export const CustomBarChart = ({
  data,
  bars = [{ dataKey: 'value', name: 'Value', color: '#3b82f6' }],
  timeKey = 'time',
  height = 350,
  width = '90%',
  showGrid = true,
  showLegend = true,
  barSize,
  radius = [8, 8, 0, 0],
  xAxisTicks,
  yAxisFormatter,
  tooltipFormatter,
  margin = { top: 20, right: 24, left: 0, bottom: 0 }
}) => {
  return (
    <ResponsiveContainer width={width} height={height}>
      <BarChart data={data} margin={margin}>
        {showGrid && <CartesianGrid strokeDasharray="5 5" stroke="#94a3b8" />}

        <XAxis
          dataKey={timeKey}
          stroke="#64748b"
          style={{ fontSize: '12px' }}
          ticks={xAxisTicks}
        />

        <YAxis
          stroke="#64748b"
          style={{ fontSize: '12px' }}
          tickFormatter={yAxisFormatter}
        />

        <Tooltip
          contentStyle={{
            backgroundColor: '#fff',
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
          }}
          formatter={tooltipFormatter}
        />

        {showLegend && (
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
        )}

        {bars.map((bar, index) => (
          <Bar
            key={index}
            dataKey={bar.dataKey}
            fill={bar.color}
            name={bar.name}
            barSize={barSize}
            radius={radius}
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
};

// Demo Component showing all charts
const ChartComponentsDemo = () => {
  const sampleData = [
    { time: '00:00', requests: 120, sessions: 80, cost: 180, latency: 1.5 },
    { time: '04:00', requests: 180, sessions: 95, cost: 140, latency: 1.3 },
    { time: '08:00', requests: 420, sessions: 220, cost: 320, latency: 1.8 },
    { time: '12:00', requests: 480, sessions: 250, cost: 350, latency: 2.1 },
    { time: '16:00', requests: 350, sessions: 180, cost: 320, latency: 1.9 },
    { time: '20:00', requests: 280, sessions: 140, cost: 280, latency: 1.6 },
  ];

  return (
    <div className="p-8 space-y-12 bg-gray-50 min-h-screen">
      <div>
        <h1 className="text-3xl font-bold mb-2">Reusable Chart Components</h1>
        <p className="text-gray-600">Four customizable chart components for your dashboard</p>
      </div>

      {/* Double Area Chart */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Double Area Chart</h2>
        <DoubleAreaChart
          data={sampleData}
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
          data={sampleData}
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
          data={sampleData}
          lines={[
            { dataKey: 'requests', name: 'Requests', color: '#3b82f6' },
            { dataKey: 'sessions', name: 'Sessions', color: '#22c55e' },
            { dataKey: 'latency', name: 'Latency', color: '#f97316' }
          ]}
          yAxisFormatter={(value) => value.toFixed(0)}
          tooltipFormatter={(value) => value.toFixed(2)}
        />
      </div>

      {/* Bar Chart */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Bar Chart</h2>
        <CustomBarChart
          data={sampleData}
          bars={[
            { dataKey: 'requests', name: 'Requests', color: '#3b82f6' },
            { dataKey: 'sessions', name: 'Sessions', color: '#22c55e' }
          ]}
          barSize={40}
        />
      </div>

      {/* Usage Example */}
      <div className="bg-gray-800 text-white p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Usage Example</h2>
        <pre className="text-sm overflow-x-auto">
{`import { 
  DoubleAreaChart, 
  SingleAreaChart, 
  CustomLineChart, 
  CustomBarChart 
} from './ChartComponents';

// Double Area Chart
<DoubleAreaChart
  data={data}
  dataKey1="requests"
  dataKey2="sessions"
  name1="Requests"
  name2="Sessions"
  color1="#1130C7"
  color2="#6BC631"
  height={350}
/>

// Single Area Chart
<SingleAreaChart
  data={data}
  dataKey="cost"
  name="Cost"
  color="#8b5cf6"
  showDots={true}
/>

// Line Chart
<CustomLineChart
  data={data}
  lines={[
    { dataKey: 'value1', name: 'Series 1', color: '#3b82f6' },
    { dataKey: 'value2', name: 'Series 2', color: '#22c55e' }
  ]}
/>

// Bar Chart
<CustomBarChart
  data={data}
  bars={[
    { dataKey: 'value', name: 'Sales', color: '#3b82f6' }
  ]}
  barSize={40}
/>`}
        </pre>
      </div>
    </div>
  );
};

export default ChartComponentsDemo;