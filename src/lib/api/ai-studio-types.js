/**
 * Type definitions for AI Studio API
 *
 * This file contains JSDoc type definitions for all data structures used in AI Studio.
 * These types are used for IntelliSense and documentation purposes.
 *
 * @module api/ai-studio-types
 */

// ============================================================================
// USE CASES
// ============================================================================

/**
 * @typedef {Object} UseCase
 * @property {number} id - Unique identifier
 * @property {string} slug - URL-friendly slug
 * @property {string} name - Use case name
 * @property {Function} icon - Icon component reference
 * @property {string} description - Use case description
 * @property {string[]} tags - Associated tags
 * @property {string} models - Number of models (as string)
 * @property {string} lastUpdated - Last update timestamp
 * @property {string} peopleCount - Number of contributors (as string)
 * @property {string} createdAt - Creation timestamp
 * @property {string} variant - UI variant (light/dark)
 */

/**
 * @typedef {Object} CreateUseCasePayload
 * @property {string} name - Use case name
 * @property {string} description - Use case description
 * @property {string[]} tags - Associated tags
 */

/**
 * @typedef {Object} UseCaseStats
 * @property {number} totalUseCases - Total number of use cases
 * @property {number} totalModels - Total number of models across all use cases
 * @property {number} totalContributors - Total number of unique contributors
 */

// ============================================================================
// MODELS
// ============================================================================

/**
 * @typedef {Object} Model
 * @property {number} id - Unique identifier
 * @property {string} ModelSlug - URL-friendly slug
 * @property {string} name - Model name
 * @property {Function} icon - Icon component reference
 * @property {string} description - Model description
 * @property {string[]} tags - Associated tags
 * @property {number} versions - Number of versions
 * @property {number} features - Number of features
 * @property {string} status - Deployment status ("Deployed" | "Undeployed")
 * @property {string} lastUpdated - Last update timestamp
 * @property {string} createdAt - Creation timestamp
 * @property {string} variant - UI variant (light/dark)
 */

/**
 * @typedef {Object} CreateModelPayload
 * @property {string} name - Model name
 * @property {string} description - Model description
 * @property {string[]} tags - Associated tags
 */

/**
 * @typedef {Object} ModelStats
 * @property {string} owner - Model owner name
 * @property {string} totalModels - Total number of models (as string)
 * @property {string} deployed - Number of deployed models (as string)
 */

// ============================================================================
// VERSIONS
// ============================================================================

/**
 * @typedef {Object} Version
 * @property {number} id - Unique identifier
 * @property {string} name - Version name (e.g., "V1", "V2")
 * @property {string} versionSlug - URL-friendly slug
 * @property {Function} icon - Icon component reference
 * @property {string} description - Version description
 * @property {string[]} tags - Associated tags
 * @property {number} versions - Version number
 * @property {number} features - Number of features
 * @property {string} status - Deployment status ("Deployed" | "Undeployed")
 * @property {string} accuracy - Model accuracy percentage
 * @property {string} lastUpdated - Last update timestamp
 * @property {string} createdAt - Creation timestamp
 * @property {string} variant - UI variant (light/dark)
 */

/**
 * @typedef {Object} VersionDetail
 * @property {number} id - Unique identifier
 * @property {string} name - Version name
 * @property {string} description - Version description
 * @property {string} status - Deployment status
 * @property {string} owner - Version owner
 * @property {string} lastModified - Last modification time
 * @property {string} usage - Usage statistics
 * @property {VersionStat[]} stats - Version statistics
 * @property {VersionMetrics} metrics - Performance metrics
 */

/**
 * @typedef {Object} VersionStat
 * @property {string} title - Statistic title
 * @property {string} value - Statistic value
 */

/**
 * @typedef {Object} VersionMetrics
 * @property {string} totalRequests - Total number of requests
 * @property {string} avgResponse - Average response time
 * @property {string} successRate - Success rate percentage
 * @property {string} activeUsers - Number of active users
 */

/**
 * @typedef {Object} CreateVersionPayload
 * @property {string} description - Version description
 * @property {string[]} tags - Associated tags
 */

/**
 * @typedef {Object} VersionStats
 * @property {string} owner - Version owner name
 * @property {string} totalVersions - Total number of versions (as string)
 * @property {string} undeploy - Number of undeployed versions (as string)
 */

// ============================================================================
// INFERENCE
// ============================================================================

/**
 * @typedef {Object} InferenceFeatures
 * @property {number} age - Age value
 * @property {number} income - Income value
 * @property {number} creditScore - Credit score value
 * @property {number} accountBalance - Account balance value
 * @property {number} transactionFreq - Transaction frequency value
 * @property {number} claimHistory - Claim history value
 * @property {number} policyDuration - Policy duration value
 * @property {number} coverageAmount - Coverage amount value
 */

/**
 * @typedef {Object} InferenceResult
 * @property {string} prediction - Prediction result (e.g., "No Fraud", "Fraud")
 * @property {number} confidence - Confidence percentage
 * @property {number} riskScore - Risk score percentage
 * @property {string} timestamp - Inference timestamp
 * @property {Object.<string, number>} features - Feature importance scores
 */

/**
 * @typedef {Object} BatchInferenceResult
 * @property {number} totalProcessed - Total number of records processed
 * @property {number} fraudDetected - Number of fraud cases detected
 * @property {number} avgConfidence - Average confidence score
 * @property {string} avgResponseTime - Average response time
 * @property {string} resultsUrl - URL to download full results
 */

/**
 * @typedef {Object} InferenceInsights
 * @property {InferenceStat[]} stats - Statistics overview
 * @property {PieDataPoint[]} pieData - Prediction distribution data
 * @property {FeatureDataPoint[]} featureData - Feature importance data
 * @property {ChartDataPoint[]} predictionTrends - Prediction trends over time
 * @property {ConfidenceDistribution[]} confidenceDistribution - Confidence score distribution
 * @property {RiskScoreDistribution[]} riskScoreDistribution - Risk score distribution
 * @property {number[]} recentFraudCases - Recent fraud case IDs
 */

/**
 * @typedef {Object} InferenceStat
 * @property {string} title - Statistic title
 * @property {string} value - Statistic value
 * @property {string} description - Statistic description
 */

/**
 * @typedef {Object} PieDataPoint
 * @property {string} name - Category name
 * @property {number} value - Value
 */

/**
 * @typedef {Object} FeatureDataPoint
 * @property {string} label - Feature label
 * @property {number} value - Feature importance value
 */

/**
 * @typedef {Object} ChartDataPoint
 * @property {string} name - Time label
 * @property {number} noFraud - No fraud count
 * @property {number} fraud - Fraud count
 */

/**
 * @typedef {Object} ConfidenceDistribution
 * @property {string} range - Confidence range
 * @property {number} score - Score count
 */

/**
 * @typedef {Object} RiskScoreDistribution
 * @property {string} range - Risk score range
 * @property {number} score - Score count
 */

/**
 * @typedef {Object} InferenceHistory
 * @property {number} total - Total number of inference records
 * @property {InferenceHistoryItem[]} items - Inference history items
 */

/**
 * @typedef {Object} InferenceHistoryItem
 * @property {number} id - Unique identifier
 * @property {string} transactionId - Transaction ID
 * @property {string} prediction - Prediction result
 * @property {number} confidence - Confidence percentage
 * @property {number} riskScore - Risk score percentage
 * @property {string} timestamp - Inference timestamp
 */

// ============================================================================
// MONITORING
// ============================================================================

/**
 * @typedef {Object} DriftMetrics
 * @property {number} totalFeatures - Total number of features
 * @property {number} driftedFeatures - Number of drifted features
 * @property {string} driftDetectedAt - Timestamp of drift detection
 * @property {DriftDataPoint[]} datasetDrift - Dataset drift over time
 */

/**
 * @typedef {Object} DriftDataPoint
 * @property {number} time - Unix timestamp
 * @property {string} timeLabel - Human-readable time label
 * @property {number} driftedFeatures - Number of drifted features at this time
 */

/**
 * @typedef {Object} APIMetrics
 * @property {number} requestRate - Request rate (ops/s)
 * @property {number} successRate - Success rate percentage
 * @property {number} error4xx - 4xx error rate (ops/s)
 * @property {number} error5xx - 5xx error rate (ops/s)
 * @property {LatencyDataPoint[]} latency - Latency metrics over time
 */

/**
 * @typedef {Object} LatencyDataPoint
 * @property {number} time - Unix timestamp
 * @property {number} endToEnd - End-to-end latency (seconds)
 */

/**
 * @typedef {Object} MonitoringOverview
 * @property {DriftMetrics} drift - Drift metrics
 * @property {APIMetrics} api - API metrics
 */

/**
 * @typedef {Object} MonitoringUpdate
 * @property {string} type - Update type
 * @property {number} timestamp - Update timestamp
 * @property {Object} drift - Drift update data
 * @property {Object} api - API update data
 */

// ============================================================================
// QUICK START
// ============================================================================

/**
 * @typedef {Object} QuickStartState
 * @property {string[]} selectedTables - Selected table names
 * @property {string} useCaseName - Use case name
 * @property {string} modelName - Model name
 * @property {string} description - Description
 * @property {string[]} tags - Tags
 * @property {string} owner - Owner name/email
 * @property {string} modelingProcess - Modeling process type
 * @property {Object} parameters - Process-specific parameters
 */

/**
 * @typedef {Object} TrainingProgress
 * @property {number} progress - Progress percentage (0-100)
 * @property {string} currentStep - Current step description
 * @property {string[]} completedSteps - List of completed steps
 */

// ============================================================================
// EXPORTS
// ============================================================================

export default {};
