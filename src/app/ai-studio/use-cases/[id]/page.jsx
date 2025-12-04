"use client";
import React from "react";
import { useParams } from "next/navigation";
import { ScaleDown } from "@/components/animations/Animations";
import LeftArrowAnim from "@/components/animations/LeftArrowAnim";
import { RippleButton } from "@/components/ui/ripple-button";
import { Button } from "@/components/ui/button";
import { DataEngineeringIcon, SynthWave } from "@/components/Icons";
import { cn } from "@/lib/utils";
import UsecaseInternalCard from "@/components/usecases/UsecaseInternalCard";
import SearchBar from "@/components/search-bar";

import { Badge } from "@/components/ui/badge";
import { PlusIcon, Tune } from "@/components/Icons";
import Link from "next/link";

const page = () => {
  const { id } = useParams();
  const usecase = {
    id: id,
    name: "Claims Fraud Detection",
    description:
      "Identify fraudulent insurance claims using ML pattern recognition and anomaly detection",
    status: "active",
    tags: ["claims", "fraud detection", "auto insurance"],
    owner: "Shivam Thakkar",
    lastModified: "2 Hours Ago",
    usage: "1.2K Request",
    stats: [
      {
        title: "Owner",
        value: "Shivam Thakkar",
        description: "Use case owner",
      },
      {
        title: "Total Models",
        value: "4",
        description: "ML models in usecase",
      },
      { title: "Deployed", value: "3", description: "Models in production" },
    ],
    metrics: {
      totalRequests: "12,847",
      avgResponse: "245ms",
      successRate: "99.2%",
      activeUsers: "156",
    },
    health: {
      lastActivity: "2 minutes ago",
      errorRate: "0.8%",
      systemStatus: "operational",
    },
    recentActivity: [
      { type: "success", event: "API call completed", time: "2 minutes ago" },
      { type: "success", event: "User interaction", time: "5 minutes ago" },
      {
        type: "success",
        event: "Knowledge base query",
        time: "12 minutes ago",
      },
      { type: "error", event: "Guardrail triggered", time: "18 minutes ago" },
      { type: "success", event: "Model inference", time: "25 minutes ago" },
    ],
  };
  const modelsData = [
    {
      id: 1,
      ModelSlug:'fraud-detector',
      name: "Fraud Detector",
      icon: DataEngineeringIcon,
      description:
        "Advanced fraud detection using ensemble methods and anomaly detection",
      tags: ["fraud", "classification", "ensemble"],
      versions: 3,
      features: 28,
      status: "Deployed",
      lastUpdated: "January 16, 2025",
      createdAt: "2025-01-16",
      variant: "light",
    },
    {
      id: 2,
      name: "Claims Anomaly Detector",
    ModelSlug:'claims-anomaly-etector',

      icon: DataEngineeringIcon,
      description:
        "Unsupervised anomaly detection for suspicious claim patterns",
      ModelSlug:'unsupervised-anomaly-detection-for-suspicious-claim-patterns',
      tags: ["anomaly detection", "unsupervised"],
      versions: 2,
      features: 24,
      status: "Undeployed",
      lastUpdated: "January 12, 2025",
      createdAt: "2025-01-12",
      variant: "light",
    },
    {
      id: 3,
      name: "Fraud Risk Scorer",
      ModelSlug:'fraud-risk-scorer',
      icon: DataEngineeringIcon,
      description: "Risk scoring model for fraud probability assessment",
      tags: ["anomaly detection", "unsupervised"],
      versions: 4,
      features: 35,
      status: "Deployed",
      lastUpdated: "January 8, 2025",
      createdAt: "2025-01-08",
      variant: "light",
    },
    {
      id: 4,
      name: "Pattern Recognition Model",
      icon: DataEngineeringIcon,
      ModelSlug:'pattern-recognition-model',
      description: "Pattern recognition for identifying fraud indicators",
      tags: ["pattern recognition", "deep learning"],
      versions: 2,
      features: 32,
      status: "Deployed",
      lastUpdated: "January 5, 2025",
      createdAt: "2025-01-05",
      variant: "light",
    },
  ];

    const params = useParams();
  const { id: routeId, modelId } = params;
  function slugToTitle(slug) {
  if (!slug) return "";
  
  return slug
    .split("-")                
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))  
    .join(" ");                
}

    const title = slugToTitle(id);

  return (
    <>
      <div className="flex flex-col h-full">
        {/* Header */}
        <ScaleDown>
          <div className="bg-background p-6 space-y-8">
            <div className="flex items-center justify-between">
              <div className="flex gap-3">
                <LeftArrowAnim link={"/ai-studio/use-cases/"} />
                <div className="space-y-1">
                  <div className="flex gap-3 items-center">
                    <h1 className="text-xl font-medium">{usecase.name}</h1>

                    <div className="flex flex-wrap gap-1 ">
                      {usecase.tags.map((tag, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className={cn(
                            "rounded-full border border-color-2 px-3 py-1 bg-white dark:bg-background text-xs font-light transition-all duration-500 ease-out dark:group-hover:bg-background"
                          )}
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 pl-0.5 dark:text-foreground">
                    {usecase.description}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Link href={`#`}>
                  <RippleButton>
                    <Button className="bg-sidebar-primary hover:bg-[#E64A19] text-white gap-3 rounded-full !px-6 !py-6 !cursor-pointer duration-300">
                      <PlusIcon />
                      Create Model
                    </Button>
                  </RippleButton>
                </Link>
              </div>
            </div>
            <div className="w-full  flex items-center justify-between gap-4">
              {usecase.stats.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col gap-3 border border-border-color-1 rounded-lg py-6 px-4 w-full"
                >
                  <span className="text-sm text-foreground/80">
                    {item.title}
                  </span>
                  <span className="text-2xl font-medium mt-1">
                    {item.value}
                  </span>
                  <span className="text-xs font-normal">
                    {item.description}
                  </span>
                </div>
              ))}
            </div>
            <div className="space-y-4">
              <h2 className="text-2xl font-medium">Models</h2>

              <div className="flex gap-2">
                           <div className="relative flex-1">
                             <SearchBar
                               placeholder="Search by name, description, table or  features..."
                               onChange={(e) => setQuery(e.target.value)}
                             />
                           </div>
                           <RippleButton className={"rounded-lg "}>
                             <Button
                               variant="outline"
                               className="gap-2 w-36 border-border-color-1 text-foreground hover:bg-sidebar-accent duration-300 px-4 text-xs rounded-lg"
                             >
                               <div className="w-4 h-4">
                                 <Tune />
                               </div>
                               Filters
                             </Button>
                           </RippleButton>
                         </div>
            </div>
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-stretch">
              {modelsData.map((item) => (
                <UsecaseInternalCard key={item.id} usecase={item} slug={id} />
              ))}

              {modelsData.length === 0 && (
                <div className="flex h-64 items-center justify-center text-gray-500">
                  No Features found matching "{query}"
                </div>
              )}
            </div>
          </div>
        </ScaleDown>

        {/* API Modal */}
      </div>
    </>
  );
};

export default page;
