import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import SearchBar from "@/components/search-bar";
import { Button } from "@/components/ui/button";
import { RippleButton } from "@/components/ui/ripple-button";
import { SparklesIcon } from "@/components/Icons";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

/**
 * Component to display a grid of prompt cards with search and generation functionality.
 *
 * @returns {React.JSX.Element} The rendered PromptCardGrid component.
 */
const ModelGrid = () => {
  const [systemPrompt, setSystemPrompt] = useState("");
  const [query, setQuery] = useState("");
  const [enhancePrompt, setEnhancePrompt] = useState("");
    const [showProgress, setShowProgress] = useState(false);
      const [useCase, setUseCase] = useState("");
    const useCases = [
  { id: 1, label: "Model 1" },
  { id: 2, label: "Model 2" },
  { id: 3, label: "Model 3" },
];
  
  return (
    <>
      <div className="space-y-6 border rounded-3xl p-6 border-border-color-0 h-full pb-8 ">
        <h3 className="text-xl font-medium mb-2">Model Selection</h3>
        <p className="text-sm text-gray-600 mb-4 dark:text-foreground">
          Choose the AI model and configure its parameters
        </p>

         <div>
            <label className="text-sm mb-2 block">Model Selection</label>
              <Select onValueChange={(val) => setUseCase(val)} className="py-2">
                <SelectTrigger className="w-full py-5 ">
                  <SelectValue placeholder="Select a model" className="text-foreground/80" />
                </SelectTrigger>
                <SelectContent>
                  {useCases.map((item) => (
                    <SelectItem key={item.id} value={item.label} className="cursor-pointer">
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
          </div>

          <div className="space-y-2">
             <p className="text-sm font-medium">Model Parameters</p>
             <div className="py-2">
            <div className="w-full flex justify-between">
              <p className="text-xs">Temperature</p>
              <p>0.7</p>
            </div>
            <div className="w-full h-[4px] bg-sidebar-accent rounded-full flex items-center dark:bg-gray-700">
              <div
                className={`h-full bg-primary rounded-full relative duration-700 ease-in-out w-[20%] delay-300`}
              />
              <div className="w-5 h-5 rounded-full bg-background border-3 border-foreground -ml-1 relative z-[2]" />
            </div>
            <p className="text-xs text-foreground/80 py-2">Controls randomness in responses</p>
            </div>

<div className="py-2">
          <div className="w-full flex justify-between">
              <p className="text-xs">Top P</p>
              <p>0.9</p>
            </div>
            <div className="w-full h-[4px] bg-sidebar-accent rounded-full flex items-center dark:bg-gray-700">
              <div
                className={`h-full bg-primary rounded-full relative duration-700 ease-in-out w-[40%] delay-300`}
              />
              <div className="w-5 h-5 rounded-full bg-background border-3 border-foreground -ml-1 relative z-[2]" />
            </div>
            <p className="text-xs text-foreground/80 py-2">Controls diversity via nucleus sampling</p>
          </div>
          </div>
                
          <div>
            <label className="text-sm text-[#111111] dark:text-foreground">
              Max Tokens
            </label>
            <Input readOnly placeholder="2048" className="h-11 mt-2" />
            <p className="text-xs text-foreground/80 py-2">Maximum length of the response</p>
          </div>

          <div className="py-2">
          <div className="w-full flex justify-between">
              <p className="text-xs">Frequency Penalty</p>
              <p>0.9</p>
            </div>
            <div className="w-full h-[4px] bg-sidebar-accent rounded-full flex items-center dark:bg-gray-700">
              <div
                className={`h-full bg-primary rounded-full relative duration-700 ease-in-out w-[40%] delay-300`}
              />
              <div className="w-5 h-5 rounded-full bg-background border-3 border-foreground -ml-1 relative z-[2]" />
            </div>
            <p className="text-xs text-foreground/80 py-2">Reduces repetition in responses</p>
          </div>

        
      
       
      </div>
    </>
  );
};

export default ModelGrid;
