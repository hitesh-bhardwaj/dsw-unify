"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { PlusIcon } from "@/components/Icons";
import { TestingCard } from "@/components/testing/testing-card";
import { TestingCardResults } from "@/components/testing/testing-card-results";
import TestingAnalyticsComp from "@/components/testing/testing-analytics";
import {
  FadeUpStagger,
} from "@/components/animations/FadeUp";
import Tabs from "@/components/common/Tabs";

// Mock data for agents
const testsSuites = [
  {
    id: "customer-support-validation",
    name: "Customer Support Validation",
    description: "Comprehensive testing for customer support agent",
    tags: [
      { label: "Completed", color: "green" },
      { label: "92% Success", color: "orange" },
    ],
    tests: "25",
    agent: "agent_001",
    lastrun: "22/01/2024",
    variant: "light",
  },
  {
    id: "tech-assistant-tests",
    name: "Technical Assistant Tests",
    description: "Testing technical knowledge and accuracy",
    tags: [
      { label: "Error", color: "red" },
      { label: "67% Success", color: "orange" },
    ],
    tests: "18",
    agent: "agent_002",
    lastrun: "21/01/2024",
    variant: "light",
  },
];
const testsResults = [
  {
    id: "customer-support-validation",
    name: "Customer Support Validation",
    description: "Support Agent v2.1",
    tags: [
      { label: "Completed", color: "green" },
      { label: "4m 32s", color: "orange" },
    ],
    tests: "23 passed, 2 failed",
    successRate: "92.0%",
    width: "w-[92.0%]",
    date: "22/01/2024",
    time: "20:00:00",
    variant: "light",
  },
  {
    id: "tech-assistant-tests",
    name: "Technical Assistant Tests",
    description: "Tech Assistant v1.3",
    tags: [
      { label: "Completed", color: "green" },
      { label: "3m 18s", color: "orange" },
    ],
    tests: "12 passed, 6 failed",
    successRate: "66.7%",
    width: "w-[66.7%]",
    date: "21/01/2024",
    time: "22:15:00",
    variant: "light",
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

export default function TestingPage() {
  const [tab, setTab] = useState("test-suites");

  const tabs = [
    { id: "test-suites", label: "Test Suites" },
    {
      id: "test-results",
      label: "Test Results",
    },
    {
      id: "analytics",
      label: "Analytics",
    },
  ];
  return (
    <div className="flex flex-col h-full">
      <div className="space-y-6 p-6">
        {/* Title and CTA */}
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl font-medium text-foreground">Testing</h1>
            <p className="mt-1 text-sm text-gray-600">
              Validate agent performance with comprehensive test suites
            </p>
          </div>
          <Link href="/agents/create">
            <Button className="bg-sidebar-primary hover:bg-[#E64A19] text-white gap-3 rounded-full !px-6 !py-6 !cursor-pointer duration-300">
              <PlusIcon />
              Create Test Suite
            </Button>
          </Link>
        </div>

        {/* Filter tabs */}
      
        <Tabs tabs={tabs} value={tab} onValueChange={setTab} />
      </div>

      <div className="flex-1 overflow-hidden relative">
        <div
          className={cn(
            "absolute inset-0 overflow-auto p-6 pt-0 transition-all",
            tab === "test-suites"
              ? "translate-x-0 opacity-100 duration-500 ease-out"
              : "-translate-x-[40%] opacity-0 pointer-events-none duration-300 ease-out"
          )}
        >
          {tab === "test-suites" && (
            <div className="space-y-4">
              {testsSuites.map((test) => (
                <TestingCard test={test} key={test.id} />
              ))}
            </div>
          )}
        </div>

        {/* Test Results Tab */}
        <div
          className={cn(
            "absolute inset-0 overflow-auto p-6 pt-0 transition-all",
            tab === "test-results"
              ? "translate-x-0 opacity-100 duration-500 ease-out"
              : tab === "test-suites"
              ? "translate-x-[40%] opacity-0 pointer-events-none duration-300 ease-out"
              : "-translate-x-[40%] opacity-0 pointer-events-none duration-300 ease-out"
          )}
        >
          {tab === "test-results" && (
            <FadeUpStagger key="test-results" staggerDelay={0.2} delay={0.6}>
              <div className="space-y-4">
                {testsResults.map((test) => (
                  <TestingCardResults test={test} key={test.id} />
                ))}
              </div>
            </FadeUpStagger>
          )}
        </div>

        {/* Analytics Tab */}
        <div
          className={cn(
            "absolute inset-0 overflow-auto p-6 pt-0 transition-all",
            tab === "analytics"
              ? "translate-x-0 opacity-100 duration-500 ease-out"
              : "translate-x-[40%] opacity-0 pointer-events-none duration-300 ease-out"
          )}
        >
          {tab === "analytics" && (
            <TestingAnalyticsComp cardData={analyticsCardData} />
          )}
        </div>
      </div>
    </div>
  );
}


