"use client";
import { useState } from "react";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, Download, FileText } from "lucide-react";
import { Bin } from "@/components/Icons";
import { RippleButton } from "@/components/ui/ripple-button";
import { PlusIcon } from "@/components/Icons";
import ConfigModel from "./ConfigModel";

const CONFIGS = [
  {
    id: "1",
    name: "llama3-8b-qlora",
    description: "QLoRA config for Llama 3 8B",
    fileName: "llama3_8b_qlora.yaml",
    createdAt: "10/01/2025",
  },
  {
    id: "2",
    name: "mistral-7b-lora",
    description: "LoRA fine-tuning for Mistral 7B",
    fileName: "mistral_7b_lora.yaml",
    createdAt: "11/01/2025",
  },
];

export default function ConfigList() {
      const [open, setOpen] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <RippleButton>
          <Button
            onClick={() => setOpen(true)}
            className="bg-sidebar-primary hover:bg-[#E64A19] text-white gap-3 rounded-full !px-6 !py-6 !cursor-pointer duration-300"
          >
            <PlusIcon />
            Add Config
          </Button>
        </RippleButton>
      </div>
      {CONFIGS.map((config) => (
        <Card
          key={config.id}
          className="border border-border-color-0 rounded-xl px-6 py-5 group bg-white hover:bg-sidebar-accent transition-all"
        >
          <div className="flex items-center justify-between">
            {/* Left Content */}
            <div className="space-y-2">
              <h3 className="text-lg font-medium text-black">{config.name}</h3>

              <p className="text-sm text-muted-foreground">
                {config.description}
              </p>

              <div className="flex items-center gap-2 text-sm text-foreground/70">
                <FileText className="h-4 w-4" />
                <span>{config.fileName}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col items-end justify-between gap-4">
              <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100">
                <Button
                  variant="ghost"
                  // onClick={() => setIsModalOpen(true)}
                  size="icon"
                  className="h-7 w-7 flex items-center justify-center px-1 py-1 text-foreground/80 hover:bg-white dark:text-foreground dark:hover:bg-white/30"
                >
                  <Eye />
                </Button>
                <Button
                  variant="ghost"
                  // onClick={() => setIsModalOpen(true)}
                  size="icon"
                  className="h-7 w-7 flex items-center justify-center px-1 py-1 text-foreground/80 hover:bg-white dark:text-foreground dark:hover:bg-white/30"
                >
                  <Download className="h-5 w-5 text-foreground/80" />
                </Button>
                <Button
                  variant="ghost"
                  // onClick={handleDeleteClick}
                  size="icon"
                  className="h-7 w-7 flex items-center justify-center px-1 py-1 text-red-500 hover:bg-white dark:hover:text-foreground dark:hover:bg-white/30"
                >
                  <Bin />
                </Button>
              </div>

              <span className="text-sm text-foreground/60">
                Created {config.createdAt}
              </span>
            </div>
          </div>
        </Card>
      ))}
       <ConfigModel open={open} onOpenChange={setOpen} />
    </div>
  );
}
