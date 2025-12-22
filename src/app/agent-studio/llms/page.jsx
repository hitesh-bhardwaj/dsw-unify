"use client";

import { useMemo, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  AiGenerator,
  DownloadIcon,
  LLMsIcon,
  PlusIcon,
} from "@/components/Icons";
import SearchBar from "@/components/search-bar";
import APIBasedCards from "@/components/LLM/APIBasedCards";
import { RippleButton } from "@/components/ui/ripple-button";
import AnimatedTabsSection from "@/components/common/TabsPane";
import LLMGrid from "@/components/LLMGrid";
import EmptyCard from "@/components/common/EmptyCard";
import { ScaleDown } from "@/components/animations/Animations";
import { motion } from "framer-motion";
import SelfHosted from "@/components/LLM/SelfHosted";
import ImportModal from "@/components/LLM/ImportModal";
import DeployModal from "@/components/LLM/DeployModal";
import FineTunedCards from "@/components/LLM/FineTunedCards";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/motion-tabs";
import * as llmsApi from "@/lib/api/llms";
import LLMFineTuning from "@/components/agent-studio/LLM/Finetuning";
import CardDetails from "@/components/CardDetails";

const FALLBACK_LLMS = [
  {
    id: "gpt-4-turbo",
    name: "GPT-4 Turbo",
    description: "OpenAI API Model",
    icon: <LLMsIcon />,
    status: "active",
    tags: ["general-purpose", "api-based", "production"],
    requests: "1,234",
    avgres: "2.3s",
    deploy: false,
  },
  {
    id: "mistral-7B-instruct",
    name: "Mistral 7B Instruct",
    description: "Self-hosted Mistral Model",
    icon: <LLMsIcon />,
    status: "active",
    tags: ["open-source", "self-hosted", "production"],
    requests: "1,234",
    avgres: "2.3s",
    deploy: false,
  },
  {
    id: "llama-2-7B",
    name: "Llama 2 7B",
    description: "Self-hosted Open Source",
    icon: <LLMsIcon />,
    status: "deploying",
    tags: ["open-source", "self-hosted", "development"],
    requests: "1,234",
    avgres: "2.3s",
    deploy: true,
  },
  {
    id: "custom-insurance-model",
    name: "Custom Insurance Model",
    description: "Fine-tuned Model",
    icon: <LLMsIcon />,
    status: "active",
    tags: ["fine-tuned", "insurance", "specialized"],
    requests: "1,234",
    avgres: "2.3s",
    performance: true,
    accuracy: "94.2%",
    latency: "1.8s",
  },
];

const FALLBACK_RECENT = [
  {
    content: "Mistral 7B Instruct deployment completed",
    recentActivity: "30 minutes ago",
    color: "green",
  },
  {
    content: "GPT-4 Turbo deployment completed",
    recentActivity: "2 hours ago",
    color: "green",
  },
  {
    content: "Llama 2 7B deployment started",
    recentActivity: "4 hours ago",
    color: "green",
  },
  {
    content: "Custom Insurance Model retrained",
    recentActivity: "1 day ago",
    color: "red",
  },
];

const stats = [
    {
      title: "Total Models",
      value: "04",
      description:""
    },
    {
      title: "Active Models",
      value: "03",
      description:""
    },
    {
      title: "Total Requests",
      value: "2090",
      description:""
    }
  ];


export default function LLMsPage() {
  const [topTab, setTopTab] = useState("hosted"); 
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [openImportModal, setOpenImportModal] = useState(false);
  const [openDeployModal, setOpenDeployModal] = useState(false);

  const [llms, setLlms] = useState(FALLBACK_LLMS);
  const [recentActivity, setRecentActivity] = useState(FALLBACK_RECENT);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const [llmsData, activityData] = await Promise.all([
          llmsApi.getLLMs(),
          llmsApi.getLLMActivity(),
        ]);

        setLlms(llmsData);
        setRecentActivity(activityData);
      } catch (err) {
        setError(err.message || "Failed to load LLMs");
        console.error("Error fetching LLMs:", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  const [selectedTags, setSelectedTags] = useState([]);
  const [view, setView] = useState("grid");
  const [sortOrder, setSortOrder] = useState("none");

  const availableTags = useMemo(() => {
    const all = new Set();
    llms.forEach((llm) => llm.tags.forEach((t) => all.add(t)));
    return Array.from(all).sort();
  }, [llms]);

  let filteredLLMs = useMemo(() => {
    const q = query.trim().toLowerCase();
    return llms.filter((llm) => {
      const matchesSearch =
        llm.name.toLowerCase().includes(q) ||
        llm.description.toLowerCase().includes(q) ||
        llm.tags.some((tag) => tag.toLowerCase().includes(q));

      const matchesTags =
        selectedTags.length === 0 ||
        selectedTags.some((tag) => llm.tags.includes(tag));

      return matchesSearch && matchesTags;
    });
  }, [query, selectedTags, llms]);

  if (sortOrder === "asc") {
    filteredLLMs = filteredLLMs.sort((a, b) =>
      a.name.localeCompare(b.name)
    );
  } else if (sortOrder === "desc") {
    filteredLLMs = filteredLLMs.sort((a, b) =>
      b.name.localeCompare(a.name)
    );
  }

  const llmTabs = [
    {
      id: "all",
      value: "all",
      label: "All Models",
      name: "All Models",
      render: ({ filteredLLMs }) =>
        filteredLLMs.length > 0 ? (
          <LLMGrid
            items={filteredLLMs}
            view={view}
            selectedTags={selectedTags}
            onTagsChange={setSelectedTags}
            availableTags={availableTags}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
            setView={setView}
          />
        ) : (
          <EmptyCard />
        ),
    },
    {
      id: "tab-self",
      value: "selfHosted",
      label: "Self Hosted",
      name: "Self Hosted",
      render: () => <SelfHosted />,
    },
    {
      id: "tab-api",
      value: "apiBased",
      label: "API Based",
      name: "API Based",
      render: () => (
        <APIBasedCards />
      ),
    },
    {
      id: "tab-fine",
      value: "fineTuned",
      label: "Fine Tuned",
      name: "Fine Tuned",
      render: () => (
        <FineTunedCards />
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
      {/* TOP TABS  */}
        <div className="flex items-center justify-between p-6">
            
          <div className="space-y-2">
              <h1 className="text-3xl font-medium text-foreground">LLMs</h1>
            </div>
             <div className="gap-2 flex">
              {/* <RippleButton>
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
                </RippleButton> */}

               {/* <RippleButton>
                <Button
                  variant="outline"
                  onClick={() => setOpenImportModal(true)}
                  className="gap-2 text-foreground border border-primary"
                >
                  <div className="!w-4">
                    <DownloadIcon />
                  </div>
                  Import Model
                </Button>
              </RippleButton> */}

                <RippleButton>
                <Link href="#">
                  <Button onClick={() => setOpenDeployModal(true)} className="bg-sidebar-primary hover:bg-[#E64A19] text-white gap-3 rounded-full !px-6 !py-6 !cursor-pointer duration-300">
                    <PlusIcon />
                    Deploy New Model
                  </Button>
                </Link>
              </RippleButton>
              </div>
              
            </div>
      <div className="px-6 space-y-6">
            <CardDetails data={stats} textSize='text-4xl'/>
      </div>
     
      <div className="px-6 pt-6 pb-0">
        <Tabs value={topTab} onValueChange={setTopTab}>
          <TabsList className="w-fit border border-border dark:bg-card">
            <TabsTrigger value="hosted" className="px-4 font-normal">
              Hosted LLMs
            </TabsTrigger>
            <TabsTrigger value="finetuning" className="px-4 font-normal">
              Finetuning
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/*  CONTENT SWITCH */}
      {topTab === "hosted" ? (
        <ScaleDown>
          <div className="space-y-6 p-6">
            {/* HEADER */}
          

            <SearchBar
              placeholder="Search LLMs..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />

            <AnimatedTabsSection
              items={llmTabs}
              ctx={{ filteredLLMs, query }}
              onValueChange={setActiveTab}
              defaultValue="all"
            />

            {activeTab === "all" && (
              <div className="space-y-10 mt-20">
                <h2 className="text-2xl font-medium">Recent Activity</h2>

                 <div className="w-full space-y-4">
                {recentActivity.map((recent, id) => (
                  <div
                    key={id}
                    className="w-full h-fit flex gap-6 items-center group"
                  >
                    <div className="w-3 h-3">
                      <div
                        className={`h-full w-full rounded-full ${
                          recent.color === "green"
                            ? "bg-badge-green"
                            : "bg-red-500"
                        }`}
                      />
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
          )}
        </div>
 
        </ScaleDown>
      ) : (
      
         <LLMFineTuning />
      
      )}

      <ImportModal open={openImportModal} onOpenChange={setOpenImportModal} />
      <DeployModal open={openDeployModal} onOpenChange={setOpenDeployModal} />
    </div>
  );
}
