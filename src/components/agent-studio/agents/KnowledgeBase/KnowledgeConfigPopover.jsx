"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import { useState } from "react";

export default function KnowledgeBaseConfigPopover({
  open,
  onOpenChange,
  item,
  saveConfig,
}) {
  if (!item) return null;

  // FORM STATES
  const [retrievalMechanism, setRetrievalMechanism] = useState("semantic-search");
  const [topK, setTopK] = useState("5");
  const [similarityThreshold, setSimilarityThreshold] = useState([0.7]); // slider array
  const [contextWindow, setContextWindow] = useState("medium");
  const [includeMetadata, setIncludeMetadata] = useState(true);
  const [enableCaching, setEnableCaching] = useState(true);

  const handleSave = () => {
    saveConfig(item.id, {
      retrievalMechanism,
      topK,
      similarityThreshold: similarityThreshold[0],
      contextWindow,
      includeMetadata,
      enableCaching,
    });

    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl bg-background p-6 rounded-xl border border-border-color-0">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Configure Retrieval Strategy
            <p className="text-sm font-normal opacity-60 mt-1">
              {item.name.toLowerCase()}
            </p>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-2">
          {/* Retrieval Mechanism */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Retrieval Mechanism</label>

            <Select
              value={retrievalMechanism}
              onValueChange={setRetrievalMechanism}
            >
              <SelectTrigger className="w-60 border border-border-color-0 cursor-pointer">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="semantic-search">Semantic Search</SelectItem>
                <SelectItem value="keyword-search">Keyword Search</SelectItem>
              </SelectContent>
            </Select>

            <p className="text-xs opacity-60">
              Uses vector embeddings for semantic similarity
            </p>
          </div>

          {/* TOP K RESULTS */}
          <div className="flex flex-col">
            <label className="text-sm font-medium">Top K Results</label>
            <Input
              type="number"
              value={topK}
              onChange={(e) => setTopK(e.target.value)}
              className="mt-1 w-full"
            />
            <p className="text-xs opacity-60 mt-1">
              Number of documents to retrieve
            </p>
          </div>

          {/* Similarity Threshold */}
          <div className="mt-4">
            <label className="text-sm font-medium flex justify-between">
              <span>Similarity Threshold</span>
              <span className="font-semibold">{similarityThreshold[0]}</span>
            </label>

            <Slider
              value={similarityThreshold}
              onValueChange={setSimilarityThreshold}
              max={1}
              step={0.01}
              className="mt-2"
            />

            <p className="text-xs opacity-60 mt-1">
              Minimum similarity score for results (0–1)
            </p>
          </div>

          <div className="w-full h-[1px] bg-border-color-0 my-3" />

          {/* Advanced Options */}
          <div className="">
            <h3 className="font-medium text-sm mb-3">Advanced Options</h3>

            {/* Context Window */}
            <div className="mb-4">
              <label className="text-sm font-medium">Context Window</label>

              <Select
                value={contextWindow}
                onValueChange={setContextWindow}
              >
                <SelectTrigger className="mt-1 w-60 border border-border-color-0 cursor-pointer">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small">Small (512 tokens)</SelectItem>
                  <SelectItem value="medium">Medium (1024 tokens)</SelectItem>
                  <SelectItem value="large">Large (2048 tokens)</SelectItem>
                </SelectContent>
              </Select>

              <p className="text-xs opacity-60 mt-1">
                Amount of context to include per result
              </p>
            </div>

            {/* Include Metadata */}
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="text-sm font-medium">Include Metadata</p>
                <p className="text-xs opacity-60">
                  Include document metadata in results
                </p>
              </div>

              <Switch
                checked={includeMetadata}
                onCheckedChange={setIncludeMetadata}
              />
            </div>

            {/* Enable Caching */}
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="text-sm font-medium">Enable Caching</p>
                <p className="text-xs opacity-60">
                  Cache frequent queries for faster retrieval
                </p>
              </div>

              <Switch
                checked={enableCaching}
                onCheckedChange={setEnableCaching}
                className='!cursor-pointer'
              />
            </div>
          </div>
                    

        </div>

        <div className="w-full h-[1px] bg-border-color-0 my-3" />

        {/* FOOTER BUTTONS */}
        <div className="flex justify-end gap-4 mt-4">
          <Button
            variant="outline"
            className="px-6 !h-10 border border-border-color-0"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>

          <Button
            className="px-6 py-2 !h-10 bg-primary text-white"
            onClick={handleSave}
          >
            Save Configuration
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
