"use client";

import { useMemo, useState } from "react";
import SearchBar from "@/components/search-bar";
import { ScaleDown } from "@/components/animations/Animations";
import EmptyCard from "@/components/common/EmptyCard";
import FilterBar from "@/components/FeatureStore/feature-transformation/TransformationFilter";
import { AnimatePresence, motion } from "framer-motion";
import { LLMsIcon } from "../Icons";
import { LLMCard } from "../LLMCard"; // adjust path if needed

const LLMs = [
  {
    id: "gpt-4-turbo",
    name: "GPT-4 Turbo",
    description: "OpenAI API Model",
    icon: <LLMsIcon />,
    status: "active",
    tags: ["general-purpose", "api-based", "production"],
    requests: "1,234",
    avgres: "2.3s",
    deploy: false,
  },
  {
    id: "mistral-7B-instruct",
    name: "Mistral 7B Instruct",
    description: "Self-hosted Mistral Model",
    icon: <LLMsIcon />,
    status: "active",
    tags: ["open-source", "self-hosted", "production"],
    requests: "1,234",
    avgres: "2.3s",
    deploy: false,
  },
  {
    id: "llama-2-7B",
    name: "Llama 2 7B",
    description: "Self-hosted Open Source",
    icon: <LLMsIcon />,
    status: "deploying",
    tags: ["open-source", "self-hosted", "development"],
    requests: "1,234",
    avgres: "2.3s",
    deploy: true,
  },
  {
    id: "custom-insurance-model",
    name: "Custom Insurance Model",
    description: "Fine-tuned Model",
    icon: <LLMsIcon />,
    status: "active",
    tags: ["fine-tuned", "insurance", "specialized"],
    requests: "1,234",
    avgres: "2.3s",
    performance: true,
    accuracy: "94.2%",
    latency: "1.8s",
  },
];

const Recent = [
  {
    content: "Mistral 7B Instruct deployment completed",
    recentActivity: "30 minutes ago",
    color: "green",
  },
  {
    content: "GPT-4 Turbo deployment completed",
    recentActivity: "2 hours ago",
    color: "green",
  },
  {
    content: "Llama 2 7B deployment started",
    recentActivity: "4 hours ago",
    color: "green",
  },
  {
    content: "Custom Insurance Model retrained",
    recentActivity: "1 day ago",
    color: "red",
  },
];

export default function FineTunedCards() {
  const [query, setQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [view, setView] = useState("grid"); // grid | list
  const [sortOrder, setSortOrder] = useState("none");

  // Animation for separators
  const separatorVariants = {
    hidden: { scaleX: 0, originX: 0 },
    visible: (i) => ({
      scaleX: 1,
      originX: 0,
      transition: { delay: i * 0.07, duration: 0.5, ease: "easeOut" },
    }),
  };

  // Only self-hosted models
  const selfHosted = useMemo(
    () => LLMs.filter((llm) => llm.tags.includes("fine-tuned")),
    []
  );

  // Tag list
  const availableTags = useMemo(() => {
    const set = new Set();
    selfHosted.forEach((llm) => llm.tags.forEach((t) => set.add(t)));
    return Array.from(set).sort();
  }, [selfHosted]);

  // Filtering logic
  let filteredLLMs = useMemo(() => {
    const q = query.trim().toLowerCase();

    return selfHosted.filter((llm) => {
      const matchesSearch =
        llm.name.toLowerCase().includes(q) ||
        llm.description.toLowerCase().includes(q) ||
        llm.tags.some((tag) => tag.toLowerCase().includes(q));

      const matchesTags =
        selectedTags.length === 0 ||
        selectedTags.some((tag) => llm.tags.includes(tag));

      return matchesSearch && matchesTags;
    });
  }, [query, selectedTags, selfHosted]);

  // Sorting
  if (sortOrder === "asc") {
    filteredLLMs = filteredLLMs.sort((a, b) =>
      a.name.localeCompare(b.name)
    );
  } else if (sortOrder === "desc") {
    filteredLLMs = filteredLLMs.sort((a, b) =>
      b.name.localeCompare(a.name)
    );
  }

  return (
    <div className="flex flex-col h-full w-full overflow-hidden">
      <ScaleDown>
        <div className="space-y-6">

          {/* SEARCH */}
          <SearchBar
            placeholder="Search Self Hosted LLMs..."
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
            cards={selfHosted}
          />

          {/* DIRECT CARD RENDERING WITH MOTION */}
          {filteredLLMs.length > 0 ? (
            <AnimatePresence mode="wait">
              <motion.div
                key={view} // triggers animation on change
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
                {filteredLLMs.map((llm, index) => (
                  <LLMCard key={llm.id} llm={llm} index={index} view={view} />
                ))}
              </motion.div>
            </AnimatePresence>
          ) : (
            <EmptyCard>No self-hosted LLMs found.</EmptyCard>
          )}
        </div>
      </ScaleDown>

      {/* RECENT ACTIVITY */}
      <div className="space-y-10 mt-20">
        <h2 className="text-2xl font-medium">Recent Activity</h2>

        <div className="w-full space-y-4">
          {Recent.map((recent, id) => (
            <div
              key={id}
              className="w-full h-fit flex gap-6 items-center group"
            >
              <div className="w-3 h-3">
                <div
                  className={`h-full w-full rounded-full ${
                    recent.color === "green"
                      ? "bg-badge-green"
                      : "bg-red-500"
                  }`}
                />
              </div>

              <div className="flex flex-col w-full">
                <div className="w-full flex justify-between items-center pt-5 pb-8">
                  <p>{recent.content}</p>
                  <p className="text-xs text-black/60">
                    {recent.recentActivity}
                  </p>
                </div>

                <motion.div
                  custom={id}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.5 }}
                  variants={separatorVariants}
                  className="w-full h-[1px] bg-foreground/20"
                >
                  <div className="w-full h-full bg-primary scale-x-0 group-hover:scale-x-100 duration-500 ease-in-out origin-left" />
                </motion.div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
