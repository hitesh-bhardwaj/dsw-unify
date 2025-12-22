/**
 * Prompts API Service
 *
 * This module contains mock prompt functions.
 * TODO: Backend team - Replace mock responses with actual API calls
 *
 * @module api/prompts
 */

import { apiCall } from "./client";
import { PromptsIcon, TemplatesIcon } from "@/components/Icons";

/**
 * @typedef {import("@/types/prompts").Prompt} Prompt
 * @typedef {import("@/types/prompts").Template} Template
 * @typedef {import("@/types/prompts").PromptStats} PromptStats
 * @typedef {import("@/types/prompts").PromptContent} PromptContent
 * @typedef {import("@/types/prompts").PromptMetadata} PromptMetadata
 * @typedef {import("@/types/prompts").PromptUsage} PromptUsage
 * @typedef {import("@/types/prompts").PromptsQuery} PromptsQuery
 */

/**
 * Mock prompts data
 */
const MOCK_PROMPTS = [
  {
    id: 1,
    name: "Customer Support Assistant",
    description: "Helpful and empathetic customer service responses",
    versionSlug:'version-1',
    slug: "customer-support-assistant",
    rating: 4.8,
    icon: <PromptsIcon />,
    version: "v3",
    tags: ["Customer-Service", "Empathy", "+1 more"],
    uses: "1250",
    lastUpdated: "20/01/2024",
    preview:
      "You are a helpful and empathetic customer service representative......",
    variant: "light",
  },
  {
    id: 2,
    name: "Technical Documentation Writer",
    description: "Creates clear and comprehensive technical documentation",
    versionSlug:'version-2',
    slug: "technical-documentation-writer",
    rating: 4.3,
    icon: <PromptsIcon />,
    version: "v2",
    tags: ["Customer-Service", "Empathy", "+1 more"],
    uses: "890",
    lastUpdated: "18/01/2024",
    preview:
      "You are an expert technical writer who creates clear, comprehensive documentation......",
    variant: "light",
  },
  {
    id: 3,
    name: "Code Review Assistant",
    description: "Provides constructive code review feedback",
    versionSlug:'version-3',
    slug: "code-review-assistant",
    rating: 4.9,
    icon: <PromptsIcon />,
    version: "v1",
    tags: ["Customer-Service", "Empathy", "+1 more"],
    uses: "156",
    lastUpdated: "22/01/2024",
    preview:
      "You are a helpful and empathetic customer service representative......",
    variant: "light",
  },
];

/**
 * Mock templates data
 */
const MOCK_TEMPLATES = [
  {
    id: 1,
    name: "Customer Service Template",
    slug:'customer-service-template',
    description: "Standard template for customer service agents",
    icon: <TemplatesIcon />,
    tags: ["Customer Service", "Empathy", "+1 more"],
    uses: "45",
    variable: "company_name, product_name, support_level",
    variant: "light",
  },
  {
    id: 2,
    name: "Technical Q&A Template",
    slug:'technical-ques-and-ans-template',
    description: "Template for technical question answering",
    icon: <TemplatesIcon />,
    tags: ["Technical", "Empathy", "+1 more"],
    uses: "32",
    variable: "domain, expertise_level, response_format",
    variant: "light",
  },
];

/**
 * Mock prompt statistics
 */
const MOCK_STATS = {
  totalPrompts: "03",
  totalUses: 2296,
  categories: "03",
};

/**
 * Get all prompts
 *
 * TODO: Backend team - Replace with actual API call:
 * GET /api/prompts?search=&tags=&sortBy=&page=&limit=
 * Response: { prompts: Prompt[], total: number, page: number, limit: number }
 *
 * @param {PromptsQuery} [params={}] - Query parameters
 * @returns {Promise<Prompt[]>}
 */
export async function getPrompts(params = {}) {
  return apiCall("/prompts", { method: "GET" }, MOCK_PROMPTS);
}

/**
 * Get prompt by ID
 *
 * TODO: Backend team - Replace with actual API call:
 * GET /api/prompts/:id
 * Response: { prompt: Prompt }
 *
 * @param {number} id - Prompt ID
 * @returns {Promise<Prompt>}
 */
export async function getPromptById(id) {
  const prompt = MOCK_PROMPTS.find((p) => p.id === id);
  return apiCall(`/prompts/${id}`, { method: "GET" }, prompt);
}

/**
 * Create new prompt
 *
 * TODO: Backend team - Replace with actual API call:
 * POST /api/prompts
 * Headers: { Authorization: Bearer <token> }
 * Body: { name, description, content, tags, ... }
 * Response: { prompt: Prompt }
 *
 * @param {Object} data - Prompt data
 * @returns {Promise<Prompt>}
 */
export async function createPrompt(data) {
  const newPrompt = {
    id: MOCK_PROMPTS.length + 1,
    ...data,
    icon: <PromptsIcon />,
    rating: 0,
    uses: "0",
    lastUpdated: new Date().toLocaleDateString("en-GB"),
    variant: "light",
  };

  return apiCall(
    "/prompts",
    {
      method: "POST",
      body: JSON.stringify(data),
    },
    newPrompt
  );
}

/**
 * Update prompt
 *
 * TODO: Backend team - Replace with actual API call:
 * PUT /api/prompts/:id
 * Headers: { Authorization: Bearer <token> }
 * Body: { name, description, content, tags, ... }
 * Response: { prompt: Prompt }
 *
 * @param {number} id - Prompt ID
 * @param {Object} data - Updated prompt data
 * @returns {Promise<Prompt>}
 */
export async function updatePrompt(id, data) {
  const prompt = MOCK_PROMPTS.find((p) => p.id === id);
  const updated = {
    ...prompt,
    ...data,
    lastUpdated: new Date().toLocaleDateString("en-GB"),
  };

  return apiCall(
    `/prompts/${id}`,
    {
      method: "PUT",
      body: JSON.stringify(data),
    },
    updated
  );
}

/**
 * Delete prompt
 *
 * TODO: Backend team - Replace with actual API call:
 * DELETE /api/prompts/:id
 * Headers: { Authorization: Bearer <token> }
 * Response: { success: boolean }
 *
 * @param {number} id - Prompt ID
 * @returns {Promise<{success: boolean}>}
 */
export async function deletePrompt(id) {
  return apiCall(`/prompts/${id}`, { method: "DELETE" }, { success: true });
}

/**
 * Get prompt statistics
 *
 * TODO: Backend team - Replace with actual API call:
 * GET /api/prompts/stats
 * Response: { totalPrompts, totalUses, categories }
 *
 * @returns {Promise<PromptStats>}
 */
export async function getPromptStats() {
  return apiCall("/prompts/stats", { method: "GET" }, MOCK_STATS);
}

/**
 * Get all templates
 *
 * TODO: Backend team - Replace with actual API call:
 * GET /api/templates?search=&tags=&sortBy=&page=&limit=
 * Response: { templates: Template[], total: number, page: number, limit: number }
 *
 * @param {PromptsQuery} [params={}] - Query parameters
 * @returns {Promise<Template[]>}
 */
export async function getTemplates(params = {}) {
  return apiCall("/templates", { method: "GET" }, MOCK_TEMPLATES);
}

/**
 * Create new template
 *
 * TODO: Backend team - Replace with actual API call:
 * POST /api/templates
 * Headers: { Authorization: Bearer <token> }
 * Body: { name, description, content, variables, ... }
 * Response: { template: Template }
 *
 * @param {Object} data - Template data
 * @returns {Promise<Template>}
 */
export async function createTemplate(data) {
  const newTemplate = {
    id: MOCK_TEMPLATES.length + 1,
    ...data,
    icon: <TemplatesIcon />,
    uses: "0",
    variant: "light",
  };

  return apiCall(
    "/templates",
    {
      method: "POST",
      body: JSON.stringify(data),
    },
    newTemplate
  );
}

/**
 * Generate prompt using AI
 *
 * TODO: Backend team - Replace with actual API call:
 * POST /api/prompts/generate
 * Headers: { Authorization: Bearer <token> }
 * Body: { description, context, ... }
 * Response: { prompt: string }
 *
 * @param {Object} data - Generation parameters
 * @returns {Promise<{prompt: string}>}
 */
export async function generatePrompt(data) {
  const generated = {
    prompt: `Generated prompt based on: ${data.description || "user input"}`,
  };

  return apiCall(
    "/prompts/generate",
    {
      method: "POST",
      body: JSON.stringify(data),
    },
    generated
  );
}

/**
 * Get prompt content
 *
 * TODO: Backend team - Replace with actual API call:
 * GET /api/prompts/:id/content
 * Response: { content: PromptContent }
 *
 * @param {number} id - Prompt ID
 * @returns {Promise<PromptContent>}
 */
export async function getPromptContent(id) {
  const content = {
    text: "You are a helpful and empathetic customer service representative...",
    variables: ["customer_name", "issue_type"],
  };

  return apiCall(`/prompts/${id}/content`, { method: "GET" }, content);
}

/**
 * Get prompt metadata
 *
 * TODO: Backend team - Replace with actual API call:
 * GET /api/prompts/:id/metadata
 * Response: { metadata: PromptMetadata }
 *
 * @param {number} id - Prompt ID
 * @returns {Promise<PromptMetadata>}
 */
export async function getPromptMetadata(id) {
  const metadata = {
    version: "v3",
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-20T14:30:00Z",
    author: "System Admin",
  };

  return apiCall(`/prompts/${id}/metadata`, { method: "GET" }, metadata);
}

/**
 * Get prompt usage statistics
 *
 * TODO: Backend team - Replace with actual API call:
 * GET /api/prompts/:id/usage
 * Response: { usage: PromptUsage }
 *
 * @param {number} id - Prompt ID
 * @returns {Promise<PromptUsage>}
 */
export async function getPromptUsage(id) {
  const usage = {
    totalUses: 1250,
    uniqueUsers: 342,
    avgRating: 4.8,
    trend: [100, 150, 200, 250, 300, 350, 400],
  };

  return apiCall(`/prompts/${id}/usage`, { method: "GET" }, usage);
}
