"use client";

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
import { Button } from "@/components/ui/button";

export default function ToolConfigModal({
  open,
  onOpenChange,
  tool,
  searchEngine,
  setSearchEngine,
  maxResults,
  setMaxResults,
  saveConfig,
}) {
  if (!tool) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
                <SelectItem className="!cursor-pointer" value="Google">Google</SelectItem>
                <SelectItem className="!cursor-pointer" value="Bing">Bing</SelectItem>
                <SelectItem className="!cursor-pointer" value="DuckDuckGo">DuckDuckGo</SelectItem>
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
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>

          <Button
            className="px-6 py-2 !h-10 bg-primary text-white"
            onClick={saveConfig}
          >
            Save Configuration
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
