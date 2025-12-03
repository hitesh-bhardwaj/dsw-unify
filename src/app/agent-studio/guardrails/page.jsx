"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { GuardrailsIcon, PlusIcon } from "@/components/Icons";
import { GuardrailsCard } from "@/components/guardrails-card";
import SearchBar from "@/components/search-bar";
// import { FadeUp } from "@/components/animations/Animations";
import { RippleButton } from "@/components/ui/ripple-button";
import { ScaleDown } from "@/components/animations/Animations";
import AddGuardrailsModal from "@/components/agent-studio/AddGuardrails";

const guardrails = [
  {
    id: "content-safety",
    name: "Content Safety",
    description: "Prevents harmful or inappropriate content generation",
    status: "active",
    icon:<GuardrailsIcon/>,
    tags: [
      { label: "output", color: "yellow" },
      { label: "high", color: "blue" },
    ],
    triggers: "45",
    variant: "light",
  },
  {
    id: "p-detection",
    name: "PII Detection",
    description: "Detects and blocks personally identifiable information",
    status: "active",
        icon:<GuardrailsIcon/>,
    tags: [
      { label: "input", color: "yellow" },
      { label: "high", color: "blue" },
    ],
    triggers: "12",
    variant: "light",
  },
  {
    id: "toxicity-filter",
    name: "Toxicity Filter",
    description: "Filters toxic language and hate speech",
    status: "active",
       icon:<GuardrailsIcon/>,
    tags: [
      { label: "both", color: "yellow" },
      { label: "medium", color: "blue" },
    ],
    triggers: "08",
    variant: "light",
  },
  
];

export default function GuardrailsPage() {
  const [query, setQuery] = useState("");
          const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredGuardrails = guardrails.filter((guardrail) =>
    guardrail.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full w-full overflow-hidden">

      {/* Header section */}
      <ScaleDown>
      <div className="space-y-6 p-6">
        {/* Title and CTA */}
        {/* <FadeUp> */}
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <h1 className="text-3xl font-medium text-foreground">
                Guardrails
              </h1>
              <p className="mt-1 text-sm text-gray-600">
                Manage safety and compliance guardrails
              </p>
            </div>
            <RippleButton>
            <Link href="#">
              <Button
                onClick={() => setIsModalOpen(true)}
                className="bg-sidebar-primary hover:bg-[#E64A19] text-white gap-3 rounded-full !px-6 !py-6 !cursor-pointer duration-300">
                {/* <Plus className="h-4 w-4" /> */}
                <PlusIcon />
                Create Guardrail
              </Button>
            </Link>
            </RippleButton>
          </div>
        {/* </FadeUp> */}
        {/* <FadeUp delay={0.02}> */}
          <SearchBar
            placeholder="Search Guardrails..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        {/* </FadeUp> */}
      </div>
      {/* <FadeUp delay={0.04}> */}
        <div className="flex-1 overflow-auto p-6 pt-0">
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-stretch">
            {filteredGuardrails.map((guardrail) => (
              <GuardrailsCard key={guardrail.id} memories={guardrail} />
            ))}
          </div>

          {filteredGuardrails.length === 0 && (
            <div className="flex h-64 items-center justify-center text-gray-500">
              No agents found matching "{query}"
            </div>
          )}
        </div>
      {/* </FadeUp> */}
      </ScaleDown>
       <AddGuardrailsModal 
                              open={isModalOpen}
                                    onOpenChange={setIsModalOpen}
                        />
    </div>
  );
}
