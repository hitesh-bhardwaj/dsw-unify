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
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, X } from "lucide-react";
import { LeftArrow } from "@/components/Icons";
import * as toolsApi from "@/lib/api/tools";

/**
 * Modal for adding/editing a custom tool with Python function
 *
 * @param {Object} props - Component props
 * @param {boolean} props.open - Whether the modal is open
 * @param {function} props.onOpenChange - Callback when modal state changes
 * @param {Object} props.tool - Tool data for editing (null for create)
 * @returns {React.JSX.Element}
 */
export default function CreateCustomToolModal({ open, onOpenChange, tool = null }) {
  const isEditMode = tool !== null;

  const [toolName, setToolName] = useState("");
  const [description, setDescription] = useState("");
  const [functionCode, setFunctionCode] = useState("");
  const [parameters, setParameters] = useState([]);

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState(null);

  // Initialize form with tool data when editing
  useEffect(() => {
    if (isEditMode && tool) {
      setToolName(tool.name || "");
      setDescription(tool.description || "");
      setFunctionCode(tool.functionCode || "");
      setParameters(tool.parameters || []);
    } else if (!open) {
      // Reset form when modal closes
      setToolName("");
      setDescription("");
      setFunctionCode("");
      setParameters([]);
      setErrors({});
      setApiError(null);
    }
  }, [open, tool, isEditMode]);

  const slide = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  };

  // Add new parameter
  const handleAddParameter = () => {
    setParameters([
      ...parameters,
      {
        id: Date.now(),
        name: "",
        displayLabel: "",
        description: "",
        type: "string",
        defaultValue: "",
        required: false,
      },
    ]);
  };

  // Remove parameter
  const handleRemoveParameter = (id) => {
    setParameters(parameters.filter((param) => param.id !== id));
  };

  // Update parameter field
  const handleUpdateParameter = (id, field, value) => {
    setParameters(
      parameters.map((param) =>
        param.id === id ? { ...param, [field]: value } : param
      )
    );
  };

  // Form validation
  const handleSubmit = async () => {
    const errs = {
      toolName: !toolName.trim() ? "Tool Name is required" : "",
      description: !description.trim() ? "Description is required" : "",
      functionCode: !functionCode.trim() ? "Function Code is required" : "",
    };

    // Validate parameters
    parameters.forEach((param, index) => {
      if (!param.name.trim()) {
        errs[`param_name_${index}`] = "Parameter name is required";
      }
      if (!param.displayLabel.trim()) {
        errs[`param_label_${index}`] = "Display label is required";
      }
    });

    setErrors(errs);

    if (Object.values(errs).some(Boolean)) return;

    try {
      setIsLoading(true);
      setApiError(null);

      const toolData = {
        name: toolName,
        description: description,
        functionCode: functionCode,
        parameters: parameters,
        isCustom: true,
        type: "function",
        category: "custom",
        status: "active",
        tags: ["custom", "function"],
      };

      if (isEditMode) {
        await toolsApi.updateTool(tool.id, toolData);
      } else {
        await toolsApi.createCustomTool(toolData);
      }

      // Close modal on success
      onOpenChange(false);

      // Refresh the page to show changes
      window.location.reload();
    } catch (err) {
      setApiError(err.message || `Failed to ${isEditMode ? 'update' : 'create'} custom tool`);
      console.error(`Error ${isEditMode ? 'updating' : 'creating'} custom tool:`, err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[80%] h-[85%] flex flex-col left-1/2 -translate-x-1/2 top-1/2 py-8">
        <DialogHeader className="justify-center pb-4">
          <DialogTitle className="text-3xl font-medium">
            {isEditMode ? "Edit Custom Tool" : "Add New Tool"}
          </DialogTitle>
          <p className="text-sm text-foreground/80">
            Create a new custom tool with Python function and configurable parameters
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
                placeholder="e.g., Web Search Tool"
                onChange={(e) => setToolName(e.target.value)}
                className={`border placeholder:text-xs placeholder:text-foreground/80 ${
                  errors.toolName ? "border-red-500" : "border-border-color-0"
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
                className={`border placeholder:text-xs h-24 placeholder:text-foreground/80 ${
                  errors.description ? "border-red-500" : "border-border-color-0"
                }`}
              />
              {errors.description && (
                <p className="text-xs text-red-500">{errors.description}</p>
              )}
            </div>

            {/* Python Function */}
            <div className="flex flex-col gap-3">
              <div>
                <label className="text-base font-medium text-foreground">Python Function</label>
                <p className="text-xs text-foreground/60 mt-1">
                  Write a Python function that accepts `input_data` and `config` parameters
                </p>
              </div>
              <Textarea
                value={functionCode}
                placeholder={`def process(input_data, config):\n    # Your code here\n    api_key = config.get('api_key')\n    threshold = config.get('threshold', 0.5)\n    # Process and return results\n    return result`}
                onChange={(e) => setFunctionCode(e.target.value)}
                className={`border placeholder:text-xs h-48 font-mono text-sm placeholder:text-foreground/80 ${
                  errors.functionCode ? "border-red-500" : "border-border-color-0"
                }`}
              />
              {errors.functionCode && (
                <p className="text-xs text-red-500">{errors.functionCode}</p>
              )}
            </div>

            {/* Configurable Parameters */}
            <div className="flex flex-col gap-4">
              <div>
                <label className="text-base font-medium text-foreground">Configurable Parameters</label>
                <p className="text-xs text-foreground/60 mt-1">
                  Define parameters that can be configured when attaching this tool to an agent
                </p>
              </div>

              {/* Parameters List */}
              {parameters.map((param, index) => (
                <div
                  key={param.id}
                  className="border border-border-color-0 rounded-lg p-4 space-y-4 relative"
                >
                  {/* Remove button */}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 h-6 w-6 text-foreground/60 hover:text-red-500"
                    onClick={() => handleRemoveParameter(param.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>

                  <h4 className="text-sm font-medium text-foreground mb-3">
                    Parameter {index + 1}
                  </h4>

                  {/* Parameter Name and Display Label */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                      <label className="text-xs text-foreground/80">Parameter Name</label>
                      <Input
                        value={param.name}
                        placeholder="e.g., api_key"
                        onChange={(e) =>
                          handleUpdateParameter(param.id, "name", e.target.value)
                        }
                        className={`border text-sm ${
                          errors[`param_name_${index}`]
                            ? "border-red-500"
                            : "border-border-color-0"
                        }`}
                      />
                      {errors[`param_name_${index}`] && (
                        <p className="text-xs text-red-500">
                          {errors[`param_name_${index}`]}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-xs text-foreground/80">Display Label</label>
                      <Input
                        value={param.displayLabel}
                        placeholder="e.g., API Key"
                        onChange={(e) =>
                          handleUpdateParameter(param.id, "displayLabel", e.target.value)
                        }
                        className={`border text-sm ${
                          errors[`param_label_${index}`]
                            ? "border-red-500"
                            : "border-border-color-0"
                        }`}
                      />
                      {errors[`param_label_${index}`] && (
                        <p className="text-xs text-red-500">
                          {errors[`param_label_${index}`]}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs text-foreground/80">Description</label>
                    <Input
                      value={param.description}
                      placeholder="Describe this parameter..."
                      onChange={(e) =>
                        handleUpdateParameter(param.id, "description", e.target.value)
                      }
                      className="border border-border-color-0 text-sm"
                    />
                  </div>

                  {/* Type, Default Value, and Required */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="flex flex-col gap-2">
                      <label className="text-xs text-foreground/80">Type</label>
                      <Select
                        value={param.type}
                        onValueChange={(value) =>
                          handleUpdateParameter(param.id, "type", value)
                        }
                      >
                        <SelectTrigger className="border border-border-color-0 text-sm">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="border border-border-color-0">
                          <SelectItem value="string" className="cursor-pointer text-xs">
                            String
                          </SelectItem>
                          <SelectItem value="number" className="cursor-pointer text-xs">
                            Number
                          </SelectItem>
                          <SelectItem value="boolean" className="cursor-pointer text-xs">
                            Boolean
                          </SelectItem>
                          <SelectItem value="array" className="cursor-pointer text-xs">
                            Array
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-xs text-foreground/80">Default Value</label>
                      <Input
                        value={param.defaultValue}
                        placeholder="Optional"
                        onChange={(e) =>
                          handleUpdateParameter(param.id, "defaultValue", e.target.value)
                        }
                        className="border border-border-color-0 text-sm"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-xs text-foreground/80">Required</label>
                      <div className="flex items-center h-10">
                        <Checkbox
                          checked={param.required}
                          onCheckedChange={(checked) =>
                            handleUpdateParameter(param.id, "required", checked)
                          }
                          className="data-[state=checked]:bg-sidebar-primary data-[state=checked]:border-sidebar-primary"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Add Parameter Button */}
              <Button
                variant="outline"
                onClick={handleAddParameter}
                className="w-full border-border-color-0 gap-2 hover:bg-sidebar-primary hover:text-white transition-colors"
              >
                <Plus className="h-4 w-4" />
                Add Parameter
              </Button>
            </div>
          </motion.div>

          {apiError && (
            <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400 text-sm">
              {apiError}
            </div>
          )}

          <div className="py-6 my-1 flex justify-end gap-3">
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
                className="bg-sidebar-primary hover:bg-[#E64A19] text-white gap-3 rounded-full !px-6 !py-6 !cursor-pointer duration-300 disabled:opacity-50"
              >
                {isLoading ? (isEditMode ? "Updating..." : "Creating...") : (isEditMode ? "Update Tool" : "Create Tool")}
                {!isLoading && <LeftArrow className="ml-2 rotate-180 w-4" />}
              </Button>
            </RippleButton>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
