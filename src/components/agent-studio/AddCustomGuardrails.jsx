"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
import { ArrowRight } from "lucide-react";
import { Badge } from "../ui/badge";

// Base guardrails data
const BASE_GUARDRAILS = [
  {
    id: "jailbreak",
    name: "Jailbreak & Unsafe Prompt",
    description: "Detects and blocks attempts to bypass AI safety measures",
    type: "Input",
    category: "Security",
  },
  {
    id: "toxic",
    name: "Toxic Language",
    description: "Filters toxic, abusive, or harmful language",
    type: "Output",
    category: "Content Safety",
  },
  {
    id: "sensitive",
    name: "Sensitive Information",
    description: "Prevents exposure of PII and confidential data",
    type: "Input",
    category: "Privacy",
  },
  {
    id: "offensive",
    name: "Offensive Check",
    description: "Detects offensive or inappropriate content",
    type: "Both",
    category: "Content Safety",
  },
];

/**
 * Guardrail selection card component
 */
function GuardrailCard({ guardrail, onSelect }) {
  return (
    <motion.button
      onClick={() => onSelect(guardrail)}
      className="w-full p-4 border border-border-color-0 rounded-lg hover:border-primary hover:bg-orange-50/5 transition-all text-left group"
    >
      <div className="flex flex-col gap-1">
        <h3 className="font-medium text-foreground group-hover:text-primary transition-colors">
          {guardrail.name}
        </h3>
        <p className="text-xs text-foreground/60">{guardrail.description}</p>
        <div className="flex gap-2 mt-2">
          <span className="px-3 py-1 rounded-full text-xs">
            {guardrail.type}
          </span>
          <Badge variant="outline" className="px-3 py-1 rounded-full text-xs">
            {guardrail.category}
          </Badge>
        </div>
      </div>
    </motion.button>
  );
}

/**
 * Step 1: Select Base Guardrail
 */
function SelectBaseGuardrail({ onSelect }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col h-full"
    >
      <div className="mb-6">
        <h3 className="text-base font-medium mb-2">Select Base Guardrail *</h3>
        <p className="text-xs text-foreground/60">
          Choose a default guardrail to base your custom version on
        </p>
      </div>
      <div className="p-4 rounded-lg border border-border-color-0 overflow-y-auto">
        <div className="flex-1 space-y-2">
          {BASE_GUARDRAILS.map((guardrail) => (
            <GuardrailCard
              key={guardrail.id}
              guardrail={guardrail}
              onSelect={onSelect}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/**
 * Step 2: Configure Custom Guardrail
 */
function ConfigureGuardrail({ baseGuardrail, onBack, onSubmit }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [sensitivityLevel, setSensitivityLevel] = useState("medium");
  const [threshold, setThreshold] = useState("0.85");
  const [customRules, setCustomRules] = useState("");
  const [errors, setErrors] = useState({});
  const [isOpenSensitivity, setIsOpenSensitivity] = useState(false);

  const handleSubmit = () => {
    const errs = {
      name: !name.trim() ? "Name is required" : "",
      threshold: !threshold.trim() ? "Threshold is required" : "",
    };
    setErrors(errs);

    if (Object.values(errs).some(Boolean)) return;

    onSubmit({
      baseGuardrail,
      name,
      description,
      sensitivityLevel,
      threshold,
      customRules,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col h-full overflow-y-auto pr-2"
    >
      {/* Base guardrail info */}
      <div className="mb-2 pb-4">
        <div className="flex items-start justify-between mb-6">
          <div>
            <p className="text-xs text-foreground/60 mb-1">Based on:</p>
            <h3 className="font-medium text-sm">{baseGuardrail.name}</h3>
          </div>
        </div>
        <p className="text-xs text-foreground/60 mt-2">
          {baseGuardrail.description}
        </p>
        <button onClick={onBack} className="text-sm font-medium mt-2">
          Change base guardrail
        </button>
      </div>

      {/* Configuration form */}
      <div className="flex-1 pr-2 space-y-4">
        {/* Name */}
        <div className="flex flex-col gap-2">
          <label className="text-sm">Name*</label>
          <Input
            value={name}
            placeholder="e.g., Strict Toxic Language Filter"
            onChange={(e) => setName(e.target.value)}
            className={`border placeholder:text-xs h-12 ${
              errors.name ? "border-red-500" : "border-border-color-0"
            }`}
          />
          {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
        </div>

        {/* Description */}
        <div className="flex flex-col gap-2">
          <label className="text-sm">Description</label>
          <Textarea
            value={description}
            placeholder="Describe what makes this custom guardrail unique"
            onChange={(e) => setDescription(e.target.value)}
            className="border placeholder:text-xs !text-xs h-24 border-border-color-0 resize-none"
          />
        </div>

        {/* Sensitivity Level */}
        <div className="flex flex-col gap-2">
          <label className="text-sm">Sensitivity Level</label>
          <Select
            value={sensitivityLevel}
            onValueChange={setSensitivityLevel}
            onOpenChange={setIsOpenSensitivity}
          >
            <SelectTrigger
              className={`border cursor-pointer border-border-color-0 [&>svg]:transition-transform [&>svg]:duration-200 w-full !h-12 ${
                isOpenSensitivity ? "[&>svg]:rotate-180" : ""
              }`}
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="border border-border-color-0 ">
              <SelectItem value="low" className="cursor-pointer">
                Low - Permissive
              </SelectItem>
              <SelectItem value="medium" className="cursor-pointer">
                Medium - Balanced
              </SelectItem>
              <SelectItem value="high" className="cursor-pointer">
                High - Strict
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Threshold */}
        <div className="flex flex-col gap-2">
          <label className="text-sm">Threshold (0-1)</label>
          <Input
            value={threshold}
            placeholder="e.g., 0.85"
            onChange={(e) => setThreshold(e.target.value)}
            className={`border placeholder:text-xs h-12 ${
              errors.threshold ? "border-red-500" : "border-border-color-0"
            }`}
          />
          <p className="text-xs text-foreground/60">
            Detection threshold (higher = stricter)
          </p>
          {errors.threshold && (
            <p className="text-xs text-red-500">{errors.threshold}</p>
          )}
        </div>

        {/* Custom Rules */}
        <div className="flex flex-col gap-2">
          <label className="text-sm">Custom Rules</label>
          <Textarea
            value={customRules}
            placeholder="Add custom rules, patterns, or keywords to check"
            onChange={(e) => setCustomRules(e.target.value)}
            className="border placeholder:text-xs !text-xs h-24 border-border-color-0 resize-none"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="pt-6 mt-4 flex justify-end gap-3 w-fit">
        {/* ⬅️ Now this goes one step back instead of closing */}
        <RippleButton>
          <Button
            variant="outline"
            className="gap-2 border-border-color-0 text-foreground hover:bg-gray-50 w-fit px-7"
            onClick={onBack}
          >
            Cancel
          </Button>
        </RippleButton>

        <RippleButton onClick={handleSubmit} className="rounded-full">
          <Button className="bg-primary hover:bg-[#E64A19] text-white gap-2 cursor-pointer !px-6 rounded-lg">
            Create Custom Guardrails
            <ArrowRight />
          </Button>
        </RippleButton>
      </div>
    </motion.div>
  );
}

/**
 * Main Modal Component
 */
export default function AddCustomGuardrailsModal({ open, onOpenChange }) {
  const [step, setStep] = useState(1);
  const [selectedGuardrail, setSelectedGuardrail] = useState(null);

  useEffect(() => {
    if (!open) {
      setStep(1);
      setSelectedGuardrail(null);
    }
  }, [open]);

  const handleSelectGuardrail = (guardrail) => {
    setSelectedGuardrail(guardrail);
    setStep(2);
  };

  const handleBack = () => {
    setStep(1);
    setSelectedGuardrail(null);
  };

  const handleSubmit = (data) => {
    console.log("Submitted guardrail:", data);
    onOpenChange(false); // only close on successful submit
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl h-[85vh] flex flex-col p-0 px-8 pt-8">
        {/* Header */}
        <DialogHeader className="pb-6">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-medium">
              Create Custom Guardrail
            </DialogTitle>
          </div>
        </DialogHeader>

        {/* Content */}
        <div className="flex-1 overflow-hidden pb-8">
          <AnimatePresence mode="wait">
            {step === 1 ? (
              <SelectBaseGuardrail
                key="select"
                onSelect={handleSelectGuardrail}
              />
            ) : (
              <ConfigureGuardrail
                key="configure"
                baseGuardrail={selectedGuardrail}
                onBack={handleBack}
                onSubmit={handleSubmit}
              />
            )}
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  );
}
