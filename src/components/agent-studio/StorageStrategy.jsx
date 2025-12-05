"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

/**
 * Component to configure storage strategy settings.
 *
 * @returns {React.JSX.Element} The rendered StorageStrategy component.
 */
export default function StorageStrategy() {
  const [chunkingStrategy, setChunkingStrategy] = useState("");
  const [embeddingModel, setEmbeddingModel] = useState("");
  const [embeddingDimensions, setEmbeddingDimensions] = useState("");
  const [chunkSize, setChunkSize] = useState(1000);
  const [chunkOverlap, setChunkOverlap] = useState(200);
  const [showProgress, setShowProgress] = useState(false);

  const [isOpenChunking, setIsOpenChunking] = useState(false);
  const [isOpenEmbedding, setIsOpenEmbedding] = useState(false);
  const [isOpenDimensions, setIsOpenDimensions] = useState(false);

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const timer = setTimeout(() => setShowProgress(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const slide = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  };

  // Calculate percentages for progress bars
  const chunkSizePercentage = ((chunkSize - 200) / 1800) * 100;
  const chunkOverlapPercentage = (chunkOverlap / 500) * 100;

  // Calculate estimated metrics
  const chunksPerThousandWords = Math.round((1000 / chunkSize) * 4);
  const storagePerChunk = embeddingDimensions 
    ? (parseInt(embeddingDimensions) * 4 / 1024).toFixed(2)
    : "0.00";
  const retrievalLatency = embeddingModel === "text-embedding-3-small" 
    ? "~80ms" 
    : embeddingModel === "text-embedding-3-large"
    ? "~120ms"
    : "~100ms";

  return (
    <motion.div
      className="flex flex-col space-y-6"
      variants={slide}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {/* About Section */}
      <div>
        <h3 className="text-sm font-medium mb-2">About Storage Strategy</h3>
        <p className="text-xs text-foreground/80">
          Configure how your documents are processed, chunked, and embedded for optimal retrieval performance.
        </p>
      </div>

      {/* Chunking Strategy */}
      <div className="flex flex-col gap-2 text-foreground/80 w-full">
        <label className="text-sm">Chunking Strategy</label>
        <Select
          value={chunkingStrategy}
          onValueChange={setChunkingStrategy}
          onOpenChange={(open) => setIsOpenChunking(open)}
          className="w-full"
        >
          <SelectTrigger
            className={`border w-full border-foreground/20 placeholder:text-foreground/60 placeholder:text-xs rounded-md !h-10 px-3 text-xs outline-none [&>svg]:transition-transform [&>svg]:duration-200 ${
              isOpenChunking ? "[&>svg]:rotate-180" : ""
            }`}
          >
            <SelectValue placeholder="Recursive Character Splitting" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="recursive" className="!cursor-pointer text-xs">
              Recursive Character Splitting
            </SelectItem>
            <SelectItem value="token" className="!cursor-pointer text-xs">
              Token-based Splitting
            </SelectItem>
            <SelectItem value="semantic" className="!cursor-pointer text-xs">
              Semantic Splitting
            </SelectItem>
          </SelectContent>
        </Select>
        <p className="text-xs text-foreground/80">
          Recursively splits text using multiple separators (paragraphs, sentences, words)
        </p>
      </div>

      {/* Chunk Size */}
      <div className="space-y-2">
        <div className="w-full flex justify-between">
          <p className="text-sm font-medium">Chunk Size</p>
          <p className="text-sm font-medium">{chunkSize} characters</p>
        </div>
        <div className="w-full h-1.5 bg-sidebar-accent rounded-full flex items-center relative">
          <input
            type="range"
            min="200"
            max="2000"
            step="100"
            value={chunkSize}
            onChange={(e) => setChunkSize(Number(e.target.value))}
            className="absolute w-full h-full opacity-0 cursor-pointer z-10"
          />
          <div
            className={`h-full bg-primary rounded-full relative duration-700 ease-in-out ${
              showProgress ? `w-[${chunkSizePercentage}%]` : "w-0"
            } delay-300`}
            style={{ width: showProgress ? `${chunkSizePercentage}%` : "0%" }}
          />
          <div className="w-5 h-5 rounded-full bg-background border-3 border-foreground -ml-1 relative z-[2]" />
        </div>
        <p className="text-xs text-foreground/60">
          Maximum number of characters per chunk. Smaller chunks provide more precise retrieval, larger chunks preserve more context.
        </p>
      </div>

      {/* Chunk Overlap */}
      <div className="space-y-2">
        <div className="w-full flex justify-between">
          <p className="text-sm">Chunk Overlap</p>
          <p className="text-sm">{chunkOverlap} characters</p>
        </div>
        <div className="w-full h-1.5 bg-sidebar-accent rounded-full flex items-center relative">
          <input
            type="range"
            min="0"
            max="500"
            step="50"
            value={chunkOverlap}
            onChange={(e) => setChunkOverlap(Number(e.target.value))}
            className="absolute w-full h-full opacity-0 cursor-pointer z-10"
          />
          <div
            className={`h-full bg-primary rounded-full relative duration-700 ease-in-out ${
              showProgress ? `w-[${chunkOverlapPercentage}%]` : "w-0"
            } delay-300`}
            style={{ width: showProgress ? `${chunkOverlapPercentage}%` : "0%" }}
          />
          <div className="w-5 h-5 rounded-full bg-background border-3 border-foreground -ml-1 relative z-[2]" />
        </div>
        <p className="text-xs text-foreground/60">
          Number of overlapping characters between consecutive chunks to maintain context continuity.
        </p>
      </div>

      {/* Embedding Configuration Section */}
      <div className="pt-4">
        <h3 className="text-xl font-medium mb-3">Embedding Configuration</h3>

        {/* Embedding Model */}
        <div className="flex flex-col gap-2 text-foreground/80 w-full mb-6">
          <label className="text-sm">Embedding Model</label>
          <Select
            value={embeddingModel}
            onValueChange={setEmbeddingModel}
            onOpenChange={(open) => setIsOpenEmbedding(open)}
            className="w-full"
          >
            <SelectTrigger
              className={`border w-full border-foreground/20 placeholder:text-foreground/60 placeholder:text-xs rounded-md !h-10 px-3 text-xs outline-none [&>svg]:transition-transform [&>svg]:duration-200 ${
                isOpenEmbedding ? "[&>svg]:rotate-180" : ""
              }`}
            >
              <SelectValue placeholder="text-embedding-3-small (Fast, Cost-effective)" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="text-embedding-3-small" className="!cursor-pointer text-xs">
                text-embedding-3-small (Fast, Cost-effective)
              </SelectItem>
              <SelectItem value="text-embedding-3-large" className="!cursor-pointer text-xs">
                text-embedding-3-large (High Accuracy)
              </SelectItem>
              <SelectItem value="text-embedding-ada-002" className="!cursor-pointer text-xs">
                text-embedding-ada-002 (Legacy)
              </SelectItem>
            </SelectContent>
          </Select>
          <p className="text-xs text-foreground/80">
            Optimized for speed and cost. Best for most use cases with good accuracy.
          </p>
        </div>

        {/* Embedding Dimensions */}
        <div className="flex flex-col gap-2 text-foreground/80 w-full">
          <label className="text-sm">Embedding Dimensions</label>
          <Select
            value={embeddingDimensions}
            onValueChange={setEmbeddingDimensions}
            onOpenChange={(open) => setIsOpenDimensions(open)}
            className="w-full"
          >
            <SelectTrigger
              className={`border w-full border-foreground/20 placeholder:text-foreground/60 placeholder:text-xs rounded-md !h-10 px-3 text-xs outline-none [&>svg]:transition-transform [&>svg]:duration-200 ${
                isOpenDimensions ? "[&>svg]:rotate-180" : ""
              }`}
            >
              <SelectValue placeholder="1536 dimensions (Standard)" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="512" className="!cursor-pointer text-xs">
                512 dimensions (Compact)
              </SelectItem>
              <SelectItem value="1536" className="!cursor-pointer text-xs">
                1536 dimensions (Standard)
              </SelectItem>
              <SelectItem value="3072" className="!cursor-pointer text-xs">
                3072 dimensions (High Precision)
              </SelectItem>
            </SelectContent>
          </Select>
          <p className="text-xs text-foreground/80">
            Higher dimensions provide better accuracy but increase storage and computation costs.
          </p>
        </div>
      </div>

      {/* Estimated Impact */}
      <div className="space-y-3 pt-4">
        <h4 className="text-sm font-medium">Estimated Impact</h4>
        <div className="border border-foreground/20 rounded-lg p-4 space-y-3 bg-background">
          <div className="flex justify-between items-center">
            <span className="text-xs text-foreground/70">Chunks per 1000 words:</span>
            <span className="text-xs font-medium">~{chunksPerThousandWords} chunks</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-foreground/70">Storage per chunk:</span>
            <span className="text-xs font-medium">{storagePerChunk} KB</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-foreground/70">Retrieval latency:</span>
            <span className="text-xs font-medium">{retrievalLatency}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
