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

import AnimatedTabsSection from "@/components/common/TabsPane";
import { LeftArrow } from "@/components/Icons";

export default function DeployModal({ open, onOpenChange }) {
  const [mainTab, setMainTab] = useState("api");

  const [provider, setProvider] = useState("");
  const [model, setModel] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [description, setDescription] = useState("");

  const [isOpenProvider, setIsOpenProvider] = useState(false);
  const [isOpenModel, setIsOpenModel] = useState(false);

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!open) {
      setProvider("");
      setModel("");
      setApiKey("");
      setDescription("");
      setMainTab("api");
      setErrors({});
    }
  }, [open]);


  const slide = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  };

  /** ---------------- FORM VALIDATION ---------------- */
  const handleSubmit = () => {
    const errs = {
      provider: mainTab === "api" && !provider.trim() ? "Provider is required" : "",
      model: mainTab === "api" && !model.trim() ? "Model is required" : "",
      apiKey:
        mainTab === "api" && !apiKey.trim() ? "API Key is required" : "",
    };

    setErrors(errs);
    if (Object.values(errs).some(Boolean)) return;

    onOpenChange(false);
  };

  /** ---------------- API-BASED TAB CONTENT ---------------- */
  const apiBasedContent = (
    <motion.div
      className="flex flex-col space-y-6"
      variants={slide}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {/* Provider */}
      <div className="flex flex-col gap-2">
        <label className="text-sm">Provider</label>
        <Select
          value={provider}
          onValueChange={setProvider}
          onOpenChange={setIsOpenProvider}
        >
          <SelectTrigger
            className={`cursor-pointer border !h-11 w-full !border-border-color-0 text-xs ${
              isOpenProvider ? "[&>svg]:rotate-180" : ""
            } ${errors.provider ? "border-red-500" : ""}`}
          >
            <SelectValue placeholder="Select provider" />
          </SelectTrigger>
          <SelectContent className="border border-border-color-0">
            <SelectItem value="openai" className="cursor-pointer">OpenAI</SelectItem>
            <SelectItem value="anthropic" className="cursor-pointer">Anthropic</SelectItem>
            <SelectItem value="gemini" className="cursor-pointer">Google Gemini</SelectItem>
          </SelectContent>
        </Select>
        {errors.provider && <p className="text-xs text-red-500">{errors.provider}</p>}
      </div>

      {/* Model */}
      <div className="flex flex-col gap-2">
        <label className="text-sm">Model</label>
        <Select
          value={model}
          onValueChange={setModel}
          onOpenChange={setIsOpenModel}
        >
          <SelectTrigger
            className={`cursor-pointer border !h-11 w-full !border-border-color-0 text-xs ${
              isOpenModel ? "[&>svg]:rotate-180" : ""
            } ${errors.model ? "border-red-500" : ""}`}
          >
            <SelectValue placeholder="Select model" />
          </SelectTrigger>
          <SelectContent className="border border-border-color-0">
            <SelectItem value="gpt-4" className="cursor-pointer">GPT-4</SelectItem>
            <SelectItem value="gpt-4o-mini" className="cursor-pointer">GPT-4o Mini</SelectItem>
            <SelectItem value="claude-3" className="cursor-pointer">Claude 3</SelectItem>
          </SelectContent>
        </Select>
        {errors.model && <p className="text-xs text-red-500">{errors.model}</p>}
      </div>

      {/* API KEY */}
      <div className="flex flex-col gap-2">
        <label className="text-sm">API Key</label>
        <Input
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder="Enter your API Key"
          className={`placeholder:text-xs h-11 ${
            errors.apiKey ? "border-red-500" : "border border-border-color-0"
          }`}
        />
        {errors.apiKey && <p className="text-xs text-red-500">{errors.apiKey}</p>}
      </div>

      {/* Description */}
      <div className="flex flex-col gap-2">
        <label className="text-sm">Description</label>
        <Textarea
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="e.g. Production GPT-4"
          className="placeholder:text-xs border border-border-color-0"
        />
      </div>
    </motion.div>
  );

  /** ---------------- SELF-HOSTED TAB CONTENT ---------------- */
  const selfHostedContent = (
    <motion.div
      className="flex flex-col space-y-6"
      variants={slide}
      initial="initial"
      animate="animate"
      exit="exit"
    >
    

      {/* Model Source */}
      <div className="flex flex-col gap-2">
        <label className="text-sm text-foreground">Model Source</label>
        <Select>
          <SelectTrigger className="!h-12 w-full border border-border-color-0 text-sm cursor-pointer">
            <SelectValue placeholder="Select source" />
          </SelectTrigger>
          <SelectContent className="border border-border-color-0">
            
            <SelectItem value="local" className="cursor-pointer">
              Local Filesystem
            </SelectItem>
            <SelectItem value="s3" className="cursor-pointer">
              AWS S3
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Model ID / Path */}
      <div className="flex flex-col gap-2">
        <label className="text-sm text-foreground">Model ID / Path</label>
        <Input
          placeholder="e.g., mistralai/Mistral-7B-Instruct-v0.2"
          className="h-12 border border-border-color-0 text-sm"
        />
      </div>

      {/* Deployment Target */}
      <div className="flex flex-col gap-2">
        <label className="text-sm text-foreground">Deployment Target</label>
        <Select>
          <SelectTrigger className="!h-12 w-full border border-border-color-0 text-sm cursor-pointer">
            <SelectValue placeholder="Select deployment target" />
          </SelectTrigger>
          <SelectContent className="border border-border-color-0">
            <SelectItem value="aws" className="cursor-pointer">AWS</SelectItem>
            <SelectItem value="gcp" className="cursor-pointer">Google Cloud</SelectItem>
            <SelectItem value="local" className="cursor-pointer">Local GPU Server</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* GPU Config */}
      <div className="flex flex-col gap-2">
        <label className="text-sm text-foreground">GPU Configuration</label>
        <Select>
          <SelectTrigger className="!h-12 w-full border border-border-color-0 text-sm cursor-pointer">
            <SelectValue placeholder="Select GPU" />
          </SelectTrigger>
          <SelectContent className="border border-border-color-0">
            <SelectItem value="a100" className="cursor-pointer">NVIDIA A100</SelectItem>
            <SelectItem value="h100" className="cursor-pointer">NVIDIA H100</SelectItem>
            <SelectItem value="rtx4090" className="cursor-pointer">RTX 4090</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Display Name */}
      <div className="flex flex-col gap-2">
        <label className="text-sm text-foreground">Display Name</label>
        <Input
          placeholder="e.g., Mistral 7B Production"
          className="h-12 border border-border-color-0 text-sm"
        />
      </div>

      {/* Description */}
      <div className="flex flex-col gap-2">
        <label className="text-sm text-foreground">Description</label>
        <Textarea
          placeholder="Describe the use case for this model"
          className="border border-border-color-0  text-sm placeholder:text-sm !h-11"
        />
      </div>
    </motion.div>
  );

  /** ---------------- TAB ITEMS ---------------- */
  const items = [
    {
      id: "api",
      value: "api",
      label: "API-Based",
      render: () => apiBasedContent,
    },
    {
      id: "self",
      value: "self",
      label: "Self-Hosted",
      render: () => selfHostedContent,
    },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[50%] h-[90%] flex flex-col left-1/2 -translate-x-1/2 top-1/2 py-6">
        <DialogHeader className="justify-center pb-4">
          <DialogTitle className="text-2xl font-medium">
            Deploy New Model
          </DialogTitle>
          <p className="text-sm text-foreground/80">
            Configure and deploy a new LLM model to your infrastructure
          </p>
        </DialogHeader>

        <div className="w-full h-full overflow-y-auto pr-2">
          <AnimatedTabsSection
            items={items}
            defaultValue={mainTab}
            onValueChange={setMainTab}
          />

          <div className="pt-8 flex justify-end gap-3">
            <RippleButton>
              <Button
                variant="outline"
                className="border-foreground/40 text-foreground/80 px-6"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
            </RippleButton>

            <RippleButton>
              <Button
                onClick={handleSubmit}
                className="bg-sidebar-primary hover:bg-[#E64A19] text-white gap-3 rounded-full !px-6 !py-6 duration-300"
              >
                Deploy Model
                <LeftArrow className="ml-2 rotate-180 w-4" />
              </Button>
            </RippleButton>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
