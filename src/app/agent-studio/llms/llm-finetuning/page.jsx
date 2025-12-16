"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";
import { UploadIcon } from "@/components/Icons";
import LeftArrowAnim from "@/components/animations/LeftArrowAnim";
import { RippleButton } from "@/components/ui/ripple-button";
import AnimatedTabsSection from "@/components/common/TabsPane";
import EmptyCard from "@/components/common/EmptyCard";
import DatasetsGrid from "@/components/llmtuning/datasets-grid";
import TrainingJobsGrid from "@/components/llmtuning/training-jobs-grid";
import { ScaleDown } from "@/components/animations/Animations";
import ModelsGrid from "@/components/llmtuning/models-grid";
import InferenceGrid from "@/components/llmtuning/inference-grid";

const datasets = [
  {
    id: "customer-support-dataset",
    name: "Customer Support Dataset",
    description: "Training data for customer service interactions",
    tags: [
      { label: "Alpaca", color: "mint" },
      { label: "2.3 MB", color: "transparent" },
    ],
    records: "1,250",
    createdBy: "15/01/2024",
    variant: "light",
  },
  {
    id: "technical-documentation",
    name: "Technical Documentation",
    description: "Internal technical documentation for fine-tuning",
    tags: [
      { label: "Chat", color: "yellow" },
      { label: "5.7 MB", color: "transparent" },
    ],
    records: "3400",
    createdBy: "10/01/2024",
    variant: "light",
  },
];
const TrainingJobs = [
  {
    id: "customer-support-v1",
    name: "Customer-Support-v1",
    description: "Customer support model training",
    tags: [{ label: "Completed", color: "green" }],
    progress: "1000/1000",
    isCompleted:false,
    successRate: "100%",
    loss: "0.23",
    width: "w-[100%]",
    date: "22/01/2024",
  },
  {
    id: "tech-assistant-v2",
    name: "Tech-Assistant-v2",
    isCompleted:true,
    description: "Technical assistant model training",
    tags: [{ label: "Running", color: "blue" }],
    progress: "450/800",
    successRate: "56.3%",
    loss: "0.45",
    width: "w-[56.3%]",
    date: "22/01/2024",
  },
];
const Models = [
  {
    id: "customer-support-v1",
    name: "Customer-Support-v1",
    description: "Customer support model training",
    tags: [
      { label: "Deployed", color: "green" },
    ],
    records: "1,250",
    createdBy: "20/01/2024",
    response:"1.2s",
    variant: "light",
    deployed:true
  },
  {
    id: "tech-assistant-v2",
    name: "tech-assistant-v2",
    description: "Technical assistant model",
    tags: [
      { label: "Ready", color: "transparent" },
    ],
    records: "3400",
    createdBy: "22/01/2024",
    response:"-",
    variant: "light",
     deployed:false
  },
];


export default function LLMFineTuning() {
  const [datasetsState, setDatasetsState] = useState(datasets);
  const [modelsState, setModelsState] = useState(Models);

const handleDeleteModel = (id) => {
  setModelsState((prev) => prev.filter((m) => m.id !== id));
};


  const handleDeleteDataset = (id) => {
   setDatasetsState((prev) => prev.filter((d) => d.id !== id));
 };
   const items = [
    {
      id: "datasets",
      value: "datasets",
      label: "Datasets",
      name: "Datasets",
      render: () =>
          <DatasetsGrid items={datasetsState} onDelete={handleDeleteDataset}/>   
    },
    {
      id: "training-jobs",
      value: "training-jobs",
      label: "Training Jobs",
      name: "Training Jobs",
     render: () =>
          <TrainingJobsGrid items={TrainingJobs}/>
    },
    {
      id: "models",
      value: "models",
      label: "Models",
      name: "Models",
     render: () =>
         <ModelsGrid items={modelsState} onDelete={handleDeleteModel}/>
    },
    {
      id: "inference",
      value: "inference",
      label: "Inference",
      name: "Inference",
     render: () =>
          <InferenceGrid/>
    }
  ];
  return (
    <div className="flex flex-col h-full w-full overflow-hidden">
      <ScaleDown>
      <div className="space-y-6 p-6">
        {/* Title and CTA */}
        {/* <FadeUp> */}
          <div className="flex items-center justify-between mb-10">
            <div className="w-fit flex gap-2">
              <LeftArrowAnim link={"/agent-studio/llms"} />
              <div className="space-y-2">
                <h1 className="text-2xl font-medium text-foreground">
                  LLM Finetuning
                </h1>
                <p className="mt-1 text-sm text-gray-600 dark:text-foreground">
                  Manage datasets, train custom models, and deploy them for
                  inference
                </p>
              </div>
            </div>
            <RippleButton>
              <Link href="#">
                <Button className="bg-sidebar-primary hover:bg-[#E64A19] text-white gap-3 rounded-full !px-6 !py-6 !cursor-pointer duration-300">
                  <div className="w-4 h-4">
                    <UploadIcon />
                  </div>
                  Upload Dataset
                </Button>
              </Link>
            </RippleButton>
          </div>
        {/* </FadeUp> */}
        {/* <FadeUp delay={0.04}> */}
              <AnimatedTabsSection
               items={items}
                  // ctx={ctx}
                  defaultValue="datasets"/>
                  {/* </FadeUp> */}
      </div>
      </ScaleDown>
    </div>
  );
}
