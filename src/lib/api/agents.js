/**
 * Agents API Service
 *
 * This module contains mock agent functions.
 * TODO: Backend team - Replace mock responses with actual API calls
 *
 * @module api/agents
 */

import { apiCall } from "./client";
import { AgentStudioIcon } from "@/components/Icons";

/**
 * @typedef {import("@/types/agents").Agent} Agent
 * @typedef {import("@/types/agents").AgentStats} AgentStats
 * @typedef {import("@/types/agents").AgentMetrics} AgentMetrics
 * @typedef {import("@/types/agents").AgentHealth} AgentHealth
 * @typedef {import("@/types/agents").AgentActivity} AgentActivity
 * @typedef {import("@/types/agents").Conversation} Conversation
 * @typedef {import("@/types/agents").ConversationStats} ConversationStats
 * @typedef {import("@/types/agents").AgentsQuery} AgentsQuery
 */

/**
 * Mock agents data
 */
const MOCK_AGENTS = [
  {
    id: "auto-claims-processing-agent",
    name: "Auto Claims Processing Agent",
    description:
      "Automates auto insurance claims intake, validation, and processing",
    icon: <AgentStudioIcon />,
    status: "active",
    tags: ["auto", "claims", "processing"],
    lastActivity: "2 hours ago",
    requestCount: "3.2k requests",
    variant: "light",
  },
  {
    id: "property-claims-agent",
    name: "Property Claims Agent",
    description:
      "Handles home and property damage claims assessment and processing",
    icon: <AgentStudioIcon />,
    status: "active",
    tags: ["property", "claims", "home"],
    lastActivity: "3 hours ago",
    requestCount: "2.8k requests",
    variant: "light",
  },
  {
    id: "health-claims-adjudication-agent",
    name: "Health Claims Adjudication Agent",
    description:
      "Automates auto insurance claims intake, validation, and processing",
    icon: <AgentStudioIcon />,
    status: "active",
    tags: ["health", "claims", "medical"],
    lastActivity: "1 hour ago",
    requestCount: "4.1k requests",
    variant: "light",
  },
  {
    id: "workers-comp-claims-agent",
    name: "Workers Comp Claims Agent",
    description:
      "Handles home and property damage claims assessment and processing",
    icon: <AgentStudioIcon />,
    status: "active",
    tags: ["property", "claims", "home"],
    lastActivity: "3 hours ago",
    requestCount: "2.8k requests",
    variant: "light",
  },
  {
    id: "life-insurance-claims-agent",
    name: "Life Insurance Claims Agent",
    description:
      "Automates auto insurance claims intake, validation, and processing",
    icon: <AgentStudioIcon />,
    status: "active",
    tags: ["health", "claims", "medical"],
    lastActivity: "1 hour ago",
    requestCount: "4.1k requests",
    variant: "light",
  },
  {
    id: "claims-status-inquiry-agent",
    name: "Claims Status Inquiry Agent",
    description:
      "Automates auto insurance claims intake, validation, and processing",
    icon: <AgentStudioIcon />,
    status: "active",
    tags: ["health", "claims", "medical"],
    lastActivity: "1 hour ago",
    requestCount: "4.1k requests",
    variant: "light",
  },
  {
    id: "auto-underwriting-agent",
    name: "Auto Underwriting Agent",
    description:
      "Handles home and property damage claims assessment and processing",
    icon: <AgentStudioIcon />,
    status: "active",
    tags: ["property", "claims", "home"],
    lastActivity: "3 hours ago",
    requestCount: "2.8k requests",
    variant: "light",
  },
  {
    id: "home-insurance-underwriting-agent",
    name: "Home Insurance Underwriting Agent",
    description:
      "Automates auto insurance claims intake, validation, and processing",
    icon: <AgentStudioIcon />,
    status: "active",
    tags: ["health", "claims", "medical"],
    lastActivity: "1 hour ago",
    requestCount: "4.1k requests",
    variant: "light",
  },
];

/**
 * Mock agent statistics
 */
const MOCK_STATS = {
  totalAgents: "42",
  activeAgents: "41",
  totalRequests: "100,800",
};

/**
 * Mock agent detail data
 */
const MOCK_AGENT_DETAIL = {
  id: 0,
  name: "Auto Claims Processing Agent",
  description:
    "Automates auto insurance claims intake, validation, and processing",
  status: "active",
  tags: ["support", "customer-service"],
  lastModified: "2 Hours Ago",
  usage: "1.2K Request",
  metrics: {
    totalRequests: "12,847",
    avgResponse: "245ms",
    successRate: "99.2%",
    activeUsers: "156",
  },
  health: {
    lastActivity: "2 minutes ago",
    errorRate: "0.8%",
    systemStatus: "operational",
  },
  recentActivity: [
    {
      type: "success",
      event: "API call completed",
      time: "2 minutes ago",
    },
    {
      type: "info",
      event: "Configuration updated",
      time: "15 minutes ago",
    },
    {
      type: "success",
      event: "Health check passed",
      time: "30 minutes ago",
    },
    {
      type: "warning",
      event: "Rate limit approaching",
      time: "1 hour ago",
    },
    {
      type: "success",
      event: "Deployment completed",
      time: "2 hours ago",
    },
  ],
};

/**
 * Mock conversation stats
 */
const MOCK_CONVERSATION_STATS = {
  totalConversations: "1,247",
  avgTurnsPerConv: "8.3",
  avgDuration: "4m 32s",
  userSatisfaction: "94%",
};

/**
 * Mock conversations
 */
const MOCK_CONVERSATIONS = [
  {
    type: "success",
    event: "conv-001",
    mail: "user@example.com",
    turns: "12",
    time: "5m 20s",
  },
  {
    type: "success",
    event: "conv-002",
    mail: "alice@example.com",
    turns: "8",
    time: "3m 45s",
  },
  {
    type: "warning",
    event: "conv-003",
    mail: "bob@example.com",
    turns: "15",
    time: "8m 10s",
  },
  {
    type: "success",
    event: "conv-004",
    mail: "carol@example.com",
    turns: "6",
    time: "2m 30s",
  },
];

/**
 * Get all agents
 *
 * TODO: Backend team - Replace with actual API call:
 * GET /api/agents?search=&tags=&sortBy=&page=&limit=
 * Response: { agents: Agent[], total: number, page: number, limit: number }
 *
 * @param {AgentsQuery} [params={}] - Query parameters
 * @returns {Promise<Agent[]>}
 */
export async function getAgents(params = {}) {
  // In real implementation, backend would filter/sort/paginate
  // For now, return all mock data
  return apiCall("/agents", { method: "GET" }, MOCK_AGENTS);
}

/**
 * Get agent by ID
 *
 * TODO: Backend team - Replace with actual API call:
 * GET /api/agents/:id
 * Response: { agent: Agent }
 *
 * @param {string} id - Agent ID
 * @returns {Promise<Agent>}
 */
export async function getAgentById(id) {
  const agent = MOCK_AGENTS.find((a) => a.id === id) || MOCK_AGENT_DETAIL;
  return apiCall(`/agents/${id}`, { method: "GET" }, agent);
}

/**
 * Create new agent
 *
 * TODO: Backend team - Replace with actual API call:
 * POST /api/agents
 * Headers: { Authorization: Bearer <token> }
 * Body: { name, description, tags, ... }
 * Response: { agent: Agent }
 *
 * @param {Object} data - Agent data
 * @returns {Promise<Agent>}
 */
export async function createAgent(data) {
  const newAgent = {
    id: `agent-${Date.now()}`,
    ...data,
    icon: <AgentStudioIcon />,
    status: "active",
    lastActivity: "Just now",
    requestCount: "0 requests",
    variant: "light",
  };

  return apiCall(
    "/agents",
    {
      method: "POST",
      body: JSON.stringify(data),
    },
    newAgent
  );
}

/**
 * Update agent
 *
 * TODO: Backend team - Replace with actual API call:
 * PUT /api/agents/:id
 * Headers: { Authorization: Bearer <token> }
 * Body: { name, description, tags, ... }
 * Response: { agent: Agent }
 *
 * @param {string} id - Agent ID
 * @param {Object} data - Updated agent data
 * @returns {Promise<Agent>}
 */
export async function updateAgent(id, data) {
  const agent = MOCK_AGENTS.find((a) => a.id === id);
  const updated = {
    ...agent,
    ...data,
    lastModified: "Just now",
  };

  return apiCall(
    `/agents/${id}`,
    {
      method: "PUT",
      body: JSON.stringify(data),
    },
    updated
  );
}

/**
 * Delete agent
 *
 * TODO: Backend team - Replace with actual API call:
 * DELETE /api/agents/:id
 * Headers: { Authorization: Bearer <token> }
 * Response: { success: boolean }
 *
 * @param {string} id - Agent ID
 * @returns {Promise<{success: boolean}>}
 */
export async function deleteAgent(id) {
  return apiCall(`/agents/${id}`, { method: "DELETE" }, { success: true });
}

/**
 * Get agent statistics
 *
 * TODO: Backend team - Replace with actual API call:
 * GET /api/agents/stats
 * Response: { totalAgents, activeAgents, totalRequests }
 *
 * @returns {Promise<AgentStats>}
 */
export async function getAgentStats() {
  return apiCall("/agents/stats", { method: "GET" }, MOCK_STATS);
}

/**
 * Get agent metrics
 *
 * TODO: Backend team - Replace with actual API call:
 * GET /api/agents/:id/metrics
 * Response: { metrics: AgentMetrics }
 *
 * @param {string} id - Agent ID
 * @returns {Promise<AgentMetrics>}
 */
export async function getAgentMetrics(id) {
  return apiCall(
    `/agents/${id}/metrics`,
    { method: "GET" },
    MOCK_AGENT_DETAIL.metrics
  );
}

/**
 * Get agent health status
 *
 * TODO: Backend team - Replace with actual API call:
 * GET /api/agents/:id/health
 * Response: { health: AgentHealth }
 *
 * @param {string} id - Agent ID
 * @returns {Promise<AgentHealth>}
 */
export async function getAgentHealth(id) {
  return apiCall(
    `/agents/${id}/health`,
    { method: "GET" },
    MOCK_AGENT_DETAIL.health
  );
}

/**
 * Get agent activity log
 *
 * TODO: Backend team - Replace with actual API call:
 * GET /api/agents/:id/activity
 * Response: { activity: AgentActivity[] }
 *
 * @param {string} id - Agent ID
 * @returns {Promise<AgentActivity[]>}
 */
export async function getAgentActivity(id) {
  return apiCall(
    `/agents/${id}/activity`,
    { method: "GET" },
    MOCK_AGENT_DETAIL.recentActivity
  );
}

/**
 * Get agent conversations
 *
 * TODO: Backend team - Replace with actual API call:
 * GET /api/agents/:id/conversations
 * Response: { conversations: Conversation[] }
 *
 * @param {string} id - Agent ID
 * @returns {Promise<Conversation[]>}
 */
export async function getAgentConversations(id) {
  return apiCall(
    `/agents/${id}/conversations`,
    { method: "GET" },
    MOCK_CONVERSATIONS
  );
}

/**
 * Get agent conversation statistics
 *
 * TODO: Backend team - Replace with actual API call:
 * GET /api/agents/:id/conversations/stats
 * Response: { stats: ConversationStats }
 *
 * @param {string} id - Agent ID
 * @returns {Promise<ConversationStats>}
 */
export async function getAgentConversationStats(id) {
  return apiCall(
    `/agents/${id}/conversations/stats`,
    { method: "GET" },
    MOCK_CONVERSATION_STATS
  );
}
