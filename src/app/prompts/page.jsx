"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PromptCard } from "@/components/prompt-card";
import { cn } from "@/lib/utils";
import {
  AiGenerator,
  PlusIcon,
  PromptsIcon,
  SearchIcon,
  TemplatesIcon,
  Tune,
} from "@/components/Icons";
import { TemplateCard } from "@/components/template-card";
import Link from "next/link";
import CreatePromptModal from "@/components/CreatePromptModal";

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
      { label: "Customer Service", color: "yellow" },
      { label: "Customer-Service", color: "blue" },
      { label: "Empathy", color: "green" },
      { label: "+1 more", color: "orange" },
    ],
    uses: "1250",
    lastUpdated: "20/01/2024",
    preview:
      "You are a helpful and empathetic customer service representative......",
    variant: "light",
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
    preview:
      "You are an expert technical writer who creates clear, comprehensive documentation......",
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
    preview:
      "You are a helpful and empathetic customer service representative......",
    variant: "light",
  },
];
const templates = [
  {
    id: 1,
    name: "Customer Service Template",
    description: "Standard template for customer service agents",
    tags: [
      { label: "Customer Service", color: "yellow" },
      { label: "3 Variables", color: "blue" },
    ],
    uses: "45",
    variable: "company_name, product_name, support_level",
    variant: "light",
  },
  {
    id: 2,
    name: "Technical Q&A Template",
    description: "Template for technical question answering",
    tags: [
      { label: "Technical", color: "yellow" },
      { label: "3 Variables", color: "blue" },
    ],
    uses: "32",
    variable: "domain, expertise_level, response_format",
    variant: "light",
  },
];

export default function PromptsPage() {
  const [activeTab, setActiveTab] = useState("prompts");
  const [searchQuery, setSearchQuery] = useState("");
   const [createPrompt, setCreatePrompt] = useState(false);

  const filteredPrompts = prompts.filter((prompt) =>
    prompt.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const filteredTemplates = templates.filter((template) =>
    template.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
    <div className="flex flex-col h-full">
      {/* Header section */}
      <div className="space-y-6 p-6">
        {/* Title and CTAs */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-medium text-foreground">
              Prompt Library
            </h1>
            <p className="mt-1 text-sm text-gray-600">
              Manage and version your prompt templates and configurations
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              className="gap-2 border-primary text-foreground hover:bg-gray-50"
            >
              <div className="!w-4">
                <AiGenerator />
              </div>
              {/* <Sparkles className="h-4 w-4" /> */}
              Generate Prompt
            </Button>
            {/* <Link href={"/prompts/create"}> */}
              <Button className="bg-sidebar-primary hover:bg-[#E64A19] text-white gap-3 rounded-full !px-6 !py-6 !cursor-pointer duration-300" onClick={()=>setCreatePrompt(true)}>
                <PlusIcon />
                Create Prompt
              </Button>
            {/* </Link> */}
          </div>
        </div>

        {/* Search bar and filter */}
        <div className="flex gap-3">
          <div className="relative flex-1">
            <div className="absolute left-5 top-1/2  -translate-y-1/2 text-[#333333]">
              <SearchIcon className="!h-4 !w-auto" />
            </div>
            <Input
              placeholder="Search Prompts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-11 bg-white border-black/30 py-6 text-[#333333] shadow-none"
            />
          </div>
          <Button
            variant="outline"
            className="gap-2 border-black/30 text-foreground hover:bg-sidebar-accent duration-300 px-4 text-xs rounded-lg"
          >
            <div className="w-4 h-4">
              <Tune />
            </div>
            All Categories
          </Button>
        </div>

        <div className="flex gap-4 bg-[#F6F6F6] py-1.5 px-1.5 rounded-lg border border-gray-200">
          <button
            onClick={() => setActiveTab("prompts")}
            className={cn(
              "flex items-center gap-2 rounded-lg border px-4 py-3 text-sm font-medium transition-colors w-1/2 cursor-pointer",
              activeTab === "prompts"
                ? "border-[#DCDCDC] bg-white text-[#FF5722]"
                : "border-transparent text-gray-700 "
            )}
          >
            <div
              className={cn(
                "h-5 w-5 rounded-full border",
                activeTab === "prompts"
                  ? "border-gray-300 bg-white"
                  : "border-gray-300"
              )}
            >
              {activeTab === "prompts" && (
                <div className="flex h-full items-center justify-center">
                  <div className="h-2.5 w-2.5 rounded-full bg-[#FF5722]" />
                </div>
              )}
            </div>
            <PromptsIcon className="!h-6 !w-auto" />
            <span>Prompts</span>
          </button>

          <button
            onClick={() => setActiveTab("templates")}
            className={cn(
              "flex items-center gap-2 rounded-lg border px-4 py-3 text-sm font-medium transition-colors w-1/2 cursor-pointer",
              activeTab === "templates"
                ? "border-[#DCDCDC] bg-white text-[#FF5722]"
                : "border-transparent text-gray-700 "
            )}
          >
            <div
              className={cn(
                "h-5 w-5 rounded-full border",
                activeTab === "templates"
                  ? "border-[#DCDCDC] bg-white text-[#FF5722]"
                  : "border-gray-300"
              )}
            >
              {activeTab === "templates" && (
                <div className="flex h-full items-center justify-center">
                  <div className="h-2.5 w-2.5 rounded-full bg-[#FF5722]" />
                </div>
              )}
            </div>

            <TemplatesIcon className="!h-6 !w-auto" />
            <span>Templates</span>
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-hidden relative">
        <div
          className={cn(
            "absolute inset-0 overflow-auto p-6 pt-0 transition-all ",
            activeTab === "prompts"
              ? "translate-x-0 opacity-100 duration-500 ease-out"
              : "-translate-x-[40%] opacity-0 pointer-events-none duration-300 ease-out"
          )}
        >
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

        <div
          className={cn(
            "absolute inset-0 overflow-auto p-6 pt-0 transition-all ",
            activeTab === "templates"
              ? "translate-x-0 opacity-100 duration-500 ease-out"
              : "translate-x-[40%] opacity-0 pointer-events-none duration-300 ease-out "
          )}
        >
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {filteredTemplates.map((template) => (
              <TemplateCard key={template.id} template={template} />
            ))}
          </div>

          {filteredTemplates.length === 0 && (
            <div className="flex h-64 items-center justify-center text-gray-500">
              No templates found matching "{searchQuery}"
            </div>
          )}
        </div>
      </div>
    </div>
    <CreatePromptModal
    open={createPrompt}
    onOpenChange={setCreatePrompt}
    />
    
    </>
  );
}
