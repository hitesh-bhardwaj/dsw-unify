"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { LeftArrow, UploadIcon } from "@/components/Icons";
import TestingAnalyticsComp from "@/components/testing/testing-analytics";
import { DataSet } from "@/components/llmtuning/dataset-card";
import { TrainingCard } from "@/components/llmtuning/training-card";

// Mock data for agents
const datasets = [
  {
    id: "customer-support-dataset",
    name: "Customer Support Dataset",
    description: "Training data for customer service interactions",
    tags: [
      { label: "Alpaca", color: "mint" },
      { label: "2.3 MB", color: "transparent" },
    ],
    records: "1,250",
    createdBy: "15/01/2024",
    variant: "light",
  },
  {
    id: "technical-documentation",
    name: "Technical Documentation",
    description: "Internal technical documentation for fine-tuning",
    tags: [
      { label: "Chat", color: "yellow" },
      { label: "5.7 MB", color: "transparent" },
    ],
    records: "3400",
    createdBy: "10/01/2024",
    variant: "light",
  },
];
const TrainingJobs = [
  {
    id: "customer-support-v1",
    name: "Customer-Support-v1",
    description: "Customer support model training",
    tags: [
      { label: "Completed", color: "green" },
    ],
    progress:"1000/1000",
    successRate: "100%",
    loss:"0.23",
    width: "w-[100%]",
    date: "22/01/2024",
  },
  {
    id: "tech-assistant-v2",
    name: "Tech-Assistant-v2",
    description: "Technical assistant model training",
    tags: [
      { label: "Running", color: "blue" },
    ],
    progress:"450/800",
    successRate: "56.3%",
    loss:"0.45",
    width: "w-[56.3%]",
    date: "22/01/2024",
  },
];
const analyticsCardData = [
  {
    id: "average-response-time",
    heading: "Average Response Time",
    progress: "1.2s",
    remarks: "-0.3s from last week",
    positive: false,
  },
  {
    id: "success-rate",
    heading: "Success Rate",
    progress: "89%",
    remarks: "+5% from last week",
    positive: true,
  },
  {
    id: "token-usage",
    heading: "Token Usage",
    progress: "1,250",
    remarks: "+120 from last week",
    positive: true,
  },
  {
    id: "error-rate",
    heading: "Error Rate",
    progress: "2.1%",
    remarks: "-1.2% from last week",
    posictive: false,
  },
];

export default function LLMFineTuning() {
  const [activeTab, setActiveTab] = useState("Datasets");
  return (
    <div className="flex flex-col h-full">
      <div className="space-y-6 p-6">
        {/* Title and CTA */}
        <div className="flex items-center justify-between mb-10">
          <div className="w-fit flex gap-2">
            <Link href="/llms">
              <Button
                variant="ghost"
                size="icon"
                className="shrink-0 w-fit -mt-0.5"
              >
                <LeftArrow />
              </Button>
            </Link>
            <div className="space-y-2">
              <h1 className="text-2xl font-medium text-foreground">
                LLM Finetuning
              </h1>
              <p className="mt-1 text-sm text-gray-600">
                Manage datasets, train custom models, and deploy them for
                inference
              </p>
            </div>
          </div>
          <Link href="/agents/create">
            <Button className="bg-sidebar-primary hover:bg-[#E64A19] text-white gap-3 rounded-full !px-6 !py-6 !cursor-pointer duration-300">
              <div className="w-4 h-4">
                <UploadIcon />
              </div>
              Upload Dataset
            </Button>
          </Link>
        </div>

        {/* Filter tabs */}
        <div className="flex gap-4 bg-[#F6F6F6] py-1.5 px-1.5 rounded-lg border border-gray-200">
          <button
            onClick={() => setActiveTab("Datasets")}
            className={cn(
              "flex items-center justify-center gap-2 rounded-lg border px-4 py-3 text-sm  transition-colors w-1/3  cursor-pointer",
              activeTab === "Datasets"
                ? "border-[#DCDCDC] bg-white text-[#FF5722] font-medium"
                : "border-transparent text-gray-700 "
            )}
          >
            <span>Datasets</span>
          </button>

          <button
            onClick={() => setActiveTab("Training Jobs")}
            className={cn(
              "flex items-center justify-center gap-2 rounded-lg border px-4 py-3 text-sm transition-colors w-1/3 cursor-pointer",
              activeTab === "Training Jobs"
                ? "border-[#DCDCDC] bg-white text-[#FF5722] font-medium"
                : "border-transparent text-gray-700 "
            )}
          >
            <span>Training Jobs</span>
          </button>

          <button
            onClick={() => setActiveTab("Models")}
            className={cn(
              "flex items-center justify-center gap-2 rounded-lg border px-4 py-3 text-sm transition-colors w-1/3 cursor-pointer",
              activeTab === "Models"
                ? "border-[#DCDCDC] bg-white text-[#FF5722] font-medium"
                : "border-transparent text-gray-700 "
            )}
          >
            <span>Models</span>
          </button>
          <button
            onClick={() => setActiveTab("Inference")}
            className={cn(
              "flex items-center justify-center gap-2 rounded-lg border px-4 py-3 text-sm transition-colors w-1/3 cursor-pointer",
              activeTab === "Inference"
                ? "border-[#DCDCDC] bg-white text-[#FF5722] font-medium"
                : "border-transparent text-gray-700 "
            )}
          >
            <span>Inference</span>
          </button>
        </div>
      </div>

      {/* Content with sliding animation */}
      <div className="flex-1 overflow-hidden relative">
        {/* Datasets Tab */}
        <div
          className={cn(
            "absolute inset-0 overflow-auto p-6 pt-0 transition-all",
            activeTab === "Datasets"
              ? "translate-x-0 opacity-100 duration-500 ease-out"
              : "-translate-x-[40%] opacity-0 pointer-events-none duration-300 ease-out"
          )}
        >
          <div className="space-y-4">
            {datasets.map((data) => (
              <DataSet key={data.id} data={data} />
            ))}
          </div>
        </div>

        {/* Training Jobs Tab */}
        <div
          className={cn(
            "absolute inset-0 overflow-auto p-6 pt-0 transition-all",
            activeTab === "Training Jobs"
              ? "translate-x-0 opacity-100 duration-500 ease-out"
              : activeTab === "Datasets"
              ? "translate-x-[40%] opacity-0 pointer-events-none duration-300 ease-out"
              : "-translate-x-[40%] opacity-0 pointer-events-none duration-300 ease-out"
          )}
        >
          <div className="space-y-4">
            {TrainingJobs.map((data) => (
              <TrainingCard key={data.id} data={data} />
            ))}
          </div>
        </div>

        {/* Analytics Tab */}
        <div
          className={cn(
            "absolute inset-0 overflow-auto p-6 pt-0 transition-all",
            activeTab === "analytics"
              ? "translate-x-0 opacity-100 duration-500 ease-out"
              : "translate-x-[40%] opacity-0 pointer-events-none duration-300 ease-out"
          )}
        >
          <TestingAnalyticsComp cardData={analyticsCardData} />
        </div>
      </div>
    </div>
  );
}
