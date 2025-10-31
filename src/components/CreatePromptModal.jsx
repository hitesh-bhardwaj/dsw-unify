import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { AiGenerator, PlusIcon } from "./Icons";
import { Button } from "./ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "./ui/select";

const CATEGORY_OPTIONS = [
  "General",
  "Marketing",
  "Sales",
  "Support",
  "Engineering",
  "Product",
  "HR",
];

const CreatePromptModal = ({ open, onOpenChange }) => {
  const [category, setCategory] = useState();

  const handleCreate = () => {
    // TODO: wire up your submit logic here
    // You can read `category` and other form values via refs/state or a form lib
    onOpenChange?.(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={"w-[45%] left-1/2  top-1/2 h-[80%]"}>
        <div className="py-4 px-2  w-full space-y-5 overflow-hidden">
          <DialogHeader>
            <DialogTitle className="text-2xl font-medium mb-6">
              Create New Prompt
            </DialogTitle>
          </DialogHeader>

          <div className="flex w-full h-fit gap-2">
            <div className="flex flex-col gap-2 w-[60%]">
              <label className="text-sm text-foreground">Prompt Name*</label>
              <Input className="border border-black/20 placeholder:text-black/60" placeholder="Enter Prompt Name" />
            </div>

            <div className="flex flex-col gap-2 w-[40%]">
              <label className="text-sm text-foreground">Category</label>
              <Select value={category} onValueChange={setCategory} className="w-full">
                <SelectTrigger className="border border-black/20 placeholder:text-black/60 !text-black/60 !h-10.5 w-full">
                  <SelectValue placeholder="Choose category" className={"placeholder:text-sm "}/>
                </SelectTrigger>
                <SelectContent>
                  {CATEGORY_OPTIONS.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex w-full h-fit gap-2">
            <div className="flex flex-col gap-2 w-full">
              <label className="text-sm text-foreground">Description</label>
              <Input className="border border-black/20 placeholder:text-black/60" placeholder="Brief Description" />
            </div>
          </div>

          <div className="flex w-full h-fit gap-2">
            <div className="flex flex-col gap-2 w-full">
              <label className="text-sm text-foreground">Prompt Content*</label>
              <Textarea
                className="border border-black/20 placeholder:text-black/60 placeholder:text-xs h-36"
                placeholder="Enter Prompt Content"
              />
            </div>
          </div>

          <div className="flex w-full h-fit gap-2 items-end">
            <div className="flex flex-col gap-2 w-[85%]">
              <label className="text-sm text-foreground">Tags</label>
              <Input className="border border-black/20 placeholder:text-black/60" placeholder="Add a tag" />
            </div>
            <div className="flex gap-2 w-[15%] border border-black/20 placeholder:text-black/60 h-10.5 rounded-lg bg-foreground text-white justify-start pl-2.5 items-center cursor-pointer">
              <div className="w-3.5 h-auto">
                <PlusIcon className="w-full h-full" />
              </div>
              <p>Add</p>
            </div>
          </div>

          <div className="w-full flex justify-end gap-2">
            <Button
              variant="outline"
              className="gap-2 border-primary text-foreground hover:bg-gray-50 w-fit px-7"
              onClick={() => onOpenChange?.(false)}
            >
              Cancel
            </Button>
            <Button
              className="bg-sidebar-primary hover:bg-[#E64A19] text-white gap-3 rounded-full !px-6 !py-6 !cursor-pointer duration-300"
              onClick={handleCreate}
            >
              <div className="w-4 h-auto">
                <AiGenerator />
              </div>
              Create Prompt
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePromptModal;
