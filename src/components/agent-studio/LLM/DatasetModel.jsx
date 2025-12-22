"use client";

import { useState } from "react";
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
import AnimatedTabsSection from "@/components/common/TabsPane";
import { Upload } from "lucide-react";
import { LeftArrow } from "@/components/Icons";

export default function AddDatasetModal({ open, onOpenChange }) {
  const [activeTab, setActiveTab] = useState("upload");

  // Upload
  const [file, setFile] = useState(null);

  // Manual
  const [datasetName, setDatasetName] = useState("");
  const [description, setDescription] = useState("");
  const [datasetJson, setDatasetJson] = useState("");

  const slide = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const handleSubmit = () => {
    if (activeTab === "upload") {
      console.log("Uploading file:", file);
    } else {
      console.log({
        datasetName,
        description,
        datasetJson,
      });
    }
    onOpenChange(false);
  };

  const items = [
    {
      id: "upload-tab",
      value: "upload",
      label: "Upload File",
      render: () => (
        <motion.div
          variants={slide}
          initial="initial"
          animate="animate"
          exit="exit"
          className="flex flex-col gap-3"
        >
          <label className="text-sm font-medium">Dataset File (JSON)</label>

          <label className="flex flex-col items-center justify-center border-2 border-dashed border-border-color-0 rounded-xl h-56 cursor-pointer hover:bg-muted/40 transition">
            <Upload className="h-8 w-8 text-foreground/60 mb-2" />
            <p className="text-sm font-medium">
              Click to upload or drag and drop
            </p>
            <p className="text-xs text-foreground/60">JSON file (max 10MB)</p>
            <input
              type="file"
              accept=".json"
              hidden
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
          </label>

          {file && (
            <p className="text-xs text-foreground/70">
              Selected file: {file.name}
            </p>
          )}
        </motion.div>
      ),
    },

    {
      id: "manual-tab",
      value: "manual",
      label: "Manual Entry",
      render: () => (
        <motion.div
          variants={slide}
          initial="initial"
          animate="animate"
          exit="exit"
          className="space-y-6"
        >
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">
              Dataset Name 
            </label>
            <Input
              value={datasetName}
              onChange={(e) => setDatasetName(e.target.value)}
              placeholder="e.g., customer_support"
              className="border-border-color-0"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">
              Description 
            </label>
            <Input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g., Training data for customer service interactions"
              className="border-border-color-0"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">
              Dataset Content (JSON) 
            </label>
            <Textarea
              value={datasetJson}
              onChange={(e) => setDatasetJson(e.target.value)}
              placeholder="Paste your JSON dataset here..."
              className="h-20 font-mono text-sm border-border-color-0"
            />
            <p className="text-xs text-foreground/60">
              Include dataset records in JSON format.
            </p>
          </div>
        </motion.div>
      ),
    },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[70%] h-[85%] overflow-y-auto overflow-hidden py-8 px-8">
        <DialogHeader className="pb-6">
          <DialogTitle className="text-2xl font-medium">
            Add Dataset
          </DialogTitle>
          <p className="text-sm text-foreground/70">
            Upload a dataset file or create one manually
          </p>
        </DialogHeader>

        <AnimatedTabsSection
          items={items}
          defaultValue={activeTab}
          onValueChange={setActiveTab}
        />

        <div className="w-full flex justify-end gap-2">
          <RippleButton>
            <Button
                onClick={() => onOpenChange(false)}
              variant="outline"
              className="gap-2 border border-border-color-2 text-foreground hover:bg-gray-50 w-fit px-7"
            >
              Close
            </Button>
          </RippleButton>

          <RippleButton>
            <Button onClick={handleSubmit} className="bg-sidebar-primary hover:bg-[#E64A19] text-white gap-3 rounded-full !px-6 !py-6 !cursor-pointer duration-300 disabled:opacity-50">
              {activeTab === "upload" ? "Upload" : "Create Dataset"}
              {activeTab === "upload" ? (
                <Upload />
              ) : (
                <LeftArrow className="rotate-180" />
              )}
            </Button>
          </RippleButton>
        </div>
      </DialogContent>
    </Dialog>
  );
}
