"use client";

import React, { useEffect, useState } from "react";
import AnimatedProgressBar from "@/components/animations/ProgressBar";
import { CompleteCircleIcon, InProgressIcon } from "@/components/Icons";
import { useParams, useRouter } from "next/navigation";

export default function ModelTraining({ modelName, onCloseModal }) {
  const [progress, setProgress] = useState(0);
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  const steps = [
    { label: "Preparing data" },
    { label: "Training models" },
    { label: "Evaluating performance" },
    { label: "Registering model" },
    { label: "Deploying model" },
  ];

  const progressIncrement = 100 / steps.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) return 100;
        return Math.min(p + progressIncrement, 100);
      });
    }, 1500);

    return () => clearInterval(interval);
  }, [progressIncrement]);

  useEffect(() => {
    if (progress >= 100 && id && modelName) {
      const timeout = setTimeout(() => {
        router.push(
          `/ai-studio/use-cases/${id}/${encodeURIComponent(modelName)}/version-01`
        );
      }, 500); // small success delay

      return () => clearTimeout(timeout);
    }
  }, [progress, id, modelName, router]);

  useEffect(() => {
    if (progress >= 100) {
      const timeout = setTimeout(() => {
        onCloseModal?.();
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [progress, onCloseModal]);

  const completedSteps = Math.floor((progress / 100) * steps.length);
  const currentStepIndex = Math.min(completedSteps, steps.length - 1);

  return (
    <div className="space-y-4 pb-10 pr-2">
      {/* Title */}
      <h2 className="text-xl font-medium text-foreground">
        Model Training
      </h2>
      <p className="text-sm text-foreground/80 pt-2">
        Please wait while we train and deploy your model
      </p>

      {/* Card */}
      <div className="border border-border-color-0 rounded-3xl p-8 space-y-5">
        {/* Animated Step Heading */}
        <div className="relative h-7 overflow-hidden">
          {steps.map((step, index) => (
            <h3
              key={index}
              className={`text-lg font-medium text-foreground absolute inset-0 transition-all duration-500 ${
                index === currentStepIndex
                  ? "opacity-100 translate-y-0"
                  : index < currentStepIndex
                  ? "opacity-0 -translate-y-full"
                  : "opacity-0 translate-y-full"
              }`}
            >
              {step.label}...
            </h3>
          ))}
        </div>

        {/* Progress Text */}
        <p className="text-sm text-foreground/80">
          {progress}% complete
        </p>

        {/* Progress Bar */}
        <AnimatedProgressBar
          value={progress}
          duration={1.2}
          ease="easeInOut"
          animateOnMount
          className="w-full"
          trackClassName="w-full bg-sidebar-accent rounded-full h-2 relative overflow-hidden"
          barClassName="bg-badge-blue h-full absolute top-0 left-0 z-[5] rounded-full"
        />

        {/* Step List */}
        <div className="space-y-3 pt-3">
          {steps.map((step, index) => {
            const isDone = index < completedSteps;
            return (
              <div key={index} className="flex items-center gap-3">
                {isDone ? (
                  <CompleteCircleIcon className="text-orange-500 w-5 h-5" />
                ) : (
                  <InProgressIcon
                    className="
                      w-5 h-5 
                      text-sidebar-accent dark:text-sidebar-accent
                      [--icon-contrast:black]
                      dark:[--icon-contrast:white]
                    "
                  />    
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
