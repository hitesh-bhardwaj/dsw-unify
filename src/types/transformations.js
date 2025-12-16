/**
 * Feature Transformation Type Definitions
 * @module types/transformations
 */

/**
 * Input parameter for transformation
 * @typedef {Object} InputParam
 * @property {string} name - Parameter name
 * @property {string} type - Parameter type (string, array, etc.)
 * @property {("Yes"|"No")} required - Whether parameter is required
 * @property {string} description - Parameter description
 */

/**
 * Feature transformation
 * @typedef {Object} Transformation
 * @property {number} id - Transformation ID
 * @property {string} name - Transformation name
 * @property {string} description - Transformation description
 * @property {React.ComponentType} icon - Icon component reference
 * @property {string[]} tags - Array of tags
 * @property {InputParam[]} inputParams - Input parameters
 * @property {string} codeExamples - Code example/snippet
 * @property {string} lastUpdated - Last updated time (relative)
 * @property {string} createdAt - Creation date (ISO string)
 * @property {("light"|"dark")} variant - Card style variant
 */

/**
 * Transformation statistics
 * @typedef {Object} TransformationStats
 * @property {string} totalTransformations - Total count
 * @property {string} activeTransformations - Active count
 * @property {string} transformationTypes - Types count
 */

/**
 * Query parameters for transformations list
 * @typedef {Object} TransformationsQuery
 * @property {string} [search] - Search query
 * @property {string[]} [tags] - Filter by tags
 * @property {string} [sortBy] - Sort field
 * @property {number} [page] - Page number
 * @property {number} [limit] - Items per page
 */

export {};
