"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { LeftArrow } from "../Icons";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import * as llmsApi from "@/lib/api/llms";

export default function ImportModal({ open, onOpenChange }) {
  const [importMethod, setImportMethod] = useState("");
  const [modelName, setModelName] = useState("");
  const [sourcePath, setSourcePath] = useState("");
  const [modelType, setModelType] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");

  const [isOpenImportMethod, setIsOpenImportMethod] = useState(false);
  const [isOpenModelType, setIsOpenModelType] = useState(false);

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState(null);

  useEffect(() => {
    if (!open) {
      setImportMethod("");
      setModelName("");
      setSourcePath("");
      setModelType("");
      setDescription("");
      setTags("");
      setErrors({});
      setApiError(null);
    }
  }, [open]);

  const handleSubmit = async () => {
    // Validate required fields
    const errs = {
      importMethod: !importMethod ? "Import method is required" : "",
      modelName: !modelName.trim() ? "Model name is required" : "",
      sourcePath: !sourcePath.trim() ? "Source path is required" : "",
      modelType: !modelType ? "Model type is required" : "",
    };

    setErrors(errs);
    if (Object.values(errs).some(Boolean)) return;

    try {
      setIsLoading(true);
      setApiError(null);

      const importData = {
        importMethod: importMethod,
        modelName: modelName,
        sourcePath: sourcePath,
        modelType: modelType,
        description: description,
        tags: tags ? tags.split(",").map(t => t.trim()) : [],
      };

      await llmsApi.importLLM(importData);

      // Close modal on success
      onOpenChange(false);

      // Refresh the page to show the imported LLM
      window.location.reload();
    } catch (err) {
      setApiError(err.message || "Failed to import model");
      console.error("Error importing model:", err);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[45%] h-[90%] overflow-hidden overflow-y-auto  p-4  bg-background border border-border-color-0">
        <div className="pr-2 overflow-hidden overflow-y-auto">
         <div className="py-4 px-2 w-full space-y-5 ">
        <DialogHeader>
          <DialogTitle className="text-3xl font-medium">
            Import Model
            <p className="text-sm font-normal text-foreground/80 pt-1">Import and existing modal configuration or checkpoint</p>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          {/* Import Method */}
          <div className="space-y-2">
            <p className="text-sm font-medium">Import Method</p>
            <Select
              value={importMethod}
              onValueChange={setImportMethod}
              onOpenChange={setIsOpenImportMethod}
            >
              <SelectTrigger
                className={`cursor-pointer w-full !h-10 border ${
                  isOpenImportMethod ? "[&>svg]:rotate-180" : ""
                } ${errors.importMethod ? "border-red-500" : "border-border-color-0"}`}
              >
                <SelectValue placeholder="Select import method" />
              </SelectTrigger>
              <SelectContent className="border border-border-color-0">
                <SelectItem className="cursor-pointer" value="url">From URL</SelectItem>
                <SelectItem className="cursor-pointer" value="s3">From S3 Bucket</SelectItem>
                <SelectItem className="cursor-pointer" value="local">Upload File</SelectItem>
                <SelectItem className="cursor-pointer" value="huggingface">From Hugging Face</SelectItem>
              </SelectContent>
            </Select>
            {errors.importMethod && <p className="text-xs text-red-500">{errors.importMethod}</p>}
          </div>

          {/* Model Name */}
          <div className="space-y-2">
            <p className="text-sm font-normal">Model Name</p>
            <Input
              value={modelName}
              onChange={(e) => setModelName(e.target.value)}
              placeholder="Enter model name"
              className={errors.modelName ? "border-red-500" : ""}
            />
            {errors.modelName && <p className="text-xs text-red-500">{errors.modelName}</p>}
          </div>

          {/* Source Path */}
          <div className="space-y-2">
            <p className="text-sm font-normal">Source Path / URL</p>
            <Input
              value={sourcePath}
              onChange={(e) => setSourcePath(e.target.value)}
              placeholder="e.g. s3://bucket/model.ckpt or https://..."
              className={errors.sourcePath ? "border-red-500" : ""}
            />
            {errors.sourcePath && <p className="text-xs text-red-500">{errors.sourcePath}</p>}
          </div>

          {/* Model Type */}
          <div className="space-y-2">
            <p className="text-sm font-normal">Model Type</p>
            <Select
              value={modelType}
              onValueChange={setModelType}
              onOpenChange={setIsOpenModelType}
            >
              <SelectTrigger
                className={`cursor-pointer w-full !h-10 border ${
                  isOpenModelType ? "[&>svg]:rotate-180" : ""
                } ${errors.modelType ? "border-red-500" : "border-border-color-0"}`}
              >
                <SelectValue placeholder="Select model type" />
              </SelectTrigger>
              <SelectContent className="border border-border-color-0">
                <SelectItem className="cursor-pointer" value="llm">LLM</SelectItem>
                <SelectItem className="cursor-pointer" value="embedding">Embedding Model</SelectItem>
                <SelectItem className="cursor-pointer" value="fine-tuned">Fine-tuned Model</SelectItem>
              </SelectContent>
            </Select>
            {errors.modelType && <p className="text-xs text-red-500">{errors.modelType}</p>}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <p className="text-sm font-normal">Description</p>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the imported model..."
            />
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <p className="text-sm font-normal">Tags (comma-separated)</p>
            <Input
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="e.g., imported, production, custom"
            />
          </div>
        </div>

        {apiError && (
          <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400 text-sm">
            {apiError}
          </div>
        )}

        <DialogFooter className="mt-6">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
            className="mr-2"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isLoading}
            className="bg-sidebar-primary text-white hover:bg-primary !px-6 !space-x-2 disabled:opacity-50"
          >
            {isLoading ? "Importing..." : "Import Model"}
            {!isLoading && <LeftArrow className='rotate-180'/>}
          </Button>
        </DialogFooter>
        </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
