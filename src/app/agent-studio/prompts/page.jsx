"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { PromptCard } from "@/components/prompt-card";
import { cn } from "@/lib/utils";
import CountUp from "@/components/animations/CountUp";
import {
  AiGenerator,
  PlusIcon,
  PromptsIcon,
  TemplatesIcon,
  Tune,
} from "@/components/Icons";
import { TemplateCard } from "@/components/template-card";
import CreatePromptModal from "@/components/CreatePromptModal";
import SearchBar from "@/components/search-bar";
import RadioTabs from "@/components/common/RadioTabs";
import { RippleButton } from "@/components/ui/ripple-button";
import { ScaleDown } from "@/components/animations/Animations";
import { motion, AnimatePresence } from "framer-motion";

import FilterBar from "@/components/FeatureStore/feature-transformation/TransformationFilter";

const stats = [
  { title: "Total Prompts", value: '03' },
  { title: "Total Uses", value: 2296 },
  { title: "Categories", value: '03' },
];


const prompts = [
  {
    id: 1,
    name: "Customer Support Assistant",
    description: "Helpful and empathetic customer service responses",
    slug: "customer-support-assistant",
    rating: 4.8,
    icon: <PromptsIcon />,
    version: "v3",
    tags: ["Customer-Service", "Empathy", "+1 more"],
    uses: "1250",
    lastUpdated: "20/01/2024",
    preview: "You are a helpful and empathetic customer service representative......",
    variant: "light",
  },
  {
    id: 2,
    name: "Technical Documentation Writer",
    description: "Creates clear and comprehensive technical documentation",
    slug: "technical-documentation-writer",
    rating: 4.3,
    icon: <PromptsIcon />,
    version: "v2",
    tags: ["Customer-Service", "Empathy", "+1 more"],
    uses: "890",
    lastUpdated: "18/01/2024",
    preview: "You are an expert technical writer who creates clear, comprehensive documentation......",
    variant: "light",
  },
  {
    id: 3,
    name: "Code Review Assistant",
    description: "Provides constructive code review feedback",
    slug: "code-review-assistant",
    rating: 4.9,
    icon: <PromptsIcon />,
    version: "v1",
    tags: ["Customer-Service", "Empathy", "+1 more"],
    uses: "156",
    lastUpdated: "22/01/2024",
    preview: "You are a helpful and empathetic customer service representative......",
    variant: "light",
  },
];

const templates = [
  {
    id: 1,
    name: "Customer Service Template",
    description: "Standard template for customer service agents",
    icon: <TemplatesIcon />,
    tags: ["Customer Service", "Empathy", "+1 more"],
    uses: "45",
    variable: "company_name, product_name, support_level",
    variant: "light",
  },
  {
    id: 2,
    name: "Technical Q&A Template",
    description: "Template for technical question answering",
    icon: <TemplatesIcon />,
    tags: ["Technical", "Empathy", "+1 more"],
    uses: "32",
    variable: "domain, expertise_level, response_format",
    variant: "light",
  },
];

export default function PromptsPage() {
  const [query, setQuery] = useState("");
  const [createPrompt, setCreatePrompt] = useState(false);
  const [tab, setTab] = useState("prompts");

  // FILTER BAR STATES
  const [selectedTags, setSelectedTags] = useState([]);
  const [view, setView] = useState("grid");
  const [sortOrder, setSortOrder] = useState("none");

  // AVAILABLE TAGS FOR PROMPTS
  const availablePromptTags = useMemo(() => {
    const tags = new Set();
    prompts.forEach((p) => p.tags?.forEach((t) => tags.add(t)));
    return Array.from(tags).sort();
  }, []);

  // AVAILABLE TAGS FOR TEMPLATES
  const availableTemplateTags = useMemo(() => {
    const tags = new Set();
    templates.forEach((t) => t.tags?.forEach((x) => tags.add(x)));
    return Array.from(tags).sort();
  }, []);

  // FILTERING FOR PROMPTS
  let filteredPrompts = prompts.filter((prompt) => {
    const matchesSearch = prompt.name.toLowerCase().includes(query.toLowerCase());
    const matchesTags =
      selectedTags.length === 0 ||
      selectedTags.some((tag) => prompt.tags?.includes(tag));
    return matchesSearch && matchesTags;
  });

  // FILTERING FOR TEMPLATES
  let filteredTemplates = templates.filter((template) => {
    const matchesSearch = template.name.toLowerCase().includes(query.toLowerCase());
    const matchesTags =
      selectedTags.length === 0 ||
      selectedTags.some((tag) => template.tags?.includes(tag));
    return matchesSearch && matchesTags;
  });

  // SORTING (for both)
  const applySorting = (arr) => {
    if (sortOrder === "asc") return [...arr].sort((a, b) => a.name.localeCompare(b.name));
    if (sortOrder === "desc") return [...arr].sort((a, b) => b.name.localeCompare(a.name));
    return arr;
  };

  filteredPrompts = applySorting(filteredPrompts);
  filteredTemplates = applySorting(filteredTemplates);

  // ANIMATIONS
  const fade = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  };

  return (
    <>
      <div className="flex flex-col h-full overflow-hidden">
        <ScaleDown>
          <div className="space-y-6 p-6 w-full h-full">
            {/* HEADER */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-medium text-foreground">Prompt Library</h1>
                <p className="mt-1 text-sm dark:text-foreground text-black/60">
                  Manage and version your prompt templates and configurations
                </p>
              </div>
              <div className="flex items-center gap-3">
                <RippleButton>
                  <Button
                    variant="outline"
                    className="gap-2 border-primary text-foreground hover:bg-gray-50"
                  >
                    <div className="!w-4"><AiGenerator /></div>
                    Generate Prompt
                  </Button>
                </RippleButton>

                <RippleButton>
                  <Button
                    className="bg-sidebar-primary hover:bg-[#E64A19] text-white gap-3 rounded-full !px-6 !py-6"
                    onClick={() => setCreatePrompt(true)}
                  >
                    <PlusIcon /> Create Prompt
                  </Button>
                </RippleButton>
              </div>
            </div>

            <div className="w-full flex items-center justify-between gap-4">
                          {stats.map((item, index) => (
                            <div
                              key={index}
                              className="flex flex-col gap-6 border border-border-color-0 rounded-3xl py-6 px-4 w-full"
                            >
                              <span className="text-sm text-foreground/80">{item.title}</span>
                              <span className="text-4xl font-medium mt-1">
                                <CountUp value={item.value} startOnView />
                              </span>
                             
                            </div>
                          ))}
                        </div>

            {/* SEARCH */}
            <div className="flex gap-3">
              <div className="relative flex-1">
                <SearchBar
                  placeholder="Search Prompts..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>

              
            </div>

            {/* TABS */}
            <RadioTabs
              items={[
                { id: "prompts", label: "Prompts", icon: PromptsIcon },
                { id: "templates", label: "Templates", icon: TemplatesIcon },
              ]}
              value={tab}
              onValueChange={setTab}
              activeClassName="text-[#FF5722]"
              inactiveClassName="border-transparent dark:text-foreground text-black/70"
              dotColorClassName="bg-[#FF5722]"
              equalWidth
            />

            {/* FILTER BAR FOR BOTH TABS */}
            {tab === "prompts" && (
              <FilterBar
                selectedTags={selectedTags}
                onTagsChange={setSelectedTags}
                availableTags={availablePromptTags}
                view={view}
                setView={setView}
                sortOrder={sortOrder}
                setSortOrder={setSortOrder}
                cards={prompts}
              />
            )}

            {tab === "templates" && (
              <FilterBar
                selectedTags={selectedTags}
                onTagsChange={setSelectedTags}
                availableTags={availableTemplateTags}
                view={view}
                setView={setView}
                sortOrder={sortOrder}
                setSortOrder={setSortOrder}
                cards={templates}
              />
            )}

            {/* CONTENT */}
            <div className="flex-1 pt-0 h-fit w-full relative">
              <AnimatePresence mode="wait">
                {/* PROMPTS */}
                {tab === "prompts" && (
                  <motion.div
                    key="prompts"
                    variants={fade}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ duration: 0.25 }}
                  >
                    <div
                      className={
                        view === "grid"
                          ? "grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                          : "flex flex-col gap-5"
                      }
                    >
                      {filteredPrompts.map((prompt, index) => (
                        <PromptCard key={prompt.id} prompt={prompt} index={index} view={view} />
                      ))}
                    </div>

                    {filteredPrompts.length === 0 && (
                      <div className="flex h-64 items-center justify-center text-gray-500">
                        No prompts found matching "{query}"
                      </div>
                    )}
                  </motion.div>
                )}

                {/* TEMPLATES */}
                {tab === "templates" && (
                  <motion.div
                    key="templates"
                    variants={fade}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ duration: 0.25 }}
                  >
                    <div
                      className={
                        view === "grid"
                          ? "grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                          : "flex flex-col gap-5"
                      }
                    >
                      {filteredTemplates.map((template, index) => (
                        <TemplateCard key={template.id} template={template} index={index} view={view} />
                      ))}
                    </div>

                    {filteredTemplates.length === 0 && (
                      <div className="flex h-64 items-center justify-center text-gray-500">
                        No templates found matching "{query}"
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </ScaleDown>
      </div>

      <CreatePromptModal open={createPrompt} onOpenChange={setCreatePrompt} />
    </>
  );
}
