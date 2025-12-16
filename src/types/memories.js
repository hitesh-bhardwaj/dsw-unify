/**
 * Memory Type Definitions
 * @module types/memories
 */

/**
 * Memory statistics
 * @typedef {Object} MemoryStats
 * @property {string} totalMemories - Total memories count
 * @property {string} activeMemories - Active memories count
 * @property {string} totalEntries - Total entries count across all memories
 */

/**
 * Memory overview data
 * @typedef {Object} MemoryOverview
 * @property {string} totalEntries - Total entries in this memory
 * @property {string} type - Memory type (e.g., "Session", "Persistent")
 * @property {string} scope - Memory scope (e.g., "User", "Agent", "Organization")
 * @property {string} status - Memory status (e.g., "Active", "Inactive")
 * @property {string} storageUsed - Storage size display
 * @property {string} queriesToday - Number of queries today
 * @property {string} retrievalAccuracy - Retrieval accuracy percentage
 * @property {string} avgQueryTime - Average query time display
 */

/**
 * Memory entry object
 * @typedef {Object} MemoryEntry
 * @property {number} id - Entry ID
 * @property {string} content - Entry content
 * @property {string} time - Timestamp (relative time)
 */

/**
 * Memory settings object
 * @typedef {Object} MemorySettings
 * @property {string} name - Memory name
 * @property {string} description - Memory description
 * @property {string} retentionPolicy - Retention policy description
 * @property {string} maxEntries - Maximum entries allowed
 * @property {string} [updatedAt] - Last update timestamp (ISO string)
 */

/**
 * Memory object
 * @typedef {Object} Memory
 * @property {string} id - Memory ID (slug format)
 * @property {string} name - Memory name
 * @property {string} description - Memory description
 * @property {React.ComponentType} icon - Icon component reference
 * @property {("active"|"inactive")} status - Memory status
 * @property {string[]} tags - Array of tags
 * @property {string} size - Storage size display
 * @property {number} entries - Entries count
 * @property {("light"|"dark")} variant - Card style variant
 */

/**
 * Query parameters for memories list
 * @typedef {Object} MemoriesQuery
 * @property {string} [search] - Search query
 * @property {string[]} [tags] - Filter by tags
 * @property {string} [sortBy] - Sort field
 * @property {number} [page] - Page number
 * @property {number} [limit] - Items per page
 */

export {};
