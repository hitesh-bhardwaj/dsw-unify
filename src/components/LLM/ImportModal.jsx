"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { LeftArrow } from "../Icons";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

export default function ImportModal({ open, onOpenChange }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[45%] p-6 rounded-3xl max-h-[90%]">
        <DialogHeader>
          <DialogTitle className="text-3xl font-medium">
            Import Model
            <p className="text-sm font-normal text-foreground/80 pt-1">Import and existing modal configuration or checkpoint</p>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          {/* Import Method */}
          <div className="space-y-2">
            <p className="text-sm font-medium">Import Method</p>
            <Select>
              <SelectTrigger className="cursor-pointer w-full !h-10 border border-border-color-0" >
                <SelectValue placeholder="Select import method" />
              </SelectTrigger>
              <SelectContent className="border border-border-color-0">
                <SelectItem className="cursor-pointer" value="url">From URL</SelectItem>
                <SelectItem className="cursor-pointer" value="s3">From S3 Bucket</SelectItem>
                <SelectItem className="cursor-pointer" value="local">Upload File</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Model Name */}
          <div className="space-y-2">
            <p className="text-sm font-normal">Model Name</p>
            <Input placeholder="Enter model name" />
          </div>

          {/* Source Path */}
          <div className="space-y-2">
            <p className="text-sm font-normal">Source Path / URL</p>
            <Input placeholder="e.g. s3://bucket/model.ckpt or https://..." />
          </div>

          {/* Model Type */}
          <div className="space-y-2">
            <p className="text-sm font-normal">Model Type</p>
            <Select>
              <SelectTrigger className="cursor-pointer w-full !h-10 border border-border-color-0">
                <SelectValue placeholder="Select model type" />
              </SelectTrigger>
              <SelectContent className="border border-border-color-0">
                <SelectItem className="cursor-pointer" value="llm">LLM</SelectItem>
                <SelectItem className="cursor-pointer" value="embedding">Embedding Model</SelectItem>
                <SelectItem className="cursor-pointer" value="fine-tuned">Fine-tuned Model</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <p className="text-sm font-normal">Description</p>
            <Textarea placeholder="Describe the imported model..." />
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <p className="text-sm font-normal">Tags (comma-separated)</p>
            <Input placeholder="e.g., imported, production, custom" />
          </div>
        </div>

        <DialogFooter className="mt-6">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="mr-2"
          >
            Cancel
          </Button>
          <Button className="bg-sidebar-primary text-white hover:bg-primary !px-6 !space-x-2">
            Import Model
            <LeftArrow className='rotate-180'/>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
