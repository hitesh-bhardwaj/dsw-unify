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

export default function AddToolModal({ open, onOpenChange }) {
  const [toolName, setToolName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [category, setCategory] = useState("");
  const [apiEndpoint, setApiEndpoint] = useState("");
  const [httpMethod, setHttpMethod] = useState("");
  const [status, setStatus] = useState("");

  const [isOpenType, setIsOpenType] = useState(false);
  const [isOpenCategory, setIsOpenCategory] = useState(false);
  const [isOpenMethod, setIsOpenMethod] = useState(false);
  const [isOpenStatus, setIsOpenStatus] = useState(false);

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!open) {
      setToolName("");
      setDescription("");
      setType("");
      setCategory("");
      setApiEndpoint("");
      setHttpMethod("");
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
      toolName: !toolName.trim() ? "Tool Name is required" : "",
      description: !description.trim() ? "Description is required" : "",
      type: !type ? "Type is required" : "",
      category: !category ? "Category is required" : "",
      apiEndpoint: !apiEndpoint.trim() ? "API Endpoint is required" : "",
      httpMethod: !httpMethod ? "HTTP Method is required" : "",
      status: !status ? "Status is required" : "",
    };
    setErrors(errs);

    if (Object.values(errs).some(Boolean)) return;

    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[80%] h-[80%] flex flex-col left-1/2 -translate-x-1/2 top-1/2 py-8">
        <DialogHeader className="justify-center pb-4">
          <DialogTitle className="text-2xl font-medium">
            Add New Tool
          </DialogTitle>
          <p className="text-xs text-foreground/80">
            Create a new tool for your agents
          </p>
        </DialogHeader>

        <div className="w-full h-full overflow-y-auto pr-2">
          <motion.div
            className="flex flex-col space-y-6"
            variants={slide}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {/* Tool Name */}
            <div className="flex flex-col gap-3">
              <label className="text-sm text-foreground">Tool Name</label>
              <Input
                value={toolName}
                placeholder="e.g. Web search"
                onChange={(e) => setToolName(e.target.value)}
                className={`border placeholder:text-xs placeholder:text-foreground/80 ${
                  errors.toolName ? "border-red-500" : "border-foreground/20"
                }`}
              />
              {errors.toolName && (
                <p className="text-xs text-red-500">{errors.toolName}</p>
              )}
            </div>

            {/* Description */}
            <div className="flex flex-col gap-3">
              <label className="text-sm text-foreground">Description</label>
              <Textarea
                value={description}
                placeholder="Describe what this tool does..."
                onChange={(e) => setDescription(e.target.value)}
                className={`border placeholder:text-xs h-32 placeholder:text-foreground/80 ${
                  errors.description ? "border-red-500" : "border-foreground/20"
                }`}
              />
              {errors.description && (
                <p className="text-xs text-red-500">{errors.description}</p>
              )}
            </div>

            {/* Type and Category */}
            <div className="grid grid-cols-2 gap-4">
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
                    <SelectValue placeholder="API" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="api" className="!cursor-pointer text-xs">
                      API
                    </SelectItem>
                    <SelectItem value="function" className="!cursor-pointer text-xs">
                      Function
                    </SelectItem>
                    <SelectItem value="webhook" className="!cursor-pointer text-xs">
                      Webhook
                    </SelectItem>
                  </SelectContent>
                </Select>
                {errors.type && (
                  <p className="text-xs text-red-500">{errors.type}</p>
                )}
              </div>

              <div className="flex flex-col gap-2 text-foreground/80 w-full">
                <label className="text-sm">Category</label>
                <Select
                  value={category}
                  onValueChange={setCategory}
                  onOpenChange={(open) => setIsOpenCategory(open)}
                  className="w-full"
                >
                  <SelectTrigger
                    className={`border w-full ${
                      errors.category ? "border-red-500" : "border-foreground/20"
                    } placeholder:text-foreground/60 placeholder:text-xs rounded-md !h-10 px-3 text-xs outline-none [&>svg]:transition-transform [&>svg]:duration-200 ${
                      isOpenCategory ? "[&>svg]:rotate-180" : ""
                    }`}
                  >
                    <SelectValue placeholder="Utility" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="utility" className="!cursor-pointer text-xs">
                      Utility
                    </SelectItem>
                    <SelectItem value="data" className="!cursor-pointer text-xs">
                      Data
                    </SelectItem>
                    <SelectItem value="communication" className="!cursor-pointer text-xs">
                      Communication
                    </SelectItem>
                    <SelectItem value="analytics" className="!cursor-pointer text-xs">
                      Analytics
                    </SelectItem>
                  </SelectContent>
                </Select>
                {errors.category && (
                  <p className="text-xs text-red-500">{errors.category}</p>
                )}
              </div>
            </div>

            {/* API Endpoint */}
            <div className="flex flex-col gap-3">
              <label className="text-sm text-foreground">API Endpoint</label>
              <Input
                value={apiEndpoint}
                placeholder="https://api.example.com/v1/endpoint"
                onChange={(e) => setApiEndpoint(e.target.value)}
                className={`border placeholder:text-xs placeholder:text-foreground/80 ${
                  errors.apiEndpoint ? "border-red-500" : "border-foreground/20"
                }`}
              />
              {errors.apiEndpoint && (
                <p className="text-xs text-red-500">{errors.apiEndpoint}</p>
              )}
            </div>

            {/* HTTP Method and Status */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2 text-foreground/80 w-full">
                <label className="text-sm">HTTP Method</label>
                <Select
                  value={httpMethod}
                  onValueChange={setHttpMethod}
                  onOpenChange={(open) => setIsOpenMethod(open)}
                  className="w-full"
                >
                  <SelectTrigger
                    className={`border w-full ${
                      errors.httpMethod ? "border-red-500" : "border-foreground/20"
                    } placeholder:text-foreground/60 placeholder:text-xs rounded-md !h-10 px-3 text-xs outline-none [&>svg]:transition-transform [&>svg]:duration-200 ${
                      isOpenMethod ? "[&>svg]:rotate-180" : ""
                    }`}
                  >
                    <SelectValue placeholder="GET" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="get" className="!cursor-pointer text-xs">
                      GET
                    </SelectItem>
                    <SelectItem value="post" className="!cursor-pointer text-xs">
                      POST
                    </SelectItem>
                    <SelectItem value="put" className="!cursor-pointer text-xs">
                      PUT
                    </SelectItem>
                    <SelectItem value="delete" className="!cursor-pointer text-xs">
                      DELETE
                    </SelectItem>
                    <SelectItem value="patch" className="!cursor-pointer text-xs">
                      PATCH
                    </SelectItem>
                  </SelectContent>
                </Select>
                {errors.httpMethod && (
                  <p className="text-xs text-red-500">{errors.httpMethod}</p>
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
                    <SelectItem value="testing" className="!cursor-pointer text-xs">
                      Testing
                    </SelectItem>
                  </SelectContent>
                </Select>
                {errors.status && (
                  <p className="text-xs text-red-500">{errors.status}</p>
                )}
              </div>
            </div>
          </motion.div>

          <div className="py-6 my-1  flex justify-end gap-3">
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
                Create Tool
                <LeftArrow className="ml-2 rotate-180 w-4" />
              </Button>
            </RippleButton>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}