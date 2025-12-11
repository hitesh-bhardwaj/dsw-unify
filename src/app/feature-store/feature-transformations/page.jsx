"use client";

import React, { useState, useMemo } from "react";
import { ScaleDown } from "@/components/animations/Animations";
import { PlusIcon, FeatureTransformationIcon } from "@/components/Icons";
import SearchBar from "@/components/search-bar";
import { Button } from "@/components/ui/button";
import { RippleButton } from "@/components/ui/ripple-button";
import Link from "next/link";
import FilterBar from "@/components/FeatureStore/feature-transformation/TransformationFilter";
import { FeatureCard } from "@/components/FeatureStore/feature-transformation/feature-card";
import StepFormModal from "@/components/common/StepModalForm";
import BasicInfo from "@/components/FeatureStore/feature-transformation/create-transformation/BasicInfo";
import TransformLogic from "@/components/FeatureStore/feature-transformation/create-transformation/TransformLogic";
import { motion, AnimatePresence } from "framer-motion";
import CountUp from "@/components/animations/CountUp";

const Features = [
  {
    id: 1,
    name: "Calculate Age from DOB",
    icon: FeatureTransformationIcon,
    description: "Calculates age in years from date of birth",
    tags: ["demographics", "age"],
    inputParams: [
      {
        name: "column",
        type: "string",
        required: "Yes",
        description: "Column to encode",
      },
      {
        name: "categories",
        type: "array",
        required: "Yes",
        description: "List of categories",
      },
    ],
    codeExamples: `def calculate_age(dob):
    today = datetime.now()
    return (today - dob).days // 365`,
    lastUpdated: "2 Hours Ago",
    createdAt: "2024-01-12",
    variant: "light",
  },
  {
    id: 2,
    name: "One-Hot Encoding",
    icon: FeatureTransformationIcon,
    description: "Converts categorical variable into binary columns",
    tags: ["encoding", "categorical"],
    inputParams: [
      {
        name: "column",
        type: "string",
        required: "Yes",
        description: "Column to encode",
      },
      {
        name: "categories",
        type: "array",
        required: "Yes",
        description: "List of categories",
      },
    ],
    codeExamples: `def one_hot_encode(column, categories): 
encoded = {} 
for cat in categories: 
encoded[f'{column}_{cat}'] = (column == cat).astype(int) 
return encoded`,
    lastUpdated: "2 days Ago",
    createdAt: "2024-01-12",
    variant: "light",
  },
  {
    id: 3,
    name: "Rolling Average 7 Days",
    icon: FeatureTransformationIcon,
    description: "Calculates 7-day rolling average for time series data",
    tags: ["timeseries", "aggregation"],
    inputParams: [
      {
        name: "column",
        type: "string",
        required: "Yes",
        description: "Column to encode",
      },
      {
        name: "categories",
        type: "array",
        required: "Yes",
        description: "List of categories",
      },
    ],
    codeExamples: `SELECT  
      date, 
      AVG(value) OVER (....`,
    createdAt: "2024-01-12",
    lastUpdated: "2 Hours Ago",
    variant: "light",
  },
  {
    id: 4,
    name: "Sum Aggregation",
    icon: FeatureTransformationIcon,
    description: "Calculates sum of values grouped by key",
    tags: ["aggregation", "sum"],
    codeExamples: `SELECT  
      group_key, 
      SUM(value) as total...`,
    lastUpdated: "4 Days Ago",
    createdAt: "2024-01-12",
    variant: "light",
  },
];

const stats = [
  { title: "Total Transformations", value: "04" },
  { title: "Active Transformations", value: "04" },
  { title: "Transformation Types", value: "07" },
];

const Page = () => {
  const [query, setQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);
  const [view, setView] = useState("grid"); 
  const [sortOrder, setSortOrder] = useState("none");

  // Get all unique tags from features
  const availableTags = useMemo(() => {
    const tags = new Set();
    Features.forEach((feature) => {
      feature.tags?.forEach((tag) => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, []);

  const steps = [
    {
      id: "basic",
      label: "Basic Info",
      required: true,
      element: <BasicInfo setIsModalOpen={setIsModalOpen} />,
    },
    {
      id: "logic",
      label: "Transformation Logic",
      required: false,
      element: <TransformLogic />,
    },
  ];

  let filteredFeatures = Features.filter((feature) => {
  const matchesSearch = feature.name.toLowerCase().includes(query.toLowerCase());
  const matchesTags =
    selectedTags.length === 0 ||
    selectedTags.some((tag) => feature.tags?.includes(tag));

  return matchesSearch && matchesTags;
});

//  APPLY SORTING ONLY IF USER SELECTED SOMETHING
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
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <h1 className="text-3xl font-medium text-foreground">
                  Feature Transformations
                </h1>
                <p className="text-sm dark:text-foreground text-black/60">
                  Reusable transformation library for feature engineering
                </p>
              </div>

              <Link href="#">
                <RippleButton>
                  <Button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-sidebar-primary hover:bg-[#E64A19] text-white gap-3 rounded-full !px-6 !py-6 !cursor-pointer duration-300"
                  >
                    <PlusIcon />
                    Create Transformation
                  </Button>
                </RippleButton>
              </Link>
            </div>

            <div className="w-full  flex items-center justify-between gap-4">
              {stats.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col gap-6 border border-border-color-0 rounded-lg py-6 px-4 w-full"
                >
                  <span className="text-sm text-foreground/80">
                    {item.title}
                  </span>
                  <span className="text-4xl font-medium mt-2">
                    <CountUp value={item.value} startOnView/>
                  </span>
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              <div className="relative flex-1">
                <SearchBar
                  placeholder="Search by name, description or code ..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>
            </div>
            <div>
              <FilterBar
                selectedTags={selectedTags}
                onTagsChange={setSelectedTags}
                availableTags={availableTags}
                view={view}
                setView={setView}
                sortOrder={sortOrder}
                setSortOrder={setSortOrder}
              />
            </div>

            
            <AnimatePresence mode="wait">
  <motion.div
    key={view} // This triggers re-animation when view changes
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.3 }}
    className={`items-stretch ${
      view === "grid"
        ? "grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 "
        : "flex flex-col gap-5"
    }`}
  >
    {filteredFeatures.map((feature) => (
      <FeatureCard key={feature.id} view={view} feature={feature} />
    ))}
    {filteredFeatures.length === 0 && (
      <div className="flex h-64 items-center justify-center text-gray-500">
        No Features found matching "{query}"
      </div>
    )}
  </motion.div>
</AnimatePresence>
          </div>
        </ScaleDown>
      </div>

      <StepFormModal
        title="Create Feature Transformation"
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        steps={steps}
      />
    </>
  );
};

export default Page;
