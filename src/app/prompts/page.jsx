"use client";

import { useState } from "react";
import { Search, Plus, Sparkles, MessageSquare, LayoutTemplate, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PromptCard } from "@/components/prompt-card";
import { cn } from "@/lib/utils";

// Mock data for prompts
const prompts = [
  {
    id: 1,
    name: "Customer Support Assistant",
    description: "Helpful and empathetic customer service responses",
    icon: "🎧",
    rating: 4.8,
    version: "v3",
    tags: [
      { label: "Customer Service", color: null },
      { label: "Customer-Service", color: null },
      { label: "Empathy", color: null },
      { label: "+1 more", color: "orange" },
    ],
    uses: "1250",
    lastUpdated: "20/01/2024",
    preview: "You are a helpful and empathetic customer service representative......",
    variant: "dark",
  },
  {
    id: 2,
    name: "Technical Documentation Writer",
    description: "Creates clear and comprehensive technical documentation",
    icon: "📄",
    rating: 4.3,
    version: "v2",
    tags: [
      { label: "Technical Writing", color: "yellow" },
      { label: "Technical-Writing", color: "blue" },
      { label: "Documentation", color: "green" },
      { label: "+1 more", color: "orange" },
    ],
    uses: "890",
    lastUpdated: "18/01/2024",
    preview: "You are an expert technical writer who creates clear, comprehensive documentation......",
    variant: "light",
  },
  {
    id: 3,
    name: "Code Review Assistant",
    description: "Provides constructive code review feedback",
    icon: "💻",
    rating: 4.9,
    version: "v1",
    tags: [
      { label: "Development", color: "yellow" },
      { label: "Code-Review", color: "blue" },
      { label: "Development", color: "green" },
      { label: "+1 more", color: "orange" },
    ],
    uses: "156",
    lastUpdated: "22/01/2024",
    preview: "You are a helpful and empathetic customer service representative......",
    variant: "light",
  },
];

export default function PromptsPage() {
  const [activeTab, setActiveTab] = useState("prompts");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPrompts = prompts.filter((prompt) =>
    prompt.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full">
      {/* Header section */}
      <div className="space-y-6 p-6">
        {/* Title and CTAs */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Prompt Library</h1>
            <p className="mt-1 text-sm text-gray-600">
              Manage and version your prompt templates and configurations
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              className="gap-2 border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              <Sparkles className="h-4 w-4" />
              Generate Prompt
            </Button>
            <Button className="bg-[#FF5722] hover:bg-[#E64A19] text-white gap-2">
              <Plus className="h-4 w-4" />
              Create Prompt
            </Button>
          </div>
        </div>

        {/* Search bar and filter */}
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search Prompts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-11 bg-white border-gray-200"
            />
          </div>
          <Button
            variant="outline"
            className="gap-2 border-gray-300 text-gray-700 hover:bg-gray-50 px-4"
          >
            <SlidersHorizontal className="h-4 w-4" />
            All Categories
          </Button>
        </div>

        {/* Filter tabs */}
        <div className="flex gap-4">
          <button
            onClick={() => setActiveTab("prompts")}
            className={cn(
              "flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition-colors",
              activeTab === "prompts"
                ? "border-[#FF5722] bg-orange-50 text-[#FF5722]"
                : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
            )}
          >
            <div
              className={cn(
                "h-5 w-5 rounded-full border-2",
                activeTab === "prompts"
                  ? "border-[#FF5722] bg-[#FF5722]"
                  : "border-gray-300"
              )}
            >
              {activeTab === "prompts" && (
                <div className="flex h-full items-center justify-center">
                  <div className="h-2 w-2 rounded-full bg-white" />
                </div>
              )}
            </div>
            <MessageSquare className="h-4 w-4" />
            <span>Prompts</span>
          </button>

          <button
            onClick={() => setActiveTab("templates")}
            className={cn(
              "flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition-colors",
              activeTab === "templates"
                ? "border-[#FF5722] bg-orange-50 text-[#FF5722]"
                : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
            )}
          >
            <div
              className={cn(
                "h-5 w-5 rounded-full border-2",
                activeTab === "templates"
                  ? "border-[#FF5722] bg-[#FF5722]"
                  : "border-gray-300"
              )}
            >
              {activeTab === "templates" && (
                <div className="flex h-full items-center justify-center">
                  <div className="h-2 w-2 rounded-full bg-white" />
                </div>
              )}
            </div>
            <LayoutTemplate className="h-4 w-4" />
            <span>Templates</span>
          </button>
        </div>
      </div>

      {/* Prompts grid */}
      <div className="flex-1 overflow-auto p-6 pt-0">
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
          {filteredPrompts.map((prompt) => (
            <PromptCard key={prompt.id} prompt={prompt} />
          ))}
        </div>

        {filteredPrompts.length === 0 && (
          <div className="flex h-64 items-center justify-center text-gray-500">
            No prompts found matching "{searchQuery}"
          </div>
        )}
      </div>
    </div>
  );
}
