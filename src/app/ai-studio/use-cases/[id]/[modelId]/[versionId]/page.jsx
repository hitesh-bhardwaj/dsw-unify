"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { ScaleDown } from "@/components/animations/Animations";
import LeftArrowAnim from "@/components/animations/LeftArrowAnim";
import { RippleButton } from "@/components/ui/ripple-button";
import { Button } from "@/components/ui/button";
import AnimatedTabsSection from "@/components/common/TabsPane";
import Details from "@/components/usecases/versions/Details";
import Explainability from "@/components/usecases/versions/Explainability";
import Monitoring from "@/components/usecases/versions/Monitoring";
import { LineGraph, PlusIcon, Tune, RocketIcon } from "@/components/Icons";
import Inference from "@/components/usecases/versions/Inference";
import Link from "next/link";
import CountUp from "@/components/animations/CountUp";
import APIPage from "@/components/usecases/versions/APIPage";
import Lineage from "@/components/usecases/versions/Lineage";
import { getVersionById, toggleDeployStatus } from "@/lib/api/ai-studio";

const page = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("details");
  const [versionData, setVersionData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const params = useParams();
  const { id: routeId, modelId, versionId } = params;

  // Fetch version data on mount
  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        setError(null);

        const data = await getVersionById(routeId, modelId, versionId);
        setVersionData(data);
      } catch (err) {
        setError(err.message || "Failed to load version");
        console.error("Version error:", err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [routeId, modelId, versionId]);

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
      render: () => <Explainability />,
    },
    {
      id: "tab-monitoring",
      value: "monitoring",
      label: "Monitoring",
      name: "Monitoring",
      render: () => <Monitoring />,
    },
    {
      id: "tab-lineage",
      value: "lineage",
      label: "Lineage",
      name: "Lineage",
      render: () => <Lineage />,
    },
    {
      id: "tab-inference",
      value: "inference",
      label: "Inference",
      name: "Inference",
      render: () => <Inference />,
    },
    {
      id: "tab-api",
      value: "api",
      label: "API",
      name: "API",
      render: () => <APIPage />,
    },
  ];

  function slugToTitle(slug) {
    if (!slug) return "";

    return slug
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
  }

  const title = slugToTitle(modelId);
  const title2 = slugToTitle(versionId);

  const [deployStatus, setDeployStatus] = useState(versionData?.status || "Undeployed");
  const [isDeploying, setIsDeploying] = useState(false);

  // Update deploy status when version data loads
  useEffect(() => {
    if (versionData?.status) {
      setDeployStatus(versionData.status);
    }
  }, [versionData]);

  const handleDeployToggle = async () => {
    try {
      setIsDeploying(true);
      const action = deployStatus === "Deployed" ? "undeploy" : "deploy";

      const result = await toggleDeployStatus(routeId, modelId, versionId, action);

      setDeployStatus(result.status);
    } catch (err) {
      console.error("Deploy toggle error:", err);
    } finally {
      setIsDeploying(false);
    }
  };

  

  // Loading state
  if (isLoading) {
    return (
      <div className="flex flex-col h-full">
        <ScaleDown>
          <div className="bg-background p-6 space-y-8">
            <div className="flex items-center justify-between">
              <div className="flex gap-3">
                <LeftArrowAnim link={`/ai-studio/use-cases/${routeId}/${modelId}`} />
                <div className="space-y-1 w-full">
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-64 animate-pulse"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-96 animate-pulse"></div>
                </div>
              </div>
            </div>
            <div className="w-full flex items-center justify-between gap-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="flex flex-col gap-6 border border-border-color-0 rounded-3xl py-6 px-4 w-full dark:bg-card animate-pulse">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                </div>
              ))}
            </div>
          </div>
        </ScaleDown>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex flex-col h-full">
        <ScaleDown>
          <div className="bg-background p-6">
            <div className="p-4 text-center text-red-600 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="font-medium">Failed to load version details</p>
              <p className="text-sm mt-2">{error}</p>
            </div>
          </div>
        </ScaleDown>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col h-full">
        {/* Header */}
        <ScaleDown>
          <div className="bg-background p-6 space-y-8">
            <div className="flex items-center justify-between">
              <div className="flex gap-3">
                <LeftArrowAnim
                  link={`/ai-studio/use-cases/${routeId}/${modelId}`}
                />
                <div className="space-y-1">
                  <div className="flex gap-3 items-center">
                    <h1 className="text-xl font-medium">
                      {title} {title2}
                    </h1>

                    <div
                      className={`flex flex-wrap py-0.5 px-2 text-xs text-foreground rounded-full border ${
                        deployStatus === "Deployed"
                          ? "border-badge-green "
                          : "border-red-500 "
                      }`}
                    >
                      {deployStatus}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 pl-0.5 dark:text-foreground">
                    {versionData?.description}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Link href={`#`}>
                  <RippleButton>
                    <Button
                      onClick={handleDeployToggle}
                      disabled={isDeploying}
                      className="bg-sidebar-primary hover:bg-[#E64A19] text-white gap-3 rounded-full !px-6 !py-6 !cursor-pointer duration-300 disabled:opacity-50"
                    >
                      <RocketIcon className="text-white" />
                      {isDeploying ? "Processing..." : deployStatus === "Deployed" ? "Undeploy" : "Deploy"}
                    </Button>
                  </RippleButton>
                </Link>
              </div>
            </div>

            <div className="w-full  flex items-center justify-between gap-4">
              {versionData?.stats.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col gap-8 border border-border-color-0 rounded-3xl py-6 px-4 w-full dark:bg-card"
                >
                  <span className="text-sm text-foreground/80">
                    {item.title}
                  </span>
                  {item.title === "Accuracy" ? (
                    <span className="text-badge-green text-xl flex items-center gap-1">
                      <LineGraph className="w-5 h-5" />
                      <CountUp value={item.value} startOnView className={"font-medium"} />
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
