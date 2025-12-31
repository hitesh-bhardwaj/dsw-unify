"use client";
import { ScaleDown } from "@/components/animations/Animations";
import { PlusIcon } from "@/components/Icons";
import SearchBar from "@/components/search-bar";
import { Button } from "@/components/ui/button";
import { RippleButton } from "@/components/ui/ripple-button";
import Link from "next/link";
import React, { useMemo, useState, useEffect } from "react";
import { UseCaseCard } from "@/components/usecases/usecase-card";
import UseCaseModal from "@/components/usecases/UsecaseModal";
import CountUp from "@/components/animations/CountUp";
import FilterBar from "@/components/FeatureStore/feature-transformation/TransformationFilter";
import { motion, AnimatePresence } from "framer-motion";
import { getUseCases, getUseCaseStats, deleteUseCase } from "@/lib/api/ai-studio";

const page = () => {
  const [query, setQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [useCases, setUseCases] = useState([]);
  const [stats, setStats] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedTags, setSelectedTags] = useState([]);
  const [view, setView] = useState("grid");
  const [sortOrder, setSortOrder] = useState("none");

  // Fetch use cases and stats on mount
  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        setError(null);

        // Parallel API calls
        const [useCasesData, statsResponse] = await Promise.all([
          getUseCases(),
          getUseCaseStats(),
        ]);

        setUseCases(useCasesData);
        setStats([
          { title: "Total Use Cases", value: statsResponse.totalUseCases, description: "Active business use cases" },
          { title: "Total Models", value: statsResponse.totalModels, description: "Across all use cases" },
          { title: "Total Contributors", value: statsResponse.totalContributors, description: "Unique contributors" },
        ]);
      } catch (err) {
        setError(err.message || "Failed to load use cases");
        console.error("Use cases error:", err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  const handleDeleteUseCase = async (id) => {
    try {
      await deleteUseCase(id);
      setUseCases((prev) => prev.filter((u) => u.id !== id));
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  //  Get available tags dynamically
  const availableTags = useMemo(() => {
    const tags = new Set();
    useCases.forEach((f) => f.tags?.forEach((t) => tags.add(t)));
    return Array.from(tags).sort();
  }, [useCases]);

  //  Search + Tag Filtering
let filteredFeatures = useCases.filter((feature) => {
    const matchSearch = feature.name.toLowerCase().includes(query.toLowerCase());
    const matchTags =
      selectedTags.length === 0 ||
      selectedTags.some((tag) => feature.tags?.includes(tag));

    return matchSearch && matchTags;
  });

  //  Sorting (ASC / DESC)
  if (sortOrder === "asc") {
    filteredFeatures = [...filteredFeatures].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
  } else if (sortOrder === "desc") {
    filteredFeatures = [...filteredFeatures].sort((a, b) =>
      b.name.localeCompare(a.name)
    );
  }

  return (
    <>
      <div className="flex flex-col h-full w-full overflow-hidden">
        <ScaleDown>
          <div className="space-y-6 p-6">
            {/* HEADER */}
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <h1 className="text-3xl font-medium text-foreground">Use Cases</h1>
                <p className="text-sm dark:text-foreground text-black/60">
                  Organize and manage your ML models by business use cases
                </p>
              </div>

              <Link href="#">
                <RippleButton>
                  <Button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-sidebar-primary hover:bg-[#E64A19] text-white gap-3 rounded-full !px-6 !py-6 !cursor-pointer duration-300"
                  >
                    <PlusIcon />
                    Create Use Cases
                  </Button>
                </RippleButton>
              </Link>
            </div>

            {/* STATS */}
            <div className="w-full flex items-center justify-between gap-4">
              {isLoading ? (
                // Loading skeleton
                Array.from({ length: 3 }).map((_, index) => (
                  <div
                    key={index}
                    className="flex flex-col gap-3 border border-border-color-0 rounded-3xl py-6 px-4 w-full dark:bg-card animate-pulse"
                  >
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
                    <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mt-1"></div>
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                  </div>
                ))
              ) : (
                stats.map((item, index) => (
                  <div
                    key={index}
                    className="flex flex-col gap-3 border border-border-color-0 rounded-3xl py-6 px-4 w-full dark:bg-card"
                  >
                    <span className="text-sm text-foreground/80">{item.title}</span>
                    <span className="text-4xl font-medium mt-1">
                      <CountUp value={item.value} startOnView />
                    </span>
                    <span className="text-xs font-normal">{item.description}</span>
                  </div>
                ))
              )}
            </div>

            {/* SEARCH */}
            <div className="flex gap-2">
              <div className="relative flex-1">
                <SearchBar
                  placeholder="Search by name, description, or tags..."
                  value={query}
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
              cards={useCases}
            />

            {/* ERROR STATE */}
            {error && !isLoading && (
              <div className="p-4 text-center text-red-600 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <p className="font-medium">Failed to load use cases</p>
                <p className="text-sm mt-2">{error}</p>
              </div>
            )}

            {/* LOADING STATE */}
            {isLoading && !error && (
              <div className={`items-stretch ${
                view === "grid"
                  ? "grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                  : "flex flex-col gap-5"
              }`}>
                {Array.from({ length: 6 }).map((_, index) => (
                  <div
                    key={index}
                    className="border border-border-color-0 rounded-3xl p-6 animate-pulse dark:bg-card"
                  >
                    <div className="h-14 w-14 bg-gray-200 dark:bg-gray-700 rounded-lg mb-4"></div>
                    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
                  </div>
                ))}
              </div>
            )}

            {/* USE CASE CARDS (GRID / LIST) */}
            {!isLoading && !error && (
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
                  {filteredFeatures.map((feature, index) => (
                    <UseCaseCard key={feature.id} feature={feature} view={view} index={index} onDelete={handleDeleteUseCase} />
                  ))}

                  {filteredFeatures.length === 0 && (
                    <div className="flex h-64 items-center justify-center text-gray-500">
                      No use cases found
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            )}
          </div>
        </ScaleDown>
      </div>

      {/* MODAL */}
      <UseCaseModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </>
  );
};

export default page;
