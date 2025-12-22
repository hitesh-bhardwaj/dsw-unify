import { useState, React, useEffect } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { RippleButton } from "../ui/ripple-button";
import { Textarea } from "../ui/textarea";
import { LeftArrow } from "../Icons";

export const AddMemoriesModal = ({ open, onOpenChange, memory, onSave }) => {
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState({});

 useEffect(() => {
    if (open) {
      setDescription(memory?.content || '');
      setErrors({});
    }
  }, [open, memory]);

  const handleSubmit = () => {
    const errs = {
      description: !description.trim() ? 'Description is required' : '',
    };
    setErrors(errs);

    if (Object.values(errs).some(Boolean)) return;

    onSave({
      ...memory,
      content: description,
      modified: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      })
    });

    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[60%] h-[55%] flex flex-col left-1/2 -translate-x-1/2 top-1/2 pt-8">
        <DialogHeader className="justify-center pb-4">
          <DialogTitle className="text-2xl font-medium">
            {memory ? 'Edit Memory' : 'Add New Memory'}
          </DialogTitle>
          <p className="text-xs text-foreground/80">
            {memory ? 'Update your organization memory' : 'Add a new organization-wide memory'}
          </p>
        </DialogHeader>

        <div className="w-full h-full overflow-y-auto pr-2 flex flex-col justify-between">
          <div className="flex flex-col space-y-6">
            <div className="flex flex-col gap-3">
              <label className="text-sm text-foreground">Memory Content</label>
              <Textarea
                value={description}
                placeholder="Enter the Memory Content..."
                onChange={(e) => setDescription(e.target.value)}
                className={`border placeholder:text-xs h-32 placeholder:text-foreground/80 ${errors.description ? 'border-red-500' : 'border-border-color-0'
                  }`}
              />
              {errors.description && (
                <p className="text-xs text-red-500">{errors.description}</p>
              )}
            </div>
          </div>

          <div className="py-6 my-2 flex justify-end gap-3">
            <RippleButton>
              <Button
                variant="outline"
                className="border-foreground/40 text-foreground/80 px-6"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
            </RippleButton>

            <RippleButton>
              <Button
                onClick={handleSubmit}
                className="bg-sidebar-primary hover:bg-[#E64A19] text-white gap-3 rounded-full !px-6 !py-6 !cursor-pointer duration-300"
              >
                {memory ? 'Update Memory' : 'Add Memory'}
                <LeftArrow className="ml-2 rotate-180 w-4" />
              </Button>
            </RippleButton>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};