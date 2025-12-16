/**
 * Dashboard Type Definitions
 * @module types/dashboard
 */

/**
 * Metric data for dashboard
 * @typedef {Object} Metric
 * @property {string} label - Metric label
 * @property {string|number} value - Metric value
 * @property {number} change - Percentage change
 * @property {number[]} trend - 8-point trend data array
 */

/**
 * Feature item for dashboard sections
 * @typedef {Object} FeatureItem
 * @property {React.ComponentType} icon - Icon component reference
 * @property {string} title - Feature title
 * @property {string} description - Feature description
 * @property {string} href - Navigation link
 */

/**
 * Dashboard features response
 * @typedef {Object} DashboardFeatures
 * @property {FeatureItem[]} dataEngineering - Data engineering features
 * @property {FeatureItem[]} featureStore - Feature store features
 * @property {FeatureItem[]} aiStudio - AI studio features
 * @property {FeatureItem[]} agentStudio - Agent studio features
 * @property {FeatureItem[]} workflowBuilder - Workflow builder features
 */

/**
 * Card visibility preferences
 * @typedef {Object.<string, boolean>} CardVisibility
 */

export {};
