"use client";
import React, { useState } from "react";
import { AppLayout } from "@/components/app-layout";
import { FadeUp } from "@/components/animations/Animations";
import { SectionHeader } from "@/components/home/section-header";
import { FeatureCard } from "@/components/home/feature-card";
import { ScaleDown } from "@/components/animations/Animations";
import SearchBar from "@/components/search-bar";
import {
  SynthWave,
  DataExplorerIcon,
  DataVisualizationIcon,
  DataValidationIcon,
} from "@/components/Icons";

const dataEngineeringFeatures = [
  {
    icon: SynthWave,
    title: "Relational & Vector Data",
    description:
      "Explore SQL databases and vector embeddings with powerful query tools",
    href: "/data-engineering/ingestion",
  },
  {
    icon: DataExplorerIcon,
    title: "Graph Data",
    description:
      "Visualize and explore graph relationships and network structures",
    href: "/data-engineering/explorer",
  },
  {
    icon: DataVisualizationIcon,
    title: "Object Storage",
    description: "Browse and analyze files stored in cloud object storage",
    href: "/data-engineering/visualization",
  },
];

const page = () => {
  const [query, setQuery] = useState("");

  const filteredDataEngineering = dataEngineeringFeatures.filter(
    (f) =>
      f.title.toLowerCase().includes(query.toLowerCase()) ||
      f.description.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full w-full overflow-hidden">
      <ScaleDown>
        <div className="space-y-6 p-6">
          {/* Search Bar */}
          {/* <FadeUp delay={0.03}> */}
          <SectionHeader
            title="Data Explorer"
            description="Explore and analyze your datasets across different storage types"
          />
          <SearchBar
            placeholder="Search ..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {/* </FadeUp> */}
        </div>

        <div className="flex-1 overflow-auto p-6 pt-0 space-y-12">
          {filteredDataEngineering.length > 0 && (
            <FadeUp delay={0.06}>
              <div className="space-y-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredDataEngineering.map((feature, index) => (
                    <FeatureCard key={index} {...feature} />
                  ))}
                </div>
              </div>
            </FadeUp>
          )}
        </div>
      </ScaleDown>
    </div>
  );
};

export default page;
