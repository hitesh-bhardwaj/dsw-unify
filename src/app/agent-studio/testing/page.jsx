"use client";

import { useState, useMemo, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PlusIcon } from "@/components/Icons";
import TestingAnalyticsComp from "@/components/testing/testing-analytics";
import { RippleButton } from "@/components/ui/ripple-button";
import AnimatedTabsSection from "@/components/common/TabsPane";
import TestingSuitesGrid from "@/components/testing/testing-suites-grid";
import TestingResultsGrid from "@/components/testing/testing-results-grid";
import { ScaleDown } from "@/components/animations/Animations";
import AddTestings from "@/components/agent-studio/AddTesting";
import * as testingApi from "@/lib/api/testing";

const initialTestSuites = [
  {
    id: "customer-support-validation",
    name: "Customer Support Validation",
    description: "Comprehensive testing for customer support agent",
    tags: [
      { label: "Completed", color: "green" },
      { label: "92% Success", color: "orange" },
    ],
    tests: "25",
    successRate: "92.0%",
    lastRun: '22/01/25',
    width: "w-[92.0%]",
     totalTest:'23 passed, 2 failed',

    date: "22/01/2024",
    time: "20:00:00",
    agent: "agent_001",
    variant: "light",

    // STATE FLAGS
    isRunning: false, 
    hasRun: false,    
  },
  {
    id: "tech-assistant-tests",
    name: "Technical Assistant Tests",
        lastRun: '22/01/25',

    description: "Testing technical knowledge and accuracy",
    tags: [
      { label: "Completed", color: "green" },
      { label: "67% Success", color: "orange" },
    ],
    tests: "18",
    totalTest:'23 passed, 2 failed',
    successRate: "66.7%",
    width: "w-[66.7%]",
    date: "21/01/2024",
    time: "22:15:00",
    agent: "agent_002",
    variant: "light",

    isRunning: false,
    hasRun: false,
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
    positive: false,
  },
];

export default function TestingPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [testSuitesState, setTestSuitesState] = useState(initialTestSuites);
  const [analyticsData, setAnalyticsData] = useState(analyticsCardData);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch test suites and analytics on mount
  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const [suitesData, analytics] = await Promise.all([
          testingApi.getTestSuites(),
          testingApi.getTestingAnalytics(),
        ]);
        setTestSuitesState(suitesData);
        setAnalyticsData(analytics);
      } catch (err) {
        setError(err.message || "Failed to load testing data");
        console.error("Error fetching testing data:", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  // RUN TEST - calls API to execute test suite
  const handleRunTest = async (id) => {
    try {
      // Set running state immediately
      setTestSuitesState((prev) =>
        prev.map((suite) =>
          suite.id === id
            ? { ...suite, isRunning: true, hasRun: true }
            : suite
        )
      );

      // Execute test suite via API
      await testingApi.executeTestSuite(id);

      // Simulate delay for UX (API might return immediately)
      setTimeout(() => {
        setTestSuitesState((prev) =>
          prev.map((suite) =>
            suite.id === id
              ? { ...suite, isRunning: false }
              : suite
          )
        );
      }, 2000);
    } catch (err) {
      console.error("Error executing test suite:", err);
      setError(err.message || "Failed to execute test suite");
      // Reset running state on error
      setTestSuitesState((prev) =>
        prev.map((suite) =>
          suite.id === id
            ? { ...suite, isRunning: false }
            : suite
        )
      );
    }
  };

  // Derived results (SAME DATA)
  const testResults = useMemo(
    () => testSuitesState.filter((t) => t.hasRun),
    [testSuitesState]
  );

  const handleDeleteTest = async (id) => {
    try {
      await testingApi.deleteTestSuite(id);
      setTestSuitesState((prev) => prev.filter((suite) => suite.id !== id));
    } catch (err) {
      console.error("Error deleting test suite:", err);
      setError(err.message || "Failed to delete test suite");
    }
  };

  const items = [
    {
      id: "test-suites",
      value: "test-suites",
      label: "Test Suites",
      render: () => (
        <TestingSuitesGrid
          items={testSuitesState}
          onRunTest={handleRunTest}
          onDeleteTest={handleDeleteTest}
        />
      ),
    },
    {
      id: "test-results",
      value: "test-results",
      label: "Test Results",
      render: () => <TestingResultsGrid items={testResults}   />,
    },
    {
      id: "analytics",
      value: "analytics",
      label: "Analytics",
      render: () => (
        <TestingAnalyticsComp cardData={analyticsData}  items={testResults} />
      ),
    },
  ];

  if (isLoading) {
    return (
      <div className="flex flex-col h-full w-full overflow-hidden">
        <ScaleDown>
          <div className="space-y-6 p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <h1 className="text-3xl font-medium text-foreground">Testing</h1>
                <p className="mt-1 text-sm text-gray-600 dark:text-foreground">Loading...</p>
              </div>
            </div>
          </div>
        </ScaleDown>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full w-full overflow-hidden">
      <ScaleDown>
        <div className="space-y-6 p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <h1 className="text-3xl font-medium text-foreground">
                Testing
              </h1>
              <p className="mt-1 text-sm text-gray-600 dark:text-foreground">
                Validate agent performance with comprehensive test suites
              </p>
              {error && (
                <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
              )}
            </div>

            <RippleButton>
              <Link href="#" onClick={() => setIsModalOpen(true)}>
                <Button className="bg-sidebar-primary hover:bg-[#E64A19] text-white gap-3 cursor-pointer rounded-full !px-6 !py-6">
                  <PlusIcon />
                  Create Test Suite
                </Button>
              </Link>
            </RippleButton>
          </div>

          <AnimatedTabsSection items={items} defaultValue="test-suites" />
        </div>
      </ScaleDown>

      <AddTestings open={isModalOpen} onOpenChange={setIsModalOpen} />
    </div>
  );
}
