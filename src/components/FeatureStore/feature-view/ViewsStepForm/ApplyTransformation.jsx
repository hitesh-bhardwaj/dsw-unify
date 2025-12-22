"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { RippleButton } from "@/components/ui/ripple-button";
import { LeftArrow } from "@/components/Icons";
import { CheckCircle2, AlertCircle, FlaskConical } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

/**
 * ApplyTransformation step component for Create Feature View modal.
 * Allows users to select and apply transformations to features.
 *
 * @param {Object} props - Component props
 * @param {Function} props.goNext - Navigate to next step
 * @param {Function} props.goBack - Navigate to previous step
 * @param {boolean} props.isLastStep - Whether this is the last step
 * @returns {React.JSX.Element}
 */
export default function ApplyTransformation({ goNext, goBack, isLastStep }) {
  const [selectedTransformation, setSelectedTransformation] = useState("");
  const [selectedVersion, setSelectedVersion] = useState("");
  const [validationStatus, setValidationStatus] = useState(null); // null | 'success' | 'error'
  const [isValidating, setIsValidating] = useState(false);

  // Mock available transformations (from feature transformations)
  const availableTransformations = [
    {
      id: "normalize-data",
      name: "Normalize Data",
      description: "Normalize numerical values to 0-1 range",
      version: "1.0",
      code: `def transform(data):
    # Normalize
    return normalized`,
      versions: ["1.0", "1.1", "2.0"],
    },
    {
      id: "extract-email-domain",
      name: "Extract Email Domain",
      description: "Extracts domain from email addresses",
      version: "1.0",
      code: `def transform(data):
    # Extract domain
    return domain`,
      versions: ["1.0", "1.2"],
    },
    {
      id: "calculate-rolling-average",
      name: "Calculate Rolling Average",
      description: "Computes rolling average over specified window",
      version: "1.0",
      code: `def transform(data):
    # Rolling avg
    return result`,
      versions: ["1.0"],
    },
  ];

  // Get selected transformation object
  const selectedTransformationObj = availableTransformations.find(
    (t) => t.id === selectedTransformation
  );

  // Handle transformation selection
  const handleTransformationChange = (value) => {
    setSelectedTransformation(value);
    const transformation = availableTransformations.find((t) => t.id === value);
    if (transformation) {
      setSelectedVersion(transformation.version);
    }
    setValidationStatus(null); // Reset validation when changing selection
  };

  // Handle validate button click
  const handleValidate = () => {
    if (!selectedTransformation) return;

    setIsValidating(true);
    setValidationStatus(null);

    // Simulate API call for validation
    setTimeout(() => {
      setIsValidating(false);
      // For demo, always show success
      setValidationStatus("success");
    }, 1500);
  };

  // Handle next step
  const handleNext = () => {
    if (!selectedTransformation || validationStatus !== "success") return;
    goNext();
  };

  return (
    <div className="space-y-4 pr-2">
      <div className="space-y-2">
        <h2 className="text-lg font-medium text-foreground">
          Apply Transformation
        </h2>
        <p className="text-xs text-foreground/80">
          Select a transformation to apply to your features
        </p>
      </div>

      <div className="space-y-4 pt-2">
        {/* Transformation Selection */}
        <RadioGroup
          value={selectedTransformation}
          onValueChange={handleTransformationChange}
          className="space-y-3"
        >
          {availableTransformations.map((transformation) => {
            const isSelected = selectedTransformation === transformation.id;

            return (
              <div
                key={transformation.id}
                className={`border rounded-lg p-4 cursor-pointer transition-all duration-200 ${
                  isSelected
                    ? "border-sidebar-primary bg-sidebar-primary/5"
                    : "border-border-color-0 hover:border-border-color-0/60"
                }`}
                onClick={() => handleTransformationChange(transformation.id)}
              >
                <div className="flex items-start gap-3">
                  <RadioGroupItem
                    value={transformation.id}
                    id={transformation.id}
                    className="mt-0.5 data-[state=checked]:border-sidebar-primary data-[state=checked]:text-sidebar-primary"
                  />
                  <div className="flex-1 space-y-3">
                    <div>
                      <Label
                        htmlFor={transformation.id}
                        className="text-sm font-medium cursor-pointer"
                      >
                        {transformation.name}
                      </Label>
                      <p className="text-xs text-foreground/60 mt-1">
                        {transformation.description}
                      </p>
                    </div>

                    {/* Code Preview */}
                    <div className="bg-muted/30 dark:bg-muted/10 rounded-lg p-3 border border-border-color-0">
                      <pre className="text-xs font-mono text-foreground/80 whitespace-pre-wrap">
                        {transformation.code}
                      </pre>
                    </div>

                    {/* Version Selector (shown only when selected) */}
                    {isSelected && transformation.versions.length > 1 && (
                      <div className="flex items-center gap-2 pt-2">
                        <label className="text-xs text-foreground/80">
                          Version:
                        </label>
                        <Select
                          value={selectedVersion}
                          onValueChange={setSelectedVersion}
                        >
                          <SelectTrigger className="w-24 h-8 text-xs border-border-color-0">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="border border-border-color-0">
                            {transformation.versions.map((version) => (
                              <SelectItem
                                key={version}
                                value={version}
                                className="text-xs cursor-pointer"
                              >
                                {version}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </RadioGroup>

        {/* Validate Button */}
        <div className="pt-2">
          <RippleButton>
            <Button
              // variant="outline"
              onClick={handleValidate}
              disabled={!selectedTransformation || isValidating}
              className="w-full border-border-color-0 gap-2"
            >
              <FlaskConical className="w-4 h-4" />
              {isValidating ? "Validating..." : "Validate Transformation"}
            </Button>
          </RippleButton>
        </div>

        {/* Validation Status */}
        {validationStatus === "success" && (
          <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-green-800 dark:text-green-300">
                  Validation Successful
                </p>
                <p className="text-xs text-green-700 dark:text-green-400 mt-1">
                  Transformation function is compatible with selected features!
                </p>
              </div>
            </div>
          </div>
        )}

        {validationStatus === "error" && (
          <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-red-800 dark:text-red-300">
                  Validation Failed
                </p>
                <p className="text-xs text-red-700 dark:text-red-400 mt-1">
                  Transformation is not compatible with selected features.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="w-full flex justify-end gap-2 pt-4">
        <RippleButton>
          <Button
            variant="outline"
            onClick={goBack}
            className="gap-2 border-border-color-0 text-foreground hover:bg-gray-50 w-fit px-7"
          >
            Back
          </Button>
        </RippleButton>

        <RippleButton>
          <Button
            className="bg-sidebar-primary hover:bg-primary text-white gap-3 rounded-full px-6 py-6 cursor-pointer duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleNext}
            disabled={!selectedTransformation || validationStatus !== "success"}
          >
            {isLastStep ? "Create Feature View" : "Next Step"}
            <div className="w-4 h-auto">
              <LeftArrow className="rotate-180" />
            </div>
          </Button>
        </RippleButton>
      </div>
    </div>
  );
}
