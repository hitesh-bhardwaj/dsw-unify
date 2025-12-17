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
import * as knowledgeBasesApi from "@/lib/api/knowledge-bases";

/**
 * Modal component for creating a new knowledge base.
 *
 * @param {Object} props - The component props.
 * @param {boolean} props.open - Whether the modal is open.
 * @param {function} props.onOpenChange - Callback when the modal open state changes.
 * @returns {React.JSX.Element} The rendered KnowledgeBaseModal component.
 */
export default function KnowledgeBaseModal({ open, onOpenChange }) {
  const [kbName, setKbName] = useState("");
  const [description, setDescription] = useState("");
  const [format, setFormat] = useState("");
  const [isOpenFormat, setIsOpenFormat] = useState(false);

  const [mainTab, setMainTab] = useState("data-source");

  const [sourceType, setSourceType] = useState("documents");

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState(null);

  const [websiteURL, setwebsiteURL] = useState("");
  const [maximumPages, setmaximumPages] = useState("");
  const [crawlSettings, setcrawlSettings] = useState("");
  const [isOpenCrawlSettings, setIsOpenCrawlSettings] = useState(false);
  const [databaseType, setdatabaseType] = useState("");
  const [isOpenDatabaseType, setIsOpenDatabaseType] = useState(false);
  const [connectionString, setConnectionString] = useState("");
  const [tableNames, setTableNames] = useState([]);



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

  /** =============== FORM VALIDATION & SUBMIT =============== */
  const handleSubmit = async () => {
    const errs = {
      kbName: !kbName.trim() ? "Knowledge Base Name is required" : "",
      description: !description.trim() ? "Description is required" : "",
    };
    setErrors(errs);

    if (Object.values(errs).some(Boolean)) return;

    try {
      setIsLoading(true);
      setApiError(null);

      // Collect data based on source type
      const kbData = {
        name: kbName,
        description: description,
        sourceType: sourceType,
        status: "active",
      };

      // Add source-specific data
      if (sourceType === "documents") {
        kbData.processingOptions = format || "auto";
      } else if (sourceType === "website") {
        kbData.websiteURL = websiteURL;
        kbData.crawlSettings = crawlSettings || "single";
        kbData.maximumPages = maximumPages || "100";
      } else if (sourceType === "database") {
        kbData.databaseType = databaseType;
        kbData.connectionString = connectionString;
        kbData.tableNames = tableNames;
      }

      await knowledgeBasesApi.createKnowledgeBase(kbData);

      // Close modal on success
      onOpenChange(false);

      // Refresh the page to show the new KB (or parent could handle this via callback)
      window.location.reload();
    } catch (err) {
      setApiError(err.message || "Failed to create knowledge base");
      console.error("Error creating knowledge base:", err);
    } finally {
      setIsLoading(false);
    }
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
          <div className="border border-border-color-0 rounded-lg py-13 p-10 flex flex-col items-center justify-center text-center">
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
                className={`border cursor-pointer w-full border-border-color-0 placeholder:text-foreground/60 placeholder:text-xs rounded-md !h-10 px-3 text-xs outline-none [&>svg]:transition-transform [&>svg]:duration-200 ${
                  isOpenFormat ? "[&>svg]:rotate-180" : ""
                }`}
              >
                <SelectValue placeholder="Auto-detect-format" />
              </SelectTrigger>

              <SelectContent  className="border border-border-color-0">
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
    website: (<>
    <div className="space-y-5">
<div className="flex flex-col gap-3">
            <label className="text-sm text-foreground">
              Website URL
            </label>
            <Input
              value={websiteURL}
              placeholder="e.g. htttps://example.com"
              onChange={(e) => setwebsiteURL(e.target.value)}
              className={`border placeholder:text-xs placeholder:text-foreground/80`}
            />
            
          </div>

          <div className="flex flex-col gap-2 text-foreground/80 w-full">
            <label className="text-sm">Crawl Settings</label>
            <Select
              value={crawlSettings}
              onValueChange={setcrawlSettings}
              onOpenChange={(open) => setIsOpenCrawlSettings(open)}
              className="w-full"
            >
              <SelectTrigger
                className={`border cursor-pointer w-full border-border-color-0 placeholder:text-foreground/60 placeholder:text-xs rounded-md !h-10 px-3 text-xs outline-none [&>svg]:transition-transform [&>svg]:duration-200 ${
                  isOpenCrawlSettings ? "[&>svg]:rotate-180" : ""
                }`}
              >
                <SelectValue placeholder="Single Page Only" />
              </SelectTrigger>

              <SelectContent  className="border border-border-color-0">
                <SelectItem value="auto" className="!cursor-pointer text-xs">
                 Single Page only
                </SelectItem>

                <SelectItem value="text" className="!cursor-pointer text-xs">
                 Entire Domain
                </SelectItem>

                <SelectItem value="ocr" className="!cursor-pointer text-xs">
                  Include subdomains
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-3">
            <label className="text-sm text-foreground">
             Maximum pages
            </label>
            <Input
              value={maximumPages}
              type="number"
              placeholder="100"
              onChange={(e) => setmaximumPages(e.target.value)}
              className={`border placeholder:text-xs placeholder:text-foreground/80 `}
            />
          </div>
          </div>
    </>),
    database: (<>
    <div className="space-y-5">

          <div className="flex flex-col gap-2 text-foreground/80 w-full">
            <label className="text-sm">Database Type</label>
            <Select
              value={databaseType}
              onValueChange={setdatabaseType}
              onOpenChange={(open) => setIsOpenDatabaseType(open)}
              className="w-full"
            >
              <SelectTrigger
                className={`border w-full cursor-pointer border-border-color-0 placeholder:text-foreground/60 placeholder:text-xs rounded-md !h-10 px-3 text-xs outline-none [&>svg]:transition-transform [&>svg]:duration-200 ${
                  isOpenDatabaseType ? "[&>svg]:rotate-180" : ""
                }`}
              >
                <SelectValue placeholder=" Postgre SQL" />
              </SelectTrigger>

              <SelectContent  className="border border-border-color-0">
                <SelectItem value="postgresql" className="!cursor-pointer text-xs">
                 Postgre SQL
                </SelectItem>

                <SelectItem value="mysql" className="!cursor-pointer text-xs">
                 MySQL
                </SelectItem>

                <SelectItem value="mongodb" className="!cursor-pointer text-xs">
                  MongoDB
                </SelectItem>
                 <SelectItem value="snowflake" className="!cursor-pointer text-xs">
                  Snowflake
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-3">
            <label className="text-sm text-foreground">
             Connection String
            </label>
            <Input
              value={connectionString}
              placeholder="postgresql://user:password@host:port/database"
              onChange={(e) => setConnectionString(e.target.value)}
              className={`border placeholder:text-xs placeholder:text-foreground/80 `}
            />
          </div>
          <div className="flex flex-col gap-3">
            <label className="text-sm text-foreground">Tables to Index</label>
            <Textarea
              value={tableNames}
              placeholder="Enter table names (comma-separated)"
              onChange={(e) => setTableNames(e.target.value)}
              className={`border placeholder:text-xs h-20 placeholder:text-foreground/80 `}
            />
          </div>
          </div>
    </>),
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
                errors.kbName ? "border-red-500" : "border-border-color-0"
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
                errors.description ? "border-red-500" : "border-border-color-0"
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

          {apiError && (
            <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400 text-sm">
              {apiError}
            </div>
          )}

          <div className="py-6 flex justify-end gap-3">
            <RippleButton>
              <Button
                variant="outline"
                className="border-border-color-0 text-foreground/80 px-6"
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
                {isLoading ? "Creating..." : "Create Knowledge Base"}
                {!isLoading && <LeftArrow className="ml-2 rotate-180 w-4" />}
              </Button>
            </RippleButton>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
