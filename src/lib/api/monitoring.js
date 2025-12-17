/**
 * Monitoring API Service
 *
 * This module contains mock monitoring functions for agent metrics.
 * TODO: Backend team - Replace mock responses with actual API calls
 * NOTE: In production, consider WebSocket connections for real-time metrics
 *
 * @module api/monitoring
 */

import { apiCall } from "./client";

/**
 * @typedef {import("@/types/monitoring").AgentOption} AgentOption
 * @typedef {import("@/types/monitoring").TrafficMetrics} TrafficMetrics
 * @typedef {import("@/types/monitoring").GuardrailMetrics} GuardrailMetrics
 * @typedef {import("@/types/monitoring").LatencyMetrics} LatencyMetrics
 * @typedef {import("@/types/monitoring").ErrorMetrics} ErrorMetrics
 * @typedef {import("@/types/monitoring").SuccessMetrics} SuccessMetrics
 * @typedef {import("@/types/monitoring").LLMMetrics} LLMMetrics
 * @typedef {import("@/types/monitoring").AllMetrics} AllMetrics
 */

/**
 * Mock agents list for monitoring selection
 */
const MOCK_AGENTS = [
  {
    id: "customer-support-agent",
    name: "Customer Support Agent",
    status: "active",
  },
  {
    id: "sales-assistant-agent",
    name: "Sales Assistant Agent",
    status: "active",
  },
  {
    id: "technical-documentation-agent",
    name: "Technical Documentation Agent",
    status: "active",
  },
];

/**
 * Mock traffic metrics
 */
const MOCK_TRAFFIC_METRICS = {
  totalRequests: 12847,
  totalSessions: 3421,
  chartData: [
    { time: "00:00", requests: 120, sessions: 45 },
    { time: "02:00", requests: 180, sessions: 68 },
    { time: "04:00", requests: 95, sessions: 32 },
    { time: "06:00", requests: 210, sessions: 78 },
    { time: "08:00", requests: 380, sessions: 125 },
    { time: "10:00", requests: 520, sessions: 189 },
    { time: "12:00", requests: 450, sessions: 156 },
    { time: "14:00", requests: 490, sessions: 172 },
    { time: "16:00", requests: 410, sessions: 145 },
    { time: "18:00", requests: 290, sessions: 98 },
    { time: "20:00", requests: 180, sessions: 62 },
    { time: "22:00", requests: 140, sessions: 48 },
  ],
};

/**
 * Mock guardrail metrics
 */
const MOCK_GUARDRAIL_METRICS = {
  preInference: 156,
  postInference: 43,
  avgLatency: 0.112,
  chartData: [
    { time: "00:00", preInference: 12, postInference: 3 },
    { time: "02:00", preInference: 18, postInference: 5 },
    { time: "04:00", preInference: 9, postInference: 2 },
    { time: "06:00", preInference: 21, postInference: 6 },
    { time: "08:00", preInference: 38, postInference: 11 },
    { time: "10:00", preInference: 52, postInference: 15 },
    { time: "12:00", preInference: 45, postInference: 13 },
    { time: "14:00", preInference: 49, postInference: 14 },
    { time: "16:00", preInference: 41, postInference: 12 },
    { time: "18:00", preInference: 29, postInference: 8 },
    { time: "20:00", preInference: 18, postInference: 5 },
    { time: "22:00", preInference: 14, postInference: 4 },
  ],
};

/**
 * Mock latency metrics
 */
const MOCK_LATENCY_METRICS = {
  endToEnd: 1.85,
  processing: 0.78,
  toolInvocation: 0.42,
  chartData: [
    { time: "00:00", endToEnd: 1.52, processing: 0.65, toolInvocation: 0.35 },
    { time: "02:00", endToEnd: 1.68, processing: 0.72, toolInvocation: 0.38 },
    { time: "04:00", endToEnd: 1.45, processing: 0.62, toolInvocation: 0.33 },
    { time: "06:00", endToEnd: 1.78, processing: 0.76, toolInvocation: 0.40 },
    { time: "08:00", endToEnd: 2.15, processing: 0.92, toolInvocation: 0.48 },
    { time: "10:00", endToEnd: 2.34, processing: 1.00, toolInvocation: 0.52 },
    { time: "12:00", endToEnd: 2.10, processing: 0.90, toolInvocation: 0.47 },
    { time: "14:00", endToEnd: 2.22, processing: 0.95, toolInvocation: 0.50 },
    { time: "16:00", endToEnd: 1.98, processing: 0.85, toolInvocation: 0.44 },
    { time: "18:00", endToEnd: 1.72, processing: 0.74, toolInvocation: 0.38 },
    { time: "20:00", endToEnd: 1.60, processing: 0.68, toolInvocation: 0.36 },
    { time: "22:00", endToEnd: 1.55, processing: 0.66, toolInvocation: 0.34 },
  ],
};

/**
 * Mock error metrics
 */
const MOCK_ERROR_METRICS = {
  agentErrors: 51,
  llmErrors: 31,
  toolErrors: 29,
  chartData: [
    { time: "00:00", agent: 4, llm: 2, tool: 2 },
    { time: "02:00", agent: 6, llm: 3, tool: 3 },
    { time: "04:00", agent: 3, llm: 2, tool: 1 },
    { time: "06:00", agent: 7, llm: 4, tool: 4 },
    { time: "08:00", agent: 12, llm: 7, tool: 7 },
    { time: "10:00", agent: 16, llm: 10, tool: 9 },
    { time: "12:00", agent: 14, llm: 8, tool: 8 },
    { time: "14:00", agent: 15, llm: 9, tool: 8 },
    { time: "16:00", agent: 13, llm: 8, tool: 7 },
    { time: "18:00", agent: 9, llm: 5, tool: 5 },
    { time: "20:00", agent: 6, llm: 3, tool: 3 },
    { time: "22:00", agent: 5, llm: 3, tool: 2 },
  ],
};

/**
 * Mock success metrics
 */
const MOCK_SUCCESS_METRICS = {
  successRate: 96.8,
  totalSuccessful: 12415,
  totalFailed: 432,
  chartData: [
    { time: "00:00", successRate: 95.2, successful: 114, failed: 6 },
    { time: "02:00", successRate: 95.6, successful: 172, failed: 8 },
    { time: "04:00", successRate: 96.8, successful: 92, failed: 3 },
    { time: "06:00", successRate: 96.2, successful: 202, failed: 8 },
    { time: "08:00", successRate: 95.8, successful: 364, failed: 16 },
    { time: "10:00", successRate: 96.5, successful: 502, failed: 18 },
    { time: "12:00", successRate: 97.1, successful: 437, failed: 13 },
    { time: "14:00", successRate: 96.9, successful: 475, failed: 15 },
    { time: "16:00", successRate: 97.3, successful: 399, failed: 11 },
    { time: "18:00", successRate: 97.2, successful: 282, failed: 8 },
    { time: "20:00", successRate: 96.7, successful: 174, failed: 6 },
    { time: "22:00", successRate: 96.4, successful: 135, failed: 5 },
  ],
};

/**
 * Mock LLM metrics
 */
const MOCK_LLM_METRICS = {
  avgTokensPerRequest: 487,
  totalTokensUsed: 6247891,
  avgResponseTime: 1.24,
  chartData: [
    { time: "00:00", tokens: 420, responseTime: 1.12 },
    { time: "02:00", tokens: 445, responseTime: 1.18 },
    { time: "04:00", tokens: 395, responseTime: 1.08 },
    { time: "06:00", tokens: 468, responseTime: 1.22 },
    { time: "08:00", tokens: 512, responseTime: 1.35 },
    { time: "10:00", tokens: 535, responseTime: 1.42 },
    { time: "12:00", tokens: 505, responseTime: 1.32 },
    { time: "14:00", tokens: 518, responseTime: 1.37 },
    { time: "16:00", tokens: 490, responseTime: 1.28 },
    { time: "18:00", tokens: 455, responseTime: 1.20 },
    { time: "20:00", tokens: 430, responseTime: 1.15 },
    { time: "22:00", tokens: 410, responseTime: 1.10 },
  ],
};

/**
 * Get list of agents for monitoring
 *
 * TODO: Backend team - Replace with actual API call:
 * GET /api/agents?status=active
 * Response: { agents: AgentOption[] }
 *
 * @returns {Promise<AgentOption[]>}
 */
export async function getMonitoringAgents() {
  return apiCall("/monitoring/agents", { method: "GET" }, MOCK_AGENTS);
}

/**
 * Get traffic metrics for an agent
 *
 * TODO: Backend team - Replace with actual API call:
 * GET /api/monitoring/traffic/:agentId?timeRange=24h
 * Response: { metrics: TrafficMetrics }
 * NOTE: Consider WebSocket for real-time updates
 *
 * @param {string} agentId - Agent ID
 * @param {Object} [params={}] - Query parameters (timeRange, etc.)
 * @returns {Promise<TrafficMetrics>}
 */
export async function getTrafficMetrics(agentId, params = {}) {
  return apiCall(
    `/monitoring/traffic/${agentId}`,
    { method: "GET" },
    MOCK_TRAFFIC_METRICS
  );
}

/**
 * Get guardrail metrics for an agent
 *
 * TODO: Backend team - Replace with actual API call:
 * GET /api/monitoring/guardrails/:agentId?timeRange=24h
 * Response: { metrics: GuardrailMetrics }
 *
 * @param {string} agentId - Agent ID
 * @param {Object} [params={}] - Query parameters
 * @returns {Promise<GuardrailMetrics>}
 */
export async function getGuardrailMetrics(agentId, params = {}) {
  return apiCall(
    `/monitoring/guardrails/${agentId}`,
    { method: "GET" },
    MOCK_GUARDRAIL_METRICS
  );
}

/**
 * Get latency metrics for an agent
 *
 * TODO: Backend team - Replace with actual API call:
 * GET /api/monitoring/latency/:agentId?timeRange=24h
 * Response: { metrics: LatencyMetrics }
 *
 * @param {string} agentId - Agent ID
 * @param {Object} [params={}] - Query parameters
 * @returns {Promise<LatencyMetrics>}
 */
export async function getLatencyMetrics(agentId, params = {}) {
  return apiCall(
    `/monitoring/latency/${agentId}`,
    { method: "GET" },
    MOCK_LATENCY_METRICS
  );
}

/**
 * Get error metrics for an agent
 *
 * TODO: Backend team - Replace with actual API call:
 * GET /api/monitoring/errors/:agentId?timeRange=24h
 * Response: { metrics: ErrorMetrics }
 *
 * @param {string} agentId - Agent ID
 * @param {Object} [params={}] - Query parameters
 * @returns {Promise<ErrorMetrics>}
 */
export async function getErrorMetrics(agentId, params = {}) {
  return apiCall(
    `/monitoring/errors/${agentId}`,
    { method: "GET" },
    MOCK_ERROR_METRICS
  );
}

/**
 * Get success metrics for an agent
 *
 * TODO: Backend team - Replace with actual API call:
 * GET /api/monitoring/success/:agentId?timeRange=24h
 * Response: { metrics: SuccessMetrics }
 *
 * @param {string} agentId - Agent ID
 * @param {Object} [params={}] - Query parameters
 * @returns {Promise<SuccessMetrics>}
 */
export async function getSuccessMetrics(agentId, params = {}) {
  return apiCall(
    `/monitoring/success/${agentId}`,
    { method: "GET" },
    MOCK_SUCCESS_METRICS
  );
}

/**
 * Get LLM metrics for an agent
 *
 * TODO: Backend team - Replace with actual API call:
 * GET /api/monitoring/llm/:agentId?timeRange=24h
 * Response: { metrics: LLMMetrics }
 *
 * @param {string} agentId - Agent ID
 * @param {Object} [params={}] - Query parameters
 * @returns {Promise<LLMMetrics>}
 */
export async function getLLMMetrics(agentId, params = {}) {
  return apiCall(
    `/monitoring/llm/${agentId}`,
    { method: "GET" },
    MOCK_LLM_METRICS
  );
}

/**
 * Get all metrics for an agent (consolidated endpoint)
 *
 * TODO: Backend team - Replace with actual API call:
 * GET /api/monitoring/all/:agentId?timeRange=24h
 * Response: { metrics: AllMetrics }
 * This is more efficient than 6 separate API calls
 *
 * @param {string} agentId - Agent ID
 * @param {Object} [params={}] - Query parameters
 * @returns {Promise<AllMetrics>}
 */
export async function getAllMetrics(agentId, params = {}) {
  const allMetrics = {
    traffic: MOCK_TRAFFIC_METRICS,
    guardrails: MOCK_GUARDRAIL_METRICS,
    latency: MOCK_LATENCY_METRICS,
    errors: MOCK_ERROR_METRICS,
    success: MOCK_SUCCESS_METRICS,
    llm: MOCK_LLM_METRICS,
  };

  return apiCall(`/monitoring/all/${agentId}`, { method: "GET" }, allMetrics);
}

/**
 * Subscribe to real-time metrics updates via WebSocket
 *
 * TODO: Backend team - Implement WebSocket connection:
 * WebSocket URL: wss://api.example.com/monitoring/stream/:agentId
 * Message format: { type: "traffic"|"guardrails"|"latency"|"errors", data: {...} }
 *
 * @param {string} agentId - Agent ID
 * @param {Function} callback - Callback function to handle metric updates
 * @returns {Function} Cleanup function to close WebSocket connection
 */
export function subscribeToMetrics(agentId, callback) {
  // TODO: Backend team - Replace with actual WebSocket implementation
  console.log(`[MOCK WebSocket] Subscribing to metrics for agent: ${agentId}`);

  // Simulate periodic updates
  const interval = setInterval(() => {
    const mockUpdate = {
      type: "traffic",
      timestamp: new Date().toISOString(),
      data: {
        requests: Math.floor(Math.random() * 100 + 50),
        sessions: Math.floor(Math.random() * 30 + 10),
      },
    };
    callback(mockUpdate);
  }, 3000);

  // Return cleanup function
  return () => {
    console.log(`[MOCK WebSocket] Unsubscribing from metrics for agent: ${agentId}`);
    clearInterval(interval);
  };
}
