"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";
import {
  AiGenerator,
  TablesIcon,
  FeaturesIcon,
  LeftArrow,
} from "@/components/Icons";
import { RippleButton } from "@/components/ui/ripple-button";
import { Button } from "@/components/ui/button";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group";



export default function FeatureEngineering({
  goNext,
  goBack,
  onClose,
  isLastStep,
  stepId,
  onDataChange,
  openViewsModal,
  data = { mode: "existing", selectedService: "claims" }
}) {
  const [mode, setMode] = useState(data.mode);
  const [selectedService, setSelectedService] = useState(data.selectedService);
    const [isViewsModalOpen, setIsViewsModalOpen] =useState(false);


  const handleModeChange = (newMode) => {
    setMode(newMode);
    onDataChange?.({ mode: newMode, selectedService });
  };

  const handleServiceChange = (newService) => {
    setSelectedService(newService);
    onDataChange?.({ mode, selectedService: newService });
  };

  const handleNext = () => {
    // Update parent with final data before moving to next step
    onDataChange?.({ mode, selectedService });
    goNext();
  };

  const FEATURE_SERVICES = [
    {
      id: "claims",
      title: "Claims Fraud Detection Service",
      description:
        "Comprehensive fraud detection features combining claims history, demographics, and risk factors",
      views: 3,
      features: 64,
    },
    {
      id: "risk",
      title: "Risk Assessment Service",
      description:
        "Underwriting risk assessment features for policy pricing and approval decisions",
      views: 4,
      features: 76,
    },
    {
      id: "churn",
      title: "Customer Churn Prediction Service",
      description:
        "Churn prediction features combining demographics, payment behavior, and policy details",
      views: 3,
      features: 46,
    },
  ];

  return (
    <div className="space-y-8 px-5">
      {/* Header */}
      <div>
        <h2 className="text-xl font-medium">Feature Engineering</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Choose existing features or create new ones for your model
        </p>
      </div>

      {/* Mode Selection */}
      <RadioGroup
        value={mode}
        onValueChange={handleModeChange}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <ModeCard
          value="existing"
          title="Use Existing Features"
          description="Select from existing Feature Services that are already configured and ready to use"
        />

        <ModeCard
          value="new"
          title="Create New Features"
          description="Build new Feature Views and Feature Services through our guided creation wizard"
        />
      </RadioGroup>

      {/* EXISTING MODE */}
      {mode === "existing" && (
        <div className="space-y-4">
          <div>
            <h3 className="text-base font-medium">Select Feature Service</h3>
            <p className="text-sm text-muted-foreground">
              Choose a Feature Service that contains the features you want to use
              for training
            </p>
          </div>

          <RadioGroup
            value={selectedService}
            onValueChange={handleServiceChange}
            className="space-y-3"
          >
            {FEATURE_SERVICES.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                value={service.id}
              />
            ))}
          </RadioGroup>

          <div className="w-full flex justify-end gap-2 pt-4">
            <RippleButton>
              <Button
                variant="outline"
                className="gap-2 border-border-color-0 text-foreground hover:bg-gray-50 w-fit px-7"
                onClick={onClose}
              >
                Cancel
              </Button>
            </RippleButton>

            <RippleButton>
              <Button
                className="bg-sidebar-primary hover:bg-primary text-white gap-3 rounded-full px-6 py-6 cursor-pointer duration-300"
                onClick={handleNext}
              >
                Next Step
                <div className="w-4 h-auto">
                  <LeftArrow className="rotate-180" />
                </div>
              </Button>
            </RippleButton>
          </div>
        </div>
      )}

      {/* NEW MODE */}
      {mode === "new" && (
        <div className="flex flex-col items-stretch">

        <div className="rounded-xl border border-border-color-0 bg-background p-10 text-center space-y-2">
          <div className="flex justify-center">
            <div className="h-14 w-14 rounded-full flex items-center justify-center">
              <AiGenerator className="h-8 w-8 text-primary" />
            </div>
          </div>

          <h3 className="text-lg font-medium">Create New Features</h3>
          <p className="text-sm text-muted-foreground">
            You'll be guided through creating Feature Views and Feature Services
          </p>

          <RippleButton className="mt-4">
            <Button  
            onClick={openViewsModal}
     
    
            className="bg-sidebar-primary hover:bg-primary text-white gap-3 rounded-full px-6 py-6 cursor-pointer duration-300">
              Start Feature Creation Wizard
              <div className="w-4 h-auto">
                <LeftArrow className="rotate-180" />
              </div>
            </Button>
          </RippleButton>

        </div>

          <div className="w-full flex justify-end gap-2 pt-4">
            <RippleButton>
              <Button
                variant="outline"
                className="gap-2 border-border-color-0 text-foreground hover:bg-gray-50 w-fit px-7"
                onClick={onClose}
              >
                Cancel
              </Button>
            </RippleButton>

            <RippleButton>
              <Button
                className="bg-sidebar-primary hover:bg-primary text-white gap-3 rounded-full px-6 py-6 cursor-pointer duration-300"
                onClick={handleNext}
              >
                Next Step
                <div className="w-4 h-auto">
                  <LeftArrow className="rotate-180" />
                </div>
              </Button>
            </RippleButton>
          </div>
        
        </div>
      )}
          
      
    </div>
  );
}

function ModeCard({ value, title, description }) {
  return (
    <label
      htmlFor={value}
      className="cursor-pointer"
    >
      <div
        className={cn(
          "rounded-xl border p-5 transition-all",
          "data-[state=checked]:border-primary data-[state=checked]:bg-background border-border-color-0 hover:bg-sidebar-accent"
        )}
      >
        <div className="flex gap-3 items-start">
          <RadioGroupItem value={value} id={value} />

          <div>
            <h4 className="font-medium">{title}</h4>
            <p className="text-sm text-muted-foreground mt-1">
              {description}
            </p>
          </div>
        </div>
      </div>
    </label>
  );
}

function ServiceCard({ service, value }) {
  return (
    <label
      htmlFor={value}
      className="cursor-pointer"
    >
      <div
        className={cn(
          "rounded-xl border p-5 transition-all",
          "data-[state=checked]:border-primary border-border-color-0 hover:bg-sidebar-accent"
        )}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex gap-3">
            <RadioGroupItem value={value} id={value} className="mt-1" />

            <div className="ml-2">
              <h4 className="font-medium text-base">{service.title}</h4>
              <p className="text-xs text-muted-foreground mt-1">
                {service.description}
              </p>

              <div className="flex gap-8 text-xs text-muted-foreground mt-3">
                <div className="flex gap-2 items-center">
                  <TablesIcon className="h-5 w-5 text-primary" />
                  <span>{service.views} Feature Views</span>
                </div>

                <div className="flex gap-2 items-center">
                  <FeaturesIcon className="h-4 w-4 text-primary" />
                  <span>{service.features} Features</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </label>
  );
}
