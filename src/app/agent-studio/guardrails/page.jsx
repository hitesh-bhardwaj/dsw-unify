"use client";

import { useState, useMemo, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { GuardrailsIcon, PlusIcon } from "@/components/Icons";
import { GuardrailsCard } from "@/components/guardrails-card";
import { GuardrailsCustomCard } from "@/components/Guardrail-custom-card";
import { GuardSuiteCard } from "@/components/guard-suite-card";
import SearchBar from "@/components/search-bar";
import { RippleButton } from "@/components/ui/ripple-button";
import { ScaleDown } from "@/components/animations/Animations";
import AddGuardrailsModal from "@/components/agent-studio/AddGuardrails";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/motion-tabs";
import FilterBar from "@/components/FeatureStore/feature-transformation/TransformationFilter";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedTabsSection from "@/components/common/TabsPane";
import AddCustomGuardrailsModal from "@/components/agent-studio/AddCustomGuardrails";
import CreateGuardSuitesModal from "@/components/agent-studio/guardrails/CreateGuardSuitesModal";
import * as guardrailsApi from "@/lib/api/guardrails";

// Mock data for Guard Suites
const mockGuardSuites = [
  {
    id: 1,
    name: "Production Safety Suite",
    description: "Comprehensive safety checks for production agents",
    status: "active",
    icon: <GuardrailsIcon />,
    inputGuardrails: [
      { name: "Jailbreak & Unsafe Prompt", severity: "High" },
      { name: "Toxic Language", severity: "Medium" },
      { name: "Sensitive Information", severity: "High" },
    ],
    outputGuardrails: [
      { name: "Hallucination/Correctness" },
      { name: "Offensive Check", severity: "Medium" },
    ],
    agentsCount: 12,
    createdDate: "2024-01-15",
    tags: ["production", "safety", "compliance"],
  },
  {
    id: 2,
    name: "Content Moderation Suite",
    description: "Focused on toxic and offensive content detection",
    status: "active",
    icon: <GuardrailsIcon />,
    inputGuardrails: [
      { name: "Toxic Language", severity: "High" },
      { name: "Words/Expression Check" },
    ],
    outputGuardrails: [
      { name: "Toxic Language", severity: "High" },
      { name: "Offensive Check", severity: "High" },
    ],
    agentsCount: "08",
    createdDate: "2024-01-20",
    tags: ["moderation", "content", "safety"],
  },
];

// Default Guardrails data
const defaultGuardrails = [
  {
    id: 1,
    name: "Jailbreak & Unsafe Prompt",
    description: "Detects and blocks attempts to bypass AI safety measures",
    icon: GuardrailsIcon,
    direction: "Input",
    category: "Security",
    tags: ["security", "input"],
  },
  {
    id: 2,
    name: "Toxic Language",
    description: "Filters toxic, abusive, or harmful language",
    icon: GuardrailsIcon,
    direction: "Both",
    category: "Content Safety",
    tags: ["content safety", "both"],
  },
  {
    id: 3,
    name: "Sensitive Information",
    description: "Prevents exposure of PII and confidential data",
    icon: GuardrailsIcon,
    direction: "Input",
    category: "Privacy",
    tags: ["privacy", "input"],
  },
  {
    id: 4,
    name: "Hallucination/Correctness",
    description: "Validates factual accuracy and prevents hallucinations",
    icon: GuardrailsIcon,
    direction: "Output",
    category: "Quality",
    tags: ["quality", "output"],
  },
  {
    id: 5,
    name: "Offensive Check",
    description: "Detects offensive or inappropriate content",
    icon: GuardrailsIcon,
    direction: "Both",
    category: "Content Safety",
    tags: ["content safety", "both"],
  },
  {
    id: 6,
    name: "Words/Expression Check",
    description: "Monitors specific words and expressions",
    icon: GuardrailsIcon,
    direction: "Input",
    category: "Content Moderation",
    tags: ["moderation", "input"],
  },
];

// Custom Guardrails data
const INITIAL_CUSTOM_GUARDRAILS = [
  {
    id: 7,
    name: "Strict Toxic Language Filter",
    description:
      "Enhanced toxic language detection with custom keywords and higher sensitivity",
    basedOn: "Toxic Language",
    icon: GuardrailsIcon,
    direction: "Both",
    category: "Content Safety",
    isCustom: true,
    tags: ["content safety", "custom", "both"],
  },
  {
    id: 8,
    name: "PII Detection - Healthcare",
    description:
      "Customized sensitive information detection for healthcare data including medical IDs",
    basedOn: "Sensitive Information",
    icon: GuardrailsIcon,
    direction: "Input",
    category: "Privacy",
    isCustom: true,
    tags: ["privacy", "custom", "input"],
  },
  {
    id: 9,
    name: "Code Security - Advanced",
    description:
      "Enhanced code exploit detection with custom patterns for SQL injection and XSS",
    basedOn: "Code Exploit Check",
    icon: GuardrailsIcon,
    direction: "Both",
    category: "Security",
    isCustom: true,
    tags: ["security", "custom", "both"],
  },
];

export default function GuardrailsPage() {
  const [activeTab, setActiveTab] = useState("suites");
  const [guardrailsSubTab, setGuardrailsSubTab] = useState("default"); // default or custom
  const [query, setQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCustomModalOpen, setIsCustomModalOpen] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);
  const [sortOrder, setSortOrder] = useState("none");
  const [view, setView] = useState("grid");
  const [guardSuites, setGuardSuites] = useState(mockGuardSuites);
  const [defaultGuardrailsState, setDefaultGuardrailsState] = useState(defaultGuardrails);
  const [customGuardrails, setCustomGuardrails] = useState(INITIAL_CUSTOM_GUARDRAILS);

  const [copySourceGuardrail, setCopySourceGuardrail] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data on mount
  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const [suitesData, defaultData, customData] = await Promise.all([
          guardrailsApi.getGuardSuites(),
          guardrailsApi.getDefaultGuardrails(),
          guardrailsApi.getCustomGuardrails(),
        ]);

        setGuardSuites(suitesData);
        setDefaultGuardrailsState(defaultData);
        setCustomGuardrails(customData);
      } catch (err) {
        setError(err.message || "Failed to load guardrails");
        console.error("Error fetching guardrails:", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleCopyGuardrail = (guardrail) => {
    setCopySourceGuardrail(guardrail);
    setIsCustomModalOpen(true);
  };

  const handleDeleteCustomGuardrail = async (id) => {
    try {
      await guardrailsApi.deleteGuardrail(id);
      setCustomGuardrails((prev) => prev.filter((g) => g.id !== id));
    } catch (err) {
      console.error("Error deleting guardrail:", err);
      setError(err.message || "Failed to delete guardrail");
    }
  };

  // Get available tags dynamically based on active tab
  const availableTags = useMemo(() => {
    const tags = new Set();
    if (activeTab === "suites") {
      guardSuites.forEach((suite) =>
        suite.tags?.forEach((tag) => tags.add(tag))
      );
    } else {
      const list =
        guardrailsSubTab === "default" ? defaultGuardrails : customGuardrails;
      list.forEach((gr) => gr.tags?.forEach((tag) => tags.add(tag)));
    }
    return Array.from(tags).sort();
  }, [activeTab, guardrailsSubTab]);

  // Search + Tag Filtering
  let filteredSuites = guardSuites.filter((suite) => {
    const matchSearch =
      suite.name.toLowerCase().includes(query.toLowerCase()) ||
      suite.description.toLowerCase().includes(query.toLowerCase());
    const matchTags =
      selectedTags.length === 0 ||
      selectedTags.some((tag) => suite.tags?.includes(tag));

    return matchSearch && matchTags;
  });

  // Sorting (ASC / DESC)
  if (sortOrder === "asc") {
    filteredSuites = [...filteredSuites].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
  } else if (sortOrder === "desc") {
    filteredSuites = [...filteredSuites].sort((a, b) =>
      b.name.localeCompare(a.name)
    );
  }

  const filterGuardrailsList = (list) => {
    let filtered = list.filter((guardrail) => {
      const matchSearch =
        guardrail.name.toLowerCase().includes(query.toLowerCase()) ||
        guardrail.description.toLowerCase().includes(query.toLowerCase());
      const matchTags =
        selectedTags.length === 0 ||
        selectedTags.some((tag) => guardrail.tags?.includes(tag));

      return matchSearch && matchTags;
    });

    if (sortOrder === "asc") {
      filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOrder === "desc") {
      filtered = [...filtered].sort((a, b) => b.name.localeCompare(a.name));
    }

    return filtered;
  };

  const handleDeleteSuite = async (suiteId) => {
    try {
      await guardrailsApi.deleteGuardSuite(suiteId);
      setGuardSuites((prev) => prev.filter((s) => s.id !== suiteId));
    } catch (err) {
      console.error("Error deleting guard suite:", err);
      setError(err.message || "Failed to delete guard suite");
    }
  };

  const activeGuardrailList =
    guardrailsSubTab === "default" ? defaultGuardrailsState : customGuardrails;

  const renderGuardrailGrid = (list, variant) => {
    const filtered = filterGuardrailsList(list);
    const CardComponent =
      variant === "custom" ? GuardrailsCustomCard : GuardrailsCard;

    return (
      <AnimatePresence mode="wait">
        <motion.div
          key={`${view}-${variant}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className={`items-stretch ${
            view === "grid"
              ? "grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3"
              : "flex flex-col gap-5"
          } ${variant === "custom" ? "rounded-2xl" : ""}`}
        >
          {filtered.map((guardrail, index) => (
            <CardComponent
              key={`${variant}-${guardrail.id}`}
              guardrail={{
                ...guardrail,
                isCustom: variant === "custom" || guardrail.isCustom,
              }}
              view={view}
              index={index}
              onCopy={handleCopyGuardrail}
              onDelete={
                variant === "custom" ? handleDeleteCustomGuardrail : undefined
              }
            />
          ))}

          {filtered.length === 0 && (
            <div className="flex h-64 items-center justify-center text-gray-500">
              No guardrails found matching "{query}"
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    );
  };

  return (
    <div className="flex flex-col h-full w-full overflow-hidden">
      <ScaleDown>
        <div className="space-y-6 p-6">
          {/* Animated Tabs - At the very top */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="">
            <TabsList className="w-fit border border-border dark:bg-card">
              <TabsTrigger className="px-4 font-normal" value="suites">
                Guard Suites
              </TabsTrigger>
              <TabsTrigger className="px-4 font-normal" value="guardrails">
                Guardrails
              </TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Title and CTA */}
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <h1 className="text-3xl font-medium text-foreground">
                {activeTab === "suites" ? "Guard Suites" : "Guardrails"}
              </h1>
              <p className="mt-1 text-sm text-gray-600 dark:text-foreground">
                {activeTab === "suites"
                  ? "Manage collections of guardrails for your agents"
                  : "Manage safety and compliance guardrails"}
              </p>
            </div>
            {activeTab === "suites" ? (
              <RippleButton>
                <Link href="#">
                  <Button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-sidebar-primary hover:bg-[#E64A19] text-white gap-3 rounded-full !px-6 !py-6 !cursor-pointer duration-300"
                  >
                    <PlusIcon />
                    Create Guard Suite
                  </Button>
                </Link>
              </RippleButton>
            ) : (
              <RippleButton>
                <Link href="#">
                  <Button
                    onClick={() => setIsCustomModalOpen(true)}
                    className="bg-sidebar-primary hover:bg-[#E64A19] text-white gap-3 rounded-full !px-6 !py-6 !cursor-pointer duration-300"
                  >
                    <PlusIcon />
                    Create Guardrail
                  </Button>
                </Link>
              </RippleButton>
            )}
          </div>

          {/* Search Bar */}
          <SearchBar
            placeholder={
              activeTab === "suites"
                ? "Search guard suites..."
                : "Search Guardrails..."
            }
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          {/* Filter Bar */}
          <FilterBar
            selectedTags={selectedTags}
            onTagsChange={setSelectedTags}
            availableTags={availableTags}
            view={view}
            setView={setView}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
            cards={activeTab === "suites" ? guardSuites : activeGuardrailList}
          />
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-auto p-6 pt-0">
          {activeTab === "suites" ? (
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
                {filteredSuites.map((suite, index) => (
                  <GuardSuiteCard
                    key={suite.id}
                    suite={suite}
                    view={view}
                    index={index}
                    onDelete={handleDeleteSuite}
                  />
                ))}

                {filteredSuites.length === 0 && (
                  <div className="flex h-64 items-center justify-center text-gray-500">
                    No guard suites found matching "{query}"
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          ) : (
            <div className="space-y-6">
              <AnimatedTabsSection
                items={[
                  {
                    id: "default",
                    value: "default",
                    label: "Default Guardrails",
                    render: () =>
                      renderGuardrailGrid(defaultGuardrailsState, "default"),
                  },
                  {
                    id: "custom",
                    value: "custom",
                    label: "Custom Guardrails",
                    render: () =>
                      renderGuardrailGrid(customGuardrails, "custom"),
                  },
                ]}
                value={guardrailsSubTab}
                onValueChange={setGuardrailsSubTab}
                className="w-full"
                contentClassName="relative mt-3"
              />
            </div>
          )}
        </div>
      </ScaleDown>

      <CreateGuardSuitesModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
      />
      <AddCustomGuardrailsModal
        open={isCustomModalOpen}
        onOpenChange={setIsCustomModalOpen}
        initialGuardrail={copySourceGuardrail}
      />
    </div>
  );
}
