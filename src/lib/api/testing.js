/**
 * Testing API Service
 *
 * This module contains mock testing functions for agent test suites.
 * TODO: Backend team - Replace mock responses with actual API calls
 *
 * @module api/testing
 */

import { apiCall } from "./client";

/**
 * @typedef {import("@/types/testing").TestSuite} TestSuite
 * @typedef {import("@/types/testing").TestResult} TestResult
 * @typedef {import("@/types/testing").TestExecution} TestExecution
 * @typedef {import("@/types/testing").Analytics} Analytics
 * @typedef {import("@/types/testing").TestsQuery} TestsQuery
 */

/**
 * Mock test suites data
 */
const MOCK_TEST_SUITES = [
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
    lastRun: "22/01/25",
    width: "w-[92.0%]",
    totalTest: "23 passed, 2 failed",
    date: "22/01/2024",
    time: "20:00:00",
    agent: "agent_001",
    variant: "light",
    isRunning: false,
    hasRun: false,
  },
  {
    id: "tech-assistant-tests",
    name: "Technical Assistant Tests",
    lastRun: "22/01/25",
    description: "Testing technical knowledge and accuracy",
    tags: [
      { label: "Completed", color: "green" },
      { label: "67% Success", color: "orange" },
    ],
    tests: "18",
    totalTest: "12 passed, 6 failed",
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

/**
 * Mock analytics data
 */
const MOCK_ANALYTICS = [
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

/**
 * Mock test suite detail
 */
const MOCK_TEST_SUITE_DETAIL = {
  id: "customer-support-validation",
  name: "Customer Support Validation",
  description: "Comprehensive testing for customer support agent",
  agent: "Customer Support Agent",
  totalTests: 25,
  passedTests: 23,
  failedTests: 2,
  successRate: "92.0%",
  lastRun: "22/01/25",
  createdDate: "15/01/24",
  testCases: [
    {
      id: "test-1",
      name: "Greeting Response Test",
      description: "Tests if agent responds appropriately to greetings",
      status: "passed",
      executionTime: "0.8s",
    },
    {
      id: "test-2",
      name: "Policy Information Query",
      description: "Tests agent's ability to retrieve policy information",
      status: "passed",
      executionTime: "1.2s",
    },
    {
      id: "test-3",
      name: "Claims Processing Workflow",
      description: "Tests the complete claims processing workflow",
      status: "failed",
      executionTime: "2.5s",
      error: "Expected response time < 2s, got 2.5s",
    },
    {
      id: "test-4",
      name: "Multi-turn Conversation",
      description: "Tests agent's context retention over multiple turns",
      status: "passed",
      executionTime: "1.5s",
    },
  ],
};

/**
 * Get all test suites
 *
 * TODO: Backend team - Replace with actual API call:
 * GET /api/test-suites?status=&agent=&search=
 * Response: { testSuites: TestSuite[], total: number }
 *
 * @param {TestsQuery} [params={}] - Query parameters
 * @returns {Promise<TestSuite[]>}
 */
export async function getTestSuites(params = {}) {
  return apiCall("/test-suites", { method: "GET" }, MOCK_TEST_SUITES);
}

/**
 * Get test suite by ID
 *
 * TODO: Backend team - Replace with actual API call:
 * GET /api/test-suites/:id
 * Response: { testSuite: TestSuite }
 *
 * @param {string} id - Test suite ID
 * @returns {Promise<TestSuite>}
 */
export async function getTestSuiteById(id) {
  const suite = MOCK_TEST_SUITES.find((s) => s.id === id) || MOCK_TEST_SUITE_DETAIL;
  return apiCall(`/test-suites/${id}`, { method: "GET" }, suite);
}

/**
 * Create new test suite
 *
 * TODO: Backend team - Replace with actual API call:
 * POST /api/test-suites
 * Headers: { Authorization: Bearer <token> }
 * Body: { name, description, agent, testCases }
 * Response: { testSuite: TestSuite }
 *
 * @param {Object} data - Test suite data
 * @returns {Promise<TestSuite>}
 */
export async function createTestSuite(data) {
  const newSuite = {
    id: `test-suite-${Date.now()}`,
    ...data,
    tags: [{ label: "New", color: "blue" }],
    tests: "0",
    successRate: "0%",
    lastRun: "Never",
    width: "w-[0%]",
    totalTest: "0 passed, 0 failed",
    date: new Date().toISOString().split("T")[0],
    time: new Date().toLocaleTimeString(),
    variant: "light",
    isRunning: false,
    hasRun: false,
  };

  return apiCall(
    "/test-suites",
    {
      method: "POST",
      body: JSON.stringify(data),
    },
    newSuite
  );
}

/**
 * Update test suite
 *
 * TODO: Backend team - Replace with actual API call:
 * PUT /api/test-suites/:id
 * Headers: { Authorization: Bearer <token> }
 * Body: { name, description, testCases }
 * Response: { testSuite: TestSuite }
 *
 * @param {string} id - Test suite ID
 * @param {Object} data - Updated test suite data
 * @returns {Promise<TestSuite>}
 */
export async function updateTestSuite(id, data) {
  const suite = MOCK_TEST_SUITES.find((s) => s.id === id);
  const updated = {
    ...suite,
    ...data,
    lastModified: new Date().toISOString(),
  };

  return apiCall(
    `/test-suites/${id}`,
    {
      method: "PUT",
      body: JSON.stringify(data),
    },
    updated
  );
}

/**
 * Delete test suite
 *
 * TODO: Backend team - Replace with actual API call:
 * DELETE /api/test-suites/:id
 * Headers: { Authorization: Bearer <token> }
 * Response: { success: boolean }
 *
 * @param {string} id - Test suite ID
 * @returns {Promise<void>}
 */
export async function deleteTestSuite(id) {
  return apiCall(`/test-suites/${id}`, { method: "DELETE" }, { success: true });
}

/**
 * Execute test suite
 *
 * TODO: Backend team - Replace with actual API call:
 * POST /api/test-suites/:id/execute
 * Headers: { Authorization: Bearer <token> }
 * Response: { executionId: string, status: "running" }
 * Then poll: GET /api/test-suites/executions/:executionId
 * Or use WebSocket for real-time updates
 *
 * @param {string} id - Test suite ID
 * @returns {Promise<TestExecution>}
 */
export async function executeTestSuite(id) {
  // In production, this would start an async test execution
  // and return an execution ID to poll for results
  const execution = {
    executionId: `exec-${Date.now()}`,
    testSuiteId: id,
    status: "running",
    startedAt: new Date().toISOString(),
    progress: 0,
  };

  return apiCall(
    `/test-suites/${id}/execute`,
    {
      method: "POST",
    },
    execution
  );
}

/**
 * Get test execution status
 *
 * TODO: Backend team - Replace with actual API call:
 * GET /api/test-suites/executions/:executionId
 * Response: { execution: TestExecution, results?: TestResult }
 *
 * @param {string} executionId - Test execution ID
 * @returns {Promise<TestExecution>}
 */
export async function getTestExecution(executionId) {
  // Mock completed execution
  const execution = {
    executionId: executionId,
    status: "completed",
    startedAt: new Date(Date.now() - 2000).toISOString(),
    completedAt: new Date().toISOString(),
    progress: 100,
    results: {
      totalTests: 25,
      passed: 23,
      failed: 2,
      successRate: "92.0%",
      duration: "2.0s",
    },
  };

  return apiCall(`/test-suites/executions/${executionId}`, { method: "GET" }, execution);
}

/**
 * Get test results (all completed test runs)
 *
 * TODO: Backend team - Replace with actual API call:
 * GET /api/test-results?testSuiteId=&status=&limit=
 * Response: { results: TestResult[], total: number }
 *
 * @param {Object} [params={}] - Query parameters
 * @returns {Promise<TestResult[]>}
 */
export async function getTestResults(params = {}) {
  // Return test suites that have been run
  const results = MOCK_TEST_SUITES.filter((s) => s.hasRun);
  return apiCall("/test-results", { method: "GET" }, results);
}

/**
 * Get testing analytics
 *
 * TODO: Backend team - Replace with actual API call:
 * GET /api/testing/analytics?timeRange=7d
 * Response: { analytics: Analytics }
 *
 * @param {Object} [params={}] - Query parameters (timeRange, etc.)
 * @returns {Promise<Analytics>}
 */
export async function getTestingAnalytics(params = {}) {
  return apiCall("/testing/analytics", { method: "GET" }, MOCK_ANALYTICS);
}

/**
 * Get performance history for test suites
 *
 * TODO: Backend team - Replace with actual API call:
 * GET /api/testing/performance-history?limit=10
 * Response: { history: TestResult[] }
 *
 * @param {Object} [params={}] - Query parameters
 * @returns {Promise<TestResult[]>}
 */
export async function getPerformanceHistory(params = {}) {
  const history = MOCK_TEST_SUITES.filter((s) => s.hasRun).map((suite) => ({
    id: suite.id,
    name: suite.name,
    lastRun: suite.lastRun,
    successRate: suite.successRate,
    duration: "0m 2s",
    tests: suite.tests,
    totalTest: suite.totalTest,
  }));

  return apiCall("/testing/performance-history", { method: "GET" }, history);
}

/**
 * Subscribe to test execution updates via WebSocket
 *
 * TODO: Backend team - Implement WebSocket connection:
 * WebSocket URL: wss://api.example.com/test-suites/executions/:executionId/stream
 * Message format: { type: "progress"|"completed"|"failed", data: {...} }
 *
 * @param {string} executionId - Test execution ID
 * @param {Function} callback - Callback function to handle updates
 * @returns {Function} Cleanup function to close WebSocket connection
 */
export function subscribeToTestExecution(executionId, callback) {
  // TODO: Backend team - Replace with actual WebSocket implementation
  console.log(`[MOCK WebSocket] Subscribing to test execution: ${executionId}`);

  // Simulate progress updates
  let progress = 0;
  const interval = setInterval(() => {
    progress += 20;
    const update = {
      type: progress < 100 ? "progress" : "completed",
      timestamp: new Date().toISOString(),
      data: {
        executionId,
        progress: Math.min(progress, 100),
        status: progress < 100 ? "running" : "completed",
      },
    };
    callback(update);

    if (progress >= 100) {
      clearInterval(interval);
    }
  }, 400); // Update every 400ms to complete in ~2s

  // Return cleanup function
  return () => {
    console.log(`[MOCK WebSocket] Unsubscribing from test execution: ${executionId}`);
    clearInterval(interval);
  };
}
