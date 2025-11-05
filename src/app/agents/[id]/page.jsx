"use client";

import { use, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  AiGenerator,
  EditIcon,
  LeftArrow,
  SettingIcon,
} from "@/components/Icons";
import ApiEndpointModal from "@/components/api-endpoint-modal";
import LeftArrowAnim from "@/components/animations/LeftArrowAnim";
import CountUp from "@/components/animations/CountUp";
import { FadeUp } from "@/components/animations/Animations";
import { RippleButton } from "@/components/ui/ripple-button";

export default function AgentDetailPage({ params }) {
  const { id } = use(params);
  const [apiModalOpen, setApiModalOpen] = useState(false);

  // Mock data - in real app, fetch based on id
  const agent = {
    id: id,
    name: "Customer Support Agent",
    description: "Handles customer inquiries and support tickets",
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

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="bg-background p-6">
        <FadeUp>
        <div className="flex items-center justify-between">
          <div className="flex gap-3">
            <LeftArrowAnim link={"/agents"} />
            <div>
              <h1 className="text-xl font-medium">{agent.name}</h1>
              <p className="text-sm text-gray-600 pl-0.5">
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
                <AiGenerator />
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
                <AiGenerator />
              </div>
              Test
            </Button>
            </RippleButton>
            <Link href={`/agents/${id}/edit`}>
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
        </FadeUp>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto p-6 bg-background">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Top Cards Row */}
          <FadeUp delay={0.05}>
          <div className="grid grid-cols-3 gap-6">
            {/* Agent Information */}
            <Card>
              <CardHeader>
                <h2 className="text-xl font-medium">Agent Information</h2>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">
                    Status
                  </h3>
                  <Badge className="bg-badge-green text-white hover:bg-green-600">
                    {agent.status.charAt(0).toUpperCase() +
                      agent.status.slice(1)}
                  </Badge>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">
                    Tags
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {agent.tags.map((tag, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="bg-transparent border border-black/20 font-light"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-1">
                    Last Modified
                  </h3>
                  <p className="text-sm text-gray-600">{agent.lastModified}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-1">
                    Usage
                  </h3>
                  <p className="text-sm text-gray-600">{agent.usage}</p>
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
                    <h3 className="text-3xl font-medium text-gray-900">
                      <CountUp value={agent.metrics.totalRequests} />
                    </h3>
                    <p className="text-sm text-gray-600">Total Requests</p>
                  </div>
                  <div>
                    <h3 className="text-3xl font-medium text-gray-900">
                      <CountUp value={agent.metrics.avgResponse} />
                    </h3>
                    <p className="text-sm text-gray-600">Avg. Response</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-3xl font-medium text-green-500">
                      <CountUp value={agent.metrics.successRate} />
                    </h3>
                    <p className="text-sm text-gray-600">Success Rate</p>
                  </div>
                  <div>
                    <h3 className="text-3xl font-medium text-gray-900">
                      <CountUp value={agent.metrics.activeUsers} />
                    </h3>
                    <p className="text-sm text-gray-600">Active Users</p>
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
                  <h3 className="text-sm font-medium text-gray-700">
                    Last Activity
                  </h3>
                  <p className="text-sm text-forground font-medium">
                    {agent.health.lastActivity}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-700">
                    Error Rate
                  </h3>
                  <p className="text-sm text-red-600 font-medium">
                    {agent.health.errorRate}
                  </p>
                </div>
                <span className="w-full h-[1px] bg-black/20 block mt-8" />
                <div className="pt-4">
                  <div className="flex items-center gap-2 text-badge-green">
                    {/* <div className="h-2 w-2 rounded-full bg-badge-green" /> */}
                    <div className="w-4.5 h-4.5 text-badge-green">
                      <SettingIcon />
                    </div>
                    <span className="text-sm">System Operational</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          </FadeUp>

          {/* Recent Activity */}
          <Card className={"border-none"}>
            <FadeUp delay={0.1}>
            <CardHeader>
              <h2 className="text-xl font-semibold">Recent Activity</h2>
            </CardHeader>
            </FadeUp>
            <CardContent>
              <div className="space-y-4">
                {agent.recentActivity.map((activity, index) => (
                  <FadeUp delay={0.3+index/20} key={index}>
                  <div
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
                        <span className="text-sm text-gray-900">
                          {activity.event}
                        </span>
                      </div>
                      <span className="text-sm text-gray-500">
                        {activity.time}
                      </span>
                    </div>
                    {/* <span className="w-[98.5%] h-[1px] bg-black/20 block"/> */}
                    <div className="w-full h-[1px] bg-black/20">
                      <div className="w-full h-full bg-primary scale-x-0 group-hover:scale-x-100 duration-500 ease-in-out origin-left" />
                    </div>
                  </div>
                  </FadeUp>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* API Modal */}
      <ApiEndpointModal
        open={apiModalOpen}
        onOpenChange={setApiModalOpen}
        agentId={agent.id}
      />
    </div>
  );
}
