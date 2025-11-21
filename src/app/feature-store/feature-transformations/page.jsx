"use client";
import { ScaleDown } from "@/components/animations/Animations";
import { PlusIcon } from "@/components/Icons";
import SearchBar from "@/components/search-bar";
import { Button } from "@/components/ui/button";
import { RippleButton } from "@/components/ui/ripple-button";
import Link from "next/link";
import React, { useState } from "react";
import { Tune, SynthWave } from "@/components/Icons";

import { FeatureCard } from "@/components/FeatureStore/feature-transformation/feature-card";
import TransformationModal from "@/components/FeatureStore/feature-transformation/transformation-modal";
const Features = [
  {
    id: 1,
    name: "Calculate Age from DOB",
    icon: SynthWave,
    description: "Calculates age in years from date of birth",
    tags: ["demographics","age"],
 inputParams : [
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
    createdAt:"2024-01-12",
    variant: "light",
  },
  {
    id: 2,
    name: "One-Hot Encoding",
    icon: SynthWave,
    description: "Converts categorical variable into binary columns",
    tags: [ "encoding", "categorical"],
     inputParams : [
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
    createdAt:"2024-01-12",
    variant: "light",
  },
  {
    id: 3,
    name: "Rolling Average 7 Days",
    icon: SynthWave,
    description: "Calculates 7-day rolling average for time series data",
    tags: ["timeseries", "aggregation"],
     inputParams : [
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
          createdAt:"2024-01-12",
    lastUpdated: "2 Hours Ago",
    variant: "light",
  },
  {
    id: 4,
    name: "Sum Aggregation",
    icon: SynthWave,
    description: "Calculates sum of values grouped by key",
    tags: ["aggregation","sum"],
    codeExamples: `SELECT  
      group_key, 
      SUM(value) as total...`,
    lastUpdated: "4 Days Ago",
        createdAt:"2024-01-12",
    variant: "light",
  },
];

const page = () => {
  const [query, setQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredFeatures = Features.filter((feature) =>
    feature.name.toLowerCase().includes(query.toLowerCase())
  );
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
                  <Button   onClick={() => setIsModalOpen(true)} className="bg-sidebar-primary hover:bg-[#E64A19] text-white gap-3 rounded-full !px-6 !py-6 !cursor-pointer duration-300">
                    <PlusIcon />
                    Create Transformation
                  </Button>
                </RippleButton>
              </Link>
            </div>
            <div className="flex gap-3">
              <div className="relative flex-1">
                <SearchBar
                  placeholder="Search features..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>
              <RippleButton className={"rounded-lg"}>
                <Button
                  variant="outline"
                  className="gap-2 border-border-color-1 text-foreground hover:bg-sidebar-accent duration-300 px-4 text-xs rounded-lg"
                >
                  <div className="w-4 h-4">
                    <Tune />
                  </div>
                  Filters
                </Button>
              </RippleButton>
            </div>

            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-stretch">
              {filteredFeatures.map((feature) => (
                <FeatureCard key={feature.id} feature={feature} />
              ))}
              {filteredFeatures.length === 0 && (
                <div className="flex h-64 items-center justify-center text-gray-500">
                  No Features found matching "{query}"
                </div>
              )}
            </div>
          </div>
        </ScaleDown>
      </div>
      <TransformationModal
      open={isModalOpen}
      onOpenChange={setIsModalOpen}
      />
    </>
  );
};

export default page;
