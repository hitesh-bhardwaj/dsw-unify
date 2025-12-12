"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useState } from "react";

export default function ToolCreateModal({ open, onOpenChange }) {
  const [toolName, setToolName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("API");
  const [category, setCategory] = useState("Utility");
  const [apiEndpoint, setApiEndpoint] = useState("");
  const [method, setMethod] = useState("GET");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[40%] rounded-xl p-6 bg-background">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold ">
            Create New Tool
            <p className="text-sm font-normal opacity-60 mt-1">
              Create a new tool that will be immediately available for your
              agent
            </p>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 pt-4">
          {/* Tool Name */}
          <div>
            <label className="text-sm">Tool Name</label>
            <Input
              placeholder="e.g., Web Search"
              value={toolName}
              onChange={(e) => setToolName(e.target.value)}
              className="mt-1"
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-sm">Description</label>
            <textarea
              placeholder="Describe what this tool does..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border border-border-color-0 rounded-md p-2 text-sm mt-1 bg-background"
              rows={3}
            />
          </div>

          {/* Type & Category */}
          <div className="flex w-full gap-4">
            <div className="w-1/2">
              <label className="text-sm ">Type</label>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger className="mt-1 px-5 border cursor-pointer border-border-color-0">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent className="border border-border-color-0 ">
                  <SelectItem className="cursor-pointer" value="API">
                    API
                  </SelectItem>
                  <SelectItem className="cursor-pointer" value="Custom">
                    Custom
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="w-1/2">
              <label className="text-sm">Category</label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="mt-1 border border-border-color-0 cursor-pointer px-5">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent className="border border-border-color-0 ">
                  <SelectItem className="cursor-pointer" value="Utility">
                    Utility
                  </SelectItem>
                  <SelectItem className="cursor-pointer" value="AI">
                    AI
                  </SelectItem>
                  <SelectItem className="cursor-pointer" value="Communication">
                    Communication
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* API Endpoint */}
          <div>
            <label className="text-sm">API Endpoint</label>
            <Input
              placeholder="https://api.example.com/v1/endpoint"
              value={apiEndpoint}
              onChange={(e) => setApiEndpoint(e.target.value)}
              className="mt-1"
            />
          </div>

          {/* HTTP Method */}
          <div>
            <label className="text-sm">HTTP Method</label>
            <Select value={method} onValueChange={setMethod}>
              <SelectTrigger className="mt-1 w-full border border-border-color-0 cursor-pointer">
                <SelectValue placeholder="GET" />
              </SelectTrigger>
              <SelectContent className="border border-border-color-0 ">
                <SelectItem className="cursor-pointer" value="GET">
                  GET
                </SelectItem>
                <SelectItem className="cursor-pointer" value="POST">
                  POST
                </SelectItem>
                <SelectItem className="cursor-pointer" value="PUT">
                  PUT
                </SelectItem>
                <SelectItem className="cursor-pointer" value="DELETE">
                  DELETE
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end gap-2 items-center pt-4">
            <Button
              variant="outline"
              className="px-6 !h-10 border border-border-color-0"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={() => onOpenChange(false)}
              className="bg-primary !h-10 text-white"
            >
              Create & Add to Agent
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
