/**
 * LLM Type Definitions
 * @module types/llms
 */

/**
 * LLM metrics
 * @typedef {Object} LLMMetrics
 * @property {string} request - Total requests count
 * @property {string} avgRes - Average response time
 * @property {string} upTime - Uptime percentage
 * @property {string} cost - Total cost display
 */

/**
 * LLM configuration
 * @typedef {Object} LLMConfig
 * @property {string} modelType - Model type/name
 * @property {string} apiEndpoint - API endpoint URL
 * @property {number} temperature - Temperature setting (0-1)
 * @property {number} maxTokens - Maximum tokens
 * @property {string} [updatedAt] - Last update timestamp (ISO string)
 */

/**
 * LLM activity log entry
 * @typedef {Object} LLMActivity
 * @property {string} content - Activity description
 * @property {string} recentActivity - Relative time (e.g., "30 minutes ago")
 * @property {("green"|"red"|"yellow")} color - Activity status color
 */

/**
 * LLM object
 * @typedef {Object} LLM
 * @property {string} id - LLM ID (slug format)
 * @property {string} name - LLM name
 * @property {string} description - LLM description
 * @property {React.ComponentType} icon - Icon component reference
 * @property {("active"|"deploying"|"inactive"|"error")} status - LLM status
 * @property {string[]} tags - Array of tags
 * @property {string} requests - Requests count display
 * @property {string} avgres - Average response time
 * @property {boolean} deploy - Whether currently deploying
 * @property {boolean} [performance] - Whether has performance data
 * @property {string} [accuracy] - Accuracy percentage (for fine-tuned models)
 * @property {string} [latency] - Latency display (for fine-tuned models)
 * @property {string} [request] - Alternative requests field (detail view)
 * @property {string} [avgRes] - Alternative avgres field (detail view)
 * @property {string} [upTime] - Uptime percentage (detail view)
 * @property {string} [cost] - Cost display (detail view)
 */

/**
 * Query parameters for LLMs list
 * @typedef {Object} LLMsQuery
 * @property {string} [search] - Search query
 * @property {string[]} [tags] - Filter by tags
 * @property {string} [sortBy] - Sort field
 * @property {("all"|"selfHosted"|"apiBased"|"fineTuned")} [tab] - Filter by type
 * @property {number} [page] - Page number
 * @property {number} [limit] - Items per page
 */

export {};
