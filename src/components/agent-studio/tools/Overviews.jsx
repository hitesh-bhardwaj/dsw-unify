import React from "react";
import { Input } from "@/components/ui/input";

const stats = [
  {
    title: "Type",
    value: "Api",
    isActive: false,
  },
  {
    title: "Category",
    value: "Search",
    isActive: false,
  },
  {
    title: "Status",
    value: "Active",
    isActive: true,
  },
];

const Overviews = () => {
  return (
    <div className="space-y-6">
      <div className="w-full flex items-center justify-between gap-4">
        {stats.map((item, index) => (
          <div
            key={index}
            className="flex flex-col bg-white gap-10 border border-border-color-0 rounded-3xl py-6 px-4 w-full dark:bg-card"
          >
            <span className="text-sm text-foreground/80">{item.title}</span>

            <div className="flex items-center gap-2">
              <span className="text-2xl font-medium">{item.value}</span>
              {item.isActive && (
                <span className="text-xs border border-badge-green px-3 py-1 rounded-full">
                  Active
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="h-full bg-white rounded-3xl border border-border-color-0 p-6  space-y-2 dark:bg-card">
  {/* Header */}
  <h2 className="text-xl font-medium mb-6">Parameters</h2>

  {/* Query Field */}
  <div className="rounded-2xl border border-border-color-0 p-4 space-y-3">
    {/* Top Row */}
    <div className="flex items-center gap-3">
      <span className="text-sm font-medium">Query</span>
      <span className="text-sm text-muted-foreground">String</span>
      <span className="px-3 py-1 text-xs rounded-full border border-badge-blue text-black dark:text-foreground">
        Required
      </span>
    </div>

    

    {/* Helper Text */}
    <p className="text-xs text-muted-foreground">Search query</p>
  </div>

  {/* Limit Field */}
  <div className="rounded-2xl border border-border-color-0 p-4 space-y-3">
    {/* Top Row */}
    <div className="flex items-center gap-3">
      <span className="text-sm font-medium">Limit</span>
      <span className="text-sm text-muted-foreground">Number</span>
    </div>

    

    {/* Helper Text */}
    <p className="text-xs text-muted-foreground">Number of results</p>
  </div>
</div>

    </div>
  );
};

export default Overviews;
