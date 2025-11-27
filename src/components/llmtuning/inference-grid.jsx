import React, { useState } from "react";
import SearchBar from "../search-bar";
import { Textarea } from "../ui/textarea";
import { RippleButton } from "../ui/ripple-button";
import { Input } from "../ui/input";
import { SparklesIcon } from "../Icons";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";

const InferenceGrid = () => {
  const [systemPrompt, setSystemPrompt] = useState("");
  const [query, setQuery] = useState("");
  const [enhancePrompt, setEnhancePrompt] = useState("");
  const [modelPrompt, setModelPrompt] = useState("");
  const [temperaturePrompt, setTemperaturePrompt] = useState("");

  
  return (
    <>
      <div className="space-y-6 border rounded-3xl p-6 border-border-color-1 h-full pb-8 ">
        <h3 className="text-xl font-medium mb-2">Test Model Inference</h3>
        <p className="text-sm text-gray-600 mb-4 dark:text-foreground">
         Send test requests to your deployed models
        </p>
        <div className="space-y-2">
          <label className="text-xs text-[#111111] dark:text-foreground">
            Model
          </label>
          <div className="flex gap-2 mt-2">
            <Input
              value={modelPrompt}
              onChange={(e) => setModelPrompt(e.target.value)}
              placeholder="customer-support-v1"
              className="h-12 flex-1 !text-xs p-4 border-border-color-1 shadow-none text-foreground placeholder:text-foreground/80"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs text-[#111111] dark:text-foreground">
           Temperature
          </label>
          <div className="flex gap-2 mt-2">
            <Input
              value={temperaturePrompt}
              onChange={(e) => setTemperaturePrompt(e.target.value)}
              placeholder="0.7"
              className="h-12 flex-1 !text-xs p-4 border-border-color-1 shadow-none text-foreground placeholder:text-foreground/80"
            />
          </div>
        </div>
        
        <div className="space-y-2 mb-4">
             <label className="text-xs text-[#111111] dark:text-foreground">
          Message
          </label>
          <Textarea
            value={systemPrompt}
            onChange={(e) => setSystemPrompt(e.target.value)}
            placeholder="Enter your test message here..."
            className="min-h-[120px] mt-2 resize-none border-border-color-1 !text-xs p-4 !bg-background text-foreground placeholder:text-foreground/80"
          />
        </div>
        
        <div className="w-full flex items-end justify-end">
             <RippleButton className={"rounded-full"}>
              <Button className="bg-primary hover:bg-[#E64A19] text-white gap-2  cursor-pointer w-40 !px-6 rounded-lg">
               Send Request
                <ArrowRight/>
              </Button>
            </RippleButton>

        </div>
      </div>
    </>
  );
};

export default InferenceGrid;
