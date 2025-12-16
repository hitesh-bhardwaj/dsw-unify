"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function ToolsConfigure() {
  return (
    <div className="h-full rounded-3xl bg-white border border-border-color-0 p-6 space-y-4 dark:bg-card">
      {/* Tool Name */}
      <div className="space-y-2">
        <p className="text-sm text-muted-foreground">Tool Name</p>
        <h2 className="text-2xl font-medium">Web Search</h2>
      </div>

      {/* Description */}
      <div className="flex flex-col gap-2">
        <label className="text-sm   text-foreground">
          Description
        </label>
        <Textarea
          placeholder="Internal company policies and procedures"
          className="min-h-[120px] resize-none border-border-color-0 shadow-none text-sm placeholder:text-muted-foreground dark:!bg-card"
        />
      </div>

      {/* End Point */}
      <div className="flex flex-col gap-2">
        <label className="text-sm text-foreground">
          End Point
        </label>
        <Input
          placeholder="https://api.search.com/v1/search"
          className="h-12 border-border-color-0 shadow-none text-sm placeholder:text-muted-foreground"
        />
      </div>

      {/* Method */}
      <div className="flex flex-col gap-2">
        <label className="text-sm  text-foreground">
          Method
        </label>
        <p className="text-sm text-muted-foreground">GET</p>
      </div>
    </div>
  );
}
