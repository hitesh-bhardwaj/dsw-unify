"use client";

import React, { useState } from "react";
import Link from "next/link";
import SwitchPopover from "../SwitchPopover";
import KnowledgeBaseConfigPopover from "./KnowledgeConfigPopover"; 
import KnowledgeBaseCreateModal from "./CreateKnowledgePopup";
import { RippleButton } from "@/components/ui/ripple-button";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "@/components/Icons";

const KnowledgeBase = [
  {
    id: 1,
    name: "Company-Docs",
    description: "Company documentation and policies",
  },
  {
    id: 2,
    name: "Product-Manual",
    description: "Product manuals and guides",
  },
  {
    id: 3,
    name: "Faq-Database",
    description: "Frequently asked questions",
  },
  {
    id: 4,
    name: "Legal-Documents",
    description: "Legal and compliance documents",
  },
  {
    id: 5,
    name: "Training-Materials",
    description: "Training and educational content",
  },
];

export default function KnowledgeBaseList() {
  const [openCreateModal, setOpenCreateModal] = useState(false);

  // config modal
  const [openConfigModal, setOpenConfigModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleConfigSave = (id, configData) => {
    console.log("Saved config for:", id, configData);
  };

  const openConfig = (item) => {
    setSelectedItem(item);
    setOpenConfigModal(true);
  };

  return (
    <div className="w-full rounded-2xl border border-border-color-0 p-6 space-y-2 bg-background dark:bg-card">
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
                Create Knowledge Base
              </Button>
            </RippleButton>
          </Link>
        </div>
      </div>

      <div className="space-y-2">
        {KnowledgeBase.map((item) => (
          <SwitchPopover
                      key={item.id}
                      tool={item}
                      onOpenConfig={openConfig}   
                    />
        ))}
      </div>

      <KnowledgeBaseCreateModal
  open={openCreateModal}
  onOpenChange={setOpenCreateModal}
/>


      {/* CONFIG MODAL */}
      <KnowledgeBaseConfigPopover
        open={openConfigModal}
        onOpenChange={setOpenConfigModal}
        item={selectedItem}
        saveConfig={handleConfigSave}
      />
    </div>
  );
}
