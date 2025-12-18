/**
 * AI Studio Monitoring API Service
 *
 * This module handles all API calls related to Model Monitoring in AI Studio.
 * Currently uses mock data - Backend team should replace with actual API calls.
 *
 * @module api/ai-studio-monitoring
 */

import { apiCall } from './client';

/**
 * Get data drift metrics
 *
 * @param {number|string} useCaseId - Use case ID
 * @param {number|string} modelId - Model ID
 * @param {number|string} versionId - Version ID
 * @returns {Promise<import('./ai-studio-types').DriftMetrics>}
 *
 * TODO: Backend - Implement GET /api/ai-studio/monitoring/drift
 * Consider implementing WebSocket for real-time updates
 */
export async function getDriftMetrics(useCaseId, modelId, versionId) {
  const MOCK_DRIFT_METRICS = {
    totalFeatures: 21,
    driftedFeatures: 156,
    driftDetectedAt: new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }),
    datasetDrift: [
      {
        time: Date.now() - 21000,
        timeLabel: new Date(Date.now() - 21000).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
        driftedFeatures: 220,
      },
      {
        time: Date.now() - 18000,
        timeLabel: new Date(Date.now() - 18000).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
        driftedFeatures: 180,
      },
      {
        time: Date.now() - 15000,
        timeLabel: new Date(Date.now() - 15000).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
        driftedFeatures: 250,
      },
      {
        time: Date.now() - 12000,
        timeLabel: new Date(Date.now() - 12000).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
        driftedFeatures: 210,
      },
      {
        time: Date.now() - 9000,
        timeLabel: new Date(Date.now() - 9000).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
        driftedFeatures: 190,
      },
      {
        time: Date.now() - 6000,
        timeLabel: new Date(Date.now() - 6000).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
        driftedFeatures: 230,
      },
      {
        time: Date.now() - 3000,
        timeLabel: new Date(Date.now() - 3000).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
        driftedFeatures: 200,
      },
      {
        time: Date.now(),
        timeLabel: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
        driftedFeatures: 156,
      },
    ],
  };

  return apiCall(
    `/ai-studio/monitoring/drift?useCaseId=${useCaseId}&modelId=${modelId}&versionId=${versionId}`,
    { method: 'GET' },
    MOCK_DRIFT_METRICS
  );
}

/**
 * Get API performance metrics
 *
 * @param {number|string} useCaseId - Use case ID
 * @param {number|string} modelId - Model ID
 * @param {number|string} versionId - Version ID
 * @returns {Promise<import('./ai-studio-types').APIMetrics>}
 *
 * TODO: Backend - Implement GET /api/ai-studio/monitoring/api-metrics
 * Consider implementing WebSocket for real-time updates
 */
export async function getAPIMetrics(useCaseId, modelId, versionId) {
  const MOCK_API_METRICS = {
    requestRate: 1.85, // ops/s
    successRate: 0.78, // percentage
    error4xx: 0.42, // ops/s
    error5xx: 0.42, // ops/s
    latency: [
      { time: Date.now() - 57000, endToEnd: 1.8 },
      { time: Date.now() - 54000, endToEnd: 1.5 },
      { time: Date.now() - 51000, endToEnd: 1.9 },
      { time: Date.now() - 48000, endToEnd: 2.1 },
      { time: Date.now() - 45000, endToEnd: 1.7 },
      { time: Date.now() - 42000, endToEnd: 1.4 },
      { time: Date.now() - 39000, endToEnd: 1.6 },
      { time: Date.now() - 36000, endToEnd: 2.0 },
      { time: Date.now() - 33000, endToEnd: 1.9 },
      { time: Date.now() - 30000, endToEnd: 1.5 },
      { time: Date.now() - 27000, endToEnd: 1.8 },
      { time: Date.now() - 24000, endToEnd: 1.6 },
      { time: Date.now() - 21000, endToEnd: 1.7 },
      { time: Date.now() - 18000, endToEnd: 2.2 },
      { time: Date.now() - 15000, endToEnd: 1.9 },
      { time: Date.now() - 12000, endToEnd: 1.4 },
      { time: Date.now() - 9000, endToEnd: 1.8 },
      { time: Date.now() - 6000, endToEnd: 2.0 },
      { time: Date.now() - 3000, endToEnd: 1.6 },
      { time: Date.now(), endToEnd: 1.85 },
    ],
  };

  return apiCall(
    `/ai-studio/monitoring/api-metrics?useCaseId=${useCaseId}&modelId=${modelId}&versionId=${versionId}`,
    { method: 'GET' },
    MOCK_API_METRICS
  );
}

/**
 * Get monitoring overview (combined metrics)
 *
 * @param {number|string} useCaseId - Use case ID
 * @param {number|string} modelId - Model ID
 * @param {number|string} versionId - Version ID
 * @returns {Promise<import('./ai-studio-types').MonitoringOverview>}
 *
 * TODO: Backend - Implement GET /api/ai-studio/monitoring/overview
 */
export async function getMonitoringOverview(useCaseId, modelId, versionId) {
  const [driftMetrics, apiMetrics] = await Promise.all([
    getDriftMetrics(useCaseId, modelId, versionId),
    getAPIMetrics(useCaseId, modelId, versionId),
  ]);

  return {
    drift: driftMetrics,
    api: apiMetrics,
  };
}

/**
 * Subscribe to real-time monitoring updates via WebSocket
 *
 * @param {number|string} useCaseId - Use case ID
 * @param {number|string} modelId - Model ID
 * @param {number|string} versionId - Version ID
 * @param {Function} onUpdate - Callback function for updates
 * @returns {Function} Unsubscribe function
 *
 * TODO: Backend - Implement WebSocket connection for real-time monitoring
 * Example implementation:
 *
 * export function subscribeToAIStudioMonitoring(useCaseId, modelId, versionId, onUpdate) {
 *   const ws = new WebSocket(`${WS_URL}/ai-studio/monitoring/${useCaseId}/${modelId}/${versionId}`);
 *
 *   ws.onmessage = (event) => {
 *     const data = JSON.parse(event.data);
 *     onUpdate(data);
 *   };
 *
 *   ws.onerror = (error) => {
 *     console.error('WebSocket error:', error);
 *   };
 *
 *   return () => ws.close();
 * }
 */
export function subscribeToAIStudioMonitoring(
  useCaseId,
  modelId,
  versionId,
  onUpdate
) {
  // Mock implementation - simulates real-time updates
  const interval = setInterval(() => {
    const mockUpdate = {
      type: 'AI_STUDIO_MONITORING_UPDATE',
      timestamp: Date.now(),
      drift: {
        driftedFeatures: Math.floor(Math.random() * 100) + 100,
      },
      api: {
        requestRate: (Math.random() * 1.5 + 1.0).toFixed(2),
        latency: (Math.random() * 1.0 + 1.0).toFixed(2),
      },
    };

    onUpdate(mockUpdate);
  }, 3000); // Update every 3 seconds

  // Return unsubscribe function
  return () => clearInterval(interval);
}
