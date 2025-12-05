"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AgentCard } from "@/components/agent-card";
import Link from "next/link";
import { AgentStudioIcon, PlusIcon, PromptsIcon, TemplatesIcon } from "@/components/Icons";
import SearchBar from "@/components/search-bar";
import RadioTabs from "@/components/common/RadioTabs";
import { FadeUp, ScaleDown } from "@/components/animations/Animations";
import { cn } from "@/lib/utils";
import { RippleButton } from "@/components/ui/ripple-button";

// Mock data for agents
const agents = [
  {
    id: "auto-claims-processing-agent",
    name: "Auto Claims Processing Agent",
    description: "Automates auto insurance claims intake, validation, and processing",
    icon:<AgentStudioIcon/>,
    status: "active",
    tags: [
      { label: "auto", color: "gray" },
      { label: "claims", color: "gray" },
      { label: "processing", color: "gray" },
    ],
    lastActivity: "2 hours ago",
    requestCount: "3.2k requests",
    variant: "light",
  },
  {
    id: "property-claims-agent",
    name: "Property Claims Agent",
    description: "Handles home and property damage claims assessment and processing",
    icon:<AgentStudioIcon/>,
    status: "active",
    tags: [
      { label: "property", color: "gray" },
      { label: "claims", color: "gray" },
      { label: "home", color: "gray" },
    ],
    lastActivity: "3 hours ago",
    requestCount: "2.8k requests",
    variant: "light",
  },
  {
    id: "health-claims-adjudication-agent",
    name: "Health Claims Adjudication Agent",
    description: "Automates auto insurance claims intake, validation, and processing",
    icon:<AgentStudioIcon/>,
    status: "active",
    tags: [
      { label: "health", color: "gray" },
      { label: "claims", color: "gray" },
      { label: "medical", color: "gray" },
    ],
    lastActivity: "1 hour ago",
    requestCount: "4.1k requests",
    variant: "light",
  },
  {
    id: "workers-comp-claims-agent",
    name: "Workers Comp Claims Agent",
    description:
      "Handles home and property damage claims assessment and processing",
    icon:<AgentStudioIcon/>,
    status: "active",
    tags: [
      { label: "property", color: "gray" },
      { label: "claims", color: "gray" },
      { label: "home", color: "gray" },
    ],
    lastActivity: "3 hours ago",
    requestCount: "2.8k requests",
    variant: "light",
  },
  {
    id: "life-insurance-claims-agent",
    name: "Life Insurance Claims Agent",
    description:
      "Automates auto insurance claims intake, validation, and processing",
    icon:<AgentStudioIcon/>,
    status: "active",
    tags: [
      { label: "health", color: "gray" },
      { label: "claims", color: "gray" },
      { label: "medical", color: "gray" },
    ],
    lastActivity: "1 hour ago",
    requestCount: "4.1k requests",
    variant: "light",
  },
  {
    id: "claims-status-inquiry-agent",
    name: "Claims Status Inquiry Agent",
    description:
      "Automates auto insurance claims intake, validation, and processing",
    icon:<AgentStudioIcon/>,
    status: "active",
    tags: [
      { label: "health", color: "gray" },
      { label: "claims", color: "gray" },
      { label: "medical", color: "gray" },
    ],
    lastActivity: "1 hour ago",
    requestCount: "4.1k requests",
    variant: "light",
  },
  {
    id: "auto-underwriting-agent",
    name: "Auto Underwriting Agent",
    description: "Handles home and property damage claims assessment and processing",
    icon:<AgentStudioIcon/>,
    status: "active",
    tags: [
      { label: "property", color: "gray" },
      { label: "claims", color: "gray" },
      { label: "home", color: "gray" },
    ],
    lastActivity: "3 hours ago",
    requestCount: "2.8k requests",
    variant: "light",
  },
  {
    id: "home-insurance-underwriting-agent",
    name: "Home Insurance Underwriting Agent",
    description:
      "Automates auto insurance claims intake, validation, and processing",
    icon:<AgentStudioIcon/>,
    status: "active",
    tags: [
      { label: "health", color: "gray" },
      { label: "claims", color: "gray" },
      { label: "medical", color: "gray" },
    ],
    lastActivity: "1 hour ago",
    requestCount: "4.1k requests",
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
    <div className="flex flex-col h-full w-full overflow-hidden pb-5 ">
      <ScaleDown>
        {/* Header section */}
        <div className="space-y-6 p-6">
          {/* Title and CTA */}
          {/* <FadeUp> */}
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <h1 className="text-3xl font-medium text-foreground">Agents</h1>
              <p className="mt-1 text-sm dark:text-foreground text-black/60">
                Build, deploy, and manage your AI agents
              </p>
            </div>

            <Link href="/agent-studio/agents/create">
              <RippleButton>
                <Button className="bg-sidebar-primary hover:bg-[#E64A19] text-white gap-3 rounded-full !px-6 !py-6 !cursor-pointer duration-300">
                  <PlusIcon />
                  Create Agents
                </Button>
              </RippleButton>
            </Link>
          </div>
          {/* </FadeUp> */}
          {/* <FadeUp delay={0.02}> */}
          <SearchBar
            placeholder="Search Agents..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {/* <RadioTabs
            items={[
              { id: "prompts", label: "Prompts", icon: PromptsIcon },
              { id: "templates", label: "Templates", icon: TemplatesIcon },
            ]}
            value={tab}
            onValueChange={setTab}
            activeClassName=" text-primary"
            inactiveClassName="border-transparent dark:text-foreground text-black/70"
            dotColorClassName="bg-[#FF5722]"
            equalWidth={true}
          /> */}
        </div>
        <div className="flex-1 pt-0 px-6 h-fit w-full relative">
          <div
            className={cn(
              "relative inset-0  pt-0 transition-all h-full",
              tab === "prompts"
                ? "translate-x-0 opacity-100 duration-500 ease-out"
                : "-translate-x-[40%] opacity-0 pointer-events-none duration-500 ease-out"
            )}
          >
            <div className="grid gap-6  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-stretch">
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
          {filteredAgents.length === 0 && tab === "prompts" && (
            <div className="flex h-64 items-center justify-center text-border-color-3 dark:text-foreground border border-border-color-1 rounded-xl">
              No prompts found matching "{query}"
            </div>
          )}
        </div>
        {/* </FadeUp> */}
      </ScaleDown>
    </div>
  );
}
