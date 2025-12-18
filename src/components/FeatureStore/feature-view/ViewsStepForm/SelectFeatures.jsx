"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { RippleButton } from "@/components/ui/ripple-button";
import { LeftArrow } from "@/components/Icons";
import { Trash2, ChevronRight } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

export default function SelectFeatures({ goNext, goBack, isLastStep, stepId }) {
  const [availableTables] = useState([
    {
      name: "TRANSACTIONS",
      columns: [
        { id: "transaction_id", name: "transaction_id", type: "string" },
        { id: "order_id", name: "order_id", type: "string" },
        { id: "payment_method", name: "payment_method", type: "string" },
        { id: "status", name: "status", type: "string" },
        { id: "transaction_id2", name: "transaction_id", type: "string" },
        { id: "order_id2", name: "order_id", type: "string" },
        { id: "payment_method2", name: "payment_method", type: "string" },
        { id: "status2", name: "status", type: "string" },
      ],
    },
  ]);

  const [selectedFeatures, setSelectedFeatures] = useState([
    {
      id: 1,
      table: "Transactions",
      column: "transaction_id",
      featureName: "transactions_transaction_id",
    },
    {
      id: 2,
      table: "Transactions",
      column: "payment_method",
      featureName: "transactions_payment_method",
    },
  ]);

  const [selectedColumns, setSelectedColumns] = useState([
    "transaction_id",
    "payment_method",
  ]);

  const toggleColumnSelection = (columnId) => {
    if (selectedColumns.includes(columnId)) {
      setSelectedColumns(selectedColumns.filter((id) => id !== columnId));
      setSelectedFeatures(
        selectedFeatures.filter((feature) => feature.column !== columnId)
      );
    } else {
      setSelectedColumns([...selectedColumns, columnId]);
      setSelectedFeatures([
        ...selectedFeatures,
        {
          id: selectedFeatures.length + 1,
          table: "Transactions",
          column: columnId,
          featureName: `transactions_${columnId}`,
        },
      ]);
    }
  };

  const removeFeature = (id) => {
    const feature = selectedFeatures.find((f) => f.id === id);
    if (!feature) return;

    setSelectedColumns(
      selectedColumns.filter((col) => col !== feature.column)
    );
    setSelectedFeatures(selectedFeatures.filter((f) => f.id !== id));
  };

  const updateFeatureName = (id, value) => {
    setSelectedFeatures((prev) =>
      prev.map((feature) =>
        feature.id === id
          ? { ...feature, featureName: value }
          : feature
      )
    );
  };

  const handleNext = () => {
    if (selectedFeatures.length === 0) return;
    goNext();
  };

  return (
    <div className="space-y-2 pr-2">
      <h2 className="text-lg font-medium text-foreground">Select Features</h2>
      <p className="text-xs text-foreground/80">
        Choose columns and apply transformations
      </p>

      <div className="grid grid-cols-2 gap-6 pt-4">
        {/* LEFT */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">
            Available Columns
          </h3>

          {availableTables.map((table, index) => (
            <div
              key={index}
              className="border border-border-color-0 rounded-lg p-4"
            >
              <h4 className="text-sm font-medium mb-3">{table.name}</h4>

              <div className="space-y-2 max-h-[280px] overflow-y-auto">
                {table.columns.map((column) => {
                  const isSelected = selectedColumns.includes(column.id);

                  return (
                    <div
                      key={column.id}
                      className="border rounded-lg border-border-color-0 p-3 cursor-pointer w-[95%]"
                      onClick={() => toggleColumnSelection(column.id)}
                    >
                      <div className="flex items-center gap-3">
                        <Checkbox
                          checked={isSelected}
                          onCheckedChange={() =>
                            toggleColumnSelection(column.id)
                          }
                          onClick={(e) => e.stopPropagation()}
                          className="data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
                        />

                        <div className="flex-1">
                          <p
                            className={`text-sm font-medium ${
                              isSelected
                                ? "text-orange-500"
                                : "text-foreground"
                            }`}
                          >
                            {column.name}
                          </p>
                          <p className="text-xs text-foreground/60">
                            {column.type}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">
            Selected Features ({selectedFeatures.length})
          </h3>

          <div className="space-y-3 max-h-[600px] overflow-y-auto">
            {selectedFeatures.map((feature) => (
              <div
                key={feature.id}
                className="border border-border-color-0 rounded-lg p-4"
              >
                <div className="flex items-center gap-2 text-xs text-foreground/60 mb-3">
                  <span>{feature.table}</span>
                  <ChevronRight className="w-3 h-3" />
                  <span>{feature.column}</span>
                  <button
                    onClick={() => removeFeature(feature.id)}
                    className="ml-auto text-red-500 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/*  EDITABLE FEATURE NAME */}
                <Input
                  value={feature.featureName}
                  onChange={(e) =>
                    updateFeatureName(feature.id, e.target.value)
                  }
                  className="w-[85%] text-sm font-medium border-border-color-0"
                />
              </div>
            ))}

            {selectedFeatures.length === 0 && (
              <div className="border border-dashed border-border-color-0 rounded-lg p-8 text-center">
                <p className="text-sm text-foreground/60">
                  No features selected yet
                </p>
                <p className="text-xs text-foreground/40 mt-1">
                  Select columns from the left panel to add features
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="w-full flex justify-end gap-2 pt-4">
        <RippleButton>
          <Button
            variant="outline"
            onClick={goBack}
            className="gap-2 border-border-color-0 text-foreground hover:bg-gray-50 w-fit px-7"
          >
            Back
          </Button>
        </RippleButton>

        <RippleButton>
          <Button
            className="bg-sidebar-primary hover:bg-primary text-white gap-3 rounded-full px-6 py-6 cursor-pointer duration-300"
            onClick={handleNext}
            disabled={selectedFeatures.length === 0}
          >
            Next Step
            <div className="w-4 h-auto">
              <LeftArrow className="rotate-180" />
            </div>
          </Button>
        </RippleButton>
      </div>
    </div>
  );
}
