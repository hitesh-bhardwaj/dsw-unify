"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AnimatedProgressBar from "@/components/animations/ProgressBar";
import { UploadFile } from "@/components/Icons";
import CardDetails from "@/components/CardDetails";
import { ArrowRight, Upload } from 'lucide-react';
import { CustomBarChart, CustomPieChart } from "../common/Graphs/graphs";
import { getInferenceInsights } from "@/lib/api/ai-studio";

export default function InferenceView({ useCaseId, modelId, versionId }) {
  const [mode, setMode] = useState("single");

  // State for insights data
  const [stats, setStats] = useState([]);
  const [pieData, setPieData] = useState([]);
  const [featureData, setFeatureData] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [chartData2, setChartData2] = useState([]);
  const [riskScoreData, setRiskScoreData] = useState([]);
  const [customerIds, setCustomerIds] = useState([]);
  const [isLoadingInsights, setIsLoadingInsights] = useState(false);

  // State for single inference result
  const [inferenceResult, setInferenceResult] = useState(null);

  // Values for Single Inference bars
  const confidence = inferenceResult?.confidence || 89.5;
  const riskScore = inferenceResult?.riskScore || 23.4;

  // trigger animation
  const [playKey, setPlayKey] = useState(0);

  // Fetch inference insights when in insights mode
  useEffect(() => {
    async function fetchInsights() {
      if (mode !== "insights") return;

      try {
        setIsLoadingInsights(true);

        // Use default mock data for standalone pages (when no real IDs provided)
        const MOCK_INSIGHTS = {
          stats: [
            { title: "Total Inferences", value: "1,000", description: "+12.5% from last week" },
            { title: "Fraud Detection Rate", value: "18.8%", description: "188 cases flagged" },
            { title: "Avg Confidence", value: "94.2%", description: "High reliability" },
            { title: "Avg Response Time", value: "0.08s", description: "Within SLA" },
          ],
          pieData: [
            { name: "Fraud", value: 80 },
            { name: "No Fraud", value: 20 },
          ],
          featureData: [
            { label: "Transaction Frequency", value: 92 },
            { label: "Claim History", value: 85 },
            { label: "Credit Score", value: 78 },
            { label: "Account Balance", value: 65 },
            { label: "Policy Duration", value: 52 },
          ],
          predictionTrends: [
            { name: "Jan 8", noFraud: 200, fraud: 45 },
            { name: "Jan 9", noFraud: 185, fraud: 52 },
            { name: "Jan 10", noFraud: 190, fraud: 55 },
            { name: "Jan 11", noFraud: 170, fraud: 38 },
            { name: "Jan 12", noFraud: 202, fraud: 62 },
            { name: "Jan 13", noFraud: 190, fraud: 42 },
            { name: "Jan 14", noFraud: 210, fraud: 55 },
          ],
          confidenceDistribution: [
            { range: "90-100%", score: 80 },
            { range: "80-90%", score: 50 },
            { range: "70-80%", score: 35 },
            { range: "60-70%", score: 20 },
            { range: "<60%", score: 8 },
          ],
          riskScoreDistribution: [
            { range: "0-20%", score: 480 },
            { range: "20-40%", score: 390 },
            { range: "40-60%", score: 260 },
            { range: "60-80%", score: 155 },
            { range: "80-100%", score: 55 },
          ],
          recentFraudCases: [4038, 5386, 8031, 7214, 6285, 8299, 2500],
        };

        // If we have actual numeric IDs, fetch from API, otherwise use mock data
        if (useCaseId && modelId && versionId && !isNaN(Number(useCaseId))) {
          const data = await getInferenceInsights(useCaseId, modelId, versionId);
          setStats(data.stats || MOCK_INSIGHTS.stats);
          setPieData(data.pieData || MOCK_INSIGHTS.pieData);
          setFeatureData(data.featureData || MOCK_INSIGHTS.featureData);
          setChartData(data.predictionTrends || MOCK_INSIGHTS.predictionTrends);
          setChartData2(data.confidenceDistribution || MOCK_INSIGHTS.confidenceDistribution);
          setRiskScoreData(data.riskScoreDistribution || MOCK_INSIGHTS.riskScoreDistribution);
          setCustomerIds(data.recentFraudCases || MOCK_INSIGHTS.recentFraudCases);
        } else {
          // Use mock data for standalone pages
          setStats(MOCK_INSIGHTS.stats);
          setPieData(MOCK_INSIGHTS.pieData);
          setFeatureData(MOCK_INSIGHTS.featureData);
          setChartData(MOCK_INSIGHTS.predictionTrends);
          setChartData2(MOCK_INSIGHTS.confidenceDistribution);
          setRiskScoreData(MOCK_INSIGHTS.riskScoreDistribution);
          setCustomerIds(MOCK_INSIGHTS.recentFraudCases);
        }
      } catch (err) {
        console.error("Inference insights fetch error:", err);
      } finally {
        setIsLoadingInsights(false);
      }
    }

    fetchInsights();
  }, [useCaseId, modelId, versionId, mode]);

  return (
    <div className="w-full flex flex-col gap-6">
      <RadioGroup
        value={mode}
        onValueChange={setMode}
        className="flex items-center justify-between gap-4 dark:bg-card"
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
            <div className="w-full">
              <ConfigureBatchInference />
            </div>

            <div className="border rounded-xl border-border-color-0 p-6 flex flex-col items-start gap-15 justify-start dark:bg-card">
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
            <div className="w-full">
              <ConfigureSingleInference />
            </div>

            {/* ----- Right Section: Prediction Result ----- */}
            <div className="border rounded-3xl bg-white border-border-color-0 p-6 flex flex-col gap-6 dark:bg-card">
              <h2 className="text-xl font-medium">Prediction Result</h2>

              {/* Prediction badge */}
              <div className="bg-sidebar-accent border rounded-xl p-4 flex flex-col items-center dark:bg-card">
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
            className=" rounded-xl  flex flex-col gap-6 dark:bg-card"
          >
            <CardDetails data={stats} />

            <div className="flex gap-6 ">
              {/* Prediction Distribution Card */}
              <div className="w-1/2 rounded-3xl bg-white shadow-sm border border-border-color-0 dark:bg-card">
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
                      <CustomPieChart
                        data={pieData} // values already in %
                        nameKey="name"
                        valueKey="value"
                        width="100%"
                        height="100%"
                        innerRadius={100}
                        outerRadius={115}
                        paddingAngle={6}
                        startAngle={90}
                        endAngle={-270}
                        cornerRadius={50}                 //  rounded edges
                        showLegend={false}
                        showLabels
                        labelPlacement="inside"           //  percentage inside donut
                        colors={["#7ED957", "#FF1C1C"]}
                      />

                    </div>
                  </div>


                  {/* Legend */}
                  <div className="flex justify-center items-center gap-3 mt-8">
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
              <div className="w-1/2 rounded-3xl bg-white dark:bg-card shadow-sm border border-border-color-0">
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
                          className={`px-4 py-3 flex justify-center items-center ${index !== customerIds.length - 1
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
              <div className="border h-[28vw]  w-1/2 border-border-color-0 rounded-3xl bg-white dark:bg-card p-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xl font-medium text-foreground">
                    Prediction Trends
                  </span>
                  <button className="text-xs px-3 py-1 rounded-full border border-border-color-0 ">
                    Daily
                  </button>
                </div>

                <div className="w-full h-70  flex items-center justify-center">
                  <div className="h-full w-full pt-8">
                    <CustomBarChart
                      data={chartData}
                      timeKey="name"
                      width="100%"
                      height="100%"
                      showGrid
                      showLegend={false}
                      showXAxis
                      showYAxis
                      barSize={20}
                      radius={[4, 4, 0, 0]}
                      bars={[
                        { dataKey: "noFraud", name: "No Fraud", color: "#7ED957" },
                        { dataKey: "fraud", name: "Fraud", color: "#FF1C1C" },
                      ]}
                    />
                  </div>
                </div>


                {/* Legend */}
                <div className="flex items-center justify-center gap-4 mt-4 text-sm">
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
              <div className="border w-1/2 h-[28vw] border-border-color-0 rounded-3xl bg-white dark:bg-card p-6  shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xl font-medium text-foreground">
                    Risk Score Distribution
                  </span>
                  <button className="text-xs px-3 py-1 rounded-full border border-border-color-0 ">
                    1,000 records
                  </button>
                </div>

                <div className="w-full h-70  flex items-center justify-center">
                  <div className="h-full w-full">
                    <CustomBarChart
                      data={riskScoreData}
                      timeKey="range"
                      orientation="horizontal"                 // ✅ sideways bars
                      width="100%"
                      height="100%"
                      showLegend={false}
                      showGrid
                      barSize={40}
                      radius={[0, 12, 12, 0]}           // ✅ rounded right end like screenshot
                      bars={[{ dataKey: "score", name: "Score", color: "#2563FB" }]}
                    />
                  </div>
                </div>

              </div>
            </div>

            <div className="w-full flex justify-between gap-6">
              <div className="p-5 border w-1/2 h-[25vw] border-border-color-0 rounded-3xl bg-white dark:bg-card space-y-6">
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
              <div className="p-5 w-1/2 h-[25vw] border border-border-color-0 rounded-3xl bg-white dark:bg-card space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-medium">
                    Confidence Score Distribution
                  </h2>
                  <span className="text-xs px-3 border border-border-color-0 py-1 rounded-full ">
                    Model Reliability
                  </span>
                </div>

                <div className="h-64 w-full">
                  <CustomBarChart
                    data={chartData2}
                    timeKey="range"
                    width="100%"
                    height="100%"
                    showGrid
                    showLegend={false}
                    showXAxis
                    showYAxis
                    barSize={50}
                    radius={[6, 6, 0, 0]}
                    bars={[{ dataKey: "score", name: "Score", color: "#7ED957" }]}
                  />
                </div>

              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}



 function ConfigureSingleInference() {
  const [mode, setMode] = useState("byData");

  return (
    <div className="flex items-center justify-center">
      <div className="w-full">
        <div className="border border-border-color-0 rounded-3xl bg-white p-8 dark:bg-card">
          <h2 className="text-xl font-medium mb-6">Configure Inference</h2>

          {/* Radio Group Toggle */}
          <RadioGroup value={mode} onValueChange={setMode} className="mb-6">
            <div className="grid grid-cols-2 gap-4">
              <label
                htmlFor="byId"
                className="flex items-center space-x-3 p-4 py-3 border rounded-xl cursor-pointer transition-all border-border-color-0"
              >
                <RadioGroupItem value="byId" id="byId" className="text-primary" />
                <span
                  className={`text-sm ${
                    mode === "byId" ? "text-orange-600" : ""
                  }`}
                >
                  By ID
                </span>
              </label>

              <label
                htmlFor="byData"
                className="flex items-center space-x-3 p-4 py-3 border rounded-xl cursor-pointer transition-all border-border-color-0"
              >
                <RadioGroupItem
                  value="byData"
                  id="byData"
                  className="text-primary"
                />
                <span
                  className={`text-sm ${
                    mode === "byData" ? "text-orange-600" : ""
                  }`}
                >
                  By Data
                </span>
              </label>
            </div>
          </RadioGroup>

          {/* Animated Content */}
          <AnimatePresence mode="wait">
            {mode === "byData" && (
              <motion.div
                key="byData"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                {/* Feature Values */}
                <div className="space-y-4 mb-6">
                  <h3 className="font-medium mb-4">Feature Values</h3>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm mb-1.5 block">Age</Label>
                      <Input type="number" defaultValue="35" className="rounded-lg" />
                    </div>
                    <div>
                      <Label className="text-sm mb-1.5 block">Income ($)</Label>
                      <Input
                        type="number"
                        defaultValue="75000"
                        className="rounded-lg"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm mb-1.5 block">
                        Credit Score
                      </Label>
                      <Input
                        type="number"
                        defaultValue="720"
                        className="rounded-lg"
                      />
                    </div>
                    <div>
                      <Label className="text-sm mb-1.5 block">
                        Account Balance ($)
                      </Label>
                      <Input
                        type="number"
                        defaultValue="15000"
                        className="rounded-lg"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm mb-1.5 block">
                        Transaction Freq.
                      </Label>
                      <Input
                        type="number"
                        defaultValue="12"
                        className="rounded-lg"
                      />
                    </div>
                    <div>
                      <Label className="text-sm mb-1.5 block">
                        Claim History
                      </Label>
                      <Input
                        type="number"
                        defaultValue="02"
                        className="rounded-lg"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm mb-1.5 block">
                        Policy Duration (mo)
                      </Label>
                      <Input
                        type="number"
                        defaultValue="36"
                        className="rounded-lg"
                      />
                    </div>
                    <div>
                      <Label className="text-sm mb-1.5 block">
                        Coverage Amount ($)
                      </Label>
                      <Input
                        type="number"
                        defaultValue="250000"
                        className="rounded-lg"
                      />
                    </div>
                  </div>
                </div>

                {/* Run Inference Button */}
                <div className="flex justify-end">
                  <Button className="bg-primary hover:bg-orange-600 text-white rounded-full !px-5 py-6 font-medium text-base">
                    Run Inference
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </motion.div>
            )}

            {mode === "byId" && (
              <motion.div
                key="byId"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                <div>
                  <Label className="text-sm mb-1.5 block">
                    Transaction ID
                  </Label>
                  <Input
                    className="rounded-lg"
                    placeholder=" e.g. TXN-2025-001234"
                  />
                  <p className="text-foreground/80 text-xs py-1">
                    Enter a transaction ID to retrieve and analyze
                  </p>
                </div>

                {/* Run Inference Button */}
                <div className="flex justify-end mt-6">
                  <Button className="bg-primary hover:bg-orange-600 text-white rounded-full !px-5 font-medium text-base">
                    Run Inference
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}




function ConfigureBatchInference() {
  const [mode, setMode] = useState("byData");
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type === "text/csv" || file.name.endsWith(".csv")) {
        setSelectedFile(file);
      } else {
        alert("Please upload a CSV file");
      }
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type === "text/csv" || file.name.endsWith(".csv")) {
        setSelectedFile(file);
      } else {
        alert("Please upload a CSV file");
      }
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex items-center justify-center">
      <div className="w-full">
        <div className="border border-border-color-0 rounded-2xl p-8 dark:bg-card">
          <h2 className="text-xl font-medium mb-6">Configure Inference</h2>

          {/* Radio Group Toggle */}
          <RadioGroup value={mode} onValueChange={setMode} className="mb-6">
            <div className="grid grid-cols-2 gap-4">
              <label
                htmlFor="byId"
                className="flex items-center space-x-3 p-4 py-3 border rounded-xl cursor-pointer transition-all border-border-color-0"
              >
                <RadioGroupItem value="byId" id="byId" className="text-primary" />
                <span
                  className={`text-sm ${
                    mode === "byId" ? "text-orange-600" : ""
                  }`}
                >
                  By ID
                </span>
              </label>

              <label
                htmlFor="byData"
                className="flex items-center space-x-3 p-4 py-3 border rounded-xl cursor-pointer transition-all border-border-color-0"
              >
                <RadioGroupItem
                  value="byData"
                  id="byData"
                  className="text-primary"
                />
                <span
                  className={`text-sm ${
                    mode === "byData" ? "text-orange-600" : ""
                  }`}
                >
                  By Data
                </span>
              </label>
            </div>
          </RadioGroup>

          {/* Animated Content */}
          <AnimatePresence mode="wait">
            {mode === "byData" && (
              <motion.div
                key="byData"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                <div className="mb-6">
                  <Label className="text-sm mb-3 block">
                    Upload CSV File{" "}
                    <span className="text-gray-500">(Transaction IDs)</span>
                  </Label>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".csv"
                    onChange={handleFileChange}
                    className="hidden"
                  />

                  <div
                    onClick={handleUploadClick}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    className={`border-2 rounded-2xl p-12 text-center transition-colors cursor-pointer ${
                      dragActive
                        ? "border-primary bg-primary/10"
                        : "border-border-color-0"
                    }`}
                  >
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 flex items-center justify-center mb-4">
                        <UploadFile className="h-8 w-8 text-gray-400" />
                      </div>

                      {selectedFile ? (
                        <>
                          <p className="font-medium mb-1">
                            {selectedFile.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            {(selectedFile.size / 1024).toFixed(2)} KB
                          </p>
                        </>
                      ) : (
                        <>
                          <p className="text-sm font-medium mb-1">
                            Click to upload or drag and drop
                          </p>
                          <p className="text-xs text-foreground/80">
                            CSV files only (max 10MB)
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button className="bg-primary hover:bg-orange-600 text-white rounded-full !px-5 py-6 font-medium text-base">
                    Run Batch Inference
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </motion.div>
            )}

            {mode === "byId" && (
              <motion.div
                key="byId"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                <div className="mb-6">
                  <Label className="text-sm mb-3 block">
                    Upload CSV File{" "}
                    <span className="text-gray-500">(Transaction IDs)</span>
                  </Label>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".csv"
                    onChange={handleFileChange}
                    className="hidden"
                  />

                  <div
                    onClick={handleUploadClick}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    className={`border-2 rounded-2xl p-12 text-center transition-colors cursor-pointer ${
                      dragActive
                        ? "border-primary bg-primary/10"
                        : "border-border-color-0"
                    }`}
                  >
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 flex items-center justify-center mb-4">
                        <UploadFile className="h-8 w-8 text-gray-400" />
                      </div>

                      {selectedFile ? (
                        <>
                          <p className="font-medium mb-1">
                            {selectedFile.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            {(selectedFile.size / 1024).toFixed(2)} KB
                          </p>
                        </>
                      ) : (
                        <>
                          <p className="text-sm font-medium mb-1">
                            Click to upload or drag and drop
                          </p>
                          <p className="text-xs text-foreground/80">
                            CSV files only (max 10MB)
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button className="bg-primary hover:bg-orange-600 text-white rounded-full !px-5 py-6 font-medium text-base">
                    Run Batch Inference
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}


