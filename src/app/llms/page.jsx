"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import {
  AiGenerator,
  DownloadIcon,
  PlusIcon,
  SynthWave,
} from "@/components/Icons";
import { LLMCard } from "@/components/LLMCard";
import Tabs from "@/components/common/Tabs";
import SearchBar from "@/components/search-bar";
import { FadeUp } from "@/components/animations/fadeup";

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

const Recent = [
  {
    content: "Mistral 7B Instruct deployment completed",
    recentActivity: "30 minutes ago",
  },
  {
    content: "GPT-4 Turbo deployment completed",
    recentActivity: "2 hours ago",
  },
  {
    content: "Llama 2 7B deployment started",
    recentActivity: "4 hours ago",
  },
  {
    content: "Custom Insurance Model retrained",
    recentActivity: "1 day ago",
  },
];

export default function LLMsPage() {
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState("all");

  const tabs = [
    { id: "all", label: "All Models" },
    {
      id: "selfHosted",
      label: "Self-Hosted",
    },
    {
      id: "apiBased",
      label: "API-Based",
    },
    {
      id: "fineTuned",
      label: "Fine-Tuned",
    },
  ];

  const filteredLLMs = LLMs.filter((llm) =>
    llm.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full">
      {/* Header section */}
      <div className="space-y-6 p-6">
        {/* Title and CTA */}
        <FadeUp>
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <h1 className="text-3xl font-medium text-foreground">LLMs</h1>
            </div>
            <div className="gap-2 flex">
              <Link href={"/llms/llm-finetuning"}>
                <Button
                  variant="outline"
                  //   onClick={() => setApiModalOpen(true)}
                  className="gap-2 text-foreground border border-primary"
                >
                  <div className="!w-4">
                    <AiGenerator />
                  </div>
                  LLM Finetuning
                </Button>
              </Link>
              <Button
                variant="outline"
                className="gap-2 text-foreground border border-primary"
              >
                <div className="!w-4">
                  {/* <AiGenerator /> */}
                  <DownloadIcon />
                </div>
                Import Model
              </Button>
              <Link href="/llms/deploy">
                <Button className="bg-sidebar-primary hover:bg-[#E64A19] text-white gap-3 rounded-full !px-6 !py-6 !cursor-pointer duration-300">
                  <PlusIcon />
                  Deploy New Model
                </Button>
              </Link>
            </div>
          </div>
        </FadeUp>
        <FadeUp delay={0.1}>
          <SearchBar
            placeholder="Search LLMs..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </FadeUp>

        {/* Filter tabs */}
        <FadeUp delay={0.2}>
          <Tabs tabs={tabs} value={tab} onValueChange={setTab} />
        </FadeUp>

        {/* LLMs grid */}
        <FadeUp delay={0.3}>
          <div className="flex-1 pt-0 h-fit w-full relative">
            <div
              className={cn(
                "relative inset-0  pt-0 transition-all h-full",
                tab === "all"
                  ? "translate-x-0 opacity-100 duration-500 ease-out"
                  : "-translate-x-[40%] opacity-0 pointer-events-none duration-500 ease-out"
              )}
            >
              {tab === "all" && (
                <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-stretch">
                  {filteredLLMs.map((llm) => (
                    <LLMCard key={llm.id} llm={llm} />
                  ))}
                </div>
              )}
            </div>
            <div
              className={cn(
                "absolute inset-0 pt-0 transition-all",
                tab === "selfHosted"
                  ? "translate-x-0 opacity-100 duration-500 ease-out"
                  : tab === "all"
                  ? "translate-x-[40%] opacity-0 pointer-events-none duration-300 ease-out"
                  : "-translate-x-[40%] opacity-0 pointer-events-none duration-300 ease-out"
              )}
            >
              <div className="w-full h-120 rounded-xl border border-black/20 flex justify-center items-center">
                <p>No Self Hosted available at this point </p>
              </div>
            </div>
            <div
              className={cn(
                "absolute inset-0  pt-0 transition-all",
                tab === "apiBased"
                  ? "translate-x-0 opacity-100 duration-500 ease-out"
                  : tab === "selfHosted" || tab === "all"
                  ? "translate-x-[40%] opacity-0 pointer-events-none duration-300 ease-out"
                  : "-translate-x-[40%] opacity-0 pointer-events-none duration-300 ease-out"
              )}
            >
              <div className="w-full h-120 rounded-xl border border-black/20 flex justify-center items-center">
                <p>No API Based available at this point </p>
              </div>
            </div>
            <div
              className={cn(
                "absolute inset-0 pt-0 transition-all",
                tab === "fineTuned"
                  ? "translate-x-0 opacity-100 duration-500 ease-out"
                  : "translate-x-[40%] opacity-0 pointer-events-none duration-300 ease-out"
              )}
            >
              <div className="w-full h-120 rounded-xl border border-black/20 flex justify-center items-center">
                <p>No Fine Tuned to show</p>
              </div>
            </div>

            {filteredLLMs.length === 0 && (
              <div className="flex h-64 items-center justify-center text-gray-500">
                No LLMs found matching "{query}"
              </div>
            )}
          </div>
        </FadeUp>

        {/* Recent Acitvity */}
        {tab == "all" && (
          <div className="space-y-10 mt-20">
            <h2 className="text-2xl font-medium">Recent Activity</h2>
            <div className="w-full space-y-4">
              {Recent.map((recent, id) => (
                <div
                  key={id}
                  className="w-full h-fit flex gap-6 items-center group "
                >
                  <div className="w-13 h-12">
                    <span
                      className={cn(
                        "w-full h-full flex justify-center items-center  p-3.5 text-white bg-foreground rounded-lg -mt-1 "
                      )}
                    >
                      <SynthWave />
                    </span>
                  </div>
                  <div className="flex flex-col w-full">
                    <div className="w-full flex justify-between items-center  pt-5 pb-8">
                      <p>{recent.content}</p>
                      <p className="text-xs text-black/60">
                        {recent.recentActivity}
                      </p>
                    </div>
                    <div className="w-full h-[1px] bg-black/20">
                      <div className="w-full h-full bg-primary scale-x-0 group-hover:scale-x-100 duration-500 ease-in-out origin-left" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
