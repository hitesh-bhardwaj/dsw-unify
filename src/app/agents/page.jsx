"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AgentCard } from "@/components/agent-card";
import Link from "next/link";
import { PlusIcon, PromptsIcon, TemplatesIcon } from "@/components/Icons";
import SearchBar from "@/components/search-bar";
import RadioTabs from "@/components/common/RadioTabs";
import { FadeUp } from "@/components/animations/Animations";
import { cn } from "@/lib/utils";
import { RippleButton } from "@/components/ui/ripple-button";

// Mock data for agents
const agents = [
  {
    id: "customer-support-agent",
    name: "Customer Support Agent",
    description: "Handles customer inquiries and support tickets",
    status: "active",
    tags: [
      { label: "Support", color: "yellow" },
      { label: "Customer-Services", color: "blue" },
    ],
    lastActivity: "2 Hours Ago",
    requestCount: "1.2K Request",
    variant: "light",
  },
  {
    id: "content-writer-agent",
    name: "Content Writer Agent",
    description: "Generates blog posts and marketing content",
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
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState("prompts");

  const filteredAgents = agents.filter((agent) =>
    agent.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full w-full overflow-hidden">
      {/* Header section */}
      <div className="space-y-6 p-6">
        {/* Title and CTA */}
        <FadeUp>
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <h1 className="text-3xl font-medium text-foreground">Agents</h1>
              <p className="mt-1 text-sm dark:text-foreground text-black/60">
                Build, deploy, and manage your AI agents
              </p>
            </div>

            <Link href="/agents/create">
              <RippleButton>
                <Button className="bg-sidebar-primary hover:bg-[#E64A19] text-white gap-3 rounded-full !px-6 !py-6 !cursor-pointer duration-300">
                  <PlusIcon />
                  Create Agents
                </Button>
              </RippleButton>
            </Link>
          </div>
        </FadeUp>
        <FadeUp delay={0.02}>
          <SearchBar
            placeholder="Search Agents..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </FadeUp>

        <FadeUp delay={0.04}>
          <RadioTabs
            items={[
              { id: "prompts", label: "Prompts", icon: PromptsIcon },
              { id: "templates", label: "Templates", icon: TemplatesIcon },
            ]}
            value={tab}
            onValueChange={setTab}
            activeClassName=" text-primary"
            inactiveClassName="border-transparent text-foreground"
            dotColorClassName="bg-[#FF5722]"
            equalWidth={true}
          />
        </FadeUp>
      </div>

      {/* Agents grid */}

      <FadeUp delay={0.06}>
        <div className="flex-1 pt-0 px-6 h-fit w-full relative">
          <div
            className={cn(
              "relative inset-0  pt-0 transition-all h-full",
              tab === "prompts"
                ? "translate-x-0 opacity-100 duration-500 ease-out"
                : "-translate-x-[40%] opacity-0 pointer-events-none duration-500 ease-out"
            )}
          >
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-stretch">
              {filteredAgents.map((agent) => (
                <AgentCard key={agent.id} agent={agent} />
              ))}
            </div>
          </div>
          <div
            className={cn(
              "absolute inset-0 pt-0 transition-all px-6 h-94",
              tab === "templates"
                ? "translate-x-0 opacity-100 duration-500 ease-out"
                : tab === "prompts"
                ? "translate-x-[40%] opacity-0 pointer-events-none duration-300 ease-out"
                : "-translate-x-[40%] opacity-0 pointer-events-none duration-300 ease-out"
            )}
          >
            <div className="grid gap-6 grid-cols-1 h-full">
              <div className="w-full border border-border-color-1 rounded-2xl h-full flex justify-center items-center text-border-color-3">
                <p>"No Templates to be shown"</p>
              </div>
            </div>
          </div>
          {filteredAgents.length === 0 && tab==="prompts"&& (
            <div className="flex h-64 items-center justify-center text-border-color-3 dark:text-foreground border border-border-color-1 rounded-xl">
              No prompts found matching "{query}"
            </div>
          )}
        </div>
      </FadeUp>
    </div>
  );
}
