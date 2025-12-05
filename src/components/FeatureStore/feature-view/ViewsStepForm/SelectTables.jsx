"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { RippleButton } from "@/components/ui/ripple-button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { LeftArrow } from "@/components/Icons";

export default function SelectTables({ goNext, goBack }) {
  const tables = [
    { name: "Customers", columns: "12 column", rows: "1.2M rows" },
    { name: "Orders", columns: "12 column", rows: "1.2M rows" },
    { name: "Products", columns: "12 column", rows: "1.2M rows" },
    { name: "Transactions", columns: "12 column", rows: "1.2M rows" },
    { name: "User_events", columns: "12 column", rows: "1.2M rows" },
    { name: "Medical_records", columns: "12 column", rows: "1.2M rows" },
  ];

  const [selected, setSelected] = useState("Customers");

  return (
    <div className="space-y-2 pb-2 pr-2">
      {/* Title */}
      <h2 className="text-lg font-medium text-foreground">Select Tables</h2>
      <p className="text-xs text-foreground/80">
        Choose tables to automatically generate features from all columns
      </p>

      <RadioGroup
        value={selected}
        onValueChange={setSelected}
        className="grid grid-cols-3 gap-4 pt-5"
      >
        {tables.map((item) => (
          <label
            key={item.name}
            className={`border border-border-color-1 rounded-2xl p-4 cursor-pointer transition-all
                flex flex-col justify-between h-24
                ${
                  selected === item.name
                    ? " bg-sidebar-accent"
                    : "bg-white dark:bg-sidebar-accent"
                }`}
          >
            <div className="flex items-center gap-2">
              <RadioGroupItem
                value={item.name}
                className="text-primary checked:bg-primary"
              />
              <span
                className={`text-sm font-medium ${
                  selected === item.name
                    ? "text-sidebar-primary"
                    : "text-foreground"
                }`}
              >
                {item.name}
              </span>
            </div>

            <div className="flex justify-between pl-6 text-xs text-foreground/80 pt-2">
              <span>{item.columns}</span>
              <span>{item.rows}</span>
            </div>
          </label>
        ))}
      </RadioGroup>

      {/* Footer Buttons */}
      <div className="w-full flex justify-end gap-2 pt-6">
        <RippleButton>
          <Button
            variant="outline"
            className="gap-2 border-border-color-1 text-foreground hover:bg-gray-50 w-fit px-7"
            onClick={goBack}
          >
            Back
          </Button>
        </RippleButton>

        <RippleButton>
          <Button
            className="bg-sidebar-primary hover:bg-primary text-white gap-3 rounded-full px-6 py-6 cursor-pointer duration-300"
            onClick={goNext}
          >
            Start Creation
            <div className="w-4 h-auto">
              <LeftArrow className="rotate-180" />
            </div>
          </Button>
        </RippleButton>
      </div>
    </div>
  );
}
