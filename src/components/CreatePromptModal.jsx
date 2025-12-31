"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { LeftArrow, PlusIcon, SparklesIcon } from "./Icons";
import { Button } from "./ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "./ui/select";
import { RippleButton } from "./ui/ripple-button";
import * as promptsApi from "@/lib/api/prompts";

const CATEGORY_OPTIONS = [
  "General",
  "Marketing",
  "Sales",
  "Support",
  "Engineering",
  "Product",
  "HR",
];

/**
 * Modal component for creating a new prompt.
 *
 * @param {Object} props - The component props.
 * @param {boolean} props.open - Whether the modal is open.
 * @param {function} props.onOpenChange - Callback function when the open state changes.
 * @returns {React.JSX.Element} The rendered CreatePromptModal component.
 */
const CreatePromptModal = ({ open, onOpenChange }) => {
  const [promptName, setPromptName] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [tagsList, setTagsList] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [enhancePrompt, setEnhancePrompt] = useState("");

  const handleAddTag = () => {
    if (tags.trim()) {
      setTagsList([...tagsList, tags.trim()]);
      setTags("");
    }
  };

  const handleRemoveTag = (indexToRemove) => {
    setTagsList(tagsList.filter((_, index) => index !== indexToRemove));
  };

  const handleCreate = async () => {
    if (!promptName.trim()) {
      setError("Prompt name is required");
      return;
    }

    if (!content.trim()) {
      setError("Prompt content is required");
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      const promptData = {
        name: promptName,
        description: description,
        content: content,
        category: category || "General",
        tags: tagsList,
        type: "system",
      };

      await promptsApi.createPrompt(promptData);

      // Close modal and refresh page on success
      onOpenChange?.(false);
      window.location.reload();
    } catch (err) {
      setError(err.message || "Failed to create prompt");
      console.error("Error creating prompt:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={"w-[45%] left-1/2 overflow-hidden  top-1/2 h-[80%]"}>
      <div className="overflow-hidden overflow-y-auto"> 

     
        <div className="py-4 px-2  w-full space-y-5  pr-4 ">
          <DialogHeader>
            <DialogTitle className="text-2xl font-medium mb-6">
              Create New Prompt
            </DialogTitle>
          </DialogHeader>

          <div className="flex w-full h-fit gap-2">
            <div className="flex flex-col gap-2 w-[60%]">
              <label className="text-sm text-foreground">Prompt Name*</label>
              <Input
                value={promptName}
                onChange={(e) => setPromptName(e.target.value)}
                className=" placeholder:text-foreground/40"
                placeholder="Enter Prompt Name"
              />
            </div>

            <div className="flex flex-col gap-2 w-[40%]">
              <label className="text-sm text-foreground">Category</label>
              <Select
                value={category}
                onValueChange={setCategory}
                onOpenChange={(open) => setIsOpen(open)}
                className="w-full "
              >
                <SelectTrigger className={` placeholder:text-foreground/40 cursor-pointer border border-border-color-0 !h-10.5 w-full [&>svg]:transition-transform [&>svg]:duration-200 ${isOpen ? '[&>svg]:rotate-180' : ''}`}>
                  <SelectValue
                    placeholder="Choose category"
                    className={"placeholder:text-sm !cursor-pointer "}
                  />
                </SelectTrigger>
                <SelectContent className="border border-border-color-0">
                  {CATEGORY_OPTIONS.map((c) => (
                    <SelectItem key={c} value={c} className={"!cursor-pointer"}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex w-full h-fit gap-2">
            <div className="flex flex-col gap-2 w-full">
              <label className="text-sm text-foreground">Description</label>
              <Input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className=" placeholder:text-foreground/40"
                placeholder="Brief Description"
              />
            </div>
          </div>

          <div className="flex w-full h-fit gap-2">
            <div className="flex flex-col gap-2 w-full">
              <label className="text-sm text-foreground">Prompt Content*</label>
              <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className=" placeholder:text-foreground/40 placeholder:text-xs h-36"
                placeholder="Enter Prompt Content"
              />
            </div>
          </div>

          <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground dark:text-foreground">
                      Generate or Enhance Prompt
                    </label>
                    <div className="flex gap-2 mt-2">
                      <Input
                        value={enhancePrompt}
                        onChange={(e) => setEnhancePrompt(e.target.value)}
                        placeholder="Describe how you want to modify the prompt..."
                        className="h-12 flex-1 !text-xs p-4 border-border-color-0 shadow-none text-foreground placeholder:text-foreground/80"
                      />
                      <RippleButton className={"rounded-lg"}>
                        <Button className="bg-primary hover:bg-[#E64A19] text-white gap-2  cursor-pointer w-30 rounded-lg">
                          <SparklesIcon />
                          Generate
                        </Button>
                      </RippleButton>
                    </div>
                    <p className="text-xs text-foreground dark:text-foreground">
                      Use natural language to create a new prompt or enhance the existing
                      one
                    </p>
                  </div>

          {error && (
            <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400 text-sm">
              {error}
            </div>
          )}

          <div className="flex w-full h-fit gap-2 items-end ">
            <div className="flex flex-col gap-2 w-[85%]">
              <label className="text-sm text-foreground">Tags</label>
              <Input
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddTag();
                  }
                }}
                className=" placeholder:text-foreground/40"
                placeholder="Add a tag"
              />
            </div>
            <div className="w-[15%] h-full">
            <RippleButton className={"w-full rounded-lg "} circColor={"dark:bg-foreground/40 bg-white  "}>
            <div 
              onClick={handleAddTag}
              className="flex gap-2 w-full py-0 placeholder:text-foreground/40 h-10.5 rounded-lg bg-foreground text-background justify-start pl-2.5 items-center cursor-pointer dark:bg-transparent dark:text-foreground dark:border-primary dark:border mt-1">
              <div className="w-3.5 h-auto">
                <PlusIcon className="w-full h-full text-background dark:text-foreground" />
              </div>
              <p>Add</p>
            </div>

            </RippleButton>
            </div>
          </div>

          {tagsList.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tagsList.map((tag, index) => (
                <div
                  key={index}
                  className="flex bg-white dark:bg-background items-center gap-2 px-2 py-0.5 border border-border-color-0 rounded-full text-sm"
                >
                  <span>{tag}</span>
                  <button
                    onClick={() => handleRemoveTag(index)}
                    className="text-foreground/60 cursor-pointer hover:text-foreground"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="w-full flex justify-end gap-2">
            <RippleButton>
              <Button
                variant="outline"
                className="gap-2 border border-border-color-2 text-foreground hover:bg-gray-50 w-fit px-7"
                onClick={() => onOpenChange?.(false)}
                disabled={isLoading}
              >
                Cancel
              </Button>
            </RippleButton>
            <RippleButton>
              <Button
                onClick={handleCreate}
                disabled={isLoading}
                className="bg-sidebar-primary hover:bg-[#E64A19] text-white gap-3 rounded-full !px-6 !py-6 !cursor-pointer duration-300 disabled:opacity-50"
              >
                {isLoading ? "Creating..." : "Create Prompt"}
                {!isLoading && <LeftArrow className='rotate-180' />}
              </Button>
            </RippleButton>
          </div>
        </div>
         </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePromptModal;