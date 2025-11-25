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

  return (
    <div className="flex flex-col h-full w-full overflow-hidden">
      <ScaleDown>
        <div className="space-y-6 p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <h1 className="text-3xl font-medium text-foreground">
                Inference
              </h1>
              <p className="text-xs dark:text-foreground text-black/60">
                Run single or batch inferences and view insights
              </p>
            </div>
          </div>
          <SearchBar
            placeholder="Search ..."
            // value={query}
            // onChange={(e) => setQuery(e.target.value)}
          />

          <div className="grid grid-cols-3 gap-4 w-full">
            {/* Inference */}
            <div className="w-full">
              <label className="text-sm mb-2 block">Select Use Case</label>
              <Select onValueChange={(val) => setUseCase(val)} className='py-2'>
                <SelectTrigger className="w-full py-5 ">
                  <SelectValue placeholder="Choose a use case" className='text-foreground/80' />
                </SelectTrigger>
                <SelectContent>
                  {useCases.map((item) => (
                    <SelectItem key={item.id} value={item.label} className='cursor-pointer'>
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
                <SelectTrigger className="w-full py-5">
                  <SelectValue placeholder="Choose a model" className='text-foreground/80' />
                </SelectTrigger>
                <SelectContent>
                  {models.map((item) => (
                    <SelectItem key={item.id} value={item.label} className='cursor-pointer'>
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
                <SelectTrigger className="w-full py-5">
                  <SelectValue placeholder="Choose a version" className='text-foreground/80' />
                </SelectTrigger>
                <SelectContent>
                  {versions.map((item) => (
                    <SelectItem key={item.id} value={item.label} className='cursor-pointer'>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-center items-center bg-sidebar-accent h-40 rounded-lg border border-border-color-2">
                  <p className="text-xs text-foreground/80">
                    Select a use case, model, and version to view monitoring data
                  </p>
          </div>
        </div>
      </ScaleDown>
    </div>
  );
};

export default page;
