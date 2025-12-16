/**
 * Agent Type Definitions
 * @module types/agents
 */

/**
 * Agent metrics
 * @typedef {Object} AgentMetrics
 * @property {string} totalRequests - Total requests count
 * @property {string} avgResponse - Average response time
 * @property {string} successRate - Success rate percentage
 * @property {string} activeUsers - Active users count
 */

/**
 * Agent health status
 * @typedef {Object} AgentHealth
 * @property {string} lastActivity - Last activity timestamp
 * @property {string} errorRate - Error rate percentage
 * @property {string} systemStatus - System status (operational, degraded, down)
 */

/**
 * Agent activity log entry
 * @typedef {Object} AgentActivity
 * @property {("success"|"info"|"warning"|"error")} type - Activity type
 * @property {string} event - Event description
 * @property {string} time - Relative time (e.g., "2 minutes ago")
 */

/**
 * Agent object
 * @typedef {Object} Agent
 * @property {string} id - Agent ID (slug format)
 * @property {string} name - Agent name
 * @property {string} description - Agent description
 * @property {React.ComponentType} icon - Icon component reference
 * @property {("active"|"draft"|"inactive")} status - Agent status
 * @property {string[]} tags - Array of tags
 * @property {string} lastActivity - Last activity (relative time)
 * @property {string} requestCount - Request count display
 * @property {("light"|"dark")} variant - Card style variant
 * @property {string} [lastModified] - Last modified (for detail view)
 * @property {string} [usage] - Usage display (for detail view)
 * @property {AgentMetrics} [metrics] - Performance metrics (for detail view)
 * @property {AgentHealth} [health] - Health status (for detail view)
 * @property {AgentActivity[]} [recentActivity] - Recent activity log (for detail view)
 */

/**
 * Agent statistics
 * @typedef {Object} AgentStats
 * @property {string} totalAgents - Total count
 * @property {string} activeAgents - Active count
 * @property {string} totalRequests - Total requests count
 */

/**
 * Conversation object
 * @typedef {Object} Conversation
 * @property {("success"|"warning"|"error")} type - Conversation status
 * @property {string} event - Conversation ID
 * @property {string} mail - User email
 * @property {string} turns - Number of turns
 * @property {string} time - Duration
 */

/**
 * Conversation statistics
 * @typedef {Object} ConversationStats
 * @property {string} totalConversations - Total conversations count
 * @property {string} avgTurnsPerConv - Average turns per conversation
 * @property {string} avgDuration - Average duration
 * @property {string} userSatisfaction - User satisfaction percentage
 */

/**
 * Query parameters for agents list
 * @typedef {Object} AgentsQuery
 * @property {string} [search] - Search query
 * @property {string[]} [tags] - Filter by tags
 * @property {string} [sortBy] - Sort field
 * @property {number} [page] - Page number
 * @property {number} [limit] - Items per page
 */

export {};
