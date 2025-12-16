"use client";

import { useState, useEffect } from "react";
import { AppLayout } from "@/components/app-layout";
import { ScaleDown } from "@/components/animations/Animations";
import { motion } from "framer-motion";
import * as dashboardApi from "@/lib/api/dashboard";
import {
  MetricsBoard,
  FeatureSectionsContainer
} from "@/components/dashboard";

import { Workflow } from "lucide-react";
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


const metricsData = [
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

// Feature sections data
const dataEngineeringFeatures = [
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
];

const featureStoreFeatures = [
  {
    icon: FeatureTransformationIcon,
    title: "Feature Transformations",
    description:
      "Build reusable transformation library for feature engineering workflows",
    href: "/feature-store/feature-transformations",
  },
  {
    icon: FeatureViewsIcon,
    title: "Feature Views",
    description:
      "Create and manage feature views from tables with transformations and logical grouping",
    href: "/feature-store/feature-views",
  },
  {
    icon: FeatureServicesIcon,
    title: "Feature Services",
    description:
      "Combine feature views into services for model consumption and deployment",
    href: "/feature-store/feature-views",
  },
];

const aiStudioFeatures = [
  {
    icon: UseCasesIcon,
    title: "Use Cases",
    description:
      "Browse and manage ML use cases with their associated models and workflows",
    href: "/ai-studio/use-cases",
  },
  {
    icon: DataValidationIcon,
    title: "Model Development",
    description: "Access Jupyter IDE for model development and experimentation",
    href: "#",
  },
  {
    icon: MonitoringIcon,
    title: "Monitoring",
    description:
      "Real-time monitoring, drift detection, and performance tracking for deployed models",
    href: "/ai-studio/monitoring",
  },
  {
    icon: InferenceIcon,
    title: "Inference",
    description:
      "Run model inference directly from the GUI with batch and real-time options",
    href: "/ai-studio/inference",
  },
];

const agentStudioFeatures = [
  {
    icon: AgentStudioIcon,
    title: "Agents",
    description: "Build, deploy, and manage your AI agents",
    href: "/agent-studio/agents",
  },
  {
    icon: PromptsIcon,
    title: "Prompts",
    description: "Manage and test your prompt templates and configurations",
    href: "/agent-studio/prompts",
  },
  {
    icon: LLMsIcon,
    title: "LLMs",
    description: "Configure and manage large language models for your agents",
    href: "/agent-studio/llms",
  },
  {
    icon: KnowledgeBaseIcon,
    title: "Knowledge Bases",
    description: "Create and manage knowledge bases for agent context",
    href: "/agent-studio/knowledge-bases",
  },
  {
    icon: ToolsIcon,
    title: "Tools",
    description: "Define and manage tools that agents can use",
    href: "/agent-studio/tools",
  },
  {
    icon: MemoriesIcon,
    title: "Memories",
    description: "Configure agent memory and context retention",
    href: "/agent-studio/memories",
  },
  {
    icon: GuardrailsIcon,
    title: "Guardrails",
    description: "Set up safety and compliance guardrails for agents",
    href: "/agent-studio/guardrails",
  },
  {
    icon: TestingIcon,
    title: "Testing",
    description: "Test and validate agent behavior and responses",
    href: "/agent-studio/testing",
  },
];

const workflowBuilderFeatures = [
  {
    icon: Workflow,
    title: "Build Workflow",
    description:
      "Create agentic AI workflows that integrate agents, models, and business-specific use cases",
    href: "#",
  },
];

/**
 * Home page component displaying the main dashboard.
 *
 * @returns {React.JSX.Element} The rendered Home component.
 */
export default function Home() {
  const [view, setView] = useState("list");

  // API state
  const [metrics, setMetrics] = useState(metricsData);
  const [features, setFeatures] = useState({
    dataEngineering: dataEngineeringFeatures,
    featureStore: featureStoreFeatures,
    aiStudio: aiStudioFeatures,
    agentStudio: agentStudioFeatures,
    workflowBuilder: workflowBuilderFeatures,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch dashboard data
  useEffect(() => {
    async function fetchDashboardData() {
      try {
        setIsLoading(true);
        setError(null);

        // Fetch metrics and features in parallel
        const [metricsData, featuresData] = await Promise.all([
          dashboardApi.getMetrics(),
          dashboardApi.getFeatures(),
        ]);

        setMetrics(metricsData);
        setFeatures(featuresData);
      } catch (err) {
        setError(err.message || "Failed to load dashboard data");
        console.error("Dashboard error:", err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchDashboardData();
  }, []);


  // Show error if data fetch failed
  if (error) {
    return (
      <AppLayout title="Home">
        <div className="flex flex-col h-full w-full items-center justify-center p-6">
          <div className="p-4 max-w-md text-center text-destructive bg-destructive/10 border border-destructive/20 rounded-md">
            <p className="font-medium">Failed to load dashboard</p>
            <p className="text-sm mt-2">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
            >
              Retry
            </button>
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout title="Home">
      <div className="flex flex-col h-full w-full overflow-hidden">
        <ScaleDown>
          <motion.div layout className="flex flex-col h-full w-full">
            {/* Metrics Board */}
            <motion.div layout className="px-0 mt-6">
              <MetricsBoard metricsData={metrics} view={view} setView={setView} isLoading={isLoading} />
            </motion.div>

            {/* Feature Sections Container */}
            <FeatureSectionsContainer features={features} />
          </motion.div>
        </ScaleDown>
      </div>
    </AppLayout>
  );
}
