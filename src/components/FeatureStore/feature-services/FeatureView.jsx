"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Layers, Database } from "lucide-react";

const featureViews = [
  {
    id: 1,
    name: "Customer Demographics",
    features: 15,
    tables: 2,
    tableNames: ["customers", "addresses"],
  },
  {
    id: 2,
    name: "Transaction History",
    features: 22,
    tables: 3,
    tableNames: ["transactions", "orders", "payments"],
  },
  {
    id: 3,
    name: "User Behavior Metrics",
    features: 12,
    tables: 1,
    tableNames: ["user_events"],
  },
];

export default function FeatureView() {
  return (
    <div className="space-y-4">
      {/* Header */}
      <h2 className="text-lg font-medium">
        Included Feature Views{" "}
        <span className="text-muted-foreground">
          ({featureViews.length})
        </span>
      </h2>

      {/* Cards */}
      {featureViews.map((item) => (
        <div
          key={item.id}
          className={cn(
            "rounded-xl border border-border-color-0 ",
            "px-6 py-5 flex items-start justify-between gap-6",
            "transition-all "
          )}
        >
          {/* Left Content */}
          <div className="space-y-3">
            {/* Title */}
            <p className="text-base font-medium">
              {item.name}
            </p>

            {/* Meta */}
            <div className="flex items-center gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <Layers className="h-4 w-4" />
                <span>{item.features} features</span>
              </div>

              <div className="flex items-center gap-2">
                <Database className="h-4 w-4" />
                <span>{item.tables} tables</span>
              </div>
            </div>

            {/* Table Names */}
            <div className="flex items-center gap-6 text-xs font-medium">
              {item.tableNames.map((table) => (
                <span key={table}>{table}</span>
              ))}
            </div>
          </div>

          {/* Right Action */}
          <button
            className={cn(
              "text-sm font-medium",
              "text-foreground hover:underline cursor-pointer"
            )}
          >
            View Details
          </button>
        </div>
      ))}
    </div>
  );
}
