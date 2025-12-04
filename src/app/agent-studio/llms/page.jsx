"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import {
  AiGenerator,
  DownloadIcon,
  LLMsIcon,
  PlusIcon,
  SynthWave,
} from "@/components/Icons";
import { motion } from "framer-motion";
import SearchBar from "@/components/search-bar";
// import { FadeUp } from "@/components/animations/Animations";
import { RippleButton } from "@/components/ui/ripple-button";
import AnimatedTabsSection from "@/components/common/TabsPane";
import LLMGrid from "@/components/LLMGrid";
import EmptyCard from "@/components/common/EmptyCard";
import { ScaleDown } from "@/components/animations/Animations";

const LLMs = [
  {
    id: "gpt-4-turbo",
    name: "GPT-4 Turbo",
    description: "OpenAI API Model",
    icon:<LLMsIcon/>,
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
    icon:<LLMsIcon/>,
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
    icon:<LLMsIcon/>,
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
    icon:<LLMsIcon/>,
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
        color:'green',
  },
  {
    content: "GPT-4 Turbo deployment completed",
    recentActivity: "2 hours ago",
        color:'green',

  },
  { content: "Llama 2 7B deployment started", recentActivity: "4 hours ago",   color:'green',
 },
  { content: "Custom Insurance Model retrained", recentActivity: "1 day ago",   color:'red',
 },
];

export default function LLMsPage() {
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const filteredLLMs = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return LLMs;
    return LLMs.filter((llm) => {
      const inName = llm.name.toLowerCase().includes(q);
      const inDesc = llm.description.toLowerCase().includes(q);
      const inTags = (llm.tags || []).some((t) =>
        (t.label || "").toLowerCase().includes(q)
      );
      return inName || inDesc || inTags;
    });
  }, [query]);

  const ctx = { filteredLLMs, query };

  const items = [
    {
      id: "tab-all",
      value: "all",
      label: "All",
      name: "All",
      render: ({ filteredLLMs, query }) =>
        filteredLLMs.length > 0 ? (
          <LLMGrid items={filteredLLMs} />
        ) : (
          <div className="flex h-64 items-center justify-center text-gray-500 dark:text-foreground border border-border-color-1 rounded-xl">
            No LLMs found matching "{query}"
          </div>
        ),
    },
    {
      id: "tab-self",
      value: "selfHosted",
      label: "Self Hosted",
      name: "Self Hosted",
      render: () => (
        <EmptyCard>No Self Hosted LLM is available at this point</EmptyCard>
      ),
    },
    {
      id: "tab-api",
      value: "apiBased",
      label: "API Based",
      name: "API Based",
      render: () => (
        <EmptyCard>No API Based LLM is available at this point</EmptyCard>
      ),
    },
    {
      id: "tab-fine",
      value: "fineTuned",
      label: "Fine Tuned",
      name: "Fine Tuned",
      render: () => (
        <EmptyCard>No Finetuned LLM is available at this point</EmptyCard>
      ),
    },
  ];
  const separatorVariants = {
    hidden: { scaleX: 0, originX: 0 },
    visible: (i) => ({
      scaleX: 1,
      originX: 0,
      transition: {
        delay: i * 0.07,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  };

  return (
    <div className="flex flex-col h-full w-full overflow-hidden">
      {/* Header section */}
      <ScaleDown>
        <div className="space-y-6 p-6">
          {/* <FadeUp> */}
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <h1 className="text-3xl font-medium text-foreground">LLMs</h1>
            </div>
            <div className="gap-2 flex">
              <RippleButton>
                <Link href={"/agent-studio/llms/llm-finetuning"}>
                  <Button
                    variant="outline"
                    className="gap-2 text-foreground border border-primary"
                  >
                    <div className="!w-4">
                      <AiGenerator />
                    </div>
                    LLM Finetuning
                  </Button>
                </Link>
              </RippleButton>
              <RippleButton>
                <Button
                  variant="outline"
                  className="gap-2 text-foreground border border-primary"
                >
                  <div className="!w-4">
                    <DownloadIcon />
                  </div>
                  Import Model
                </Button>
              </RippleButton>
              <RippleButton>
                <Link href="#">
                  <Button className="bg-sidebar-primary hover:bg-[#E64A19] text-white gap-3 rounded-full !px-6 !py-6 !cursor-pointer duration-300">
                    <PlusIcon />
                    Deploy New Model
                  </Button>
                </Link>
              </RippleButton>
            </div>
          </div>
          {/* </FadeUp> */}

          {/* <FadeUp delay={0.02}> */}
          <SearchBar
            placeholder="Search LLMs..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {/* </FadeUp> */}

          {/* <FadeUp delay={0.04}> */}
          <AnimatedTabsSection
            items={items}
            ctx={ctx}
            onValueChange={setActiveTab}
            defaultValue="all"
          />
          {/* </FadeUp> */}

          {/* Recent Activity (still shows under "All") */}
          {activeTab === "all" && (
            // <FadeUp delay={0.06}>
            <div className="space-y-10 mt-20">
              <h2 className="text-2xl font-medium">Recent Activity</h2>
              <div className="w-full space-y-4">
                {Recent.map((recent, id) => (
                  <div
                    key={id}
                    className="w-full h-fit flex gap-6 items-center group "
                  >
                    <div className="w-3 h-3">
                      <div className={`h-full w-full rounded-full ${recent.color==='green'? 'bg-badge-green': 'bg-red-500'}`} />
                    </div>
                    <div className="flex flex-col w-full">
                      <div className="w-full flex justify-between items-center pt-5 pb-8">
                        <p>{recent.content}</p>
                        <p className="text-xs text-black/60">
                          {recent.recentActivity}
                        </p>
                      </div>
                      <motion.div
                        custom={id}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.5 }}
                        variants={separatorVariants}
                        className="w-full h-[1px] bg-foreground/20"
                      >
                        <div className="w-full h-full bg-primary scale-x-0 group-hover:scale-x-100 duration-500 ease-in-out origin-left" />
                      </motion.div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            // {/* </FadeUp> */}
          )}
        </div>
      </ScaleDown>
    </div>
  );
}
