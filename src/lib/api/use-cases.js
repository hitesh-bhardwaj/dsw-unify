/**
 * Use Cases API Service
 *
 * This module handles all API calls related to Use Cases in AI Studio.
 * Currently uses mock data - Backend team should replace with actual API calls.
 *
 * @module api/use-cases
 */

import { apiCall } from './client';
import { UseCasesIcon } from '@/components/Icons';

/**
 * Mock use cases data
 * @type {import('./ai-studio-types').UseCase[]}
 */
const MOCK_USE_CASES = [
  {
    id: 1,
    slug: "claims-fraud-detection",
    name: "Claims Fraud Detection",
    icon: UseCasesIcon,
    description:
      "Identify fraudulent insurance claims using ML pattern recognition and anomaly detection",
    tags: ["claims", "fraud detection", "auto insurance"],
    models: "4",
    lastUpdated: "January 15, 2025",
    peopleCount: "2",
    createdAt: "2025-11-18",
    variant: "light",
  },
  {
    id: 2,
    name: "Risk Assessment & Underwriting",
    slug: "risk-assessment-underwriting",
    icon: UseCasesIcon,
    description:
      "Automated risk scoring and premium calculation for policy underwriting decisions",
    tags: ["claims", "history", "fraud"],
    models: "3",
    lastUpdated: "5 hours ago",
    peopleCount: "2",
    createdAt: "December 8, 2024",
    variant: "light",
  },
  {
    id: 3,
    name: "Customer Churn Prediction",
    slug: "customer-churn-prediction",
    icon: UseCasesIcon,
    description:
      "Predict policyholder churn and identify retention opportunities across all lines of business",
    tags: ["policy", "coverage", "premium"],
    models: "2",
    peopleCount: "1",
    lastUpdated: "November 22, 2024",
    createdAt: "2025-11-18",
    variant: "light",
  },
  {
    id: 4,
    name: "Claims Processing Automation",
    slug: "claims-processing-automation",
    icon: UseCasesIcon,
    description:
      "Identify fraudulent insurance claims using ML pattern recognition and anomaly detection",
    tags: ["auto", "vehicle", "risk"],
    models: "4",
    peopleCount: "3",
    lastUpdated: "January 15, 2025",
    createdAt: "2025-11-18",
    variant: "light",
  },
  {
    id: 5,
    name: "Subrogation Recovery",
    slug: "subrogation-recovery",
    icon: UseCasesIcon,
    description:
      "Automated risk scoring and premium calculation for policy underwriting decisions",
    tags: ["claims", "history", "fraud"],
    models: "3",
    peopleCount: "2",
    lastUpdated: "December 8, 2024",
    createdAt: "2025-11-18",
    variant: "light",
  },
  {
    id: 6,
    name: "Premium Pricing Optimization",
    slug: "premium-pricing-ptimization",
    icon: UseCasesIcon,
    description:
      "Predict policyholder churn and identify retention opportunities across all lines of business",
    tags: ["policy", "coverage", "premium"],
    models: "2",
    peopleCount: "1",
    lastUpdated: "November 22, 2024",
    createdAt: "2025-11-18",
    variant: "light",
  },
  {
    id: 7,
    name: "Natural Catastrophe Modeling",
    slug: "natural-catastrophe-modeling",
    icon: UseCasesIcon,
    description:
      "Identify fraudulent insurance claims using ML pattern recognition and anomaly detection",
    tags: ["claims", "fraud detection", "auto insurance"],
    models: "4",
    peopleCount: "3",
    lastUpdated: "January 15, 2024",
    createdAt: "2025-11-18",
    variant: "light",
  },
];

/**
 * Mock statistics data
 * @type {import('./ai-studio-types').UseCaseStats}
 */
const MOCK_STATS = {
  totalUseCases: 7,
  totalModels: 23,
  totalContributors: 13,
};

/**
 * Get all use cases
 *
 * @param {Object} params - Query parameters
 * @param {string} [params.search] - Search query
 * @param {string[]} [params.tags] - Filter by tags
 * @param {string} [params.sortOrder] - Sort order (asc/desc)
 * @returns {Promise<import('./ai-studio-types').UseCase[]>}
 *
 * TODO: Backend - Implement GET /api/use-cases
 */
export async function getUseCases(params = {}) {
  return apiCall('/use-cases', { method: 'GET' }, MOCK_USE_CASES);
}

/**
 * Get use case by ID
 *
 * @param {number|string} id - Use case ID or slug
 * @returns {Promise<import('./ai-studio-types').UseCase|undefined>}
 *
 * TODO: Backend - Implement GET /api/use-cases/:id
 */
export async function getUseCaseById(id) {
  const useCase = MOCK_USE_CASES.find((u) => u.id === Number(id) || u.slug === id);
  return apiCall(`/use-cases/${id}`, { method: 'GET' }, useCase);
}

/**
 * Create new use case
 *
 * @param {import('./ai-studio-types').CreateUseCasePayload} data - Use case data
 * @returns {Promise<import('./ai-studio-types').UseCase>}
 *
 * TODO: Backend - Implement POST /api/use-cases
 */
export async function createUseCase(data) {
  const newUseCase = {
    id: MOCK_USE_CASES.length + 1,
    slug: data.name.toLowerCase().replace(/\s+/g, '-'),
    icon: UseCasesIcon,
    models: "0",
    peopleCount: "1",
    lastUpdated: "Just now",
    createdAt: new Date().toISOString(),
    variant: "light",
    ...data,
  };

  return apiCall('/use-cases', {
    method: 'POST',
    body: JSON.stringify(data),
  }, newUseCase);
}

/**
 * Update use case
 *
 * @param {number|string} id - Use case ID
 * @param {Partial<import('./ai-studio-types').CreateUseCasePayload>} data - Updated data
 * @returns {Promise<import('./ai-studio-types').UseCase>}
 *
 * TODO: Backend - Implement PUT /api/use-cases/:id
 */
export async function updateUseCase(id, data) {
  const useCase = MOCK_USE_CASES.find((u) => u.id === Number(id));
  const updated = {
    ...useCase,
    ...data,
    lastUpdated: "Just now",
  };

  return apiCall(`/use-cases/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }, updated);
}

/**
 * Delete use case
 *
 * @param {number|string} id - Use case ID
 * @returns {Promise<{success: boolean}>}
 *
 * TODO: Backend - Implement DELETE /api/use-cases/:id
 */
export async function deleteUseCase(id) {
  return apiCall(`/use-cases/${id}`, {
    method: 'DELETE',
  }, { success: true });
}

/**
 * Get use cases statistics
 *
 * @returns {Promise<import('./ai-studio-types').UseCaseStats>}
 *
 * TODO: Backend - Implement GET /api/use-cases/stats
 */
export async function getUseCaseStats() {
  return apiCall('/use-cases/stats', { method: 'GET' }, MOCK_STATS);
}
