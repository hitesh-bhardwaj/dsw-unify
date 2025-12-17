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

import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { UploadIcon } from "@/components/Icons";

export default function KnowledgeBaseCreateModal({ open, onOpenChange }) {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [sourceType, setSourceType] = useState("Documents");
  const [files, setFiles] = useState([]);

  const [errors, setErrors] = useState({
    name: "",
    desc: "",
  });

  const validate = () => {
    const newErrors = {
      name: name.trim() ? "" : "Knowledge base name is required",
      desc: desc.trim() ? "" : "Description is required",
    };

    setErrors(newErrors);
    return !newErrors.name && !newErrors.desc;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    onOpenChange(false);
  };
  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    setFiles([...e.target.files]);
    if (files && files.length > 0) {
      console.log('Selected files:', files);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[45%] h-[80%] overflow-hidden overflow-y-auto  p-6 bg-background border border-border-color-0">
        <div className="pr-2 overflow-hidden overflow-y-auto">
         <div className="py-4 px-2 w-full space-y-5 ">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Create Knowledge Base
            <p className="text-sm opacity-60 font-normal mt-1">
              Create a new knowledge base that will be immediately available for your agent
            </p>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-5 pt-4">
          {/* Knowledge Base Name */}
          <div>
            <label className="text-sm">
              Knowledge Base Name 
            </label>
            <Input
              placeholder="e.g., Company Documentation"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (errors.name) setErrors({ ...errors, name: "" });
              }}
              className="mt-1"
            />
            {errors.name && (
              <p className="text-xs text-red-500 mt-1">{errors.name}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="text-sm">
              Description 
            </label>
            <Textarea
              placeholder="Describe what this knowledge base contains..."
              value={desc}
              onChange={(e) => {
                setDesc(e.target.value);
                if (errors.desc) setErrors({ ...errors, desc: "" });
              }}
              rows={3}
              className="mt-1"
            />
            {errors.desc && (
              <p className="text-xs text-red-500 mt-1">{errors.desc}</p>
            )}
          </div>

          {/* Source Type */}
          <div>
            <label className="text-sm">Source Type</label>
            <Select value={sourceType} onValueChange={setSourceType}>
              <SelectTrigger className="mt-1 w-full border border-border-color-0 cursor-pointer px-5">
                <SelectValue placeholder="Select source type" />
              </SelectTrigger>
              <SelectContent className="border border-border-color-0 bg-background">
                <SelectItem className="cursor-pointer" value="Documents">
                  Documents
                </SelectItem>
                <SelectItem className="cursor-pointer" value="Web URLs">
                  Web URLs
                </SelectItem>
                <SelectItem className="cursor-pointer" value="Custom">
                  Custom
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Upload Documents */}
          <div   onClick={handleFileUpload}>
            <p className="text-sm pb-1 block">Upload Documents</p>

            <label
              htmlFor="file-upload"
              className="w-full h-40 border-2 border-dashed border-border-color-0 rounded-xl flex flex-col items-center justify-center cursor-pointer bg-background"
            >
              <UploadIcon className="text-gray-500 h-4 w-4" />
              <p className="text-sm opacity-70">
                Drag and drop files here, or click to browse
              </p>

              <label htmlFor="file-upload">
                <Button
                  type="button"
                  variant="outline"
                  className="mt-3 px-4 !h-9 border border-border-color-0 cursor-pointer"
                >
                  Select Files
                </Button>
              </label>

              <Input
                id="file-upload"
                type="file"
                multiple
                className="hidden"
                onChange={handleFileChange}
              />
            </label>

            {files.length > 0 && (
              <p className="text-xs mt-2 opacity-70">
                {files.length} file(s) selected
              </p>
            )}
          </div>

          {/* FOOTER BUTTONS */}
          <div className="flex justify-end gap-3 pt-4">
            <Button
              variant="outline"
              className="px-6 !h-10 border border-border-color-0"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>

            <Button
              className="bg-primary text-white !h-10 px-6"
              onClick={handleSubmit}
            >
              Create & Add to Agent
            </Button>
          </div>
        </div>
        </div>
          </div>
      </DialogContent>
    
    </Dialog>
  );
}
