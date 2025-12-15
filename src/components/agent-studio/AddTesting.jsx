"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { RippleButton } from "@/components/ui/ripple-button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { LeftArrow } from "@/components/Icons";

/**
 * Modal component for creating new test suites.
 *
 * @param {Object} props - The component props.
 * @param {boolean} props.open - Whether the modal is open.
 * @param {function} props.onOpenChange - Callback when the modal open state changes.
 * @returns {React.JSX.Element} The rendered AddTestings component.
 */
export default function AddTestings({ open, onOpenChange }) {
  const [testSuiteName, setTestSuiteName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedAgent, setSelectedAgent] = useState("");

  const [isOpenAgent, setIsOpenAgent] = useState(false);

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!open) {
      setTestSuiteName("");
      setDescription("");
      setSelectedAgent("");
      setErrors({});
    }
  }, [open]);

  const slide = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  };

  /** =============== FORM VALIDATION =============== */
  const handleSubmit = () => {
    const errs = {
      testSuiteName: !testSuiteName.trim() ? "Test Suite Name is required" : "",
      description: !description.trim() ? "Description is required" : "",
      selectedAgent: !selectedAgent ? "Agent selection is required" : "",
    };
    setErrors(errs);

    if (Object.values(errs).some(Boolean)) return;

    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[60%] h-[80%] flex flex-col left-1/2 -translate-x-1/2 top-1/2 pt-8">
        <DialogHeader className="justify-center pb-4">
          <DialogTitle className="text-2xl font-medium">
            Create Test Suite
          </DialogTitle>
          <p className="text-xs text-foreground/80">
            Create a new test suite to validate agent performance
          </p>
        </DialogHeader>

        <div className="w-full h-full overflow-y-auto pr-2 flex flex-col justify-between">
          <motion.div
            className="flex flex-col space-y-6"
            variants={slide}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {/* Test Suite Name */}
            <div className="flex flex-col gap-3">
              <label className="text-sm text-foreground">Test Suite Name</label>
              <Input
                value={testSuiteName}
                placeholder="e.g. Customer Support Validation"
                onChange={(e) => setTestSuiteName(e.target.value)}
                className={`border placeholder:text-xs placeholder:text-foreground/80 ${
                  errors.testSuiteName ? "border-red-500" : "border-border-color-0"
                }`}
              />
              {errors.testSuiteName && (
                <p className="text-xs text-red-500">{errors.testSuiteName}</p>
              )}
            </div>

            {/* Description */}
            <div className="flex flex-col gap-3">
              <label className="text-sm text-foreground">Description</label>
              <Textarea
                value={description}
                placeholder="Describe what this test suite validates..."
                onChange={(e) => setDescription(e.target.value)}
                className={`border placeholder:text-xs h-32 placeholder:text-foreground/80 ${
                  errors.description ? "border-red-500" : "border-border-color-0"
                }`}
              />
              {errors.description && (
                <p className="text-xs text-red-500">{errors.description}</p>
              )}
            </div>

            {/* Select Agent */}
            <div className="flex flex-col gap-2 text-foreground/80 w-full">
              <label className="text-sm">Select Agent</label>
              <Select
                value={selectedAgent}
                onValueChange={setSelectedAgent}
                onOpenChange={(open) => setIsOpenAgent(open)}
                className="w-full "
              >
                <SelectTrigger
                  className={`border w-full ${
                    errors.selectedAgent ? "border-red-500" : "border-border-color-0"
                  } placeholder:text-foreground/60 placeholder:text-xs rounded-md !h-11 cursor-pointer px-3 text-xs outline-none [&>svg]:transition-transform [&>svg]:duration-200 ${
                    isOpenAgent ? "[&>svg]:rotate-180" : ""
                  }`}
                >
                  <SelectValue placeholder="Choose an agent to test" />
                </SelectTrigger>

                <SelectContent className="border border-border-color-0">
                  <SelectItem value="agent1" className="!cursor-pointer text-xs">
                    Agent 1
                  </SelectItem>
                  <SelectItem value="agent2" className="!cursor-pointer text-xs">
                    Agent 2
                  </SelectItem>
                  <SelectItem value="agent3" className="!cursor-pointer text-xs">
                    Agent 3
                  </SelectItem>
                </SelectContent>
              </Select>
              {errors.selectedAgent && (
                <p className="text-xs text-red-500">{errors.selectedAgent}</p>
              )}
            </div>
          </motion.div>

          <div className="py-6 my-2 flex justify-end gap-3">
            <RippleButton>
              <Button
                variant="outline"
                className="border-foreground/40 text-foreground/80 px-6"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
            </RippleButton>

            <RippleButton>
              <Button
                onClick={handleSubmit}
                className="bg-sidebar-primary hover:bg-[#E64A19] text-white gap-3 rounded-full !px-6 !py-6 !cursor-pointer duration-300"
              >
                Create Test Suite
                <LeftArrow className="ml-2 rotate-180 w-4" />
              </Button>
            </RippleButton>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
