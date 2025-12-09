import React, { useState } from "react";
import { LeftArrow } from "@/components/Icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RippleButton } from "@/components/ui/ripple-button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const BasicInfo = ({ goNext, goBack,setIsModalOpen }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState();
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [errors, setErrors] = useState({
    name: "",
    category: "",
  });

  const CATEGORY_OPTIONS = [
    "General",
    "Marketing",
    "Sales",
    "Support",
    "Engineering",
    "Product",
    "HR",
  ];

  const validate = () => {
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
    const ok = validate();
    if (!ok) return;

    if (typeof goNext === "function") {
      goNext();
    }
  };

  return (
    <div className="w-full h-full step-1">
      <div className=" px-2 w-full h-full">
        <div className="space-y-2">
          <h3 className="text-lg font-medium">Basic Information</h3>
          <p className="text-sm text-foreground/80">
            Define the basic details for your feature transformation
          </p>
        </div>

        <div className="space-y-6 py-7">
          {/* NAME */}
          <div className="flex w-full h-fit gap-2">
            <div className="flex flex-col gap-2 w-full">
              <label className="text-sm text-foreground">Name*</label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`border placeholder:text-foreground/80 ${
                  errors.name ? "border-red-500" : "border-foreground/20"
                }`}
                placeholder="e.g. calculate age from DOB"
              />
              {errors.name && (
                <p className="text-xs text-red-500">{errors.name}</p>
              )}
            </div>
          </div>

          {/* DESCRIPTION */}
          <div className="flex flex-col gap-2 w-full">
            <label className="text-sm text-foreground">Description</label>
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
            <label className="text-sm text-foreground">Category*</label>
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
                } ${errors.category ? "border-red-500" : "border-foreground/20"}`}
              >
                <SelectValue
                  placeholder="Select a category"
                  className="placeholder:text-sm !cursor-pointer"
                />
              </SelectTrigger>
              <SelectContent>
                {CATEGORY_OPTIONS.map((c) => (
                  <SelectItem key={c} value={c} className="!cursor-pointer">
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.category && (
              <p className="text-xs text-red-500">{errors.category}</p>
            )}
          </div>

          {/* BUTTONS */}
          <div className="w-full flex justify-end gap-2">
            <RippleButton>
              <Button
                variant="outline"
                className="gap-2 border-primary text-foreground hover:bg-gray-50 w-fit px-7"
                onClick={()=>{setIsModalOpen(false)}}
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
    </div>
  );
};

export default BasicInfo;
