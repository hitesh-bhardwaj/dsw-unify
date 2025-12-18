"use client";
import React, { useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { ScaleDown } from "@/components/animations/Animations";
import LeftArrowAnim from "@/components/animations/LeftArrowAnim";
import { RippleButton } from "@/components/ui/ripple-button";
import { Button } from "@/components/ui/button";
import { DataEngineeringIcon } from "@/components/Icons";
import { cn } from "@/lib/utils";
import UsecaseInternalCard from "@/components/usecases/UsecaseInternalCard";
import SearchBar from "@/components/search-bar";
import { Badge } from "@/components/ui/badge";
import { PlusIcon } from "@/components/Icons";
import Link from "next/link";
import CountUp from "@/components/animations/CountUp";
import CreateModel from "@/components/usecases/model/CreateModelPopup";

import FilterBar from "@/components/FeatureStore/feature-transformation/TransformationFilter";
import { motion, AnimatePresence } from "framer-motion";

  const modelsData = [
    {
      id: 1,
      ModelSlug: "fraud-detector",
      name: "Fraud Detector",
      icon: DataEngineeringIcon,
      description:
        "Advanced fraud detection using ensemble methods and anomaly detection",
      tags: ["fraud", "classification", "ensemble"],
      versions: 3,
      features: 28,
      status: "Deployed",
      lastUpdated: "January 16, 2025",
      createdAt: "2025-01-16",
      variant: "light",
    },
    {
      id: 2,
      name: "Claims Anomaly Detector",
      icon: DataEngineeringIcon,
      description:
        "Unsupervised anomaly detection for suspicious claim patterns",
      ModelSlug: "claims-anomaly-detector",
      tags: ["anomaly detection", "unsupervised"],
      versions: 2,
      features: 24,
      status: "Undeployed",
      lastUpdated: "January 12, 2025",
      createdAt: "2025-01-12",
      variant: "light",
    },
    {
      id: 3,
      name: "Fraud Risk Scorer",
      ModelSlug: "fraud-risk-scorer",
      icon: DataEngineeringIcon,
      description: "Risk scoring model for fraud probability assessment",
      tags: ["anomaly detection", "unsupervised"],
      versions: 4,
      features: 35,
      status: "Deployed",
      lastUpdated: "January 8, 2025",
      createdAt: "2025-01-08",
      variant: "light",
    },
    {
      id: 4,
      name: "Pattern Recognition Model",
      icon: DataEngineeringIcon,
      ModelSlug: "pattern-recognition-model",
      description: "Pattern recognition for identifying fraud indicators",
      tags: ["pattern recognition", "deep learning"],
      versions: 2,
      features: 32,
      status: "Deployed",
      lastUpdated: "January 5, 2025",
      createdAt: "2025-01-05",
      variant: "light",
    },
  ];

const page = () => {
  const { id } = useParams();

  const [query, setQuery] = useState("");

  const [selectedTags, setSelectedTags] = useState([]);
  const [view, setView] = useState("grid");
  const [sortOrder, setSortOrder] = useState("none");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [models, setModels] = useState(modelsData);

const handleDeleteModel = (modelId) => {
  setModels((prev) => prev.filter((m) => m.id !== modelId));
};

  

  const usecase = {
    id: id,
    name: "Claims Fraud Detection",
    description:
      "Identify fraudulent insurance claims using ML pattern recognition and anomaly detection",
    status: "active",
    tags: ["claims", "fraud detection", "auto insurance"],
    owner: "Shivam Thakkar",
    lastModified: "2 Hours Ago",
    usage: "1.2K Request",
    stats: [
      { title: "Owner", value: "Shivam Thakkar", description: "Use case owner" },
      { title: "Total Models", value: "04", description: "ML models in usecase" },
      { title: "Deployed", value: "03", description: "Models in production" },
    ],
  };



  //  Convert slug to title
  function slugToTitle(slug) {
    if (!slug) return "";
    return slug
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
  }
  const title = slugToTitle(id);

  //  Collect unique tags from models for filtering
  const availableTags = useMemo(() => {
    const setTags = new Set();
    models.forEach((m) => m.tags?.forEach((t) => setTags.add(t)));
    return Array.from(setTags).sort();
  }, []);

  //  FILTER: search + tags
  let filteredModels = models.filter((model) => {
    const matchesSearch = model.name.toLowerCase().includes(query.toLowerCase());

    const matchesTags =
      selectedTags.length === 0 ||
      selectedTags.some((tag) => model.tags?.includes(tag));

    return matchesSearch && matchesTags;
  });

  //  SORTING
  if (sortOrder === "asc") {
    filteredModels = [...filteredModels].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
  } else if (sortOrder === "desc") {
    filteredModels = [...filteredModels].sort((a, b) =>
      b.name.localeCompare(a.name)
    );
  }

  return (
    <>
      <div className="flex flex-col h-full">
        <ScaleDown>
          <div className="bg-background p-6 space-y-8">
            {/* HEADER */}
            <div className="flex items-center justify-between">
              <div className="flex gap-3">
                <LeftArrowAnim link={"/ai-studio/use-cases/"} />
                <div className="space-y-1">
                  <div className="flex gap-3 items-center">
                    <h1 className="text-xl font-medium">{title}</h1>

                    <div className="flex flex-wrap gap-1 ">
                      {usecase.tags.map((tag, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className={cn(
                            "rounded-full border border-border-color-0 px-3 py-1 bg-white dark:bg-background text-xs font-light transition-all duration-500 ease-out dark:group-hover:bg-background"
                          )}
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 pl-0.5 dark:text-foreground">
                    {usecase.description}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Link href={`#`}>
                  <RippleButton>
                    <Button onClick={() => setIsModalOpen(true)} className="bg-sidebar-primary hover:bg-[#E64A19] text-white gap-3 rounded-full !px-6 !py-6 !cursor-pointer duration-300">
                      <PlusIcon />
                      Create Model
                    </Button>
                  </RippleButton>
                </Link>
              </div>
            </div>

            <div className="w-full flex items-center justify-between gap-4">
              {usecase.stats.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col gap-3 border border-border-color-0 rounded-3xl py-6 px-4 w-full dark:bg-card"
                >
                  <span className="text-sm text-foreground/80">
                    {item.title}
                  </span>
                  <span className="text-2xl font-medium mt-1">
                    {index==0 ? `${item.value}` : <CountUp value={item.value} startOnView /> }
                  </span>
                  <span className="text-sm font-normal">
                    {item.description}
                  </span>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-medium">Models</h2>

              <div className="flex gap-2">
                <div className="relative flex-1">
                  <SearchBar
                    placeholder="Search by name, description, or tags..."
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
                cards={models}
              />
            </div>

            {/* MODEL GRID / LIST */}
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
                {filteredModels.map((item, index) => (
                  <UsecaseInternalCard key={item.id} view={view} index={index} usecase={item} slug={id} onDelete={handleDeleteModel} />
                ))}

                {filteredModels.length === 0 && (
                  <div className="flex h-64 items-center justify-center text-gray-500">
                  
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </ScaleDown>
      </div>
       <CreateModel open={isModalOpen} onOpenChange={setIsModalOpen} />
    </>
  );
};

export default page;
