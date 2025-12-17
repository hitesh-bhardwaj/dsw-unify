"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Area,
  AreaChart,
  Line,
  LineChart,
  Bar,
  BarChart,
  Pie,
  PieChart,
  Cell,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// ==================== HELPERS ====================

// IMPORTANT: time values are numeric timestamps (ms)
export const formatTimeHHMMSS = (v) => {
  const d = new Date(v);
  return d.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
};

const defaultAnim = {
  isAnimationActive: true,
  animationDuration: 650,
  animationEasing: "ease-out",
};

// ==================== LIVE DATA HOOK (3s default) ====================

/**
 * Live rolling time-series generator (smooth charts):
 * - stores time as number (Date.now())
 * - updates every updateMs (default 3000)
 */
export function useLiveSeries({
  maxPoints = 20,
  updateMs = 3000,
  timeKey = "time",
  makePoint,
  seed = [],
}) {
  const [data, setData] = useState(() => {
    const seeded = Array.isArray(seed) ? seed.slice(-maxPoints) : [];
    if (seeded.length) return seeded;

    const now = Date.now();
    const initial = Array.from({ length: maxPoints }, (_, i) => {
      const t = new Date(now - (maxPoints - 1 - i) * updateMs);
      const p = makePoint?.(t) ?? { value: 0 };
      const timeValue = p?.[timeKey] ?? t.getTime();
      return { ...p, [timeKey]: typeof timeValue === "number" ? timeValue : new Date(timeValue).getTime() };
    });

    return initial;
  });

  const makePointRef = useRef(makePoint);
  useEffect(() => {
    makePointRef.current = makePoint;
  }, [makePoint]);

  useEffect(() => {
    // Skip if makePoint is not provided (static mode)
    if (typeof makePointRef.current !== "function") {
      return;
    }

    const id = setInterval(() => {
      setData((prev) => {
        const nowDate = new Date();
        const raw = makePointRef.current(nowDate) || {};
        const timeValue = raw?.[timeKey] ?? nowDate.getTime();
        const point = {
          ...raw,
          [timeKey]: typeof timeValue === "number" ? timeValue : new Date(timeValue).getTime(),
        };
        const next = [...prev, point];
        return next.slice(-maxPoints);
      });
    }, updateMs);

    return () => clearInterval(id);
  }, [maxPoints, updateMs, timeKey]);

  const ticks = useMemo(() => data.map((d) => d?.[timeKey]).filter((v) => typeof v === "number"), [data, timeKey]);

  return { data, ticks };
}

// ==================== GRAPH COMPONENTS ====================

// Double Area Chart Component
export const DoubleAreaChart = ({
  data: staticData,
  dataKey1,
  dataKey2,
  timeKey = "time",
  name1 = "Series 1",
  name2 = "Series 2",
  color1 = "#3b82f6",
  color2 = "#22c55e",
  height = 350,
  width = "90%",
  showGrid = true,
  showLegend = true,
  showDots = false,
  strokeWidth = 2,
  gradientOpacity1 = { start: 0.8, end: 0.1 },
  gradientOpacity2 = { start: 0.8, end: 0.1 },
  xAxisTicks,
  xAxisTickFormatter = formatTimeHHMMSS,
  margin = { top: 20, right: 24, left: 0, bottom: 0 },
  animation = defaultAnim,
  // Live mode props
  live = false,
  makePoint,
  maxPoints = 20,
  updateMs = 3000,
}) => {
  // Use live data if enabled
  const liveData = useLiveSeries({
    maxPoints,
    updateMs,
    timeKey,
    makePoint: live ? makePoint : undefined,
  });

  const data = live ? liveData.data : staticData;

  const gradient1Id = useMemo(
    () => `gradient1-${dataKey1}-${Math.random().toString(36).slice(2)}`,
    [dataKey1]
  );
  const gradient2Id = useMemo(
    () => `gradient2-${dataKey2}-${Math.random().toString(36).slice(2)}`,
    [dataKey2]
  );

  const generatedTicks = useMemo(() => {
    if (xAxisTicks) return xAxisTicks;
    if (!data?.length) return undefined;
    const times = data.map(d => d?.[timeKey]).filter(v => typeof v === "number");
    if (times.length === 0) return undefined;
    
    const step = Math.max(1, Math.floor(times.length / 5));
    return times.filter((_, i) => i % step === 0).slice(0, 6);
  }, [data, timeKey, xAxisTicks]);

  return (
    <ResponsiveContainer width={width} height={height}>
      <AreaChart data={data} margin={margin}>
        <defs>
          <linearGradient id={gradient1Id} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color1} stopOpacity={gradientOpacity1.start} />
            <stop offset="50%" stopColor={color1} stopOpacity={(gradientOpacity1.start + gradientOpacity1.end) / 2} />
            <stop offset="100%" stopColor={color1} stopOpacity={gradientOpacity1.end} />
          </linearGradient>
          <linearGradient id={gradient2Id} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color2} stopOpacity={gradientOpacity2.start} />
            <stop offset="50%" stopColor={color2} stopOpacity={(gradientOpacity2.start + gradientOpacity2.end) / 2} />
            <stop offset="100%" stopColor={color2} stopOpacity={gradientOpacity2.end} />
          </linearGradient>
        </defs>

        {showGrid && <CartesianGrid strokeDasharray="5 5" stroke="#94a3b8" />}

        <XAxis
          dataKey={timeKey}
          type="number"
          scale="time"
          domain={["dataMin", "dataMax"]}
          ticks={generatedTicks}
          tickFormatter={xAxisTickFormatter}
          axisLine={false}
          tickLine={false}
          tick={{ fill: "#111111", fontSize: 12 }}
        />

        <YAxis axisLine={false} tickLine={false} tick={{ fill: "#111111", fontSize: 12 }} width={36} />

        <Tooltip
          cursor={{ strokeDasharray: "4 6", stroke: "#94a3b8", fill:"transparent" }}
          labelFormatter={xAxisTickFormatter}
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
            wrapperStyle={{ paddingTop: 14, color: "#334155", fontSize: 12 }}
            formatter={(value) => <span style={{ color: "#334155", fontWeight: 400 }} className="dark:!text-foreground">{value}</span>}
          />
        )}

        <Area
          type="monotone"
          dataKey={dataKey1}
          stroke={color1}
          fill={`url(#${gradient1Id})`}
          strokeWidth={strokeWidth}
          dot={showDots}
          name={name1}
          {...animation}
        />
        <Area
          type="monotone"
          dataKey={dataKey2}
          stroke={color2}
          fill={`url(#${gradient2Id})`}
          strokeWidth={strokeWidth}
          dot={showDots}
          name={name2}
          {...animation}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

// Single Area Chart Component
export const SingleAreaChart = ({
  data: staticData,
  dataKey,
  timeKey = "time",
  name = "Series",
  color = "#3b82f6",
  height = 350,
  width = "90%",
  showGrid = true,
  showLegend = true,
  showDots = false,
  strokeWidth = 2,
  gradientOpacity = { start: 0.8, end: 0.2 },
  stacked = false,
  xAxisTicks,
  xAxisTickFormatter = formatTimeHHMMSS,
  margin = { top: 20, right: 24, left: 0, bottom: 0 },
  animation = defaultAnim,
  // Live mode props
  live = false,
  makePoint,
  maxPoints = 20,
  updateMs = 3000,
}) => {
  // Use live data if enabled
  const liveData = useLiveSeries({
    maxPoints,
    updateMs,
    timeKey,
    makePoint: live ? makePoint : undefined,
  });

  const data = live ? liveData.data : staticData;

  const gradientId = useMemo(
    () => `gradient-${dataKey}-${Math.random().toString(36).slice(2)}`,
    [dataKey]
  );

  const generatedTicks = useMemo(() => {
    if (xAxisTicks) return xAxisTicks;
    if (!data?.length) return undefined;
    const times = data.map(d => d?.[timeKey]).filter(v => typeof v === "number");
    if (times.length === 0) return undefined;
    
    const step = Math.max(1, Math.floor(times.length / 5));
    return times.filter((_, i) => i % step === 0).slice(0, 6);
  }, [data, timeKey, xAxisTicks]);

  return (
    <ResponsiveContainer width={width} height={height}>
      <AreaChart data={data} margin={margin}>
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={color} stopOpacity={gradientOpacity.start} />
            <stop
              offset="50%"
              stopColor={color}
              stopOpacity={(gradientOpacity.start + gradientOpacity.end) / 2}
            />
            <stop offset="95%" stopColor={color} stopOpacity={gradientOpacity.end} />
          </linearGradient>
        </defs>

        {showGrid && <CartesianGrid strokeDasharray="5 5" stroke="#94a3b8" />}

        <XAxis
          dataKey={timeKey}
          type="number"
          scale="time"
          domain={["dataMin", "dataMax"]}
          ticks={generatedTicks}
          tickFormatter={xAxisTickFormatter}
          stroke="#64748b"
          style={{ fontSize: "12px" }}
        />

        <YAxis stroke="#64748b" style={{ fontSize: "12px" }} />

        <Tooltip
         cursor={{ fill: "transparent" }}
          labelFormatter={xAxisTickFormatter}
          contentStyle={{
            backgroundColor: "#fff",
            border: "1px solid #e2e8f0",
            borderRadius: "8px",
            boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
          }}
        />

        {showLegend && (
          <Legend
            iconType="circle"
            wrapperStyle={{ paddingTop: 14, color: "#334155", fontSize: 12 }}
            formatter={(value) => <span style={{ color: "#334155", fontWeight: 400 }} className="dark:!text-foreground">{value}</span>}
          />
        )}

        <Area
          type="monotone"
          dataKey={dataKey}
          stackId={stacked ? "1" : undefined}
          stroke={color}
          strokeWidth={strokeWidth}
          fill={`url(#${gradientId})`}
          name={name}
          dot={showDots ? { r: 3, fill: color, strokeWidth: 2, stroke: "#fff" } : false}
          {...animation}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

// Line Chart Component
export const CustomLineChart = ({
  data: staticData,
  lines = [{ dataKey: "value", name: "Value", color: "#3b82f6" }],
  timeKey = "time",
  height = 400,
  width = "90%",
  showGrid = true,
  showLegend = true,
  strokeWidth = 2,
  dotSize = 3,
  activeDotSize = 5,
  yAxisDomain,
  yAxisTicks,
  yAxisFormatter,
  tooltipFormatter,
  xAxisTicks,
  xAxisTickFormatter = formatTimeHHMMSS,
  margin = { top: 20, right: 24, left: 0, bottom: 0 },
  animation = defaultAnim,
  // Live mode props
  live = false,
  makePoint,
  maxPoints = 20,
  updateMs = 3000,
}) => {
  // Use live data if enabled
  const liveData = useLiveSeries({
    maxPoints,
    updateMs,
    timeKey,
    makePoint: live ? makePoint : undefined,
  });

  const data = live ? liveData.data : staticData;

  const generatedTicks = useMemo(() => {
    if (xAxisTicks) return xAxisTicks;
    if (!data?.length) return undefined;
    const times = data.map(d => d?.[timeKey]).filter(v => typeof v === "number");
    if (times.length === 0) return undefined;
    
    const step = Math.max(1, Math.floor(times.length / 5));
    return times.filter((_, i) => i % step === 0).slice(0, 6);
  }, [data, timeKey, xAxisTicks]);

  return (
    <ResponsiveContainer width={width} height={height}>
      <LineChart data={data} margin={margin}>
        {showGrid && <CartesianGrid strokeDasharray="5 5" stroke="#94a3b8" />}

        <XAxis
          dataKey={timeKey}
          type="number"
          scale="time"
          domain={["dataMin", "dataMax"]}
          ticks={generatedTicks}
          tickFormatter={xAxisTickFormatter}
          stroke="#64748b"
          style={{ fontSize: "14px" }}
        />

        <YAxis
          stroke="#64748b"
          style={{ fontSize: "14px" }}
          domain={yAxisDomain}
          ticks={yAxisTicks}
          tickFormatter={yAxisFormatter}
        />

        <Tooltip
         cursor={{ fill: "transparent" }}
          labelFormatter={xAxisTickFormatter}
          contentStyle={{
            backgroundColor: "#fff",
            border: "1px solid #e2e8f0",
            borderRadius: "8px",
            boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
          }}
          formatter={tooltipFormatter}
        />

        {showLegend && (
          <Legend
            iconType="circle"
            wrapperStyle={{ paddingTop: 14, color: "#334155", fontSize: 12 }}
            formatter={(value) => <span style={{ color: "#334155", fontWeight: 400 }} className="dark:!text-foreground">{value}</span>}
          />
        )}

        {lines.map((line, index) => (
          <Line
            key={`${line.dataKey}-${index}`}
            type="monotone"
            dataKey={line.dataKey}
            stroke={line.color}
            strokeWidth={strokeWidth}
            name={line.name}
            dot={{ r: dotSize }}
            activeDot={{ r: activeDotSize }}
            {...animation}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
};

// Bar Chart Component
export const CustomBarChart = ({
  data: staticData,
  bars = [{ dataKey: "value", name: "Value", color: "#3b82f6" }],
  timeKey = "timeLabel",
  height = 350,
  width = "90%",
  showGrid = true,
  showLegend = true,
  barSize,
  radius = [8, 8, 0, 0],
  barCategoryGap = "28%",
  barGap = 6,
  maxXTicks = 6,
  xTickAngle = 0,
  xMinTickGap = 18,
  yAxisFormatter,
  tooltipFormatter,
  margin = { top: 20, right: 24, left: 0, bottom: 0 },
  animation = defaultAnim,
  // Live mode props
  live = false,
  makePoint,
  maxPoints = 20,
  updateMs = 3000,
}) => {
  // Use live data if enabled
  const liveData = useLiveSeries({
    maxPoints,
    updateMs,
    timeKey: live ? "time" : timeKey,
    makePoint: live ? makePoint : undefined,
  });

  const data = live ? liveData.data : staticData;

  const xTicks = useMemo(() => {
    if (!data?.length) return undefined;
    const n = data.length;
    if (n <= maxXTicks) return data.map((d) => d?.[timeKey]).filter(Boolean);

    const idx = Array.from({ length: maxXTicks }, (_, i) =>
      Math.round((i * (n - 1)) / (maxXTicks - 1))
    );

    return Array.from(new Set(idx))
      .map((i) => data[i]?.[timeKey])
      .filter(Boolean);
  }, [data, timeKey, maxXTicks]);

  return (
    <ResponsiveContainer width={width} height={height}>
      <BarChart
        data={data}
        margin={margin}
        barCategoryGap={barCategoryGap}
        barGap={barGap}
      >
        {showGrid && <CartesianGrid strokeDasharray="5 5" stroke="#94a3b8" />}

        <XAxis
          dataKey={timeKey}
          type="category"
          scale="band"
          ticks={xTicks}
          interval="preserveStartEnd"
          minTickGap={xMinTickGap}
          angle={xTickAngle}
          textAnchor={xTickAngle ? "end" : "middle"}
          stroke="#64748b"
          style={{ fontSize: "12px" }}
          tickLine={false}
          axisLine={false}
        />

        <YAxis
          stroke="#64748b"
          style={{ fontSize: "12px" }}
          tickFormatter={yAxisFormatter}
          tickLine={false}
          axisLine={false}
        />

        <Tooltip
          cursor={{ fill: "transparent" }}
          contentStyle={{
            backgroundColor: "#fff",
            border: "1px solid #e2e8f0",
            borderRadius: "8px",
            boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
          }}
          formatter={tooltipFormatter}
        />

        {showLegend && (
          <Legend
            iconType="circle"
            wrapperStyle={{ paddingTop: 14, color: "#334155", fontSize: 12 }}
            formatter={(value) => (
              <span style={{ color: "#334155", fontWeight: 400 }} className="dark:!text-foreground">{value}</span>
            )}
          />
        )}

        {bars.map((bar, index) => (
          <Bar
            key={`${bar.dataKey}-${index}`}
            dataKey={bar.dataKey}
            fill={bar.color}
            name={bar.name}
            barSize={barSize}
            radius={radius}
            {...animation}
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
};

// Pie Chart Component
export const CustomPieChart = ({
  data,
  nameKey = "name",
  valueKey = "value",
  colors = ["#3b82f6", "#22c55e", "#f59e0b"],
  height = 350,
  width = "90%",
  showLegend = true,
  innerRadius = 70,
  outerRadius = 100,
  paddingAngle = 5,
  showLabels = true,
  labelPosition = "outside",
  labelFormatter = (entry) => `${entry.value}%`,
  margin = { top: 20, right: 24, left: 24, bottom: 20 },
  strokeWidth = 0,
  startAngle = 90,
  endAngle = -270,
}) => {
  const renderCustomLabel = ({
    cx,
    cy,
    midAngle,
    outerRadius,
    percent,
    value,
  }) => {
    const RADIAN = Math.PI / 180;
    const radius = outerRadius + 30;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="#334155"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        style={{ fontSize: "16px", fontWeight: 600 }}
      >
        {`${value}%`}
      </text>
    );
  };

  return (
    <ResponsiveContainer width={width} height={height}>
      <PieChart margin={margin}>
        <Pie
          data={data}
          dataKey={valueKey}
          nameKey={nameKey}
          cx="50%"
          cy="50%"
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          paddingAngle={paddingAngle}
          startAngle={startAngle}
          endAngle={endAngle}
          label={showLabels ? renderCustomLabel : false}
          labelLine={false}
          stroke="none"
          strokeWidth={strokeWidth}
        >
          {data.map((entry, index) => (
            <Cell 
              key={`cell-${index}`} 
              fill={colors[index % colors.length]}
            />
          ))}
        </Pie>

        <Tooltip
          contentStyle={{
            backgroundColor: "#fff",
            border: "1px solid #e2e8f0",
            borderRadius: "8px",
            boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
          }}
          formatter={(value) => `${value}%`}
        />

        {showLegend && (
          <Legend
            iconType="circle"
            wrapperStyle={{ paddingTop: 14, color: "#334155", fontSize: 12 }}
            formatter={(value) => (
              <span style={{ color: "#334155", fontWeight: 400 }} className="dark:!text-foreground">
                {value}
              </span>
            )}
          />
        )}
      </PieChart>
    </ResponsiveContainer>
  );
};