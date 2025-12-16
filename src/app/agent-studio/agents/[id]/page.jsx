"use client";

import { use, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { AiGenerator, APIIcon, Bin, EditIcon, RunTestsIcon, SettingIcon } from "@/components/Icons";
import ApiEndpointModal from "@/components/api-endpoint-modal";
import LeftArrowAnim from "@/components/animations/LeftArrowAnim";
import CountUp from "@/components/animations/CountUp";
import { RippleButton } from "@/components/ui/ripple-button";
import { ScaleDown } from "@/components/animations/Animations";
import SearchBar from "@/components/search-bar";
import EmptyCard from "@/components/common/EmptyCard";
import Overview from "@/components/agent-studio/agents/Overview";
import AnimatedTabsSection from "@/components/common/TabsPane";
import Guardrails from "@/components/agent-studio/agents/Guardrails";
import Conversations from "@/components/agent-studio/agents/Conversations";
import TestAgentModal from "@/components/agent-studio/agents/test-agent-modal";
import { useRouter } from "next/navigation";
import { ConfirmDialog } from "@/components/common/Confirm-Dialog";


export default function AgentDetailPage({ params }) {
   const { id } = use(params);

  const [apiModalOpen, setApiModalOpen] = useState(false);
  const router = useRouter();
const [isDeleteOpen, setIsDeleteOpen] = useState(false);

 
  // Show skeleton only once per agent id
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  const handleConfirmDelete = () => {
  // Redirect to agents page with delete instruction
  router.push(`/agent-studio/agents?deleteId=${id}`);

  // Close modal
  setIsDeleteOpen(false);
};


  const handleTrashClick = (e) => {
  e.preventDefault();
  e.stopPropagation();
  setIsDeleteOpen(true);
};


  const items = [
    {
      id: "overview",
      value: "overview",
      label: "Overview",
      name: "Overview",
      render: () => <Overview/>,
    },
    {
      id: "monitoring",
      value: "monitoring",
      label: "Monitoring",
      name: "Monitoring",
      render: () => (
        <EmptyCard children={"Monitoring configuration coming soon..."} />
      ),
    },
    {
      id: "performance",
      value: "performance",
      label: "Performance",
      name: "Performance",
      render: () => (
        <EmptyCard children={"Performance configuration coming soon..."} />
      ),
    },
    {
      id: "guardrails",
      value: "guardrails",
      label: "Guardrails",
      name: "Guardrails",
      render: () => (
        <Guardrails/>
      ),
    },
    {
      id: "conversations",
      value: "conversations",
      label: "Conversations",
      name: "Conversations",
      render: () => (
        <Conversations/>
      ),
    }
  ];

  const agent = {
    id: 0,
    name: "Auto Claims Processing Agent",
    description: "Automates auto insurance claims intake, validation, and processing",
    status: "active",
    tags: ["support", "customer-service"],
    lastModified: "2 Hours Ago",
    usage: "1.2K Request",
    metrics: {
      totalRequests: "12,847",
      avgResponse: "245ms",
      successRate: "99.2%",
      activeUsers: "156",
    },
    health: {
      lastActivity: "2 minutes ago",
      errorRate: "0.8%",
      systemStatus: "operational",
    },
    recentActivity: [
      { type: "success", event: "API call completed", time: "2 minutes ago" },
      { type: "success", event: "User interaction", time: "5 minutes ago" },
      { type: "success", event: "Knowledge base query", time: "12 minutes ago" },
      { type: "error", event: "Guardrail triggered", time: "18 minutes ago" },
      { type: "success", event: "Model inference", time: "25 minutes ago" },
    ],
  };

  // hydrate gate to avoid SSR mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  function slugToTitle(slug) {
  if (!slug) return "";
  
  return slug
    .split("-")                // break into words
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))  // capitalize
    .join(" ");                // rejoin with spaces
}
  const title = slugToTitle(id);

  useEffect(() => {
    if (!mounted) return;
    const key = `agentDetailSkeleton:${id ?? "global"}`;
    const alreadyShown =
      typeof window !== "undefined" && localStorage.getItem(key) === "1";

    if (alreadyShown) {
      setIsLoading(false);
      return;
    }

    // First visit: keep skeleton for at least 500ms, then disable for the future
    const t = setTimeout(() => {
      setIsLoading(false);
      localStorage.setItem(key, "1");
    }, 500);

    return () => clearTimeout(t);
  }, [mounted, id]);

  // Mock data - in real app, fetch based on id
  

    const [query, setQuery] = useState("");



  // Skeleton cards
  const InfoCardSkeleton = () => (
    <Card>
      <CardHeader>
        <Skeleton className="h-6 w-44" />
      </CardHeader>
      <CardContent className="space-y-7">
        <div>
          <Skeleton className="h-4 w-20 mb-2" />
          <Skeleton className="h-6 w-24 rounded-full" />
        </div>
        <div>
          <Skeleton className="h-4 w-20 mb-2" />
          <div className="flex gap-2">
            <Skeleton className="h-6 w-16 rounded-full" />
            <Skeleton className="h-6 w-20 rounded-full" />
          </div>
        </div>
        <div>
          <Skeleton className="h-4 w-24 mb-1" />
          <Skeleton className="h-4 w-28" />
        </div>
        <div>
          <Skeleton className="h-4 w-16 mb-1" />
          <Skeleton className="h-4 w-24" />
        </div>
      </CardContent>
    </Card>
  );

  const MetricsSkeleton = () => (
    <Card>
      <CardHeader>
        <Skeleton className="h-6 w-48" />
      </CardHeader>
      <CardContent className="space-y-7">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Skeleton className="h-8 w-32" />
            <Skeleton className="h-4 w-24 mt-2" />
          </div>
          <div>
            <Skeleton className="h-8 w-24" />
            <Skeleton className="h-4 w-28 mt-2" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Skeleton className="h-8 w-20" />
            <Skeleton className="h-4 w-24 mt-2" />
          </div>
          <div>
            <Skeleton className="h-8 w-16" />
            <Skeleton className="h-4 w-28 mt-2" />
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const HealthSkeleton = () => (
    <Card>
      <CardHeader>
        <Skeleton className="h-6 w-40" />
      </CardHeader>
      <CardContent className="space-y-7">
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-4 w-24" />
        </div>
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-16" />
        </div>
        <span className="w-full h-[1px] bg-black/20 block mt-8" />
        <div className="pt-4 flex items-center gap-2">
          <Skeleton className="h-5 w-5 rounded-full" />
          <Skeleton className="h-4 w-28" />
        </div>
      </CardContent>
    </Card>
  );

  const RecentActivitySkeleton = () => (
    <Card className="border-none">
      <CardHeader>
        <Skeleton className="h-6 w-40" />
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="w-full">
              <div className="flex items-center justify-between py-4 w-full">
                <div className="flex items-center gap-3">
                  <Skeleton className="h-2 w-2 rounded-full" />
                  <Skeleton className="h-4 w-56" />
                </div>
                <Skeleton className="h-4 w-24" />
              </div>
              <div className="w-full h-[1px] bg-black/20">
                <div className="w-full h-full bg-primary scale-x-0" />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  if (!mounted) {
    // optional: avoid any flicker during SSR hydration
    return null;
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <ScaleDown>
        <div className="bg-background p-6">
          <div className="flex items-center justify-between">
            <div className="flex gap-3">
              <LeftArrowAnim link={"/agent-studio/agents"} />
              <div>
                <h1 className="text-xl font-medium">{title}</h1>
                <p className="text-sm text-gray-600 pl-0.5 dark:text-foreground">
                  {agent.description}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <RippleButton>
                <Button
                  variant="outline"
                  onClick={() => setApiModalOpen(true)}
                  className="gap-2 text-foreground border border-primary"
                >
                  <div className="!w-4">
                    <APIIcon/>
                  </div>
                  API
                </Button>
              </RippleButton>
              <RippleButton>
                <Button
                  variant="outline"
                  
                  className="gap-2 text-foreground border border-primary"
                >
                  <div className="!w-4">
                    <RunTestsIcon/>
                  </div>
                  Test
                </Button>
              </RippleButton>
              <RippleButton>
                <Button
                  variant="outline"
                      onClick={handleTrashClick}

                  className="gap-2 text-foreground border border-primary"
                >
                  <div className="!w-4 text-red-500">
                    <Bin/>
                  </div>
                  Delete
                </Button>
              </RippleButton>
              
              <Link href={`/agent-studio/agents/${id}/edit`}>
                <RippleButton>
                  <Button className="bg-primary hover:bg-[#E64A19] text-white gap-2">
                    <div className="!w-4">
                      <EditIcon className={"text-white"} />
                    </div>
                    Edit Agent
                  </Button>
                </RippleButton>
              </Link>
            </div>
          </div>
        </div>
        <div className="p-6 py-3 space-y-3">
        {/* Main Content */}
       <AnimatedTabsSection
                    items={items}
                    defaultValue="overview"
                  />
                  </div>
      </ScaleDown>

      {/* API Modal */}
      <ApiEndpointModal
        open={apiModalOpen}
        onOpenChange={setApiModalOpen}
        agentId={agent.id}
      />

      <ConfirmDialog
  open={isDeleteOpen}
  onOpenChange={setIsDeleteOpen}
  title="Delete Agent?"
  description="This action cannot be undone. The agent will be permanently deleted."
  confirmText="Delete"
  variant="destructive"
  onConfirm={handleConfirmDelete}
/>

      
    </div>
  );
}
