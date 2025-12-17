"use client"
import { CustomBarChart, CustomLineChart, CustomPieChart, DoubleAreaChart } from "@/components/common/Graphs/graphs";
import { useMemo } from "react";

export default function GraphDemo() {
  // Static data for demo
  const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
  const staticData = useMemo(() => {
    const now = Date.now();
    return Array.from({ length: 20 }, (_, i) => ({
      time: now - (19 - i) * 3000,
      value1: 30 + Math.random() * 40,
      value2: 50 + Math.random() * 30,
      timeLabel: new Date(now - (19 - i) * 3000).toLocaleTimeString([], { 
        minute: "2-digit", 
        second: "2-digit" 
      }),
    }));
  }, []);

   const chartData = [
  { month: "January", desktop: 156 },
  { month: "February", desktop: 116 },
  { month: "March", desktop: 130 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 190 },
  { month: "June", desktop: 114 },
  { month: "July", desktop: 146 },
  { month: "August", desktop: 89 },
];

  // Pie chart data
  const pieData = [
    { name: "Success", value: 81.2 },
    { name: "Failed", value: 18.8 },
  ];

  return (
    // <div style={{ padding: "24px", maxWidth: "1200px", margin: "0 auto" }}>
    //   <h1 style={{ fontSize: "28px", fontWeight: 700, marginBottom: "32px", color: "#0f172a" }}>
    //     Reusable Graph Components
    //   </h1>

    //   {/* Static Double Area Chart */}
    //   <div style={{ marginBottom: "48px" }}>
    //     <h2 style={{ fontSize: "20px", fontWeight: 600, marginBottom: "16px", color: "#334155" }}>
    //       Static Double Area Chart
    //     </h2>
    //     <DoubleAreaChart
    //       data={staticData}
    //       dataKey1="value1"
    //       dataKey2="value2"
    //       name1="Series 1"
    //       name2="Series 2"
    //       color1="#3b82f6"
    //       color2="#22c55e"
    //     />
    //   </div>

    //   {/* Live Double Area Chart */}
    //   <div style={{ marginBottom: "48px" }}>
    //     <h2 style={{ fontSize: "20px", fontWeight: 600, marginBottom: "16px", color: "#334155" }}>
    //       Live Double Area Chart
    //     </h2>
    //     <DoubleAreaChart
    //       live={true}
    //       dataKey1="value1"
    //       dataKey2="value2"
    //       name1="Live Series 1"
    //       name2="Live Series 2"
    //       makePoint={(now) => ({
    //         time: now.getTime(),
    //         value1: clamp(30 + Math.random() * 40, 0, 100),
    //         value2: clamp(50 + Math.random() * 30, 0, 100),
    //       })}
    //       maxPoints={20}
    //       updateMs={3000}
    //     />
    //   </div>

    //   {/* Static Line Chart */}
    //   <div style={{ marginBottom: "48px" }}>
    //     <h2 style={{ fontSize: "20px", fontWeight: 600, marginBottom: "16px", color: "#334155" }}>
    //       Static Line Chart
    //     </h2>
    //     <CustomLineChart
    //       data={staticData}
    //       lines={[
    //         { dataKey: "value1", name: "Metric 1", color: "#3b82f6" },
    //         { dataKey: "value2", name: "Metric 2", color: "#22c55e" },
    //       ]}
    //     />
    //   </div>

    //   {/* Live Bar Chart */}
    //   <div style={{ marginBottom: "48px" }}>
    //     <h2 style={{ fontSize: "20px", fontWeight: 600, marginBottom: "16px", color: "#334155" }}>
    //       Live Bar Chart
    //     </h2>
    //     <CustomBarChart
    //       live={true}
    //       timeKey="timeLabel"
    //       bars={[
    //         { dataKey: "value1", name: "Requests", color: "#3b82f6" },
    //         { dataKey: "value2", name: "Sessions", color: "#22c55e" },
    //       ]}
    //       makePoint={(now) => ({
    //         time: now.getTime(),
    //         timeLabel: now.toLocaleTimeString([], { minute: "2-digit", second: "2-digit" }),
    //         value1: clamp(Math.round(200 + (Math.random() * 2 - 1) * 120), 100, 600),
    //         value2: clamp(Math.round(90 + (Math.random() * 2 - 1) * 60), 40, 300),
    //       })}
    //       maxPoints={12}
    //       updateMs={3000}
    //     />
    //   </div>

    //   {/* Static Pie Chart */}
    //   <div style={{ marginBottom: "48px" }}>
    //     <h2 style={{ fontSize: "20px", fontWeight: 600, marginBottom: "16px", color: "#334155" }}>
    //       Static Pie Chart (Donut Style)
    //     </h2>
    //     <CustomPieChart
    //       data={pieData}
    //       colors={["#22c55e", "#ef4444"]}
    //       innerRadius={70}
    //       outerRadius={100}
    //       paddingAngle={5}
    //     />
    //   </div>

    //   <div style={{ 
    //     marginTop: "48px", 
    //     padding: "20px", 
    //     backgroundColor: "#f1f5f9", 
    //     borderRadius: "12px",
    //     fontSize: "14px",
    //     color: "#475569"
    //   }}>
    //     <h3 style={{ fontSize: "16px", fontWeight: 600, marginBottom: "12px", color: "#334155" }}>
    //       Usage Guide
    //     </h3>
    //     <p style={{ marginBottom: "8px" }}>
    //       <strong>Static Mode:</strong> Pass your data via the <code>data</code> prop.
    //     </p>
    //     <p>
    //       <strong>Live Mode:</strong> Set <code>live={"{true}"}</code> and provide a <code>makePoint</code> function 
    //       that generates data points. The chart will automatically update every <code>updateMs</code> milliseconds.
    //     </p>
    //   </div>
    // </div>
<div className="w-full h-fit bg-sidebar-accent rounded-xl overflow-hidden">
  <div className="w-full px-6 pt-8 pb-4">
    <CustomBarChart
      data={chartData}
      timeKey="month"
      bars={[
        {
          dataKey: "desktop",
          name: "Desktop",
          color: "#3b82f6",
        },
      ]}
      height={140}
      width="100%"
      barSize={30}
      radius={[5, 5, 0, 0]}
      showGrid={false}
      showLegend={false}
      margin={{ top: 10, right: 10, bottom: 25, left: 10 }}
      barCategoryGap="15%"
      barGap={4}
      animation={{
        isAnimationActive: true,
        animationDuration: 600,
        animationEasing: "ease-out",
      }}
    />
  </div>
</div>
    
  );
}