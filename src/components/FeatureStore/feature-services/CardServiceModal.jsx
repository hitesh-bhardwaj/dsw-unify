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
import { Bin, Editor } from "../../Icons";
import { cn } from "@/lib/utils";
import ServiceOverview from "./ServiceOverview";
import { Badge } from "../../ui/badge";
import EmptyCard from "@/components/common/EmptyCard";
import CopyButton from "@/components/animate-ui/components/buttons/CopyButton";
import FeatureView from "./FeatureView";
import UsageService from "./UsageService";

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

/**
 * Modal component to display detailed information about a feature view, including overview, features, data preview, and history.
 *
 * @param {Object} props - The component props.
 * @param {boolean} props.open - Whether the modal is open.
 * @param {function} props.onOpenChange - Callback function when the open state changes.
 * @param {Object} props.feature - The feature view data.
 * @param {string} props.feature.id - The ID of the feature view.
 * @param {string} props.feature.name - The name of the feature view.
 * @param {string} props.feature.description - The description of the feature view.
 * @param {string} props.feature.createdAt - The creation timestamp or text.
 * @param {React.ReactNode} props.feature.icon - The icon for the feature view.
 * @param {string|number} props.feature.tablesCount - The number of tables.
 * @param {string} props.feature.lastUpdated - The last updated timestamp or text.
 * @param {Array<string>} [props.feature.tags=[]] - The tags associated with the feature view.
 * @param {string|number} props.feature.featureNo - The feature number.
 * @param {"light"|"dark"} [props.feature.variant="light"] - The variant of the card.
 * @returns {React.JSX.Element} The rendered ViewsCardModal component.
 */
export default function CardsServiceModal({ open, onOpenChange, feature }) {
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
        <ServiceOverview description={description} featureNo={featureNo} tablesCount={tablesCount} createdAt={createdAt} lastUpdated={lastUpdated} />
      ),
    },

    {
      id: "tab-features",
      value: "Feature View",
      label: "Feature View",
      name: "Feature View",
      render: () => <FeatureView />,
    },

    {
      id: "usage-service",
      value: "usage-service",
      label: "Usage Service",
      name: "Usage Service",
      render: () => <UsageService />,
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
                    "h-7 w-7 flex items-center justify-center px-1 py-1 text-foreground focus-visible:ring-0",
                    "hover:bg-sidebar-accent dark:hover:bg-white/30 group-hover:text-foreground duration-500 ease-out"
                  )}
                >
                  <CopyButton />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "h-7 w-7 flex items-center justify-center px-1 py-1",
                    "hover:bg-sidebar-accent dark:hover:bg-white/30 duration-500 ease-out"
                  )}
                >
                  <Editor />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "h-7 w-7 flex items-center justify-center px-1 py-1 text-red-600",
                    "hover:bg-sidebar-accent dark:hover:bg-white/30 group-hover:text-red-600 duration-500 ease-out"
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
