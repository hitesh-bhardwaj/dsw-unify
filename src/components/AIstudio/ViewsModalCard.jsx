"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  TooltipProvider,
} from "@/components/ui/tooltip";
import AnimatedTabsSection from "../../common/TabsPane";
import { Bin, Editor } from "../../Icons";
import { cn } from "@/lib/utils";
import Overview from "./Overview";
import Features from "./Features";
import DataPreview from "./DataPreview";
import History from "./History";
import CopyButton from "@/components/animate-ui/components/buttons/CopyButton";


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
export default function ViewsCardModal({ open, onOpenChange, feature }) {
  const {
    name,
    description,
    createdAt,
    icon: Icon,
    tablesCount,
    lastUpdated,
    featureNo,
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
            </div>

            <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "h-7 w-7 flex items-center justify-center px-1 py-1 text-foreground focus-visible:ring-0",
                    "hover:bg-sidebar-accent dark:hover:bg-accent group-hover:text-foreground duration-500 ease-out"
                  )}
                >
                  <CopyButton />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "h-7 w-7 flex items-center justify-center px-1 py-1",
                    "hover:bg-sidebar-accent dark:hover:bg-accent duration-500 ease-out"
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
