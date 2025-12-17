"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardHeader } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * ManageCardsModal component for managing dashboard card visibility.
 *
 * @param {Object} props - The component props.
 * @param {boolean} props.open - Whether the modal is open.
 * @param {function} props.onOpenChange - Function to toggle modal open state.
 * @param {Array<Object>} props.metricsData - Array of metric data objects.
 * @param {Object} props.cardVisibility - Object mapping card indices to visibility state.
 * @param {function} props.setCardVisibility - Function to update card visibility.
 * @returns {React.JSX.Element} The rendered ManageCardsModal component.
 */
export function ManageCardsModal({ open, onOpenChange, metricsData, cardVisibility, setCardVisibility }) {
  const slide = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const handleToggle = (index) => {
    setCardVisibility(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const handleToggleAll = () => {
    const allChecked = Object.values(cardVisibility).every(val => val);
    const newVisibility = {};
    metricsData.forEach((_, index) => {
      newVisibility[index] = !allChecked;
    });
    setCardVisibility(newVisibility);
  };

  const allChecked = Object.values(cardVisibility).every(val => val);
  const someChecked = Object.values(cardVisibility).some(val => val) && !allChecked;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[40%] h-[60%] flex flex-col left-1/2 -translate-x-1/2 top-1/2 pt-8 border border-border-color-0">
        <DialogHeader className="justify-center pb-4">
          <DialogTitle className="text-2xl font-medium">
            Manage Overview Cards
          </DialogTitle>
          <p className="text-sm text-foreground/80 w-4/5">
            Select which metrics you want to display on your overview dashboard. Drag cards to reorder them.
          </p>
        </DialogHeader>

        <div className="w-full h-full overflow-y-auto  flex flex-col justify-between">
          <motion.div
            className="flex flex-col space-y-4"
            variants={slide}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {/* All Cards Option */}
            <Card
              className={cn(
                "h-full transition-all duration-300 group py-1 border-0 bg-background dark:bg-background",
                "cursor-pointer"
              )}
            >
              <CardHeader className="flex gap-4 items-center p-0">
                <div className="flex items-center gap-3">
                  <Checkbox
                    checked={allChecked}
                    onCheckedChange={handleToggleAll}
                    className={someChecked ? "data-[state=checked]:bg-primary/50" : ""}
                  />
                </div>

                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-medium leading-none tracking-tight transition-colors duration-300">
                    ALL CARDS
                  </h3>
                </div>
              </CardHeader>
            </Card>

            {/* Individual Cards */}
            {metricsData.map((card, index) => (
              <Card
                key={index}
                className={cn(
                  "h-full transition-all duration-300 group py-1 border-0 bg-background dark:bg-background",
                  "cursor-pointer"
                )}
              >
                <CardHeader className="flex gap-4 items-center p-0 ">
                  <div className="flex items-center gap-3">
                    <Checkbox
                      checked={cardVisibility[index]}
                      onCheckedChange={() => handleToggle(index)}
                    />
                  </div>

                  <div className="flex items-center gap-2 ">
                    <h3 className="text-sm font-medium leading-none tracking-tight transition-colors duration-300">
                      {card.label} -
                    </h3>

                    <p className="text-sm text-muted-foreground line-clamp-2 transition-colors duration-300">
                      Current value: {card.value}
                      <span className="text-badge-green"> (+{card.change}%)</span>
                    </p>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </motion.div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
