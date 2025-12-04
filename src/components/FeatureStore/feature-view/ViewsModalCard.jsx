"use client";

import { useState } from "react";
import { Copy } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import AnimatedTabsSection from "../../common/TabsPane";
import EmptyCard from "../../common/EmptyCard";
import { Bin, Editor } from "../../Icons";
import { cn } from "@/lib/utils";
import { Badge } from "../../ui/badge";
import Overview from "./Overview";
import Features from "./Features";
import DataPreview from "./DataPreview";
import History from "./History";

function CopyWithTooltip({
  text,
  className = "",
  iconClassName = "h-4 w-4",
  "aria-label": ariaLabel,
}) {
  const [label, setLabel] = useState("Copy");

  const handleClick = () => {
    navigator.clipboard?.writeText?.(text).catch(() => {});
    setLabel("Copied");
  };

  return (
    <Tooltip onOpenChange={(o) => !o && setLabel("Copy")}>
      <TooltipTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          onClick={handleClick}
          className={`shrink-0 flex justify-center items-center cursor-pointer pr-0 py-5 px-5 min-w-8 bg-gray-100 rounded-lg border-foreground/20 ${className}`}
          aria-label={ariaLabel || label}
        >
          <Copy className={iconClassName} />
        </Button>
      </TooltipTrigger>
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  );
}

export default function ViewsCardModal({ open, onOpenChange, feature }) {
  const {
    id,
    name,
    description,
    createdAt,
    icon: Icon,
    tablesCount,
    lastUpdated,
    tags = [],
    featureNo,
    variant = "light",
  } = feature || {};

  const [activeTab, setActiveTab] = useState("overview");

  const items = [
    {
      id: "tab-overview",
      value: "overview",
      label: "Overview",
      name: "Overview",
      render: () => (
        <Overview description={description} featureNo={featureNo} tablesCount={tablesCount} createdAt={createdAt} lastUpdated={lastUpdated} />
      ),
    },

    {
      id: "tab-features",
      value: "features",
      label: "Features",
      name: "Features",
      render: () => <Features />,
    },

    {
      id: "tab-data-preview",
      value: "data-preview",
      label: "Data Preview",
      name: "Data Preview",
      render: () => <DataPreview />,
    },

    {
      id: "tab-history",
      value: "history",
      label: "History",
      name: "History",
      render: () => (
        <History />
      ),
    },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          "w-[80%] left-1/2 -translate-x-1/2 top-1/2 h-[80%] flex flex-col pt-10 "
        )}
      >
        <DialogHeader>
          <div className="flex justify-between items-start pr-8 pb-3 w-full">
            <div className="space-y-3">
              <DialogTitle className="text-2xl font-medium">{name}</DialogTitle>

              {/* <div className="flex gap-2 w-fit">
                {tags.map((tag, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className={cn(
                      "rounded-full border border-color-2 px-3 py-1 bg-white dark:bg-background text-xs font-light"
                    )}
                  >
                    {tag}
                  </Badge>
                ))}
              </div> */}
            </div>

            <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "h-7 w-7 flex items-center justify-center px-1 py-1 text-foreground",
                    "hover:bg-sidebar-accent dark:hover:bg-accent group-hover:text-foreground duration-500 ease-out"
                  )}
                >
                  <Copy className="!h-full !w-full" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "h-7 w-7 flex items-center justify-center px-1 py-1 text-primary",
                    "hover:bg-sidebar-accent dark:hover:bg-accent group-hover:text-primary duration-500 ease-out"
                  )}
                >
                  <Editor />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "h-7 w-7 flex items-center justify-center px-1 py-1 text-red-600",
                    "hover:bg-sidebar-accent dark:hover:bg-accent group-hover:text-red-600 duration-500 ease-out"
                  )}
                >
                  <Bin />
                </Button>
              </div>
          </div>
        </DialogHeader>

        <TooltipProvider delayDuration={200}>
          <div className="overflow-y-auto pr-2 w-full h-full">
            <AnimatedTabsSection
              items={items}
              onValueChange={setActiveTab}
              defaultValue={activeTab}
            />
          </div>
        </TooltipProvider>
      </DialogContent>
    </Dialog>
  );
}
