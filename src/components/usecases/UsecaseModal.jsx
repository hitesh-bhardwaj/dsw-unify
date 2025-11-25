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
import { RippleButton } from "@/components/ui/ripple-button";
import { Button } from "@/components/ui/button";
import { LeftArrow } from "@/components/Icons";

export default function UsecaseModal({ open, onOpenChange }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [owner, setOwner] = useState("");
  const [errors, setErrors] = useState({ name: "" });

  useEffect(() => {
    if (!open) {
      setName("");
      setDescription("");
      setTags("");
      setOwner("");
      setErrors({ name: "" });
    }
  }, [open]);

  const slideVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const handleSubmit = () => {
    const newErrors = {
      name: !name.trim() ? "Name is required." : "",
      description: !description.trim() ? "Description is required." : "",
      tags: !tags.trim() ? "Tags are required." : "",
      owner: !owner.trim() ? "Owner is required." : "",
    };

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some((e) => e !== "");
    if (hasErrors) return;

    // console.log("Submitted:", { name, description, tags, owner });
    onOpenChange?.(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[80%] left-1/2 -translate-x-1/2 top-1/2 h-[80%] flex flex-col">
        <DialogHeader className="justify-center h-fit flex">
          <DialogTitle className="text-2xl font-medium">
            Create Use Case
          </DialogTitle>
        </DialogHeader>

        <div className="w-full h-full relative overflow-y-scroll overflow-x-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key="step-1"
              className="w-full h-full absolute"
              initial="initial"
              animate="animate"
              exit="exit"
              variants={slideVariants}
              transition={{ duration: 0.25, ease: "easeInOut" }}
            >
              <div className="py-4 px-2 w-full h-full space-y-6">
                {/* NAME */}
                <div className="flex flex-col gap-2 w-full">
                  <label className="text-sm text-foreground">
                    Use Case Name*
                  </label>
                  <Input
                    value={name}
                    placeholder='e.g. Customer Churn Prediction'
                    onChange={(e) => setName(e.target.value)}
                    className={`border placeholder:text-foreground/80 placeholder:text-xs ${
                      errors.name ? "border-red-500" : "border-foreground/20"
                    }`}
                  />
                  {errors.name && (
                    <p className="text-xs text-red-500">{errors.name}</p>
                  )}
                </div>

                {/* DESCRIPTION */}
                <div className="flex flex-col gap-2 w-full">
                  <label className="text-sm text-foreground">Description</label>
                  <Textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder='Describe the business problem this use case addresses'
                    className={`border !text-xs h-32 placeholder:text-foreground/80 placeholder:text-xs ${
                      errors.description
                        ? "border-red-500"
                        : "border-foreground/20"
                    }`}
                  />
                  {errors.description && (
                    <p className="text-xs text-red-500">{errors.description}</p>
                  )}
                </div>

                {/* TAGS */}
                <div className="flex flex-col gap-2 w-full">
                  <label className="text-sm text-foreground">Tags</label>
                  <input
                    type="text"
                    placeholder="Add tags (comma separated)"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    className={`border rounded-md px-3 h-10 placeholder:text-foreground/80 placeholder:text-xs text-sm outline-none ${
                      errors.tags ? "border-red-500" : "border-foreground/20"
                    }`}
                  />
                  {errors.tags && (
                    <p className="text-xs text-red-500">{errors.tags}</p>
                  )}
                </div>

                {/* OWNER */}
                <div className="flex flex-col gap-2 w-full">
                  <label className="text-sm text-foreground">Owner</label>
                  <input
                    type="text"
                    value={owner}
                    onChange={(e) => setOwner(e.target.value)}
                    placeholder="Owner name or email"
                    className={`border rounded-md px-3 h-10 placeholder:text-foreground/80 placeholder:text-xs text-sm outline-none ${
                      errors.owner ? "border-red-500" : "border-foreground/20"
                    }`}
                  />
                  {errors.owner && (
                    <p className="text-xs text-red-500">{errors.owner}</p>
                  )}
                </div>

                {/* BUTTONS */}
                <div className="w-full flex justify-end items-center gap-2 py-2 ">
                  <RippleButton>
                    <Button
                      variant="outline"
                      className="gap-2 border-foreground/40 text-foreground/80 hover:bg-gray-50 w-fit px-7"
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
                      Create Use Case
                      <div className="w-4 h-auto">
                        <LeftArrow className="rotate-180" />
                      </div>
                    </Button>
                  </RippleButton>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  );
}
