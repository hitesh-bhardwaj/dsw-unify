"use client";
;
import { X, ArrowRight, DownloadIcon } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RippleButton } from "@/components/ui/ripple-button";

/**
 * Modal component for viewing test results.
 *
 * @param {Object} props - The component props.
 * @param {boolean} props.open - Whether the modal is open.
 * @param {function} props.onOpenChange - Callback when the modal open state changes.
 * @param {Object} props.testResults - The test results data to display.
 * @returns {React.JSX.Element} The rendered TestResultsModal component.
 */
export default function TestResultsViewModal({ open, onOpenChange }) {
  // Mock test results data
  const results = {
    title: "Auto Claims Validation",
    runDate: "12/12/2025, 19:16:02",
    summary: {
      totalTests: 2,
      passed: 1,
      failed: 1,
      duration: "0m 1s"
    },
    testCases: [
      {
        id: 1,
        name: "Valid claim submission",
        status: "failed",
        input: "I need to file a claim for a car accident that happened yesterday",
        expectedOutput: "claim intake process",
        actualOutput: "Unexpected response format",
        executionTime: "2580ms"
      },
      {
        id: 2,
        name: "Missing information handling",
        status: "passed",
        input: "I want to file a claim",
        expectedOutput: "request for additional details",
        actualOutput: "Successfully processed: request for additional details",
        executionTime: "3152ms"
      }
    ]
  };

  const handleExport = () => {
    const exportData = {
      id: `result_${Date.now()}`,
      suite_id: "suite_001",
      suite_name: results.title,
      agent_name: "Auto Claims Processing Agent",
      timestamp: new Date().toISOString(),
      total_tests: results.summary.totalTests,
      passed: results.summary.passed,
      failed: results.summary.failed,
      duration: results.summary.duration,
      status: "completed",
      test_cases: results.testCases.map((tc, index) => ({
        id: `tc_${String(index + 1).padStart(3, '0')}`,
        name: tc.name,
        input: tc.input,
        expectedOutput: tc.expectedOutput,
        status: tc.status,
        actualOutput: tc.actualOutput,
        executionTime: parseInt(tc.executionTime)
      }))
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `test-results-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[60%] max-h-[90vh] flex flex-col  left-1/2 -translate-x-1/2 top-1/2 pt-8">
        {/* Header */}
          {/* Header */}
        <DialogHeader className="">
          <div>
            <DialogTitle className="text-2xl font-medium mb-2">
              Test Results: {results.title}
            </DialogTitle>
            <p className="text-xs text-foreground/80">
              Run on {results.runDate}
            </p>
          </div>
        </DialogHeader>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto py-3 pr-2">
          {/* Summary Cards */}
          <div className="grid grid-cols-4 gap-4 mb-8">
            <div className="border border-border-color-2 rounded-2xl p-6 py-4 flex flex-col itesm-start justify-between h-30">
              <p className="text-sm text-muted-foreground">Total Tests</p>
              <p className="text-3xl font-medium">
                {String(results.summary.totalTests).padStart(2, '0')}
              </p>
            </div>
            <div className="border border-border-color-2  rounded-2xl p-6 py-4 flex flex-col itesm-start justify-between h-30">
              <p className="text-sm text-muted-foreground ">Passed</p>
              <p className="text-3xl font-medium">
                {String(results.summary.passed).padStart(2, '0')}
              </p>
            </div>
            <div className="border border-border-color-2  rounded-2xl p-6 py-4 flex flex-col itesm-start justify-between h-30">
              <p className="text-sm text-muted-foreground ">Failed</p>
              <p className="text-3xl font-medium">
                {String(results.summary.failed).padStart(2, '0')}
              </p>
            </div>
            <div className="border border-border-color-2  rounded-2xl p-6 py-4 flex flex-col itesm-start justify-between h-30">
              <p className="text-sm text-muted-foreground ">Duration</p>
              <p className="text-3xl font-medium">{results.summary.duration}</p>
            </div>
          </div>

          {/* Test Case Results */}
          <div>
            <h3 className="text-2xl font-normal mb-6">Test Case Results</h3>
            
            <div className="space-y-4">
              {results.testCases.map((testCase) => (
                <div
                  key={testCase.id}
                  className="border border-border-color-2  rounded-2xl p-6"
                >
                  <div className="flex items-start justify-between mb-6">
                    <h4 className="text-xl font-medium">{testCase.name}</h4>
                    <Badge 
                      variant={testCase.status === "passed" ? "outline" : "outline"}
                      className={
                        testCase.status === "passed" 
                          ? "border-badge-green " 
                          : "border-red "
                      }
                    >
                      {testCase.status === "passed" ? "Passed" : "Failed"}
                    </Badge>
                  </div>
                  
                  <div className="space-y-4 text-sm">
                    <div>
                      <p className="font-medium mb-1">Input:</p>
                      <p className="text-muted-foreground">{testCase.input}</p>
                    </div>
                    
                    <div>
                      <p className="font-medium mb-1">Expected Output:</p>
                      <p className="text-muted-foreground">{testCase.expectedOutput}</p>
                    </div>
                    
                    <div>
                      <p className="font-medium mb-1">Actual:</p>
                      <p className="text-muted-foreground">{testCase.actualOutput}</p>
                    </div>

                    <div className="pt-2">
                      <p className="text-muted-foreground">
                        Execution time: {testCase.executionTime}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="!px-6 py-6  pt-0 flex justify-end gap-3">
          <RippleButton>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="rounded-full !px-8 hover bg-white text-foreground"
          >
            Close
          </Button>
          </RippleButton>
          <RippleButton>
          <Button
            onClick={handleExport}
            className="bg-primary hover:bg-primary text-white rounded-full !px-8 gap-2"
          >
            Export Results
            <DownloadIcon className="!h-5 !w-5"/>
          </Button>
          </RippleButton>
        </div>
      </DialogContent>
    </Dialog>
  );
}