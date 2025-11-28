"use client";

import React, { useState, useEffect, cloneElement } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ChevronRight } from "lucide-react";

export default function StepFormModal({ open, onOpenChange, steps = [] ,title}) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const totalSteps = steps.length;
  const currentStepConfig = steps[currentStepIndex];

  useEffect(() => {
    if (!open) {
      setCurrentStepIndex(0);
    }
  }, [open]);

  const fadeVariants = {
    initial: { opacity: 0, y: 8 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -8 },
  };

  const goNext = () => {
    setCurrentStepIndex((prev) =>
      prev < totalSteps - 1 ? prev + 1 : prev
    );
  };

  const goBack = () => {
    setCurrentStepIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleStepClick = (index) => {
    // Only allow going back or staying; no jumping ahead
    if (index <= currentStepIndex) {
      setCurrentStepIndex(index);
    }
  };

  const renderCurrentStep = () => {
    if (!currentStepConfig) return null;

    const { element, id } = currentStepConfig;

    return cloneElement(element, {
      goNext,
      goBack,
      isActive: true,
      isLastStep: currentStepIndex === totalSteps - 1,
      stepId: id,
      stepIndex: currentStepIndex,
      onCloseModal: () => onOpenChange(false),
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[80%] h-[80%] flex flex-col pt-10">
        <DialogHeader className="w-full">
          <div className="flex justify-between w-full items-center pr-14">
            <DialogTitle className="text-2xl font-medium">
             {title}
            </DialogTitle>

            {/* STEP TAGS */}
            <div className="flex items-center gap-3 text-xs">
              {steps.map((step, index) => {
                const isCompleted = index < currentStepIndex;
                const isActive = index === currentStepIndex;

                return (
                  <div key={step.id} className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleStepClick(index)}
                      className={`w-8 h-8 flex justify-center items-center rounded-full border transition-all
                        ${
                          isActive || isCompleted
                            ? "bg-primary text-white border-primary"
                            : "border-foreground/40 text-foreground/40"
                        }
                      `}
                    >
                      {index + 1}
                    </button>

                    <span
                      className={`whitespace-nowrap ${
                        isActive || isCompleted
                          ? "text-foreground"
                          : "text-foreground/40"
                      }`}
                    >
                      {step.label}
                    </span>

                    {index < totalSteps - 1 && (
                      <ChevronRight className="w-4 text-foreground/40" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </DialogHeader>

        {/* BODY */}
        <div className="relative flex-1 w-full overflow-y-auto py-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStepConfig?.id}
              variants={fadeVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.2 }}
              className="absolute w-full"
            >
              {renderCurrentStep()}
            </motion.div>
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  );
}
