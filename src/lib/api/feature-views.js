/**
 * Feature Views API Service
 *
 * This module contains mock feature view functions.
 * TODO: Backend team - Replace mock responses with actual API calls
 *
 * @module api/feature-views
 */

import { apiCall } from "./client";
import { FeatureViewsIcon } from "@/components/Icons";

/**
 * @typedef {import("@/types/feature-views").FeatureView} FeatureView
 * @typedef {import("@/types/feature-views").FeatureViewStats} FeatureViewStats
 * @typedef {import("@/types/feature-views").FeatureViewsQuery} FeatureViewsQuery
 * @typedef {import("@/types/feature-views").TableInfo} TableInfo
 */

/**
 * Mock feature views data
 */
const MOCK_FEATURE_VIEWS = [
  {
    id: 1,
    name: "Policyholder Demographics",
    icon: FeatureViewsIcon,
    description:
      "Demographic features including age, location, credit score, marital status, and employment",
    tags: ["demographics", "policyholder", "underwriting"],
    featureNo: "18",
    lastUpdated: "2 days Ago",
    tablesCount: "2",
    createdAt: "2025-11-18",
    variant: "light",
  },
  {
    id: 2,
    name: "Claims History",
    icon: FeatureViewsIcon,
    description:
      "Historical claims features with aggregations including claim frequency, amounts, and types",
    tags: ["claims", "history", "fraud"],
    featureNo: "24",
    lastUpdated: "5 hours ago",
    tablesCount: "3",
    createdAt: "2025-11-18",
    variant: "light",
  },
  {
    id: 3,
    name: "Policy Details",
    icon: FeatureViewsIcon,
    description:
      "Policy-level features including coverage amounts, deductibles, premiums, and policy tenure",
    tags: ["policy", "coverage", "premium"],
    featureNo: "16",
    tablesCount: "2",
    lastUpdated: "1 day ago",
    createdAt: "2025-11-18",
    variant: "light",
  },
  {
    id: 4,
    name: "Vehicle Information",
    icon: FeatureViewsIcon,
    description:
      "Auto insurance vehicle features including make, model, year, mileage, and safety ratings",
    tags: ["auto", "vehicle", "risk"],
    featureNo: "14",
    tablesCount: "2",
    lastUpdated: "3 Days Ago",
    createdAt: "2025-11-18",
    variant: "light",
  },
  {
    id: 5,
    name: "Property Details",
    icon: FeatureViewsIcon,
    description:
      "Home insurance property features including type, age, construction, location risk, and security",
    tags: ["property", "home", "risk"],
    featureNo: "20",
    tablesCount: "3",
    lastUpdated: "1 week ago",
    createdAt: "2025-11-18",
    variant: "light",
  },
  {
    id: 6,
    name: "Risk Factors",
    icon: FeatureViewsIcon,
    description:
      "Comprehensive risk assessment features including driving record, credit score, and location hazards",
    tags: ["risk", "underwriting", "assessment"],
    featureNo: "22",
    tablesCount: "4",
    lastUpdated: "4 days ago",
    createdAt: "2025-11-18",
    variant: "light",
  },
  {
    id: 7,
    name: "Payment History",
    icon: FeatureViewsIcon,
    description:
      "Payment behavior features including frequency, late payments, and payment methods",
    tags: ["payment", "financial", "churn"],
    featureNo: "12",
    tablesCount: "2",
    lastUpdated: "6 hours ago",
    createdAt: "2025-11-18",
    variant: "light",
  },
];

/**
 * Mock feature view statistics
 */
const MOCK_STATS = {
  totalFeatureViews: "07",
  totalFeatures: 126,
  totalTables: 18,
};

/**
 * Mock tables for selection
 */
const MOCK_TABLES = [
  { name: "Customers", columns: "12 column", rows: "1.2M rows" },
  { name: "Orders", columns: "12 column", rows: "1.2M rows" },
  { name: "Products", columns: "12 column", rows: "1.2M rows" },
  { name: "Transactions", columns: "12 column", rows: "1.2M rows" },
  { name: "User_events", columns: "12 column", rows: "1.2M rows" },
  { name: "Medical_records", columns: "12 column", rows: "1.2M rows" },
];

/**
 * Get all feature views
 *
 * TODO: Backend team - Replace with actual API call:
 * GET /api/feature-views?search=&tags=&sortBy=&page=&limit=
 *
 * @param {FeatureViewsQuery} [params={}] - Query parameters
 * @returns {Promise<FeatureView[]>}
 */
export async function getFeatureViews(params = {}) {
  return apiCall("/feature-views", { method: "GET" }, MOCK_FEATURE_VIEWS);
}

/**
 * Get feature view by ID
 *
 * TODO: Backend team - Replace with actual API call:
 * GET /api/feature-views/:id
 *
 * @param {number} id - Feature view ID
 * @returns {Promise<FeatureView>}
 */
export async function getFeatureViewById(id) {
  const view = MOCK_FEATURE_VIEWS.find((v) => v.id === id);
  return apiCall(`/feature-views/${id}`, { method: "GET" }, view);
}

/**
 * Create new feature view
 *
 * TODO: Backend team - Replace with actual API call:
 * POST /api/feature-views
 *
 * @param {Object} data - Feature view data
 * @returns {Promise<FeatureView>}
 */
export async function createFeatureView(data) {
  const newView = {
    id: MOCK_FEATURE_VIEWS.length + 1,
    ...data,
    icon: FeatureViewsIcon,
    createdAt: new Date().toISOString(),
    lastUpdated: "Just now",
    variant: "light",
  };

  return apiCall(
    "/feature-views",
    {
      method: "POST",
      body: JSON.stringify(data),
    },
    newView
  );
}

/**
 * Update feature view
 *
 * TODO: Backend team - Replace with actual API call:
 * PUT /api/feature-views/:id
 *
 * @param {number} id - Feature view ID
 * @param {Object} data - Updated data
 * @returns {Promise<FeatureView>}
 */
export async function updateFeatureView(id, data) {
  const view = MOCK_FEATURE_VIEWS.find((v) => v.id === id);
  const updated = {
    ...view,
    ...data,
    lastUpdated: "Just now",
  };

  return apiCall(
    `/feature-views/${id}`,
    {
      method: "PUT",
      body: JSON.stringify(data),
    },
    updated
  );
}

/**
 * Delete feature view
 *
 * TODO: Backend team - Replace with actual API call:
 * DELETE /api/feature-views/:id
 *
 * @param {number} id - Feature view ID
 * @returns {Promise<{success: boolean}>}
 */
export async function deleteFeatureView(id) {
  return apiCall(`/feature-views/${id}`, { method: "DELETE" }, { success: true });
}

/**
 * Get feature view statistics
 *
 * TODO: Backend team - Replace with actual API call:
 * GET /api/feature-views/stats
 *
 * @returns {Promise<FeatureViewStats>}
 */
export async function getFeatureViewStats() {
  return apiCall("/feature-views/stats", { method: "GET" }, MOCK_STATS);
}

/**
 * Get available tables for selection
 *
 * TODO: Backend team - Replace with actual API call:
 * GET /api/tables
 *
 * @returns {Promise<TableInfo[]>}
 */
export async function getTables() {
  return apiCall("/tables", { method: "GET" }, MOCK_TABLES);
}
