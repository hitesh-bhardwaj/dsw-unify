"use client";

import React from "react";
import { Eye } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import AnimatedProgressBar from "@/components/animations/ProgressBar";

const TRAINING_DATA = [
  {
    id: 1,
    name: "customer-support-v1",
    description: "Customer support model training",
    status: "completed",
    progressText: "1000/1000 steps",
    progressPercent: 100,
    loss: "0.23",
    startedAt: "20/01/2024",
  },
  {
    id: 2,
    name: "tech-assistant-v2",
    description: "Technical assistant model training",
    status: "running",
    progressText: "450/800 steps",
    progressPercent: 56.3,
    loss: "0.45",
    startedAt: "22/01/2024",
  },
];

export default function TrainingList() {
  return (
    <div className="space-y-6">
      {TRAINING_DATA.map((item) => (
        <Card
          key={item.id}
          className="rounded-2xl border group border-border-color-0 p-6 bg-background"
        >
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <h3 className="text-base font-medium">{item.name}</h3>
              <p className="text-sm text-muted-foreground">
                {item.description}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <span
                className={cn(
                  "rounded-full px-3 border py-1 text-xs font-medium capitalize",
                  item.status === "completed"
                    ? "border-badge-green"
                    : "border-badge-yellow"
                )}
              >
                {item.status}
              </span>
              <Eye className="h-4 w-4 opacity-0 group-hover:opacity-100 text-muted-foreground cursor-pointer transition-opacity" />
            </div>
          </div>

          {/* Progress */}
          <div className="mt-2 space-y-2">
            <div className="flex items-center justify-between text-sm">
              <p className="text-muted-foreground">
                Progress: {item.progressText}
              </p>
              <p className="font-medium">
                {item.progressPercent.toFixed(1)}%
              </p>
            </div>

            <AnimatedProgressBar
              value={item.progressPercent}
              duration={1.2}
              ease="easeInOut"
              animateOnMount
              playKey={`training-${item.id}`}
              className="w-full"
              trackClassName="w-full bg-sidebar-accent rounded-full h-2 relative overflow-hidden"
              barClassName="bg-orange-500 h-full absolute top-0 left-0 z-[5] rounded-full"
            />
          </div>

          {/* Footer */}
          <div className=" flex items-center justify-between text-sm">
            <p className="text-muted-foreground">Loss: {item.loss}</p>
            <p className="text-muted-foreground">
              Started {item.startedAt}
            </p>
          </div>
        </Card>
      ))}
    </div>
  );
}
