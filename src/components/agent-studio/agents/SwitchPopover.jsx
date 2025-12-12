"use client";

import React, { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

export default function SwitchPopover({ tool, onSave }) {
  const [enabled, setEnabled] = useState(false);
  const [open, setOpen] = useState(false);

  const [searchEngine, setSearchEngine] = useState("Google");
  const [maxResults, setMaxResults] = useState("5");

  const handleSave = () => {
    onSave(tool.id, {
      searchEngine,
      maxResults,
    });

    setOpen(false);
  };

  return (
    <>
      {/* MAIN ROW */}
      <div className="border border-border-color-0 rounded-xl px-5 py-3 flex items-center justify-between bg-background w-full">
        {/* LEFT SIDE */}
        <div className="flex items-center gap-4">
          {/* SWITCH */}
          <Switch checked={enabled} onCheckedChange={setEnabled} className='cursor-pointer' />

          <div>
            <h3 className="text-md font-medium">{tool.name}</h3>
            <p className="text-sm text-muted-foreground">{tool.description}</p>
          </div>
        </div>

        {/* RIGHT SIDE */}
        {enabled && (
          <Button
            variant="outline"
            className="rounded-full border border-primary px-5 !h-10 py-0.5 text-sm"
            onClick={() => setOpen(true)}
          >
            Configure
          </Button>
        )}
      </div>

      {/* POPUP */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg bg-background border border-border-color-0 p-6 rounded-xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-medium">
              Configure {tool.name}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6 mt-4">
            {/* Search Engine */}
            <div className="flex flex-col gap-2">
              <label className="font-medium font-sm">Search Engine</label>

              <Select value={searchEngine} onValueChange={setSearchEngine}>
                <SelectTrigger className="w-40 border border-border-color-0 cursor-pointer">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>

                <SelectContent className="border border-border-color-0">
                  <SelectItem className="cursor-pointer" value="Google">Google</SelectItem>
                  <SelectItem className="cursor-pointer" value="Bing">Bing</SelectItem>
                  <SelectItem className="cursor-pointer" value="DuckDuckGo">
                    DuckDuckGo
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Max Results */}
            <div className="flex flex-col gap-2">
              <label className="font-medium text-sm">Max Results</label>

              <Input
              type="number"
                value={maxResults}
                onChange={(e) => setMaxResults(e.target.value)}
                className="w-full"
              />
            </div>
          </div>

          {/* FOOTER BUTTONS */}
          <div className="flex justify-end gap-4 mt-8">
            <Button
              variant="outline"
              className="px-6 !h-10 border border-border-color-0"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>

            <Button
              className="px-6 py-2 !h-10 bg-primary text-white"
              onClick={handleSave}
            >
              Save Configuration
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
