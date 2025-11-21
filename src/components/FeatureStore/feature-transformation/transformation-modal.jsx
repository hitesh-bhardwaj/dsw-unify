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
import { Textarea } from "../../ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "../../ui/select";
import { RippleButton } from "../../ui/ripple-button";
import { Button } from "../../ui/button";
import { ChevronRight } from "lucide-react";
import { LeftArrow } from "../../Icons";

export default function TransformationModal({ open, onOpenChange }) {
  const [step, setStep] = useState(1);

  // Step 1 form state
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState();

  // Step 2 form state
  const [language, setLanguage] = useState();
  const [code, setCode] = useState("");

  // Dropdown states
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);

  // Error state
  const [errors, setErrors] = useState({ name: "", category: "" });

  const CATEGORY_OPTIONS = [
    "General",
    "Marketing",
    "Sales",
    "Support",
    "Engineering",
    "Product",
    "HR",
  ];
  const LANGUAGE_OPTIONS = ["C++", "JAVA", "JavaScript"];

  useEffect(() => {
    if (!open) {
      setStep(1);
      setName("");
      setDescription("");
      setCategory(undefined);
      setLanguage(undefined);
      setCode("");
      setErrors({ name: "", category: "" });
    }
  }, [open]);

  const slideVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  };

  // Validate step 1 before moving ahead
  const validateStep1 = () => {
    const newErrors = { name: "", category: "" };
    let valid = true;

    if (!name.trim()) {
      newErrors.name = "Name is required.";
      valid = false;
    }
    if (!category) {
      newErrors.category = "Category is required.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleNext = () => {
    if (validateStep1()) {
      setStep(2);
    }
  };

  const handleClickStep2Tag = () => {
    if (validateStep1()) {
      setStep(2);
    }
  };

  const handleCreateTransformation = () => {
    const payload = {
      name,
      description,
      category,
      language,
      code,
    };
    console.log("Create Transformation:", payload);
    // onOpenChange?.(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[80%] left-1/2 -translate-x-1/2 top-1/2 h-[80%] flex flex-col">
        <DialogHeader className="justify-center h-fit flex">
          <div className="flex justify-between pr-14 w-full">
            <DialogTitle className="text-2xl font-medium">
              Create Feature Transformation
            </DialogTitle>
            <div className="flex gap-2 text-xs items-center">
              {/* STEP 1 TAG (always filled because we're on or past it) */}
              <div className="flex gap-2 items-center step-1-tags">
                <div
                  className={`w-10 h-10 rounded-full flex justify-center items-center cursor-pointer
                  ${
                    step >= 1
                      ? "bg-primary text-white"
                      : "bg-transparent border border-foreground/40 text-foreground/40"
                  }`}
                  onClick={() => setStep(1)}
                >
                  1
                </div>
                <p
                  className={
                    step >= 1 ? "text-foreground" : "text-foreground/40"
                  }
                >
                  Basic Info
                </p>
              </div>

              <div className="w-5">
                <ChevronRight className="w-full h-full" />
              </div>

              {/* STEP 2 TAG (filled once we reach step 2) */}
              <div className="flex gap-2 items-center step-2-tags">
                <div
                  className={`w-10 h-10 rounded-full flex justify-center items-center cursor-pointer
                  ${
                    step >= 2
                      ? "bg-primary text-white"
                      : "bg-transparent border border-foreground/40 text-foreground/40"
                  }`}
                  onClick={handleClickStep2Tag}
                >
                  2
                </div>
                <p
                  className={
                    step >= 2 ? "text-foreground" : "text-foreground/40"
                  }
                >
                  Transform Logic
                </p>
              </div>
            </div>
          </div>
        </DialogHeader>

        <div className="w-full h-full relative overflow-y-scroll overflow-x-hidden">
          <AnimatePresence mode="wait">
            {/* STEP 1 */}
            {step === 1 && (
              <motion.div
                key="step-1"
                className="w-full h-full absolute step-1"
                initial="initial"
                animate="animate"
                exit="exit"
                variants={slideVariants}
                transition={{ duration: 0.25, ease: "easeInOut" }}
              >
                <div className="py-4 px-2 w-full h-full">
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Basic Information</h3>
                    <p className="text-sm text-foreground/80">
                      Define the basic details for your feature transformation
                    </p>
                  </div>

                  <div className="space-y-6 py-8">
                    {/* NAME */}
                    <div className="flex w-full h-fit gap-2">
                      <div className="flex flex-col gap-2 w-full">
                        <label className="text-sm text-foreground">Name*</label>
                        <Input
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className={`border placeholder:text-foreground/80 ${
                            errors.name
                              ? "border-red-500"
                              : "border-foreground/20"
                          }`}
                          placeholder="e.g. calculate age from DOB"
                        />
                        {errors.name && (
                          <p className="text-xs text-red-500">
                            {errors.name}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* DESCRIPTION */}
                    <div className="flex flex-col gap-2 w-full">
                      <label className="text-sm text-foreground">
                        Description
                      </label>
                      <div className="flex gap-2">
                        <Textarea
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          className="border border-foreground/20 !text-xs h-32 placeholder:text-foreground/80"
                          placeholder="Describe what this transformation does..."
                        />
                      </div>
                    </div>

                    {/* CATEGORY */}
                    <div className="flex flex-col gap-2 w-full">
                      <label className="text-sm text-foreground">
                        Category*
                      </label>
                      <Select
                        value={category}
                        onValueChange={(val) => {
                          setCategory(val);
                          setErrors((prev) => ({ ...prev, category: "" }));
                        }}
                        onOpenChange={(open) => setIsCategoryOpen(open)}
                      >
                        <SelectTrigger
                          className={`border placeholder:text-foreground/40 !h-10.5 w-full [&>svg]:transition-transform [&>svg]:duration-200 ${
                            isCategoryOpen ? "[&>svg]:rotate-180" : ""
                          } ${
                            errors.category
                              ? "border-red-500"
                              : "border-foreground/20"
                          }`}
                        >
                          <SelectValue
                            placeholder="Select a category"
                            className="placeholder:text-sm !cursor-pointer"
                          />
                        </SelectTrigger>
                        <SelectContent>
                          {CATEGORY_OPTIONS.map((c) => (
                            <SelectItem
                              key={c}
                              value={c}
                              className="!cursor-pointer"
                            >
                              {c}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.category && (
                        <p className="text-xs text-red-500">
                          {errors.category}
                        </p>
                      )}
                    </div>

                    {/* BUTTONS */}
                    <div className="w-full flex justify-end gap-2">
                      <RippleButton>
                        <Button
                          variant="outline"
                          className="gap-2 border-primary text-foreground hover:bg-gray-50 w-fit px-7"
                          onClick={() => onOpenChange?.(false)}
                        >
                          Cancel
                        </Button>
                      </RippleButton>
                      <RippleButton>
                        <Button
                          className="bg-sidebar-primary hover:bg-[#E64A19] text-white gap-3 rounded-full !px-6 !py-6 !cursor-pointer duration-300"
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
                </div>
              </motion.div>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <motion.div
                key="step-2"
                className="w-full h-full absolute step-2"
                initial="initial"
                animate="animate"
                exit="exit"
                variants={slideVariants}
                transition={{ duration: 0.25, ease: "easeInOut" }}
              >
                <div className="py-4 px-2 w-full h-full">
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">
                      Transformation Logic
                    </h3>
                    <p className="text-sm text-foreground/80">
                      Write the code that defines your transformation logic
                    </p>
                  </div>

                  <div className="space-y-6 py-8">
                    {/* LANGUAGE */}
                    <div className="flex flex-col gap-2 w-full">
                      <label className="text-sm text-foreground">
                        Language*
                      </label>
                      <Select
                        value={language}
                        onValueChange={setLanguage}
                        onOpenChange={(open) => setIsLanguageOpen(open)}
                      >
                        <SelectTrigger
                          className={`border border-foreground/20 placeholder:text-foreground/40 !h-10.5 w-full [&>svg]:transition-transform [&>svg]:duration-200 ${
                            isLanguageOpen ? "[&>svg]:rotate-180" : ""
                          }`}
                        >
                          <SelectValue
                            placeholder="Python"
                            className="placeholder:text-sm !cursor-pointer"
                          />
                        </SelectTrigger>
                        <SelectContent>
                          {LANGUAGE_OPTIONS.map((c) => (
                            <SelectItem
                              key={c}
                              value={c}
                              className="!cursor-pointer"
                            >
                              {c}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* CODE */}
                    <div className="flex flex-col gap-2 w-full">
                      <label className="text-sm text-foreground">
                        Transformation Code
                      </label>
                      <div className="flex gap-2">
                        <Textarea
                          value={code}
                          onChange={(e) => setCode(e.target.value)}
                          className="border border-foreground/20 !text-xs h-32 placeholder:text-foreground/80 font-mono"
                          placeholder={`def calculate_age(dob):\n    today = datetime.now()\n    return (today - dob).days // 365`}
                        />
                      </div>
                    </div>

                    {/* BUTTONS */}
                    <div className="w-full flex justify-end gap-2">
                      <RippleButton>
                        <Button
                          variant="outline"
                          className="gap-2 border-primary text-foreground hover:bg-gray-50 w-fit px-7"
                          onClick={() => setStep(1)}
                        >
                          Back
                        </Button>
                      </RippleButton>
                      <RippleButton>
                        <Button
                          className="bg-sidebar-primary hover:bg-[#E64A19] text-white gap-3 rounded-full !px-6 !py-6 !cursor-pointer duration-300"
                          onClick={handleCreateTransformation}
                        >
                          Create Transformation
                          <div className="w-4 h-auto">
                            <LeftArrow className="rotate-180" />
                          </div>
                        </Button>
                      </RippleButton>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  );
}