"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Slider } from "../ui/slider";
import { RippleButton } from "../ui/ripple-button";
import { APIIcon } from "../Icons";
import { CheckCircle} from "lucide-react";

/**
 * Component to configure storage strategy settings.
 *
 * @returns {React.JSX.Element} The rendered StorageStrategy component.
 */
export default function StorageStrategy() {
  const [chunkingStrategy, setChunkingStrategy] = useState("");
  const [embeddingModel, setEmbeddingModel] = useState("");
  const [embeddingDimensions, setEmbeddingDimensions] = useState("");
  const [storageStrategyTab, setStorageStrategyTab] = useState("prebuilt");
  
  const MIN_CHUNK_SIZE = 200;
  const MAX_CHUNK_SIZE = 2000;
  const [chunkSizee, setChunkSizee] = useState(0.7);

  const chunkSize = Math.round(
    MIN_CHUNK_SIZE + chunkSizee * (MAX_CHUNK_SIZE - MIN_CHUNK_SIZE)
  );

  const MIN_CHUNK_OVERLAP = 0;
  const MAX_CHUNK_OVERLAP = 500;
  const [chunkOverlape, setChunkOverlape] = useState(0.4);

  const chunkOverlap = Math.round(
    MIN_CHUNK_OVERLAP +
      chunkOverlape * (MAX_CHUNK_OVERLAP - MIN_CHUNK_OVERLAP)
  );

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
          Configure how your documents are processed, chunked, and embedded for optimal retrieval performance. Choose between pre-built strategies with configurable parameters or provide custom storage logic.
        </p>
      </div>

      {/* Storage Strategy Tabs */}
      <div className="space-y-4">
        <div className="space-y-2">
          <h3 className="text-sm font-medium">Storage Strategy Type</h3>
          <Tabs value={storageStrategyTab} onValueChange={setStorageStrategyTab} className="">
            <TabsList className="w-full border border-border dark:bg-card">
              <TabsTrigger className="px-4 font-normal" value="prebuilt">
                Pre-built Strategy
              </TabsTrigger>
              <TabsTrigger className="px-4 font-normal" value="custom">
                Custom Strategy
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Pre-built Strategy Tab Content */}
        <AnimatePresence mode="wait">
          {storageStrategyTab === "prebuilt" && (
            <motion.div
              key="prebuilt"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
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
                    className={`border cursor-pointer w-full border-border-color-0 placeholder:text-foreground/60 placeholder:text-xs rounded-md !h-10 px-3 text-xs outline-none [&>svg]:transition-transform [&>svg]:duration-200 ${
                      isOpenChunking ? "[&>svg]:rotate-180" : ""
                    }`}
                  >
                    <SelectValue placeholder="Recursive Character Splitting" />
                  </SelectTrigger>

                  <SelectContent className="border border-border-color-0">
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
                  <p className="text-sm">Chunk Size</p>
                  <p className="text-sm">{chunkSize} characters</p>
                </div>
                <Slider
                  value={[chunkSizee]}
                  min={0}
                  max={1}
                  step={0.01}
                  onValueChange={(v) => setChunkSizee(v[0])}
                  className="w-full"
                />
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
                <Slider
                  value={[chunkOverlape]}
                  min={0}
                  max={1}
                  step={0.01}
                  onValueChange={(v) => setChunkOverlape(v[0])}
                  className="w-full"
                />
                <p className="text-xs text-foreground/60">
                  Number of overlapping characters between consecutive chunks to maintain context continuity.
                </p>
              </div>

              {/* Embedding Configuration Section */}
              <div className="pt-4">
                <h3 className="text-xl font-medium mb-6">Embedding Configuration</h3>

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
                      className={`border cursor-pointer w-full border-border-color-0 placeholder:text-foreground/60 placeholder:text-xs rounded-md !h-10 px-3 text-xs outline-none [&>svg]:transition-transform [&>svg]:duration-200 ${
                        isOpenEmbedding ? "[&>svg]:rotate-180" : ""
                      }`}
                    >
                      <SelectValue placeholder="text-embedding-3-small (Fast, Cost-effective)" />
                    </SelectTrigger>

                    <SelectContent className="border border-border-color-0">
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
                      className={`border cursor-pointer w-full border-border-color-0 placeholder:text-foreground/60 placeholder:text-xs rounded-md !h-10 px-3 text-xs outline-none [&>svg]:transition-transform [&>svg]:duration-200 ${
                        isOpenDimensions ? "[&>svg]:rotate-180" : ""
                      }`}
                    >
                      <SelectValue placeholder="1536 dimensions (Standard)" />
                    </SelectTrigger>

                    <SelectContent className="border border-border-color-0">
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
                <div className="border border-border-color-0 rounded-lg p-4 space-y-3 bg-background">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-foreground/70">Chunks per 1000 words:</span>
                    <span className="text-xs font-medium">~{chunksPerThousandWords} chunks</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-foreground/70">Storage per chunk:</span>
                    <span className="text-xs font-medium">{storagePerChunk} KB</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-foreground/70">Retrieval latency:</span>
                    <span className="text-xs font-medium">{retrievalLatency}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Custom Strategy Tab Content */}
          {storageStrategyTab === "custom" && (
            <motion.div
              key="custom"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
               <div>
        <h3 className="text-sm font-medium mb-2">Custom Storage Strategy</h3>
        <p className="text-xs text-foreground/80">
         Provide your custom chunking and embedding logic. Your code will be executed in a sandboxed environment. Required environment variables can be configured below.
        </p>
      </div>
              <div className="flex flex-col gap-3">
                <label className="text-sm text-foreground">
                  Custom Storage Code
                </label>
                <Textarea
                  placeholder="Enter your custom strategy code here..."
                  className={`border placeholder:text-xs placeholder:text-foreground/80 h-30`}
                />
              </div>

               <div className="flex flex-col gap-3">
                <label className="text-sm text-foreground">
                  Environment Variables (Optional)
                </label>
                <Textarea
                  placeholder="KEY1=value1  KEY2=value2..."
                  className={`border placeholder:text-xs placeholder:text-foreground/80 h-30`}
                />
              </div>
              <RippleButton>
                <Button
                  variant="outline"
                  className="gap-2 text-foreground border border-primary"
                >
                  <div className="!w-4">
                    <CheckCircle/>
                  </div>
                 Validate code
                </Button>
              </RippleButton>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
