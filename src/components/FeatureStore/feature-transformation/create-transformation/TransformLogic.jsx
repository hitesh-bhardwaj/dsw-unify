import React, { useState, useEffect } from "react";
import { LeftArrow } from "@/components/Icons";
import { Button } from "@/components/ui/button";
import { RippleButton } from "@/components/ui/ripple-button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const TransformLogic = ({ goNext, goBack, isLastStep, onCloseModal }) => {
  const [language, setLanguage] = useState("");
  const [code, setCode] = useState("");
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [errors, setErrors] = useState({
    language: "",
    code: "",
  });

  const LANGUAGE_OPTIONS = ["C++", "JAVA", "JavaScript"];

  // Check if all required fields are filled
  const isFormValid = language && code.trim();

  const validate = () => {
    const newErrors = { language: "", code: "" };
    let valid = true;

    if (!language) {
      newErrors.language = "Language is required.";
      valid = false;
    }
    if (!code.trim()) {
      newErrors.code = "Code is required.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleNextOrSubmit = () => {
    if (!validate()) return;

    if (isLastStep) {
      // Final step – here you can call an API or close modal from parent
      console.log("Final transformation payload:", { language, code });
      
      // Close the modal after successful validation
      if (typeof onCloseModal === "function") {
        onCloseModal();
      }
    } else if (typeof goNext === "function") {
      goNext();
    }
  };

  return (
    <div className="w-full h-full step-2">
      <div className="py-4 px-2 w-full h-full">
        <div className="space-y-2">
          <h3 className="text-lg font-medium">Transformation Logic</h3>
          <p className="text-sm text-foreground/80">
            Write the code that defines your transformation logic
          </p>
        </div>

        <div className="space-y-6 py-8">
          {/* LANGUAGE */}
          <div className="flex flex-col gap-2 w-full">
            <label className="text-sm text-foreground">Language*</label>
            <Select
              value={language}
              onValueChange={(val) => {
                setLanguage(val);
                setErrors((prev) => ({ ...prev, language: "" }));
              }}
              onOpenChange={(open) => setIsLanguageOpen(open)}
            >
              <SelectTrigger
                className={`border cursor-pointer border-border-color-0 placeholder:text-foreground/40 !h-10.5 w-full [&>svg]:transition-transform [&>svg]:duration-200 ${
                  isLanguageOpen ? "[&>svg]:rotate-180" : ""
                } ${errors.language ? "border-red-500" : "border-border-color-0"}`}
              >
                <SelectValue
                  placeholder="Python"
                  className="placeholder:text-sm !cursor-pointer"
                />
              </SelectTrigger>
              <SelectContent  className="border border-border-color-0">
                {LANGUAGE_OPTIONS.map((c) => (
                  <SelectItem key={c} value={c} className="!cursor-pointer">
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.language && (
              <p className="text-xs text-red-500">{errors.language}</p>
            )}
          </div>

          {/* CODE */}
          <div className="flex flex-col gap-2 w-full">
            <label className="text-sm text-foreground">
              Transformation Code*
            </label>
            <div className="flex gap-2">
              <Textarea
                value={code}
                onChange={(e) => {
                  setCode(e.target.value);
                  setErrors((prev) => ({ ...prev, code: "" }));
                }}
                className="border border-border-color-0 !text-xs h-32 placeholder:text-foreground/80 font-mono"
                placeholder={`def calculate_age(dob):\n    today = datetime.now()\n    return (today - dob).days // 365`}
              />
            </div>
            {errors.code && (
              <p className="text-xs text-red-500">{errors.code}</p>
            )}
          </div>

          {/* BUTTONS */}
          <div className="w-full flex justify-end gap-2">
            <RippleButton>
              <Button
                variant="outline"
                className="gap-2 border-primary text-foreground hover:bg-gray-50 w-fit px-7"
                onClick={goBack}
              >
                Back
              </Button>
            </RippleButton>
            <RippleButton>
              <Button
                className="bg-sidebar-primary hover:bg-[#E64A19] text-white gap-3 rounded-full !px-6 !py-6 !cursor-pointer duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-sidebar-primary"
                onClick={handleNextOrSubmit}
                disabled={!isFormValid}
              >
                {isLastStep ? "Create Transformation" : "Next Step"}
                <div className="w-4 h-auto">
                  <LeftArrow className="rotate-180" />
                </div>
              </Button>
            </RippleButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransformLogic;