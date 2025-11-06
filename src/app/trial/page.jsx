"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AiGenerator, DownloadIcon, PlusIcon } from "@/components/Icons";
import SearchBar from "@/components/search-bar";
import { FadeUp } from "@/components/animations/Animations";
import LLMGrid from "@/components/LLMGrid";
import EmptyCard from "@/components/common/EmptyCard";
import AnimatedTabsSection from "@/components/common/TabsPane";


const LLMs = [
  {
    id: "gpt-4-turbo",
    name: "GPT-4 Turbo",
    description: "OpenAI API Model",
    status: "active",
    tags: [
      { label: "general-purpose", color: "yellow" },
      { label: "api-based", color: "blue" },
      { label: "production", color: "green" },
    ],
    requests: "1,234",
    avgres: "2.3s",
    deploy: false,
  },
  {
    id: "mistral-7B-instruct",
    name: "Mistral 7B Instruct",
    description: "Self-hosted Mistral Model",
    status: "active",
    tags: [
      { label: "open-source", color: "yellow" },
      { label: "self-hosted", color: "blue" },
      { label: "production", color: "green" },
    ],
    requests: "1,234",
    avgres: "2.3s",
    deploy: false,
  },
  {
    id: "llama-2-7B",
    name: "Llama 2 7B",
    description: "Self-hosted Open Source",
    status: "active",
    tags: [
      { label: "open-source", color: "yellow" },
      { label: "self-hosted", color: "blue" },
      { label: "development", color: "green" },
    ],
    requests: "1,234",
    avgres: "2.3s",
    deploy: true,
  },
  {
    id: "custom-insurance-model",
    name: "Custom Insurance Model",
    description: "Fine-tuned Model",
    status: "active",
    tags: [
      { label: "fine-tuned", color: "yellow" },
      { label: "insurance", color: "blue" },
      { label: "specialized", color: "green" },
    ],
    requests: "1,234",
    avgres: "2.3s",
    performance: true,
    accuracy: "94.2%",
    latency: "1.8s",
  },
];

export default function LLMsPage() {
  const [query, setQuery] = useState("");

  const filteredLLMs = useMemo(() => {
    const q = query.toLowerCase();
    return LLMs.filter(
      (llm) =>
        llm.name.toLowerCase().includes(q) ||
        llm.description.toLowerCase().includes(q)
    );
  }, [query]);

  const ctx = { filteredLLMs, query };

  const items = [
    {
      id: "tab-all",
      value: "all",
      label: "All",
      name: "All",
      render: ({ filteredLLMs}) =>
          <LLMGrid items={filteredLLMs} />
    },
    {
      id: "tab-self",
      value: "selfHosted",
      label: "Self Hosted",
      name: "Self Hosted",
      render: () =>
          <EmptyCard children={"Hello"}/>
    },
    {
      id: "tab-api",
      value: "apiBased",
      label: "API Based",
      name: "API Based",
      render: ({ filteredLLMs}) =>
          <LLMGrid items={filteredLLMs} />
    },
    {
      id: "tab-fine",
      value: "fineTuned",
      label: "Fine Tuned",
      name: "Fine Tuned",
      render: () =>
         <EmptyCard children={"Hello"}/>
    },
  ];

  return (
    <div className="flex flex-col h-full">
      <div className="space-y-6 p-6">
        {/* header */}
        <FadeUp>
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-medium text-foreground">LLMs</h1>
            <div className="gap-2 flex">
              <Link href={"/llms/llm-finetuning"}>
                <Button variant="outline" className="gap-2 text-foreground border border-primary">
                  <div className="!w-4"><AiGenerator /></div>
                  LLM Finetuning
                </Button>
              </Link>
              <Button variant="outline" className="gap-2 text-foreground border border-primary">
                <div className="!w-4"><DownloadIcon /></div>
                Import Model
              </Button>
              <Link href="/#">
                <Button className="bg-sidebar-primary hover:bg-[#E64A19] text-white gap-3 rounded-full !px-6 !py-6 duration-300">
                  <PlusIcon /> Deploy New Model
                </Button>
              </Link>
            </div>
          </div>
        </FadeUp>

        {/* search */}
        <FadeUp delay={0.1}>
          <SearchBar
            placeholder="Search LLMs..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </FadeUp>

        {/* tabs (reusable, animated) */}
        <FadeUp delay={0.3}>
          <AnimatedTabsSection
            items={items}
            ctx={ctx}
            defaultValue="all"
          />
        </FadeUp>
      </div>
    </div>
  );
}
