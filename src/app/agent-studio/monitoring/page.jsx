"use client";
import { useState } from "react";

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

const OPTIONS = [
  "Customer Support Agent",
  "Sales Assistant Agent",
  "technical Documentation Agent",
];

export default function TestingPage() {
  const [agent, setAgent] = useState(""); // ✅ selected agent

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

            <Select value={agent} onValueChange={setAgent}>
              <SelectTrigger className="placeholder:text-foreground/40 cursor-pointer border border-border-color-0 !h-10.5 w-[70%] [&>svg]:transition-transform [&>svg]:duration-200">
                <SelectValue placeholder="Choose an agent" />
              </SelectTrigger>

              <SelectContent className="border border-border-color-0">
                {OPTIONS.map((c) => (
                  <SelectItem key={c} value={c} className="!cursor-pointer">
                    <div className="flex items-center justify-between w-full gap-3">
                      <span>{c}</span>
                      <span className="px-3 py-1 text-xs border border-badge-green rounded-full">
                        Active
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* ✅ Show dashboards only after selection */}
          {agent ? (
            <div className="space-y-6">
              <TrafficMetricsDashboard />
              <GuardrailsDashboard />
              <LatencyDashboard />
              <LLMDashboard />
              <ErrorMetricsDashboard />
              <SuccessMetricsDashboard />
            </div>
          ) : (
            <div className="mt-6 rounded-lg border  border-border-color-2 p-6 text-sm text-gray-600">
              Select an agent to view dashboards.
            </div>
          )}
        </div>
      </ScaleDown>
    </div>
  );
}
