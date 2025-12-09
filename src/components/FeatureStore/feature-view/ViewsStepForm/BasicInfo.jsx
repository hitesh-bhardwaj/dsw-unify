"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RippleButton } from "@/components/ui/ripple-button";
import { LeftArrow } from "@/components/Icons";

export default function BasicInfo({ goNext, goBack, isLastStep, stepId }) {
  // FORM STATE
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");

  // ERRORS
  const [errors, setErrors] = useState({
    name: "",
  });

  const validate = () => {
    let valid = true;
    let newErrors = { name: "" };

    if (!name.trim()) {
      newErrors.name = "Feature View Name is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleNext = () => {
    if (!validate()) return;
    goNext(); // move to next step
  };

  return (
    <div className="space-y-2 pb-6 pr-2">
      {/* TITLE */}
      <h2 className="text-lg font-medium text-foreground">Basic Information</h2>
      <p className="text-xs text-foreground/80">
        Provide a name and description for your feature view.
      </p>

      {/* FORM */}
      <div className="space-y-4 pt-4">
        {/* Name */}
        <div className="space-y-0">
          <label className="text-sm">
            Feature View Name*
          </label>

          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="e.g. customer demographics"
            className={`h-11 border-border-color-1 mt-3 ${
              errors.name ? "border-red-500" : ""
            }`}
          />
          {errors.name && (
            <p className="text-xs text-red-500 mt-1">{errors.name}</p>
          )}
        </div>

        {/* Description */}
        <div className="space-y-2">
          <label className="text-sm text-foreground">Description</label>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border border-foreground/20 placeholder:text-foreground/40 placeholder:text-xs h-36"
            placeholder="Enter description..."
          />
        </div>

        {/* Tags */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">
            Tags
          </label>
          <Input
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            type="text"
            placeholder="Add tags (comma separated)"
            className="h-11 border-border-color-1 mt-3"
          />
        </div>
      </div>

      {/* FOOTER BUTTONS */}
      <div className="w-full flex justify-end gap-2 pt-4">
        <RippleButton>
          <Button
            variant="outline"
            className="gap-2 border-border-color-1 text-foreground hover:bg-gray-50 w-fit px-7"
            onClick={goBack}
          >
            Cancel
          </Button>
        </RippleButton>

        <RippleButton>
          <Button
            className="bg-sidebar-primary hover:bg-primary text-white gap-3 rounded-full px-6 py-6 cursor-pointer duration-300"
            onClick={handleNext}
          >
            Next Step
            <div className="w-4 h-auto">
              <LeftArrow className="rotate-180" />
            </div>
          </Button>
        </RippleButton>
      </div>
    </div>
  );
}
