"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { RippleButton } from "@/components/ui/ripple-button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowDown, ArrowRight, ArrowUp } from "lucide-react";
import { useState } from "react";
import * as guardrailsApi from "@/lib/api/guardrails";

export default function CreateGuardSuitesModal({ open, onOpenChange }) {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [nameError, setNameError] = useState("");
  const [selectedInputGuardrails, setSelectedInputGuardrails] = useState([]);
  const [selectedOutputGuardrails, setSelectedOutputGuardrails] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const inputGuardrails = [
    {
      title: "Jailbreak & Unsafe Prompt",
      des: "Detects and blocks attempts to bypass AI safety measures",
    },
    {
      title: "Toxic Language",
      des: "Filters toxic, abusive, or harmful language",
    },
    {
      title: "Sensitive Information",
      des: "Prevents exposure of PII and confidential data",
    },
    {
      title: "Offensive Check",
      des: "Detects offensive or inappropriate content",
    },
    {
      title: "Jailbreak & Unsafe Prompt",
      des: "Detects and blocks attempts to bypass AI safety measures",
    },
    {
      title: "Toxic Language",
      des: "Filters toxic, abusive, or harmful language",
    },
  ];

  const outputGuardrails = [
    {
      title: "Toxic Language",
      des: "Filters toxic, abusive, or harmful language",
    },
    {
      title: "Jailbreak & Unsafe Prompt",
      des: "Detects and blocks attempts to bypass AI safety measures",
    },
    {
      title: "Sensitive Information",
      des: "Prevents exposure of PII and confidential data",
    },
    {
      title: "Offensive Check",
      des: "Detects offensive or inappropriate content",
    },
    {
      title: "Toxic Language",
      des: "Filters toxic, abusive, or harmful language",
    },
    {
      title: "Jailbreak & Unsafe Prompt",
      des: "Detects and blocks attempts to bypass AI safety measures",
    },
  ];

  const handleInputGuardrailToggle = (title) => {
    setSelectedInputGuardrails((prev) =>
      prev.includes(title)
        ? prev.filter((t) => t !== title)
        : [...prev, title]
    );
  };

  const handleOutputGuardrailToggle = (title) => {
    setSelectedOutputGuardrails((prev) =>
      prev.includes(title)
        ? prev.filter((t) => t !== title)
        : [...prev, title]
    );
  };

  const handleCreate = async () => {
    if (!name.trim()) {
      setNameError("Name is required");
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      setNameError("");

      const data = {
        name: name.trim(),
        description: desc.trim(),
        inputGuardrails: selectedInputGuardrails.map((title) => ({ name: title })),
        outputGuardrails: selectedOutputGuardrails.map((title) => ({ name: title })),
      };

      await guardrailsApi.createGuardSuite(data);

      // Reset form
      setName("");
      setDesc("");
      setSelectedInputGuardrails([]);
      setSelectedOutputGuardrails([]);
      onOpenChange(false);
    } catch (err) {
      setError(err.message || "Failed to create guard suite");
      console.error("Error creating guard suite:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
     <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[75%] h-[80%] overflow-hidden overflow-y-auto  p-6 bg-background border border-border-color-0">
        <div className="pr-2 overflow-hidden overflow-y-auto">
         <div className="py-4 px-2 w-full space-y-5 ">
        <DialogHeader>
          <DialogTitle className="text-2xl font-medium">
            Create Guard Suite
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto space-y-5 pt-4">
          {/* Name */}
          <div>
            <label className="text-sm">Name</label>
            <Input
              placeholder="e.g., Production Safety Suite"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (nameError) setNameError("");
              }}
              className={`mt-1 ${
                nameError ? "border-red-500 focus-visible:ring-red-500" : ""
              }`}
            />
            {nameError && (
              <p className="text-xs text-red-500 mt-1">{nameError}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="text-sm">Description</label>
            <Textarea
              placeholder="Describe the purpose of this guard suite"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              rows={4}
              className="mt-1 placeholder:text-xs !text-xs"
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

         <div className="grid grid-cols-2 gap-4">
            {/* Left Column - Input Guardrails */}
            <div>
              <div className="space-y-2 mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full border border-badge-blue flex items-center justify-center">
                    <ArrowDown className="w-3 h-3 text-badge-blue" />
                  </div>
                  <h2 className="text-sm font-medium">Input Guardrails</h2>
                </div>

                <div className="space-y-0">
                  <p className="text-xs">Checks applied before processing</p>
                </div>
              </div>

              <Card className="p-3 max-h-[250px] overflow-y-auto rounded-xl dark:bg-background">
                <div className="space-y-3">
                  {inputGuardrails.map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Checkbox
                          checked={selectedInputGuardrails.includes(item.title)}
                          onCheckedChange={() => handleInputGuardrailToggle(item.title)}
                        />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">
                          {item.title}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {item.des}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Right Column - Output Guardrails */}
            <div>
              <div className="space-y-2 mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full border border-badge-green flex items-center justify-center">
                    <ArrowUp className="w-3 h-3 text-badge-green" />
                  </div>
                  <h2 className="text-sm font-medium">Output Guardrails</h2>
                </div>

                <div className="space-y-0">
                  <p className="text-xs">Checks applied after processing</p>
                </div>
              </div>

              <Card className="p-3 max-h-[250px] overflow-y-auto rounded-xl dark:bg-background">
                <div className="space-y-3">
                  {outputGuardrails.map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Checkbox
                          checked={selectedOutputGuardrails.includes(item.title)}
                          onCheckedChange={() => handleOutputGuardrailToggle(item.title)}
                        />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">
                          {item.title}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {item.des}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4 mt-4">
          <RippleButton>
            <Button
              variant="outline"
              className="gap-2 border-border-color-0 text-foreground hover:bg-gray-50 w-fit px-7"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
          </RippleButton>

          <RippleButton className="rounded-full">
            <Button
              onClick={handleCreate}
              disabled={isLoading}
              className="bg-primary hover:bg-[#E64A19] text-white gap-2 cursor-pointer !px-6 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Creating..." : "Create Suite"}
              <ArrowRight />
            </Button>
          </RippleButton>
        </div>
        </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
