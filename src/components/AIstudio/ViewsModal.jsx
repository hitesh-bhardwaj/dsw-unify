"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { CreateManuallyIcon, RegenerateIcon, SynthWave } from "@/components/Icons";
import StepFormModal from "@/components/common/StepModalForm";
import BasicInfo from "./QuickStartForm/DefineUseCases";
import SelectTables from "./QuickStartForm/SelectData";
import FeatureCreation from "./QuickStartForm/FeatureCreation";
import DefineJoins from "./QuickStartForm/ConfigureModel";
import SelectFeatures from "./QuickStartForm/SelectFeatures";

/**
 * Modal component for creating a feature view, offering automated and manual creation options.
 *
 * @param {Object} props - The component props.
 * @param {boolean} props.open - Whether the modal is open.
 * @param {function} props.onOpenChange - Callback when the modal open state changes.
 * @param {function} [props.onSelect] - Callback when a creation option is selected.
 * @returns {React.JSX.Element} The rendered ViewsModal component.
 */
export default function ViewsModal({ open, onOpenChange, onSelect }) {
  const [showStepsModal, setShowStepsModal] = useState(false);
  const [selectedType, setSelectedType] = useState(null);

  const [currentSteps, setCurrentSteps] = useState([]); // dynamic steps


  const autoSteps = [
    {
      id: "basic",
      label: "Basic Info",
      required: true,
      element: <BasicInfo  onClose={showStepsModal}/>,
    },
    {
      id: "select-tables",
      label: "Select Tables",
      element: <SelectTables />,
    },
    {
      id: "creating-features",
      label: "Creating Features",
      element: <FeatureCreation />,
    },
    
  ];

  const manualSteps = [
    {
      id: "basic",
      label: "Basic Info",
      required: true,
      element: <BasicInfo />,
    },
    {
      id: "select-tables",
      label: "Select Tables",
      element: <SelectTables />,
    },
    {
      id:"define-joins",
      label: "Define Joins",
      element: <DefineJoins />
    },
    {
      id: "select-features",
      label: "Select Features",
      element: <SelectFeatures />,
    },
     {
      id: "preview",
      label: "Preview",
      element: <FeatureCreation />,
    },
    
  ];

  const options = [
    {
      id: "auto",
      title: "Auto Create Features",
      description:
        "Quickly generate features by selecting tables. Our system will automatically create features from all columns.",
      icon: <RegenerateIcon className="w-8 h-8 text-icon-color-1 group-hover:text-white" />,
    },
    {
      id: "manual",
      title: "Create Manually",
      description:
        "Full control over feature creation. Select specific columns, define joins, and apply transformations.",
      icon: <CreateManuallyIcon className="w-8 h-8 text-icon-color-1 group-hover:text-white" />,
    },
  ];

  const handleSelect = (id) => {
    setSelectedType(id);

    //  SET CORRECT STEPS BASED ON USER CHOICE
    if (id === "auto") {
      setCurrentSteps(autoSteps);
    } else {
      setCurrentSteps(manualSteps);
    }

    onSelect?.(id);
    setShowStepsModal(true);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="w-[80%] h-[80%] left-1/2 -translate-x-1/2 top-1/2 flex flex-col p-6 px-7">
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
                <DialogHeader className="py-3">
                  <DialogTitle className="text-2xl font-medium">
                    Create Feature View
                  </DialogTitle>
                </DialogHeader>

                <div className="w-full grid grid-cols-2 gap-4 mt-14 h-[55%]">
                  {options.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => handleSelect(item.id)}
                      className={cn(
                        "feature-card-hover-container hover:text-white cursor-pointer p-8 group rounded-3xl border border-border-color-0 hover:bg-sidebar-accent duration-500 transition-all flex items-center justify-center flex-col text-center space-y-4"
                      )}
                    >
                      <div className="pb-2  group-hover:text-white duration-300 transition-all">
                        {item.icon}
                      </div>
                      <h3 className="text-3xl group-hover:text-white  duration-300 transition-all font-medium">{item.title}</h3>
                      <p className="text-sm group-hover:text-white duration-300 transition-all  text-foreground/80 max-w-[80%]">
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

      <StepFormModal
        title="Create Feature View"
        open={showStepsModal}
        onOpenChange={setShowStepsModal}
        steps={currentSteps}
      />
    </>
  );
}
