"use client";

import { useMemo, useState, useEffect, Suspense } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MemoriesIcon, PlusIcon } from "@/components/Icons";
import { MemoryCard } from "@/components/memory-card";
import SearchBar from "@/components/search-bar";
import { RippleButton } from "@/components/ui/ripple-button";
import { ScaleDown } from "@/components/animations/Animations";
import AddMemoriesModal from "@/components/agent-studio/AddMemoriesModal";
import { motion, AnimatePresence } from "framer-motion";
import CountUp from "@/components/animations/CountUp";
import { useSearchParams } from "next/navigation";

import FilterBar from "@/components/FeatureStore/feature-transformation/TransformationFilter";

const memories = [
  {
    id: "user-preferences",
    name: "User Preferences",
    description: "Individual user preferences and settings",
    icon: <MemoriesIcon />,
    status: "active",
    tags: ["session", "user"],
    size: "2.4 MB",
    entries: 1250,
    variant: "light",
  },
  {
    id: "agent-learning",
    name: "Agent Learning",
    description: "Agent-specific learned behaviors and patterns",
    icon: <MemoriesIcon />,
    status: "active",
    tags: ["agent"],
    size: "12.4 MB",
    entries: 890,
    variant: "light",
  },
  {
    id: "organization-knowledge",
    name: "Organization Knowledge",
    description: "Company-wide shared knowledge and insights",
    icon: <MemoriesIcon />,
    status: "active",
    size: "6.4 MB",
    tags: ["organization"],
    entries: 2340,
    variant: "light",
  },
];

const stats = [
  { title: "Total Memories", value: "03" },
  { title: "Active Memories", value: "03" },
  { title: "Total Entries", value: "4480" },
];

function MemoriesContent() {
  const [query, setQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [memoriesState, setMemoriesState] = useState(memories);
  const searchParams = useSearchParams();

  useEffect(() => {
    const deleteId = searchParams.get("deleteId");
    if (!deleteId) return;

    setMemoriesState((prev) => prev.filter((m) => m.id !== deleteId));
  }, [searchParams]);

  // FILTER BAR STATE
  const [selectedTags, setSelectedTags] = useState([]);
  const [view, setView] = useState("grid");
  const [sortOrder, setSortOrder] = useState("none");

  // AVAILABLE TAGS
  const availableTags = useMemo(() => {
    const setTag = new Set();
    memoriesState.forEach((m) =>
      m.tags?.forEach((tag) => setTag.add(tag.toLowerCase()))
    );
    return Array.from(setTag).sort();
  }, [memoriesState]);

  // SEARCH + TAG FILTER
  let filteredMemories = memoriesState.filter((memory) => {
    const matchSearch =
      memory.name.toLowerCase().includes(query.toLowerCase()) ||
      memory.description.toLowerCase().includes(query.toLowerCase());

    const matchTags =
      selectedTags.length === 0 ||
      selectedTags.some((t) => memory.tags.includes(t));

    return matchSearch && matchTags;
  });

  // SORTING
  if (sortOrder === "asc") {
    filteredMemories = [...filteredMemories].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
  } else if (sortOrder === "desc") {
    filteredMemories = [...filteredMemories].sort((a, b) =>
      b.name.localeCompare(a.name)
    );
  }

  return (
    <div className="flex flex-col h-full pb-10 w-full overflow-hidden ">
      <ScaleDown>
        <div className="space-y-6 p-6">
          {/* HEADER */}
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <h1 className="text-3xl font-medium text-foreground">
                Memories
              </h1>
              <p className="mt-1 text-sm text-gray-600 dark:text-foreground">
                Manage agent memory systems
              </p>
            </div>

            <RippleButton>
              <Link href="#">
                <Button
                  onClick={() => setIsModalOpen(true)}
                  className="bg-sidebar-primary hover:bg-[#E64A19] text-white gap-3 rounded-full !px-6 !py-6 duration-300 cursor-pointer"
                >
                  <PlusIcon />
                  Create Memory
                </Button>
              </Link>
            </RippleButton>
          </div>

          {/* STATS */}
          <div className="w-full flex items-center justify-between gap-4">
            {stats.map((item, index) => (
              <div
                key={index}
                className="flex flex-col gap-6 border border-border-color-0 rounded-3xl py-6 px-4 w-full dark:bg-card"
              >
                <span className="text-sm text-foreground/80">
                  {item.title}
                </span>
                <span className="text-4xl font-medium mt-1">
                  <CountUp value={item.value} startOnView />
                </span>
              </div>
            ))}
          </div>

          {/* SEARCH */}
          <SearchBar
            placeholder="Search Memories..."
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
            cards={memoriesState}
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
              className={
                view === "grid"
                  ? "grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                  : "flex flex-col gap-5"
              }
            >
              {filteredMemories.map((memory, index) => (
                <MemoryCard
                  key={memory.id}
                  memories={memory}
                  index={index}
                  view={view}
                />
              ))}
            </motion.div>
          </AnimatePresence>

          {/* EMPTY STATE */}
          {filteredMemories.length === 0 && (
            <div className="flex h-64 items-center justify-center text-border-color-0 border border-border-color-0 rounded-xl mt-6">
              No memories found matching "{query}"
            </div>
          )}
        </div>
      </ScaleDown>

      <AddMemoriesModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </div>
  );
}

export default function MemoriesPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center">Loading...</div>}>
      <MemoriesContent />
    </Suspense>
  );
}