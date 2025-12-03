"use client"
import { ScaleDown } from "@/components/animations/Animations";
import { DefineUseCasesIcon, PlusIcon, SelectDataIcon, TrainAndDeployIcon } from "@/components/Icons";
import SearchBar from "@/components/search-bar";
import { Button } from "@/components/ui/button";
import { RippleButton } from "@/components/ui/ripple-button";
import Link from "next/link";
import React, { useState } from "react";
import {
  SynthWave,
  DataExplorerIcon,
  DataVisualizationIcon,
} from "@/components/Icons";

import { QuickCards } from "@/components/AIstudio/QuickCards";

const quickFeatures = [
  {
    icon: DefineUseCasesIcon,
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
            <SearchBar
              placeholder="Search features..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />

            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <h1 className="text-3xl font-medium text-foreground">
                  Quick Start Your AI Journey
                </h1>
                <p className="text-sm dark:text-foreground text-black/60">
                  Deploy your use case in minutes by creating and training your
                  first model with our guided workflow
                </p>
              </div>

              <Link href="#">
                <RippleButton>
                  <Button className="bg-sidebar-primary hover:bg-[#E64A19] text-white gap-3 rounded-full !px-6 !py-6 !cursor-pointer duration-300">
                    <PlusIcon />
                   Get Started
                  </Button>
                </RippleButton>
              </Link>
            </div>

            {filteredQuickFeature.length > 0 && (
                        //   <FadeUp delay={0.06}>
                            <div className="space-y-6">
                        
                              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                {filteredQuickFeature.map((feature, index) => (
                                  <QuickCards key={index} {...feature} />
                                ))}
                              </div>
                            </div>
                        //   </FadeUp>
                        )}
          </div>
        </ScaleDown>
      </div>
    </>
  );
};

export default page;
