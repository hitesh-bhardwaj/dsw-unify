"use client";
import React from "react";
import { useParams } from "next/navigation";
import { ScaleDown } from "@/components/animations/Animations";
import LeftArrowAnim from "@/components/animations/LeftArrowAnim";
import { RippleButton } from "@/components/ui/ripple-button";
import { Button } from "@/components/ui/button";
import { SynthWave } from "@/components/Icons";
import { cn } from "@/lib/utils";
import VersionUsecaseCard from "@/components/usecases/VersionUsecaseCard";
import SearchBar from "@/components/search-bar";

import { Badge } from "@/components/ui/badge";
import { EditIcon, PlusIcon, Tune } from "@/components/Icons";
import Link from "next/link";
import CardDetails from "@/components/CardDetails";

const page = () => {
  const { id } = useParams();

  const versions = [
  {
    id: 1,
    name: "V3",
    versionSlug:'version-3',
    icon: SynthWave,
    description: "Latest version with improved ensemble methods and feature engineering",
    tags: ["fraud", "classification", "ensemble"],
    versions: 3,
    features: 28,
    status: "Deployed",
    accuracy: "96.3%",
    lastUpdated: "January 16, 2025",
    createdAt: "2025-01-16",
    variant: "light",
  },
  {
    id: 2,
    name: "V2",
    versionSlug:'version-2',
    icon: SynthWave,
    description: "Previous production version with gradient boosting",
    tags: ["fraud", "classification"],
    versions: 2,
    features: 25,
    status: "Undeploy",
    accuracy: "96.3%",
    lastUpdated: "January 10, 2025",
    createdAt: "2025-01-10",
    variant: "light",
  },
  {
    id: 3,
    name: "V1",
    versionSlug:'version-1',
    icon: SynthWave,
    description: "Initial version with basic random forest classifier",
    tags: ["fraud", "classification", "baseline"],
    versions: 1,
    features: 20,
    status: "Undeploy",
    accuracy: "96.3%",
    lastUpdated: "January 10, 2025",
    createdAt: "2025-01-10",
    variant: "light",
  }
];


  const versionsData = {
    id: id,
    name: "Fraud Detector",
    description:
      "Advanced fraud detection using ensemble methods and anomaly detection",
    status: "active",
    tags: ["fraud", "classification", "ensemble"],
    owner: "Shivam Thakkar",
    lastModified: "2 Hours Ago",
    usage: "1.2K Request",
    stats: [
      {
        title: "Owner",
        value: "Shivam Thakkar",
        description: "Model owner",
      },
      {
        title: "Total Versions",
        value: "3",
        description: "model versions",
      },
      { title: "Undeploy", value: "3", description: "Versions in production" },
    ],
    metrics: {
      totalRequests: "12,847",
      avgResponse: "245ms",
      successRate: "99.2%",
      activeUsers: "156",
    },
   
    
  };
 

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
                    <h1 className="text-xl font-medium">{versionsData.name}</h1>

                    <div className="flex flex-wrap gap-1 ">
                      {versionsData.tags.map((tag, index) => (
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
                    {versionsData.description}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Link href={`#`}>
                  <RippleButton>
                    <Button className="bg-sidebar-primary hover:bg-[#E64A19] text-white gap-3 rounded-full !px-6 !py-6 !cursor-pointer duration-300">
                      <PlusIcon />
                      Create Version
                    </Button>
                  </RippleButton>
                </Link>
              </div>
            </div>
            <CardDetails data={versionsData.stats} />

            <div className="space-y-4">
              <h2 className="text-2xl font-medium">Versions</h2>

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
              {versions.map((item) => (
                <VersionUsecaseCard key={item.id} usecase={item} />
              ))}

              {versions.length === 0 && (
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
