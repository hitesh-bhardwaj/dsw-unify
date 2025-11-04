"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PlusIcon } from "@/components/Icons";
import { MemoryCard } from "@/components/memory-card";
import SearchBar from "@/components/search-bar";
import { FadeUp } from "@/components/animations/fadeup";

const memories = [
  {
    id: "user-preferences",
    name: "User Preferences",
    description: "Individual user preferences and settings",
    status: "active",
    tags: [
      { label: "session", color: "yellow" },
      { label: "user", color: "blue" },
    ],
    entries: "1250",
    variant: "light",
  },
  {
    id: "agent-learning",
    name: "Agent Learning",
    description: "Agent-specific learned behaviors and patterns",
    status: "active",
    tags: [
      { label: "agent", color: "yellow" },
      { label: "agent", color: "blue" },
    ],
    entries: "890",
    variant: "light",
  },
  {
    id: "organization-knowledge",
    name: "Organization Knowledge",
    description: "Company-wide shared knowledge and insights",
    status: "active",
    tags: [
      { label: "organiation", color: "yellow" },
      { label: "organisation", color: "blue" },
    ],
    entries: "2340",
    variant: "light",
  },
];

export default function MemoriesPage() {
  const [query, setQuery] = useState("");

  const filteredMemories = memories.filter((memory) =>
    memory.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full">
      {/* Header section */}
      <div className="space-y-6 p-6">
        {/* Title and CTA */}
        <FadeUp>
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <h1 className="text-3xl font-medium text-foreground">Memories</h1>
              <p className="mt-1 text-sm text-gray-600">
                Manage agent memory systems
              </p>
            </div>
            <Link href="/agents/create">
              <Button className="bg-sidebar-primary hover:bg-[#E64A19] text-white gap-3 rounded-full !px-6 !py-6 !cursor-pointer duration-300">
                {/* <Plus className="h-4 w-4" /> */}
                <PlusIcon />
                Create Memory
              </Button>
            </Link>
          </div>
        </FadeUp>
        <FadeUp delay={0.1}>
          <SearchBar
            placeholder="Search Memories..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </FadeUp>
      </div>
      <FadeUp delay={0.2}>
        <div className="flex-1 overflow-auto p-6 pt-0">
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {filteredMemories.map((memory) => (
              <MemoryCard key={memory.id} memories={memory} />
            ))}
          </div>

          {filteredMemories.length === 0 && (
            <div className="flex h-64 items-center justify-center text-gray-500">
              No agents found matching "{query}"
            </div>
          )}
        </div>
      </FadeUp>
    </div>
  );
}
