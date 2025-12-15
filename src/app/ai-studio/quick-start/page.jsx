"use client"
import { ScaleDown } from "@/components/animations/Animations";
import {PathIcon, PlusIcon, RocketIcon, SelectDataIcon, TrainAndDeployIcon } from "@/components/Icons";
import { Button } from "@/components/ui/button";
import { RippleButton } from "@/components/ui/ripple-button";
import Link from "next/link";
import React, { useState } from "react";
import { QuickCards } from "@/components/AIstudio/QuickCards";
import StepFormModal from "@/components/common/StepModalForm";
import BasicInfo from "@/components/FeatureStore/feature-view/ViewsStepForm/BasicInfo";
import SelectTables from "@/components/FeatureStore/feature-view/ViewsStepForm/SelectTables";
import DefineJoins from "@/components/FeatureStore/feature-view/ViewsStepForm/DefineJoins";
import SelectFeatures from "@/components/FeatureStore/feature-view/ViewsStepForm/SelectFeatures";
import FeatureCreation from "@/components/FeatureStore/feature-view/ViewsStepForm/FeatureCreation";
import DefineUseCases from "@/components/AIstudio/QuickStartForm/DefineUseCases";
import SelectData from "@/components/AIstudio/QuickStartForm/SelectData";
import ConfigureModel from "@/components/AIstudio/QuickStartForm/ConfigureModel";
import ModelTraining from "@/components/AIstudio/QuickStartForm/SelectFeatures";

const quickFeatures = [
  {
    icon: PathIcon,
    title: "Define Your Use Case",
    description:
      "Start by creating a use case to organize your AI models and track business objectives",
    href: "#",
  },
  {
    icon: SelectDataIcon,
    title: "Select Data",
    description:
      "Select your data sources and automatically create features with our guided wizard",
    href: "#",
  },
  {
    icon: TrainAndDeployIcon,
    title: "Train & Deploy",
    description:
      "Configure training parameters and let AutoML train and deploy your model automatically",
    href: "#",
  },
];



const page = () => {
     const [query, setQuery] = useState("");
       const [isModalOpen, setIsModalOpen] = useState(false);
       const [sharedState, setSharedState] = useState({
    selectedTables: ["Customers"]
  });

   const manualSteps = [
    {
      id: "define-use-case",
      label: "Define Use Case",
      required: true,
      element: <DefineUseCases/>,
    },
    {
      id: "select-data",
      label: "Select Data",
      element: <SelectData sharedState={sharedState} setSharedState={setSharedState}/>,
    },
    {
      id:"configure-model",
      label: "Configure Model",
      element: <ConfigureModel sharedState={sharedState} setSharedState={setSharedState}/>
    },
    {
      id: "model-training",
      label: "Model Training",
      element: <ModelTraining />,
    }
  ];

     

      const filteredQuickFeature = quickFeatures.filter(
    (f) =>
      f.title.toLowerCase().includes(query.toLowerCase()) ||
      f.description.toLowerCase().includes(query.toLowerCase())
  );
  return (
    <>
      <div className="flex flex-col h-full w-full overflow-hidden">
        <ScaleDown>
          <div className="space-y-6 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
              <div className=" text-primary h-10 w-10">
                <RocketIcon className="h-10 w-10"/>

              </div>
              <div className="space-y-2">
                <h1 className="text-3xl font-medium text-foreground">
                  Quick Start Your AI Journey
                </h1>
                <p className="text-sm dark:text-foreground text-black/60">
                  Deploy your use case in minutes by creating and training your
                  first model with our guided workflow
                </p>
              </div>
              </div>

              <Link href="#">
                <RippleButton>
                  <Button onClick={() => setIsModalOpen(true)} className="bg-sidebar-primary hover:bg-[#E64A19] text-white gap-3 rounded-full !px-6 !py-6 !cursor-pointer duration-300">
                    <PlusIcon />
                   Get Started
                  </Button>
                </RippleButton>
              </Link>
            </div>
            <div className="flex items-center gap-15 pl-4 mt-10">
<div className="relative w-[1px] h-85 bg-border-color-0 flex flex-col items-center justify-between text-white">
  <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center">1</div>
  <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center">2</div>
  <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center">3</div>
</div>
              

<div className="w-full">
            {filteredQuickFeature.length > 0 && (
                        //   <FadeUp delay={0.06}>
                            <div className="space-y-6">
                                {filteredQuickFeature.map((feature, index) => (
                                  <QuickCards key={index} {...feature} index={index} />
                                ))}
                            </div>
                        //   </FadeUp>
                        )}
                        </div>
                        </div>
          </div>
        </ScaleDown>
      </div>
      <StepFormModal
        title="Quick Start"
        open={isModalOpen}
              onOpenChange={setIsModalOpen}
        steps={manualSteps}
      />
    </>
  );
};

export default page;
