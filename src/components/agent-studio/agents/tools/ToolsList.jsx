"use client";

import React, { useState } from "react";
import SwitchPopover from "../SwitchPopover";
import Link from "next/link";
import { RippleButton } from "@/components/ui/ripple-button";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "@/components/Icons";
import ToolCreateModal from "./ToolsCreateModal";
const tools = [
  {
    id: 1,
    name: "Web Search",
    description: "Search the web for information",
  },
  {
    id: 2,
    name: "Calculator",
    description: "Perform mathematical calculations",
  },
  {
    id: 3,
    name: "Code Interpreter",
    description: "Execute and analyze code",
  },
  {
    id: 4,
    name: "Image Generator",
    description: "Generate images from text",
  },
  {
    id: 5,
    name: "File Reader",
    description: "Read and analyze files",
  },
  {
    id: 6,
    name: "Email Sender",
    description: "Send emails",
  },
  {
    id: 7,
    name: "Calendar",
    description: "Manage calendar events",
  },
  {
    id: 8,
    name: "Weather",
    description: "Get weather information",
  },
];

export default function ToolsList() {
  const handleConfigSave = (toolId, configData) => {
    console.log("Saved config for:", toolId, configData);
  };

    const [openCreateModal, setOpenCreateModal] = useState(false); 


  return (
    <div className="w-full rounded-2xl border border-border-color-0 p-6 space-y-2 bg-background">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-xl font-medium ">Tools Selection</h2>
          <p className="text-sm text-muted-foreground mb-6">
            Select tools and configure them for your agent
          </p>
        </div>
        <div>
          <Link href="/agent-studio/agents/create">
            <RippleButton>
              <Button
                onClick={() => setOpenCreateModal(true)} 
                variant="outline"
                className=" gap-2 text-foreground border border-primary !px-5 !py-0.8 !h-10"
              >
                <PlusIcon className="text-primary" />
                Create Tools
              </Button>
            </RippleButton>
          </Link>
        </div>
      </div>

      <div className="space-y-2">
        {tools.map((tool) => (
          <SwitchPopover key={tool.id} tool={tool} onSave={handleConfigSave} />
        ))}
      </div>
            <ToolCreateModal open={openCreateModal} onOpenChange={setOpenCreateModal} />

    </div>
  );
}
