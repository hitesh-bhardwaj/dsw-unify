"use client";
import React, { useState, useMemo } from "react";
import { useParams } from "next/navigation";
import { ScaleDown } from "@/components/animations/Animations";
import LeftArrowAnim from "@/components/animations/LeftArrowAnim";
import { RippleButton } from "@/components/ui/ripple-button";
import { Button } from "@/components/ui/button";
import { VersionsIcon } from "@/components/Icons";
import { cn } from "@/lib/utils";
import VersionUsecaseCard from "@/components/usecases/VersionUsecaseCard";
import SearchBar from "@/components/search-bar";
import { Badge } from "@/components/ui/badge";
import { PlusIcon } from "@/components/Icons";
import Link from "next/link";
import CardDetails from "@/components/CardDetails";
import FilterBar from "@/components/FeatureStore/feature-transformation/TransformationFilter";
import { motion, AnimatePresence } from "framer-motion";

const page = () => {
  const params = useParams();
  const { id: routeId, modelId } = params;

  const [query, setQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [view, setView] = useState("grid");
  const [sortOrder, setSortOrder] = useState("none");

  const versions = [
    {
      id: 3,
      name: "V1",
      versionSlug: "version-1",
      icon: VersionsIcon,
      description: "Initial version with basic random forest classifier",
      tags: ["fraud", "classification", "baseline"],
      versions: 1,
      features: 20,
      status: "Deployed",
      accuracy: "96.3%",
      lastUpdated: "January 10, 2025",
      createdAt: "2025-01-10",
      variant: "light",
    },
    {
      id: 2,
      name: "V2",
      versionSlug: "version-2",
      icon: VersionsIcon,
      description: "Previous production version with gradient boosting",
      tags: ["fraud", "classification"],
      versions: 2,
      features: 25,
      status: "Deployed",
      accuracy: "96.3%",
      lastUpdated: "January 10, 2025",
      createdAt: "2025-01-10",
      variant: "light",
    },
    {
      id: 1,
      name: "V3",
      versionSlug: "version-3",
      icon: VersionsIcon,
      description:
        "Latest version with improved ensemble methods and feature engineering",
      tags: ["fraud", "classification", "ensemble"],
      versions: 3,
      features: 28,
      status: "Deployed",
      accuracy: "96.3%",
      lastUpdated: "January 16, 2025",
      createdAt: "2025-01-16",
      variant: "light",
    },
  ];

  const versionsData = {
    id: routeId,
    name: "Fraud Detector",
    description:
      "Advanced fraud detection using ensemble methods and anomaly detection",
    status: "active",
    tags: ["fraud", "classification", "ensemble"],
    owner: "Shivam Thakkar",
    lastModified: "2 Hours Ago",
    usage: "1.2K Request",
    stats: [
      { title: "Owner", value: "Shivam Thakkar", description: "Model owner" },
      { title: "Total Versions", value: "3", description: "model versions" },
      { title: "Undeploy", value: "3", description: "Versions in production" },
    ],
  };

  // Convert slug to Title
  const slugToTitle = (slug) =>
    slug
      ?.split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");

  const title = slugToTitle(modelId);

  //  FILTER: Collect unique tags
  const availableTags = useMemo(() => {
    const s = new Set();
    versions.forEach((v) => v.tags?.forEach((t) => s.add(t)));
    return Array.from(s).sort();
  }, []);

  // -----------------------------------------
  //  SEARCH + TAG FILTERING
  // -----------------------------------------
  let filteredVersions = versions.filter((v) => {
    const matchesSearch =
      v.name.toLowerCase().includes(query.toLowerCase()) ||
      v.description.toLowerCase().includes(query.toLowerCase());

    const matchesTags =
      selectedTags.length === 0 ||
      selectedTags.some((tag) => v.tags?.includes(tag));

    return matchesSearch && matchesTags;
  });

  // -----------------------------------------
  //  SORTING
  // -----------------------------------------
  if (sortOrder === "asc") {
    filteredVersions = [...filteredVersions].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
  } else if (sortOrder === "desc") {
    filteredVersions = [...filteredVersions].sort((a, b) =>
      b.name.localeCompare(a.name)
    );
  }

  return (
    <div className="flex flex-col h-full">
      <ScaleDown>
        <div className="bg-background p-6 space-y-8">
          <div className="flex items-center justify-between">
            <div className="flex gap-3">
              <LeftArrowAnim link={`/ai-studio/use-cases/${routeId}`} />

              <div className="space-y-1">
                <div className="flex gap-3 items-center">
                  <h1 className="text-xl font-medium">{title}</h1>

                  <div className="flex flex-wrap gap-1 ">
                    {versionsData.tags.map((tag, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className={cn(
                          "rounded-full border border-color-2 px-3 py-1 bg-white dark:bg-background text-xs font-light transition-all duration-500 ease-out dark:group-hover:bg-background"
                        )}
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-foreground pl-0.5">
                  {versionsData.description}
                </p>
              </div>
            </div>

            <Link href="#">
              <RippleButton>
                <Button className="bg-sidebar-primary hover:bg-[#E64A19] text-white gap-3 !cursor-pointer rounded-full !px-6 !py-6 duration-300">
                  <PlusIcon />
                  Create Version
                </Button>
              </RippleButton>
            </Link>
          </div>

          <CardDetails data={versionsData.stats} />

          <div className="space-y-4">
            <h2 className="text-2xl font-medium">Versions</h2>

            {/* SEARCH + FILTERBAR */}
            <div className="flex gap-2">
              <div className="relative flex-1">
                <SearchBar
                  placeholder="Search by name, description, table or features..."
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
          </div>

          {/* GRID / LIST VIEW */}
          <AnimatePresence mode="wait">
            <motion.div
              key={view}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className={
                view === "grid"
                  ? "grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-stretch"
                  : "flex flex-col gap-5"
              }
            >
              {filteredVersions.map((item) => (
                <VersionUsecaseCard key={item.id} view={view} usecase={item} />
              ))}

              {filteredVersions.length === 0 && (
                <div className="flex h-64 items-center justify-center text-gray-500">
                  No Versions found matching "{query}"
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </ScaleDown>
    </div>
  );
};

export default page;
