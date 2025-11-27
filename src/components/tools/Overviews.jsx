import React from "react";
import { Input } from "../ui/input";

const stats = [
  {
    title: "Type",
    value: "Api",
    isActive: false,
  },
  {
    title: "Category",
    value: "Search",
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
            className="flex flex-col gap-10 border border-border-color-1 rounded-lg py-6 px-4 w-full"
          >
            <span className="text-sm text-foreground/80">{item.title}</span>

            <div className="flex items-center gap-2">
              <span className="text-2xl font-medium">{item.value}</span>
              {item.isActive && (
                <span className="text-xs border border-badge-green px-3 py-1 rounded-full">
                  Active
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-6 border rounded-3xl p-6 border-border-color-1 h-full pb-8">
        {/* Query */}
        <div className="space-y-2">
          <h2 className="text-xl font-medium mb-6">Parameters</h2>
          <label className="text-sm font-medium text-foreground dark:text-foreground">
            Query
          </label>
          <div className="flex gap-2 mt-2">
            <Input
              placeholder="Search query"
              className="h-12 flex-1 !text-xs p-4 border-border-color-1 shadow-none text-foreground placeholder:text-foreground/80"
            />
          </div>
        </div>

        {/* Limit number */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground dark:text-foreground">
            Limit number
          </label>
          <div className="flex gap-2 mt-2">
            <Input
              placeholder="Number of results"
              className="h-12 flex-1 !text-xs p-4 border-border-color-1 shadow-none text-foreground placeholder:text-foreground/80"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overviews;
