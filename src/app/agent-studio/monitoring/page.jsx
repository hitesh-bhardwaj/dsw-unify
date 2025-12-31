"use client";
import { useState, useEffect } from "react";

import ErrorMetricsDashboard from "@/components/agent-studio/monitoring/ErrorMetricsDashboard";
import GuardrailsDashboard from "@/components/agent-studio/monitoring/GuardrailsDashboard";
import LatencyDashboard from "@/components/agent-studio/monitoring/LatencyDashboard";
import LLMDashboard from "@/components/agent-studio/monitoring/LLMDashboard";
import SuccessMetricsDashboard from "@/components/agent-studio/monitoring/SuccessMetricsDashboard";
import TrafficMetricsDashboard from "@/components/agent-studio/monitoring/TrafficMonitoringDashboard";
import { ScaleDown } from "@/components/animations/Animations";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import * as monitoringApi from "@/lib/api/monitoring";

const OPTIONS_FALLBACK = [
  { id: "agent-1", name: "Customer Support Agent", status: "active" },
  { id: "agent-2", name: "Sales Assistant Agent", status: "active" },
  { id: "agent-3", name: "technical Documentation Agent", status: "active" },
];

export default function TestingPage() {
  const [agent, setAgent] = useState(""); 
  const [agents, setAgents] = useState(OPTIONS_FALLBACK);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch agents list on mount
  useEffect(() => {
    async function fetchAgents() {
      try {
        setIsLoading(true);
        const data = await monitoringApi.getMonitoringAgents();
        setAgents(data);
      } catch (err) {
        setError(err.message || "Failed to load agents");
        console.error("Error fetching agents:", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchAgents();
  }, []);

  return (
    <div className="flex flex-col h-full w-full overflow-hidden">
      <ScaleDown>
        <div className="space-y-6 p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <h1 className="text-3xl font-medium text-foreground">
                Agent Monitoring
              </h1>
              <p className="mt-1 text-sm text-gray-600 dark:text-foreground">
                Monitor agent performance, interactions, and guardrails
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-2 w-[40%]">
            <label className="text-sm text-foreground">Select Agent</label>

            {error && (
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            )}

            <Select value={agent} onValueChange={setAgent} disabled={isLoading}>
              <SelectTrigger className="placeholder:text-foreground/40 cursor-pointer border border-border-color-0 !h-10.5 w-[70%] [&>svg]:transition-transform [&>svg]:duration-200 disabled:opacity-50 disabled:cursor-not-allowed">
                <SelectValue placeholder={isLoading ? "Loading agents..." : "Choose an agent"} />
              </SelectTrigger>

              <SelectContent className="border border-border-color-0">
                {agents.map((agentOption) => (
                  <SelectItem key={agentOption.id} value={agentOption.id} className="!cursor-pointer">
                    <div className="flex items-center justify-between w-full gap-3">
                      <span>{agentOption.name}</span>
                      <span className="px-3 py-1 text-xs border border-badge-green rounded-full">
                        {agentOption.status === "active" ? "Active" : "Inactive"}
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/*  Show dashboards only after selection */}
          {agent ? (
            <div className="space-y-6">
              <TrafficMetricsDashboard agentId={agent} />
              <GuardrailsDashboard agentId={agent} />
              <LatencyDashboard agentId={agent} />
              <LLMDashboard agentId={agent} />
              <ErrorMetricsDashboard agentId={agent} />
              <SuccessMetricsDashboard agentId={agent} />
            </div>
          ) : (
            <div className="mt-6 rounded-lg border  border-border-color-2 p-6 text-sm text-gray-600">
              {isLoading ? "Loading..." : "Select an agent to view dashboards."}
            </div>
          )}
        </div>
      </ScaleDown>
    </div>
  );
}
