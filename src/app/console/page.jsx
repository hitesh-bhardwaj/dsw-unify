"use client";

import { useState } from "react";
import SearchBar from "@/components/search-bar";
import { ScaleDown } from "@/components/animations/Animations";
import { ConsoleCard } from "@/components/console/console-card";
import { AIStudioIcon, DataExplorerIcon, FeatureEngineeringIcon, ModelIntegrationIcon, SynthWave } from "@/components/Icons";

const console = [
  {
    id: "data-ingestion-toolkit",
    name: "Data Ingestion Toolkit",
    description: "Toolkit for integrating data sources",
    icon:<SynthWave/>,
    status: "active",
    variant: "light",
  },
  {
    id: "data-explorer",
    name: "Data Explorer",
    description: "Explore data and features",
    icon:<DataExplorerIcon/>,
    status: "beta",
    variant: "light",
  },
  {
    id: "feature-engineering-feature-store",
    name: "Feature Engineering & Feature Store",
    description: "Console to add, edit and reset features",
    icon:<FeatureEngineeringIcon/>,
    status: "active",
    variant: "light",
  },
  {
    id: "model-integration-development",
    name: "Model Integration/Development",
    description: "Generates blog posts and marketing content",
    icon:<ModelIntegrationIcon/>,
    status: "beta",
    variant: "light",
  },
  {
    id: "ai-studio",
    name: "AI Studio",
    description: "Auto create use case in few clicks",
    icon:<AIStudioIcon/>,
    status: "active",
    variant: "light",
  },
  {
    id: "genai-studio",
    name: "GenAI Studio",
    description: "AI by DSW to help you generate quick data insights",
    icon:<AIStudioIcon/>,
    status: "beta",
    variant: "light",
  },
  
];

export default function ConsolePage() {
  const [query, setQuery] = useState("");

  const filteredConsole = console.filter((console) =>
    console.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full w-full overflow-hidden">
      <ScaleDown>
      <div className="space-y-6 p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <h1 className="text-3xl font-medium text-foreground">
               Explore All Our Features
              </h1>
            </div>
          </div>
          <SearchBar
            placeholder="Search ..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
      </div>
        <div className="flex-1 overflow-auto p-6 pt-0">
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-stretch">
            {filteredConsole.map((console) => (
              <ConsoleCard key={console.id} memories={console} />
            ))}
          </div>

          {filteredConsole.length === 0 && (
            <div className="flex h-64 items-center justify-center text-gray-500">
              No agents found matching "{query}"
            </div>
          )}
        </div>
      </ScaleDown>
    </div>
  );
}
