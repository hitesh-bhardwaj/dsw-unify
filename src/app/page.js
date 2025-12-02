"use client";

import { useRef, useState } from "react";
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
import { SectionHeader } from "@/components/home/section-header";
import { MetricCard } from "@/components/home/metric-card";
import { FeatureCard } from "@/components/home/feature-card";

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

function MetricsBoard({ metricsData }) {
  const [view, setView] = useState("grid"); // "grid" | "list"
  const [items, setItems] = useState(metricsData);

  // ---------- Drag-to-scroll for GRID ----------
  const scrollRef = useRef(null);
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const handleMouseDown = (e) => {
    if (!scrollRef.current) return;
    isDown.current = true;
    scrollRef.current.classList.add("cursor-grabbing");
    startX.current = e.pageX - scrollRef.current.offsetLeft;
    scrollLeft.current = scrollRef.current.scrollLeft;
  };

  const handleMouseLeave = () => {
    if (!scrollRef.current) return;
    isDown.current = false;
    scrollRef.current.classList.remove("cursor-grabbing");
  };

  const handleMouseUp = () => {
    if (!scrollRef.current) return;
    isDown.current = false;
    scrollRef.current.classList.remove("cursor-grabbing");
  };

  const handleMouseMove = (e) => {
    if (!isDown.current || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX.current) * 1; // scroll speed
    scrollRef.current.scrollLeft = scrollLeft.current - walk;
  };

  // ---------- Drag & drop for LIST ----------
  const dragItemIndex = useRef(null);
  const dragOverItemIndex = useRef(null);

  const handleDragStart = (index) => {
    dragItemIndex.current = index;
  };

  const handleDragEnter = (index) => {
    dragOverItemIndex.current = index;
  };

  const handleDrop = () => {
    const from = dragItemIndex.current;
    const to = dragOverItemIndex.current;
    if (from === null || to === null || from === to) return;

    setItems((prev) => {
      const updated = [...prev];
      const [moved] = updated.splice(from, 1);
      updated.splice(to, 0, moved);
      return updated;
    });

    dragItemIndex.current = null;
    dragOverItemIndex.current = null;
  };

  return (
    <div className="space-y-4">
      {/* Toggle buttons */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Metrics</h2>
        <div className="inline-flex rounded-md border overflow-hidden">
          <button
            onClick={() => setView("grid")}
            className={
              "px-3 py-1 text-sm " +
              (view === "grid" ? "bg-gray-900 text-white" : "bg-white")
            }
          >
            Grid
          </button>
          <button
            onClick={() => setView("list")}
            className={
              "px-3 py-1 text-sm " +
              (view === "list" ? "bg-gray-900 text-white" : "bg-white")
            }
          >
            List
          </button>
        </div>
      </div>

      {/* GRID VIEW: drag to scroll horizontally, cards overflow */}
      {view === "grid" && (
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto cursor-grab select-none py-2"
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
        >
          {items.map((metric, index) => (
            <div
              key={index}
              className="min-w-[250px] sm:min-w-[280px] lg:min-w-[300px]"
            >
              <MetricCard {...metric} />
            </div>
          ))}
        </div>
      )}

      {/* LIST VIEW: vertical list, drag to reorder */}
      {view === "list" && (
        <ul className="space-y-2">
          {items.map((metric, index) => (
            <li
              key={index}
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragEnter={() => handleDragEnter(index)}
              onDragEnd={handleDrop}
              onDragOver={(e) => e.preventDefault()}
              className="border rounded-md bg-white shadow-sm p-2 cursor-move"
            >
              <MetricCard {...metric} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

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
              {/* <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {metricsData.map((metric, index) => (
                  <MetricCard key={index} {...metric} />
                ))}
              </div> */}
              <MetricsBoard metricsData={metricsData} />
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
