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
import { Button } from "@/components/ui/button";
import { RippleButton } from "@/components/ui/ripple-button";
import StorageStrategy from "./StorageStrategy";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import AnimatedTabsSection from "@/components/common/TabsPane";
import EmptyCard from "@/components/common/EmptyCard";
import { LeftArrow, TextFile } from "@/components/Icons";

export default function KnowledgeBaseModal({ open, onOpenChange }) {
  const [kbName, setKbName] = useState("");
  const [description, setDescription] = useState("");
  const [format, setFormat] = useState("");
  const [isOpenFormat, setIsOpenFormat] = useState(false);

  const [mainTab, setMainTab] = useState("data-source");

  const [sourceType, setSourceType] = useState("documents");

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!open) {
      setKbName("");
      setDescription("");
      setMainTab("data-source");
      setSourceType("documents");
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
      kbName: !kbName.trim() ? "Knowledge Base Name is required" : "",
      description: !description.trim() ? "Description is required" : "",
    };
    setErrors(errs);

    if (Object.values(errs).some(Boolean)) return;

    onOpenChange(false);
  };

  /** --- SOURCE TYPE Inner Tab Content --- */
  const sourceTypeContent = {
    documents: (
      <>
        <div className="mb-1">
          <p className="text-sm">Upload Documents</p>
        </div>
        <div className="space-y-6 py-1">
          {/* Upload Drop Box */}
          <div className="border border-foreground/20 rounded-lg py-13 p-10 flex flex-col items-center justify-center text-center">
            <TextFile className="w-5 h-5" />
            <p className="text-sm font-semibold mt-4 text-foreground/80">
              Drag and drop files here, or click to browse
            </p>
            <p className="text-xs text-foreground/60">
              Supports PDF, DOCX, TXT, MD and more
            </p>
          </div>

          <div className="flex flex-col gap-2 text-foreground/80 w-full">
            <label className="text-sm">Processing Options</label>
            <Select
              value={format}
              onValueChange={setFormat}
              onOpenChange={(open) => setIsOpenFormat(open)}
              className="w-full"
            >
              <SelectTrigger
                className={`border w-full border-foreground/20 placeholder:text-foreground/60 placeholder:text-xs rounded-md !h-10 px-3 text-xs outline-none [&>svg]:transition-transform [&>svg]:duration-200 ${
                  isOpenFormat ? "[&>svg]:rotate-180" : ""
                }`}
              >
                <SelectValue placeholder="Auto-detect-format" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="auto" className="!cursor-pointer text-xs">
                  Auto-detect-format
                </SelectItem>

                <SelectItem value="text" className="!cursor-pointer text-xs">
                  Text only
                </SelectItem>

                <SelectItem value="ocr" className="!cursor-pointer text-xs">
                  OCR PDF
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </>
    ),
    website: <EmptyCard>Website source coming soon</EmptyCard>,
    database: <EmptyCard>Database source coming soon</EmptyCard>,
  };

  const items = [
    {
      id: "tab-data-source",
      value: "data-source",
      label: "Data Source",
      render: () => (
        <motion.div
          className="flex flex-col space-y-4"
          variants={slide}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {/* INPUT FIELDS */}
          <div className="flex flex-col gap-3">
            <label className="text-sm text-foreground">
              Knowledge Base Name
            </label>
            <Input
              value={kbName}
              placeholder="e.g. Company Documentation"
              onChange={(e) => setKbName(e.target.value)}
              className={`border placeholder:text-xs placeholder:text-foreground/80 ${
                errors.kbName ? "border-red-500" : "border-foreground/20"
              }`}
            />
            {errors.kbName && (
              <p className="text-xs text-red-500">{errors.kbName}</p>
            )}
          </div>

          <div className="flex flex-col gap-3">
            <label className="text-sm text-foreground">Description</label>
            <Textarea
              value={description}
              placeholder="Describe what this knowledge base contains..."
              onChange={(e) => setDescription(e.target.value)}
              className={`border placeholder:text-xs h-28 placeholder:text-foreground/80 ${
                errors.description ? "border-red-500" : "border-foreground/20"
              }`}
            />
            {errors.description && (
              <p className="text-xs text-red-500">{errors.description}</p>
            )}
          </div>

          {/* SOURCE TYPE TABS */}
          <div>
            <h3 className="text-xl font-medium mb-3 z-5">Source Type</h3>

            <AnimatedTabsSection
              items={[
                {
                  id: "docs",
                  value: "documents",
                  label: "Documents",
                  render: () => (
                    <div className="pt-2">{sourceTypeContent["documents"]}</div>
                  ),
                },
                {
                  id: "web",
                  value: "website",
                  label: "Website",
                  render: () => (
                    <div className="pt-4">{sourceTypeContent["website"]}</div>
                  ),
                },
                {
                  id: "db",
                  value: "database",
                  label: "Database",
                  render: () => (
                    <div className="pt-4">{sourceTypeContent["database"]}</div>
                  ),
                },
              ]}
              onValueChange={setSourceType}
              defaultValue={sourceType}
            />
          </div>
        </motion.div>
      ),
    },

    {
      id: "tab-storage-strategy",
      value: "storage",
      label: "Storage Strategy",
      render: () => (
        <StorageStrategy />
      ),
    },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[50%] h-[90%] flex flex-col left-1/2 -translate-x-1/2 top-1/2 py-6">
        <DialogHeader className="justify-center pb-4">
          <DialogTitle className="text-2xl font-medium">
            Add Knowledge Base
          </DialogTitle>
          <p className="text-xs text-foreground/80">
            Create a new knowledge base from documents, websites, or databases
          </p>
        </DialogHeader>

        <div className="w-full h-full overflow-y-auto pr-2">
          <AnimatedTabsSection
            items={items}
            onValueChange={setMainTab}
            defaultValue={mainTab}
          />

          <div className="py-6 flex justify-end gap-3">
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
                className="bg-sidebar-primary hover:bg-[#E64A19] text-white gap-3 rounded-full !px-6 !py-6 !cursor-pointer duration-300"
              >
                Create Knowledge Base
                <LeftArrow className="ml-2 rotate-180 w-4" />
              </Button>
            </RippleButton>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
