"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {PlusIcon,SearchIcon,} from "@/components/Icons";
import { MemoryCard } from "@/components/memory-card";

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
    entries:"1250",
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
    entries:"890",
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
    entries:"2340",
    variant: "light",
  },
];

export default function MemoriesPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredMemories = memories.filter((memory) =>
    memory.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full">
      {/* Header section */}
      <div className="space-y-6 p-6">
        {/* Title and CTA */}
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

        {/* Search bar */}
        <div className="relative">
          <div className="absolute left-5 top-1/2  -translate-y-1/2 text-[#333333]">
            <SearchIcon className="!h-4 !w-auto" />
          </div>
          <Input
            placeholder="Search Memories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 h-11 bg-white border-black/30 py-6 text-[#333333]"
          />
        </div>
      </div>

     
      <div className="flex-1 overflow-auto p-6 pt-0">
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {filteredMemories.map((memory) => (
            <MemoryCard key={memory.id} memories={memory} />
          ))}
        </div>

        {filteredMemories.length === 0 && (
          <div className="flex h-64 items-center justify-center text-gray-500">
            No agents found matching "{searchQuery}"
          </div>
        )}
      </div>
    </div>
  );
}
