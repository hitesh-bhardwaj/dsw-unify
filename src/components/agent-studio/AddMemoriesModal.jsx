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

export default function AddMemoriesModal({ open, onOpenChange }) {
  const [memoryName, setMemoryName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [scope, setScope] = useState("");
  const [status, setStatus] = useState("");

  const [isOpenType, setIsOpenType] = useState(false);
  const [isOpenScope, setIsOpenScope] = useState(false);
  const [isOpenStatus, setIsOpenStatus] = useState(false);

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!open) {
      setMemoryName("");
      setDescription("");
      setType("");
      setScope("");
      setStatus("");
      setErrors({});
    }
  }, [open]);

  const slide = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  };

  /** =============== FORM VALIDATION =============== */
  const handleSubmit = () => {
    const errs = {
      memoryName: !memoryName.trim() ? "Memory Name is required" : "",
      description: !description.trim() ? "Description is required" : "",
      type: !type ? "Type is required" : "",
      scope: !scope ? "Scope is required" : "",
      status: !status ? "Status is required" : "",
    };
    setErrors(errs);

    if (Object.values(errs).some(Boolean)) return;

    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[60%] h-[80%] flex flex-col left-1/2 -translate-x-1/2 top-1/2 pt-8">
        <DialogHeader className="justify-center pb-4">
          <DialogTitle className="text-2xl font-medium">
            Create New Memory
          </DialogTitle>
          <p className="text-xs text-foreground/80">
            Create a new memory system for your agents
          </p>
        </DialogHeader>

        <div className="w-full h-full overflow-y-auto pr-2 flex flex-col justify-between">
          <motion.div
            className="flex flex-col space-y-6"
            variants={slide}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {/* Memory Name */}
            <div className="flex flex-col gap-3">
              <label className="text-sm text-foreground">Memory Name</label>
              <Input
                value={memoryName}
                placeholder="e.g. User Preferences"
                onChange={(e) => setMemoryName(e.target.value)}
                className={`border placeholder:text-xs placeholder:text-foreground/80 ${
                  errors.memoryName ? "border-red-500" : "border-foreground/20"
                }`}
              />
              {errors.memoryName && (
                <p className="text-xs text-red-500">{errors.memoryName}</p>
              )}
            </div>

            {/* Description */}
            <div className="flex flex-col gap-3">
              <label className="text-sm text-foreground">Description</label>
              <Textarea
                value={description}
                placeholder="Describe what this memory stores..."
                onChange={(e) => setDescription(e.target.value)}
                className={`border placeholder:text-xs h-32 placeholder:text-foreground/80 ${
                  errors.description ? "border-red-500" : "border-foreground/20"
                }`}
              />
              {errors.description && (
                <p className="text-xs text-red-500">{errors.description}</p>
              )}
            </div>

            {/* Type, Scope and Status */}
            <div className="grid grid-cols-3 gap-4">
              <div className="flex flex-col gap-2 text-foreground/80 w-full">
                <label className="text-sm">Type</label>
                <Select
                  value={type}
                  onValueChange={setType}
                  onOpenChange={(open) => setIsOpenType(open)}
                  className="w-full"
                >
                  <SelectTrigger
                    className={`border w-full ${
                      errors.type ? "border-red-500" : "border-foreground/20"
                    } placeholder:text-foreground/60 placeholder:text-xs rounded-md !h-10 px-3 text-xs outline-none [&>svg]:transition-transform [&>svg]:duration-200 ${
                      isOpenType ? "[&>svg]:rotate-180" : ""
                    }`}
                  >
                    <SelectValue placeholder="Session" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="session" className="!cursor-pointer text-xs">
                      Session
                    </SelectItem>
                    <SelectItem value="persistent" className="!cursor-pointer text-xs">
                      Persistent
                    </SelectItem>
                    <SelectItem value="temporary" className="!cursor-pointer text-xs">
                      Temporary
                    </SelectItem>
                  </SelectContent>
                </Select>
                {errors.type && (
                  <p className="text-xs text-red-500">{errors.type}</p>
                )}
              </div>

              <div className="flex flex-col gap-2 text-foreground/80 w-full">
                <label className="text-sm">Scope</label>
                <Select
                  value={scope}
                  onValueChange={setScope}
                  onOpenChange={(open) => setIsOpenScope(open)}
                  className="w-full"
                >
                  <SelectTrigger
                    className={`border w-full ${
                      errors.scope ? "border-red-500" : "border-foreground/20"
                    } placeholder:text-foreground/60 placeholder:text-xs rounded-md !h-10 px-3 text-xs outline-none [&>svg]:transition-transform [&>svg]:duration-200 ${
                      isOpenScope ? "[&>svg]:rotate-180" : ""
                    }`}
                  >
                    <SelectValue placeholder="User" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="user" className="!cursor-pointer text-xs">
                      User
                    </SelectItem>
                    <SelectItem value="global" className="!cursor-pointer text-xs">
                      Global
                    </SelectItem>
                    <SelectItem value="agent" className="!cursor-pointer text-xs">
                      Agent
                    </SelectItem>
                  </SelectContent>
                </Select>
                {errors.scope && (
                  <p className="text-xs text-red-500">{errors.scope}</p>
                )}
              </div>

              <div className="flex flex-col gap-2 text-foreground/80 w-full">
                <label className="text-sm">Status</label>
                <Select
                  value={status}
                  onValueChange={setStatus}
                  onOpenChange={(open) => setIsOpenStatus(open)}
                  className="w-full"
                >
                  <SelectTrigger
                    className={`border w-full ${
                      errors.status ? "border-red-500" : "border-foreground/20"
                    } placeholder:text-foreground/60 placeholder:text-xs rounded-md !h-10 px-3 text-xs outline-none [&>svg]:transition-transform [&>svg]:duration-200 ${
                      isOpenStatus ? "[&>svg]:rotate-180" : ""
                    }`}
                  >
                    <SelectValue placeholder="Active" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="active" className="!cursor-pointer text-xs">
                      Active
                    </SelectItem>
                    <SelectItem value="inactive" className="!cursor-pointer text-xs">
                      Inactive
                    </SelectItem>
                  </SelectContent>
                </Select>
                {errors.status && (
                  <p className="text-xs text-red-500">{errors.status}</p>
                )}
              </div>
            </div>
          </motion.div>

          <div className="py-6 my-2  flex justify-end gap-3">
            <RippleButton>
              <Button
                variant="outline"
                className="border-foreground/40  text-foreground/80 px-6"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
            </RippleButton>

            <RippleButton>
              <Button
                onClick={handleSubmit}
                className="bg-sidebar-primary hover:bg-[#E64A19] text-white gap-3 rounded-full !px-6 !py-6 !cursor-pointer duration-300"
              >
                Create Memory
                <LeftArrow className="ml-2 rotate-180 w-4" />
              </Button>
            </RippleButton>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}