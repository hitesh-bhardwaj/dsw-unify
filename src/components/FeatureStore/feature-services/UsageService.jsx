"use client";

import React from "react";
import { cn } from "@/lib/utils";

const services = [
  {
    id: 1,
    name: "Recommendation Model v2",
    environment: "Production deployment",
    lastAccessed: "5 minutes ago",
    status: "active",
  },
  {
    id: 2,
    name: "Customer Segmentation Model",
    environment: "Staging environment",
    lastAccessed: "2 hours ago",
    status: "testing",
  },
];

export default function UsageService() {
  return (
    <div className="space-y-4">
      {/* Header */}
      <h2 className="text-lg font-medium">
        Models Using This Service
      </h2>

      {/* Cards */}
      {services.map((service) => (
        <div
          key={service.id}
          className={cn(
            "rounded-xl border border-border-color-0",
            "",
            "px-6 py-5 flex items-start justify-between",
            "transition-all "
          )}
        >
          {/* Left Content */}
          <div className="space-y-1">
            <p className="text-base font-medium">
              {service.name}
            </p>

            <p className="text-sm text-muted-foreground">
              {service.environment}
            </p>

            <p className="text-sm text-muted-foreground">
              Last accessed: {service.lastAccessed}
            </p>
          </div>

          {/* Right Status */}
          <div className="flex items-center">
            {service.status === "active" ? (
              <span
                className={cn(
                  "rounded-full px-3 py-1 font-medium",
                  "border border-badge-green text-xs text-foreground"
                )}
              >
                Active
              </span>
            ) : (
              <span className="text-xs font-medium text-foreground border border-badge-yellow rounded-full px-3 py-1">
                Testing
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
