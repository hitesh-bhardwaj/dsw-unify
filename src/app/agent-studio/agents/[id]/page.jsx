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
import { motion } from "framer-motion";
import { ScaleDown } from "@/components/animations/Animations";
import SearchBar from "@/components/search-bar";

export default function AgentDetailPage({ params }) {
   const { id } = use(params);

  const [apiModalOpen, setApiModalOpen] = useState(false);

  // Show skeleton only once per agent id
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

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
  const agent = {
    id: id,
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

    const [query, setQuery] = useState("");

  const getActivityColor = (type) => {
    switch (type) {
      case "success":
        return "bg-green-500";
      case "error":
        return "bg-red-500";
      case "warning":
        return "bg-yellow-500";
      default:
        return "bg-gray-500";
    }
  };

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
                  <div className="!w-4 text-red-500">
                    <Bin/>
                  </div>
                  Delete
                </Button>
              </RippleButton>
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
        <div className="p-6 py-3">
         <SearchBar
                    placeholder="Search Agents..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                  </div>
        

        {/* Main Content */}
        <div className="flex-1 overflow-auto p-6 bg-background">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Top Cards Row */}
            <div className="grid grid-cols-3 gap-6">
              {isLoading ? (
                <>
                  <InfoCardSkeleton />
                  <MetricsSkeleton />
                  <HealthSkeleton />
                </>
              ) : (
                <>
                  {/* Agent Information */}
                  <Card>
                    <CardHeader>
                      <h2 className="text-xl font-medium">Agent Information</h2>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h3 className="text-sm font-medium text-gray-700 mb-2 dark:text-foreground">
                          Status
                        </h3>
                        <Badge className="bg-transparent border border-badge-green text-black">
                          {agent.status.charAt(0).toUpperCase() +
                            agent.status.slice(1)}
                        </Badge>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-700 mb-2 dark:text-foreground">
                          Tags
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {agent.tags.map((tag, index) => (
                            <Badge
                              key={index}
                              variant="secondary"
                              className="bg-transparent border border-border-color-1 font-light"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-700 mb-1 dark:text-foreground">
                          Last Modified
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-foreground">
                          {agent.lastModified}
                        </p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-700 mb-1 dark:text-foreground">
                          Usage
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-foreground">
                          {agent.usage}
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Performance Metrics */}
                  <Card>
                    <CardHeader>
                      <h2 className="text-xl font-medium">Performance Metrics</h2>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h3 className="text-3xl font-medium text-gray-900 dark:text-foreground">
                            <CountUp value={agent.metrics.totalRequests} />
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-foreground">
                            Total Requests
                          </p>
                        </div>
                        <div>
                          <h3 className="text-3xl font-medium text-gray-900 dark:text-foreground">
                            <CountUp value={agent.metrics.avgResponse} />
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-foreground">
                            Avg. Response
                          </p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h3 className="text-3xl font-medium">
                            <CountUp value={agent.metrics.successRate} />
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-foreground">
                            Success Rate
                          </p>
                        </div>
                        <div>
                          <h3 className="text-3xl font-medium text-gray-900 dark:text-foreground">
                            <CountUp value={agent.metrics.activeUsers} />
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-foreground">
                            Active Users
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* System Health */}
                  <Card>
                    <CardHeader>
                      <h2 className="text-xl font-medium">System Health</h2>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium text-gray-700 dark:text-foreground">
                          Last Activity
                        </h3>
                        <p className="text-sm text-forground font-medium">
                          {agent.health.lastActivity}
                        </p>
                      </div>
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium text-gray-700 dark:text-foreground">
                          Error Rate
                        </h3>
                        <p className="text-sm font-medium">
                          {agent.health.errorRate}
                        </p>
                      </div>
                      <span className="w-full h-[1px] bg-foreground/40 block mt-8" />
                      <div className="pt-4">
                        <div className="flex items-center gap-2 ">
                          <div className="w-4.5 h-4.5 ">
                            <SettingIcon />
                          </div>
                          <span className="text-sm">System Operational</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </>
              )}
            </div>

            {/* Recent Activity */}
            {isLoading ? (
              <RecentActivitySkeleton />
            ) : (
              <Card className={"border-none"}>
                <CardHeader>
                  <h2 className="text-xl font-semibold">Recent Activity</h2>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {agent.recentActivity.map((activity, index) => (
                      <div
                        key={index}
                        className="w-full flex flex-col gap-2 items-end group"
                      >
                        <div className="flex items-center justify-between py-4 w-full">
                          <div className="flex items-center gap-3">
                            <div
                              className={cn(
                                "h-2 w-2 rounded-full group-hover:animate-pulse",
                                getActivityColor(activity.type)
                              )}
                            />
                            <span className="text-sm text-gray-900 dark:text-foreground">
                              {activity.event}
                            </span>
                          </div>
                          <span className="text-sm text-gray-500 dark:text-foreground/80">
                            {activity.time}
                          </span>
                        </div>
                        <motion.div
                          custom={index}
                          initial="hidden"
                          animate="visible"
                          variants={separatorVariants}
                          className="w-full h-[1px] bg-foreground/40"
                        >
                          <div className="w-full h-full bg-primary scale-x-0 group-hover:scale-x-100 duration-500 ease-in-out origin-left" />
                        </motion.div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </ScaleDown>

      {/* API Modal */}
      <ApiEndpointModal
        open={apiModalOpen}
        onOpenChange={setApiModalOpen}
        agentId={agent.id}
      />
    </div>
  );
}
