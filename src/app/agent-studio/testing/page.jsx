"use client";

import { useState, useMemo, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PlusIcon } from "@/components/Icons";
import CountUp from "@/components/animations/CountUp";
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

const initialStats = [
  { title: "Total Test Suites", value: "02" , description:"Active test suites"},
  { title: "Success Rate", value: "92%", description:"Average across all suites" },
  { title: "Test Runs Today", value: "00", description:"Completed test executions" },
];

export default function TestingPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [testSuitesState, setTestSuitesState] = useState(initialTestSuites);
  const [statsData, setStatsData] = useState(initialStats);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch test suites and stats on mount
  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const [suitesData, stats] = await Promise.all([
          testingApi.getTestSuites(),
          testingApi.getTestingStats(),
        ]);
        setTestSuitesState(suitesData);

        // Update stats with fetched data
        setStatsData([
          { title: "Total Test Suites", value: stats.totalTestSuites ,description:"Active test suites" },
          { title: "Success Rate", value: stats.successRate ,description:"Average across all suites"},
          { title: "Test Runs Today", value: stats.testRunsToday, description:"Completed test executions" },
        ]);
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

  // Update "Test Runs Today" stat when test results change
  useEffect(() => {
    const testRunsToday = testResults.length.toString().padStart(2, "0");
    setStatsData((prev) =>
      prev.map((stat) =>
        stat.title === "Test Runs Today"
          ? { ...stat, value: testRunsToday }
          : stat
      )
    );
  }, [testResults]);

  // Update "Total Test Suites" stat when test suites change
  useEffect(() => {
    const totalSuites = testSuitesState.length.toString().padStart(2, "0");
    setStatsData((prev) =>
      prev.map((stat) =>
        stat.title === "Total Test Suites"
          ? { ...stat, value: totalSuites }
          : stat
      )
    );
  }, [testSuitesState]);

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

          {/* Metrics Cards */}
          <div className="w-full flex items-center justify-between gap-4">
            {isLoading
              ? // Loading skeleton
                Array.from({ length: 3 }).map((_, index) => (
                  <div
                    key={index}
                    className="flex flex-col gap-6 border border-border-color-0 rounded-lg py-6 px-4 w-full animate-pulse"
                  >
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
                    <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                  </div>
                ))
              : statsData.map((item, index) => (
                  <div
                    key={index}
                    className="flex flex-col bg-white gap-4 border border-border-color-0 rounded-3xl py-6 px-4 w-full dark:bg-card"
                  >
                    <span className="text-sm font-medium text-foreground/80">
                      {item.title}
                    </span>
                    <span className="text-4xl font-medium mt-2">
                      <CountUp value={item.value} startOnView />
                    </span>
                    <span className="text-xs text-foreground/80">
                      {item.description}
                    </span>
                  </div>
                ))}
          </div>

          <AnimatedTabsSection items={items} defaultValue="test-suites" />
        </div>
      </ScaleDown>

      <AddTestings open={isModalOpen} onOpenChange={setIsModalOpen} />
    </div>
  );
}
