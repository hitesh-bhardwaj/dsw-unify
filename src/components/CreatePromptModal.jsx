import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { AiGenerator, LeftArrow, PlusIcon } from "./Icons";
import { Button } from "./ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "./ui/select";
import { RippleButton } from "./ui/ripple-button";
import { ArrowRight } from "lucide-react";

const CATEGORY_OPTIONS = [
  "General",
  "Marketing",
  "Sales",
  "Support",
  "Engineering",
  "Product",
  "HR",
];

/**
 * Modal component for creating a new prompt.
 *
 * @param {Object} props - The component props.
 * @param {boolean} props.open - Whether the modal is open.
 * @param {function} props.onOpenChange - Callback function when the open state changes.
 * @returns {React.JSX.Element} The rendered CreatePromptModal component.
 */
const CreatePromptModal = ({ open, onOpenChange }) => {
  const [category, setCategory] = useState();
  const [isOpen, setIsOpen] = useState(false)

  const handleCreate = () => {
    // TODO: wire up your submit logic here
    // You can read `category` and other form values via refs/state or a form lib
    onOpenChange?.(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={"w-[45%] left-1/2  top-1/2 h-[80%]"}>
        <div className="py-4 px-2  w-full space-y-5 overflow-hidden ">
          <DialogHeader>
            <DialogTitle className="text-2xl font-medium mb-6">
              Create New Prompt
            </DialogTitle>
          </DialogHeader>

          <div className="flex w-full h-fit gap-2">
            <div className="flex flex-col gap-2 w-[60%]">
              <label className="text-sm text-foreground">Prompt Name*</label>
              <Input
                className=" placeholder:text-foreground/40"
                placeholder="Enter Prompt Name"
              />
            </div>

            <div className="flex flex-col gap-2 w-[40%]">
              <label className="text-sm text-foreground">Category</label>
              <Select
                value={category}
                onValueChange={setCategory}
                onOpenChange={(open) => setIsOpen(open)}
                className="w-full "
              >
                <SelectTrigger className={` placeholder:text-foreground/40 cursor-pointer border border-border-color-0 !h-10.5 w-full [&>svg]:transition-transform [&>svg]:duration-200 ${isOpen ? '[&>svg]:rotate-180' : ''}`}>
                  <SelectValue
                    placeholder="Choose category"
                    className={"placeholder:text-sm !cursor-pointer "}
                  />
                </SelectTrigger>
                <SelectContent className="border border-border-color-0">
                  {CATEGORY_OPTIONS.map((c) => (
                    <SelectItem key={c} value={c} className={"!cursor-pointer"}>
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
              <Input
                className=" placeholder:text-foreground/40"
                placeholder="Brief Description"
              />
            </div>
          </div>

          <div className="flex w-full h-fit gap-2">
            <div className="flex flex-col gap-2 w-full">
              <label className="text-sm text-foreground">Prompt Content*</label>
              <Textarea
                className=" placeholder:text-foreground/40 placeholder:text-xs h-36"
                placeholder="Enter Prompt Content"
              />
            </div>
          </div>

          <div className="flex w-full h-fit gap-2 items-end ">
            <div className="flex flex-col gap-2 w-[85%]">
              <label className="text-sm text-foreground">Tags</label>
              <Input
                className=" placeholder:text-foreground/40"
                placeholder="Add a tag"
              />
            </div>
            <div className="w-[15%] h-full">
            <RippleButton className={"w-full rounded-lg "} circColor={"dark:bg-foreground/40 bg-white  "}>
            <div className="flex gap-2 w-full py-0 placeholder:text-foreground/40 h-10.5 rounded-lg bg-foreground text-background justify-start pl-2.5 items-center cursor-pointer dark:bg-transparent dark:text-foreground dark:border-primary dark:border mt-1">
              <div className="w-3.5 h-auto">
                <PlusIcon className="w-full h-full text-background dark:text-foreground" />
              </div>
              <p>Add</p>
            </div>

            </RippleButton>
            </div>
          </div>

          <div className="w-full flex justify-end gap-2">
            <RippleButton>
              <Button
                variant="outline"
                className="gap-2 border border-border-color-2 text-foreground hover:bg-gray-50 w-fit px-7"
                onClick={() => onOpenChange?.(false)}
              >
                Cancel
              </Button>
            </RippleButton>
            <RippleButton>
              <Button
                className="bg-sidebar-primary hover:bg-[#E64A19] text-white gap-3 rounded-full !px-6 !py-6 !cursor-pointer duration-300"
                onClick={() => onOpenChange?.(false)}
              >
                
                Create Prompts
                <LeftArrow className='rotate-180' />
              </Button>
            </RippleButton>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePromptModal;
