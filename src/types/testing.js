/**
 * Testing Type Definitions
 * @module types/testing
 */

/**
 * Tag object for test suite
 * @typedef {Object} TestTag
 * @property {string} label - Tag label
 * @property {("green"|"orange"|"blue"|"red"|"gray")} color - Tag color
 */

/**
 * Test suite object
 * @typedef {Object} TestSuite
 * @property {string} id - Test suite ID
 * @property {string} name - Test suite name
 * @property {string} description - Test suite description
 * @property {TestTag[]} tags - Array of tag objects
 * @property {string} tests - Number of tests (as string)
 * @property {string} successRate - Success rate percentage (e.g., "92.0%")
 * @property {string} lastRun - Last run date (e.g., "22/01/25")
 * @property {string} width - Width class for progress bar (e.g., "w-[92.0%]")
 * @property {string} totalTest - Test breakdown (e.g., "23 passed, 2 failed")
 * @property {string} date - Date (DD/MM/YYYY)
 * @property {string} time - Time (HH:MM:SS)
 * @property {string} agent - Agent ID
 * @property {("light"|"dark")} variant - Card style variant
 * @property {boolean} isRunning - Whether test is currently running
 * @property {boolean} hasRun - Whether test has been run
 */

/**
 * Test result object (same as TestSuite but after execution)
 * @typedef {TestSuite} TestResult
 */

/**
 * Test case within a test suite
 * @typedef {Object} TestCase
 * @property {string} id - Test case ID
 * @property {string} name - Test case name
 * @property {string} description - Test case description
 * @property {("passed"|"failed"|"pending"|"skipped")} status - Test status
 * @property {string} executionTime - Execution time (e.g., "0.8s")
 * @property {string} [error] - Error message (if failed)
 */

/**
 * Test suite detail (extended information)
 * @typedef {Object} TestSuiteDetail
 * @property {string} id - Test suite ID
 * @property {string} name - Test suite name
 * @property {string} description - Test suite description
 * @property {string} agent - Agent name
 * @property {number} totalTests - Total number of tests
 * @property {number} passedTests - Number of passed tests
 * @property {number} failedTests - Number of failed tests
 * @property {string} successRate - Success rate percentage
 * @property {string} lastRun - Last run date
 * @property {string} createdDate - Created date
 * @property {TestCase[]} testCases - Array of test cases
 */

/**
 * Test execution object (for async test runs)
 * @typedef {Object} TestExecution
 * @property {string} executionId - Execution ID
 * @property {string} testSuiteId - Test suite ID
 * @property {("running"|"completed"|"failed"|"cancelled")} status - Execution status
 * @property {string} startedAt - ISO timestamp when started
 * @property {string} [completedAt] - ISO timestamp when completed
 * @property {number} progress - Progress percentage (0-100)
 * @property {TestExecutionResults} [results] - Results (when completed)
 */

/**
 * Test execution results
 * @typedef {Object} TestExecutionResults
 * @property {number} totalTests - Total tests count
 * @property {number} passed - Passed tests count
 * @property {number} failed - Failed tests count
 * @property {string} successRate - Success rate percentage
 * @property {string} duration - Total duration (e.g., "2.0s")
 */

/**
 * Analytics metric card
 * @typedef {Object} AnalyticMetric
 * @property {string} id - Metric ID
 * @property {string} heading - Metric heading
 * @property {string} progress - Current value
 * @property {string} remarks - Change from previous period
 * @property {boolean} positive - Whether change is positive
 */

/**
 * Analytics data (array of analytics cards)
 * @typedef {AnalyticCard[]} Analytics
 */

/**
 * Performance history item
 * @typedef {Object} PerformanceHistoryItem
 * @property {string} id - Test suite ID
 * @property {string} name - Test suite name
 * @property {string} lastRun - Last run date
 * @property {string} successRate - Success rate percentage
 * @property {string} duration - Duration (e.g., "0m 2s")
 * @property {string} tests - Number of tests
 * @property {string} totalTest - Test breakdown
 */

/**
 * Query parameters for test suites list
 * @typedef {Object} TestsQuery
 * @property {string} [search] - Search query
 * @property {string} [agent] - Filter by agent ID
 * @property {("pending"|"running"|"completed"|"failed")} [status] - Filter by status
 * @property {string} [sortBy] - Sort field
 * @property {("asc"|"desc")} [sortOrder] - Sort order
 * @property {number} [page] - Page number
 * @property {number} [limit] - Items per page
 */

/**
 * Real-time test execution update (WebSocket message)
 * @typedef {Object} TestExecutionUpdate
 * @property {("progress"|"completed"|"failed")} type - Update type
 * @property {string} timestamp - ISO timestamp
 * @property {Object} data - Update data (structure depends on type)
 * @property {string} data.executionId - Execution ID
 * @property {number} data.progress - Progress percentage
 * @property {("running"|"completed"|"failed")} data.status - Status
 * @property {TestExecutionResults} [data.results] - Results (if completed)
 */

export {};
