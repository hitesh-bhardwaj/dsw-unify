/**
 * Dashboard API Service
 *
 * This module contains mock dashboard functions.
 * TODO: Backend team - Replace mock responses with actual API calls
 *
 * @module api/dashboard
 */

import { apiCall } from "./client";
import {
  PromptsIcon,
  LLMsIcon,
  KnowledgeBaseIcon,
  ToolsIcon,
  MemoriesIcon,
  GuardrailsIcon,
  TestingIcon,
  DataExplorerIcon,
  DataVisualizationIcon,
  DataValidationIcon,
  DataIngestionIcon2,
  FeatureTransformationIcon,
  FeatureViewsIcon,
  FeatureServicesIcon,
  UseCasesIcon,
  MonitoringIcon,
  InferenceIcon,
  AgentStudioIcon,
} from "@/components/Icons";
import { Workflow } from "lucide-react";

/**
 * @typedef {import("@/types/dashboard").Metric} Metric
 * @typedef {import("@/types/dashboard").FeatureItem} FeatureItem
 * @typedef {import("@/types/dashboard").DashboardFeatures} DashboardFeatures
 * @typedef {import("@/types/dashboard").CardVisibility} CardVisibility
 */

/**
 * Mock metrics data
 */
const MOCK_METRICS = [
  {
    label: "Active Models",
    value: "24",
    change: 12,
    trend: [18, 19, 19, 20, 21, 22, 23, 24],
  },
  {
    label: "Use Cases",
    value: "12",
    change: 3,
    trend: [8, 9, 9, 10, 10, 11, 11, 12],
  },
  {
    label: "Predictions Today",
    value: "8.2K",
    change: 24,
    trend: [2.1, 3.2, 4.4, 5.1, 6.0, 6.8, 7.4, 8.2],
  },
  {
    label: "Model Accuracy",
    value: "94.2%",
    change: 2.1,
    trend: [88, 89, 90, 91, 92, 92.8, 93.5, 94.2],
  },
  {
    label: "Feature Views",
    value: "07",
    change: 2,
    trend: [4, 5, 5, 6, 6, 6, 7, 7],
  },
  {
    label: "Feature Services",
    value: "05",
    change: 1,
    trend: [3, 3, 4, 4, 4, 4, 5, 5],
  },
  {
    label: "Total Features",
    value: "156",
    change: 18,
    trend: [120, 128, 132, 140, 146, 150, 152, 156],
  },
  {
    label: "Transformations",
    value: "23",
    change: 5,
    trend: [15, 16, 17, 18, 19, 20, 21, 23],
  },
  {
    label: "Data Sources",
    value: "08",
    change: 1,
    trend: [5, 6, 6, 7, 7, 7, 8, 8],
  },
  {
    label: "Total Tables",
    value: "42",
    change: 6,
    trend: [30, 32, 34, 36, 37, 39, 40, 42],
  },
  {
    label: "Data Quality Score",
    value: "98%",
    change: 1,
    trend: [94, 95, 95.5, 96, 96.5, 97, 97.5, 98],
  },
  {
    label: "Records Processed",
    value: "2.4M",
    change: 340,
    trend: [1.6, 1.7, 1.8, 1.9, 2.0, 2.1, 2.25, 2.4],
  },
  {
    label: "Active Agents",
    value: "06",
    change: 2,
    trend: [3, 4, 4, 4, 5, 5, 6, 6],
  },
  {
    label: "Agent Interactions",
    value: "1.2K",
    change: 18,
    trend: [0.5, 0.6, 0.7, 0.8, 0.9, 1.0, 1.1, 1.2],
  },
  {
    label: "Knowledge Bases",
    value: "04",
    change: 1,
    trend: [2, 2, 3, 3, 3, 3, 4, 4],
  },
  {
    label: "Active Workflows",
    value: "09",
    change: 3,
    trend: [5, 6, 6, 7, 7, 8, 8, 9],
  },
];

/**
 * Mock features data
 */
const MOCK_FEATURES = {
  dataEngineering: [
    {
      icon: DataIngestionIcon2,
      title: "Data Ingestion",
      description:
        "Import and process data from multiple sources with automated validation and transformation pipelines",
      href: "/data-engineering/data-ingestion",
    },
    {
      icon: DataExplorerIcon,
      title: "Data Explorer",
      description:
        "Interactive data exploration and querying tools for understanding your datasets",
      href: "/data-engineering/data-explorer",
    },
    {
      icon: DataVisualizationIcon,
      title: "Data Visualization",
      description:
        "Create charts, graphs, and dashboards for visual data analysis and insights",
      href: "#",
    },
    {
      icon: DataValidationIcon,
      title: "Data Validation",
      description:
        "Automated data quality checks, schema validation, and anomaly detection",
      href: "#",
    },
  ],
  featureStore: [
    {
      icon: FeatureTransformationIcon,
      title: "Feature Transformations",
      description:
        "Define and manage feature engineering pipelines with reusable transformation logic",
      href: "/feature-store/feature-transformations",
    },
    {
      icon: FeatureViewsIcon,
      title: "Feature Views",
      description:
        "Create logical views of features from multiple sources for model training and serving",
      href: "/feature-store/feature-views",
    },
    {
      icon: FeatureServicesIcon,
      title: "Feature Services",
      description:
        "Deploy and serve feature sets for real-time model predictions and batch scoring",
      href: "/feature-store/feature-services",
    },
  ],
  aiStudio: [
    {
      icon: UseCasesIcon,
      title: "Use Cases",
      description:
        "Browse and manage AI/ML use cases with pre-built templates and workflows",
      href: "/ai-studio/use-cases",
    },
    {
      icon: UseCasesIcon,
      title: "Model Development",
      description:
        "Build, train, and experiment with machine learning models using your data",
      href: "#",
    },
    {
      icon: MonitoringIcon,
      title: "Monitoring",
      description:
        "Track model performance, data drift, and system metrics in production",
      href: "/ai-studio/monitoring",
    },
    {
      icon: InferenceIcon,
      title: "Inference",
      description:
        "Deploy models for real-time predictions and batch inference workflows",
      href: "/ai-studio/inference",
    },
  ],
  agentStudio: [
    {
      icon: AgentStudioIcon,
      title: "Agents",
      description:
        "Create and manage autonomous AI agents with custom behaviors and goals",
      href: "/agent-studio/agents",
    },
    {
      icon: PromptsIcon,
      title: "Prompts",
      description:
        "Design and version control prompts for consistent agent interactions",
      href: "/agent-studio/prompts",
    },
    {
      icon: LLMsIcon,
      title: "LLMs",
      description:
        "Configure and fine-tune large language models for your agents",
      href: "/agent-studio/llms",
    },
    {
      icon: KnowledgeBaseIcon,
      title: "Knowledge Bases",
      description:
        "Build vector databases and knowledge repositories for agent context",
      href: "/agent-studio/knowledge-bases",
    },
    {
      icon: ToolsIcon,
      title: "Tools",
      description:
        "Equip agents with APIs, functions, and integrations for task execution",
      href: "/agent-studio/tools",
    },
    {
      icon: MemoriesIcon,
      title: "Memories",
      description:
        "Manage agent memory systems for contextual awareness and learning",
      href: "/agent-studio/memories",
    },
    {
      icon: GuardrailsIcon,
      title: "Guardrails",
      description:
        "Set safety constraints and validation rules for agent outputs",
      href: "/agent-studio/guardrails",
    },
    {
      icon: TestingIcon,
      title: "Testing",
      description:
        "Test and evaluate agent performance with automated test suites",
      href: "/agent-studio/testing",
    },
  ],
  workflowBuilder: [
    {
      icon: Workflow,
      title: "Build Workflow",
      description:
        "Design complex workflows combining agents, models, and data pipelines",
      href: "#",
    },
  ],
};

/**
 * Get dashboard metrics
 *
 * TODO: Backend team - Replace with actual API call:
 * GET /api/dashboard/metrics
 * Response: { metrics: Metric[] }
 *
 * @returns {Promise<Metric[]>}
 */
export async function getMetrics() {
  return apiCall("/dashboard/metrics", { method: "GET" }, MOCK_METRICS);
}

/**
 * Get dashboard features
 *
 * TODO: Backend team - Replace with actual API call:
 * GET /api/dashboard/features
 * Response: { dataEngineering, featureStore, aiStudio, agentStudio, workflowBuilder }
 *
 * @returns {Promise<DashboardFeatures>}
 */
export async function getFeatures() {
  return apiCall("/dashboard/features", { method: "GET" }, MOCK_FEATURES);
}

/**
 * Get card visibility preferences
 *
 * TODO: Backend team - Replace with actual API call:
 * GET /api/user/card-preferences
 * Headers: { Authorization: Bearer <token> }
 * Response: { visibility: { [cardLabel]: boolean } }
 *
 * @returns {Promise<CardVisibility>}
 */
export async function getCardVisibility() {
  // Default: all cards visible
  const mockVisibility = {};
  MOCK_METRICS.forEach((metric) => {
    mockVisibility[metric.label] = true;
  });

  return apiCall("/user/card-preferences", { method: "GET" }, mockVisibility);
}

/**
 * Update card visibility preferences
 *
 * TODO: Backend team - Replace with actual API call:
 * PUT /api/user/card-preferences
 * Headers: { Authorization: Bearer <token> }
 * Body: { visibility: { [cardLabel]: boolean } }
 * Response: { success: boolean }
 *
 * @param {CardVisibility} visibility - Card visibility preferences
 * @returns {Promise<{success: boolean}>}
 */
export async function updateCardVisibility(visibility) {
  return apiCall(
    "/user/card-preferences",
    {
      method: "PUT",
      body: JSON.stringify({ visibility }),
    },
    { success: true }
  );
}
