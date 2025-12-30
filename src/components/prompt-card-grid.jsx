import React, { useState } from "react";
import { RippleButton } from "./ui/ripple-button";
import { SparklesIcon } from "./Icons";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import SearchBar from "./search-bar";
import { Button } from "./ui/button";

/**
 * Component to display a grid of prompt cards with search and generation functionality.
 *
 * @returns {React.JSX.Element} The rendered PromptCardGrid component.
 */
const PromptCardGrid = () => {
  const [systemPrompt, setSystemPrompt] = useState("");
  const [query, setQuery] = useState("");
  const [enhancePrompt, setEnhancePrompt] = useState("");
  return (
    <>
      <div className="space-y-6 border bg-white rounded-3xl p-6 border-border-color-0 h-full pb-8 dark:bg-card ">
        <h3 className="text-xl font-medium mb-2">System Prompt</h3>
        <p className="text-sm text-gray-600 mb-4 dark:text-foreground">
          Define how your agent should behave and respond
        </p>

        <div className="space-y-2 mb-4 mt-8">
          <p className="text-sm text-foreground">Search existing prompts</p>
          <SearchBar
            placeholder="Search by name, tags or content..."
            value={query}
            className="bg-white dark:bg-card"
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="space-y-2 mb-4">
          <Textarea
            value={systemPrompt}
            onChange={(e) => setSystemPrompt(e.target.value)}
            placeholder="You are a helpful AI assistant that..."
            className="min-h-[200px]  resize-none border-border-color-0 !text-xs p-4 bg-white text-foreground placeholder:text-foreground/80 dark:bg-card"
          />
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
              className="h-12 flex-1 bg-white dark:bg-background !text-xs p-4 border-border-color-0 shadow-none text-foreground placeholder:text-foreground/80"
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
      </div>
    </>
  );
};

export default PromptCardGrid;
