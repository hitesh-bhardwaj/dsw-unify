"use client";

import { useState } from "react";
import { Switch } from "@/components/ui/switch";

const memoryOptions = [
  {
    id: "session",
    title: "Session Memory",
    description: "Remember context within a single conversation",
  },
  {
    id: "agent",
    title: "Agent Memory",
    description: "Remember information across all conversations with this agent",
  },
  {
    id: "organization",
    title: "Organization Memory",
    description: "Share memory across all agents in your organization",
  },
];

export default function MemoriesList() {
  const [memoryStates, setMemoryStates] = useState({
    session: false,
    agent: false,
    organization: false,
  });

  const toggleMemory = (key, value) => {
    setMemoryStates((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div className="w-full border border-border-color-0 rounded-2xl p-6 bg-background dark:bg-card">
      {/* HEADER */}
      <h2 className="text-xl font-medium">Memory Settings</h2>
      <p className="text-sm text-muted-foreground mb-6">
        Configure memory levels for your agent
      </p>

      <div className="space-y-3">
        {memoryOptions.map((mem) => (
          <div
            key={mem.id}
            className="flex items-center justify-start gap-5 border border-border-color-0 rounded-xl px-5 py-4 bg-background dark:bg-card"
          >
            <Switch
              checked={memoryStates[mem.id]}
              onCheckedChange={(val) => toggleMemory(mem.id, val)}
              className="cursor-pointer"
            />
            <div>
              <h3 className="text-md font-medium">{mem.title}</h3>
              <p className="text-sm text-muted-foreground">{mem.description}</p>
            </div>

            
          </div>
        ))}
      </div>
    </div>
  );
}
