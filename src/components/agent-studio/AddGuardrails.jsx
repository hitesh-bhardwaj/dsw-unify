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
import * as guardrailsApi from "@/lib/api/guardrails";

/**
 * Modal for adding new guardrails.
 *
 * @param {Object} props - The component props.
 * @param {boolean} props.open - Whether the modal is open.
 * @param {function} props.onOpenChange - Callback when the modal open state changes.
 * @returns {React.JSX.Element} The rendered AddGuardrailsModal component.
 */
export default function AddGuardrailsModal({ open, onOpenChange }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [severity, setSeverity] = useState("");

  const [isOpenType, setIsOpenType] = useState(false);
  const [isOpenSeverity, setIsOpenSeverity] = useState(false);

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState(null);

  useEffect(() => {
    if (!open) {
      setName("");
      setDescription("");
      setType("");
      setSeverity("");
      setErrors({});
      setApiError(null);
      setIsLoading(false);
    }
  }, [open]);

  const slide = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  };

  /** =============== FORM VALIDATION =============== */
  const handleSubmit = async () => {
    const errs = {
      name: !name.trim() ? "Name is required" : "",
      description: !description.trim() ? "Description is required" : "",
      type: !type ? "Type is required" : "",
      severity: !severity ? "Severity is required" : "",
    };
    setErrors(errs);

    if (Object.values(errs).some(Boolean)) return;

    try {
      setIsLoading(true);
      setApiError(null);

      // Map form values to API data structure
      const data = {
        name: name.trim(),
        description: description.trim(),
        direction: type.charAt(0).toUpperCase() + type.slice(1), // "input" -> "Input"
        category: "Custom", // Default category for new guardrails
        severity: severity.charAt(0).toUpperCase() + severity.slice(1), // "high" -> "High"
      };

      await guardrailsApi.createGuardrail(data);

      // Reset form
      setName("");
      setDescription("");
      setType("");
      setSeverity("");
      setErrors({});
      onOpenChange(false);
    } catch (err) {
      setApiError(err.message || "Failed to create guardrail");
      console.error("Error creating guardrail:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[60%] h-[80%] flex flex-col left-1/2 -translate-x-1/2 top-1/2 pt-8">
        <DialogHeader className="justify-center pb-4">
          <DialogTitle className="text-2xl font-medium">
            Create Guardrail
          </DialogTitle>
        </DialogHeader>

        <div className="w-full h-full overflow-y-auto pr-2 flex flex-col justify-between">
          <motion.div
            className="flex flex-col space-y-6"
            variants={slide}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {/* Name */}
            <div className="flex flex-col gap-3">
              <label className="text-sm text-foreground">Name*</label>
              <Input
                value={name}
                placeholder="e.g. Content Safety"
                onChange={(e) => setName(e.target.value)}
                className={`border placeholder:text-xs placeholder:text-foreground/80 ${
                  errors.name ? "border-red-500" : "border-foreground/20"
                }`}
              />
              {errors.name && (
                <p className="text-xs text-red-500">{errors.name}</p>
              )}
            </div>

            {/* Description */}
            <div className="flex flex-col gap-3">
              <label className="text-sm text-foreground">Description</label>
              <Textarea
                value={description}
                placeholder="Describe what this guardrail does..."
                onChange={(e) => setDescription(e.target.value)}
                className={`border placeholder:text-xs h-32 placeholder:text-foreground/80 ${
                  errors.description ? "border-red-500" : "border-foreground/20"
                }`}
              />
              {errors.description && (
                <p className="text-xs text-red-500">{errors.description}</p>
              )}
            </div>

            {/* API Error Message */}
            {apiError && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-600">{apiError}</p>
              </div>
            )}

            {/* Type and Severity */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2 text-foreground/80 w-full">
                <label className="text-sm">Type</label>
                <Select
                  value={type}
                  onValueChange={setType}
                  onOpenChange={(open) => setIsOpenType(open)}
                  className="w-full"
                >
                  <SelectTrigger
                    className={`border cursor-pointer w-full ${
                      errors.type ? "border-red-500" : "border-foreground/20"
                    } placeholder:text-foreground/60 placeholder:text-xs rounded-md !h-10 px-3 text-xs outline-none [&>svg]:transition-transform [&>svg]:duration-200 ${
                      isOpenType ? "[&>svg]:rotate-180" : ""
                    }`}
                  >
                    <SelectValue placeholder="Output" />
                  </SelectTrigger>

                  <SelectContent  className="border border-border-color-0">
                    <SelectItem value="output" className="!cursor-pointer text-xs">
                      Output
                    </SelectItem>
                    <SelectItem value="input" className="!cursor-pointer text-xs">
                      Input
                    </SelectItem>
                    <SelectItem value="both" className="!cursor-pointer text-xs">
                      Both
                    </SelectItem>
                  </SelectContent>
                </Select>
                {errors.type && (
                  <p className="text-xs text-red-500">{errors.type}</p>
                )}
              </div>

              <div className="flex flex-col gap-2 text-foreground/80 w-full">
                <label className="text-sm">Severity</label>
                <Select
                  value={severity}
                  onValueChange={setSeverity}
                  onOpenChange={(open) => setIsOpenSeverity(open)}
                  className="w-full"
                >
                  <SelectTrigger
                    className={`border cursor-pointer w-full ${
                      errors.severity ? "border-red-500" : "border-foreground/20"
                    } placeholder:text-foreground/60 placeholder:text-xs rounded-md !h-10 px-3 text-xs outline-none [&>svg]:transition-transform [&>svg]:duration-200 ${
                      isOpenSeverity ? "[&>svg]:rotate-180" : ""
                    }`}
                  >
                    <SelectValue placeholder="Medium" />
                  </SelectTrigger>

                  <SelectContent  className="border border-border-color-0">
                    <SelectItem value="low" className="!cursor-pointer text-xs">
                      Low
                    </SelectItem>
                    <SelectItem value="medium" className="!cursor-pointer text-xs">
                      Medium
                    </SelectItem>
                    <SelectItem value="high" className="!cursor-pointer text-xs">
                      High
                    </SelectItem>
                    <SelectItem value="critical" className="!cursor-pointer text-xs">
                      Critical
                    </SelectItem>
                  </SelectContent>
                </Select>
                {errors.severity && (
                  <p className="text-xs text-red-500">{errors.severity}</p>
                )}
              </div>
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
                disabled={isLoading}
                className="bg-sidebar-primary hover:bg-[#E64A19] text-white gap-3 rounded-full !px-6 !py-6 !cursor-pointer duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Creating..." : "Create Guardrails"}
                <LeftArrow className="ml-2 rotate-180 w-4" />
              </Button>
            </RippleButton>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
