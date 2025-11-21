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
      icon: <SynthWave className="w-6 h-6 text-primary" />,
    },
    {
      id: "manual",
      title: "Create Manually",
      description:
        "Full control over feature creation. Select specific columns, define joins, and apply transformations.",
      icon: <SynthWave className="w-6 h-6 text-primary" />,
    },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[80%] h-[80%] left-1/2  -translate-x-1/2 top-1/2 flex flex-col p-6 px-7 ">
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

              <div className="w-full grid grid-cols-2 gap-4  mt-14 h-[55%]">
                {options.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => onSelect?.(item.id)}
                    className={cn(
                      "cursor-pointer p-8 group rounded-lg border  border-border-color-2 hover:bg-sidebar-accent duration-500 transition-all  flex items-center justify-center flex-col text-center space-y-4"
                    )}
                  >
                    <div className="pb-2 group-hover:text-primary duration-500 transition-all">
                      {item.icon}
                    </div>
                    <h3 className="text-2xl font-medium">{item.title}</h3>
                    <p className="text-xs text-foreground/80 max-w-[80%]  ">
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
