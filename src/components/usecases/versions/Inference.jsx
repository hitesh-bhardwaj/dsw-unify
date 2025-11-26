"use client";

import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RippleButton } from "@/components/ui/ripple-button";
import AnimatedProgressBar from "@/components/animations/ProgressBar";
import { Upload } from "lucide-react";
import Link from "next/link";

export default function Inference() {
  const [mode, setMode] = useState("single");

  // Values for Single Inference bars
  const confidence = 89.5;
  const riskScore = 23.4;

  // trigger animation
  const [playKey, setPlayKey] = useState(0);

  const handleSingleInference = () => {
    setPlayKey((prev) => prev + 1);
  };

  return (
    <div className="w-full flex flex-col gap-6">

      {/* ----- Top Tabs ----- */}
      <RadioGroup
        value={mode}
        onValueChange={setMode}
        className="flex items-center gap-8 border rounded-lg p-4"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="single" id="single" />
          <Label htmlFor="single">Single Inference</Label>
        </div>

        <div className="flex items-center space-x-2">
          <RadioGroupItem value="batch" id="batch" />
          <Label htmlFor="batch">Batch Inference</Label>
        </div>

        <div className="flex items-center space-x-2">
          <RadioGroupItem value="insights" id="insights" />
          <Label htmlFor="insights">Inference Insights</Label>
        </div>
      </RadioGroup>

      {/* ======================================================
         BATCH INFERENCE
      ======================================================= */}
      {mode === "batch" && (
        <div className="grid grid-cols-2 gap-6 w-full">
          <div className="border rounded-xl p-6 flex flex-col gap-6">
            <h2 className="text-lg font-medium">Configure Inference</h2>

            <div className="flex items-center gap-4">
              <Input placeholder="By ID" className="w-full" />
              <Input placeholder="By Date" className="w-full" />
            </div>

            <div className="border rounded-xl h-[180px] flex flex-col justify-center items-center cursor-pointer">
              <Upload className="w-8 h-8 text-foreground/80 mb-2" />
              <span className="text-foreground/80 text-sm">
                Click to upload or drag and drop
              </span>
              <span className="text-xs text-foreground/80 mt-1">
                CSV files only (max 10MB)
              </span>
            </div>

            <Button className="w-fit px-6 bg-primary  mt-2">
              Run Batch Inference →
            </Button>
          </div>

          <div className="border rounded-xl p-6 flex flex-col items-center justify-center">
            <h2 className="text-lg font-medium mb-6">Batch Processing Status</h2>

            <div className="border rounded-xl h-[180px] w-full flex flex-col justify-center items-center">
              <Upload className="w-8 h-8 text-foreground/80 mb-2" />
              <span className="text-foreground/80 text-sm">
                Upload a CSV file and run batch inference
              </span>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================
         SINGLE INFERENCE  
      ======================================================= */}
      {mode === "single" && (
        <div className="grid grid-cols-2 gap-6 w-full">

          {/* ----- Left Section: Configure Inference ----- */}
          <div className="border rounded-xl p-6 flex flex-col gap-6">
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
                  {/* <PlusIcon /> */}
                  Run Inference
                </Button>
              </RippleButton>
            </Link>
                </div>

           
          </div>

          {/* ----- Right Section: Prediction Result ----- */}
          <div className="border rounded-xl p-6 flex flex-col gap-6">
            <h2 className="text-xl font-medium">Prediction Result</h2>

            {/* Prediction badge */}
            <div className="bg-sidebar-accent border rounded-xl p-4 flex flex-col items-center">
              <span className="text-xs text-foreground/80 mb-2">Prediction</span>
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
        </div>
      )}

      {/* ======================================================
         INFERENCE INSIGHTS
      ======================================================= */}
      {mode === "insights" && (
        <div className="border rounded-xl p-6 flex flex-col gap-6">
          <h2 className="text-lg font-medium">Inference Insights</h2>

          <div className="text-foreground/80">
            Insights will be displayed here after inference.
          </div>
        </div>
      )}
    </div>
  );
}
