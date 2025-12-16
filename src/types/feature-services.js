/**
 * Feature Service Type Definitions
 * @module types/feature-services
 */

/**
 * Feature service
 * @typedef {Object} FeatureService
 * @property {number} id - Feature service ID
 * @property {string} name - Feature service name
 * @property {string} description - Feature service description
 * @property {React.ComponentType} icon - Icon component reference
 * @property {string[]} tags - Array of tags
 * @property {string} featureNo - Number of features
 * @property {string} viewsCount - Number of views
 * @property {string} lastUpdated - Last updated time (relative)
 * @property {string} createdAt - Creation date (ISO string)
 * @property {("light"|"dark")} variant - Card style variant
 */

/**
 * Feature service statistics
 * @typedef {Object} FeatureServiceStats
 * @property {string} totalFeatureServices - Total services count
 * @property {number} totalFeaturedViews - Total views count
 * @property {number} totalFeatures - Total features count
 */

/**
 * Query parameters for feature services list
 * @typedef {Object} FeatureServicesQuery
 * @property {string} [search] - Search query
 * @property {string[]} [tags] - Filter by tags
 * @property {string} [sortBy] - Sort field
 * @property {number} [page] - Page number
 * @property {number} [limit] - Items per page
 */

export {};
