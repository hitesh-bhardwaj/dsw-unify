"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import {
    PlusIcon,
} from "@/components/Icons";
import { TestingCard } from "@/components/testing/testing-card";
import { TestingCardResults } from "@/components/testing/testing-card-results";
import TestingAnalyticsComp from "@/components/testing/testing-analytics";

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
        positive: false
    },
    {
        id: "success-rate",
        heading: "Success Rate",
        progress: "89%",
        remarks: "+5% from last week",
        positive: true

    },
    {
        id: "token-usage",
        heading: "Token Usage",
        progress: "1,250",
        remarks: "+120 from last week",
        positive: true
    },
    {
        id: "error-rate",
        heading: "Error Rate",
        progress: "2.1%",
        remarks: "-1.2% from last week",
        posictive: false
    }
]

export default function TestingPage() {
    const [activeTab, setActiveTab] = useState("test-suites");
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
                <div className="flex gap-4 bg-[#F6F6F6] py-1.5 px-1.5 rounded-lg border border-gray-200">
                    <button
                        onClick={() => setActiveTab("test-suites")}
                        className={cn(
                            "flex items-center justify-center gap-2 rounded-lg border px-4 py-3 text-sm font-medium transition-colors w-1/3  cursor-pointer",
                            activeTab === "test-suites"
                                ? "border-[#DCDCDC] bg-white text-[#FF5722]"
                                : "border-transparent text-gray-700 "
                        )}
                    >
                        <span>Test Suites</span>
                    </button>

                    <button
                        onClick={() => setActiveTab("test-results")}
                        className={cn(
                            "flex items-center justify-center gap-2 rounded-lg border px-4 py-3 text-sm font-medium transition-colors w-1/3 cursor-pointer",
                            activeTab === "test-results"
                                ? "border-[#DCDCDC] bg-white text-[#FF5722]"
                                : "border-transparent text-gray-700 "
                        )}
                    >

                        <span>Test Results</span>
                    </button>

                    <button
                        onClick={() => setActiveTab("analytics")}
                        className={cn(
                            "flex items-center justify-center gap-2 rounded-lg border px-4 py-3 text-sm font-medium transition-colors w-1/3 cursor-pointer",
                            activeTab === "analytics"
                                ? "border-[#DCDCDC] bg-white text-[#FF5722]"
                                : "border-transparent text-gray-700 "
                        )}
                    >

                        <span>Analytics</span>
                    </button>
                </div>
            </div>

            {/* Content with sliding animation */}
            <div className="flex-1 overflow-hidden relative">
                {/* Test Suites Tab */}
                <div
                    className={cn(
                        "absolute inset-0 overflow-auto p-6 pt-0 transition-all",
                        activeTab === "test-suites"
                            ? "translate-x-0 opacity-100 duration-500 ease-out"
                            : "-translate-x-[40%] opacity-0 pointer-events-none duration-300 ease-out"
                    )}
                >
                    <div className="space-y-4">
                        {testsSuites.map((test) => (
                            <TestingCard key={test.id} test={test} />
                        ))}
                    </div>
                </div>

                {/* Test Results Tab */}
                <div
                    className={cn(
                        "absolute inset-0 overflow-auto p-6 pt-0 transition-all",
                        activeTab === "test-results"
                            ? "translate-x-0 opacity-100 duration-500 ease-out"
                            : activeTab === "test-suites"
                                ? "translate-x-[40%] opacity-0 pointer-events-none duration-300 ease-out"
                                : "-translate-x-[40%] opacity-0 pointer-events-none duration-300 ease-out"
                    )}
                >
                    <div className="space-y-4">
                        {testsResults.map((test) => (
                            <TestingCardResults key={test.id} test={test} />
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
                    <TestingAnalyticsComp cardData={analyticsCardData}/>
                </div>
            </div>
        </div>
    );
}