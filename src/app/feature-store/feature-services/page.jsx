"use client";
import { ScaleDown } from "@/components/animations/Animations";
import { FeatureServicesIcon, PlusIcon } from "@/components/Icons";
import SearchBar from "@/components/search-bar";
import { Button } from "@/components/ui/button";
import { RippleButton } from "@/components/ui/ripple-button";
import Link from "next/link";
import React, { useState } from "react";
import { Tune} from "@/components/Icons";
import { ViewCard } from "@/components/FeatureStore/view-card";
import StepFormModal from "@/components/common/StepModalForm";
import BasicInfo from "@/components/FeatureStore/feature-services/BasicInfo";
import SelectFeatureViews from "@/components/FeatureStore/feature-services/SelectFeatureViews";
import CountUp from "@/components/animations/CountUp";


const Features = [
  {
    id: 1,
    name: "Claims Fraud Detection Service",
    icon: FeatureServicesIcon,
    description:
      "Demographic features including age, location, credit score, marital status, and employment",
    tags: ["demographics", "policyholder", "underwriting"],
    // tags: [{ label: "demographics" }, { label: "age" }],
    featureNo: "18",
    lastUpdated: "2 days Ago",
    tablesCount: "2",
    variant: "light",
  },
  {
    id: 2,
    name: "Risk Assessment Service",
    icon: FeatureServicesIcon,
    description:
      "Historical claims features with aggregations including claim frequency, amounts, and types",
    tags: ["claims", "history", "fraud"],
    featureNo: "24",
    lastUpdated: "5 hours ago",
    tablesCount: "3",
    variant: "light",
  },
  {
    id: 3,
    name: "Customer Churn Prediction Service",
    icon: FeatureServicesIcon,
    description:
      "Policy-level features including coverage amounts, deductibles, premiums, and policy tenure",
    tags: ["policy", "coverage", "premium"],
    featureNo: "16",
    tablesCount: "2",
    lastUpdated: "1 day ago",
    variant: "light",
  },
  {
    id: 4,
    name: "Premium Pricing Service",
    icon: FeatureServicesIcon,
    description:
      "Auto insurance vehicle features including make, model, year, mileage, and safety ratings",
    tags: ["auto", "vehicle", "risk"],
    featureNo: "14",
    tablesCount: "2",
    lastUpdated: "3 Days Ago",

    variant: "light",
  },
  {
    id: 5,
    name: "Auto Insurance Underwriting Service",
    icon: FeatureServicesIcon,
    description:
      "Home insurance property features including type, age, construction, location risk, and security",
    tags: ["property", "home", "risk"],
    featureNo: "20",
    tablesCount: "3",
    lastUpdated: "1 week ago",

    variant: "light",
  },
   {
    id: 6,
    name: "Home Insurance Underwriting Service",
    icon: FeatureServicesIcon,
    description:
      "Comprehensive risk assessment features including driving record, credit score, and location hazards",
    tags: ["risk", "underwriting", "assessment"],
    featureNo: "22",
    tablesCount: "4",
    lastUpdated: "4 days ago",

    variant: "light",
  },
  
];

const stats = [
  { title: "Total Feature Services", value: 6 },
  { title: "Total Featured Views", value: 21 },
  { title: "Total Fatures", value: 400 },
];

const page = () => {
  const [query, setQuery] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    const steps = [
    {
      id: "basic",
      label: "Basic Info",
      required: true,
      element: <BasicInfo setIsModalOpen={setIsModalOpen} />,
    },
    {
      id: "logic",
      label: "Select Views",
      required: false,
      element: <SelectFeatureViews/>
    },
  ];
  

  const filteredFeatures = Features.filter((feature) =>
    feature.name.toLowerCase().includes(query.toLowerCase())
  );
  return (
    <>
      <div className="flex flex-col h-full w-full overflow-hidden">
        <ScaleDown>
          <div className="space-y-6 p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <h1 className="text-3xl font-medium text-foreground">
                  Feature Services
                </h1>
                <p className="text-sm dark:text-foreground text-black/60">
                  Group feature views for model consumption
                </p>
              </div>

              <Link href="#">
                <RippleButton>
                  <Button
                  onClick={() => setIsModalOpen(true)}
                   className="bg-sidebar-primary hover:bg-[#E64A19] text-white gap-3 rounded-full !px-6 !py-6 !cursor-pointer duration-300">
                    <PlusIcon />
                    Create Feature Service
                  </Button>
                </RippleButton>
              </Link>
            </div>

            <div className="w-full  flex items-center justify-between gap-4">
              {stats.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col gap-6 border border-border-color-1 rounded-lg py-6 px-4 w-full"
                >
                  <span className="text-sm text-foreground/80">
                    {item.title}
                  </span>
                  <span className="text-4xl font-medium mt-2">
                    <CountUp value={item.value} startOnView/>
                  </span>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <SearchBar
                  placeholder="Search by name, description, table or  features..."
                  value={query}
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

            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-stretch">
              {filteredFeatures.map((feature) => (
                <ViewCard key={feature.id} feature={feature} />
              ))}
              {filteredFeatures.length === 0 && (
                <div className="flex h-64 items-center justify-center text-gray-500">
                  No Features found matching "{query}"
                </div>
              )}
            </div>
          </div>
        </ScaleDown>
      </div>

       <StepFormModal
              title="Create Feature Service"
              open={isModalOpen}
              onOpenChange={setIsModalOpen}
              steps={steps}
            />
    </>
  );
};

export default page;
