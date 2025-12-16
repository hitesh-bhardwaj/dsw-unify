"use client";

import { useMemo, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AgentCard } from "@/components/agent-card";
import Link from "next/link";
import { AgentStudioIcon, PlusIcon } from "@/components/Icons";
import SearchBar from "@/components/search-bar";
import { ScaleDown } from "@/components/animations/Animations";
import { cn } from "@/lib/utils";
import { RippleButton } from "@/components/ui/ripple-button";
import CardDetails from "@/components/CardDetails";
import { motion, AnimatePresence } from "framer-motion";
import CountUp from "@/components/animations/CountUp";
import { useSearchParams } from "next/navigation";

import FilterBar from "@/components/FeatureStore/feature-transformation/TransformationFilter";
import * as agentsApi from "@/lib/api/agents";

// Fallback mock data
const FALLBACK_AGENTS = [
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

const FALLBACK_STATS = [
  { title: "Total Agents", value: "42" },
  { title: "Active Agents", value: "41" },
  { title: "Total Requests", value: "100,800" },
];

export default function AgentsPage() {
  const [query, setQuery] = useState("");
  const [agentsState, setAgentsState] = useState(FALLBACK_AGENTS);
  const [stats, setStats] = useState(FALLBACK_STATS);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const searchParams = useSearchParams();

  // Fetch agents and stats from API
  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const [agentsData, statsData] = await Promise.all([
          agentsApi.getAgents(),
          agentsApi.getAgentStats(),
        ]);

        setAgentsState(agentsData);

        // Transform stats object to array format
        setStats([
          { title: "Total Agents", value: statsData.totalAgents },
          { title: "Active Agents", value: statsData.activeAgents },
          { title: "Total Requests", value: statsData.totalRequests },
        ]);
      } catch (err) {
        setError(err.message || "Failed to load agents");
        console.error("Error fetching agents:", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  // Handle agent deletion from URL parameter
  useEffect(() => {
    const deleteId = searchParams.get("deleteId");
    if (!deleteId) return;

    async function deleteAgent() {
      try {
        // Call API to delete the agent
        await agentsApi.deleteAgent(deleteId);

        // Refresh the agents list after successful deletion
        const [agentsData, statsData] = await Promise.all([
          agentsApi.getAgents(),
          agentsApi.getAgentStats(),
        ]);

        setAgentsState(agentsData);
        setStats([
          { title: "Total Agents", value: statsData.totalAgents },
          { title: "Active Agents", value: statsData.activeAgents },
          { title: "Total Requests", value: statsData.totalRequests },
        ]);

        // Remove deleteId from URL after successful deletion
        window.history.replaceState({}, "", "/agent-studio/agents");
      } catch (err) {
        setError(err.message || "Failed to delete agent");
        console.error("Error deleting agent:", err);
      }
    }

    deleteAgent();
  }, [searchParams]);

  // FILTER BAR STATE
  const [selectedTags, setSelectedTags] = useState([]);
  const [view, setView] = useState("grid");
  const [sortOrder, setSortOrder] = useState("none");

  // AVAILABLE TAGS
  const availableTags = useMemo(() => {
    const setTag = new Set();
    agentsState.forEach((a) =>
      a.tags?.forEach((t) => setTag.add(t.toLowerCase()))
    );
    return Array.from(setTag).sort();
  }, []);

  // SEARCH + TAG FILTER
  let filteredAgents = agentsState.filter((agent) => {
    const matchSearch = agent.name.toLowerCase().includes(query.toLowerCase());
    const matchTags =
      selectedTags.length === 0 ||
      selectedTags.some((t) => agent.tags.includes(t));
    return matchSearch && matchTags;
  });

  // SORTING
  if (sortOrder === "asc") {
    filteredAgents = [...filteredAgents].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
  } else if (sortOrder === "desc") {
    filteredAgents = [...filteredAgents].sort((a, b) =>
      b.name.localeCompare(a.name)
    );
  }

  return (
    <div className="flex flex-col h-full w-full overflow-hidden pb-5">
      <ScaleDown>
        <div className="space-y-6 p-6">
          {/* HEADER */}
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <h1 className="text-3xl font-medium text-foreground">Agents</h1>
              <p className="mt-1 text-sm dark:text-foreground text-black/60">
                Build, deploy, and manage your AI agents
              </p>
            </div>

            <Link href="/agent-studio/agents/create">
              <RippleButton>
                <Button className="bg-sidebar-primary hover:bg-[#E64A19] text-white gap-3 rounded-full !px-6 !py-6 duration-300 cursor-pointer">
                  <PlusIcon />
                  Create Agents
                </Button>
              </RippleButton>
            </Link>
          </div>

          {/* STATS */}
          <div className="w-full flex items-center justify-between gap-4">
            {stats.map((item, index) => (
              <div
                key={index}
                className="flex flex-col gap-6 border border-border-color-0 rounded-3xl py-6 px-4 w-full dark:bg-card"
              >
                <span className="text-sm text-foreground/80">{item.title}</span>
                <span className="text-4xl font-medium mt-1">
                  <CountUp value={item.value} startOnView />
                </span>
              </div>
            ))}
          </div>

          {/* SEARCH */}
          <SearchBar
            placeholder="Search Agents..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          {/* FILTER BAR */}
          <FilterBar
            selectedTags={selectedTags}
            onTagsChange={setSelectedTags}
            availableTags={availableTags}
            view={view}
            setView={setView}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
            cards={agentsState}
          />
        </div>

        {/* GRID / LIST WITH ANIMATION */}
        <div className="flex-1 px-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={view}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className={`items-stretch ${
                view === "grid"
                  ? "grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                  : "flex flex-col gap-5"
              }`}
            >
              {filteredAgents.map((agent, index) => (
                <AgentCard
                  key={agent.id}
                  agent={agent}
                  index={index}
                  view={view}
                />
              ))}
            </motion.div>
          </AnimatePresence>

          {/* NO RESULT */}
          {filteredAgents.length === 0 && (
            <div className="flex h-64 items-center justify-center text-border-color-3 border border-border-color-0 rounded-xl mt-6">
             
            </div>
          )}
        </div>
      </ScaleDown>
    </div>
  );
}
