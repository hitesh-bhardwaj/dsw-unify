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
import { Slider } from "./ui/slider";

/**
 * Component to configure crawl strategy settings.
 *
 * @returns {React.JSX.Element} The rendered CrawlStrategy component.
 */
export default function CrawlStrategy() {
  const [crawlScope, setCrawlScope] = useState("single-page");
  const [maximumPages, setMaximumPages] = useState("100");
  const [crawlDepth, setCrawlDepth] = useState("3");
  const [respectRobots, setRespectRobots] = useState("yes");
  const [rateLimit, setRateLimit] = useState("3");

  const [isOpenScope, setIsOpenScope] = useState(false);
  const [isOpenRobots, setIsOpenRobots] = useState(false);

  const [showProgress, setShowProgress] = useState(false);
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

  // Validation functions
  const validateMaxPages = (value) => {
    const num = parseInt(value);
    return num > 0 && num <= 10000;
  };

  const validateCrawlDepth = (value) => {
    const num = parseInt(value);
    return num >= 1 && num <= 10;
  };

  const validateRateLimit = (value) => {
    const num = parseInt(value);
    return num >= 1 && num <= 100;
  };

  // Handle input changes with validation
  const handleMaximumPagesChange = (e) => {
    const value = e.target.value;
    setMaximumPages(value);
    if (value && !validateMaxPages(value)) {
      setErrors({ ...errors, maximumPages: "Enter a value between 1 and 10000" });
    } else {
      setErrors({ ...errors, maximumPages: "" });
    }
  };

  const handleCrawlDepthChange = (e) => {
    const value = e.target.value;
    setCrawlDepth(value);
    if (value && !validateCrawlDepth(value)) {
      setErrors({ ...errors, crawlDepth: "Enter a value between 1 and 10" });
    } else {
      setErrors({ ...errors, crawlDepth: "" });
    }
  };

  const handleRateLimitChange = (e) => {
    const value = e.target.value;
    setRateLimit(value);
    if (value && !validateRateLimit(value)) {
      setErrors({ ...errors, rateLimit: "Enter a value between 1 and 100" });
    } else {
      setErrors({ ...errors, rateLimit: "" });
    }
  };

  // Calculate estimated crawl time (simplified)
  const estimatedPages = Math.min(parseInt(maximumPages) || 0, 10000);
  const estimatedTimeSeconds = Math.ceil((estimatedPages / parseInt(rateLimit || 1)) * 2);
  const estimatedTimeDisplay = estimatedTimeSeconds > 60 
    ? `~${Math.ceil(estimatedTimeSeconds / 60)} minutes` 
    : `~${estimatedTimeSeconds} seconds`;

  // Get crawl scope description
  const getScopeDescription = (scope) => {
    switch (scope) {
      case "single-page":
        return "Only crawl the specified URL without following any links";
      case "domain":
        return "Crawl all pages within the same domain";
      case "subdomains":
        return "Crawl all pages including subdomains";
      default:
        return "";
    }
  };

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
        <h3 className="text-sm font-medium mb-2">About Crawl Strategy</h3>
        <p className="text-xs text-foreground/80">
          Configure how websites are crawled when using URL-based knowledge bases. These settings control crawler behavior, scope, and performance. Note: Crawl strategy only applies to website URL sources.
        </p>
      </div>

      {/* Crawl Scope */}
      <div className="flex flex-col gap-2 text-foreground/80 w-full">
        <label className="text-sm">Crawl Scope</label>
        <Select
          value={crawlScope}
          onValueChange={setCrawlScope}
          onOpenChange={(open) => setIsOpenScope(open)}
          className="w-full"
        >
          <SelectTrigger
            className={`border cursor-pointer w-full border-border-color-0 placeholder:text-foreground/60 placeholder:text-xs rounded-md !h-10 px-3 text-xs outline-none [&>svg]:transition-transform [&>svg]:duration-200 ${
              isOpenScope ? "[&>svg]:rotate-180" : ""
            }`}
          >
            <SelectValue placeholder="Select crawl scope" />
          </SelectTrigger>

          <SelectContent className="border border-border-color-0">
            <SelectItem value="single-page" className="!cursor-pointer text-xs">
              Single Page Only
            </SelectItem>
            <SelectItem value="domain" className="!cursor-pointer text-xs">
              Entire Domain
            </SelectItem>
            <SelectItem value="subdomains" className="!cursor-pointer text-xs">
              Include Subdomains
            </SelectItem>
          </SelectContent>
        </Select>
        <p className="text-xs text-foreground/80">
          {getScopeDescription(crawlScope)}
        </p>
      </div>

      {/* Maximum Pages */}
      <div className="space-y-2">
        <div className="w-full flex justify-between">
          <p className="text-sm">Maximum Pages</p>
          <span className="text-xs text-foreground/60">{maximumPages || "0"} pages</span>
        </div>
        <Input
          type="number"
          placeholder="Enter maximum pages"
          value={maximumPages}
          onChange={handleMaximumPagesChange}
          min="1"
          max="10000"
          className={errors.maximumPages ? "border-red-500" : ""}
        />
        {errors.maximumPages && (
          <p className="text-xs text-red-500">{errors.maximumPages}</p>
        )}
        <p className="text-xs text-foreground/60">
          Maximum number of pages to crawl. Set a reasonable limit to avoid long processing times.
        </p>
      </div>

      {/* Crawl Depth */}
      <div className="space-y-2">
        <div className="w-full flex justify-between">
          <p className="text-sm">Crawl Depth</p>
          <span className="text-xs text-foreground/60">{crawlDepth || "0"} levels</span>
        </div>
        <Input
          type="number"
          placeholder="3"
          value={crawlDepth}
          onChange={handleCrawlDepthChange}
          min="1"
          max="10"
          className={errors.crawlDepth ? "border-red-500" : ""}
        />
        {errors.crawlDepth && (
          <p className="text-xs text-red-500">{errors.crawlDepth}</p>
        )}
        <p className="text-xs text-foreground/60">
          How many levels deep to follow links from the starting URL. Depth 1 = only direct links.
        </p>
      </div>

      {/* Respect robots.txt */}
      <div className="flex flex-col gap-2 text-foreground/80 w-full">
        <label className="text-sm">Respect robots.txt</label>
        <Select
          value={respectRobots}
          onValueChange={setRespectRobots}
          onOpenChange={(open) => setIsOpenRobots(open)}
          className="w-full"
        >
          <SelectTrigger
            className={`border cursor-pointer w-full border-border-color-0 placeholder:text-foreground/60 placeholder:text-xs rounded-md !h-10 px-3 text-xs outline-none [&>svg]:transition-transform [&>svg]:duration-200 ${
              isOpenRobots ? "[&>svg]:rotate-180" : ""
            }`}
          >
            <SelectValue placeholder="Select option" />
          </SelectTrigger>

          <SelectContent className="border border-border-color-0">
            <SelectItem value="yes" className="!cursor-pointer text-xs">
              Yes (recommended)
            </SelectItem>
            <SelectItem value="no" className="!cursor-pointer text-xs">
              No
            </SelectItem>
          </SelectContent>
        </Select>
        <p className="text-xs text-foreground/80">
          Follow robots.txt rules defined by the website. Recommended for ethical crawling.
        </p>
      </div>

      {/* Rate Limit */}
      <div className="space-y-2">
        <div className="w-full flex justify-between">
          <p className="text-sm">Rate Limit (requests/second)</p>
          <span className="text-xs text-foreground/60">{rateLimit || "0"} req/s</span>
        </div>
        <Input
          type="number"
          placeholder="3"
          value={rateLimit}
          onChange={handleRateLimitChange}
          min="1"
          max="100"
          className={errors.rateLimit ? "border-red-500" : ""}
        />
        {errors.rateLimit && (
          <p className="text-xs text-red-500">{errors.rateLimit}</p>
        )}
        <p className="text-xs text-foreground/60">
          Number of requests per second. Lower values are more polite to the target server.
        </p>
      </div>

      {/* Estimated Impact */}
      <div className="space-y-3 pt-4">
        <h4 className="text-sm font-medium">Crawl Estimate</h4>
        <div className="border border-border-color-0 rounded-lg p-4 space-y-3 bg-background">
          <div className="flex justify-between items-center">
            <span className="text-sm text-foreground/70">Max pages to crawl:</span>
            <span className="text-xs font-medium">~{estimatedPages} pages</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-foreground/70">Estimated time:</span>
            <span className="text-xs font-medium">{estimatedTimeDisplay}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-foreground/70">Crawl depth:</span>
            <span className="text-xs font-medium">{crawlDepth} levels</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-foreground/70">Respect robots.txt:</span>
            <span className="text-xs font-medium">{respectRobots === "yes" ? "Yes" : "No"}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
