/**
 * Versions API Service
 *
 * This module handles all API calls related to Model Versions in AI Studio.
 * Currently uses mock data - Backend team should replace with actual API calls.
 *
 * @module api/versions
 */

import { apiCall } from './client';
import { VersionsIcon } from '@/components/Icons';

/**
 * Mock versions data
 * @type {import('./ai-studio-types').Version[]}
 */
const MOCK_VERSIONS = [
  {
    id: 3,
    name: "V1",
    versionSlug: "version-1",
    icon: VersionsIcon,
    description: "Initial version with basic random forest classifier",
    tags: ["fraud", "classification", "baseline"],
    versions: 1,
    features: 20,
    status: "Deployed",
    accuracy: "96.3%",
    lastUpdated: "January 10, 2025",
    createdAt: "2025-01-10",
    variant: "light",
  },
  {
    id: 2,
    name: "V2",
    versionSlug: "version-2",
    icon: VersionsIcon,
    description: "Previous production version with gradient boosting",
    tags: ["fraud", "classification"],
    versions: 2,
    features: 25,
    status: "Deployed",
    accuracy: "96.3%",
    lastUpdated: "January 10, 2025",
    createdAt: "2025-01-10",
    variant: "light",
  },
  {
    id: 1,
    name: "V3",
    versionSlug: "version-3",
    icon: VersionsIcon,
    description:
      "Latest version with improved ensemble methods and feature engineering",
    tags: ["fraud", "classification", "ensemble"],
    versions: 3,
    features: 28,
    status: "Deployed",
    accuracy: "96.3%",
    lastUpdated: "January 16, 2025",
    createdAt: "2025-01-16",
    variant: "light",
  },
];

/**
 * Get all versions for a model
 *
 * @param {number|string} useCaseId - Use case ID
 * @param {number|string} modelId - Model ID
 * @param {Object} params - Query parameters
 * @returns {Promise<import('./ai-studio-types').Version[]>}
 *
 * TODO: Backend - Implement GET /api/use-cases/:useCaseId/models/:modelId/versions
 */
export async function getVersionsByModelId(useCaseId, modelId, params = {}) {
  return apiCall(
    `/use-cases/${useCaseId}/models/${modelId}/versions`,
    { method: 'GET' },
    MOCK_VERSIONS
  );
}

/**
 * Get version by ID
 *
 * @param {number|string} useCaseId - Use case ID
 * @param {number|string} modelId - Model ID
 * @param {number|string} versionId - Version ID or slug
 * @returns {Promise<import('./ai-studio-types').VersionDetail|undefined>}
 *
 * TODO: Backend - Implement GET /api/use-cases/:useCaseId/models/:modelId/versions/:versionId
 */
export async function getVersionById(useCaseId, modelId, versionId) {
  const version = MOCK_VERSIONS.find(
    (v) => v.id === Number(versionId) || v.versionSlug === versionId
  );

  // Enhanced version with full detail data
  const versionDetail = {
    ...version,
    owner: "Shivam Thakkar",
    lastModified: "2 Hours Ago",
    usage: "1.2K Request",
    stats: [
      { title: "Owner", value: "Shivam Thakkar" },
      { title: "Created", value: "January 16, 2025" },
      { title: "Updated", value: "January 16, 2025" },
      { title: "Accuracy", value: "96.3%" },
    ],
    metrics: {
      totalRequests: "12,847",
      avgResponse: "245ms",
      successRate: "99.2%",
      activeUsers: "156",
    },
  };

  return apiCall(
    `/use-cases/${useCaseId}/models/${modelId}/versions/${versionId}`,
    { method: 'GET' },
    versionDetail
  );
}

/**
 * Create new version
 *
 * @param {number|string} useCaseId - Use case ID
 * @param {number|string} modelId - Model ID
 * @param {import('./ai-studio-types').CreateVersionPayload} data - Version data
 * @returns {Promise<import('./ai-studio-types').Version>}
 *
 * TODO: Backend - Implement POST /api/use-cases/:useCaseId/models/:modelId/versions
 */
export async function createVersion(useCaseId, modelId, data) {
  const newVersion = {
    id: MOCK_VERSIONS.length + 1,
    name: `V${MOCK_VERSIONS.length + 1}`,
    versionSlug: `version-${MOCK_VERSIONS.length + 1}`,
    icon: VersionsIcon,
    versions: MOCK_VERSIONS.length + 1,
    features: 0,
    status: "Undeployed",
    accuracy: "0%",
    lastUpdated: "Just now",
    createdAt: new Date().toISOString(),
    variant: "light",
    ...data,
  };

  return apiCall(
    `/use-cases/${useCaseId}/models/${modelId}/versions`,
    {
      method: 'POST',
      body: JSON.stringify(data),
    },
    newVersion
  );
}

/**
 * Update version
 *
 * @param {number|string} useCaseId - Use case ID
 * @param {number|string} modelId - Model ID
 * @param {number|string} versionId - Version ID
 * @param {Partial<import('./ai-studio-types').CreateVersionPayload>} data - Updated data
 * @returns {Promise<import('./ai-studio-types').Version>}
 *
 * TODO: Backend - Implement PUT /api/use-cases/:useCaseId/models/:modelId/versions/:versionId
 */
export async function updateVersion(useCaseId, modelId, versionId, data) {
  const version = MOCK_VERSIONS.find((v) => v.id === Number(versionId));
  const updated = {
    ...version,
    ...data,
    lastUpdated: "Just now",
  };

  return apiCall(
    `/use-cases/${useCaseId}/models/${modelId}/versions/${versionId}`,
    {
      method: 'PUT',
      body: JSON.stringify(data),
    },
    updated
  );
}

/**
 * Delete version
 *
 * @param {number|string} useCaseId - Use case ID
 * @param {number|string} modelId - Model ID
 * @param {number|string} versionId - Version ID
 * @returns {Promise<{success: boolean}>}
 *
 * TODO: Backend - Implement DELETE /api/use-cases/:useCaseId/models/:modelId/versions/:versionId
 */
export async function deleteVersion(useCaseId, modelId, versionId) {
  return apiCall(
    `/use-cases/${useCaseId}/models/${modelId}/versions/${versionId}`,
    { method: 'DELETE' },
    { success: true }
  );
}

/**
 * Deploy/Undeploy version
 *
 * @param {number|string} useCaseId - Use case ID
 * @param {number|string} modelId - Model ID
 * @param {number|string} versionId - Version ID
 * @param {string} action - "deploy" or "undeploy"
 * @returns {Promise<{success: boolean, status: string}>}
 *
 * TODO: Backend - Implement POST /api/use-cases/:useCaseId/models/:modelId/versions/:versionId/deploy
 */
export async function toggleDeployStatus(useCaseId, modelId, versionId, action) {
  const newStatus = action === "deploy" ? "Deployed" : "Undeployed";

  return apiCall(
    `/use-cases/${useCaseId}/models/${modelId}/versions/${versionId}/deploy`,
    {
      method: 'POST',
      body: JSON.stringify({ action }),
    },
    { success: true, status: newStatus }
  );
}

/**
 * Get version statistics for a model
 *
 * @param {number|string} useCaseId - Use case ID
 * @param {number|string} modelId - Model ID
 * @returns {Promise<import('./ai-studio-types').VersionStats>}
 *
 * TODO: Backend - Implement GET /api/use-cases/:useCaseId/models/:modelId/versions/stats
 */
export async function getVersionStats(useCaseId, modelId) {
  const MOCK_STATS = {
    owner: "Shivam Thakkar",
    totalVersions: "3",
    undeploy: "3",
  };

  return apiCall(
    `/use-cases/${useCaseId}/models/${modelId}/versions/stats`,
    { method: 'GET' },
    MOCK_STATS
  );
}
