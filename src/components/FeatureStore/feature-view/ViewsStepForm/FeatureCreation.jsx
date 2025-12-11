"use client";

import React, { useEffect, useState } from "react";
import AnimatedProgressBar from "@/components/animations/ProgressBar";
import { CheckCircle, Circle } from "lucide-react";
import { CompleteCircleIcon, InProgressIcon } from "@/components/Icons";

export default function FeatureCreation({ onCloseModal }) {
  const [progress, setProgress] = useState(0);

  const steps = [
    { label: "Analyzing table schemas" },
    { label: "Generating features from columns" },
    { label: "Applying transformations" },
    { label: "Validating feature definitions" },
    { label: "Registering features" },
  ];

  // Auto-increment progress for demo
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) return 100;
        return p + 20;
      });
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  // When progress reaches 100 → wait 2 sec → close modal
  useEffect(() => {
    if (progress === 100) {
      const timeout = setTimeout(() => {
        onCloseModal?.();
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [progress, onCloseModal]);

  const completedSteps = Math.floor(progress / 20);

  return (
    <div className="space-y-4 pb-10 pr-2">
      {/* Title */}
      <h2 className="text-xl font-medium text-foreground">Creating Features</h2>
      <p className="text-sm text-foreground/80 pt-2">
        Automatically generating features from your selected tables
      </p>

      {/* Card */}
      <div className="border border-border-color-0 rounded-3xl p-8 space-y-5">
        {/* Subtitle */}
        <h3 className="text-lg font-medium text-foreground">
          Validation Feature Definitions…
        </h3>

        {/* Progress Text */}
        <p className="text-sm text-foreground/80">{progress}% Complete</p>

        {/* Progress Bar */}
        <AnimatedProgressBar
          value={progress}
          duration={1.2}
          ease="easeInOut"
          animateOnMount
          className="w-full"
          trackClassName="w-full bg-gray-200 rounded-full h-2 relative overflow-hidden"
          barClassName="bg-badge-blue h-full absolute top-0 left-0 z-[5] rounded-full"
        />

        {/* Step List */}
        <div className="space-y-3 pt-3">
          {steps.map((step, index) => {
            const isDone = index < completedSteps;
            return (
              <div key={index} className="flex items-center gap-3">
                {isDone ? (
                  <CompleteCircleIcon className="text-badge-green w-5 h-5" />
                ) : (
                  <InProgressIcon className="text-foreground/40 w-5 h-5" />
                )}
                <span
                  className={`text-sm ${
                    isDone ? "text-foreground" : "text-foreground/60"
                  }`}
                >
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
