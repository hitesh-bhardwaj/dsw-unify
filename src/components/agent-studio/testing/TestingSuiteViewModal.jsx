"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Trash2, X } from "lucide-react";

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
import { LeftArrow } from "@/components/Icons";

/**
 * Modal component for viewing and managing test suites.
 *
 * @param {Object} props - The component props.
 * @param {boolean} props.open - Whether the modal is open.
 * @param {function} props.onOpenChange - Callback when the modal open state changes.
 * @param {Object} props.testSuite - The test suite data to display.
 * @returns {React.JSX.Element} The rendered TestingSuiteViewModal component.
 */
export default function TestingSuiteViewModal({ open, onOpenChange, testSuite }) {
  // Existing test cases
  const [testCases, setTestCases] = useState([
    {
      id: 1,
      name: "Valid claim submission",
      input: "I need to file a claim for a car accident that happened yesterday",
      expectedOutput: "claim intake process"
    },
    {
      id: 2,
      name: "Missing information handling",
      input: "I want to file a claim",
      expectedOutput: "request for additional details"
    }
  ]);

  // New test case form
  const [newTestCaseName, setNewTestCaseName] = useState("");
  const [newTestCaseInput, setNewTestCaseInput] = useState("");
  const [newTestCaseOutput, setNewTestCaseOutput] = useState("");

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!open) {
      setNewTestCaseName("");
      setNewTestCaseInput("");
      setNewTestCaseOutput("");
      setErrors({});
    }
  }, [open]);

  const slide = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  };

  /** =============== DELETE TEST CASE =============== */
  const handleDeleteTestCase = (id) => {
    setTestCases(testCases.filter(tc => tc.id !== id));
  };

  /** =============== ADD TEST CASE VALIDATION =============== */
  const handleAddTestCase = () => {
    const errs = {
      name: !newTestCaseName.trim() ? "Test Case Name is required" : "",
      input: !newTestCaseInput.trim() ? "Input is required" : "",
      output: !newTestCaseOutput.trim() ? "Expected Output is required" : "",
    };
    setErrors(errs);

    if (Object.values(errs).some(Boolean)) return;

    // Add new test case
    const newTestCase = {
      id: Date.now(),
      name: newTestCaseName,
      input: newTestCaseInput,
      expectedOutput: newTestCaseOutput
    };

    setTestCases([...testCases, newTestCase]);

    // Reset form
    setNewTestCaseName("");
    setNewTestCaseInput("");
    setNewTestCaseOutput("");
    setErrors({});
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[60%] max-h-[90vh] flex flex-col left-1/2 -translate-x-1/2 top-1/2 pt-8">
        <DialogHeader className="justify-center pb-4">
          <DialogTitle className="text-2xl font-medium">
            Auto Claims Validation
          </DialogTitle>
          <p className="text-xs text-foreground/80">
            Test suite for auto claims processing agent
          </p>
        </DialogHeader>

        <div className="w-full overflow-y-auto pr-2 flex flex-col gap-6">
          <motion.div
            className="flex flex-col space-y-6"
            variants={slide}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {/* Existing Test Cases */}
            <div className="flex flex-col gap-3">
              <h3 className="text-lg font-medium">Test Cases ({testCases.length})</h3>
              
              <div className="flex flex-col gap-3">
                {testCases.map((testCase) => (
                  <div
                    key={testCase.id}
                    className="border border-border-color-0 rounded-lg p-4 relative"
                  >
                    <button
                      onClick={() => handleDeleteTestCase(testCase.id)}
                      className="absolute top-4 right-4 text-red-500 hover:text-red-700 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    <h4 className="font-medium text-md mb-3">{testCase.name}</h4>
                    
                    <div className="space-y-4">
                      <div>
                        <p className="text-xs font-bold text-foreground/70 mb-1">Input:</p>
                        <p className="text-xs text-foreground/90">{testCase.input}</p>
                      </div>
                      
                      <div>
                        <p className="text-xs font-bold text-foreground/70 mb-1">Expected Output:</p>
                        <p className="text-xs text-foreground/90">{testCase.expectedOutput}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Add New Test Case Section */}
            <div className="flex flex-col gap-4 pt-4 ">
              <h3 className="text-lg font-medium">Add New Test Case</h3>

              {/* Test Case Name */}
              <div className="flex flex-col gap-2">
                <label className="text-sm text-foreground">Test Case Name</label>
                <Input
                  value={newTestCaseName}
                  placeholder="e.g., Valid claim submission"
                  onChange={(e) => setNewTestCaseName(e.target.value)}
                  className={`border placeholder:text-xs placeholder:text-foreground/80 ${
                    errors.name ? "border-red-500" : "border-border-color-0"
                  }`}
                />
                {errors.name && (
                  <p className="text-xs text-red-500">{errors.name}</p>
                )}
              </div>

              {/* Input */}
              <div className="flex flex-col gap-2">
                <label className="text-sm text-foreground">Input</label>
                <Textarea
                  value={newTestCaseInput}
                  placeholder="Enter the test input/prompt..."
                  onChange={(e) => setNewTestCaseInput(e.target.value)}
                  className={`border placeholder:text-xs h-24 placeholder:text-foreground/80 ${
                    errors.input ? "border-red-500" : "border-border-color-0"
                  }`}
                />
                {errors.input && (
                  <p className="text-xs text-red-500">{errors.input}</p>
                )}
              </div>

              {/* Expected Output */}
              <div className="flex flex-col gap-2">
                <label className="text-sm text-foreground">Expected Output (keywords or pattern)</label>
                <Textarea
                  value={newTestCaseOutput}
                  placeholder="Describe what the agent should respond with..."
                  onChange={(e) => setNewTestCaseOutput(e.target.value)}
                  className={`border placeholder:text-xs h-24 placeholder:text-foreground/80 ${
                    errors.output ? "border-red-500" : "border-border-color-0"
                  }`}
                />
                {errors.output && (
                  <p className="text-xs text-red-500">{errors.output}</p>
                )}
              </div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <div className="py-4 flex justify-end gap-3  sticky bottom-0 bg-background">
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
                onClick={handleAddTestCase}
                className="bg-[#FF5722] hover:bg-[#E64A19] text-white gap-2 rounded-full !px-6 !py-6 !cursor-pointer duration-300"
              >
                Add Test Case
                <LeftArrow className="rotate-180 w-4" />
              </Button>
            </RippleButton>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}