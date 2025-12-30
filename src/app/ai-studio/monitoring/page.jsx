"use client";
import { ScaleDown } from "@/components/animations/Animations";
import SearchBar from "@/components/search-bar";

import React, { useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

import MonitoringView from "@/components/Monitoring/MonitoringView";

const useCases = [
  { id: 1, label: "Marketing" },
  { id: 2, label: "Customer Support" },
  { id: 3, label: "E-commerce" },
];

const models = [
  { id: 1, label: "GPT-5" },
  { id: 2, label: "GPT-4.1" },
  { id: 3, label: "GPT-mini" },
];

const versions = [
  { id: 1, label: "v1.0" },
  { id: 2, label: "v2.0" },
  { id: 3, label: "Latest" },
];

const page = () => {
  const [useCase, setUseCase] = useState("");
  const [model, setModel] = useState("");
  const [version, setVersion] = useState("");

  const allSelected = useCase && model && version;

  return (
    <div className="flex flex-col h-full w-full overflow-hidden">
      <ScaleDown>
        <div className="space-y-6 p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <h1 className="text-3xl font-medium text-foreground">
                Monitoring
              </h1>
              <p className="text-sm dark:text-foreground text-black/60">
                Monitor model performance and data drift
              </p>
            </div>
          </div>

         

          <div className="grid grid-cols-3 gap-4 w-full">
            {/* Use Case */}
            <div className="w-full">
              <label className="text-sm mb-2 block">Select Use Case</label>
              <Select onValueChange={(val) => setUseCase(val)} className="py-2">
                <SelectTrigger className="w-full py-5 bg-white cursor-pointer border border-border-color-0">
                  <SelectValue
                    placeholder="Choose a use case"
                    className="text-foreground/80"
                  />
                </SelectTrigger>
                <SelectContent className="border bg-white border-border-color-0">
                  {useCases.map((item) => (
                    <SelectItem
                      key={item.id}
                      value={item.label}
                      className="cursor-pointer"
                    >
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Model */}
            <div className="w-full">
              <label className="text-sm mb-2 block">Select Model</label>
              <Select onValueChange={(val) => setModel(val)}>
                <SelectTrigger className="w-full py-5 bg-white border border-border-color-0 cursor-pointer">
                  <SelectValue
                    placeholder="Choose a model"
                    className="text-foreground/80"
                  />
                </SelectTrigger>
                <SelectContent className="border bg-white border-border-color-0">
                  {models.map((item) => (
                    <SelectItem
                      key={item.id}
                      value={item.label}
                      className="cursor-pointer"
                    >
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Version */}
            <div className="w-full">
              <label className="text-sm mb-2 block">Select Version</label>
              <Select onValueChange={(val) => setVersion(val)}>
                <SelectTrigger className="w-full py-5 bg-white border border-border-color-0 cursor-pointer">
                  <SelectValue
                    placeholder="Choose a version"
                    className="text-foreground/80"
                  />
                </SelectTrigger>
                <SelectContent className="border border-border-color-0 bg-white">
                  {versions.map((item) => (
                    <SelectItem
                      key={item.id}
                      value={item.label}
                      className="cursor-pointer"
                    >
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Conditional Rendering Section */}
          {!allSelected ? (
            <div className="flex justify-center items-center bg-sidebar-accent h-40 rounded-lg border border-border-color-0 dark:bg-card">
              <p className="text-xs text-foreground/80">
                Select a use case, model, and version to view monitoring data
              </p>
            </div>
          ) : (
            <MonitoringView
              useCase={useCase}
              model={model}
              version={version}
            />
          )}
        </div>
      </ScaleDown>
    </div>
  );
};

export default page;
