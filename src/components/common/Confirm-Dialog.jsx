"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RippleButton } from "@/components/ui/ripple-button";
import { ArrowRight } from "lucide-react";

export function ConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  onConfirm,
  confirmLabel = "Delete",
  cancelLabel = "Cancel",
  destructive = true,
}) {
  const handleCancel = () => {
    onOpenChange(false);
  };

  const handleConfirm = () => {
    if (onConfirm) onConfirm();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[35%] h-[30%] pt-8">
        <DialogHeader>
          <DialogTitle className="text-2xl font-medium mb-4">
            {title}
          </DialogTitle>
          {description && (
            <DialogDescription>{description}</DialogDescription>
          )}
        </DialogHeader>

        <DialogFooter className="flex justify-end gap-2">
          <RippleButton>
            <Button
              variant="outline"
              className="gap-2 border-border-color-0 text-foreground hover:bg-gray-50 w-fit px-7 dark:bg-background"
              onClick={handleCancel}
            >
              {cancelLabel}
            </Button>
          </RippleButton>

          <RippleButton onClick={handleConfirm} className="rounded-full">
            <Button
              variant={destructive ? "destructive" : "default"}
              className="text-white gap-2 cursor-pointer !px-6 rounded-lg dark:bg-red"
            >
              {confirmLabel}
              <ArrowRight />
            </Button>
          </RippleButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
