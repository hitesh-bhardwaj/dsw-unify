"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { SynthWave } from "@/components/Icons";

export default function ViewsModal({ open, onOpenChange, onSelect }) {
  const options = [
    {
      id: "auto",
      title: "Auto Create Features",
      description:
        "Quickly generate features by selecting tables. Our system will automatically create features from all columns.",
      icon: (
        <span className="text-xl text-[#E65A2E] font-bold select-none">𝛍</span>
      ),
    },
    {
      id: "manual",
      title: "Create Manually",
      description:
        "Full control over feature creation. Select specific columns, define joins, and apply transformations.",
      icon: (
        <span className="text-xl text-foreground font-bold select-none">𝛍</span>
      ),
    },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[80%] h-[80%] left-1/2  -translate-x-1/2 top-1/2 flex flex-col p-6">

        <AnimatePresence mode="wait">
          {open && (
            <motion.div
              key="views-modal-content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="w-full h-full flex flex-col"
            >
              <DialogHeader className=" py-3">
                <DialogTitle className="text-2xl font-medium">
                  Create Feature View
                </DialogTitle>
              </DialogHeader>

              <div className="w-full grid grid-cols-2 gap-6  py-6 h-[70%]">
                {options.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => onSelect?.(item.id)}
                    className={cn(
                      "cursor-pointer p-8 rounded-lg border border-border-color-2 bg-gray-100",
                      " transition-shadow duration-300",
                      "flex flex-col items-center text-center space-y-4"
                    )}
                  >
                    {item.icon}
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <p className="text-sm text-foreground/80 max-w-[80%]  ">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </DialogContent>
    </Dialog>
  );
}
