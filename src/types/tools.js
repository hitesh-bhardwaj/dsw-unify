/**
 * Tool Type Definitions
 * @module types/tools
 */

/**
 * Tool overview
 * @typedef {Object} ToolOverview
 * @property {string} name - Tool name
 * @property {string} description - Tool description
 * @property {string} type - Tool type (e.g., "API Integration", "Function")
 * @property {string} provider - Provider name
 * @property {string} version - Version string
 */

/**
 * Tool configuration
 * @typedef {Object} ToolConfig
 * @property {string} [apiEndpoint] - API endpoint URL
 * @property {number} [timeout] - Timeout in milliseconds
 * @property {number} [retryAttempts] - Number of retry attempts
 * @property {Object} [parameters] - Configuration parameters
 * @property {string} [updatedAt] - Last update timestamp (ISO string)
 */

/**
 * Tool usage statistics
 * @typedef {Object} ToolUsage
 * @property {number} totalCalls - Total calls count
 * @property {number} successRate - Success rate percentage
 * @property {string} avgResponseTime - Average response time display
 * @property {number[]} trend - Usage trend data
 */

/**
 * Tool object
 * @typedef {Object} Tool
 * @property {string} id - Tool ID (slug format)
 * @property {string} name - Tool name
 * @property {string} description - Tool description
 * @property {React.ComponentType} icon - Icon component reference
 * @property {("active"|"beta"|"inactive")} status - Tool status
 * @property {string[]} tags - Array of tags
 * @property {("light"|"dark")} variant - Card style variant
 */

/**
 * Tool statistics
 * @typedef {Object} ToolStats
 * @property {string} totalTools - Total count
 * @property {string} activeTools - Active count
 * @property {string} categories - Categories count
 */

/**
 * Query parameters for tools list
 * @typedef {Object} ToolsQuery
 * @property {string} [search] - Search query
 * @property {string[]} [tags] - Filter by tags
 * @property {string} [sortBy] - Sort field
 * @property {number} [page] - Page number
 * @property {number} [limit] - Items per page
 */

export {};
