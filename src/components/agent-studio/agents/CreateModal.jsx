"use client";

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
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { LeftArrow } from "@/components/Icons";
import { useState } from "react";
import { cn } from "@/lib/utils";

const PROVIDERS = ["OpenAI", "Anthropic", "Azure", "Custom"];

export default function CreateModal({ open, onOpenChange }) {
  const [provider, setProvider] = useState("OpenAI");
  const [isOpen, setIsOpen] = useState(false);

  // ✅ form state
  const [modelName, setModelName] = useState("");
  const [modelId, setModelId] = useState("");

  // ✅ error state
  const [errors, setErrors] = useState({
    modelName: "",
    modelId: "",
  });

  const handleSubmit = () => {
    const newErrors = {
      modelName: "",
      modelId: "",
    };

    if (!modelName.trim()) {
      newErrors.modelName = "Model name is required";
    }

    if (!modelId.trim()) {
      newErrors.modelId = "Model ID is required";
    }

    setErrors(newErrors);

    // ❌ stop submit if errors exist
    if (newErrors.modelName || newErrors.modelId) return;

    // ✅ submit logic here
    onOpenChange?.(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={"w-[45%] left-1/2 top-1/2 h-[80%]"}>

      <div className="pr-2 overflow-hidden overflow-y-auto">

     
      
        <div className="py-4 px-2 w-full space-y-5 ">
          {/* Header */}
          <DialogHeader>
            <DialogTitle className="text-2xl font-medium mb-2">
              Create New Model
            </DialogTitle>
            <p className="text-sm text-foreground/60">
              Add a new AI model to use in your agent
            </p>
          </DialogHeader>

          {/* Model Name */}
          <div className="flex flex-col gap-2 w-full">
            <label className="text-sm text-foreground">
              Model Name
            </label>
            <Input
              value={modelName}
              onChange={(e) => {
                setModelName(e.target.value);
                setErrors((p) => ({ ...p, modelName: "" }));
              }}
              className={cn(
                "placeholder:text-foreground/40",
                errors.modelName && "border-red-500 focus-visible:ring-red-500"
              )}
              placeholder="e.g., GPT-4 Turbo"
            />
            {errors.modelName && (
              <p className="text-xs text-red-500">{errors.modelName}</p>
            )}
          </div>

          {/* Provider */}
          <div className="flex flex-col gap-2 w-full">
            <label className="text-sm text-foreground">Provider</label>
            <Select
              value={provider}
              onValueChange={setProvider}
              onOpenChange={(open) => setIsOpen(open)}
            >
              <SelectTrigger
                className={cn(
                  "cursor-pointer border border-border-color-0 !h-10.5 w-full",
                  "[&>svg]:transition-transform [&>svg]:duration-200",
                  isOpen && "[&>svg]:rotate-180"
                )}
              >
                <SelectValue placeholder="Select provider" />
              </SelectTrigger>
              <SelectContent className="border border-border-color-0">
                {PROVIDERS.map((p) => (
                  <SelectItem key={p} value={p} className="!cursor-pointer">
                    {p}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Model ID */}
          <div className="flex flex-col gap-2 w-full">
            <label className="text-sm text-foreground">
              Model ID
            </label>
            <Input
              value={modelId}
              onChange={(e) => {
                setModelId(e.target.value);
                setErrors((p) => ({ ...p, modelId: "" }));
              }}
              className={cn(
                "placeholder:text-foreground/40",
                errors.modelId && "border-red-500 focus-visible:ring-red-500"
              )}
              placeholder="e.g., gpt-4-turbo-preview"
            />
            {errors.modelId && (
              <p className="text-xs text-red-500">{errors.modelId}</p>
            )}
          </div>

          {/* Description */}
          <div className="flex flex-col gap-2 w-full">
            <label className="text-sm text-foreground">Description</label>
            <Textarea
              className="placeholder:text-foreground/40 h-28"
              placeholder="Describe the model's capabilities and use cases..."
            />
          </div>

          {/* Actions */}
          <div className="w-full flex justify-end gap-2 pt-4">
            <RippleButton>
              <Button
                variant="outline"
                className="gap-2 border border-border-color-2 text-foreground hover:bg-gray-50 w-fit px-7"
                onClick={() => onOpenChange?.(false)}
              >
                Cancel
              </Button>
            </RippleButton>

            <RippleButton>
              <Button
                className="bg-sidebar-primary hover:bg-[#E64A19] text-white gap-3 rounded-full !px-6 !py-6 !cursor-pointer duration-300"
                onClick={handleSubmit}
              >
                Create Model
                <LeftArrow className="rotate-180" />
              </Button>
            </RippleButton>
          </div>
        </div>
         </div>
      </DialogContent>
    </Dialog>
  );
}
