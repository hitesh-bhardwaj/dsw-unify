/**
 * Inference API Service
 *
 * This module handles all API calls related to Model Inference in AI Studio.
 * Currently uses mock data - Backend team should replace with actual API calls.
 *
 * @module api/inference
 */

import { apiCall } from './client';

/**
 * Mock inference insights data
 */
const MOCK_INFERENCE_INSIGHTS = {
  stats: [
    {
      title: "Total Inferences",
      value: "1,000",
      description: "+12.5% from last week",
    },
    {
      title: "Fraud Detection Rate",
      value: "18.8%",
      description: "188 cases flagged",
    },
    {
      title: "Avg Confidence",
      value: "94.2%",
      description: "High reliability",
    },
    {
      title: "Avg Response Time",
      value: "0.08s",
      description: "Within SLA",
    },
  ],
  pieData: [
    { name: "Fraud", value: 80 },
    { name: "No Fraud", value: 20 },
  ],
  featureData: [
    { label: "Transaction Frequency", value: 92 },
    { label: "Claim History", value: 85 },
    { label: "Credit Score", value: 78 },
    { label: "Account Balance", value: 65 },
    { label: "Policy Duration", value: 52 },
  ],
  predictionTrends: [
    { name: "Jan 8", noFraud: 200, fraud: 45 },
    { name: "Jan 9", noFraud: 185, fraud: 52 },
    { name: "Jan 10", noFraud: 190, fraud: 55 },
    { name: "Jan 11", noFraud: 170, fraud: 38 },
    { name: "Jan 12", noFraud: 202, fraud: 62 },
    { name: "Jan 13", noFraud: 190, fraud: 42 },
    { name: "Jan 14", noFraud: 210, fraud: 55 },
  ],
  confidenceDistribution: [
    { range: "90-100%", score: 80 },
    { range: "80-90%", score: 50 },
    { range: "70-80%", score: 35 },
    { range: "60-70%", score: 20 },
    { range: "<60%", score: 8 },
  ],
  riskScoreDistribution: [
    { range: "0-20%", score: 480 },
    { range: "20-40%", score: 390 },
    { range: "40-60%", score: 260 },
    { range: "60-80%", score: 155 },
    { range: "80-100%", score: 55 },
  ],
  recentFraudCases: [4038, 5386, 8031, 7214, 6285, 8299, 2500],
};

/**
 * Mock single inference result
 */
const MOCK_SINGLE_INFERENCE_RESULT = {
  prediction: "No Fraud",
  confidence: 89.5,
  riskScore: 23.4,
  timestamp: "19/11/2025, 12:04:26",
  features: {
    "Transaction Frequency": 92,
    "Claim History": 85,
    "Credit Score": 78,
    "Account Balance": 65,
    "Policy Duration": 52,
  },
};

/**
 * Run single inference by ID
 *
 * @param {number|string} useCaseId - Use case ID
 * @param {number|string} modelId - Model ID
 * @param {number|string} versionId - Version ID
 * @param {string} transactionId - Transaction ID to analyze
 * @returns {Promise<import('./ai-studio-types').InferenceResult>}
 *
 * TODO: Backend - Implement POST /api/inference/single/by-id
 */
export async function runSingleInferenceById(
  useCaseId,
  modelId,
  versionId,
  transactionId
) {
  return apiCall(
    `/inference/single/by-id`,
    {
      method: 'POST',
      body: JSON.stringify({
        useCaseId,
        modelId,
        versionId,
        transactionId,
      }),
    },
    MOCK_SINGLE_INFERENCE_RESULT
  );
}

/**
 * Run single inference by data
 *
 * @param {number|string} useCaseId - Use case ID
 * @param {number|string} modelId - Model ID
 * @param {number|string} versionId - Version ID
 * @param {import('./ai-studio-types').InferenceFeatures} features - Feature values
 * @returns {Promise<import('./ai-studio-types').InferenceResult>}
 *
 * TODO: Backend - Implement POST /api/inference/single/by-data
 */
export async function runSingleInferenceByData(
  useCaseId,
  modelId,
  versionId,
  features
) {
  return apiCall(
    `/inference/single/by-data`,
    {
      method: 'POST',
      body: JSON.stringify({
        useCaseId,
        modelId,
        versionId,
        features,
      }),
    },
    MOCK_SINGLE_INFERENCE_RESULT
  );
}

/**
 * Run batch inference by IDs (CSV upload)
 *
 * @param {number|string} useCaseId - Use case ID
 * @param {number|string} modelId - Model ID
 * @param {number|string} versionId - Version ID
 * @param {File} file - CSV file with transaction IDs
 * @returns {Promise<import('./ai-studio-types').BatchInferenceResult>}
 *
 * TODO: Backend - Implement POST /api/inference/batch/by-id
 * Should handle multipart/form-data file upload
 */
export async function runBatchInferenceByIds(
  useCaseId,
  modelId,
  versionId,
  file
) {
  // In real implementation, use FormData for file upload
  const formData = new FormData();
  formData.append('file', file);
  formData.append('useCaseId', useCaseId);
  formData.append('modelId', modelId);
  formData.append('versionId', versionId);

  const MOCK_BATCH_RESULT = {
    totalProcessed: 100,
    fraudDetected: 18,
    avgConfidence: 94.2,
    avgResponseTime: "0.08s",
    resultsUrl: "/downloads/batch-inference-results.csv",
  };

  return apiCall(
    `/inference/batch/by-id`,
    {
      method: 'POST',
      // Note: In real implementation, don't stringify FormData
      body: formData,
    },
    MOCK_BATCH_RESULT
  );
}

/**
 * Run batch inference by data (CSV upload with feature values)
 *
 * @param {number|string} useCaseId - Use case ID
 * @param {number|string} modelId - Model ID
 * @param {number|string} versionId - Version ID
 * @param {File} file - CSV file with feature data
 * @returns {Promise<import('./ai-studio-types').BatchInferenceResult>}
 *
 * TODO: Backend - Implement POST /api/inference/batch/by-data
 * Should handle multipart/form-data file upload
 */
export async function runBatchInferenceByData(
  useCaseId,
  modelId,
  versionId,
  file
) {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('useCaseId', useCaseId);
  formData.append('modelId', modelId);
  formData.append('versionId', versionId);

  const MOCK_BATCH_RESULT = {
    totalProcessed: 100,
    fraudDetected: 18,
    avgConfidence: 94.2,
    avgResponseTime: "0.08s",
    resultsUrl: "/downloads/batch-inference-results.csv",
  };

  return apiCall(
    `/inference/batch/by-data`,
    {
      method: 'POST',
      body: formData,
    },
    MOCK_BATCH_RESULT
  );
}

/**
 * Get inference insights and analytics
 *
 * @param {number|string} useCaseId - Use case ID
 * @param {number|string} modelId - Model ID
 * @param {number|string} versionId - Version ID
 * @param {Object} params - Query parameters
 * @param {string} [params.timeRange] - Time range (e.g., "7d", "30d")
 * @returns {Promise<import('./ai-studio-types').InferenceInsights>}
 *
 * TODO: Backend - Implement GET /api/inference/insights
 */
export async function getInferenceInsights(
  useCaseId,
  modelId,
  versionId,
  params = {}
) {
  return apiCall(
    `/inference/insights?useCaseId=${useCaseId}&modelId=${modelId}&versionId=${versionId}`,
    { method: 'GET' },
    MOCK_INFERENCE_INSIGHTS
  );
}

/**
 * Get inference history
 *
 * @param {number|string} useCaseId - Use case ID
 * @param {number|string} modelId - Model ID
 * @param {number|string} versionId - Version ID
 * @param {Object} params - Query parameters
 * @param {number} [params.limit] - Number of records to return
 * @param {number} [params.offset] - Offset for pagination
 * @returns {Promise<import('./ai-studio-types').InferenceHistory>}
 *
 * TODO: Backend - Implement GET /api/inference/history
 */
export async function getInferenceHistory(
  useCaseId,
  modelId,
  versionId,
  params = {}
) {
  const MOCK_HISTORY = {
    total: 1000,
    items: [
      {
        id: 1,
        transactionId: "TXN-2025-001234",
        prediction: "No Fraud",
        confidence: 89.5,
        riskScore: 23.4,
        timestamp: "2025-01-19 12:04:26",
      },
      // ... more items
    ],
  };

  return apiCall(
    `/inference/history?useCaseId=${useCaseId}&modelId=${modelId}&versionId=${versionId}`,
    { method: 'GET' },
    MOCK_HISTORY
  );
}
