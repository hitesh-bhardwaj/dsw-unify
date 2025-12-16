"use client";

import React, { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

export default function SwitchPopover({ tool, onOpenConfig }) {
  const [enabled, setEnabled] = useState(false);

  return (
    <div className="border border-border-color-0 rounded-xl px-5 py-3 flex items-center justify-between bg-background w-full dark:bg-card">
      {/* LEFT SIDE */}
      <div className="flex items-center gap-4">
        <Switch
          checked={enabled}
          onCheckedChange={setEnabled}
          className="cursor-pointer"
        />

        <div>
          <h3 className="text-md font-medium">{tool.name}</h3>
          <p className="text-sm text-muted-foreground">{tool.description}</p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      {enabled && (
        <Button
          variant="outline"
          className="rounded-full border border-primary px-5 !h-10 py-0.5 text-sm dark:bg-transparent dark:border-primary"
          onClick={() => onOpenConfig(tool)}
        >
          Configure
        </Button>
      )}
    </div>
  );
}
