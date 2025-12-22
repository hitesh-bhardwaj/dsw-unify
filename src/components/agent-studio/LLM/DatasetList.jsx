"use client";

import { useState } from "react"
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, Download } from "lucide-react";
import { Bin, PlusIcon } from "@/components/Icons";
import { RippleButton } from "@/components/ui/ripple-button";
import { Badge } from "@/components/ui/badge";
import AddDatasetModal from "./DatasetModel";

const DATASETS = [
  {
    id: "1",
    name: "Customer Support Dataset",
    description: "Training data for customer service interactions",
    records: "1,250 records",
    size: "2.3 MB",
    format: "alpaca",
    createdAt: "15/01/2024",
  },
  {
    id: "2",
    name: "Technical Documentation",
    description: "Internal technical documentation for fine-tuning",
    records: "3,400 records",
    size: "5.7 MB",
    format: "chat",
    createdAt: "10/01/2024",
  },
];



export default function DatasetList() {
  const [open, setOpen] = useState(false);

  return (
    <div className="space-y-6">
      {/* Header Action */}
      <div className="flex justify-end">
        <RippleButton>
          <Button
            onClick={() => setOpen(true)}
            className="bg-sidebar-primary hover:bg-[#E64A19] text-white gap-3 rounded-full px-6 py-6"
          >
            <PlusIcon />
            Upload Dataset
          </Button>
        </RippleButton>
      </div>

      {/* Dataset Cards */}
      {DATASETS.map((dataset) => (
        <Card
          key={dataset.id}
          className="group bg-white border border-border-color-0 rounded-xl px-6 py-6 hover:bg-sidebar-accent transition-all"
        >
          <div className="flex items-center justify-between">
            {/* Left Content */}
            <div className="space-y-3">
              <h3 className="text-xl font-medium text-foreground">
                {dataset.name}
              </h3>

              <p className="text-sm text-muted-foreground">
                {dataset.description}
              </p>

              <div className="flex items-center gap-6 text-sm text-foreground/70">
                <span>{dataset.records}</span>
                <span>{dataset.size}</span>
              </div>
            </div>

            {/* Right Section */}
            <div className="flex flex-col items-end justify-between gap-4">
              {/* Top Row */}
              <div className="flex items-center gap-10">
                <Badge
                  variant="secondary"
                  className="rounded-full border border-border-color-0 bg-white dark:bg-background px-4 py-1 text-xs font-medium"
                >
                  {dataset.format}
                </Badge>

                <div className="flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    size="icon"
                    variant="ghost"
                   
                    className="h-7 w-7"
                  >
                    <Eye />
                  </Button>

                  <Button
                    size="icon"
                    variant="ghost"
                   
                    className="h-7 w-7"
                  >
                    <Download />
                  </Button>

                  <Button
                    size="icon"
                    variant="ghost"
               
                    className="h-5 w-5 text-red-500"
                  >
                    <Bin />
                  </Button>
                </div>
              </div>

              {/* Footer */}
              <span className="text-sm text-foreground/60">
                Created {dataset.createdAt}
              </span>
            </div>
          </div>
        </Card>
      ))}
      <AddDatasetModal open={open} onOpenChange={setOpen} />
    </div>
  );
}
