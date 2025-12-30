"use client";

import { use, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

import Link from "next/link";
import {
  Bin,
  EditIcon,
} from "@/components/Icons";
import ApiEndpointModal from "@/components/api-endpoint-modal";
import LeftArrowAnim from "@/components/animations/LeftArrowAnim";
import { RippleButton } from "@/components/ui/ripple-button";
import { ScaleDown } from "@/components/animations/Animations";
import Overview from "@/components/agent-studio/agents/Overview";
import AnimatedTabsSection from "@/components/common/TabsPane";
import { useRouter } from "next/navigation";
import { ConfirmDialog } from "@/components/common/Confirm-Dialog";
import MonitoringTab from "@/components/agent-studio/agents/MonitoringTab";
import APITab from "@/components/agent-studio/agents/APITab";
import * as agentsApi from "@/lib/api/agents";
import CountUp from "@/components/animations/CountUp";
import { LineGraph } from "@/components/Icons";

export default function AgentDetailPage({ params }) {
  const { id, versionId } = use(params);

  const [apiModalOpen, setApiModalOpen] = useState(false);
  const router = useRouter();
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
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
      id: "details",
      value: "details",
      label: "Details",
      name: "Details",
      render: () => <Overview />,
    },
    {
      id: "monitoring",
      value: "monitoring",
      label: "Monitoring",
      name: "Monitoring",
      render: () => (
        <MonitoringTab agentId={id} />
      ),
    },
    // {
    //   id: "performance",
    //   value: "performance",
    //   label: "Performance",
    //   name: "Performance",
    //   render: () => (
    //     <PerformanceTab/>
    //   ),
    // },
    {
      id: "api",
      value: "api",
      label: "API",
      name: "API",
      render: () => <APITab agentId={id} versionId={versionId} />,
    },
  ];

  // Fallback mock data
  const FALLBACK_AGENT = {
    id: 0,
    name: "Auto Claims Processing Agent",
    description:
      "Automates auto insurance claims intake, validation, and processing",
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
      {
        type: "success",
        event: "Knowledge base query",
        time: "12 minutes ago",
      },
      { type: "error", event: "Guardrail triggered", time: "18 minutes ago" },
      { type: "success", event: "Model inference", time: "25 minutes ago" },
    ],
  };

  const [agent, setAgent] = useState(FALLBACK_AGENT);

  // Mock stats data for top-level metrics
  const versionStats = [
    { title: "Owner", value: "Shivam Thakkar" },
    { title: "Created", value: "January 15, 2025" },
    { title: "Updated", value: "2 hours ago" },
    { title: "Agent Health", value: "99.2%" },
  ];

  // Fetch agent data from API
  useEffect(() => {
    async function fetchAgentData() {
      try {
        const [agentData, metricsData, healthData, activityData] = await Promise.all([
          agentsApi.getAgentById(id),
          agentsApi.getAgentMetrics(id),
          agentsApi.getAgentHealth(id),
          agentsApi.getAgentActivity(id),
        ]);

        setAgent({
          ...agentData,
          metrics: metricsData,
          health: healthData,
          recentActivity: activityData,
        });
      } catch (err) {
        console.error("Error fetching agent:", err);
      }
    }
    if (id) {
      fetchAgentData();
    }
  }, [id]);

  // hydrate gate to avoid SSR mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  function slugToTitle(slug) {
    if (!slug) return "";

    return slug
      .split("-") // break into words
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1)) // capitalize
      .join(" "); // rejoin with spaces
  }

  // Combine agent name + version name for title
  const title = `${agent.name} ${slugToTitle(versionId)}`;


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
              <LeftArrowAnim link={`/agent-studio/agents/${id}`} />
              <div>
                <h1 className="text-xl font-medium">{title}</h1>
                <p className="text-sm text-gray-600 pl-0.5 dark:text-foreground">
                  {agent.description}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {/* <RippleButton>
                <Button
                  variant="outline"
                  // onClick={() => setApiModalOpen(true)}
                  className="gap-2 text-foreground border border-primary"
                >
                  <div className="!w-4">
                    <APIIcon />
                  </div>
                  API
                </Button>
              </RippleButton> */}
              {/* <RippleButton>
                <Button
                
                  variant="outline"
                  onClick={() => router.push("/agent-studio/testing")}
                  className="gap-2 text-foreground border border-primary"
                >
                  <div className="!w-4">
                    <RunTestsIcon />
                  </div>
                  Test
                </Button>
              </RippleButton> */}
              <RippleButton>
                <Button
                  variant="outline"
                  onClick={handleTrashClick}
                  className="gap-2 text-foreground border border-primary"
                >
                  <div className="!w-4 text-red-500">
                    <Bin />
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

          {/* Top-level metrics */}
          <div className="w-full flex items-center justify-between gap-4 mt-8">
            {versionStats.map((item, index) => (
              <div
                key={index}
                className="flex flex-col gap-6 bg-white border border-border-color-0 rounded-3xl py-6 px-4 w-full dark:bg-card"
              >
                <span className="text-sm text-foreground/80">
                  {item.title}
                </span>
                {item.title === "Agent Health" ? (
                  <span className="text-badge-green text-xl flex items-center gap-1">
                    <LineGraph className="w-5 h-5" />
                    <CountUp value={item.value} startOnView className={"font-medium"} />
                  </span>
                ) : (
                  <span className="text-xl font-medium mt-2">
                    {item.value}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="p-6 py-3 space-y-3">
          {/* Main Content */}
          <AnimatedTabsSection items={items} defaultValue="details" />
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
