"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { SearchIcon } from "./Icons";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  AgentsIcon,
  PromptsIcon,
  LLMsIcon,
  KnowledgeBaseIcon,
  ToolsIcon,
  MemoriesIcon,
  GuardrailsIcon,
  TestingIcon,
  FeatureTransformationIcon,
  FeatureViewsIcon,
  FeatureServicesIcon,
  DataIngestionIcon2,
  DataExplorerIcon,
  UseCasesIcon,
  MonitoringIcon,
} from "./Icons";

/**
 * Global search component with command palette
 * Styled to match the SearchBar component
 */
export function GlobalSearch() {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  React.useEffect(() => {
    const down = (e) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleSelect = (href) => {
    setOpen(false);
    router.push(href);
  };

  // Searchable items organized by category
  const searchItems = {
    "Agent Studio": [
      { icon: AgentsIcon, name: "Agents", href: "/agent-studio/agents", description: "Manage AI agents" },
      { icon: PromptsIcon, name: "Prompts", href: "/agent-studio/prompts", description: "Prompt templates and library" },
      { icon: LLMsIcon, name: "LLMs", href: "/agent-studio/llms", description: "Language model selection" },
      { icon: KnowledgeBaseIcon, name: "Knowledge Bases", href: "/agent-studio/knowledge-bases", description: "Knowledge management" },
      { icon: ToolsIcon, name: "Tools", href: "/agent-studio/tools", description: "Agent tool integrations" },
      { icon: MemoriesIcon, name: "Memories", href: "/agent-studio/memories", description: "Memory storage" },
      { icon: GuardrailsIcon, name: "Guardrails", href: "/agent-studio/guardrails", description: "Safety constraints" },
      { icon: MonitoringIcon, name: "Agent Monitoring", href: "/agent-studio/monitoring", description: "Monitor agent performance" },
      { icon: TestingIcon, name: "Testing", href: "/agent-studio/testing", description: "Agent testing suites" },
    ],
    "AI Studio": [
      { icon: UseCasesIcon, name: "Use Cases", href: "/ai-studio/use-cases", description: "AI use case templates" },
      { icon: MonitoringIcon, name: "AI Monitoring", href: "/ai-studio/monitoring", description: "Model monitoring" },
      { icon: LLMsIcon, name: "Inference", href: "/ai-studio/inference", description: "Model inference" },
    ],
    "Feature Store": [
      { icon: FeatureTransformationIcon, name: "Feature Transformations", href: "/feature-store/feature-transformations", description: "Feature engineering" },
      { icon: FeatureViewsIcon, name: "Feature Views", href: "/feature-store/feature-views", description: "Feature view management" },
      { icon: FeatureServicesIcon, name: "Feature Services", href: "/feature-store/feature-services", description: "Feature serving" },
    ],
    "Data Engineering": [
      { icon: DataIngestionIcon2, name: "Data Ingestion", href: "/data-engineering/data-ingestion", description: "Data import and processing" },
      { icon: DataExplorerIcon, name: "Data Explorer", href: "/data-engineering/data-explorer", description: "Explore your data" },
    ],
  };

  return (
    <>
      {/* Search Button - Styled to match SearchBar */}
      <div className="relative w-64 lg:w-64">
        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-border-color-3 pointer-events-none z-10">
          <SearchIcon className="size-4" />
        </div>
        <button
          onClick={() => setOpen(true)}
          className="w-full h-10 bg-background border border-border-color-0 rounded-md pl-12 pr-3 text-left text-sm placeholder:text-border-color-3 hover:border-border-color-3 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
          <span className="text-border-color-3">Search...</span>
        </button>
      </div>

      {/* Command Dialog */}
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search across UnifyAI..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>

          {Object.entries(searchItems).map(([category, items]) => (
            <CommandGroup key={category} heading={category}>
              {items.map((item) => {
                const Icon = item.icon;
                return (
                  <CommandItem
                    key={item.href}
                    value={`${item.name} ${item.description}`}
                    onSelect={() => handleSelect(item.href)}
                    className="cursor-pointer"
                  >
                    <Icon className="mr-2 h-4 w-4" />
                    <div className="flex flex-col">
                      <span>{item.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {item.description}
                      </span>
                    </div>
                  </CommandItem>
                );
              })}
            </CommandGroup>
          ))}
        </CommandList>
      </CommandDialog>
    </>
  );
}
