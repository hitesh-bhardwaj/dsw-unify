"use client";

import React, { useState } from "react";
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
import EmptyCard from "@/components/common/EmptyCard";
import FeatureEngineering from "./FeatureEngineering";
import TrainingConfiguration from "./TrainingConfiguration";
import ModelTraining from "./ModelTraining";
import ViewsModal from "@/components/FeatureStore/feature-view/ViewsModal";


export default function CreateModel({ open, onOpenChange, onSelect }) {
  const [showStepsModal, setShowStepsModal] = useState(false);
  const [selectedType, setSelectedType] = useState(null);
  const [currentSteps, setCurrentSteps] = useState([]); // dynamic steps
  const [isViewsModalOpen, setIsViewsModalOpen] = useState(false);

  
  // State to hold data from both FeatureEngineering and TrainingConfiguration steps
  const [featureEngineeringData, setFeatureEngineeringData] = useState({
    mode: "existing",
    selectedService: "claims",
    modelName: "", // Add modelName here
    processType: "",
    description: ""
  });

  const mlSteps = [
    {
      id: "feature-engineering",
      label: "Feature Engineering",
      required: true,
       element: <FeatureEngineering 
         onClose={showStepsModal} 
         onDataChange={setFeatureEngineeringData}
         data={featureEngineeringData}
         openViewsModal={() => {
    setShowStepsModal(false);   // close StepFormModal
    onOpenChange(false);       // close CreateModel Dialog
    setIsViewsModalOpen(true); // open ViewsModal
  }}
       />,
    },
    {
      id: "training-configuration",
      label: "Training Configuration",
       element: <TrainingConfiguration
       data={featureEngineeringData}
       onDataChange={setFeatureEngineeringData}
    />,
    },
    {
      id:"model-training",
      label: "Model Training",
       element: <ModelTraining 
         modelName={featureEngineeringData?.modelName}
         onCloseModal={() => setShowStepsModal(false)}
       />,
    },
    
    
  ];

  const options = [
    {
      id: "classical",
      title: "Classical Journey",
      description:
        "Quickly generate features by selecting tables. Our system will automatically create features from all columns.",
      icon: <RegenerateIcon className="w-8 h-8 text-icon-color-1 group-hover:text-white" />,
    },
    {
      id: "auto-ml",
      title: "AutoML Journey",
      description:
        "Full control over feature creation. Select specific columns, define joins, and apply transformations.",
      icon: <CreateManuallyIcon className="w-8 h-8 text-icon-color-1 group-hover:text-white" />,
    },
  ];

  const handleSelect = (id) => {
    setSelectedType(id);

    if (id === "classical") {
      onOpenChange(false); // just close and exit
      return; //  stop here
    }

    // AutoML / manual journey
    setCurrentSteps(mlSteps);
    setShowStepsModal(true);
    onSelect?.(id);
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
                        "feature-card-hover-container hover:text-white cursor-pointer p-8 group rounded-3xl border border-border-color-0 hover:bg-sidebar-accent duration-500 transition-all flex items-center justify-center flex-col text-center space-y-4 dark:bg-card"
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
        steps={currentSteps.map(step => ({
          ...step,
          element: React.cloneElement(step.element, {
            onClose: () => setShowStepsModal(false),
            ...(step.id === "training-configuration" && {
              goNext: step.goNext,
              goBack: step.goBack,
            }),
            ...(step.id === "feature-engineering" && {
              onDataChange: setFeatureEngineeringData,
              data: featureEngineeringData,
            }),
            ...(step.id === "training-configuration" && {
              data: featureEngineeringData,
              onDataChange: setFeatureEngineeringData,
            }),
            ...(step.id === "model-training" && {
              modelName: featureEngineeringData?.modelName,
              onCloseModal: () => setShowStepsModal(false),
            }),
          }),
        }))}
       
      />
      <ViewsModal
        open={isViewsModalOpen}
        onOpenChange={setIsViewsModalOpen}
      />

    </>
  );
}