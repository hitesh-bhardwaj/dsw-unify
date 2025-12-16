/**
 * Knowledge Bases API Service
 *
 * This module contains mock knowledge base functions.
 * TODO: Backend team - Replace mock responses with actual API calls
 *
 * @module api/knowledge-bases
 */

import { apiCall } from "./client";
import { KnowledgeBaseIcon } from "@/components/Icons";

/**
 * @typedef {import("@/types/knowledge-bases").KnowledgeBase} KnowledgeBase
 * @typedef {import("@/types/knowledge-bases").KnowledgeBaseStats} KnowledgeBaseStats
 * @typedef {import("@/types/knowledge-bases").Document} Document
 * @typedef {import("@/types/knowledge-bases").StorageStrategy} StorageStrategy
 * @typedef {import("@/types/knowledge-bases").Activity} Activity
 * @typedef {import("@/types/knowledge-bases").KnowledgeBaseSettings} KnowledgeBaseSettings
 * @typedef {import("@/types/knowledge-bases").KnowledgeBasesQuery} KnowledgeBasesQuery
 */

/**
 * Mock knowledge bases data
 */
const MOCK_KNOWLEDGE_BASES = [
  {
    id: "company-documentation",
    name: "Company Documentation",
    icon: <KnowledgeBaseIcon />,
    description: "Internal company policies and procedures",
    status: "active",
    size: "2.3 GB",
    documentsCount: "1250",
    variant: "light",
    lastSynced: "Last synced 2 hour ago",
  },
  {
    id: "product-knowledge-base",
    name: "Product Knowledge Base",
    icon: <KnowledgeBaseIcon />,
    description: "Product specifications and user guides",
    status: "draft",
    size: "890 MB",
    documentsCount: "450",
    variant: "light",
    lastSynced: "Last synced 2 hour ago",
  },
];

/**
 * Mock knowledge base statistics
 */
const MOCK_STATS = {
  totalKnowledgeBases: "04",
  synced: "02",
  totalDocuments: "4,580",
};

/**
 * Mock documents data
 */
const MOCK_DOCUMENTS = [
  {
    id: "doc-1",
    name: "Employee Handbook.pdf",
    description: "Added 2 new features and updated transformation logic",
    storage: "2.4 MB",
    time: "Updated 2 hours ago",
  },
  {
    id: "doc-2",
    name: "Company Policies.docx",
    description: "Updated join configuration for orders table",
    storage: "1.8 MB",
    time: "Updated 1 day ago",
  },
  {
    id: "doc-3",
    name: "Benefits Guide.pdf",
    description: "Initial feature view creation",
    storage: "3.2 MB",
    time: "Updated 3 days ago",
  },
  {
    id: "doc-4",
    name: "Code of Conduct.pdf",
    description: "Initial feature view creation",
    storage: "1.1 MB",
    time: "Updated 1 week ago",
  },
];

/**
 * Mock activity data
 */
const MOCK_ACTIVITY = [
  {
    id: "activity-1",
    action: "Document uploaded",
    document: "Employee Handbook.pdf",
    user: "John Doe",
    timestamp: "2 hours ago",
  },
  {
    id: "activity-2",
    action: "Knowledge base synced",
    user: "System",
    timestamp: "2 hours ago",
  },
  {
    id: "activity-3",
    action: "Document updated",
    document: "Company Policies.docx",
    user: "Jane Smith",
    timestamp: "1 day ago",
  },
];

/**
 * Get all knowledge bases
 *
 * TODO: Backend team - Replace with actual API call:
 * GET /api/knowledge-bases?search=&sortBy=&page=&limit=
 * Response: { knowledgeBases: KnowledgeBase[], total: number, page: number, limit: number }
 *
 * @param {KnowledgeBasesQuery} [params={}] - Query parameters
 * @returns {Promise<KnowledgeBase[]>}
 */
export async function getKnowledgeBases(params = {}) {
  return apiCall("/knowledge-bases", { method: "GET" }, MOCK_KNOWLEDGE_BASES);
}

/**
 * Get knowledge base by ID
 *
 * TODO: Backend team - Replace with actual API call:
 * GET /api/knowledge-bases/:id
 * Response: { knowledgeBase: KnowledgeBase }
 *
 * @param {string} id - Knowledge base ID
 * @returns {Promise<KnowledgeBase>}
 */
export async function getKnowledgeBaseById(id) {
  const kb =
    MOCK_KNOWLEDGE_BASES.find((k) => k.id === id) || {
      id,
      name: "Company Documentation",
      icon: <KnowledgeBaseIcon />,
      description: "Internal company policies and procedures",
      status: "active",
      documents: "1,250",
      storage: "2.3 GB",
      source: "Google Drive",
      variant: "light",
    };

  return apiCall(`/knowledge-bases/${id}`, { method: "GET" }, kb);
}

/**
 * Create new knowledge base
 *
 * TODO: Backend team - Replace with actual API call:
 * POST /api/knowledge-bases
 * Headers: { Authorization: Bearer <token> }
 * Body: { name, description, source, configuration, ... }
 * Response: { knowledgeBase: KnowledgeBase }
 *
 * @param {Object} data - Knowledge base data
 * @returns {Promise<KnowledgeBase>}
 */
export async function createKnowledgeBase(data) {
  const newKB = {
    id: `kb-${Date.now()}`,
    ...data,
    icon: <KnowledgeBaseIcon />,
    status: "draft",
    size: "0 MB",
    documentsCount: "0",
    variant: "light",
    lastSynced: "Never",
  };

  return apiCall(
    "/knowledge-bases",
    {
      method: "POST",
      body: JSON.stringify(data),
    },
    newKB
  );
}

/**
 * Update knowledge base
 *
 * TODO: Backend team - Replace with actual API call:
 * PUT /api/knowledge-bases/:id
 * Headers: { Authorization: Bearer <token> }
 * Body: { name, description, configuration, ... }
 * Response: { knowledgeBase: KnowledgeBase }
 *
 * @param {string} id - Knowledge base ID
 * @param {Object} data - Updated knowledge base data
 * @returns {Promise<KnowledgeBase>}
 */
export async function updateKnowledgeBase(id, data) {
  const kb = MOCK_KNOWLEDGE_BASES.find((k) => k.id === id);
  const updated = {
    ...kb,
    ...data,
  };

  return apiCall(
    `/knowledge-bases/${id}`,
    {
      method: "PUT",
      body: JSON.stringify(data),
    },
    updated
  );
}

/**
 * Delete knowledge base
 *
 * TODO: Backend team - Replace with actual API call:
 * DELETE /api/knowledge-bases/:id
 * Headers: { Authorization: Bearer <token> }
 * Response: { success: boolean }
 *
 * @param {string} id - Knowledge base ID
 * @returns {Promise<{success: boolean}>}
 */
export async function deleteKnowledgeBase(id) {
  return apiCall(`/knowledge-bases/${id}`, { method: "DELETE" }, { success: true });
}

/**
 * Sync knowledge base with source
 *
 * TODO: Backend team - Replace with actual API call:
 * POST /api/knowledge-bases/:id/sync
 * Headers: { Authorization: Bearer <token> }
 * Response: { success: boolean, syncedAt: string, documentsAdded: number }
 *
 * @param {string} id - Knowledge base ID
 * @returns {Promise<{success: boolean, syncedAt: string, documentsAdded: number}>}
 */
export async function syncKnowledgeBase(id) {
  const result = {
    success: true,
    syncedAt: new Date().toISOString(),
    documentsAdded: 5,
  };

  return apiCall(`/knowledge-bases/${id}/sync`, { method: "POST" }, result);
}

/**
 * Get knowledge base statistics
 *
 * TODO: Backend team - Replace with actual API call:
 * GET /api/knowledge-bases/stats
 * Response: { totalKnowledgeBases, synced, totalDocuments }
 *
 * @returns {Promise<KnowledgeBaseStats>}
 */
export async function getKnowledgeBaseStats() {
  return apiCall("/knowledge-bases/stats", { method: "GET" }, MOCK_STATS);
}

/**
 * Get documents in knowledge base
 *
 * TODO: Backend team - Replace with actual API call:
 * GET /api/knowledge-bases/:id/documents?page=&limit=
 * Response: { documents: Document[], total: number }
 *
 * @param {string} id - Knowledge base ID
 * @returns {Promise<Document[]>}
 */
export async function getDocuments(id) {
  return apiCall(`/knowledge-bases/${id}/documents`, { method: "GET" }, MOCK_DOCUMENTS);
}

/**
 * Upload documents to knowledge base
 *
 * TODO: Backend team - Replace with actual API call:
 * POST /api/knowledge-bases/:id/documents
 * Headers: { Authorization: Bearer <token>, Content-Type: multipart/form-data }
 * Body: FormData with files
 * Response: { documents: Document[], uploaded: number }
 *
 * @param {string} id - Knowledge base ID
 * @param {FileList|File[]} files - Files to upload
 * @returns {Promise<{documents: Document[], uploaded: number}>}
 */
export async function uploadDocuments(id, files) {
  const newDocs = Array.from(files).map((file, index) => ({
    id: `doc-${Date.now()}-${index}`,
    name: file.name,
    description: "Newly uploaded document",
    storage: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
    time: "Just now",
  }));

  return apiCall(
    `/knowledge-bases/${id}/documents`,
    {
      method: "POST",
      // In real implementation, use FormData
    },
    { documents: newDocs, uploaded: newDocs.length }
  );
}

/**
 * Delete document from knowledge base
 *
 * TODO: Backend team - Replace with actual API call:
 * DELETE /api/knowledge-bases/:id/documents/:docId
 * Headers: { Authorization: Bearer <token> }
 * Response: { success: boolean }
 *
 * @param {string} id - Knowledge base ID
 * @param {string} docId - Document ID
 * @returns {Promise<{success: boolean}>}
 */
export async function deleteDocument(id, docId) {
  return apiCall(
    `/knowledge-bases/${id}/documents/${docId}`,
    { method: "DELETE" },
    { success: true }
  );
}

/**
 * Download document from knowledge base
 *
 * TODO: Backend team - Replace with actual API call:
 * GET /api/knowledge-bases/:id/documents/:docId/download
 * Headers: { Authorization: Bearer <token> }
 * Response: Blob (file download)
 *
 * @param {string} id - Knowledge base ID
 * @param {string} docId - Document ID
 * @returns {Promise<{url: string}>}
 */
export async function downloadDocument(id, docId) {
  return apiCall(
    `/knowledge-bases/${id}/documents/${docId}/download`,
    { method: "GET" },
    { url: `https://example.com/download/${docId}` }
  );
}

/**
 * Get storage strategy configuration
 *
 * TODO: Backend team - Replace with actual API call:
 * GET /api/knowledge-bases/:id/storage-strategy
 * Response: { strategy: StorageStrategy }
 *
 * @param {string} id - Knowledge base ID
 * @returns {Promise<StorageStrategy>}
 */
export async function getStorageStrategy(id) {
  const strategy = {
    type: "vector",
    embeddingModel: "text-embedding-ada-002",
    chunkSize: 1000,
    chunkOverlap: 200,
    indexType: "faiss",
  };

  return apiCall(`/knowledge-bases/${id}/storage-strategy`, { method: "GET" }, strategy);
}

/**
 * Update storage strategy configuration
 *
 * TODO: Backend team - Replace with actual API call:
 * PUT /api/knowledge-bases/:id/storage-strategy
 * Headers: { Authorization: Bearer <token> }
 * Body: { type, embeddingModel, chunkSize, ... }
 * Response: { strategy: StorageStrategy }
 *
 * @param {string} id - Knowledge base ID
 * @param {Object} data - Storage strategy data
 * @returns {Promise<StorageStrategy>}
 */
export async function updateStorageStrategy(id, data) {
  const strategy = {
    ...data,
    updatedAt: new Date().toISOString(),
  };

  return apiCall(
    `/knowledge-bases/${id}/storage-strategy`,
    {
      method: "PUT",
      body: JSON.stringify(data),
    },
    strategy
  );
}

/**
 * Get knowledge base activity log
 *
 * TODO: Backend team - Replace with actual API call:
 * GET /api/knowledge-bases/:id/activity?page=&limit=
 * Response: { activity: Activity[] }
 *
 * @param {string} id - Knowledge base ID
 * @returns {Promise<Activity[]>}
 */
export async function getActivity(id) {
  return apiCall(`/knowledge-bases/${id}/activity`, { method: "GET" }, MOCK_ACTIVITY);
}

/**
 * Get knowledge base settings
 *
 * TODO: Backend team - Replace with actual API call:
 * GET /api/knowledge-bases/:id/settings
 * Response: { settings: KnowledgeBaseSettings }
 *
 * @param {string} id - Knowledge base ID
 * @returns {Promise<KnowledgeBaseSettings>}
 */
export async function getSettings(id) {
  const settings = {
    autoSync: true,
    syncInterval: "daily",
    publicAccess: false,
    allowDownload: true,
  };

  return apiCall(`/knowledge-bases/${id}/settings`, { method: "GET" }, settings);
}

/**
 * Update knowledge base settings
 *
 * TODO: Backend team - Replace with actual API call:
 * PUT /api/knowledge-bases/:id/settings
 * Headers: { Authorization: Bearer <token> }
 * Body: { autoSync, syncInterval, publicAccess, ... }
 * Response: { settings: KnowledgeBaseSettings }
 *
 * @param {string} id - Knowledge base ID
 * @param {Object} data - Settings data
 * @returns {Promise<KnowledgeBaseSettings>}
 */
export async function updateSettings(id, data) {
  const settings = {
    ...data,
    updatedAt: new Date().toISOString(),
  };

  return apiCall(
    `/knowledge-bases/${id}/settings`,
    {
      method: "PUT",
      body: JSON.stringify(data),
    },
    settings
  );
}
