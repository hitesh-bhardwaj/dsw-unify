/**
 * Feature Services API Service
 *
 * This module contains mock feature service functions.
 * TODO: Backend team - Replace mock responses with actual API calls
 *
 * @module api/feature-services
 */

import { apiCall } from "./client";
import { FeatureServicesIcon } from "@/components/Icons";

/**
 * @typedef {import("@/types/feature-services").FeatureService} FeatureService
 * @typedef {import("@/types/feature-services").FeatureServiceStats} FeatureServiceStats
 * @typedef {import("@/types/feature-services").FeatureServicesQuery} FeatureServicesQuery
 */

/**
 * Mock feature services data
 */
const MOCK_FEATURE_SERVICES = [
  {
    id: 1,
    name: "Claims Fraud Detection Service",
    icon: FeatureServicesIcon,
    description:
      "Demographic features including age, location, credit score, marital status, and employment",
    tags: ["demographics", "policyholder", "underwriting"],
    featureNo: "64",
    lastUpdated: "2 days Ago",
    viewsCount: "2",
    createdAt: "2025-11-18",
    variant: "light",
  },
  {
    id: 2,
    name: "Risk Assessment Service",
    icon: FeatureServicesIcon,
    description:
      "Historical claims features with aggregations including claim frequency, amounts, and types",
    tags: ["claims", "history", "fraud"],
    featureNo: "76",
    lastUpdated: "5 hours ago",
    viewsCount: "3",
    createdAt: "2025-11-18",
    variant: "light",
  },
  {
    id: 3,
    name: "Customer Churn Prediction Service",
    icon: FeatureServicesIcon,
    description:
      "Policy-level features including coverage amounts, deductibles, premiums, and policy tenure",
    tags: ["policy", "coverage", "premium"],
    featureNo: "16",
    viewsCount: "2",
    lastUpdated: "1 day ago",
    createdAt: "2025-11-18",
    variant: "light",
  },
  {
    id: 4,
    name: "Premium Pricing Service",
    icon: FeatureServicesIcon,
    description:
      "Auto insurance vehicle features including make, model, year, mileage, and safety ratings",
    tags: ["auto", "vehicle", "risk"],
    featureNo: "14",
    viewsCount: "2",
    lastUpdated: "3 Days Ago",
    createdAt: "2025-11-18",
    variant: "light",
  },
  {
    id: 5,
    name: "Auto Insurance Underwriting Service",
    icon: FeatureServicesIcon,
    description:
      "Home insurance property features including type, age, construction, location risk, and security",
    tags: ["property", "home", "risk"],
    featureNo: "20",
    viewsCount: "3",
    lastUpdated: "1 week ago",
    createdAt: "2025-11-18",
    variant: "light",
  },
  {
    id: 6,
    name: "Home Insurance Underwriting Service",
    icon: FeatureServicesIcon,
    description:
      "Comprehensive risk assessment features including driving record, credit score, and location hazards",
    tags: ["risk", "underwriting", "assessment"],
    featureNo: "22",
    viewsCount: "4",
    lastUpdated: "4 days ago",
    createdAt: "2025-11-18",
    variant: "light",
  },
];

/**
 * Mock feature service statistics
 */
const MOCK_STATS = {
  totalFeatureServices: "06",
  totalFeaturedViews: 21,
  totalFeatures: 400,
};

/**
 * Get all feature services
 *
 * TODO: Backend team - Replace with actual API call:
 * GET /api/feature-services?search=&tags=&sortBy=&page=&limit=
 *
 * @param {FeatureServicesQuery} [params={}] - Query parameters
 * @returns {Promise<FeatureService[]>}
 */
export async function getFeatureServices(params = {}) {
  return apiCall("/feature-services", { method: "GET" }, MOCK_FEATURE_SERVICES);
}

/**
 * Get feature service by ID
 *
 * TODO: Backend team - Replace with actual API call:
 * GET /api/feature-services/:id
 *
 * @param {number} id - Feature service ID
 * @returns {Promise<FeatureService>}
 */
export async function getFeatureServiceById(id) {
  const service = MOCK_FEATURE_SERVICES.find((s) => s.id === id);
  return apiCall(`/feature-services/${id}`, { method: "GET" }, service);
}

/**
 * Create new feature service
 *
 * TODO: Backend team - Replace with actual API call:
 * POST /api/feature-services
 *
 * @param {Object} data - Feature service data
 * @returns {Promise<FeatureService>}
 */
export async function createFeatureService(data) {
  const newService = {
    id: MOCK_FEATURE_SERVICES.length + 1,
    ...data,
    icon: FeatureServicesIcon,
    createdAt: new Date().toISOString(),
    lastUpdated: "Just now",
    variant: "light",
  };

  return apiCall(
    "/feature-services",
    {
      method: "POST",
      body: JSON.stringify(data),
    },
    newService
  );
}

/**
 * Update feature service
 *
 * TODO: Backend team - Replace with actual API call:
 * PUT /api/feature-services/:id
 *
 * @param {number} id - Feature service ID
 * @param {Object} data - Updated data
 * @returns {Promise<FeatureService>}
 */
export async function updateFeatureService(id, data) {
  const service = MOCK_FEATURE_SERVICES.find((s) => s.id === id);
  const updated = {
    ...service,
    ...data,
    lastUpdated: "Just now",
  };

  return apiCall(
    `/feature-services/${id}`,
    {
      method: "PUT",
      body: JSON.stringify(data),
    },
    updated
  );
}

/**
 * Delete feature service
 *
 * TODO: Backend team - Replace with actual API call:
 * DELETE /api/feature-services/:id
 *
 * @param {number} id - Feature service ID
 * @returns {Promise<{success: boolean}>}
 */
export async function deleteFeatureService(id) {
  return apiCall(
    `/feature-services/${id}`,
    { method: "DELETE" },
    { success: true }
  );
}

/**
 * Get feature service statistics
 *
 * TODO: Backend team - Replace with actual API call:
 * GET /api/feature-services/stats
 *
 * @returns {Promise<FeatureServiceStats>}
 */
export async function getFeatureServiceStats() {
  return apiCall("/feature-services/stats", { method: "GET" }, MOCK_STATS);
}
