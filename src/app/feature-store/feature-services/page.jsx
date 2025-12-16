"use client";
import { ScaleDown } from "@/components/animations/Animations";
import { FeatureServicesIcon, PlusIcon } from "@/components/Icons";
import SearchBar from "@/components/search-bar";
import { Button } from "@/components/ui/button";
import { RippleButton } from "@/components/ui/ripple-button";
import Link from "next/link";
import React, { useMemo, useState, useEffect } from "react";
import { Tune } from "@/components/Icons";
import StepFormModal from "@/components/common/StepModalForm";
import BasicInfo from "@/components/FeatureStore/feature-services/BasicInfo";
import SelectFeatureViews from "@/components/FeatureStore/feature-services/SelectFeatureViews";
import CountUp from "@/components/animations/CountUp";
import { ServiceCard } from "@/components/FeatureStore/feature-services/ServiceCard";
import FilterBar from "@/components/FeatureStore/feature-transformation/TransformationFilter";
import { motion, AnimatePresence } from "framer-motion";
import * as featureServicesApi from "@/lib/api/feature-services";

const Features = [
  {
    id: 1,
    name: "Claims Fraud Detection Service",
    icon: FeatureServicesIcon,
    description:
      "Demographic features including age, location, credit score, marital status, and employment",
    tags: ["demographics", "policyholder", "underwriting"],
    featureNo: "64",
    lastUpdated: "2 days Ago",
    viewsCount: "2",
    variant: "light",
  },
  {
    id: 2,
    name: "Risk Assessment Service",
    icon: FeatureServicesIcon,
    description:
      "Historical claims features with aggregations including claim frequency, amounts, and types",
    tags: ["claims", "history", "fraud"],
    featureNo: "76",
    lastUpdated: "5 hours ago",
    viewsCount: "3",
    variant: "light",
  },
  {
    id: 3,
    name: "Customer Churn Prediction Service",
    icon: FeatureServicesIcon,
    description:
      "Policy-level features including coverage amounts, deductibles, premiums, and policy tenure",
    tags: ["policy", "coverage", "premium"],
    featureNo: "16",
    viewsCount: "2",
    lastUpdated: "1 day ago",
    variant: "light",
  },
  {
    id: 4,
    name: "Premium Pricing Service",
    icon: FeatureServicesIcon,
    description:
      "Auto insurance vehicle features including make, model, year, mileage, and safety ratings",
    tags: ["auto", "vehicle", "risk"],
    featureNo: "14",
    viewsCount: "2",
    lastUpdated: "3 Days Ago",
    variant: "light",
  },
  {
    id: 5,
    name: "Auto Insurance Underwriting Service",
    icon: FeatureServicesIcon,
    description:
      "Home insurance property features including type, age, construction, location risk, and security",
    tags: ["property", "home", "risk"],
    featureNo: "20",
    viewsCount: "3",
    lastUpdated: "1 week ago",
    variant: "light",
  },
  {
    id: 6,
    name: "Home Insurance Underwriting Service",
    icon: FeatureServicesIcon,
    description:
      "Comprehensive risk assessment features including driving record, credit score, and location hazards",
    tags: ["risk", "underwriting", "assessment"],
    featureNo: "22",
    viewsCount: "4",
    lastUpdated: "4 days ago",
    variant: "light",
  },
];

const stats = [
  { title: "Total Feature Services", value: "06" },
  { title: "Total Featured Views", value: 21 },
  { title: "Total Fatures", value: 400 },
];

const page = () => {
  const [query, setQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedTags, setSelectedTags] = useState([]);
  const [view, setView] = useState("grid");
  const [sortOrder, setSortOrder] = useState("none");

  // API state
  const [featureServices, setFeatureServices] = useState(Features);
  const [statsData, setStatsData] = useState(stats);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleDeleteService = (id) => {
    setFeatureServices((prev) => prev.filter((s) => s.id !== id));
  };

  // Fetch feature services and stats
  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        setError(null);

        const [servicesData, statsResponse] = await Promise.all([
          featureServicesApi.getFeatureServices(),
          featureServicesApi.getFeatureServiceStats(),
        ]);

        setFeatureServices(servicesData);
        setStatsData([
          {
            title: "Total Feature Services",
            value: statsResponse.totalFeatureServices,
          },
          {
            title: "Total Featured Views",
            value: statsResponse.totalFeaturedViews,
          },
          { title: "Total Features", value: statsResponse.totalFeatures },
        ]);
      } catch (err) {
        setError(err.message || "Failed to load feature services");
        console.error("Feature services error:", err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
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
      label: "Select Views",
      required: false,
      element: <SelectFeatureViews />,
    },
  ];

  //  Compute available tags from services
  const availableTags = useMemo(() => {
    const tags = new Set();
    featureServices.forEach((feature) => {
      feature.tags?.forEach((tag) => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, [featureServices]);

  //  Apply Search + Tag Filter
  let filteredFeatures = featureServices.filter((feature) => {
    const matchesSearch = feature.name
      .toLowerCase()
      .includes(query.toLowerCase());
    const matchesTags =
      selectedTags.length === 0 ||
      selectedTags.some((tag) => feature.tags?.includes(tag));

    return matchesSearch && matchesTags;
  });

  //  Apply Sorting
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
                  Feature Services
                </h1>
                <p className="text-sm dark:text-foreground text-black/60">
                  Group feature views for model consumption
                </p>
              </div>

              <Link href="#">
                <RippleButton>
                  <Button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-sidebar-primary hover:bg-[#E64A19] text-white gap-3 rounded-full !px-6 !py-6 !cursor-pointer duration-300"
                  >
                    <PlusIcon />
                    Create Feature Service
                  </Button>
                </RippleButton>
              </Link>
            </div>

            <div className="w-full flex items-center justify-between gap-4">
              {isLoading
                ? Array.from({ length: 3 }).map((_, index) => (
                    <div
                      key={index}
                      className="flex flex-col gap-6 border border-border-color-0 rounded-lg py-6 px-4 w-full animate-pulse"
                    >
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
                      <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                    </div>
                  ))
                : statsData.map((item, index) => (
                    <div
                      key={index}
                      className="flex flex-col gap-6 border border-border-color-0 rounded-lg py-6 px-4 w-full dark:bg-card"
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

            <div className="flex gap-2">
              <div className="relative flex-1">
                <SearchBar
                  placeholder="Search services by name, tags..."
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
              cards={featureServices}
            />

            {/* Error State */}
            {error && (
              <div className="p-4 text-center text-destructive bg-destructive/10 border border-destructive/20 rounded-md">
                <p className="font-medium">Failed to load feature services</p>
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

            {/* ---------- SERVICE CARDS (GRID/LIST) ---------- */}
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
                    <ServiceCard
                      key={feature.id}
                      feature={feature}
                      view={view}
                      index={index}
                      onEditPopupOpen={setIsModalOpen}
                      onDelete={handleDeleteService}
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
        title="Create Feature Service"
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        steps={steps}
      />
    </>
  );
};

export default page;
