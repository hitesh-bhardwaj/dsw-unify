"use client";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import { ScaleDown } from "@/components/animations/Animations";
import LeftArrowAnim from "@/components/animations/LeftArrowAnim";
import { RippleButton } from "@/components/ui/ripple-button";
import { Button } from "@/components/ui/button";
import { SynthWave } from "@/components/Icons";
import { cn } from "@/lib/utils";
import VersionUsecaseCard from "@/components/usecases/VersionUsecaseCard";
import SearchBar from "@/components/search-bar";
import EmptyCard from "@/components/common/EmptyCard";
import AnimatedTabsSection from "@/components/common/TabsPane";
import { Badge } from "@/components/ui/badge";
import Details from "@/components/usecases/versions/Details";
import Explainability from "@/components/usecases/versions/Explainability";
import Monitoring from "@/components/usecases/versions/Monitoring";
import { LineGraph, PlusIcon, Tune, RocketIcon } from "@/components/Icons";
import Inference from "@/components/usecases/versions/Inference";
import Link from "next/link";
import CountUp from "@/components/animations/CountUp";

const page = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("details");

  const items = [
    {
      id: "tab-details",
      value: "details",
      label: "Details",
      name: "Details",
      render: () => <Details />,
    },
    {
      id: "tab-explainability",
      value: "explainability",
      label: "Explainability",
      name: "Explainability",
      render: () => (
        <Explainability />
      ),
    },
    {
      id: "tab-monitoring",
      value: "monitoring",
      label: "Monitoring",
      name: "Monitoring",
      render: () => (
        <Monitoring />
      ),
    },
    {
      id: "tab-lineage",
      value: "lineage",
      label: "Lineage",
      name: "Lineage",
      render: () => (
        <EmptyCard>No Lineage data available at this point</EmptyCard>
      ),
    },
    {
      id: "tab-inference",
      value: "inference",
      label: "Inference",
      name: "Inference",
      render: () => (
        <Inference />
      ),
    },
    {
      id: "tab-api",
      value: "api",
      label: "API",
      name: "API",
      render: () => (
        <EmptyCard  />
      ),
    },
  ];

  const versionsData = {
    id: id,
    name: "Fraud Detector V3",
    description:
      "Latest version with improved ensemble methods and feature engineering",
    status: "Deployed",
    owner: "Shivam Thakkar",
    lastModified: "2 Hours Ago",
    usage: "1.2K Request",
    stats: [
      { title: "Owner", value: "Shivam Thakkar" },
      { title: "Created", value: "January 16, 2025" },
      { title: "Updated", value: "January 16, 2025" },

      { title: "Accuracy", value: "96.3%" },
    ],
    metrics: {
      totalRequests: "12,847",
      avgResponse: "245ms",
      successRate: "99.2%",
      activeUsers: "156",
    },
  };
   const params = useParams();
const { id: routeId, modelId,versionId } = params;

function slugToTitle(slug) {
  if (!slug) return "";
  
  return slug
    .split("-")                
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))  
    .join(" ");                
}

    const title = slugToTitle(modelId);
    const title2 = slugToTitle(versionId);

  return (
    <>
      <div className="flex flex-col h-full">
        {/* Header */}
        <ScaleDown>
          <div className="bg-background p-6 space-y-8">
            <div className="flex items-center justify-between">
              <div className="flex gap-3">
                <LeftArrowAnim link={`/ai-studio/use-cases/${routeId}/${modelId}`}/>
                <div className="space-y-1">
                  <div className="flex gap-3 items-center">
                    <h1 className="text-xl font-medium">{title} {title2}</h1>

                    <div className="flex flex-wrap py-0.5  px-2 border border-badge-green text-xs rounded-full">{versionsData.status}</div>
                  </div>
                  <p className="text-sm text-gray-600 pl-0.5 dark:text-foreground">
                    {versionsData.description}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Link href={`#`}>
                  <RippleButton>
                    <Button className="bg-sidebar-primary hover:bg-[#E64A19] text-white gap-3 rounded-full !px-6 !py-6 !cursor-pointer duration-300">
                      <RocketIcon className="text-white" />
                      Undeploy
                    </Button>
                  </RippleButton>
                </Link>
              </div>
            </div>

            <div className="w-full  flex items-center justify-between gap-4">
              {versionsData.stats.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col gap-6 border border-border-color-1 rounded-lg py-6 px-4 w-full"
                >
                  <span className="text-sm text-foreground/80">
                    {item.title}
                  </span>
                  {item.title === "Accuracy" ? (
                    <span className="text-badge-green text-xl flex items-center gap-1">
                      <LineGraph className="w-5 h-5" />
                      <CountUp value={item.value} startOnView/>
                    </span>
                  ) : (
                    <span className="text-xl font-medium mt-2">
                      {item.value}
                    </span>
                  )}
                </div>
              ))}
            </div>
            <div className="space-y-4">
              <AnimatedTabsSection
                items={items}
                ctx={{}}
                onValueChange={setActiveTab}
                defaultValue="details"
              />
            </div>
          </div>
        </ScaleDown>

        {/* API Modal */}
      </div>
    </>
  );
};

export default page;
