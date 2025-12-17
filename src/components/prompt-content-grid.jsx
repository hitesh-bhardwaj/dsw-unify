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
const PromptContentGrid = ({ value, isEditing, onChange }) => {
  return (
     <>
       <div className="space-y-6 border rounded-3xl p-6 border-border-color-0 h-100 pb-8 dark:bg-card">
      <h3 className="text-lg font-medium mb-2">Prompt Content</h3>

      <div className="h-[200px] w-full">
        {isEditing ? (
          <Textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="h-full w-full text-gray-600 dark:text-foreground shadow-none resize-none border-none !text-sm p-4 !bg-background "
          />
        ) : (
          <div className="h-full w-full p-4 overflow-y-auto">
            <p className="text-sm text-gray-600 dark:text-foreground whitespace-pre-wrap">
              {value}
            </p>
          </div>
        )}
      </div>
      </div>
    
    </>
  );
};


export default PromptContentGrid;
