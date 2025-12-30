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
  const [tags, setTags] = useState([]);
  const [errors, setErrors] = useState({
    name: "",
    category: "",
    tags:""
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
    const newErrors = { name: "", category: "", tags:"" };
    let valid = true;

    if (!name.trim()) {
      newErrors.name = "Name is required.";
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
            Provide a name and description for your feature service
          </p>
        </div>

        <div className="space-y-6 py-7">
          {/* NAME */}
          <div className="flex w-full h-fit gap-2">
            <div className="flex flex-col gap-2 w-full">
              <label className="text-sm text-foreground"> Service Name</label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`border border-border-color-0 placeholder:text-foreground/80 ${
                  errors.name ? "border-red-500" : "border-border-color-0"
                }`}
                placeholder="e.g. Customer 360 Service"
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
                className="border border-border-color-0 !text-xs h-32 placeholder:text-foreground/80"
                placeholder="Describe what this feature service provides..."
              />
            </div>
          </div>

          {/* CATEGORY */}
          <div className="flex flex-col gap-2 w-full">
            <label className="text-sm text-foreground">Tags</label>
             <Input
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className={`border placeholder:text-foreground/80 `}
                placeholder="Add tags (comma separated) "
              />
            {errors.tags && (
              <p className="text-xs text-red-500">{errors.tags}</p>
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
