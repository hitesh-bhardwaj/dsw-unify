/**
 * Feature Transformations API Service
 *
 * This module contains mock transformation functions.
 * TODO: Backend team - Replace mock responses with actual API calls
 *
 * @module api/transformations
 */

import { apiCall } from "./client";
import { FeatureTransformationIcon } from "@/components/Icons";

/**
 * @typedef {import("@/types/transformations").Transformation} Transformation
 * @typedef {import("@/types/transformations").TransformationStats} TransformationStats
 * @typedef {import("@/types/transformations").TransformationsQuery} TransformationsQuery
 */

/**
 * Mock transformations data
 */
const MOCK_TRANSFORMATIONS = [
  {
    id: 1,
    name: "Calculate Age from DOB",
    icon: FeatureTransformationIcon,
    description: "Calculates age in years from date of birth",
    tags: ["demographics", "age"],
    inputParams: [
      {
        name: "column",
        type: "string",
        required: "Yes",
        description: "Column to encode",
      },
      {
        name: "categories",
        type: "array",
        required: "Yes",
        description: "List of categories",
      },
    ],
    codeExamples: `def calculate_age(dob):
    today = datetime.now()
    return (today - dob).days // 365`,
    lastUpdated: "2 Hours Ago",
    createdAt: "2024-01-12",
    variant: "light",
  },
  {
    id: 2,
    name: "One-Hot Encoding",
    icon: FeatureTransformationIcon,
    description: "Converts categorical variable into binary columns",
    tags: ["encoding", "categorical"],
    inputParams: [
      {
        name: "column",
        type: "string",
        required: "Yes",
        description: "Column to encode",
      },
      {
        name: "categories",
        type: "array",
        required: "Yes",
        description: "List of categories",
      },
    ],
    codeExamples: `def one_hot_encode(column, categories):
encoded = {}
for cat in categories:
encoded[f'{column}_{cat}'] = (column == cat).astype(int)
return encoded`,
    lastUpdated: "2 days Ago",
    createdAt: "2024-01-12",
    variant: "light",
  },
  {
    id: 3,
    name: "Rolling Average 7 Days",
    icon: FeatureTransformationIcon,
    description: "Calculates 7-day rolling average for time series data",
    tags: ["timeseries", "aggregation"],
    inputParams: [
      {
        name: "column",
        type: "string",
        required: "Yes",
        description: "Column to encode",
      },
      {
        name: "categories",
        type: "array",
        required: "Yes",
        description: "List of categories",
      },
    ],
    codeExamples: `SELECT
      date,
      AVG(value) OVER (....`,
    createdAt: "2024-01-12",
    lastUpdated: "2 Hours Ago",
    variant: "light",
  },
  {
    id: 4,
    name: "Sum Aggregation",
    icon: FeatureTransformationIcon,
    description: "Calculates sum of values grouped by key",
    tags: ["aggregation", "sum"],
    codeExamples: `SELECT
      group_key,
      SUM(value) as total...`,
    lastUpdated: "4 Days Ago",
    createdAt: "2024-01-12",
    variant: "light",
  },
];

/**
 * Mock transformation statistics
 */
const MOCK_STATS = {
  totalTransformations: "04",
  activeTransformations: "04",
  transformationTypes: "07",
};

/**
 * Get all transformations
 *
 * TODO: Backend team - Replace with actual API call:
 * GET /api/transformations?search=&tags=&sortBy=&page=&limit=
 * Response: { transformations: Transformation[], total: number, page: number, limit: number }
 *
 * @param {TransformationsQuery} [params={}] - Query parameters
 * @returns {Promise<Transformation[]>}
 */
export async function getTransformations(params = {}) {
  // In real implementation, backend would filter/sort/paginate
  // For now, return all mock data
  return apiCall("/transformations", { method: "GET" }, MOCK_TRANSFORMATIONS);
}

/**
 * Get transformation by ID
 *
 * TODO: Backend team - Replace with actual API call:
 * GET /api/transformations/:id
 * Response: { transformation: Transformation }
 *
 * @param {number} id - Transformation ID
 * @returns {Promise<Transformation>}
 */
export async function getTransformationById(id) {
  const transformation = MOCK_TRANSFORMATIONS.find((t) => t.id === id);
  return apiCall(`/transformations/${id}`, { method: "GET" }, transformation);
}

/**
 * Create new transformation
 *
 * TODO: Backend team - Replace with actual API call:
 * POST /api/transformations
 * Headers: { Authorization: Bearer <token> }
 * Body: { name, description, category, ... }
 * Response: { transformation: Transformation }
 *
 * @param {Object} data - Transformation data
 * @returns {Promise<Transformation>}
 */
export async function createTransformation(data) {
  const newTransformation = {
    id: MOCK_TRANSFORMATIONS.length + 1,
    ...data,
    icon: FeatureTransformationIcon,
    createdAt: new Date().toISOString(),
    lastUpdated: "Just now",
    variant: "light",
  };

  return apiCall(
    "/transformations",
    {
      method: "POST",
      body: JSON.stringify(data),
    },
    newTransformation
  );
}

/**
 * Update transformation
 *
 * TODO: Backend team - Replace with actual API call:
 * PUT /api/transformations/:id
 * Headers: { Authorization: Bearer <token> }
 * Body: { name, description, ... }
 * Response: { transformation: Transformation }
 *
 * @param {number} id - Transformation ID
 * @param {Object} data - Updated transformation data
 * @returns {Promise<Transformation>}
 */
export async function updateTransformation(id, data) {
  const transformation = MOCK_TRANSFORMATIONS.find((t) => t.id === id);
  const updated = {
    ...transformation,
    ...data,
    lastUpdated: "Just now",
  };

  return apiCall(
    `/transformations/${id}`,
    {
      method: "PUT",
      body: JSON.stringify(data),
    },
    updated
  );
}

/**
 * Delete transformation
 *
 * TODO: Backend team - Replace with actual API call:
 * DELETE /api/transformations/:id
 * Headers: { Authorization: Bearer <token> }
 * Response: { success: boolean }
 *
 * @param {number} id - Transformation ID
 * @returns {Promise<{success: boolean}>}
 */
export async function deleteTransformation(id) {
  return apiCall(
    `/transformations/${id}`,
    { method: "DELETE" },
    { success: true }
  );
}

/**
 * Get transformation statistics
 *
 * TODO: Backend team - Replace with actual API call:
 * GET /api/transformations/stats
 * Response: { totalTransformations, activeTransformations, transformationTypes }
 *
 * @returns {Promise<TransformationStats>}
 */
export async function getTransformationStats() {
  return apiCall("/transformations/stats", { method: "GET" }, MOCK_STATS);
}
