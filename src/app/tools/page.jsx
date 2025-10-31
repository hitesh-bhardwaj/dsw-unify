"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PlusIcon,SearchIcon,} from "@/components/Icons";
import { ToolsCard } from "@/components/tools-card";

// Mock data for agents
const tools = [
  {
    id: "web-search",
    name: "Web Search",
    description: "Search the web for current information",
    status: "active",
    tags: [
      { label: "api", color: "yellow" },
      { label: "api", color: "blue" },
    ],
    variant: "light",
  },
  {
    id: "calculator",
    name: "Calculator",
    description: "Perform mathematical calculations",
    status: "active",
    tags: [
      { label: "function", color: "yellow" },
      { label: "utility", color: "blue" },
    ],
    variant: "light",
  },
  {
    id: "code-executor",
    name: "Code Executor",
    description: "Execute Python code safely",
    status: "beta",
    tags: [
      { label: "sandbox", color: "yellow" },
      { label: "development", color: "blue" }
    ],
    variant: "light",
  },
];

export default function ToolsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTools = tools.filter((tool) =>
    tool.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full">
      {/* Header section */}
      <div className="space-y-6 p-6">
        {/* Title and CTA */}
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl font-medium text-foreground">Tools</h1>
            <p className="mt-1 text-sm text-gray-600">
             Manage agent tools and capabilities
            </p>
          </div>
          <Link href="/agents/create">
            <Button className="bg-sidebar-primary hover:bg-[#E64A19] text-white gap-3 rounded-full !px-6 !py-6 !cursor-pointer duration-300">
              {/* <Plus className="h-4 w-4" /> */}
              <PlusIcon />
             Add Tools
            </Button>
          </Link>
        </div>

        {/* Search bar */}
        <div className="relative">
          <div className="absolute left-5 top-1/2  -translate-y-1/2 text-[#333333]">
            <SearchIcon className="!h-4 !w-auto" />
          </div>
          <Input
            placeholder="Search Tools..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 h-11 bg-white border-black/30 py-6 text-[#333333]"
          />
        </div>
      </div>

      <div className="flex-1 overflow-auto p-6 pt-0">
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {filteredTools.map((tool) => (
            <ToolsCard key={tool.id} tools={tool} />
          ))}
        </div>

        {filteredTools.length === 0 && (
          <div className="flex h-64 items-center justify-center text-gray-500">
            No agents found matching "{searchQuery}"
          </div>
        )}
      </div>
    </div>
  );
}
