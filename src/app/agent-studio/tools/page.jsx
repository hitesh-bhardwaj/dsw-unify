"use client";

import { useMemo, useState, useEffect, Suspense } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PlusIcon, ToolsIcon } from "@/components/Icons";
import { ToolsCard } from "@/components/tools-card";
import SearchBar from "@/components/search-bar";
import { RippleButton } from "@/components/ui/ripple-button";
import { ScaleDown } from "@/components/animations/Animations";
import AddToolModal from "@/components/agent-studio/CreateToolsModal";
import { motion, AnimatePresence } from "framer-motion";
import CountUp from "@/components/animations/CountUp";
import { useSearchParams } from "next/navigation";

import FilterBar from "@/components/FeatureStore/feature-transformation/TransformationFilter";
import * as toolsApi from "@/lib/api/tools";

const FALLBACK_TOOLS = [
  {
    id: "web-search",
    name: "Web Search",
    description: "Search the web for current information",
    icon: <ToolsIcon />,
    status: "active",
    tags: ["api", "search"],
    variant: "light",
  },
  {
    id: "calculator",
    name: "Calculator",
    description: "Perform mathematical calculations",
    icon: <ToolsIcon />,
    status: "active",
    tags: ["function", "utility"],
    variant: "light",
  },
  {
    id: "code-executor",
    name: "Code Executor",
    description: "Execute Python code safely",
    icon: <ToolsIcon />,
    status: "beta",
    tags: ["sandbox", "development"],
    variant: "light",
  },
];

const FALLBACK_STATS = [
  { title: "Total Tools", value: "03" },
  { title: "Active Tools", value: "02" },
  { title: "Categories", value: "03" },
];

function ToolsContent() {
  const [query, setQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const searchParams = useSearchParams();

  const [toolsState, setToolsState] = useState(FALLBACK_TOOLS);
  const [stats, setStats] = useState(FALLBACK_STATS);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch tools and stats from API
  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const [toolsData, statsData] = await Promise.all([
          toolsApi.getTools(),
          toolsApi.getToolStats(),
        ]);

        setToolsState(toolsData);

        // Transform stats object to array format
        setStats([
          { title: "Total Tools", value: statsData.totalTools },
          { title: "Active Tools", value: statsData.activeTools },
          { title: "Categories", value: statsData.categories },
        ]);
      } catch (err) {
        setError(err.message || "Failed to load tools");
        console.error("Error fetching tools:", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  // FILTER BAR STATE
  const [selectedTags, setSelectedTags] = useState([]);
  const [view, setView] = useState("grid");
  const [sortOrder, setSortOrder] = useState("none");

  // Handle tool deletion from URL parameter
  useEffect(() => {
    const deleteId = searchParams.get("deleteId");
    if (!deleteId) return;

    async function deleteTool() {
      try {
        // Call API to delete the tool
        await toolsApi.deleteTool(deleteId);

        // Refresh the tools list after successful deletion
        const [toolsData, statsData] = await Promise.all([
          toolsApi.getTools(),
          toolsApi.getToolStats(),
        ]);

        setToolsState(toolsData);
        setStats([
          { title: "Total Tools", value: statsData.totalTools },
          { title: "Active Tools", value: statsData.activeTools },
          { title: "Categories", value: statsData.categories },
        ]);

        // Remove deleteId from URL after successful deletion
        window.history.replaceState({}, "", "/agent-studio/tools");
      } catch (err) {
        setError(err.message || "Failed to delete tool");
        console.error("Error deleting tool:", err);
      }
    }

    deleteTool();
  }, [searchParams]);

  // AVAILABLE TAGS
  const availableTags = useMemo(() => {
    const setTag = new Set();
    toolsState.forEach((t) =>
      t.tags?.forEach((tag) => setTag.add(tag.toLowerCase()))
    );
    return Array.from(setTag).sort();
  }, [toolsState]);

  // SEARCH + TAG FILTER
  let filteredTools = toolsState.filter((tool) => {
    const matchSearch =
      tool.name.toLowerCase().includes(query.toLowerCase()) ||
      tool.description.toLowerCase().includes(query.toLowerCase());

    const matchTags =
      selectedTags.length === 0 ||
      selectedTags.some((t) => tool.tags.includes(t));

    return matchSearch && matchTags;
  });
  
  // SORTING
  if (sortOrder === "asc") {
    filteredTools = [...filteredTools].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
  } else if (sortOrder === "desc") {
    filteredTools = [...filteredTools].sort((a, b) =>
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
              <h1 className="text-3xl font-medium text-foreground">Tools</h1>
              <p className="mt-1 text-sm text-gray-600 dark:text-foreground">
                Manage agent tools and capabilities
              </p>
            </div>

            <RippleButton>
              <Link href="#">
                <Button
                  onClick={() => setIsModalOpen(true)}
                  className="bg-sidebar-primary hover:bg-[#E64A19] text-white gap-3 rounded-full !px-6 !py-6 duration-300 cursor-pointer"
                >
                  <PlusIcon />
                  Add Tools
                </Button>
              </Link>
            </RippleButton>
          </div>

          {/* STATS */}
          <div className="w-full flex items-center justify-between gap-4">
            {stats.map((item, index) => (
              <div
                key={index}
                className="flex flex-col bg-white gap-6 border border-border-color-0 rounded-3xl py-6 px-4 w-full dark:bg-card"
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
            placeholder="Search Tools..."
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
            cards={toolsState}
          />
        </div>

        {/* GRID / LIST */}
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
              {filteredTools.map((tool, i) => (
                <ToolsCard
                  key={`${tool.id}-${i}`}
                  tools={tool}
                  index={i}
                  view={view}
                />
              ))}
            </motion.div>
          </AnimatePresence>

          {/* EMPTY STATE */}
          {filteredTools.length === 0 && (
            <div className="flex h-64 items-center justify-center text-border-color-0 border border-border-color-0 rounded-xl mt-6">
         
            </div>
          )}
        </div>
      </ScaleDown>

      <AddToolModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </div>
  );
}

export default function ToolsPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center">Loading...</div>}>
      <ToolsContent />
    </Suspense>
  );
}