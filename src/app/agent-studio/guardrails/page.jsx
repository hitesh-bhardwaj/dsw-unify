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
import CardDetails from "@/components/CardDetails";
import CountUp from "@/components/animations/CountUp";
import { InfoIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

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
const mockInputGuardSuites = [
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
    agentsCount: "08",
    createdDate: "2024-01-20",
    tags: ["moderation", "content", "safety"],
  },
];
const mockOutputGuardSuites = [
  {
    id: 1,
    name: "Production Safety Suite",
    description: "Comprehensive safety checks for production agents",
    status: "active",
    icon: <GuardrailsIcon />,
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

 const stats = [
    {
      title: "Total Guard Suites",
      value: "2",
      description:"2 active"
    },
    {
      title: "Available Guardrails",
      value: "14",
      description:"3 custom"
    },
    {
      title: "Protected Agents",
      value: "14",
      description:"Across all suites"
    }
  ];

export default function GuardrailsPage() {
  const [activeTab, setActiveTab] = useState("suites");
  const [guardrailsSubTab, setGuardrailsSubTab] = useState("default"); // default or custom
  const [suitesSubTab, setSuitesSubTab] = useState("input"); // input or output
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

  const filterSuitesByDirection = (suites, direction) => {
    let filtered = suites.filter((suite) => {
      const matchSearch =
        suite.name.toLowerCase().includes(query.toLowerCase()) ||
        suite.description.toLowerCase().includes(query.toLowerCase());
      const matchTags =
        selectedTags.length === 0 ||
        selectedTags.some((tag) => suite.tags?.includes(tag));

      let matchDirection = true;
      if (direction === "input") {
        matchDirection = suite.inputGuardrails && suite.inputGuardrails.length > 0;
      } else if (direction === "output") {
        matchDirection = suite.outputGuardrails && suite.outputGuardrails.length > 0;
      }

      return matchSearch && matchTags && matchDirection;
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
        {/* <Card className="border-badge-blue my-3 p-6 rounded-lg">
            <div className="flex gap-4">
              <InfoIcon className="" color={"var(--badge-blue)"}/>
              <div className="flex flex-col gap-1">
                <p className="text-md text-foreground">
                  Pre-configured Guardrails
                </p>
                <p className="text-xs text-foreground/80">These guardrails are pre-loaded and cannot be modified. Create custom versions to adjust configurations.</p>
              </div>
            </div>
          </Card> */}
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
          {/* Title and CTA */}
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <h1 className="text-3xl font-medium text-foreground">
               Guardrails
              </h1>
              <p className="mt-1 text-sm text-gray-600 dark:text-foreground">
                Protect your agents with automated safety checks and compliance rules
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
                    Create Custom Guardrail
                  </Button>
                </Link>
              </RippleButton>
            )}
          </div>
          <div className="w-full flex items-center justify-between gap-4">
                {stats.map((item, index) => (
                  <div
                    key={index}
                    className="flex flex-col gap-3 border border-border-color-0 rounded-3xl py-6 px-4 w-full bg-white dark:bg-card"
                  >
                    <span className="text-sm text-foreground/80">{item.title}</span>
                      <>
                        <span className="text-3xl font-medium mt-1">
                           <CountUp value={item.value} startOnView />
                    </span>
                        <span className="text-xs font-normal">{item.description}</span>
                      </>
                  </div>
                ))}
              </div>

          

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
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-auto p-6 pt-0">
          {activeTab === "suites" ? (
            <div className="space-y-6">
              {/* Search Bar for Guard Suites */}
              <SearchBar
                placeholder="Search guard suites..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />

              <AnimatedTabsSection
                items={[
                  {
                    id: "input",
                    value: "input",
                    label: "Input Guard Suites",
                    render: () => {
                      const filteredSuites = filterSuitesByDirection(mockInputGuardSuites, "input");
                      return (
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
                                No input guard suites found
                              </div>
                            )}
                          </motion.div>
                        </AnimatePresence>
                      );
                    },
                  },
                  {
                    id: "output",
                    value: "output",
                    label: "Output Guard Suites",
                    render: () => {
                      const filteredSuites = filterSuitesByDirection(mockOutputGuardSuites, "output");
                      return (
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
                                No output guard suites found
                              </div>
                            )}
                          </motion.div>
                        </AnimatePresence>
                      );
                    },
                  },
                ]}
                value={suitesSubTab}
                onValueChange={setSuitesSubTab}
                className="w-full"
                contentClassName="relative mt-3"
              />
            </div>
          ) : (
            <div className="space-y-6">
              {/* Search Bar for Guardrails */}
              <SearchBar
                placeholder="Search Guardrails..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />

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
