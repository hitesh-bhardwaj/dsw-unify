"use client";

import { useState } from "react";
// import { Search, Plus, MessageSquare, LayoutTemplate } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import {
  AiGenerator,
  DownloadIcon,
  PlusIcon,
  SearchIcon,
  SynthWave,
} from "@/components/Icons";
import { LLMCard } from "@/components/LLMCard";

// Mock data for agents
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
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredLLMs = LLMs.filter((llm) =>
    llm.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full">
      {/* Header section */}
      <div className="space-y-6 p-6">
        {/* Title and CTA */}
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

        {/* Search bar */}
        <div className="relative">
          <div className="absolute left-5 top-1/2  -translate-y-1/2 text-[#333333]">
            <SearchIcon className="!h-4 !w-auto" />
          </div>
          <Input
            placeholder="Search Prompts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 h-11 bg-white border-black/30 py-6 text-[#333333]"
          />
        </div>

        {/* Filter tabs */}
        <div className="flex gap-4 bg-[#F6F6F6] py-1.5 px-1.5 rounded-lg border border-gray-200">
          <button
            onClick={() => setActiveTab("all")}
            className={cn(
              "flex items-center gap-2 rounded-lg border px-4 py-3 text-sm justify-center transition-colors w-1/2 cursor-pointer",
              activeTab === "all"
                ? "border-[#DCDCDC] bg-white text-[#FF5722] font-medium"
                : "border-transparent text-gray-700 "
            )}
          >
            <span>All Models</span>
          </button>

          <button
            onClick={() => setActiveTab("selfHosted")}
            className={cn(
              "flex items-center gap-2 rounded-lg border px-4 py-3 text-sm justify-center transition-colors w-1/2 cursor-pointer",
              activeTab === "selfHosted"
                ? "border-[#DCDCDC] bg-white text-[#FF5722] font-medium"
                : "border-transparent text-gray-700 "
            )}
          >
            <span>Self-Hosted</span>
          </button>
          <button
            onClick={() => setActiveTab("apiBased")}
            className={cn(
              "flex items-center gap-2 rounded-lg border px-4 py-3 text-sm justify-center transition-colors w-1/2 cursor-pointer",
              activeTab === "apiBased"
                ? "border-[#DCDCDC] bg-white text-[#FF5722] font-medium"
                : "border-transparent text-gray-700 "
            )}
          >
            <span>API-Based</span>
          </button>
          <button
            onClick={() => setActiveTab("fineTuned")}
            className={cn(
              "flex items-center gap-2 rounded-lg border px-4 py-3 text-sm justify-center transition-colors w-1/2 cursor-pointer",
              activeTab === "fineTuned"
                ? "border-[#DCDCDC] bg-white text-[#FF5722] font-medium"
                : "border-transparent text-gray-700 "
            )}
          >
            <span>Fine-Tuned</span>
          </button>
        </div>

        {/* LLMs grid */}
        <div className="flex-1 overflow-auto pt-0">
          {activeTab == "all" ? (
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-stretch">
              {filteredLLMs.map((llm) => (
                <LLMCard key={llm.id} llm={llm} />
              ))}
            </div>
          ) : (
            <>
              <div className="grid gap-6 grid-cols-1 h-120">
                <div className="w-full border rounded-2xl h-full flex justify-center items-center text-black/50">
                  <p>"No {activeTab} to be shown"</p>
                </div>
              </div>
            </>
          )}

          {filteredLLMs.length === 0 && (
            <div className="flex h-64 items-center justify-center text-gray-500">
              No LLMs found matching "{searchQuery}"
            </div>
          )}
        </div>

        {/* Recent Acitvity */}
        {
         activeTab=="all"&& <div className="space-y-10 mt-20">
            <h2 className="text-2xl font-medium">Recent Activity</h2>
            <div className="w-full space-y-4">
              {Recent.map((recent, id) => (
                <div key={id} className="w-full h-fit flex gap-6 items-center">
                  <div className="w-13 h-12">
                    <span
                      className={cn(
                        "w-full h-full flex justify-center items-center  p-3.5 text-white bg-foreground rounded-lg -mt-1 "
                      )}
                    >
                      <SynthWave />
                    </span>
                  </div>
                  <div className="w-full flex justify-between items-center border-0 border-b-[1px] border-black/20 pt-5 pb-8">
                    <p>{recent.content}</p>
                    <p className="text-xs text-black/60">
                      {recent.recentActivity}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        }
      </div>
    </div>
  );
}
