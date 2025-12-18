/**
 * Models API Service
 *
 * This module handles all API calls related to Models in AI Studio.
 * Currently uses mock data - Backend team should replace with actual API calls.
 *
 * @module api/models
 */

import { apiCall } from './client';
import { DataEngineeringIcon } from '@/components/Icons';

/**
 * Mock models data
 * @type {import('./ai-studio-types').Model[]}
 */
const MOCK_MODELS = [
  {
    id: 1,
    ModelSlug: "fraud-detector",
    name: "Fraud Detector",
    icon: DataEngineeringIcon,
    description:
      "Advanced fraud detection using ensemble methods and anomaly detection",
    tags: ["fraud", "classification", "ensemble"],
    versions: 3,
    features: 28,
    status: "Deployed",
    lastUpdated: "January 16, 2025",
    createdAt: "2025-01-16",
    variant: "light",
  },
  {
    id: 2,
    name: "Claims Anomaly Detector",
    icon: DataEngineeringIcon,
    description:
      "Unsupervised anomaly detection for suspicious claim patterns",
    ModelSlug: "claims-anomaly-detector",
    tags: ["anomaly detection", "unsupervised"],
    versions: 2,
    features: 24,
    status: "Undeployed",
    lastUpdated: "January 12, 2025",
    createdAt: "2025-01-12",
    variant: "light",
  },
  {
    id: 3,
    name: "Fraud Risk Scorer",
    ModelSlug: "fraud-risk-scorer",
    icon: DataEngineeringIcon,
    description: "Risk scoring model for fraud probability assessment",
    tags: ["anomaly detection", "unsupervised"],
    versions: 4,
    features: 35,
    status: "Deployed",
    lastUpdated: "January 8, 2025",
    createdAt: "2025-01-08",
    variant: "light",
  },
  {
    id: 4,
    name: "Pattern Recognition Model",
    icon: DataEngineeringIcon,
    ModelSlug: "pattern-recognition-model",
    description: "Pattern recognition for identifying fraud indicators",
    tags: ["pattern recognition", "deep learning"],
    versions: 2,
    features: 32,
    status: "Deployed",
    lastUpdated: "January 5, 2025",
    createdAt: "2025-01-05",
    variant: "light",
  },
];

/**
 * Get all models for a use case
 *
 * @param {number|string} useCaseId - Use case ID
 * @param {Object} params - Query parameters
 * @returns {Promise<import('./ai-studio-types').Model[]>}
 *
 * TODO: Backend - Implement GET /api/use-cases/:useCaseId/models
 */
export async function getModelsByUseCaseId(useCaseId, params = {}) {
  return apiCall(`/use-cases/${useCaseId}/models`, { method: 'GET' }, MOCK_MODELS);
}

/**
 * Get model by ID
 *
 * @param {number|string} useCaseId - Use case ID
 * @param {number|string} modelId - Model ID or slug
 * @returns {Promise<import('./ai-studio-types').Model|undefined>}
 *
 * TODO: Backend - Implement GET /api/use-cases/:useCaseId/models/:modelId
 */
export async function getModelById(useCaseId, modelId) {
  const model = MOCK_MODELS.find((m) => m.id === Number(modelId) || m.ModelSlug === modelId);
  return apiCall(`/use-cases/${useCaseId}/models/${modelId}`, { method: 'GET' }, model);
}

/**
 * Create new model
 *
 * @param {number|string} useCaseId - Use case ID
 * @param {import('./ai-studio-types').CreateModelPayload} data - Model data
 * @returns {Promise<import('./ai-studio-types').Model>}
 *
 * TODO: Backend - Implement POST /api/use-cases/:useCaseId/models
 */
export async function createModel(useCaseId, data) {
  const newModel = {
    id: MOCK_MODELS.length + 1,
    ModelSlug: data.name.toLowerCase().replace(/\s+/g, '-'),
    icon: DataEngineeringIcon,
    versions: 0,
    features: 0,
    status: "Undeployed",
    lastUpdated: "Just now",
    createdAt: new Date().toISOString(),
    variant: "light",
    ...data,
  };

  return apiCall(`/use-cases/${useCaseId}/models`, {
    method: 'POST',
    body: JSON.stringify(data),
  }, newModel);
}

/**
 * Update model
 *
 * @param {number|string} useCaseId - Use case ID
 * @param {number|string} modelId - Model ID
 * @param {Partial<import('./ai-studio-types').CreateModelPayload>} data - Updated data
 * @returns {Promise<import('./ai-studio-types').Model>}
 *
 * TODO: Backend - Implement PUT /api/use-cases/:useCaseId/models/:modelId
 */
export async function updateModel(useCaseId, modelId, data) {
  const model = MOCK_MODELS.find((m) => m.id === Number(modelId));
  const updated = {
    ...model,
    ...data,
    lastUpdated: "Just now",
  };

  return apiCall(`/use-cases/${useCaseId}/models/${modelId}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }, updated);
}

/**
 * Delete model
 *
 * @param {number|string} useCaseId - Use case ID
 * @param {number|string} modelId - Model ID
 * @returns {Promise<{success: boolean}>}
 *
 * TODO: Backend - Implement DELETE /api/use-cases/:useCaseId/models/:modelId
 */
export async function deleteModel(useCaseId, modelId) {
  return apiCall(`/use-cases/${useCaseId}/models/${modelId}`, {
    method: 'DELETE',
  }, { success: true });
}

/**
 * Get model statistics for a use case
 *
 * @param {number|string} useCaseId - Use case ID
 * @returns {Promise<import('./ai-studio-types').ModelStats>}
 *
 * TODO: Backend - Implement GET /api/use-cases/:useCaseId/models/stats
 */
export async function getModelStats(useCaseId) {
  const MOCK_STATS = {
    owner: "Shivam Thakkar",
    totalModels: "04",
    deployed: "03",
  };

  return apiCall(`/use-cases/${useCaseId}/models/stats`, { method: 'GET' }, MOCK_STATS);
}
