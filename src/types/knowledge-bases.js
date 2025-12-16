/**
 * Knowledge Base Type Definitions
 * @module types/knowledge-bases
 */

/**
 * Knowledge base statistics
 * @typedef {Object} KnowledgeBaseStats
 * @property {string} totalKnowledgeBases - Total knowledge bases count
 * @property {string} synced - Synced knowledge bases count
 * @property {string} totalDocuments - Total documents count
 */

/**
 * Document object
 * @typedef {Object} Document
 * @property {string} id - Document ID
 * @property {string} name - Document filename
 * @property {string} description - Document description
 * @property {string} storage - File size display
 * @property {string} time - Last updated time (relative)
 */

/**
 * Storage strategy configuration
 * @typedef {Object} StorageStrategy
 * @property {string} type - Storage type (e.g., "vector", "keyword", "hybrid")
 * @property {string} embeddingModel - Embedding model name
 * @property {number} chunkSize - Document chunk size
 * @property {number} chunkOverlap - Chunk overlap size
 * @property {string} indexType - Index type (e.g., "faiss", "annoy")
 * @property {string} [updatedAt] - Last update timestamp (ISO string)
 */

/**
 * Activity log entry
 * @typedef {Object} Activity
 * @property {string} id - Activity ID
 * @property {string} action - Action description
 * @property {string} [document] - Related document name
 * @property {string} user - User who performed the action
 * @property {string} timestamp - Timestamp (relative time)
 */

/**
 * Knowledge base settings
 * @typedef {Object} KnowledgeBaseSettings
 * @property {boolean} autoSync - Auto-sync enabled
 * @property {string} syncInterval - Sync interval (e.g., "daily", "weekly", "hourly")
 * @property {boolean} publicAccess - Public access enabled
 * @property {boolean} allowDownload - Allow document downloads
 * @property {string} [updatedAt] - Last update timestamp (ISO string)
 */

/**
 * Knowledge base object
 * @typedef {Object} KnowledgeBase
 * @property {string} id - Knowledge base ID (slug format)
 * @property {string} name - Knowledge base name
 * @property {React.ComponentType} icon - Icon component reference
 * @property {string} description - Knowledge base description
 * @property {("active"|"draft"|"syncing"|"error")} status - Knowledge base status
 * @property {string} size - Storage size display
 * @property {string} documentsCount - Documents count display
 * @property {("light"|"dark")} variant - Card style variant
 * @property {string} lastSynced - Last sync time (relative)
 * @property {string} [documents] - Alternative documents field (detail view)
 * @property {string} [storage] - Alternative storage field (detail view)
 * @property {string} [source] - Source system (e.g., "Google Drive", "S3")
 */

/**
 * Query parameters for knowledge bases list
 * @typedef {Object} KnowledgeBasesQuery
 * @property {string} [search] - Search query
 * @property {string} [sortBy] - Sort field
 * @property {number} [page] - Page number
 * @property {number} [limit] - Items per page
 */

export {};
