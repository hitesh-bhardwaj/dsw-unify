/**
 * Feature View Type Definitions
 * @module types/feature-views
 */

/**
 * Table information
 * @typedef {Object} TableInfo
 * @property {string} name - Table name
 * @property {string} columns - Column count
 * @property {string} rows - Row count
 */

/**
 * Feature view
 * @typedef {Object} FeatureView
 * @property {number} id - Feature view ID
 * @property {string} name - Feature view name
 * @property {string} description - Feature view description
 * @property {React.ComponentType} icon - Icon component reference
 * @property {string[]} tags - Array of tags
 * @property {string} featureNo - Number of features
 * @property {string} tablesCount - Number of tables
 * @property {string} lastUpdated - Last updated time (relative)
 * @property {string} createdAt - Creation date (ISO string)
 * @property {("light"|"dark")} variant - Card style variant
 */

/**
 * Feature view statistics
 * @typedef {Object} FeatureViewStats
 * @property {string} totalFeatureViews - Total views count
 * @property {number} totalFeatures - Total features count
 * @property {number} totalTables - Total tables count
 */

/**
 * Query parameters for feature views list
 * @typedef {Object} FeatureViewsQuery
 * @property {string} [search] - Search query
 * @property {string[]} [tags] - Filter by tags
 * @property {string} [sortBy] - Sort field
 * @property {number} [page] - Page number
 * @property {number} [limit] - Items per page
 */

export {};
