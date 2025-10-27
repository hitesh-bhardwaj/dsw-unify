"use client";

import { useState } from "react";
import { Search, Plus, MessageSquare, LayoutTemplate } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AgentCard } from "@/components/agent-card";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { PlusIcon, PromptsIcon, SearchIcon, TemplatesIcon } from "@/components/Icons";

// Mock data for agents
const agents = [
  {
    id: "customer-support-agent",
    name: "Customer Support Agent",
    description: "Handles customer inquiries and support tickets",
    icon: "🎧",
    status: "active",
    tags: [
      { label: "Support", color: null },
      { label: "Customer-Services", color: null },
    ],
    lastActivity: "2 Hours Ago",
    requestCount: "1.2K Request",
    variant: "dark",
  },
  {
    id: "content-writer-agent",
    name: "Content Writer Agent",
    description: "Generates blog posts and marketing content",
    icon: "✍️",
    status: "draft",
    tags: [
      { label: "Content", color: "yellow" },
      { label: "Writing", color: "blue" },
      { label: "Marketing", color: "green" },
    ],
    lastActivity: "1 Day Ago",
    requestCount: "340 Request",
    variant: "light",
  },
  {
    id: "data-analyst-agent",
    name: "Data Analyst Agent",
    description: "Analyzes data and generates insights",
    icon: "📊",
    status: "active",
    tags: [
      { label: "Analytics", color: "orange" },
      { label: "Data", color: "blue" },
      { label: "Insights", color: "green" },
    ],
    lastActivity: "3 Day Ago",
    requestCount: "890 Request",
    variant: "light",
  },
];

export default function AgentsPage() {
  const [activeTab, setActiveTab] = useState("prompts");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredAgents = agents.filter((agent) =>
    agent.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full">
      {/* Header section */}
      <div className="space-y-6 p-6">
        {/* Title and CTA */}
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl font-medium text-[#111111]">Agents</h1>
            <p className="mt-1 text-sm text-gray-600">
              Build, deploy, and manage your AI agents
            </p>
          </div>
          <Link href="/agents/create">
            <Button className="bg-sidebar-primary hover:bg-[#E64A19] text-white gap-3 rounded-full !px-6 !py-6 !cursor-pointer">
              {/* <Plus className="h-4 w-4" /> */}
              <PlusIcon/>
              Create Agents
            </Button>
          </Link>
        </div>

        {/* Search bar */}
        <div className="relative">
          <div className="absolute left-5 top-1/2  -translate-y-1/2 text-[#333333]">
<SearchIcon className="!h-3 !w-auto"/>
          </div>
          <Input
            placeholder="Search Agents..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 h-11 bg-white border-[#AAAAAA] py-6 text-[#333333]"
          />
        </div>

        {/* Filter tabs */}
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
            <PromptsIcon className="!h-6 !w-auto"/>
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
           
            <TemplatesIcon className="!h-6 !w-auto"/>
            <span>Templates</span>
          </button>
        </div>
      </div>

      {/* Agents grid */}
      <div className="flex-1 overflow-auto p-6 pt-0">
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {filteredAgents.map((agent) => (
            <AgentCard key={agent.id} agent={agent} />
          ))}
        </div>

        {filteredAgents.length === 0 && (
          <div className="flex h-64 items-center justify-center text-gray-500">
            No agents found matching "{searchQuery}"
          </div>
        )}
      </div>
    </div>
  );
}
