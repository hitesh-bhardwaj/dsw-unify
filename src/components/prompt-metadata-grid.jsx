import React, { useState } from "react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";
import { cn } from "@/lib/utils";

/**
 * Component to display and edit prompt metadata such as name, category, description, and tags.
 *
 * @returns {React.JSX.Element} The rendered PromptMetadataGrid component.
 */
const PromptMetadataGrid = () => {
  const [systemPrompt, setSystemPrompt] = useState("");
  const [namePrompt, setNamePrompt] = useState("");
  const [categoryPrompt, setCategoryPrompt] = useState("");


  return (
    <>
      <div className="space-y-6 border rounded-3xl p-6 border-border-color-0 h-full pb-8 ">
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground dark:text-foreground">
            Name
          </label>
          <div className="flex gap-2 mt-2">
            <Input
              value={namePrompt}
              onChange={(e) => setNamePrompt(e.target.value)}
              placeholder="Customer Support Assistant"
              className="h-12 flex-1 !text-xs p-4 border-border-color-0 shadow-none text-foreground placeholder:text-foreground/80"
            />
          </div>
        </div>
         <div className="space-y-2">
          <label className="text-sm font-medium text-foreground dark:text-foreground">
           Category
          </label>
          <div className="flex gap-2 mt-2">
            <Input
              value={categoryPrompt}
              onChange={(e) => setCategoryPrompt(e.target.value)}
              placeholder="Customer Service"
              className="h-12 flex-1 !text-xs p-4 border-border-color-0 shadow-none text-foreground placeholder:text-foreground/80"
            />
          </div>
        </div>
        <div className="space-y-2 mb-4">
            <label className="text-sm font-medium text-foreground dark:text-foreground">
           Description
          </label>
          <Textarea
            value={systemPrompt}
            onChange={(e) => setSystemPrompt(e.target.value)}
            placeholder="Helpful and empathetic customer service responses"
            className="min-h-[150px] mt-2 resize-none border-border-color-0 !text-xs p-4 !bg-background text-foreground placeholder:text-foreground/80"
          />
        </div>
        <div className="space-y-2">
            <p className="text-sm font-medium text-foreground dark:text-foreground">Tags</p>
            <div className="flex flex-wrap gap-1">
                 <Badge
                variant="secondary"
                className={cn(
                  "rounded-full border border-color-2 px-3 py-1 bg-white dark:bg-background text-xs font-light transition-all duration-500 ease-out dark:group-hover:bg-background"
                )}
              >
                Customer-service
              </Badge>
               <Badge
                variant="secondary"
                className={cn(
                  "rounded-full border border-color-2 px-3 py-1 bg-white dark:bg-background text-xs font-light transition-all duration-500 ease-out dark:group-hover:bg-background"
                )}
              >
                empathy
              </Badge>
               <Badge
                variant="secondary"
                className={cn(
                  "rounded-full border border-color-2 px-3 py-1 bg-white dark:bg-background text-xs font-light transition-all duration-500 ease-out dark:group-hover:bg-background"
                )}
              >
               problem-solving
              </Badge>

            </div>
        
        </div>
      </div>
    </>
  );
};

export default PromptMetadataGrid;
