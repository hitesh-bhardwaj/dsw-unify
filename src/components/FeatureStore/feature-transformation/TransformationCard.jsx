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
import { Bin, Editor, Eye } from "../../Icons";
import { cn } from "@/lib/utils";
import { Badge } from "../../ui/badge";
import DetailsTab from "./DetailsTab";
import PythonCodeBlock from "./CodeTab";

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



export default function HotEncoding({ open, onOpenChange, feature }) {
  const {
    id,
    name,
    description,
    icon: Icon,
    inputParams,
    tags = [],
    lastUpdated,
    createdAt,
    codeExamples,
    variant = "light",
  } = feature || {};
  const [activeTab, setActiveTab] = useState("details");

  const items = [
  {
    id: "tab-details",
    value: "details",
    label: "Details",
    name: "Details",
    render: () => <DetailsTab
                  description={description}
                  inputParams={inputParams}
                  lastUpdated={lastUpdated}
                  createdAt={createdAt}
                />
  },
  {
    id: "tab-code",
    value: "code",
    label: "Code",
    name: "Code",
    render: () => <PythonCodeBlock codeExamples={codeExamples} />
  },
  {
    id: "tab-history",
    value: "history",
    label: "History",
    name: "History",
    render: () => <EmptyCard>No History is available at this point</EmptyCard>,
  },
];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={
          "w-[80%] left-1/2 -translate-x-1/2 top-1/2 h-[80%] flex flex-col"
        }
      >
        <div className=" px-2 w-full h-fit">
          <DialogHeader>
            <div className="flex justify-between items-end pr-8 py-3  w-full">
              <div className="flex flex-col">
                <DialogTitle className="text-2xl font-medium">
                  {name}
                </DialogTitle>
                <div className="w-fit flex gap-2">
                  {tags.map((tag, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className={cn(
                        "rounded-full border border-color-2 px-3 py-1 bg-white dark:bg-background text-xs font-light transition-all duration-500 ease-out dark:group-hover:bg-background"
                      )}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "h-7 w-7 flex items-center justify-center px-1 py-1 text-foreground",
                    "hover:bg-white dark:hover:bg-accent group-hover:text-foreground duration-500 ease-out"
                  )}
                >
                  <Copy className="!h-full !w-full" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "h-7 w-7 flex items-center justify-center px-1 py-1 text-primary",
                    "hover:bg-white dark:hover:bg-accent group-hover:text-primary duration-500 ease-out"
                  )}
                >
                  <Editor />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "h-7 w-7 flex items-center justify-center px-1 py-1 text-red-600",
                    "hover:bg-white dark:hover:bg-accent group-hover:text-red-600 duration-500 ease-out"
                  )}
                >
                  <Bin />
                </Button>
              </div>
            </div>
          </DialogHeader>
        </div>
        <TooltipProvider delayDuration={200}>
          {/* Scrollable content */}
          <div className="overflow-y-auto pr-2 overflow-hidden w-full h-full relative">
            <AnimatedTabsSection
              items={items}
              onValueChange={setActiveTab}
              defaultValue={activeTab}
            />

          </div>

          {/* Custom scroll track + thumb */}
        </TooltipProvider>
      </DialogContent>
    </Dialog>
  );
}
