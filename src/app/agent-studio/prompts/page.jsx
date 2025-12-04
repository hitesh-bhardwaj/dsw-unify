"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PromptCard } from "@/components/prompt-card";
import { cn } from "@/lib/utils";
import {
  AiGenerator,
  PlusIcon,
  PromptsIcon,
  TemplatesIcon,
  Tune,
} from "@/components/Icons";
import { TemplateCard } from "@/components/template-card";
import CreatePromptModal from "@/components/CreatePromptModal";
import SearchBar from "@/components/search-bar";
import RadioTabs from "@/components/common/RadioTabs";
// import { FadeUp } from "@/components/animations/Animations";
import { RippleButton } from "@/components/ui/ripple-button";
import { ScaleDown } from "@/components/animations/Animations";

// Mock data for prompts
const prompts = [
  {
    id: 1,
    name: "Customer Support Assistant",
    description: "Helpful and empathetic customer service responses",
    slug:'customer-support-assistant',
    rating: 4.8,
    icon:<PromptsIcon/>,
    version: "v3",
    tags: [
      { label: "Customer-Service", color: "blue" },
      { label: "Empathy", color: "green" },
      { label: "+1 more", color: "red" },
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
    slug:'technical-documentation-writer',
    rating: 4.3,
    icon:<PromptsIcon/>,
    version: "v2",
    tags: [
      { label: "Customer-Service", color: "blue" },
      { label: "Empathy", color: "green" },
      { label: "+1 more", color: "red" },
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
    slug:'code-review-assistant',
    rating: 4.9,
    icon:<PromptsIcon/>,
    version: "v1",
    tags: [
      { label: "Customer-Service", color: "blue" },
      { label: "Empathy", color: "green" },
      { label: "+1 more", color: "red" },
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
    icon:<TemplatesIcon/>,
    tags: [
      { label: "Customer Service", color: "yellow" },
      { label: "Empathy", color: "blue" },
      { label: "+1 more", color: "orange" },

    ],
    uses: "45",
    variable: "company_name, product_name, support_level",
    variant: "light",
  },
  {
    id: 2,
    name: "Technical Q&A Template",
    description: "Template for technical question answering",
    icon:<TemplatesIcon/>,
    tags: [
      { label: "Technical", color: "yellow" },
      { label: "Empathy", color: "blue" },
      { label: "+1 more", color: "orange" },

    ],
    uses: "32",
    variable: "domain, expertise_level, response_format",
    variant: "light",
  },
];

export default function PromptsPage() {
  const [query, setQuery] = useState("");
  const [createPrompt, setCreatePrompt] = useState(false);
  const [tab, setTab] = useState("prompts");

  const filteredPrompts = prompts.filter((prompt) =>
    prompt.name.toLowerCase().includes(query.toLowerCase())
  );
  const filteredTemplates = templates.filter((template) =>
    template.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <>
      <div className="flex flex-col h-full overflow-hidden">
    <ScaleDown>
        {/* Header section */}
        <div className="space-y-6 p-6 w-full h-full">
          {/* Title and CTAs */}
          {/* <FadeUp> */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-medium text-foreground">
                  Prompt Library
                </h1>
                <p className="mt-1 text-sm dark:text-foreground text-black/60">
                  Manage and version your prompt templates and configurations
                </p>
              </div>
              <div className="flex items-center gap-3">
                <RippleButton>
                  <Button
                    variant="outline"
                    className="gap-2 border-primary text-foreground hover:bg-gray-50"
                  >
                    <div className="!w-4">
                      <AiGenerator />
                    </div>
                    Generate Prompt
                  </Button>
                </RippleButton>
                <RippleButton>
                  <Button
                    className="bg-sidebar-primary hover:bg-[#E64A19] text-white gap-3 rounded-full !px-6 !py-6 !cursor-pointer duration-300"
                    onClick={() => setCreatePrompt(true)}
                  >
                    <PlusIcon />
                    Create Prompt
                  </Button>
                </RippleButton>
              </div>
            </div>
          {/* </FadeUp> */}
          {/* <FadeUp delay={0.02}> */}
            <div className="flex gap-3">
              <div className="relative flex-1">
                <SearchBar
                  placeholder="Search Prompts..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>
              <RippleButton className={"rounded-lg"}>
                <Button
                  variant="outline"
                  className="gap-2 border-border-color-1 text-foreground hover:bg-sidebar-accent duration-300 px-4 text-xs rounded-lg"
                >
                  <div className="w-4 h-4">
                    <Tune />
                  </div>
                  All Categories
                </Button>
              </RippleButton>
            </div>
          {/* </FadeUp> */}
          {/* <FadeUp delay={0.04}> */}
            <RadioTabs
              items={[
                { id: "prompts", label: "Prompts", icon: PromptsIcon },
                { id: "templates", label: "Templates", icon: TemplatesIcon },
              ]}
              value={tab}
              onValueChange={setTab}
              activeClassName="  text-[#FF5722]"
              inactiveClassName="border-transparent dark:text-foreground text-black/70"
              dotColorClassName="bg-[#FF5722]"
              equalWidth={true}
            />
          {/* </FadeUp> */}
          {/* <FadeUp delay={0.06}> */}
            <div className="flex-1 pt-0 h-fit w-full relative">
              <div
                className={cn(
                  "relative inset-0  pt-0 transition-all h-full",
                  tab === "prompts"
                    ? "translate-x-0 opacity-100 duration-500 ease-out"
                    : "-translate-x-[40%] opacity-0 pointer-events-none duration-500 ease-out"
                )}
              >
                <div className="grid gap-6 grid-cols-3 md:grid-cols-2 lg:grid-cols-3 items-stretch">
                  {filteredPrompts.map((prompt) => (
                    <PromptCard key={prompt.id} prompt={prompt} />
                  ))}
                </div>
                  {filteredPrompts.length === 0 && (
                    <div className="flex h-64 items-center justify-center text-gray-500">
                      No prompts found matching "{query}"
                    </div>
                  )}
              </div>
              <div
                className={cn(
                  "absolute inset-0 pt-0 transition-all",
                  tab === "templates"
                    ? "translate-x-0 opacity-100 duration-500 ease-out"
                    : tab === "prompts"
                    ? "translate-x-[40%] opacity-0 pointer-events-none duration-300 ease-out"
                    : "-translate-x-[40%] opacity-0 pointer-events-none duration-300 ease-out"
                )}
              >
                <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-stretch">
                  {filteredTemplates.map((template) => (
                    <TemplateCard key={template.id} template={template} />
                  ))}
                  {filteredTemplates.length === 0 && (
                    <div className="flex h-64 items-center justify-center text-gray-500">
                      No templates found matching "{query}"
                    </div>
                  )}
                </div>
                {/* <div className="w-full h-120 rounded-xl border border-border-color-1 flex justify-center items-center">
                          <p>No Self Hosted available at this point </p>
                        </div> */}
              </div>
            </div>
          {/* </FadeUp> */}
        </div>
    </ScaleDown>
      </div>
      <CreatePromptModal open={createPrompt} onOpenChange={setCreatePrompt} />
    </>
  );
}
