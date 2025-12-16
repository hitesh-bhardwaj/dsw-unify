"use client";
import React, { useState } from "react";
import { ScaleDown } from "@/components/animations/Animations";
import { SectionHeader } from "@/components/home/section-header";


const page = () => {
  return (
    <div className="flex flex-col h-full w-full overflow-hidden">
      <ScaleDown>
        <div className="space-y-6 p-6">
         
          <SectionHeader
            title="Settings"
            description="Configure your platform preferences and integrations"
          />
          <div className="h-[30vh] flex items-center justify-center ">
            <p className="text-sm text-foreground/80">Settings content coming soon...</p>

          </div>
         
        </div>
      </ScaleDown>
    </div>
  );
};

export default page;
