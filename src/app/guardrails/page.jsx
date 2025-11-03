"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {PlusIcon,SearchIcon,} from "@/components/Icons";
import { GuardrailsCard } from "@/components/guardrails-card";

const guardrails = [
  {
    id: "content-safety",
    name: "Content Safety",
    description: "Prevents harmful or inappropriate content generation",
    status: "active",
    tags: [
      { label: "output", color: "yellow" },
      { label: "high", color: "blue" },
    ],
    triggers:"45",
    variant: "light",
  },
  {
    id: "p-detection",
    name: "PII Detection",
    description: "Detects and blocks personally identifiable information",
    status: "active",
    tags: [
      { label: "input", color: "yellow" },
      { label: "high", color: "blue" },
    ],
    triggers:"12",
    variant: "light",
  },
  {
    id: "toxicity-filter",
    name: "Toxicity Filter",
    description: "Filters toxic language and hate speech",
    status: "active",
    tags: [
      { label: "both", color: "yellow" },
      { label: "medium", color: "blue" },
    ],
    triggers:"08",
    variant: "light",
  },
];

export default function GuardrailsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredGuardrails = guardrails.filter((guardrail) =>
    guardrail.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full">
      {/* Header section */}
      <div className="space-y-6 p-6">
        {/* Title and CTA */}
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl font-medium text-foreground">Guardrails</h1>
            <p className="mt-1 text-sm text-gray-600">
             Manage safety and compliance guardrails
            </p>
          </div>
          <Link href="/agents/create">
            <Button className="bg-sidebar-primary hover:bg-[#E64A19] text-white gap-3 rounded-full !px-6 !py-6 !cursor-pointer duration-300">
              {/* <Plus className="h-4 w-4" /> */}
              <PlusIcon />
              Create Guardrail
            </Button>
          </Link>
        </div>

        {/* Search bar */}
        <div className="relative">
          <div className="absolute left-5 top-1/2  -translate-y-1/2 text-[#333333]">
            <SearchIcon className="!h-4 !w-auto" />
          </div>
          <Input
            placeholder="Search Guardrails..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 h-11 bg-white border-black/30 py-6 text-[#333333]"
          />
        </div>
      </div>

     
      <div className="flex-1 overflow-auto p-6 pt-0">
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-stretch">
          {filteredGuardrails.map((guardrail) => (
            <GuardrailsCard key={guardrail.id} memories={guardrail} />
          ))}
        </div>

        {filteredGuardrails.length === 0 && (
          <div className="flex h-64 items-center justify-center text-gray-500">
            No agents found matching "{searchQuery}"
          </div>
        )}
      </div>
    </div>
  );
}
