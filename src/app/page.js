"use client";

import { useState } from "react";
import { AppLayout } from "@/components/app-layout";
// import { MetricCard } from "@/components/Home/metric-card";
// import { FeatureCard } from "@/components/Home/feature-card";
// import { SectionHeader } from "@/components/Home/section-header";
import { ScaleDown, FadeUp } from "@/components/animations/Animations";
import SearchBar from "@/components/search-bar";
import {
  Wand2,
  Eye,
  Boxes,
  Briefcase,
  Cpu,
  Activity,
  Zap,
  Workflow,
} from "lucide-react";
import {
  AgentsIcon,
  PromptsIcon,
  LLMsIcon,
  KnowledgeBaseIcon,
  ToolsIcon,
  MemoriesIcon,
  GuardrailsIcon,
  TestingIcon,
  SynthWave,
  DataExplorerIcon,
  DataVisualizationIcon,
  DataValidationIcon,
} from "@/components/Icons";
import { SectionHeader } from "@/components/Home/section-header";
import { MetricCard } from "@/components/Home/metric-card";
import { FeatureCard } from "@/components/Home/feature-card";

// Mock data for metrics
const metricsData = [
  {
    label: "Active Models",
    value: "24",
    change: 12,
    trend: [18, 20, 19, 21, 22, 21, 23, 24],
  },
  {
    label: "Use Cases",
    value: "12",
    change: 5,
    trend: [10, 10, 11, 11, 10, 11, 12, 12],
  },
  {
    label: "Predictions Today",
    value: "8.2K",
    change: 241,
    trend: [2.4, 2.8, 3.2, 4.1, 5.2, 6.5, 7.3, 8.2],
  },
  {
    label: "Model Accuracy",
    value: "94.2%",
    change: 4.1,
    trend: [88, 89, 90, 91, 92, 92.5, 93, 94.2],
  },
];

// Feature sections data
const dataEngineeringFeatures = [
  {
    icon: SynthWave,
    title: "Data Ingestion",
    description:
      "Import and process data from multiple sources with automated validation and transformation pipelines",
    href: "/data-engineering/ingestion",
  },
  {
    icon: DataExplorerIcon,
    title: "Data Explorer",
    description:
      "Interactive data exploration and querying tools for understanding your datasets",
    href: "/data-engineering/explorer",
  },
  {
    icon: DataVisualizationIcon,
    title: "Data Visualization",
    description:
      "Create charts, graphs, and dashboards for visual data analysis and insights",
    href: "/data-engineering/visualization",
  },
  {
    icon: DataValidationIcon,
    title: "Data Validation",
    description:
      "Automated data quality checks, schema validation, and anomaly detection",
    href: "/data-engineering/validation",
  },
];

const featureStoreFeatures = [
  {
    icon: Wand2,
    title: "Feature Transformations",
    description:
      "Build reusable transformation library for feature engineering workflows",
    href: "/feature-store/transformations",
  },
  {
    icon: Eye,
    title: "Feature Views",
    description:
      "Create and manage feature views from tables with transformations and logical grouping",
    href: "/feature-store/views",
  },
  {
    icon: Boxes,
    title: "Feature Services",
    description:
      "Combine feature views into services for model consumption and deployment",
    href: "/feature-store/services",
  },
];

const aiStudioFeatures = [
  {
    icon: Briefcase,
    title: "Use Cases",
    description:
      "Browse and manage ML use cases with their associated models and workflows",
    href: "/usecases",
  },
  {
    icon: Cpu,
    title: "Model Development",
    description:
      "Access Jupyter IDE for model development and experimentation",
    href: "/ai-studio/development",
  },
  {
    icon: Activity,
    title: "Monitoring",
    description:
      "Real-time monitoring, drift detection, and performance tracking for deployed models",
    href: "/ai-studio/monitoring",
  },
  {
    icon: Zap,
    title: "Inference",
    description:
      "Run model inference directly from the GUI with batch and real-time options",
    href: "/ai-studio/inference",
  },
];

const agentStudioFeatures = [
  {
    icon: AgentsIcon,
    title: "Agents",
    description: "Build, deploy, and manage your AI agents",
    href: "/agents",
  },
  {
    icon: PromptsIcon,
    title: "Prompts",
    description: "Manage and test your prompt templates and configurations",
    href: "/prompts",
  },
  {
    icon: LLMsIcon,
    title: "LLMs",
    description: "Configure and manage large language models for your agents",
    href: "/llms",
  },
  {
    icon: KnowledgeBaseIcon,
    title: "Knowledge Bases",
    description: "Create and manage knowledge bases for agent context",
    href: "/knowledge-bases",
  },
  {
    icon: ToolsIcon,
    title: "Tools",
    description: "Define and manage tools that agents can use",
    href: "/tools",
  },
  {
    icon: MemoriesIcon,
    title: "Memories",
    description: "Configure agent memory and context retention",
    href: "/memories",
  },
  {
    icon: GuardrailsIcon,
    title: "Guardrails",
    description: "Set up safety and compliance guardrails for agents",
    href: "/guardrails",
  },
  {
    icon: TestingIcon,
    title: "Testing",
    description: "Test and validate agent behavior and responses",
    href: "/testing",
  },
];

const workflowBuilderFeatures = [
  {
    icon: Workflow,
    title: "Build Workflow",
    description:
      "Create agentic AI workflows that integrate agents, models, and business-specific use cases",
    href: "/workflow-builder",
  },
];

export default function Home() {
  const [query, setQuery] = useState("");

  // Combine all features for search filtering
  const allFeatures = [
    ...dataEngineeringFeatures,
    ...featureStoreFeatures,
    ...aiStudioFeatures,
    ...agentStudioFeatures,
    ...workflowBuilderFeatures,
  ];

  // Filter features based on search query
  const filteredDataEngineering = dataEngineeringFeatures.filter(
    (f) =>
      f.title.toLowerCase().includes(query.toLowerCase()) ||
      f.description.toLowerCase().includes(query.toLowerCase())
  );
  const filteredFeatureStore = featureStoreFeatures.filter(
    (f) =>
      f.title.toLowerCase().includes(query.toLowerCase()) ||
      f.description.toLowerCase().includes(query.toLowerCase())
  );
  const filteredAIStudio = aiStudioFeatures.filter(
    (f) =>
      f.title.toLowerCase().includes(query.toLowerCase()) ||
      f.description.toLowerCase().includes(query.toLowerCase())
  );
  const filteredAgentStudio = agentStudioFeatures.filter(
    (f) =>
      f.title.toLowerCase().includes(query.toLowerCase()) ||
      f.description.toLowerCase().includes(query.toLowerCase())
  );
  const filteredWorkflowBuilder = workflowBuilderFeatures.filter(
    (f) =>
      f.title.toLowerCase().includes(query.toLowerCase()) ||
      f.description.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <AppLayout title="Home">
      <div className="flex flex-col h-full w-full overflow-hidden">
        <ScaleDown>
          {/* Header Section */}
          <div className="space-y-6 p-6">
             {/* Search Bar */}
              <SearchBar
                placeholder="Search features..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            
              <div className="space-y-2">
                <h1 className="text-3xl font-medium text-foreground">
                  Overview
                </h1>
                <p className="text-sm dark:text-foreground text-black/60">
                  Key platform metrics and activity at a glance
                </p>
              </div>

           

            {/* Metrics Grid */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {metricsData.map((metric, index) => (
                  <MetricCard key={index} {...metric} />
                ))}
              </div>
          </div>

          {/* Main Content - Scrollable */}
          <div className="flex-1 overflow-auto p-6 pt-0 space-y-12 mt-6">
            {/* Data Engineering Section */}
            {filteredDataEngineering.length > 0 && (
                <div className="space-y-6">
                  <SectionHeader
                    title="Data Engineering"
                    description="Data ingestion, validation, exploration, and feature engineering tools"
                  />
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredDataEngineering.map((feature, index) => (
                      <FeatureCard key={index} {...feature} />
                    ))}
                  </div>
                </div>
            )}

            {/* Feature Store Section */}
            {filteredFeatureStore.length > 0 && (
                <div className="space-y-6">
                  <SectionHeader
                    title="Feature Store"
                    description="End-to-end ML workflow from feature selection to model deployment"
                  />
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredFeatureStore.map((feature, index) => (
                      <FeatureCard key={index} {...feature} />
                    ))}
                  </div>
                </div>
            )}

            {/* AI Studio Section */}
            {filteredAIStudio.length > 0 && (
                <div className="space-y-6">
                  <SectionHeader
                    title="AI Studio"
                    description="End-to-end ML workflow from feature selection to model deployment"
                  />
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredAIStudio.map((feature, index) => (
                      <FeatureCard key={index} {...feature} />
                    ))}
                  </div>
                </div>
            )}

            {/* Agent Studio Section */}
            {filteredAgentStudio.length > 0 && (
                <div className="space-y-6">
                  <SectionHeader
                    title="Agent Studio"
                    description="Build and manage AI agents with comprehensive tooling"
                  />
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredAgentStudio.map((feature, index) => (
                      <FeatureCard key={index} {...feature} />
                    ))}
                  </div>
                </div>
            )}

            {/* Workflow Builder Section */}
            {filteredWorkflowBuilder.length > 0 && (
                <div className="space-y-6 pb-6">
                  <SectionHeader
                    title="Workflow Builder"
                    description="Design and orchestrate agentic AI workflows for complex business processes"
                  />
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredWorkflowBuilder.map((feature, index) => (
                      <FeatureCard key={index} {...feature} />
                    ))}
                  </div>
                </div>
            )}

            {/* No Results Message */}
            {query &&
              filteredDataEngineering.length === 0 &&
              filteredFeatureStore.length === 0 &&
              filteredAIStudio.length === 0 &&
              filteredAgentStudio.length === 0 &&
              filteredWorkflowBuilder.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground text-lg">
                    No features found matching &quot;{query}&quot;
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Try searching for agents, models, data, or workflow
                  </p>
                </div>
              )}
          </div>
        </ScaleDown>
      </div>
    </AppLayout>
  );
}
