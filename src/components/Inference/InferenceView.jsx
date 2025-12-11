"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RippleButton } from "@/components/ui/ripple-button";
import AnimatedProgressBar from "@/components/animations/ProgressBar";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { BarChart, Bar } from "recharts";

import Link from "next/link";
import { LeftArrow } from "@/components/Icons";
import { UploadFile } from "@/components/Icons";
import CardDetails from "@/components/CardDetails";
export default function InferenceView() {
  const [mode, setMode] = useState("single");

  const customerIds = [4038, 5386, 8031, 7214, 6285, 8299, 2500];

  const pieData = [
    { name: "Fraud", value: 80 },
    { name: "No Fraud", value: 20 },
  ];

  const featureData = [
    { label: "Transaction Frequency", value: 92 },
    { label: "Claim History", value: 85 },
    { label: "Credit Score", value: 78 },
    { label: "Account Balance", value: 65 },
    { label: "Policy Duration", value: 52 },
  ];

  const chartData = [
    { name: "Mon", noFraud: 80, fraud: 20 },
    { name: "Tue", noFraud: 65, fraud: 28 },
    { name: "Wed", noFraud: 78, fraud: 34 },
    { name: "Thu", noFraud: 72, fraud: 22 },
    { name: "Fri", noFraud: 90, fraud: 30 },
  ];

  const chartData2 = [
    { range: "0.9–1.0", score: 80 },
    { range: "0.8–0.9", score: 50 },
    { range: "0.7–0.8", score: 35 },
    { range: "0.6–0.7", score: 20 },
    { range: "0.5–0.6", score: 8 },
  ];

  const chartConfig = {
    desktop: {
      label: "Value",
      color: "hsl(var(--chart-1))",
    },
  };

  const predictionData = [
    { day: "Mon", desktop: 80 },
    { day: "Tue", desktop: 65 },
    { day: "Wed", desktop: 78 },
    { day: "Thu", desktop: 72 },
    { day: "Fri", desktop: 90 },
  ];

  const fraudData = [
    { day: "Mon", desktop: 20 },
    { day: "Tue", desktop: 28 },
    { day: "Wed", desktop: 34 },
    { day: "Thu", desktop: 22 },
    { day: "Fri", desktop: 30 },
  ];

  const riskData = [
    { day: "Mon", desktop: 75 },
    { day: "Tue", desktop: 58 },
    { day: "Wed", desktop: 70 },
    { day: "Thu", desktop: 65 },
    { day: "Fri", desktop: 85 },
  ];

  const COLORS = ["#6bc631", "#FF050A", "#22c55e"];

  // Values for Single Inference bars
  const confidence = 89.5;
  const riskScore = 23.4;

  // trigger animation
  const [playKey, setPlayKey] = useState(0);

  const stats = [
    {
      title: "Total Inferences",
      value: "1,000",
      description: "+12.5% from last week",
    },
    {
      title: "Fraud Detection Rate",
      value: "18.8%",
      description: "188 cases flagged",
    },
    {
      title: "Avg Confidence",
      value: "94.2%",
      description: "High reliability",
    },
    {
      title: "Avg Response Time",
      value: "0.08s",
      description: "Within SLA",
    },
  ];

  return (
    <div className="w-full flex flex-col gap-6">
      <RadioGroup
        value={mode}
        onValueChange={setMode}
        className="flex items-center justify-between gap-4"
      >
        {/* Single */}
        <div
          className={`flex items-center w-1/3  gap-4 border rounded-lg p-4 cursor-pointer transition
        ${mode === "single" ? "text-primary" : "border-border"}
      `}
          onClick={() => setMode("single")}
        >
          <RadioGroupItem value="single" id="single" className="cursor-pointer" />
          <Label htmlFor="single" className="cursor-pointer">Single Inference</Label>
        </div>

        {/* Batch */}
        <div
          className={`flex items-center gap-4 w-1/3 border rounded-lg p-4 cursor-pointer transition
        ${mode === "batch" ? "text-primary " : "border-border"}
      `}
          onClick={() => setMode("batch")}
        >
          <RadioGroupItem value="batch" id="batch" className="cursor-pointer" />
          <Label htmlFor="batch" className="cursor-pointer">Batch Inference</Label>
        </div>

        {/* Insights */}
        <div
          className={`flex items-center gap-4 w-1/3 border rounded-lg p-4 cursor-pointer transition
        ${mode === "insights" ? "text-primary" : "border-border"}
      `}
          onClick={() => setMode("insights")}
        >
          <RadioGroupItem value="insights" id="insights" className="cursor-pointer" />
          <Label htmlFor="insights" className="cursor-pointer">Inference Insights</Label>
        </div>
      </RadioGroup>

      <AnimatePresence mode="wait">


       {/* BATCH INFERENCE */}
           
 
        {mode === "batch" && (
          <motion.div
            key="batch"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-2 gap-6 w-full"
          >
            <div className="border rounded-xl p-6 flex flex-col gap-6">
              <h2 className="text-lg font-medium">Configure Inference</h2>

              <div className="flex items-center gap-4">
                <Input placeholder="By ID" className="w-full" />
                <Input placeholder="By Date" className="w-full" />
              </div>

              <h2 className="text-sm font-medium">
                Upload CSV <span className="font-normal">(Transaction ID)</span>
              </h2>

              <div className="border rounded-xl h-48 flex flex-col justify-center items-center cursor-pointer">
                <UploadFile className="w-8 h-8 text-foreground/80 mb-5" />
                <span className=" font-medium text-sm mt-3">
                  Click to upload or drag and drop
                </span>
                <span className="text-xs text-foreground/80 mt-1">
                  CSV files only (max 10MB)
                </span>
              </div>

              <div className="w-full flex justify-end ">
                <Link href="#" className="w-fit">
                  <RippleButton>
                    <Button className="bg-sidebar-primary hover:bg-primary text-white gap-3 rounded-full !px-6 !py-6 !cursor-pointer duration-300">
                      Run Batch Inference
                      <LeftArrow className="rotate-180" />
                    </Button>
                  </RippleButton>
                </Link>
              </div>
            </div>

            <div className="border rounded-xl p-6 flex flex-col items-start gap-15 justify-start">
              <h2 className="text-lg font-medium mb-6">
                Batch Processing Status
              </h2>

              <div className="h-48  w-full flex flex-col justify-center items-center">
                <UploadFile className="w-5 h-5 text-foreground/80 mb-2" />
                <span className="text-foreground/80 text-sm">
                  Upload a CSV file and run batch inference
                </span>
              </div>
            </div>
          </motion.div>
        )}

       {/* SINGLE INFERENCE   */}
        {mode === "single" && (
          <motion.div
            key="single"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-2 gap-6 w-full"
          >
            {/* ----- Left Section: Configure Inference ----- */}
            <div className="border rounded-2xl p-6 flex flex-col gap-6">
              <h2 className="text-xl font-medium">Configure Inference</h2>

              <div className="flex items-center gap-4">
                <Input placeholder="By ID" className="w-full" />
                <Input placeholder="By Data" className="w-full" />
              </div>

              <div className="flex flex-col gap-2">
                <Label className="text-sm">Transaction ID</Label>
                <Input placeholder="Enter transaction ID" className="w-full" />
                <span className="text-xs text-foreground/80">
                  Enter a transaction ID to retrieve and analyze
                </span>
              </div>

              <div className="w-full flex justify-end ">
                <Link href="#" className="w-fit">
                  <RippleButton>
                    <Button className="bg-sidebar-primary hover:bg-primary text-white gap-3 rounded-full !px-6 !py-6 !cursor-pointer duration-300">
                      Run Inference
                      <LeftArrow className="rotate-180" />
                    </Button>
                  </RippleButton>
                </Link>
              </div>
            </div>

            {/* ----- Right Section: Prediction Result ----- */}
            <div className="border rounded-2xl p-6 flex flex-col gap-6">
              <h2 className="text-xl font-medium">Prediction Result</h2>

              {/* Prediction badge */}
              <div className="bg-sidebar-accent border rounded-xl p-4 flex flex-col items-center">
                <span className="text-xs text-foreground/80 mb-2">
                  Prediction
                </span>
                <span className="px-4 py-1.5 border border-badge-green rounded-full text-xs">
                  No Fraud
                </span>
              </div>

              {/* Confidence & Risk */}
              <div className="grid grid-cols-2 gap-4">
                {/* Confidence */}
                <div className="border rounded-xl p-4 flex flex-col gap-2">
                  <span className="text-sm text-foreground/80">Confidence</span>
                  <span className="text-2xl font-medium">{confidence}%</span>

                  <AnimatedProgressBar
                    value={confidence}
                    duration={1.2}
                    ease="easeInOut"
                    animateOnMount
                    playKey={playKey}
                    className="w-full"
                    trackClassName="w-full bg-sidebar-accent rounded-full h-2 relative overflow-hidden"
                    barClassName="bg-primary h-full absolute top-0 left-0 z-[5] rounded-full"
                  />
                </div>

                {/* Risk Score */}
                <div className="border rounded-xl p-4 flex flex-col gap-2">
                  <span className="text-sm text-foreground/80">Risk Score</span>
                  <span className="text-2xl font-medium">{riskScore}%</span>

                  <AnimatedProgressBar
                    value={riskScore}
                    duration={1.2}
                    ease="easeInOut"
                    animateOnMount
                    playKey={playKey}
                    className="w-full"
                    trackClassName="w-full bg-sidebar-accent rounded-full h-2 relative overflow-hidden"
                    barClassName="bg-primary h-full absolute top-0 left-0 z-[5] rounded-full"
                  />
                </div>
              </div>

              {/* Timestamp */}
              <span className="text-xs text-foreground/80">
                Analyzed at 19/11/2025, 12:04:26
              </span>
            </div>
          </motion.div>
        )}

        {/* INFERENCE INSIGHTS */}
        {mode === "insights" && (
          <motion.div
            key="insights"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="border rounded-xl p-6 flex flex-col gap-6"
          >
            <CardDetails data={stats} />

            <div className="flex gap-6 ">
              {/* Prediction Distribution Card */}
              <div className="w-1/2 rounded-2xl shadow-sm border border-border-color-0">
                <div className="flex items-center justify-between px-6 pt-6 pb-4">
                  <h2 className="text-xl font-medium ">
                    Prediction Distribution
                  </h2>
                  <span className="text-xs  rounded-full border border-border-color-0 px-3 py-1">
                    Last 7 days
                  </span>
                </div>
                <div className="flex flex-col px-6 pb-6">
                  {/* Donut Chart */}

                  <div className="flex justify-center items-center">
                    <div className="relative w-64 h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={pieData}
                            dataKey="value"
                            nameKey="name"
                            innerRadius={100}
                            outerRadius={115}
                            startAngle={90}
                            endAngle={-270}
                            cornerRadius={50}
                            paddingAngle={6}
                            stroke="none"
                            labelLine={false}
                            label={({
                              cx,
                              cy,
                              midAngle,
                              innerRadius,
                              outerRadius,
                              percent,
                            }) => {
                              const RADIAN = Math.PI / 180;
                              const radius =
                                innerRadius +
                                (outerRadius - innerRadius) * -1.5;
                              const x =
                                cx + radius * Math.cos(-midAngle * RADIAN);
                              const y =
                                cy + radius * Math.sin(-midAngle * RADIAN);

                              return (
                                <text
                                  x={x}
                                  y={y}
                                  fill="#000"
                                  textAnchor="middle"
                                  dominantBaseline="central"
                                  fontSize="12"
                                  fontWeight="500"
                                >
                                  {(percent * 100).toFixed(1)}%
                                </text>
                              );
                            }}
                          >
                            {pieData.map((entry, index) => (
                              <Cell
                                key={`cell-${index}`}
                                fill={COLORS[index]}
                              />
                            ))}
                          </Pie>
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Legend */}
                  <div className="flex flex-col gap-1 mt-8">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <span className="text-sm text-foreground/80">Fraud</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-badge-green"></div>
                      <span className="text-sm text-foreground/80">
                        No Fraud
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Fraud Cases Card */}
              <div className="w-1/2 rounded-2xl shadow-sm border border-border-color-0">
                <div className="flex items-center justify-between px-6 pt-6 pb-4">
                  <h2 className="text-xl font-medium">Recent Fraud Cases</h2>
                  <span className="text-xs px-3 py-1 rounded-full border border-border-color-0">
                    8 flagged
                  </span>
                </div>
                <div className="px-6 pb-6">
                  {/* Table Header */}
                  <div className="bg-sidebar-accent text-center px-4 py-3 rounded-t-lg border border-border-color-0">
                    <span className="text-sm font-medium text-foreground/80">
                      Customer IDs
                    </span>
                  </div>

                  {/* Scrollable Table Rows */}
                  <div className="border-l border-r border-b border-border-color-0 rounded-b-lg overflow-hidden">
                    <div className="max-h-64 overflow-y-auto">
                      {customerIds.map((id, index) => (
                        <div
                          key={id}
                          className={`px-4 py-3 flex justify-center items-center ${
                            index !== customerIds.length - 1
                              ? "border-b border-border-color-0"
                              : ""
                          } hover:bg-sidebar-accent transition-colors`}
                        >
                          <span className="text-sm ">{id}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full flex justify-between gap-6 items-center">
              <div className="border h-[28vw]  w-1/2 border-border-color-0 rounded-2xl p-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xl font-medium text-foreground">
                    Prediction Trends
                  </span>
                  <button className="text-xs px-3 py-1 rounded-full border border-border-color-0 ">
                    Daily
                  </button>
                </div>

                <div className="w-full h-64  bg-sidebar-accent rounded-xl flex items-center justify-center">
                  <ChartContainer
                    config={chartConfig}
                    className="h-full w-full px-6 pt-8"
                  >
                    <BarChart
                      accessibilityLayer
                      data={chartData}
                      margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
                    >
                      <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent hideLabel />}
                      />

                      {/* No Fraud (green) */}
                      <Bar
                        dataKey="noFraud"
                        fill="#7ED957"
                        radius={[5, 5, 0, 0]}
                        barSize={28}
                        animationBegin={0}
                        animationDuration={600}
                        animationEasing="ease-out"
                        className="!rounded-b-0"
                      />

                      {/* Fraud (red) */}
                      <Bar
                        dataKey="fraud"
                        fill="#FF1C1C"
                        radius={[5, 5, 0, 0]}
                        barSize={28}
                        animationBegin={0}
                        animationDuration={600}
                        animationEasing="ease-out"
                        className="!rounded-b-0"
                      />
                    </BarChart>
                  </ChartContainer>
                </div>

                {/* Legend */}
                <div className="flex gap-4 mt-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    Fraud
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-badge-green" />
                    No Fraud
                  </div>
                </div>
              </div>

              {/* ---------------- Risk Score Distribution ---------------- */}
              <div className="border w-1/2 h-[28vw] border-border-color-0 rounded-2xl p-6  shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xl font-medium text-foreground">
                    Risk Score Distribution
                  </span>
                  <button className="text-xs px-3 py-1 rounded-full border border-border-color-0 ">
                    1,000 records
                  </button>
                </div>

                <div className="w-full h-64  bg-sidebar-accent rounded-xl flex items-center justify-center">
                  <ChartContainer
                    config={chartConfig}
                    className="h-full w-full px-6 pt-8"
                  >
                    <BarChart
                      accessibilityLayer
                      data={chartData}
                      margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
                    >
                      <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent hideLabel />}
                      />

                      {/* No Fraud (green) */}
                      <Bar
                        dataKey="noFraud"
                        fill="#2563FB"
                        radius={[5, 5, 0, 0]}
                        barSize={28}
                        animationBegin={0}
                        animationDuration={600}
                        animationEasing="ease-out"
                        className="!rounded-b-0"
                      />

                      {/* Fraud (red) */}
                      <Bar
                        dataKey="fraud"
                        fill="#A6C0FF"
                        radius={[5, 5, 0, 0]}
                        barSize={28}
                        animationBegin={0}
                        animationDuration={600}
                        animationEasing="ease-out"
                        className="!rounded-b-0"
                      />
                    </BarChart>
                  </ChartContainer>
                </div>
              </div>
            </div>

            <div className="w-full flex justify-between gap-6">
              <div className="p-5 border w-1/2 h-[25vw] border-border-color-0 rounded-2xl space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-medium">
                    Top Contributing Features
                  </h2>
                  <span className="text-xs px-3 border border-border-color-0 py-1 rounded-full ">
                    Impact Score
                  </span>
                </div>

                <div className="space-y-4">
                  {featureData.map((item, index) => (
                    <div key={index} className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs font-medium">
                        <span className="text-foreground/80">{item.label}</span>
                        <span className="text-foreground/80">
                          {item.value}%
                        </span>
                      </div>

                      <AnimatedProgressBar
                        value={item.value}
                        duration={1.2}
                        ease="easeInOut"
                        animateOnMount
                        playKey={item.value}
                        className="w-full"
                        trackClassName="w-full bg-sidebar-accent h-2 rounded-full relative overflow-hidden"
                        barClassName="bg-badge-blue h-full absolute top-0 left-0 z-[5] rounded-full"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Card */}
              <div className="p-5 w-1/2 h-[25vw] border border-border-color-0 rounded-2xl space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-medium">
                    Confidence Score Distribution
                  </h2>
                  <span className="text-xs px-3 border border-border-color-0 py-1 rounded-full ">
                    Model Reliability
                  </span>
                </div>

                <ChartContainer
                  config={chartConfig}
                  className="h-64 w-full px-4 py-5 pt-2"
                >
                  <BarChart
                    accessibilityLayer
                    data={chartData2}
                    margin={{ top: 10, right: 0, bottom: 0, left: 0 }}
                  >
                    <ChartTooltip
                      cursor={false}
                      content={<ChartTooltipContent hideLabel />}
                    />

                    <Bar
                      dataKey="score"
                      fill="#f76809"
                      radius={[6, 6, 0, 0]}
                      barSize={45}
                      animationBegin={0}
                      animationDuration={600}
                      animationEasing="ease-out"
                      className="!rounded-b-0"
                    />
                  </BarChart>
                </ChartContainer>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
