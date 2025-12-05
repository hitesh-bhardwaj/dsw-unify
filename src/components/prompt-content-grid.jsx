import React, { useState } from "react";
import { RippleButton } from "./ui/ripple-button";
import { SparklesIcon } from "./Icons";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import SearchBar from "./search-bar";
import { Button } from "./ui/button";

/**
 * Component to display the prompt content grid.
 * This component shows a static prompt content example.
 *
 * @returns {React.JSX.Element} The rendered PromptContentGrid component.
 */
const PromptContentGrid = () => {
  const [systemPrompt, setSystemPrompt] = useState("");
  const [query, setQuery] = useState("");
  const [enhancePrompt, setEnhancePrompt] = useState("");
  return (
    <>
      <div className="space-y-6 border rounded-3xl p-6 border-border-color-1 h-100 pb-8 ">
        <h3 className="text-lg font-medium mb-2">Prompt Content</h3>
        <p className="text-sm text-gray-600 mb-4 dark:text-foreground">
          You are a helpful and empathetic customer service representative...
        </p>
      </div>
    </>
  );
};

export default PromptContentGrid;
