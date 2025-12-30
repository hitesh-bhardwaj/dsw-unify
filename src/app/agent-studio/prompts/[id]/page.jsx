"use client";
import React, { useState, useMemo, useEffect } from "react";
import { useParams } from "next/navigation";
import { ScaleDown } from "@/components/animations/Animations";
import LeftArrowAnim from "@/components/animations/LeftArrowAnim";
import { RippleButton } from "@/components/ui/ripple-button";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import SearchBar from "@/components/search-bar";
import { Badge } from "@/components/ui/badge";
import { PlusIcon } from "@/components/Icons";
import Link from "next/link";
import CardDetails from "@/components/CardDetails";
import FilterBar from "@/components/FeatureStore/feature-transformation/TransformationFilter";
import { motion, AnimatePresence } from "framer-motion";
import PromptsVersionCard from "@/components/agent-studio/prompts/PromptsVersionCard";
import CreatePromptModal from "@/components/CreatePromptModal";


const page = () => {
  const params = useParams();
  const { id } = params;

  const [query, setQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [view, setView] = useState("grid");
  const [sortOrder, setSortOrder] = useState("none");
  const [versions, setVersionsData] = useState([]);
  const [statsData, setStatsData] = useState([]);
   const [isLoading, setIsLoading] = useState(false);
    const [createPrompt, setCreatePrompt] = useState(false);

  const [error, setError] = useState(null);

  // Mock data for agent versions
  useEffect(() => {
    // In production, fetch from API
    const mockVersions = [
  {
    id: 2,
    name: "v2",
    versionSlug: "version-2",
    description: "Improved structure and added code examples support",
    status: "Deployed",
    tags: ["technical-writing", "documentation", "clarity"],
    totalUses: 890,
    createdAt: "2025-01-18",
    lastUpdated: "January 18, 2025",
  },
  {
    id: 1,
    name: "v1",
    versionSlug: "version-1",
    description: "Initial version with basic documentation guidelines",
    status: "Undeployed",
    tags: ["technical-writing", "documentation"],
    totalUses: 523,
    createdAt: "2025-01-15",
    lastUpdated: "January 15, 2025",
  },
];


    const mockStats = [
  {
    title: "Owner",
    value: "Pritesh Tiwari",
    description: "Prompt owner",
  },
  {
    title: "Total Versions",
    value: mockVersions.length.toString(),
    description: "Prompt versions",
  },
  {
    title: "Deployed",
    value: mockVersions.filter(v => v.status === "Deployed").length.toString(),
    description: "Versions in production",
  },
];


    setVersionsData(mockVersions);
    setStatsData(mockStats);
  }, [id]);

  // Agent metadata - in production this would come from API
  const agentData = {
    id: id,
    name: "Auto Claims Processing Agent",
    description: "Automates auto insurance claims intake, validation, and processing",
    status: "active",
    tags: ["auto", "claims", "processing"],
  };

  // Convert slug to Title
  const slugToTitle = (slug) =>
    slug
      ?.split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");

  const title = slugToTitle(id);

  //  FILTER: Collect unique tags
  const availableTags = useMemo(() => {
    const s = new Set();
    versions.forEach((v) => v.tags?.forEach((t) => s.add(t)));
    return Array.from(s).sort();
  }, [versions]);

  // -----------------------------------------
  //  SEARCH + TAG FILTERING
  // -----------------------------------------
  let filteredVersions = versions.filter((v) => {
    const matchesSearch =
      v.name.toLowerCase().includes(query.toLowerCase()) ||
      v.description.toLowerCase().includes(query.toLowerCase());

    const matchesTags =
      selectedTags.length === 0 ||
      selectedTags.some((tag) => v.tags?.includes(tag));

    return matchesSearch && matchesTags;
  });

  // -----------------------------------------
  //  SORTING
  // -----------------------------------------
  if (sortOrder === "asc") {
    filteredVersions = [...filteredVersions].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
  } else if (sortOrder === "desc") {
    filteredVersions = [...filteredVersions].sort((a, b) =>
      b.name.localeCompare(a.name)
    );
  }

  const handleDeleteVersion = async (versionId) => {
    try {
      // In production, call API to delete version
      setVersionsData((prev) => prev.filter((v) => v.id !== versionId));
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <ScaleDown>
        <div className="bg-background p-6 space-y-8">
          <div className="flex items-center justify-between">
            <div className="flex gap-3">
              <LeftArrowAnim link={`/agent-studio/prompts`} />

              <div className="space-y-1">
                <div className="flex gap-3 items-center">
                  <h1 className="text-xl font-medium">{title}</h1>

                  <div className="flex flex-wrap gap-1 ">
                    {agentData.tags.map((tag, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className={cn(
                          "rounded-full border border-color-2 px-3 py-1 bg-white dark:bg-background text-xs font-light transition-all duration-500 ease-out dark:group-hover:bg-background"
                        )}
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-foreground pl-0.5">
                  {agentData.description}
                </p>
              </div>
            </div>

            <Link href="#">
              <RippleButton>
                <Button onClick={() => setCreatePrompt(true)} className="bg-sidebar-primary hover:bg-[#E64A19] text-white gap-3 !cursor-pointer rounded-full !px-6 !py-6 duration-300">
                  <PlusIcon />
                  Create Version
                </Button>
              </RippleButton>
            </Link>
          </div>

          {isLoading ? (
            // Loading skeleton for stats
            <div className="w-full flex items-center justify-between gap-4">
              {Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className="flex flex-col gap-6 border border-border-color-0 rounded-lg py-6 px-4 w-full dark:bg-card animate-pulse"
                >
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          ) : (
            <CardDetails data={statsData} first={true} />
          )}

          <div className="space-y-4">
            <h2 className="text-2xl font-medium">Versions</h2>

            {/* SEARCH + FILTERBAR */}
            <div className="flex gap-2">
              <div className="relative flex-1">
                <SearchBar
                  placeholder="Search by name, description, or tags..."
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>
            </div>

            <FilterBar
              selectedTags={selectedTags}
              onTagsChange={setSelectedTags}
              availableTags={availableTags}
              view={view}
              setView={setView}
              sortOrder={sortOrder}
              setSortOrder={setSortOrder}
              cards={versions}
            />
          </div>

          {/* ERROR STATE */}
          {error && !isLoading && (
            <div className="p-4 text-center text-red-600 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="font-medium">Failed to load versions</p>
              <p className="text-sm mt-2">{error}</p>
            </div>
          )}

          {/* LOADING STATE */}
          {isLoading && !error && (
            <div className={
              view === "grid"
                ? "grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-stretch"
                : "flex flex-col gap-5"
            }>
              {Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className="border border-border-color-0 rounded-3xl p-6 animate-pulse dark:bg-card"
                >
                  <div className="h-14 w-14 bg-gray-200 dark:bg-gray-700 rounded-lg mb-4"></div>
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-2"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                </div>
              ))}
            </div>
          )}

          {/* GRID / LIST VIEW */}
          {!isLoading && !error && (
            <AnimatePresence mode="wait">
              <motion.div
                key={view}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className={
                  view === "grid"
                    ? "grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-stretch"
                    : "flex flex-col gap-5"
                }
              >
                {filteredVersions.map((item, index) => (
                  <PromptsVersionCard key={item.id} view={view} version={item} index={index} onDelete={handleDeleteVersion} agentId={id} />
                ))}

                {filteredVersions.length === 0 && (
                  <div className="flex h-64 items-center justify-center text-gray-500">
                    No versions found
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </ScaleDown>
       <CreatePromptModal open={createPrompt} onOpenChange={setCreatePrompt} />
    </div>
  );
};

export default page;
