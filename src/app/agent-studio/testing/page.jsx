"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PlusIcon } from "@/components/Icons";
import TestingAnalyticsComp from "@/components/testing/testing-analytics";
// import { FadeUp } from "@/components/animations/Animations";
import { RippleButton } from "@/components/ui/ripple-button";
import AnimatedTabsSection from "@/components/common/TabsPane";
import TestingSuitesGrid from "@/components/testing/testing-suites-grid";
import TestingResultsGrid from "@/components/testing/testing-results-grid";
import { ScaleDown } from "@/components/animations/Animations";
import AddTestings from "@/components/agent-studio/AddTesting";

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

          const [isModalOpen, setIsModalOpen] = useState(false);
  

  const items = [
    {
      id: "test-suites",
      value: "test-suites",
      label: "Test Suites",
      name: "Test Suites",
      render: () => <TestingSuitesGrid items={testsSuites} />,
    },
    {
      id: "test-results",
      value: "test-results",
      label: "Test Results",
      name: "Test Results",
      render: () => <TestingResultsGrid items={testsResults} />,
    },
    {
      id: "analytics",
      value: "analytics",
      label: "Analytics",
      name: "Analytics",
      render: () => <TestingAnalyticsComp cardData={analyticsCardData} />,
    },
  ];
  return (
    <div className="flex flex-col h-full w-full overflow-hidden">
      <ScaleDown>
      <div className="space-y-6 p-6">
        {/* Title and CTA */}
        {/* <FadeUp> */}
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <h1 className="text-3xl font-medium text-foreground">Testing</h1>
              <p className="mt-1 text-sm text-gray-600">
                Validate agent performance with comprehensive test suites
              </p>
            </div>
            <RippleButton>
              <Link
                onClick={() => setIsModalOpen(true)}
              href="#">
                <Button className="bg-sidebar-primary hover:bg-[#E64A19] text-white gap-3 rounded-full !px-6 !py-6 !cursor-pointer duration-300">
                  <PlusIcon />
                  Create Test Suite
                </Button>
              </Link>
            </RippleButton>
          </div>
        {/* </FadeUp> */}
        {/* <FadeUp delay={0.04}> */}
          <AnimatedTabsSection
            items={items}
            // ctx={ctx}
            defaultValue="test-suites"
          />
        {/* </FadeUp> */}
      </div>
      </ScaleDown>
              <AddTestings open={isModalOpen} onOpenChange={setIsModalOpen} />
      
    </div>
  );
}
