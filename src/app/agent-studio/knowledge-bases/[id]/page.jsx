"use client";

import { use, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { AiGenerator, Bin, ConfigureIcon } from "@/components/Icons";
import { Badge } from "@/components/ui/badge";
import CountUp from "@/components/animations/CountUp";
import LeftArrowAnim from "@/components/animations/LeftArrowAnim";
import { RippleButton } from "@/components/ui/ripple-button";
import AnimatedTabsSection from "@/components/common/TabsPane";
import EmptyCard from "@/components/common/EmptyCard";
import LLMConfigurationGrid from "@/components/llm-configuration-grid";
import { Skeleton } from "@/components/ui/skeleton";
import { ScaleDown } from "@/components/animations/Animations";
import Documents from "@/components/knowledge-bases/documents";
import Link from "next/link";
import { RefreshCcw } from "lucide-react";
import Activity from "@/components/knowledge-bases/activity";
import Settings from "@/components/knowledge-bases/settings";
import StorageStrategy from "@/components/knowledge-bases/storage-strategy";

export default function KnowledgeBaseDetailPage({ params }) {
  const { id } = use(params);

  function slugToTitle(slug) {
  if (!slug) return "";
  
  return slug
    .split("-")                
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))  
    .join(" ");                
}

    const title = slugToTitle(id);


  // show the metrics skeleton only once per LLM id
  const [mounted, setMounted] = useState(false);
  const [showMetricsSkeleton, setShowMetricsSkeleton] = useState(true);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const STORAGE_KEY = `LLMsDetail:metricsSkeletonShown:${id ?? "global"}`;
    const alreadyShown = localStorage.getItem(STORAGE_KEY) === "1";

    if (alreadyShown) {
      setShowMetricsSkeleton(false);
      return;
    }
    const t = setTimeout(() => {
      setShowMetricsSkeleton(false);
      localStorage.setItem(STORAGE_KEY, "1");
    }, 500);

    return () => clearTimeout(t);
  }, [mounted, id]);

  const items = [
    {
      id: "documents",
      value: "documents",
      label: "Documents",
      name: "Documents",
      render: () => <Documents/>
    },
    {
      id: "storage-strategy",
      value: "storage-strategy",
      label: "Storage Strategy",
      name: "Storage Strategy",
      render: () => (
        <StorageStrategy/>
      ),
    },
    {
      id: "activity",
      value: "activity",
      label: "Activity",
      name: "Activity",
      render: () => (
        <Activity/>
      ),
    },
    {
      id: "settings",
      value: "settings",
      label: "Settings",
      name: "Settings",
      render: () => (
        <Settings />
      ),
    },
  ];

  // Mock data
  const knowledgeBase = {
    id,
    name: "Company Documentation",
    description: "Internal company policies and procedures",
    status: "active",
    documents: "1,250",
    storage: "2.3 GB",
    source:"Google Drive"
  };

  if (!mounted) return null;

  return (
    <div className="flex flex-col h-full w-full overflow-hidden">
      {/* Header */}
      <ScaleDown>
        <div className="bg-background p-6 space-y-6 h-full">
          <div className="flex items-center justify-between mb-10">
            <div className="flex gap-3">
              <LeftArrowAnim link={"/agent-studio/knowledge-bases"} />
              <div className="space-y-2">
                <div className="w-fit flex gap-2 items-center">
                  <h1 className="text-xl font-medium">{title}</h1>
                  <Badge className="py-1 text-xs font-medium bg-transparent text-foreground border border-badge-green">
                    Active
                  </Badge>
                  <p className="text-xs">Last synced 2 hours ago</p>
                </div>
                <p className="text-sm text-gray-600 pl-0.5 dark:text-foreground">
                  {knowledgeBase.description}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
                <RippleButton>
                <Link href={"#"}>
                  <Button
                    variant="outline"
                    className="gap-2 text-foreground border border-primary"
                  >
                    <div className="!w-4 text-red">
                     <Bin/>
                    </div>
                    Delete
                  </Button>
                </Link>
              </RippleButton>
              <RippleButton>
                <Link href={"#"}>
                  <Button
                    variant="outline"
                    className="gap-2 text-foreground border border-primary"
                  >
                    <div className="!w-4">
                      <ConfigureIcon/>
                    </div>
                    Settings
                  </Button>
                </Link>
              </RippleButton>
              <RippleButton>
                <Button className="bg-primary hover:bg-[#E64A19] text-white gap-2">
                  <div className="w-5">
                    <RefreshCcw/>
                  </div>
                  Sync Now
                </Button>
              </RippleButton>
            </div>
          </div>

          {/* Metrics row – skeleton only once per id */}
          {showMetricsSkeleton ? (
            <div className="w-full flex gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="w-[25%] h-fit rounded-2xl border border-border-color-1 flex flex-col justify-center items-center py-8 hover:shadow-xl duration-500 ease-out"
                >
                  <Skeleton className="h-8 w-28 mb-3" />
                  <Skeleton className="h-4 w-40" />
                </div>
              ))}
            </div>
          ) : (
            <div className="w-full flex gap-4">
              <div className="w-1/3 h-fit rounded-2xl border border-border-color-1 flex flex-col items-start py-4 gap-10 px-5 hover:shadow-xl duration-500 ease-out countUpContainer">
                <p className="text-foreground/60 text-sm ">Documents</p>
                <p className="text-3xl font-medium dark:text-foreground text-foreground">
                  <CountUp value={knowledgeBase.documents} duration={1.2} startOnView once />
                </p>
                
              </div>
              <div className="w-1/3 h-fit rounded-2xl border border-border-color-1 flex flex-col items-start py-4 gap-10 px-5 hover:shadow-xl duration-500 ease-out countUpContainer">
                <p className="text-foreground/60 text-sm">Storage</p>
                <p className="text-3xl font-medium dark:text-foreground text-foreground">
                  <CountUp value={knowledgeBase.storage} duration={1.2} startOnView once />
                </p>
                
              </div>
              <div className="w-1/3 h-fit rounded-2xl border border-border-color-1 flex flex-col items-start py-4 gap-10 px-5 hover:shadow-xl duration-500 ease-out countUpContainer">
                <p className="text-foreground/60 text-sm">Source</p>
                <p className="text-3xl font-medium dark:text-foreground text-foreground">
                  {knowledgeBase.source}
                </p>
              </div>
            </div>
          )}

          <AnimatedTabsSection items={items} defaultValue="configuration" />
        </div>
      </ScaleDown>
    </div>
  );
}
