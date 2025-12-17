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
import * as llmsApi from "@/lib/api/llms";

export default function DeployModal({ open, onOpenChange }) {
  const [mainTab, setMainTab] = useState("api");

  // API-Based fields
  const [provider, setProvider] = useState("");
  const [model, setModel] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [description, setDescription] = useState("");

  // Self-Hosted fields
  const [modelSource, setModelSource] = useState("");
  const [modelPath, setModelPath] = useState("");
  const [deploymentTarget, setDeploymentTarget] = useState("");
  const [gpuConfig, setGpuConfig] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [selfHostedDescription, setSelfHostedDescription] = useState("");

  const [isOpenProvider, setIsOpenProvider] = useState(false);
  const [isOpenModel, setIsOpenModel] = useState(false);
  const [isOpenModelSource, setIsOpenModelSource] = useState(false);
  const [isOpenDeploymentTarget, setIsOpenDeploymentTarget] = useState(false);
  const [isOpenGpuConfig, setIsOpenGpuConfig] = useState(false);

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState(null);

  useEffect(() => {
    if (!open) {
      // Reset API-Based fields
      setProvider("");
      setModel("");
      setApiKey("");
      setDescription("");

      // Reset Self-Hosted fields
      setModelSource("");
      setModelPath("");
      setDeploymentTarget("");
      setGpuConfig("");
      setDisplayName("");
      setSelfHostedDescription("");

      setMainTab("api");
      setErrors({});
      setApiError(null);
    }
  }, [open]);


  const slide = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  };

  /** ---------------- FORM VALIDATION & SUBMIT ---------------- */
  const handleSubmit = async () => {
    // Validate based on current tab
    const errs = {};

    if (mainTab === "api") {
      errs.provider = !provider.trim() ? "Provider is required" : "";
      errs.model = !model.trim() ? "Model is required" : "";
      errs.apiKey = !apiKey.trim() ? "API Key is required" : "";
    } else if (mainTab === "self") {
      errs.modelSource = !modelSource ? "Model source is required" : "";
      errs.modelPath = !modelPath.trim() ? "Model path is required" : "";
      errs.deploymentTarget = !deploymentTarget ? "Deployment target is required" : "";
      errs.gpuConfig = !gpuConfig ? "GPU configuration is required" : "";
      errs.displayName = !displayName.trim() ? "Display name is required" : "";
    }

    setErrors(errs);
    if (Object.values(errs).some(Boolean)) return;

    try {
      setIsLoading(true);
      setApiError(null);

      const deploymentData = {
        type: mainTab === "api" ? "api-based" : "self-hosted",
      };

      if (mainTab === "api") {
        deploymentData.provider = provider;
        deploymentData.model = model;
        deploymentData.apiKey = apiKey;
        deploymentData.description = description;
      } else {
        deploymentData.modelSource = modelSource;
        deploymentData.modelPath = modelPath;
        deploymentData.deploymentTarget = deploymentTarget;
        deploymentData.gpuConfig = gpuConfig;
        deploymentData.displayName = displayName;
        deploymentData.description = selfHostedDescription;
      }

      await llmsApi.deployLLM(deploymentData);

      // Close modal on success
      onOpenChange(false);

      // Refresh the page to show the new LLM
      window.location.reload();
    } catch (err) {
      setApiError(err.message || "Failed to deploy model");
      console.error("Error deploying model:", err);
    } finally {
      setIsLoading(false);
    }
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
        <Select
          value={modelSource}
          onValueChange={setModelSource}
          onOpenChange={setIsOpenModelSource}
        >
          <SelectTrigger
            className={`!h-12 w-full border text-xs cursor-pointer ${
              isOpenModelSource ? "[&>svg]:rotate-180" : ""
            } ${errors.modelSource ? "border-red-500" : "border-border-color-0"}`}
          >
            <SelectValue placeholder="Select source" />
          </SelectTrigger>
          <SelectContent className="border border-border-color-0">
            <SelectItem value="huggingface" className="cursor-pointer">
              Hugging Face
            </SelectItem>
            <SelectItem value="local" className="cursor-pointer">
              Local Filesystem
            </SelectItem>
            <SelectItem value="s3" className="cursor-pointer">
              AWS S3
            </SelectItem>
          </SelectContent>
        </Select>
        {errors.modelSource && <p className="text-xs text-red-500">{errors.modelSource}</p>}
      </div>

      {/* Model ID / Path */}
      <div className="flex flex-col gap-2">
        <label className="text-sm text-foreground">Model ID / Path</label>
        <Input
          value={modelPath}
          onChange={(e) => setModelPath(e.target.value)}
          placeholder="e.g., mistralai/Mistral-7B-Instruct-v0.2"
          className={`h-12 text-xs ${
            errors.modelPath ? "border-red-500" : "border border-border-color-0"
          }`}
        />
        {errors.modelPath && <p className="text-xs text-red-500">{errors.modelPath}</p>}
      </div>

      {/* Deployment Target */}
      <div className="flex flex-col gap-2">
        <label className="text-sm text-foreground">Deployment Target</label>
        <Select
          value={deploymentTarget}
          onValueChange={setDeploymentTarget}
          onOpenChange={setIsOpenDeploymentTarget}
        >
          <SelectTrigger
            className={`!h-12 w-full border text-xs cursor-pointer ${
              isOpenDeploymentTarget ? "[&>svg]:rotate-180" : ""
            } ${errors.deploymentTarget ? "border-red-500" : "border-border-color-0"}`}
          >
            <SelectValue placeholder="Select deployment target" />
          </SelectTrigger>
          <SelectContent className="border border-border-color-0">
            <SelectItem value="aws" className="cursor-pointer">AWS</SelectItem>
            <SelectItem value="gcp" className="cursor-pointer">Google Cloud</SelectItem>
            <SelectItem value="azure" className="cursor-pointer">Azure</SelectItem>
            <SelectItem value="local" className="cursor-pointer">Local GPU Server</SelectItem>
          </SelectContent>
        </Select>
        {errors.deploymentTarget && <p className="text-xs text-red-500">{errors.deploymentTarget}</p>}
      </div>

      {/* GPU Config */}
      <div className="flex flex-col gap-2">
        <label className="text-sm text-foreground">GPU Configuration</label>
        <Select
          value={gpuConfig}
          onValueChange={setGpuConfig}
          onOpenChange={setIsOpenGpuConfig}
        >
          <SelectTrigger
            className={`!h-12 w-full border text-xs cursor-pointer ${
              isOpenGpuConfig ? "[&>svg]:rotate-180" : ""
            } ${errors.gpuConfig ? "border-red-500" : "border-border-color-0"}`}
          >
            <SelectValue placeholder="Select GPU" />
          </SelectTrigger>
          <SelectContent className="border border-border-color-0">
            <SelectItem value="a100" className="cursor-pointer">NVIDIA A100</SelectItem>
            <SelectItem value="h100" className="cursor-pointer">NVIDIA H100</SelectItem>
            <SelectItem value="rtx4090" className="cursor-pointer">RTX 4090</SelectItem>
            <SelectItem value="v100" className="cursor-pointer">NVIDIA V100</SelectItem>
          </SelectContent>
        </Select>
        {errors.gpuConfig && <p className="text-xs text-red-500">{errors.gpuConfig}</p>}
      </div>

      {/* Display Name */}
      <div className="flex flex-col gap-2">
        <label className="text-sm text-foreground">Display Name</label>
        <Input
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          placeholder="e.g., Mistral 7B Production"
          className={`h-12 text-xs ${
            errors.displayName ? "border-red-500" : "border border-border-color-0"
          }`}
        />
        {errors.displayName && <p className="text-xs text-red-500">{errors.displayName}</p>}
      </div>

      {/* Description */}
      <div className="flex flex-col gap-2">
        <label className="text-sm text-foreground">Description</label>
        <Textarea
          value={selfHostedDescription}
          onChange={(e) => setSelfHostedDescription(e.target.value)}
          placeholder="Describe the use case for this model"
          className="border border-border-color-0 text-sm placeholder:text-xs !h-11"
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

          {apiError && (
            <div className="mt-6 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400 text-sm">
              {apiError}
            </div>
          )}

          <div className="pt-8 flex justify-end gap-3">
            <RippleButton>
              <Button
                variant="outline"
                className="border-foreground/40 text-foreground/80 px-6"
                onClick={() => onOpenChange(false)}
                disabled={isLoading}
              >
                Cancel
              </Button>
            </RippleButton>

            <RippleButton>
              <Button
                onClick={handleSubmit}
                disabled={isLoading}
                className="bg-sidebar-primary hover:bg-[#E64A19] text-white gap-3 rounded-full !px-6 !py-6 duration-300 disabled:opacity-50"
              >
                {isLoading ? "Deploying..." : "Deploy Model"}
                {!isLoading && <LeftArrow className="ml-2 rotate-180 w-4" />}
              </Button>
            </RippleButton>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
