/**
 * Monitoring Type Definitions
 * @module types/monitoring
 */

/**
 * Agent option for monitoring selection
 * @typedef {Object} AgentOption
 * @property {string} id - Agent ID
 * @property {string} name - Agent name
 * @property {("active"|"inactive")} status - Agent status
 */

/**
 * Chart data point for time-series metrics
 * @typedef {Object} ChartDataPoint
 * @property {string} time - Time label (e.g., "00:00", "02:00")
 * @property {number} [value] - Generic value field
 * @property {number} [requests] - Requests count
 * @property {number} [sessions] - Sessions count
 * @property {number} [preInference] - Pre-inference triggers
 * @property {number} [postInference] - Post-inference triggers
 * @property {number} [endToEnd] - End-to-end latency
 * @property {number} [processing] - Processing latency
 * @property {number} [toolInvocation] - Tool invocation latency
 * @property {number} [agent] - Agent errors
 * @property {number} [llm] - LLM errors
 * @property {number} [tool] - Tool errors
 * @property {number} [successRate] - Success rate percentage
 * @property {number} [successful] - Successful count
 * @property {number} [failed] - Failed count
 * @property {number} [tokens] - Token count
 * @property {number} [responseTime] - Response time
 */

/**
 * Traffic metrics
 * @typedef {Object} TrafficMetrics
 * @property {number} totalRequests - Total requests count
 * @property {number} totalSessions - Total sessions count
 * @property {ChartDataPoint[]} chartData - Time-series data
 */

/**
 * Guardrail metrics
 * @typedef {Object} GuardrailMetrics
 * @property {number} preInference - Pre-inference triggers count
 * @property {number} postInference - Post-inference triggers count
 * @property {number} avgLatency - Average latency in seconds
 * @property {ChartDataPoint[]} chartData - Time-series data
 */

/**
 * Latency metrics
 * @typedef {Object} LatencyMetrics
 * @property {number} endToEnd - End-to-end latency in seconds
 * @property {number} processing - Processing latency in seconds
 * @property {number} toolInvocation - Tool invocation latency in seconds
 * @property {ChartDataPoint[]} chartData - Time-series data
 */

/**
 * Error metrics
 * @typedef {Object} ErrorMetrics
 * @property {number} agentErrors - Agent errors count
 * @property {number} llmErrors - LLM errors count
 * @property {number} toolErrors - Tool errors count
 * @property {ChartDataPoint[]} chartData - Time-series data
 */

/**
 * Success metrics
 * @typedef {Object} SuccessMetrics
 * @property {number} successRate - Success rate percentage
 * @property {number} totalSuccessful - Total successful requests
 * @property {number} totalFailed - Total failed requests
 * @property {ChartDataPoint[]} chartData - Time-series data
 */

/**
 * LLM metrics
 * @typedef {Object} LLMMetrics
 * @property {number} avgTokensPerRequest - Average tokens per request
 * @property {number} totalTokensUsed - Total tokens used
 * @property {number} avgResponseTime - Average response time in seconds
 * @property {ChartDataPoint[]} chartData - Time-series data
 */

/**
 * All metrics consolidated
 * @typedef {Object} AllMetrics
 * @property {TrafficMetrics} traffic - Traffic metrics
 * @property {GuardrailMetrics} guardrails - Guardrail metrics
 * @property {LatencyMetrics} latency - Latency metrics
 * @property {ErrorMetrics} errors - Error metrics
 * @property {SuccessMetrics} success - Success metrics
 * @property {LLMMetrics} llm - LLM metrics
 */

/**
 * Real-time metric update (WebSocket message)
 * @typedef {Object} MetricUpdate
 * @property {("traffic"|"guardrails"|"latency"|"errors"|"success"|"llm")} type - Metric type
 * @property {string} timestamp - ISO timestamp
 * @property {Object} data - Metric data (structure depends on type)
 */

export {};
