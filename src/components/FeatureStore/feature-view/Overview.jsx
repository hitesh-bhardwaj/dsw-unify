import React from "react";
import { ActiveIcon, Calendar, DocumentIcon, FeaturesIcon, FeatureTransformationIcon, SynthWave, TablesIcon } from "@/components/Icons";

const Overview = ({
  description,
  featureNo,
  tablesCount,
  createdAt,
  lastUpdated,
}) => {
  return (
    <div>
      <div className="space-y-8 pb-10">
        {/* Description */}
        <div className="space-y-2">
          <div className="text-sm font-medium pb-2">Description</div>
          <div className="border border-border-color-2 rounded-lg py-6 px-6 text-xs bg-white dark:bg-background">
            {description || "No description available"}
          </div>
        </div>

        {/* Details Section */}
        <div className="space-y-3">
          <div className="text-sm font-medium">Details</div>
          <div className="flex justify-between items-center gap-4 border rounded-xl overflow-hidden border-color-2">
            <div className=" p-4 flex gap-4 items-center">
              <div className="w-10 h-10 border border-color-2 rounded-lg bg-sidebar-accent   p-3">
                <FeaturesIcon/>
              </div>
              <div className="space-y-1">
                <div className="text-xs text-foreground/70">Features</div>
                <div className="text-xs font-medium">{featureNo || 0}</div>
              </div>
            </div>

            <div className=" p-4 flex gap-4 items-center">
              <div className="w-10 h-10 border border-color-2 rounded-lg bg-sidebar-accent   p-3">
                <TablesIcon/>
              </div>
              <div className="space-y-1">
                <div className="text-xs text-foreground/70">Tables</div>
                <div className="text-xs font-medium">{tablesCount || 0}</div>
              </div>
            </div>

            <div className=" p-4 flex gap-4 items-center">
              <div className="w-10 h-10 border border-color-2 rounded-lg bg-sidebar-accent   p-3">
               <FeatureTransformationIcon/>
              </div>
              <div className="space-y-1">
                <div className="text-xs text-foreground/70">
                  Transformations
                </div>
                <div className="text-xs font-medium">0</div>
              </div>
            </div>
          </div>
        </div>

        {/* Source Tables */}
        <div className="space-y-3">
          <div className="text-sm font-medium">Source Tables</div>
          <div className="border border-border-color-2 rounded-lg py-6 px-6 text-xs bg-white dark:bg-background  text-foreground/60">
            No source tables
          </div>
        </div>

        {/* Metadata */}
        <div className="space-y-3">
          <div className="text-sm font-medium">Metadata</div>
          <div className="flex justify-between items-center gap-4 border rounded-xl overflow-hidden border-color-2">
            <div className=" p-4 flex gap-4 items-center">
              <div className="w-10 h-10 border border-color-2 rounded-lg bg-sidebar-accent   p-3">
                <DocumentIcon/>
              </div>
              <div className="space-y-1">
                <div className="text-xs text-foreground/70">Created</div>
                <div className="text-xs font-medium">{createdAt || "N/A"}</div>
              </div>
            </div>

            <div className=" p-4 flex gap-4 items-center">
              <div className="w-10 h-10 border border-color-2 rounded-lg bg-sidebar-accent   p-3">
               <Calendar/>
              </div>
              <div className="space-y-1">
                <div className="text-xs text-foreground/70">Last Modified</div>
                <div className="text-xs font-medium">
                  {lastUpdated || "Just now"}
                </div>
              </div>
            </div>

            <div className=" p-4 flex gap-4 items-center">
              <div className="w-10 h-10 border border-color-2 rounded-lg bg-sidebar-accent   p-3">
                <ActiveIcon/>
              </div>
              <div className="space-y-1">
                <div className="text-xs text-foreground/70">Status</div>
                <div className="text-xs font-medium">Active</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
