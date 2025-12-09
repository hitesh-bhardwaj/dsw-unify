"use client";
import React, { useState } from "react";
import { ScaleDown } from "@/components/animations/Animations";
import SearchBar from "@/components/search-bar";
import {
  SynthWave,
  RelationalDataIcon,
  StreamingDataIcon,
  ObjectStoreIcon,
} from "@/components/Icons";
import { SectionHeader } from "@/components/home/section-header";
import { FeatureCard } from "@/components/home/feature-card";

const dataEngineeringFeatures = [
  {
    icon: RelationalDataIcon,
    title: "Relational Data",
    description:
      "Ingest data from SQL databases like PostgreSQL, MySQL, and Oracle",
    href: "#",
  },
  {
    icon: SynthWave,
    title: "Graph Data",
    description:
      "Ingest graph data from Neo4j, Amazon Neptune, and other graph stores",
    href: "#",
  },
  {
    icon: StreamingDataIcon,
    title: "Streaming Data",
    description: "Ingest real-time data from Kafka, Kinesis, and event streams",
    href: "#",
  },
  {
    icon: ObjectStoreIcon,
    title: "Object Store",
    description:
      "Ingest files from S3, Azure Blob, Google Cloud Storage, and more",
    href: "#",
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
          <SectionHeader
            title="Data Ingestion"
            description="Data ingestion, validation, exploration, and feature engineering tools"
          />
          <SearchBar
            placeholder="Search ..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <div className="flex-1 overflow-auto p-6 pt-0 space-y-12">
          {filteredDataEngineering.length > 0 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredDataEngineering.map((feature, index) => (
                    <FeatureCard key={index} {...feature} />
                  ))}
                </div>
              </div>
          )}
        </div>
      </ScaleDown>
    </div>
  );
};

export default page;
