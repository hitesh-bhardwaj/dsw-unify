/**
 * Prompt Type Definitions
 * @module types/prompts
 */

/**
 * Prompt content
 * @typedef {Object} PromptContent
 * @property {string} text - Prompt text content
 * @property {string[]} variables - Available variables
 */

/**
 * Prompt metadata
 * @typedef {Object} PromptMetadata
 * @property {string} version - Version string (e.g., "v3")
 * @property {string} createdAt - Creation timestamp (ISO string)
 * @property {string} updatedAt - Last update timestamp (ISO string)
 * @property {string} author - Author name
 */

/**
 * Prompt usage statistics
 * @typedef {Object} PromptUsage
 * @property {number} totalUses - Total usage count
 * @property {number} uniqueUsers - Unique users count
 * @property {number} avgRating - Average rating
 * @property {number[]} trend - Usage trend data
 */

/**
 * Prompt object
 * @typedef {Object} Prompt
 * @property {number} id - Prompt ID
 * @property {string} name - Prompt name
 * @property {string} description - Prompt description
 * @property {string} slug - URL slug
 * @property {number} rating - Average rating (0-5)
 * @property {React.ComponentType} icon - Icon component reference
 * @property {string} version - Version string (e.g., "v3")
 * @property {string[]} tags - Array of tags
 * @property {string} uses - Usage count display
 * @property {string} lastUpdated - Last updated date (DD/MM/YYYY)
 * @property {string} preview - Preview text
 * @property {("light"|"dark")} variant - Card style variant
 */

/**
 * Template object
 * @typedef {Object} Template
 * @property {number} id - Template ID
 * @property {string} name - Template name
 * @property {string} description - Template description
 * @property {React.ComponentType} icon - Icon component reference
 * @property {string[]} tags - Array of tags
 * @property {string} uses - Usage count display
 * @property {string} variable - Comma-separated variable names
 * @property {("light"|"dark")} variant - Card style variant
 */

/**
 * Prompt statistics
 * @typedef {Object} PromptStats
 * @property {string} totalPrompts - Total prompts count
 * @property {number} totalUses - Total uses count
 * @property {string} categories - Categories count
 */

/**
 * Query parameters for prompts list
 * @typedef {Object} PromptsQuery
 * @property {string} [search] - Search query
 * @property {string[]} [tags] - Filter by tags
 * @property {string} [sortBy] - Sort field
 * @property {number} [page] - Page number
 * @property {number} [limit] - Items per page
 */

export {};
