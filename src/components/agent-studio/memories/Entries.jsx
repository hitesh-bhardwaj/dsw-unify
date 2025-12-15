"use client";

import { Database } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const entries = [
  {
    id: 1250,
    content: "Sample memory entry content would appear here...",
    time: "1 hours ago",
  },
  {
    id: 1249,
    content: "Sample memory entry content would appear here...",
    time: "2 hours ago",
  },
  {
    id: 1248,
    content: "Sample memory entry content would appear here...",
    time: "3 hours ago",
  },
  {
    id: 1247,
    content: "Sample memory entry content would appear here...",
    time: "4 hours ago",
  },
  {
    id: 1246,
    content: "Sample memory entry content would appear here...",
    time: "5 hours ago",
  },
];

export default function MemoryEntries() {
  return (
    <div className="w-full rounded-3xl border border-border-color-0 bg-background p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-medium">Recent Entries</h2>

        <Button
          variant="outline"
          className="rounded-full border-primary !h-10 text-pimary !px-8 gap-2 justify-start"
        >
          <Database className="h-5 w-5 text-primary" />
          <p className="text-black">

          View All
          </p>
        </Button>
      </div>

      {/* Entries */}
      <div className="space-y-2">
        {entries.map((entry) => (
          <div
            key={entry.id}
            className={cn(
              "w-full rounded-2xl border border-border-color-0",
              "px-5 py-3 flex items-center justify-between",
              "hover:bg-muted/40 transition-colors"
            )}
          >
            <div className="space-y-1">
              <p className="font-medium text-sm">
                Entry #{entry.id}
              </p>
              <p className="text-xs text-muted-foreground">
                {entry.content}
              </p>
            </div>

            <p className="text-xs text-muted-foreground whitespace-nowrap">
              {entry.time}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
