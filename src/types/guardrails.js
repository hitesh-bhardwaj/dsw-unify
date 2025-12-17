/**
 * Guardrails Type Definitions
 * @module types/guardrails
 */

/**
 * Guardrail object
 * @typedef {Object} Guardrail
 * @property {number} id - Guardrail ID
 * @property {string} name - Guardrail name
 * @property {string} description - Guardrail description
 * @property {React.ComponentType} icon - Icon component reference
 * @property {("Input"|"Output"|"Both")} direction - Guardrail direction
 * @property {string} category - Category (Security, Privacy, Content Safety, etc.)
 * @property {string[]} tags - Array of tags
 * @property {("default"|"custom")} type - Guardrail type
 * @property {boolean} [isCustom] - Whether this is a custom guardrail
 * @property {string} [basedOn] - Base guardrail name (for custom guardrails)
 */

/**
 * Guardrail detail (extended information)
 * @typedef {Object} GuardrailDetail
 * @property {number} id - Guardrail ID
 * @property {string} name - Guardrail name
 * @property {string} description - Guardrail description
 * @property {React.ComponentType} icon - Icon component reference
 * @property {("Input"|"Output"|"Both")} direction - Guardrail direction
 * @property {string} category - Category
 * @property {string[]} tags - Array of tags
 * @property {("default"|"custom")} type - Guardrail type
 * @property {string} checkType - Check type (e.g., "LLM-based", "Pattern Matching")
 * @property {string} totalChecks - Total checks performed
 * @property {string} violationsDetected - Number of violations detected
 * @property {string} passRate - Pass rate percentage
 * @property {string} detectionMethod - Detection method description
 * @property {string} avgResponseTime - Average response time
 * @property {TechnicalDetails} technicalDetails - Technical details
 * @property {DetectionExamples} detectionExamples - Detection examples
 * @property {PerformanceMetrics} performanceMetrics - Performance metrics
 * @property {GuardSuiteUsage[]} usedInSuites - Guard suites using this guardrail
 */

/**
 * Technical details for guardrail
 * @typedef {Object} TechnicalDetails
 * @property {string} id - Technical ID
 * @property {string} type - Type (Input/Output)
 * @property {string} category - Category
 * @property {string} version - Version
 * @property {string} lastUpdated - Last updated date
 */

/**
 * Detection examples
 * @typedef {Object} DetectionExamples
 * @property {DetectionExample} violation - Violation example
 * @property {DetectionExample} safe - Safe example
 */

/**
 * Individual detection example
 * @typedef {Object} DetectionExample
 * @property {string} input - Example input
 * @property {string} reason - Reason for detection result
 */

/**
 * Performance metrics
 * @typedef {Object} PerformanceMetrics
 * @property {string} truePositives - True positives count
 * @property {string} falsePositives - False positives count
 * @property {string} accuracy - Accuracy percentage
 */

/**
 * Guard suite usage reference
 * @typedef {Object} GuardSuiteUsage
 * @property {string} name - Suite name
 * @property {("active"|"inactive")} status - Suite status
 */

/**
 * Guard suite object
 * @typedef {Object} GuardSuite
 * @property {number} id - Suite ID
 * @property {string} name - Suite name
 * @property {string} description - Suite description
 * @property {("active"|"inactive")} status - Suite status
 * @property {React.ComponentType} icon - Icon component reference
 * @property {GuardrailReference[]} inputGuardrails - Input guardrails
 * @property {GuardrailReference[]} outputGuardrails - Output guardrails
 * @property {number|string} agentsCount - Number of agents using this suite
 * @property {string} createdDate - Created date (YYYY-MM-DD)
 * @property {string[]} tags - Array of tags
 * @property {string} [slug] - URL slug (derived from name)
 */

/**
 * Guardrail reference in a suite
 * @typedef {Object} GuardrailReference
 * @property {number} [id] - Guardrail ID
 * @property {string} name - Guardrail name
 * @property {("Low"|"Medium"|"High"|"Critical")} [severity] - Severity level
 * @property {("active"|"inactive")} [status] - Status
 */

/**
 * Guard suite detail (extended information)
 * @typedef {Object} GuardSuiteDetail
 * @property {number} id - Suite ID
 * @property {string} name - Suite name
 * @property {string} slug - URL slug
 * @property {string} description - Suite description
 * @property {("active"|"inactive")} status - Suite status
 * @property {React.ComponentType} icon - Icon component reference
 * @property {number} inputGuardrailsCount - Count of input guardrails
 * @property {number} outputGuardrailsCount - Count of output guardrails
 * @property {number|string} agentsCount - Number of agents using this suite
 * @property {string} createdDate - Created date (YYYY-MM-DD)
 * @property {string[]} tags - Array of tags
 * @property {GuardrailReference[]} inputGuardrails - Detailed input guardrails
 * @property {GuardrailReference[]} outputGuardrails - Detailed output guardrails
 */

/**
 * Query parameters for guardrails list
 * @typedef {Object} GuardrailsQuery
 * @property {string} [search] - Search query
 * @property {("default"|"custom")} [type] - Filter by type
 * @property {string} [category] - Filter by category
 * @property {("Input"|"Output"|"Both")} [direction] - Filter by direction
 * @property {string} [sortBy] - Sort field
 * @property {("asc"|"desc")} [sortOrder] - Sort order
 */

export {};
