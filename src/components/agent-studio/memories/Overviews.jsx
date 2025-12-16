import React from "react";
import CountUp from "@/components/animations/CountUp";

const stats = [
  {
    title: "Total Entries",
    value: "1250",
    isActive: false,
  },
  {
    title: "Type",
    value: "Session",
    isActive: false,
  },
  {
    title: "Scope",
    value: "User",
    isActive: false,
  },
  {
    title: "Status",
    value: "Active",
    isActive: true,
  },
];


const Overviews = () => {
  return (
    <div className="space-y-6">
      <div className="w-full flex items-center justify-between gap-4">
        {stats.map((item, index) => (
          <div
            key={index}
            className="flex flex-col gap-8 border border-border-color-0 rounded-3xl py-4 px-4 w-full dark:bg-card"
          >
            <span className="text-sm text-foreground/80">{item.title}</span>

            <div className="flex items-center gap-2">
              <span className="text-2xl font-medium">

              {index==0 ?  <CountUp value={item.value} startOnView /> : `${item.value}` }                
              </span>
              {item.isActive && (
                <span className="text-xs border border-badge-green px-3 py-1 rounded-full">
                  Active
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="w-full border border-border-color-0 rounded-3xl px-4 py-8 space-y-8 dark:bg-card">
  <h2 className="text-xl font-medium text-foreground">Memory Statistics</h2>

  <div className="flex justify-between gap-6 pr-10">
    <div className="flex flex-col space-y-7">
      <span className="text-sm text-foreground/80">Storage Used</span>
      <span className="text-xl font-medium">2.4 MB</span>
    </div>

    <div className="flex flex-col space-y-7">
      <span className="text-sm text-foreground/80">Queries Today</span>
      <span className="text-xl font-medium">156</span>
    </div>

    <div className="flex flex-col space-y-7">
      <span className="text-sm text-foreground/80">Retrieval Accuracy</span>
      <span className="text-xl font-medium">98.2%</span>
    </div>

    <div className="flex flex-col space-y-7">
      <span className="text-sm text-foreground/80">Avg Query Time</span>
      <span className="text-xl font-medium">45ms</span>
    </div>
  </div>
</div>

    </div>
  );
};

export default Overviews;
