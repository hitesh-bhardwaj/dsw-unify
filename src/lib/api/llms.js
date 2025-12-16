/**
 * LLMs API Service
 *
 * This module contains mock LLM functions.
 * TODO: Backend team - Replace mock responses with actual API calls
 *
 * @module api/llms
 */

import { apiCall } from "./client";
import { LLMsIcon } from "@/components/Icons";

/**
 * @typedef {import("@/types/llms").LLM} LLM
 * @typedef {import("@/types/llms").LLMMetrics} LLMMetrics
 * @typedef {import("@/types/llms").LLMConfig} LLMConfig
 * @typedef {import("@/types/llms").LLMActivity} LLMActivity
 * @typedef {import("@/types/llms").LLMsQuery} LLMsQuery
 */

/**
 * Mock LLMs data
 */
const MOCK_LLMS = [
  {
    id: "gpt-4-turbo",
    name: "GPT-4 Turbo",
    description: "OpenAI API Model",
    icon: <LLMsIcon />,
    status: "active",
    tags: ["general-purpose", "api-based", "production"],
    requests: "1,234",
    avgres: "2.3s",
    deploy: false,
  },
  {
    id: "mistral-7B-instruct",
    name: "Mistral 7B Instruct",
    description: "Self-hosted Mistral Model",
    icon: <LLMsIcon />,
    status: "active",
    tags: ["open-source", "self-hosted", "production"],
    requests: "1,234",
    avgres: "2.3s",
    deploy: false,
  },
  {
    id: "llama-2-7B",
    name: "Llama 2 7B",
    description: "Self-hosted Open Source",
    icon: <LLMsIcon />,
    status: "deploying",
    tags: ["open-source", "self-hosted", "development"],
    requests: "1,234",
    avgres: "2.3s",
    deploy: true,
  },
  {
    id: "custom-insurance-model",
    name: "Custom Insurance Model",
    description: "Fine-tuned Model",
    icon: <LLMsIcon />,
    status: "active",
    tags: ["fine-tuned", "insurance", "specialized"],
    requests: "1,234",
    avgres: "2.3s",
    performance: true,
    accuracy: "94.2%",
    latency: "1.8s",
  },
];

/**
 * Mock recent activity data
 */
const MOCK_ACTIVITY = [
  {
    content: "Mistral 7B Instruct deployment completed",
    recentActivity: "30 minutes ago",
    color: "green",
  },
  {
    content: "GPT-4 Turbo deployment completed",
    recentActivity: "2 hours ago",
    color: "green",
  },
  {
    content: "Llama 2 7B deployment started",
    recentActivity: "4 hours ago",
    color: "green",
  },
  {
    content: "Custom Insurance Model retrained",
    recentActivity: "1 day ago",
    color: "red",
  },
];

/**
 * Mock LLM detail data
 */
const MOCK_LLM_DETAIL = {
  id: "gpt-4-turbo",
  name: "GPT-4 Turbo",
  description: "OpenAI API Model | Version: 2024-04-09",
  status: "active",
  request: "1,234",
  avgRes: "2.3s",
  upTime: "99.2%",
  cost: "$45.67",
};

/**
 * Get all LLMs
 *
 * TODO: Backend team - Replace with actual API call:
 * GET /api/llms?search=&tags=&sortBy=&page=&limit=&tab=
 * Response: { llms: LLM[], total: number, page: number, limit: number }
 *
 * @param {LLMsQuery} [params={}] - Query parameters
 * @returns {Promise<LLM[]>}
 */
export async function getLLMs(params = {}) {
  return apiCall("/llms", { method: "GET" }, MOCK_LLMS);
}

/**
 * Get LLM by ID
 *
 * TODO: Backend team - Replace with actual API call:
 * GET /api/llms/:id
 * Response: { llm: LLM }
 *
 * @param {string} id - LLM ID
 * @returns {Promise<LLM>}
 */
export async function getLLMById(id) {
  const llm = MOCK_LLMS.find((l) => l.id === id) || MOCK_LLM_DETAIL;
  return apiCall(`/llms/${id}`, { method: "GET" }, llm);
}

/**
 * Deploy new LLM
 *
 * TODO: Backend team - Replace with actual API call:
 * POST /api/llms/deploy
 * Headers: { Authorization: Bearer <token> }
 * Body: { name, modelSource, configuration, ... }
 * Response: { llm: LLM }
 *
 * @param {Object} data - Deployment data
 * @returns {Promise<LLM>}
 */
export async function deployLLM(data) {
  const newLLM = {
    id: `llm-${Date.now()}`,
    ...data,
    icon: <LLMsIcon />,
    status: "deploying",
    requests: "0",
    avgres: "N/A",
    deploy: true,
  };

  return apiCall(
    "/llms/deploy",
    {
      method: "POST",
      body: JSON.stringify(data),
    },
    newLLM
  );
}

/**
 * Import LLM from external source
 *
 * TODO: Backend team - Replace with actual API call:
 * POST /api/llms/import
 * Headers: { Authorization: Bearer <token> }
 * Body: { source, modelId, configuration, ... }
 * Response: { llm: LLM }
 *
 * @param {Object} data - Import data
 * @returns {Promise<LLM>}
 */
export async function importLLM(data) {
  const importedLLM = {
    id: `imported-${Date.now()}`,
    ...data,
    icon: <LLMsIcon />,
    status: "active",
    requests: "0",
    avgres: "N/A",
    deploy: false,
  };

  return apiCall(
    "/llms/import",
    {
      method: "POST",
      body: JSON.stringify(data),
    },
    importedLLM
  );
}

/**
 * Delete LLM
 *
 * TODO: Backend team - Replace with actual API call:
 * DELETE /api/llms/:id
 * Headers: { Authorization: Bearer <token> }
 * Response: { success: boolean }
 *
 * @param {string} id - LLM ID
 * @returns {Promise<{success: boolean}>}
 */
export async function deleteLLM(id) {
  return apiCall(`/llms/${id}`, { method: "DELETE" }, { success: true });
}

/**
 * Get LLM activity log
 *
 * TODO: Backend team - Replace with actual API call:
 * GET /api/llms/activity
 * Response: { activity: LLMActivity[] }
 *
 * @returns {Promise<LLMActivity[]>}
 */
export async function getLLMActivity() {
  return apiCall("/llms/activity", { method: "GET" }, MOCK_ACTIVITY);
}

/**
 * Get LLM metrics
 *
 * TODO: Backend team - Replace with actual API call:
 * GET /api/llms/:id/metrics
 * Response: { metrics: LLMMetrics }
 *
 * @param {string} id - LLM ID
 * @returns {Promise<LLMMetrics>}
 */
export async function getLLMMetrics(id) {
  const metrics = {
    request: "1,234",
    avgRes: "2.3s",
    upTime: "99.2%",
    cost: "$45.67",
  };

  return apiCall(`/llms/${id}/metrics`, { method: "GET" }, metrics);
}

/**
 * Get LLM configuration
 *
 * TODO: Backend team - Replace with actual API call:
 * GET /api/llms/:id/config
 * Response: { config: LLMConfig }
 *
 * @param {string} id - LLM ID
 * @returns {Promise<LLMConfig>}
 */
export async function getLLMConfig(id) {
  const config = {
    modelType: "GPT-4 Turbo",
    apiEndpoint: "https://api.openai.com/v1/chat/completions",
    temperature: 0.7,
    maxTokens: 2048,
  };

  return apiCall(`/llms/${id}/config`, { method: "GET" }, config);
}

/**
 * Update LLM configuration
 *
 * TODO: Backend team - Replace with actual API call:
 * PUT /api/llms/:id/config
 * Headers: { Authorization: Bearer <token> }
 * Body: { temperature, maxTokens, ... }
 * Response: { config: LLMConfig }
 *
 * @param {string} id - LLM ID
 * @param {Object} data - Configuration data
 * @returns {Promise<LLMConfig>}
 */
export async function updateLLMConfig(id, data) {
  const config = {
    ...data,
    updatedAt: new Date().toISOString(),
  };

  return apiCall(
    `/llms/${id}/config`,
    {
      method: "PUT",
      body: JSON.stringify(data),
    },
    config
  );
}
