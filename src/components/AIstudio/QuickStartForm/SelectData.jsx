"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { RippleButton } from "@/components/ui/ripple-button";
import { LeftArrow, SparklesIcon } from "@/components/Icons";
import { Checkbox } from "@/components/ui/checkbox";

export default function SelectData({ goNext, goBack, sharedState, setSharedState }) {
  const tables = [
    { name: "Customers", columns: "12 column", rows: "1.2M rows" },
    { name: "Orders", columns: "12 column", rows: "1.2M rows" },
    { name: "Products", columns: "12 column", rows: "1.2M rows" },
    { name: "Transactions", columns: "12 column", rows: "1.2M rows" },
    { name: "User_events", columns: "12 column", rows: "1.2M rows" },
    { name: "Medical_records", columns: "12 column", rows: "1.2M rows" },
  ];

  // const [selectedTables, setSelectedTables] = useState(["Customers"]);
  const selectedTables = sharedState?.selectedTables || ["Customers"];

  // const toggleTable = (tableName) => {
  //   setSelectedTables((prev) =>
  //     prev.includes(tableName)
  //       ? prev.filter((name) => name !== tableName)
  //       : [...prev, tableName]
  //   );
  // };

  const toggleTable = (tableName) => {
    const newSelectedTables = selectedTables.includes(tableName)
      ? selectedTables.filter((name) => name !== tableName)
      : [...selectedTables, tableName];
    
    setSharedState({ ...sharedState, selectedTables: newSelectedTables });
  };


  return (
    <div className="space-y-2 pb-2 pr-2">
      {/* Title */}
      <h2 className="text-lg font-medium text-foreground">Select Tables</h2>
      <p className="text-xs text-foreground/80">
        Choose tables to automatically generate features from all columns
      </p>

      <div className="grid grid-cols-3 gap-4 pt-5">
        {tables.map((item) => {
          const isSelected = selectedTables.includes(item.name);
          
          return (
            <label
              key={item.name}
              className={`border rounded-lg p-4 cursor-pointer transition-all
                flex flex-col justify-between h-22 hover:bg-sidebar-accent
                ${
                  isSelected
                    ? "border-sidebar-primary "
                    : "border-border-color-0 bg-white dark:bg-sidebar-accent"
                }`}
            >
              <div className="flex items-center gap-2">
                <Checkbox
                  checked={isSelected}
                  onCheckedChange={() => toggleTable(item.name)}
                />
                <span
                  className={`text-sm font-medium ${
                    isSelected
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
          );
        })}
        
      </div>
      <div className="flex items-start gap-3 w-full border border-border-color-0  mt-5 rounded-lg p-4 py-2 cursor-pointer transition-all hover:bg-sidebar-accent">
        <div className="text-black h-10 w-10 rounded-xl bg-primary flex items-center justify-center">
          <SparklesIcon className="h-5 w-5 !text-white"/>
        </div>
      <div className=" space-y-1.5 
                flex flex-col justify-between h-full ">
                  <div className="text-sm font-medium">Auto-Generated Features</div>
                  <p className="text-xs text-foreground/80" >All columns from 5 selected tables will be automatically converted to features</p>
                  <div className=" my-2 flex items-center gap-2">
                  {selectedTables.map((item, index) => (
  <div key={index} className="px-2.5 py-1 bg-sidebar-accent border border-border-color-0 rounded-xl w-fit">
    <p className="text-xs text-foreground/80">{item}</p>
  </div>
))}
           </div>
        </div>
        </div>

      {/* Footer Buttons */}
      <div className="w-full flex justify-end gap-2 pt-6">
        <RippleButton>
          <Button
            variant="outline"
            className="gap-2 border-border-color-0 text-foreground hover:bg-gray-50 w-fit px-7"
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