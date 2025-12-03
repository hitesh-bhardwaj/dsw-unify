"use client";

import { useRef, useState } from "react";
import { AppLayout } from "@/components/app-layout";
import { ScaleDown } from "@/components/animations/Animations";
import { ChevronLeft, ChevronRight, LayoutGrid } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import SearchBar from "@/components/search-bar";
import {
  Wand2, Eye, Boxes, Briefcase, Cpu, Activity, Zap, Workflow,
} from "lucide-react";

import {
  AgentsIcon, PromptsIcon, LLMsIcon, KnowledgeBaseIcon, ToolsIcon,
  MemoriesIcon, GuardrailsIcon, TestingIcon, SynthWave,
  DataExplorerIcon, DataVisualizationIcon, DataValidationIcon,
} from "@/components/Icons";

import { SectionHeader } from "@/components/home/section-header";
import { MetricCard } from "@/components/home/metric-card";
import { FeatureCard } from "@/components/home/feature-card";

/* ---------------- DATA (unchanged) ---------------- */

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
    description: "Access Jupyter IDE for model development and experimentation",
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

const slide = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

const workflowBuilderFeatures = [
  {
    icon: Workflow,
    title: "Build Workflow",
    description:
      "Create agentic AI workflows that integrate agents, models, and business-specific use cases",
    href: "/workflow-builder",
  },
];


/* ---------------- MetricsBoard FIXED ---------------- */

function MetricsBoard({ metricsData, view, setView }) {
  const [items, setItems] = useState(metricsData);
  const scrollRef = useRef(null);

  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);

  // Scroll handling
  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setShowLeft(el.scrollLeft > 0);
    setShowRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  };

  const handleScroll = (dir) => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = dir === "left" ? -300 : 300;
    el.scrollTo({ left: el.scrollLeft + amount, behavior: "smooth" });
    setTimeout(checkScroll, 300);
  };

  // Drag handling for list
  const dragIndex = useRef(null);
  const dragOver = useRef(null);

  const handleDrop = () => {
    if (dragIndex.current === null || dragOver.current === null) return;
    if (dragIndex.current === dragOver.current) return;

    setItems((prev) => {
      const updated = [...prev];
      const [moved] = updated.splice(dragIndex.current, 1);
      updated.splice(dragOver.current, 0, moved);
      return updated;
    });

    dragIndex.current = dragOver.current = null;
  };

  return (
    <motion.div layout className="space-y-4 overflow-hidden">
      {/* Header */}
      <div className="flex items-end justify-between px-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-medium">Overview</h1>
          <p className="text-sm text-black/60">Key platform metrics and activity</p>
        </div>

        <div className="inline-flex border rounded-md overflow-hidden">
          <button onClick={() => setView("grid")} className="px-3 py-1">
            <LayoutGrid className={`${view === "grid" ? "text-black" : "text-gray-400"}`} />
          </button>
          <button onClick={() => setView("list")} className="px-3 py-1">
            <LayoutGrid className={`${view === "list" ? "text-black" : "text-gray-400"}`} />
          </button>
        </div>
      </div>

      {/* Metrics Wrapper */}
      <AnimatePresence mode="popLayout">
        {view === "grid" && (
          <motion.div
            key="grid"
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            {showLeft && (
              <button
                onClick={() => handleScroll("left")}
                className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black text-white flex items-center justify-center"
              >
                <ChevronLeft />
              </button>
            )}
            {showRight && (
              <button
                onClick={() => handleScroll("right")}
                className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black text-white flex items-center justify-center"
              >
                <ChevronRight />
              </button>
            )}

            <div
              ref={scrollRef}
              onScroll={checkScroll}
              className="flex gap-4 overflow-x-auto px-6 py-2 scrollbar-hide"
            >
              {items.map((m, i) => (
                <motion.div
                  key={m.label}          // key must be consistent for FLIP
                  layoutId={`metric-${m.label}`} // FLIP-like unique id
                  layout
                  className="min-w-[250px]"
                  transition={{ type: "spring", stiffness: 100, damping: 20 }}
                >
                  <MetricCard {...m} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {view === "list" && (
          <motion.ul
            key="list"
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-4 gap-4 px-6"
          >
            {items.map((m, i) => (
              <motion.li
                key={m.label}            
                layoutId={`metric-${m.label}`}
                layout
                draggable
                onDragStart={() => (dragIndex.current = i)}
                onDragEnter={() => (dragOver.current = i)}
                onDragEnd={handleDrop}
                onDragOver={(e) => e.preventDefault()}
                className="cursor-move"
                transition={{ type: "spring", stiffness: 100, damping: 25 }}
              >
                <MetricCard {...m} />
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.div>
  );
}


/* ---------------- Home Component (partial) ---------------- */

export default function Home() {
  const [query, setQuery] = useState("");
  const [view, setView] = useState("grid");

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

  /* ... same filters for other categories ... */

  return (
    <AppLayout title="Home">
      <div className="flex flex-col h-full w-full overflow-hidden">
        <ScaleDown>
          <motion.div layout className="flex flex-col h-full w-full">
            {/* Search Bar */}
            <motion.div layout className="px-6 pt-6">
              <SearchBar
                placeholder="Search features..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </motion.div>

            {/* Metrics Board */}
            <motion.div layout className="px-0 mt-6">
              <MetricsBoard metricsData={metricsData} view={view} setView={setView} />
            </motion.div>

            {/* BELOW CONTENT */}
            <motion.div layout className="below-sections flex-1 overflow-auto p-6 pt-0 space-y-12 mt-6">
            {/* Data Engineering Section */}
            {filteredDataEngineering.length > 0 && (
              <motion.div layout className="space-y-6">
                <SectionHeader
                  title="Data Engineering"
                  description="Data ingestion, validation, exploration, and feature engineering tools"
                />
                <motion.div layout className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredDataEngineering.map((feature, index) => (
                    <FeatureCard key={index} {...feature} />
                  ))}
                </motion.div>
              </motion.div>
            )}

            {/* Feature Store Section */}
            {filteredFeatureStore.length > 0 && (
              <motion.div layout className="space-y-6">
                <SectionHeader
                  title="Feature Store"
                  description="End-to-end ML workflow from feature selection to model deployment"
                />
                <motion.div layout className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredFeatureStore.map((feature, index) => (
                    <FeatureCard key={index} {...feature} />
                  ))}
                </motion.div>
              </motion.div>
            )}

            {/* AI Studio Section */}
            {filteredAIStudio.length > 0 && (
              <motion.div layout className="space-y-6">
                <SectionHeader
                  title="AI Studio"
                  description="End-to-end ML workflow from feature selection to model deployment"
                />
                <motion.div layout className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredAIStudio.map((feature, index) => (
                    <FeatureCard key={index} {...feature} />
                  ))}
                </motion.div>
              </motion.div>
            )}

            {/* Agent Studio Section */}
            {filteredAgentStudio.length > 0 && (
              <motion.div layout className="space-y-6">
                <SectionHeader
                  title="Agent Studio"
                  description="Build and manage AI agents with comprehensive tooling"
                />
                <motion.div layout className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredAgentStudio.map((feature, index) => (
                    <FeatureCard key={index} {...feature} />
                  ))}
                </motion.div>
              </motion.div>
            )}

            {/* Workflow Builder Section */}
            {filteredWorkflowBuilder.length > 0 && (
              <motion.div layout className="space-y-6 pb-6">
                <SectionHeader
                  title="Workflow Builder"
                  description="Design and orchestrate agentic AI workflows for complex business processes"
                />
                <motion.div layout className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredWorkflowBuilder.map((feature, index) => (
                    <FeatureCard key={index} {...feature} />
                  ))}
                </motion.div>
              </motion.div>
            )}

            {/* No Results Message */}
            {query &&
              filteredDataEngineering.length === 0 &&
              filteredFeatureStore.length === 0 &&
              filteredAIStudio.length === 0 &&
              filteredAgentStudio.length === 0 &&
              filteredWorkflowBuilder.length === 0 && (
                <motion.div layout className="text-center py-12">
                  <p className="text-muted-foreground text-lg">
                    No features found matching &quot;{query}&quot;
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Try searching for agents, models, data, or workflow
                  </p>
                </motion.div>
              )}
          </motion.div>
        </motion.div>
      </ScaleDown>
    </div>
  </AppLayout>
  );
}
