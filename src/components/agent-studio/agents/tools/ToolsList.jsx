"use client";

import React, { useState } from "react";
import SwitchPopover from "../SwitchPopover";
import CreateCustomToolModal from "@/components/agent-studio/CreateCustomToolModal";
import ToolConfigModal from "./ToolsConfigModal";

import { RippleButton } from "@/components/ui/ripple-button";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "@/components/Icons";

const tools = [
  { id: 1, name: "Web Search", description: "Search the web for information" },
  {
    id: 2,
    name: "Calculator",
    description: "Perform mathematical calculations",
  },
  { id: 3, name: "Code Interpreter", description: "Execute and analyze code" },
  { id: 4, name: "Image Generator", description: "Generate images from text" },
  { id: 5, name: "File Reader", description: "Read and analyze files" },
  { id: 6, name: "Email Sender", description: "Send emails" },
  { id: 7, name: "Calendar", description: "Manage calendar events" },
  { id: 8, name: "Weather", description: "Get weather information" },
];

export default function ToolsList() {
  // Create modal
  const [openCreateModal, setOpenCreateModal] = useState(false);

  // Config modal
  const [openConfigModal, setOpenConfigModal] = useState(false);
  const [selectedTool, setSelectedTool] = useState(null);

  const [searchEngine, setSearchEngine] = useState("Google");
  const [maxResults, setMaxResults] = useState("5");

  const handleConfigSave = (toolId, configData) => {
    console.log("Saved config for:", toolId, configData);
  };

  const openModal = (tool) => {
    setSelectedTool(tool);
    setOpenConfigModal(true);
  };

  const saveConfig = () => {
    handleConfigSave(selectedTool.id, { searchEngine, maxResults });
    setOpenConfigModal(false);
  };

  return (
    <div className="w-full rounded-2xl border border-border-color-0 p-6 space-y-2 bg-white dark:bg-card">
      {/* HEADER */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-xl font-medium ">Tools Selection</h2>
          <p className="text-sm text-muted-foreground mb-6">
            Select tools and configure them for your agent
          </p>
        </div>

        <div>
          <RippleButton>
            <Button
              onClick={() => setOpenCreateModal(true)}
              variant="outline"
              className=" gap-2 text-foreground bg-white border border-primary !px-5 !py-0.8 !h-10 dark:bg-transparent dark:border-primary"
            >
              <PlusIcon className="text-primary" />
              Add Custom Tool
            </Button>
          </RippleButton>
        </div>
      </div>

      {/* TOOL ROWS */}
      <div className="space-y-2">
        {tools.map((tool) => (
          <SwitchPopover key={tool.id} tool={tool} onOpenConfig={openModal} />
        ))}
      </div>

      {/* CREATE CUSTOM TOOL MODAL */}
      <CreateCustomToolModal
        open={openCreateModal}
        onOpenChange={setOpenCreateModal}
        tool={null}
      />

      <ToolConfigModal
        open={openConfigModal}
        onOpenChange={setOpenConfigModal}
        tool={selectedTool}
        searchEngine={searchEngine}
        setSearchEngine={setSearchEngine}
        maxResults={maxResults}
        setMaxResults={setMaxResults}
        saveConfig={saveConfig}
      />
    </div>
  );
}
