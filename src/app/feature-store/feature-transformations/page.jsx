"use client";

import React, { useState, useMemo, useEffect } from "react";
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
import * as transformationsApi from "@/lib/api/transformations";

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

  // API state
  const [transformations, setTransformations] = useState(Features);
  const [statsData, setStatsData] = useState(stats);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleDeleteFeature = (id) => {
    setTransformations((prev) => prev.filter((t) => t.id !== id));
  };

  // Fetch transformations and stats
  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        setError(null);

        const [transformationsData, statsResponse] = await Promise.all([
          transformationsApi.getTransformations(),
          transformationsApi.getTransformationStats(),
        ]);

        setTransformations(transformationsData);
        setStatsData([
          {
            title: "Total Transformations",
            value: statsResponse.totalTransformations,
          },
          {
            title: "Active Transformations",
            value: statsResponse.activeTransformations,
          },
          {
            title: "Transformation Types",
            value: statsResponse.transformationTypes,
          },
        ]);
      } catch (err) {
        setError(err.message || "Failed to load transformations");
        console.error("Transformations error:", err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  // Get all unique tags from features
  const availableTags = useMemo(() => {
    const tags = new Set();
    transformations.forEach((feature) => {
      feature.tags?.forEach((tag) => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, [transformations]);

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
      element: (
        <TransformLogic
          setIsModalOpen={setIsModalOpen}
          onCloseModal={setIsModalOpen}
        />
      ),
    },
  ];

  let filteredFeatures = transformations.filter((feature) => {
    const matchesSearch = feature.name
      .toLowerCase()
      .includes(query.toLowerCase());
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
              {isLoading
                ? // Loading skeleton
                  Array.from({ length: 3 }).map((_, index) => (
                    <div
                      key={index}
                      className="flex flex-col gap-6 border border-border-color-0 rounded-lg py-6 px-4 w-full animate-pulse "
                    >
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
                      <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                    </div>
                  ))
                : statsData.map((item, index) => (
                    <div
                      key={index}
                      className="flex flex-col bg-white gap-6 border border-border-color-0 rounded-lg py-6 px-4 w-full dark:bg-card"
                    >
                      <span className="text-sm text-foreground/80">
                        {item.title}
                      </span>
                      <span className="text-4xl font-medium mt-2">
                        <CountUp value={item.value} startOnView />
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
                cards={transformations}
              />
            </div>

            {/* Error State */}
            {error && (
              <div className="p-4 text-center text-destructive bg-destructive/10 border border-destructive/20 rounded-md">
                <p className="font-medium">Failed to load transformations</p>
                <p className="text-sm mt-2">{error}</p>
              </div>
            )}

            {/* Loading State */}
            {isLoading && !error && (
              <div
                className={`items-stretch ${
                  view === "grid"
                    ? "grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                    : "flex flex-col gap-5"
                }`}
              >
                {Array.from({ length: 6 }).map((_, index) => (
                  <div
                    key={index}
                    className="border border-border-color-0 rounded-lg p-6 animate-pulse"
                  >
                    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
                  </div>
                ))}
              </div>
            )}

            {/* Content */}
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
                      ? "grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 "
                      : "flex flex-col gap-5"
                  }`}
                >
                  {filteredFeatures.map((feature, index) => (
                    <FeatureCard
                      key={feature.id}
                      view={view}
                      feature={feature}
                      index={index}
                      onDelete={handleDeleteFeature}
                    />
                  ))}

                  {filteredFeatures.length === 0 && (
                    <div className="flex h-64 items-center justify-center text-gray-500"></div>
                  )}
                </motion.div>
              </AnimatePresence>
            )}
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
