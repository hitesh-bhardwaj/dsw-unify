"use client";

import React, { useState, useEffect } from "react";
import { TablesIcon, LeftArrow } from "@/components/Icons";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { RippleButton } from "@/components/ui/ripple-button";

/**
 * Step 2: Training Configuration
 */
export default function TrainingConfiguration({
  data,
  onDataChange,
  goNext,
  goBack,
}) {
  const [modelName, setModelName] = useState(data?.modelName || "");
  const [processType, setProcessType] = useState(data?.processType || "");
  const [description, setDescription] = useState(data?.description || "");

  // Sync state upward
  useEffect(() => {
    onDataChange?.({
      ...data,
      modelName,
      processType,
      description,
    });
  }, [modelName, processType, description]);

  const serviceMeta = {
    claims: {
      title: "Claims Fraud Detection Service",
      views: 3,
      features: 64,
    },
    risk: {
      title: "Risk Assessment Service",
      views: 4,
      features: 76,
    },
    churn: {
      title: "Customer Churn Prediction Service",
      views: 3,
      features: 46,
    },
  }[data?.selectedService];

  const renderParametersComponent = () => {
    if (!processType) return null;

    const componentsMap = {
      classification: (
        <ClassificationRegressionParams type="classification" />
      ),
      regression: <ClassificationRegressionParams type="regression" />,
      anomaly: <AnomalyDetectionParams />,
    };

    return (
      <div className="space-y-4 mt-6 p-6 border border-border-color-0 rounded-lg bg-background">
        <h3 className="text-base font-medium text-foreground">
          Training Parameters
        </h3>
        {componentsMap[processType]}
      </div>
    );
  };

  return (
    <div className="space-y-8 pb-2 px-5">
      {/* Header */}
      <div>
        <h2 className="text-lg font-medium text-foreground">
          Training Configuration
        </h2>
        <p className="text-sm text-foreground/80 mt-1">
          Configure your model training parameters
        </p>
      </div>

      {/* Selected Feature Service */}
      {serviceMeta && (
        <div className="rounded-xl border border-border-color-0 bg-background p-5 flex items-start gap-4">
          <div className="h-10 w-10 rounded-lg flex items-center justify-center">
            <TablesIcon className="h-5 w-5 text-primary" />
          </div>

          <div className="flex-1">
            <p className="text-sm font-medium">Selected Feature Service</p>
            <p className="text-sm text-muted-foreground">
              {serviceMeta.title}
            </p>

            <div className="flex gap-3 mt-3">
              <span className="px-3 py-1 text-xs rounded-full border border-border-color-0 bg-sidebar-accent">
                {serviceMeta.views} Feature Views
              </span>
              <span className="px-3 py-1 text-xs rounded-full border border-border-color-0 bg-sidebar-accent">
                {serviceMeta.features} Features
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Model Name */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Model Name </label>
          <Input
            placeholder="e.g., Fraud Detector v1"
            value={modelName}
            onChange={(e) => setModelName(e.target.value)}
          />
        </div>

        {/* Modeling Process */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">
            Modeling Process *
          </label>
          <Select value={processType} onValueChange={setProcessType}>
            <SelectTrigger className="w-full border border-border-color-0 cursor-pointer !h-10">
              <SelectValue placeholder="Select process type" />
            </SelectTrigger>
            <SelectContent className="border border-border-color-0">
              <SelectItem className="cursor-pointer" value="classification">
                Classification
              </SelectItem>
              <SelectItem className="cursor-pointer" value="regression">
                Regression
              </SelectItem>
              <SelectItem className="cursor-pointer" value="anomaly">
                Anomaly Detection
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Description */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Model Description</label>
        <Textarea
          placeholder="Describe what this model does and its purpose..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="min-h-[120px]"
        />
      </div>

      {/* Dynamic Parameters */}
      {renderParametersComponent()}

      {/* Footer Buttons */}
      <div className="w-full flex justify-end gap-2 pt-6">
        <RippleButton>
          <Button
            variant="outline"
            className="gap-2 border-border-color-0 text-foreground w-fit px-7"
            onClick={goBack}
          >
            Back
          </Button>
        </RippleButton>

        <RippleButton>
          <Button
            className="bg-sidebar-primary hover:bg-primary text-white gap-3 rounded-full px-6 py-6 cursor-pointer duration-300"
            onClick={goNext}
            disabled={!modelName || !processType}
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



const ClassificationRegressionParams = ({ type }) => {
  const [targetVariable, setTargetVariable] = useState("");
  const [evaluationMetric, setEvaluationMetric] = useState("");
  const [trainTestSplit, setTrainTestSplit] = useState("80");
  const [crossValidationFolds, setCrossValidationFolds] = useState("5");

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-2 w-full">
        <label className="text-sm text-foreground">
          Target Variable *
        </label>
        <Select value={targetVariable} onValueChange={setTargetVariable}>
          <SelectTrigger className="!h-10 cursor-pointer border-border-color-0 w-full">
            <SelectValue placeholder="Select target variable" />
          </SelectTrigger>
          <SelectContent className="border border-border-color-0">
            <SelectItem value="customer_id">customer_id</SelectItem>
            <SelectItem value="order_amount">order_amount</SelectItem>
            <SelectItem value="transaction_status">
              transaction_status
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2 w-full">
        <label className="text-sm text-foreground">
          Evaluation Metric
        </label>
        <Select
          value={evaluationMetric}
          onValueChange={setEvaluationMetric}
        >
          <SelectTrigger className="!h-10 cursor-pointer border-border-color-0 w-full">
            <SelectValue placeholder="Select metric" />
          </SelectTrigger>
          <SelectContent className="border border-border-color-0">
            {type === "classification" ? (
              <>
                <SelectItem value="accuracy">Accuracy</SelectItem>
                <SelectItem value="precision">Precision</SelectItem>
                <SelectItem value="recall">Recall</SelectItem>
                <SelectItem value="f1">F1 Score</SelectItem>
              </>
            ) : (
              <>
                <SelectItem value="rmse">RMSE</SelectItem>
                <SelectItem value="mae">MAE</SelectItem>
                <SelectItem value="r2">R²</SelectItem>
              </>
            )}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label className="text-sm text-foreground">
          Train/Test Split (%)
        </label>
        <Input
          type="number"
          value={trainTestSplit}
          onChange={(e) => setTrainTestSplit(e.target.value)}
          className="h-10 border-border-color-0"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm text-foreground">
          Cross-Validation Folds
        </label>
        <Input
          type="number"
          value={crossValidationFolds}
          onChange={(e) =>
            setCrossValidationFolds(e.target.value)
          }
          className="h-10 border-border-color-0"
        />
      </div>
    </div>
  );
};

const AnomalyDetectionParams = () => {
  const [evaluationMetric, setEvaluationMetric] = useState("");
  const [trainTestSplit, setTrainTestSplit] = useState("80");
  const [crossValidationFolds, setCrossValidationFolds] = useState("5");

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-2">
        <label className="text-sm text-foreground">
          Evaluation Metric
        </label>
        <Select
          value={evaluationMetric}
          onValueChange={setEvaluationMetric}
        >
          <SelectTrigger className="!h-10 cursor-pointer border-border-color-0 w-full">
            <SelectValue placeholder="Select metric" />
          </SelectTrigger>
          <SelectContent className="border border-border-color-0">
            <SelectItem value="precision">Precision</SelectItem>
            <SelectItem value="recall">Recall</SelectItem>
            <SelectItem value="f1">F1 Score</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label className="text-sm text-foreground">
          Train/Test Split (%)
        </label>
        <Input
          type="number"
          value={trainTestSplit}
          onChange={(e) => setTrainTestSplit(e.target.value)}
          className="h-10 border-border-color-0"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm text-foreground">
          Cross-Validation Folds
        </label>
        <Input
          type="number"
          value={crossValidationFolds}
          onChange={(e) =>
            setCrossValidationFolds(e.target.value)
          }
          className="h-10 border-border-color-0"
        />
      </div>
    </div>
  );
};
