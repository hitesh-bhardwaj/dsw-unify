"use client";
import { ScaleDown } from "@/components/animations/Animations";
import { PlusIcon, UseCasesIcon } from "@/components/Icons";
import SearchBar from "@/components/search-bar";
import { Button } from "@/components/ui/button";
import { RippleButton } from "@/components/ui/ripple-button";
import Link from "next/link";
import React, { useMemo, useState } from "react";
import { Tune } from "@/components/Icons";
import { UseCaseCard } from "@/components/usecases/usecase-card";
import UseCaseModal from "@/components/usecases/UsecaseModal";
import CountUp from "@/components/animations/CountUp";
import FilterBar from "@/components/FeatureStore/feature-transformation/TransformationFilter";
import { motion, AnimatePresence } from "framer-motion";

const Features = [
  {
    id: 1,
    slug: "claims-fraud-detection",
    name: "Claims Fraud Detection",
    icon: UseCasesIcon,
    description:
      "Identify fraudulent insurance claims using ML pattern recognition and anomaly detection",
    tags: ["claims", "fraud detection", "auto insurance"],
    models: "4",
    lastUpdated: "January 15, 2025",
    peopleCount: "2",
    createdAt: "2025-11-18",
    variant: "light",
  },
  {
    id: 2,
    name: "Risk Assessment & Underwriting",
    slug: "risk-assessment-underwriting",
    icon: UseCasesIcon,
    description:
      "Automated risk scoring and premium calculation for policy underwriting decisions",
    tags: ["claims", "history", "fraud"],
    models: "3",
    lastUpdated: "5 hours ago",
    peopleCount: "2",
    createdAt: "December 8, 2024",
    variant: "light",
  },
  {
    id: 3,
    name: "Customer Churn Prediction",
    slug: "customer-churn-prediction",
    icon: UseCasesIcon,
    description:
      "Predict policyholder churn and identify retention opportunities across all lines of business",
    tags: ["policy", "coverage", "premium"],
    models: "2",
    peopleCount: "1",
    lastUpdated: "November 22, 2024",
    createdAt: "2025-11-18",
    variant: "light",
  },
  {
    id: 4,
    name: "Claims Processing Automation",
    slug: "claims-processing-automation",
    icon: UseCasesIcon,
    description:
      "Identify fraudulent insurance claims using ML pattern recognition and anomaly detection",
    tags: ["auto", "vehicle", "risk"],
    models: "4",
    peopleCount: "3",
    lastUpdated: "January 15, 2025",
    createdAt: "2025-11-18",
    variant: "light",
  },
  {
    id: 5,
    name: "Subrogation Recovery",
    slug: "subrogation-recovery",
    icon: UseCasesIcon,
    description:
      "Automated risk scoring and premium calculation for policy underwriting decisions",
    tags: ["claims", "history", "fraud"],
    models: "3",
    peopleCount: "2",
    lastUpdated: "December 8, 2024",
    createdAt: "2025-11-18",
    variant: "light",
  },
  {
    id: 6,
    name: "Premium Pricing Optimization",
    slug: "premium-pricing-ptimization",
    icon: UseCasesIcon,
    description:
      "Predict policyholder churn and identify retention opportunities across all lines of business",
    tags: ["policy", "coverage", "premium"],
    models: "2",
    peopleCount: "1",
    lastUpdated: "November 22, 2024",
    createdAt: "2025-11-18",
    variant: "light",
  },
  {
    id: 7,
    name: "Natural Catastrophe Modeling",
    slug: "natural-catastrophe-modeling",
    icon: UseCasesIcon,
    description:
      "Identify fraudulent insurance claims using ML pattern recognition and anomaly detection",
    tags: ["claims", "fraud detection", "auto insurance"],
    models: "4",
    peopleCount: "3",
    lastUpdated: "January 15, 2024",
    createdAt: "2025-11-18",
    variant: "light",
  },
];

const stats = [
  { title: "Total Use Cases", value: 7, description: "Active business use cases" },
  { title: "Total Models", value: 23, description: "Across all use cases" },
  { title: "Total Contributors", value: 13, description: "Unique contributors" },
];

const page = () => {
  const [query, setQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

 
  const [selectedTags, setSelectedTags] = useState([]);
  const [view, setView] = useState("grid");
  const [sortOrder, setSortOrder] = useState("none");

  //  Get available tags dynamically
  const availableTags = useMemo(() => {
    const tags = new Set();
    Features.forEach((f) => f.tags?.forEach((t) => tags.add(t)));
    return Array.from(tags).sort();
  }, []);

  //  Search + Tag Filtering
  let filteredFeatures = Features.filter((feature) => {
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
              {stats.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col gap-3 border border-border-color-0 rounded-lg py-6 px-4 w-full"
                >
                  <span className="text-sm text-foreground/80">{item.title}</span>
                  <span className="text-4xl font-medium mt-1">
                    <CountUp value={item.value} startOnView />
                  </span>
                  <span className="text-xs font-normal">{item.description}</span>
                </div>
              ))}
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
            />

            {/* USE CASE CARDS (GRID / LIST) */}
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
                  <UseCaseCard key={feature.id} feature={feature} view={view} index={index} />
                ))}

                {filteredFeatures.length === 0 && (
                  <div className="flex h-64 items-center justify-center text-gray-500">
                    No Use Cases found matching "{query}"
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </ScaleDown>
      </div>

      {/* MODAL */}
      <UseCaseModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </>
  );
};

export default page;
