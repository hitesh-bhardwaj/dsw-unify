/**
 * Tools API Service
 *
 * This module contains mock tool functions.
 * TODO: Backend team - Replace mock responses with actual API calls
 *
 * @module api/tools
 */

import { apiCall } from "./client";
import { ToolsIcon } from "@/components/Icons";

/**
 * @typedef {import("@/types/tools").Tool} Tool
 * @typedef {import("@/types/tools").ToolStats} ToolStats
 * @typedef {import("@/types/tools").ToolOverview} ToolOverview
 * @typedef {import("@/types/tools").ToolConfig} ToolConfig
 * @typedef {import("@/types/tools").ToolUsage} ToolUsage
 * @typedef {import("@/types/tools").ToolsQuery} ToolsQuery
 */

/**
 * Mock tools data
 */
const MOCK_TOOLS = [
  // Default Tools
  {
    id: "web-search",
    name: "Web Search",
    description: "Search the web for current information",
    icon: <ToolsIcon />,
    status: "active",
    tags: ["api", "search"],
    variant: "light",
    isCustom: false,
  },
  {
    id: "calculator",
    name: "Calculator",
    description: "Perform mathematical calculations",
    icon: <ToolsIcon />,
    status: "active",
    tags: ["function", "utility"],
    variant: "light",
    isCustom: false,
  },
  {
    id: "code-executor",
    name: "Code Executor",
    description: "Execute Python code safely",
    icon: <ToolsIcon />,
    status: "beta",
    tags: ["sandbox", "development"],
    variant: "light",
    isCustom: false,
  },
  // Custom Tools
  {
    id: "weather-api",
    name: "Weather API",
    description: "Get current weather information for any location",
    icon: <ToolsIcon />,
    status: "active",
    tags: ["custom", "api", "data"],
    variant: "light",
    isCustom: true,
    functionCode: `def get_weather(input_data, config):
    # Get weather information
    api_key = config.get('api_key')
    location = input_data.get('location')

    # Make API call to weather service
    response = requests.get(f'https://api.weather.com/v1/current?location={location}&key={api_key}')

    return response.json()`,
    parameters: [
      {
        id: 1,
        name: "api_key",
        displayLabel: "API Key",
        description: "Weather API key",
        type: "string",
        defaultValue: "",
        required: true,
      },
    ],
  },
  {
    id: "email-sender",
    name: "Email Sender",
    description: "Send emails through SMTP integration",
    icon: <ToolsIcon />,
    status: "active",
    tags: ["custom", "api", "utility"],
    variant: "light",
    isCustom: true,
    functionCode: `def send_email(input_data, config):
    # Send email via SMTP
    smtp_server = config.get('smtp_server')
    smtp_port = config.get('smtp_port', 587)
    username = config.get('username')
    password = config.get('password')

    to_email = input_data.get('to')
    subject = input_data.get('subject')
    body = input_data.get('body')

    # Send email logic
    return {"status": "sent", "message_id": "12345"}`,
    parameters: [
      {
        id: 1,
        name: "smtp_server",
        displayLabel: "SMTP Server",
        description: "SMTP server address",
        type: "string",
        defaultValue: "smtp.gmail.com",
        required: true,
      },
      {
        id: 2,
        name: "smtp_port",
        displayLabel: "SMTP Port",
        description: "SMTP server port",
        type: "number",
        defaultValue: "587",
        required: true,
      },
      {
        id: 3,
        name: "username",
        displayLabel: "Username",
        description: "SMTP username",
        type: "string",
        defaultValue: "",
        required: true,
      },
      {
        id: 4,
        name: "password",
        displayLabel: "Password",
        description: "SMTP password",
        type: "string",
        defaultValue: "",
        required: true,
      },
    ],
  },
  {
    id: "database-query",
    name: "Database Query",
    description: "Execute SQL queries on connected databases",
    icon: <ToolsIcon />,
    status: "active",
    tags: ["custom", "function", "data"],
    variant: "light",
    isCustom: true,
    functionCode: `def execute_query(input_data, config):
    # Execute SQL query
    connection_string = config.get('connection_string')
    query = input_data.get('query')

    # Connect to database and execute query
    conn = create_connection(connection_string)
    result = conn.execute(query)

    return result.fetchall()`,
    parameters: [
      {
        id: 1,
        name: "connection_string",
        displayLabel: "Connection String",
        description: "Database connection string",
        type: "string",
        defaultValue: "",
        required: true,
      },
      {
        id: 2,
        name: "timeout",
        displayLabel: "Query Timeout",
        description: "Query timeout in seconds",
        type: "number",
        defaultValue: "30",
        required: false,
      },
    ],
  },
];

/**
 * Mock tool statistics
 */
const MOCK_STATS = {
  totalTools: "06",
  activeTools: "05",
  categories: "04",
};

/**
 * Get all tools
 *
 * TODO: Backend team - Replace with actual API call:
 * GET /api/tools?search=&tags=&sortBy=&page=&limit=
 * Response: { tools: Tool[], total: number, page: number, limit: number }
 *
 * @param {ToolsQuery} [params={}] - Query parameters
 * @returns {Promise<Tool[]>}
 */
export async function getTools(params = {}) {
  return apiCall("/tools", { method: "GET" }, MOCK_TOOLS);
}

/**
 * Get tool by ID
 *
 * TODO: Backend team - Replace with actual API call:
 * GET /api/tools/:id
 * Response: { tool: Tool }
 *
 * @param {string} id - Tool ID
 * @returns {Promise<Tool>}
 */
export async function getToolById(id) {
  // Try to find tool by exact ID match, or by converting slug to match name
  let tool = MOCK_TOOLS.find((t) => t.id === id);

  // If not found and id looks like a slug, try to match by converting slug to title
  if (!tool && typeof id === 'string' && id.includes('-')) {
    const title = id.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    tool = MOCK_TOOLS.find((t) => t.name === title);
  }

  return apiCall(`/tools/${id}`, { method: "GET" }, tool);
}

/**
 * Create new tool
 *
 * TODO: Backend team - Replace with actual API call:
 * POST /api/tools
 * Headers: { Authorization: Bearer <token> }
 * Body: { name, description, type, configuration, ... }
 * Response: { tool: Tool }
 *
 * @param {Object} data - Tool data
 * @returns {Promise<Tool>}
 */
export async function createTool(data) {
  const newTool = {
    id: `tool-${Date.now()}`,
    ...data,
    icon: <ToolsIcon />,
    status: "active",
    variant: "light",
  };

  return apiCall(
    "/tools",
    {
      method: "POST",
      body: JSON.stringify(data),
    },
    newTool
  );
}

/**
 * Update tool
 *
 * TODO: Backend team - Replace with actual API call:
 * PUT /api/tools/:id
 * Headers: { Authorization: Bearer <token> }
 * Body: { name, description, configuration, ... }
 * Response: { tool: Tool }
 *
 * @param {string} id - Tool ID
 * @param {Object} data - Updated tool data
 * @returns {Promise<Tool>}
 */
export async function updateTool(id, data) {
  const tool = MOCK_TOOLS.find((t) => t.id === id);
  const updated = {
    ...tool,
    ...data,
  };

  return apiCall(
    `/tools/${id}`,
    {
      method: "PUT",
      body: JSON.stringify(data),
    },
    updated
  );
}

/**
 * Delete tool
 *
 * TODO: Backend team - Replace with actual API call:
 * DELETE /api/tools/:id
 * Headers: { Authorization: Bearer <token> }
 * Response: { success: boolean }
 *
 * @param {string} id - Tool ID
 * @returns {Promise<{success: boolean}>}
 */
export async function deleteTool(id) {
  return apiCall(`/tools/${id}`, { method: "DELETE" }, { success: true });
}

/**
 * Get tool statistics
 *
 * TODO: Backend team - Replace with actual API call:
 * GET /api/tools/stats
 * Response: { totalTools, activeTools, categories }
 *
 * @returns {Promise<ToolStats>}
 */
export async function getToolStats() {
  return apiCall("/tools/stats", { method: "GET" }, MOCK_STATS);
}

/**
 * Get tool overview
 *
 * TODO: Backend team - Replace with actual API call:
 * GET /api/tools/:id/overview
 * Response: { overview: ToolOverview }
 *
 * @param {string} id - Tool ID
 * @returns {Promise<ToolOverview>}
 */
export async function getToolOverview(id) {
  const overview = {
    name: "Web Search",
    description: "Search the web for current information",
    type: "API Integration",
    provider: "Custom",
    version: "v1.0.0",
  };

  return apiCall(`/tools/${id}/overview`, { method: "GET" }, overview);
}

/**
 * Get tool configuration
 *
 * TODO: Backend team - Replace with actual API call:
 * GET /api/tools/:id/config
 * Response: { config: ToolConfig }
 *
 * @param {string} id - Tool ID
 * @returns {Promise<ToolConfig>}
 */
export async function getToolConfig(id) {
  const config = {
    apiEndpoint: "https://api.example.com/search",
    timeout: 30000,
    retryAttempts: 3,
    parameters: {
      maxResults: 10,
      language: "en",
    },
  };

  return apiCall(`/tools/${id}/config`, { method: "GET" }, config);
}

/**
 * Update tool configuration
 *
 * TODO: Backend team - Replace with actual API call:
 * PUT /api/tools/:id/config
 * Headers: { Authorization: Bearer <token> }
 * Body: { apiEndpoint, timeout, parameters, ... }
 * Response: { config: ToolConfig }
 *
 * @param {string} id - Tool ID
 * @param {Object} data - Configuration data
 * @returns {Promise<ToolConfig>}
 */
export async function updateToolConfig(id, data) {
  const config = {
    ...data,
    updatedAt: new Date().toISOString(),
  };

  return apiCall(
    `/tools/${id}/config`,
    {
      method: "PUT",
      body: JSON.stringify(data),
    },
    config
  );
}

/**
 * Get tool usage statistics
 *
 * TODO: Backend team - Replace with actual API call:
 * GET /api/tools/:id/usage
 * Response: { usage: ToolUsage }
 *
 * @param {string} id - Tool ID
 * @returns {Promise<ToolUsage>}
 */
export async function getToolUsage(id) {
  const usage = {
    totalCalls: 4523,
    successRate: 98.5,
    avgResponseTime: "245ms",
    trend: [300, 350, 400, 420, 450, 480, 500],
  };

  return apiCall(`/tools/${id}/usage`, { method: "GET" }, usage);
}

/**
 * Test tool execution
 *
 * TODO: Backend team - Replace with actual API call:
 * POST /api/tools/:id/test
 * Headers: { Authorization: Bearer <token> }
 * Body: { input: any, parameters: Object }
 * Response: { result: any, executionTime: number }
 *
 * @param {string} id - Tool ID
 * @param {Object} data - Test input data
 * @returns {Promise<{result: any, executionTime: number}>}
 */
export async function testTool(id, data) {
  const result = {
    result: "Tool executed successfully with test data",
    executionTime: 245,
  };

  return apiCall(
    `/tools/${id}/test`,
    {
      method: "POST",
      body: JSON.stringify(data),
    },
    result
  );
}

/**
 * Create custom tool with Python function
 *
 * TODO: Backend team - Replace with actual API call:
 * POST /api/tools/custom
 * Headers: { Authorization: Bearer <token> }
 * Body: { name, description, functionCode, parameters, ... }
 * Response: { tool: Tool }
 *
 * @param {Object} data - Custom tool data
 * @returns {Promise<Tool>}
 */
export async function createCustomTool(data) {
  const newTool = {
    id: `custom-tool-${Date.now()}`,
    ...data,
    icon: <ToolsIcon />,
    isCustom: true,
    variant: "light",
  };

  return apiCall(
    "/tools/custom",
    {
      method: "POST",
      body: JSON.stringify(data),
    },
    newTool
  );
}

/**
 * Update custom tool
 *
 * TODO: Backend team - Replace with actual API call:
 * PUT /api/tools/custom/:id
 * Headers: { Authorization: Bearer <token> }
 * Body: { name, description, functionCode, parameters, ... }
 * Response: { tool: Tool }
 *
 * @param {string} id - Tool ID
 * @param {Object} data - Updated tool data
 * @returns {Promise<Tool>}
 */
export async function updateCustomTool(id, data) {
  const updated = {
    id,
    ...data,
    icon: <ToolsIcon />,
    isCustom: true,
  };

  return apiCall(
    `/tools/custom/${id}`,
    {
      method: "PUT",
      body: JSON.stringify(data),
    },
    updated
  );
}

/**
 * Delete custom tool
 *
 * TODO: Backend team - Replace with actual API call:
 * DELETE /api/tools/custom/:id
 * Headers: { Authorization: Bearer <token> }
 * Response: { success: boolean }
 *
 * @param {string} id - Tool ID
 * @returns {Promise<{success: boolean}>}
 */
export async function deleteCustomTool(id) {
  return apiCall(`/tools/custom/${id}`, { method: "DELETE" }, { success: true });
}
