import React, { useState } from "react";
import SearchBar from "../search-bar";
import { Textarea } from "../ui/textarea";
import { RippleButton } from "../ui/ripple-button";
import { Input } from "../ui/input";
import { SparklesIcon } from "../Icons";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

/**
 * Settings component for managing knowledge base settings.
 *
 * @returns {React.JSX.Element} The rendered Settings component.
 */
const Settings = () => {
  const [systemPrompt, setSystemPrompt] = useState("");
  const [modelPrompt, setModelPrompt] = useState("");
  const [format, setFormat] = useState("");
  const [isOpenFormat, setIsOpenFormat] = useState(false);
  return (
    <>
      <div className="space-y-4 border rounded-3xl p-6 border-border-color-0 h-full pb-8 ">
        <h3 className="text-xl font-medium mb-2">Settings</h3>
        <div className="space-y-2 mt-4">
          <label className="text-sm text-[#111111] dark:text-foreground">
            Knowledge Base Name
          </label>
          <div className="flex gap-2 mt-2">
            <Input
              value={modelPrompt}
              onChange={(e) => setModelPrompt(e.target.value)}
              placeholder="Company Documentation"
              className="h-12 flex-1 !text-xs p-4 border-border-color-0 shadow-none text-foreground placeholder:text-foreground/80"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm text-[#111111] dark:text-foreground">
          Description
          </label>
          <Textarea
            value={systemPrompt}
            onChange={(e) => setSystemPrompt(e.target.value)}
            placeholder="Internal company policies and procedures"
            className="min-h-[120px] mt-2 resize-none border-border-color-0 !text-xs p-4 !bg-background text-foreground placeholder:text-foreground/80"
          />
          
        </div>
        
        <div className="space-y-2 mb-4">
              <label className="text-sm">Processing Options</label>
            <Select
              value={format}
              onValueChange={setFormat}
              onOpenChange={(open) => setIsOpenFormat(open)}
              className="w-full"
            >
              <SelectTrigger
                className={`border w-full border-foreground/20 placeholder:text-foreground/60 placeholder:text-xs rounded-md !h-10 px-3 text-xs outline-none [&>svg]:transition-transform [&>svg]:duration-200 ${
                  isOpenFormat ? "[&>svg]:rotate-180" : ""
                }`}
              >
                <SelectValue placeholder=" Every hour" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="auto" className="!cursor-pointer text-xs">
                  Every hour
                </SelectItem>

                <SelectItem value="text" className="!cursor-pointer text-xs">
                 Every week
                </SelectItem>

                <SelectItem value="ocr" className="!cursor-pointer text-xs">
                  Every month
                </SelectItem>
              </SelectContent>
            </Select>
        </div>
        
        <div className="w-full flex items-end justify-end">
             <RippleButton className={"rounded-full"}>
              <Button className="bg-primary hover:bg-[#E64A19] text-white gap-2  cursor-pointer w-40 !px-6 rounded-lg">
               Send Changes
                <ArrowRight/>
              </Button>
            </RippleButton>

        </div>
      </div>
    </>
  );
};

export default Settings;
