/**
 * Memories API Service
 *
 * This module contains mock memory functions.
 * TODO: Backend team - Replace mock responses with actual API calls
 *
 * @module api/memories
 */

import { apiCall } from "./client";
import { MemoriesIcon } from "@/components/Icons";

/**
 * @typedef {import("@/types/memories").Memory} Memory
 * @typedef {import("@/types/memories").MemoryStats} MemoryStats
 * @typedef {import("@/types/memories").MemoryOverview} MemoryOverview
 * @typedef {import("@/types/memories").MemoryEntry} MemoryEntry
 * @typedef {import("@/types/memories").MemorySettings} MemorySettings
 * @typedef {import("@/types/memories").MemoriesQuery} MemoriesQuery
 */

/**
 * Mock memories data
 */
const MOCK_MEMORIES = [
  {
    id: "user-preferences",
    name: "User Preferences",
    description: "Individual user preferences and settings",
    icon: <MemoriesIcon />,
    status: "active",
    tags: ["session", "user"],
    size: "2.4 MB",
    entries: 1250,
    variant: "light",
  },
  {
    id: "agent-learning",
    name: "Agent Learning",
    description: "Agent-specific learned behaviors and patterns",
    icon: <MemoriesIcon />,
    status: "active",
    tags: ["agent"],
    size: "12.4 MB",
    entries: 890,
    variant: "light",
  },
  {
    id: "organization-knowledge",
    name: "Organization Knowledge",
    description: "Company-wide shared knowledge and insights",
    icon: <MemoriesIcon />,
    status: "active",
    size: "6.4 MB",
    tags: ["organization"],
    entries: 2340,
    variant: "light",
  },
];

/**
 * Mock memory statistics
 */
const MOCK_STATS = {
  totalMemories: "03",
  activeMemories: "03",
  totalEntries: "4480",
};

/**
 * Mock memory entries
 */
const MOCK_ENTRIES = [
  {
    id: 1250,
    content: "Sample memory entry content would appear here...",
    time: "1 hours ago",
  },
  {
    id: 1249,
    content: "Sample memory entry content would appear here...",
    time: "2 hours ago",
  },
  {
    id: 1248,
    content: "Sample memory entry content would appear here...",
    time: "3 hours ago",
  },
  {
    id: 1247,
    content: "Sample memory entry content would appear here...",
    time: "4 hours ago",
  },
  {
    id: 1246,
    content: "Sample memory entry content would appear here...",
    time: "5 hours ago",
  },
];

/**
 * Get all memories
 *
 * TODO: Backend team - Replace with actual API call:
 * GET /api/memories?search=&tags=&sortBy=&page=&limit=
 * Response: { memories: Memory[], total: number, page: number, limit: number }
 *
 * @param {MemoriesQuery} [params={}] - Query parameters
 * @returns {Promise<Memory[]>}
 */
export async function getMemories(params = {}) {
  return apiCall("/memories", { method: "GET" }, MOCK_MEMORIES);
}

/**
 * Get memory by ID
 *
 * TODO: Backend team - Replace with actual API call:
 * GET /api/memories/:id
 * Response: { memory: Memory }
 *
 * @param {string} id - Memory ID
 * @returns {Promise<Memory>}
 */
export async function getMemoryById(id) {
  const memory =
    MOCK_MEMORIES.find((m) => m.id === id) || {
      id,
      name: "User Preferences",
      description: "Individual user preferences and settings",
      icon: <MemoriesIcon />,
      status: "active",
      variant: "light",
    };

  return apiCall(`/memories/${id}`, { method: "GET" }, memory);
}

/**
 * Create new memory
 *
 * TODO: Backend team - Replace with actual API call:
 * POST /api/memories
 * Headers: { Authorization: Bearer <token> }
 * Body: { name, description, type, scope, retentionPolicy, maxEntries, ... }
 * Response: { memory: Memory }
 *
 * @param {Object} data - Memory data
 * @returns {Promise<Memory>}
 */
export async function createMemory(data) {
  const newMemory = {
    id: `memory-${Date.now()}`,
    ...data,
    icon: <MemoriesIcon />,
    status: "active",
    size: "0 MB",
    entries: 0,
    variant: "light",
  };

  return apiCall(
    "/memories",
    {
      method: "POST",
      body: JSON.stringify(data),
    },
    newMemory
  );
}

/**
 * Update memory
 *
 * TODO: Backend team - Replace with actual API call:
 * PUT /api/memories/:id
 * Headers: { Authorization: Bearer <token> }
 * Body: { name, description, ... }
 * Response: { memory: Memory }
 *
 * @param {string} id - Memory ID
 * @param {Object} data - Updated memory data
 * @returns {Promise<Memory>}
 */
export async function updateMemory(id, data) {
  const memory = MOCK_MEMORIES.find((m) => m.id === id);
  const updated = {
    ...memory,
    ...data,
  };

  return apiCall(
    `/memories/${id}`,
    {
      method: "PUT",
      body: JSON.stringify(data),
    },
    updated
  );
}

/**
 * Delete memory
 *
 * TODO: Backend team - Replace with actual API call:
 * DELETE /api/memories/:id
 * Headers: { Authorization: Bearer <token> }
 * Response: { success: boolean }
 *
 * @param {string} id - Memory ID
 * @returns {Promise<{success: boolean}>}
 */
export async function deleteMemory(id) {
  return apiCall(`/memories/${id}`, { method: "DELETE" }, { success: true });
}

/**
 * Get memory statistics
 *
 * TODO: Backend team - Replace with actual API call:
 * GET /api/memories/stats
 * Response: { totalMemories, activeMemories, totalEntries }
 *
 * @returns {Promise<MemoryStats>}
 */
export async function getMemoryStats() {
  return apiCall("/memories/stats", { method: "GET" }, MOCK_STATS);
}

/**
 * Get memory overview
 *
 * TODO: Backend team - Replace with actual API call:
 * GET /api/memories/:id/overview
 * Response: { overview: MemoryOverview }
 *
 * @param {string} id - Memory ID
 * @returns {Promise<MemoryOverview>}
 */
export async function getMemoryOverview(id) {
  const overview = {
    totalEntries: "1250",
    type: "Session",
    scope: "User",
    status: "Active",
    storageUsed: "2.4 MB",
    queriesToday: "156",
    retrievalAccuracy: "98.2%",
    avgQueryTime: "45ms",
  };

  return apiCall(`/memories/${id}/overview`, { method: "GET" }, overview);
}

/**
 * Get memory entries
 *
 * TODO: Backend team - Replace with actual API call:
 * GET /api/memories/:id/entries?page=&limit=
 * Response: { entries: MemoryEntry[], total: number }
 *
 * @param {string} id - Memory ID
 * @returns {Promise<MemoryEntry[]>}
 */
export async function getMemoryEntries(id) {
  return apiCall(`/memories/${id}/entries`, { method: "GET" }, MOCK_ENTRIES);
}

/**
 * Add memory entry
 *
 * TODO: Backend team - Replace with actual API call:
 * POST /api/memories/:id/entries
 * Headers: { Authorization: Bearer <token> }
 * Body: { content, metadata, ... }
 * Response: { entry: MemoryEntry }
 *
 * @param {string} id - Memory ID
 * @param {Object} data - Entry data
 * @returns {Promise<MemoryEntry>}
 */
export async function addMemoryEntry(id, data) {
  const newEntry = {
    id: Date.now(),
    content: data.content,
    time: "Just now",
  };

  return apiCall(
    `/memories/${id}/entries`,
    {
      method: "POST",
      body: JSON.stringify(data),
    },
    newEntry
  );
}

/**
 * Delete memory entry
 *
 * TODO: Backend team - Replace with actual API call:
 * DELETE /api/memories/:id/entries/:entryId
 * Headers: { Authorization: Bearer <token> }
 * Response: { success: boolean }
 *
 * @param {string} id - Memory ID
 * @param {number} entryId - Entry ID
 * @returns {Promise<{success: boolean}>}
 */
export async function deleteMemoryEntry(id, entryId) {
  return apiCall(
    `/memories/${id}/entries/${entryId}`,
    { method: "DELETE" },
    { success: true }
  );
}

/**
 * Get memory settings
 *
 * TODO: Backend team - Replace with actual API call:
 * GET /api/memories/:id/settings
 * Response: { settings: MemorySettings }
 *
 * @param {string} id - Memory ID
 * @returns {Promise<MemorySettings>}
 */
export async function getMemorySettings(id) {
  const settings = {
    name: "User Preferences",
    description: "Individual user preferences and settings",
    retentionPolicy: "Keep entries for 90 days",
    maxEntries: "10,000 entries",
  };

  return apiCall(`/memories/${id}/settings`, { method: "GET" }, settings);
}

/**
 * Update memory settings
 *
 * TODO: Backend team - Replace with actual API call:
 * PUT /api/memories/:id/settings
 * Headers: { Authorization: Bearer <token> }
 * Body: { retentionPolicy, maxEntries, ... }
 * Response: { settings: MemorySettings }
 *
 * @param {string} id - Memory ID
 * @param {Object} data - Settings data
 * @returns {Promise<MemorySettings>}
 */
export async function updateMemorySettings(id, data) {
  const settings = {
    ...data,
    updatedAt: new Date().toISOString(),
  };

  return apiCall(
    `/memories/${id}/settings`,
    {
      method: "PUT",
      body: JSON.stringify(data),
    },
    settings
  );
}
