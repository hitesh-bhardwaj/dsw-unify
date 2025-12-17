"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { RippleButton } from "@/components/ui/ripple-button";
import { LeftArrow, SparklesIcon } from "@/components/Icons";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";


// Main Component
export default function ConfigureModel({ goNext, goBack, isLastStep, stepId, sharedState  }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [modelingProcess, setModelingProcess] = useState("");
  const [errors, setErrors] = useState({});
  const selectedTables = sharedState?.selectedTables || [];

  const validate = () => {
    let valid = true;
    let newErrors = { name: "", modelingProcess: "" };

    if (!name.trim()) {
      newErrors.name = "Model Name is required";
      valid = false;
    }

    if (!modelingProcess) {
      newErrors.modelingProcess = "Modeling Process is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleNext = () => {
    if (!validate()) return;
    goNext();
  };

  // Render the appropriate parameters component
  const renderParametersComponent = () => {
    if (!modelingProcess) return null;

    const componentsMap = {
      classification: <ClassificationRegressionParams type="classification" />,
      regression: <ClassificationRegressionParams type="regression" />,
      recommendation: <RecommendationParams />,
      timeseries: <TimeSeriesParams />,
      clustering: <ClusteringParams />,
      anomaly: <AnomalyDetectionParams />,
    };

    return (
      <div className="space-y-4 mt-6 p-6 border border-border-color-0 rounded-lg bg-background">
        <h3 className="text-base font-medium text-foreground">Training Parameters</h3>
        {componentsMap[modelingProcess]}
      </div>
    );
  };

  return (
    <div className="space-y-2 pb-10 pr-2">
      {/* TITLE */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-lg font-medium text-foreground">Configure Models</h2>
          <p className="text-xs text-foreground/80">
            Configure your model training parameters
          </p>
        </div>
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

      {/* FORM */}
      <div className="space-y-4">
        <div className="flex items-start justify-start gap-3">
          <div className="space-y-2 w-1/2">
            <label className="text-sm">Model Name *</label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="e.g. Fraud Detector v1"
              className={`h-11 border-border-color-0 placeholder:text-foreground/80 ${
                errors.name ? "border-red-500" : ""
              }`}
            />
            {errors.name && (
              <p className="text-xs text-red-500 mt-1">{errors.name}</p>
            )}
          </div>

          <div className="space-y-2 w-1/2">
            <label className="text-sm text-foreground">Modeling Process *</label>
            <Select value={modelingProcess} onValueChange={setModelingProcess}>
              <SelectTrigger className={`!h-11 cursor-pointer border-border-color-0 w-full rounded-lg ${
                errors.modelingProcess ? "border-red-500" : ""
              }`}>
                <SelectValue placeholder="Select Process Type" className="text-sm" />
              </SelectTrigger>
              <SelectContent  className="border border-border-color-0">
                <SelectItem className="cursor-pointer" value="classification">
                  Classification
                </SelectItem>
                <SelectItem className="cursor-pointer" value="regression">
                  Regression
                </SelectItem>
                <SelectItem className="cursor-pointer" value="recommendation">
                  Recommendation
                </SelectItem>
                <SelectItem className="cursor-pointer" value="timeseries">
                  Time Series
                </SelectItem>
                <SelectItem className="cursor-pointer" value="clustering">
                  Clustering
                </SelectItem>
                <SelectItem className="cursor-pointer" value="anomaly">
                  Anomaly Detection
                </SelectItem>
              </SelectContent>
            </Select>
            {errors.modelingProcess && (
              <p className="text-xs text-red-500 mt-1">{errors.modelingProcess}</p>
            )}
          </div>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <label className="text-sm text-foreground">Model Description</label>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border border-border-color-0 placeholder:text-foreground/80 placeholder:text-xs h-36"
            placeholder="Describe what this model does and its purpose..."
          />
        </div>

        {/* Dynamic Parameters Component */}
        {renderParametersComponent()}
      </div>

      {/* FOOTER BUTTONS */}
      <div className="w-full flex justify-end gap-2 pt-4">
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
            onClick={handleNext}
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

// Classification & Regression Parameters Component
const ClassificationRegressionParams = ({ type }) => {
  const [targetVariable, setTargetVariable] = useState("");
  const [evaluationMetric, setEvaluationMetric] = useState("");
  const [trainTestSplit, setTrainTestSplit] = useState("80");
  const [crossValidationFolds, setCrossValidationFolds] = useState("5");

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-2 w-full">
        <label className="text-sm text-foreground">Target Variable *</label>
        <Select value={targetVariable} onValueChange={setTargetVariable}>
          <SelectTrigger className="!h-10 cursor-pointer border-border-color-0 w-full">
            <SelectValue placeholder="Select target variable" />
          </SelectTrigger>
          <SelectContent  className="border border-border-color-0">
            <SelectItem className="!cursor-pointer" value="customer_id">customer_id (Customers)</SelectItem>
            <SelectItem className="!cursor-pointer" value="order_amount">order_amount (Orders)</SelectItem>
            <SelectItem className="!cursor-pointer" value="product_category">product_category (Products)</SelectItem>
            <SelectItem className="!cursor-pointer" value="transaction_status">transaction_status (Transactions)</SelectItem>
            <SelectItem className="!cursor-pointer" value="event_type">event_type (User Events)</SelectItem>
            <SelectItem className="!cursor-pointer" value="diagnosis">diagnosis (Medical Records)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2  w-full">
        <label className="text-sm text-foreground">Evaluation Metric</label>
        <Select value={evaluationMetric} onValueChange={setEvaluationMetric}>
          <SelectTrigger className="!h-10 cursor-pointer border-border-color-0 w-full">
            <SelectValue placeholder="Select metric" />
          </SelectTrigger>
          <SelectContent  className="border border-border-color-0">
            {type === "classification" ? (
              <>
                <SelectItem className="!cursor-pointer" value="accuracy">Accuracy</SelectItem>
                <SelectItem className="!cursor-pointer" value="precision">Precision</SelectItem>
                <SelectItem className="!cursor-pointer" value="recall">Recall</SelectItem>
                <SelectItem className="!cursor-pointer" value="f1">F1 Score</SelectItem>
                <SelectItem className="!cursor-pointer" value="auc">AUC-ROC</SelectItem>
              </>
            ) : (
              <>
                <SelectItem className="!cursor-pointer" value="mse">RMSE</SelectItem>
                <SelectItem className="!cursor-pointer" value="rmse">MAE</SelectItem>
                <SelectItem className="!cursor-pointer" value="r2">R²</SelectItem>
                <SelectItem className="!cursor-pointer" value="mae">MAPE</SelectItem>
                
              </>
            )}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label className="text-sm text-foreground">Train/Test Split (%)</label>
        <Input
          type="number"
          value={trainTestSplit}
          onChange={(e) => setTrainTestSplit(e.target.value)}
          placeholder="80"
          className="h-10 border-border-color-0"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm text-foreground">Cross-Validation Folds</label>
        <Input
          type="number"
          value={crossValidationFolds}
          onChange={(e) => setCrossValidationFolds(e.target.value)}
          placeholder="5"
          className="h-10 border-border-color-0"
        />
      </div>
    </div>
  );
};

// Recommendation Parameters Component
const RecommendationParams = () => {
  const [trainTestSplit, setTrainTestSplit] = useState("80");
  const [crossValidationFolds, setCrossValidationFolds] = useState("5");
  const [userColumn, setUserColumn] = useState("");

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-2">
        <label className="text-sm text-foreground">Evaluation Metric</label>
        <Select value={userColumn} onValueChange={setUserColumn}>
          <SelectTrigger className="!h-10 cursor-pointer border-border-color-0 w-full">
            <SelectValue placeholder="Select Evaluation Metric" />
          </SelectTrigger>
          <SelectContent  className="border border-border-color-0">
            <SelectItem className="!cursor-pointer" value="accuracy">Accuracy</SelectItem>
                <SelectItem className="!cursor-pointer" value="precision">Precision</SelectItem>
                <SelectItem className="!cursor-pointer" value="recall">Recall</SelectItem>
                <SelectItem className="!cursor-pointer" value="f1">F1 Score</SelectItem>
                <SelectItem className="!cursor-pointer" value="auc">AUC-ROC</SelectItem>
          </SelectContent>
        </Select>
      </div>

       <div className="space-y-2">
        <label className="text-sm text-foreground">Train/Test Split (%)</label>
        <Input
          type="number"
          value={trainTestSplit}
          onChange={(e) => setTrainTestSplit(e.target.value)}
          placeholder="80"
          className="h-10 border-border-color-0"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm text-foreground">Cross-Validation Folds</label>
        <Input
          type="number"
          value={crossValidationFolds}
          onChange={(e) => setCrossValidationFolds(e.target.value)}
          placeholder="5"
          className="h-10 border-border-color-0"
        />
      </div>
    </div>
  );
};

// Time Series Parameters Component
const TimeSeriesParams = () => {
   const [trainTestSplit, setTrainTestSplit] = useState("80");
  const [crossValidationFolds, setCrossValidationFolds] = useState("5");
  const [userColumn, setUserColumn] = useState("");

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-2">
        <label className="text-sm text-foreground">Evaluation Metric</label>
        <Select value={userColumn} onValueChange={setUserColumn}>
          <SelectTrigger className="!h-10 cursor-pointer border-border-color-0 w-full">
            <SelectValue placeholder="Select Evaluation Metric" />
          </SelectTrigger>
          <SelectContent  className="border border-border-color-0">
            <SelectItem className="!cursor-pointer" value="accuracy">Accuracy</SelectItem>
                <SelectItem className="!cursor-pointer" value="precision">Precision</SelectItem>
                <SelectItem className="!cursor-pointer" value="recall">Recall</SelectItem>
                <SelectItem className="!cursor-pointer" value="f1">F1 Score</SelectItem>
                <SelectItem className="!cursor-pointer" value="auc">AUC-ROC</SelectItem>
          </SelectContent>
        </Select>
      </div>

       <div className="space-y-2">
        <label className="text-sm text-foreground">Train/Test Split (%)</label>
        <Input
          type="number"
          value={trainTestSplit}
          onChange={(e) => setTrainTestSplit(e.target.value)}
          placeholder="80"
          className="h-10 border-border-color-0"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm text-foreground">Cross-Validation Folds</label>
        <Input
          type="number"
          value={crossValidationFolds}
          onChange={(e) => setCrossValidationFolds(e.target.value)}
          placeholder="5"
          className="h-10 border-border-color-0"
        />
      </div>
    </div>
  );
};

// Clustering Parameters Component
const ClusteringParams = () => {
   const [trainTestSplit, setTrainTestSplit] = useState("80");
  const [crossValidationFolds, setCrossValidationFolds] = useState("5");
  const [userColumn, setUserColumn] = useState("");

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-2">
        <label className="text-sm text-foreground">Evaluation Metric</label>
        <Select value={userColumn} onValueChange={setUserColumn}>
          <SelectTrigger className="!h-10 cursor-pointer border-border-color-0 w-full">
            <SelectValue placeholder="Select Evaluation Metric" />
          </SelectTrigger>
          <SelectContent  className="border border-border-color-0">
            <SelectItem className="!cursor-pointer" value="accuracy">Accuracy</SelectItem>
                <SelectItem className="!cursor-pointer" value="precision">Precision</SelectItem>
                <SelectItem className="!cursor-pointer" value="recall">Recall</SelectItem>
                <SelectItem className="!cursor-pointer" value="f1">F1 Score</SelectItem>
                <SelectItem className="!cursor-pointer" value="auc">AUC-ROC</SelectItem>
          </SelectContent>
        </Select>
      </div>

       <div className="space-y-2">
        <label className="text-sm text-foreground">Train/Test Split (%)</label>
        <Input
          type="number"
          value={trainTestSplit}
          onChange={(e) => setTrainTestSplit(e.target.value)}
          placeholder="80"
          className="h-10 border-border-color-0"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm text-foreground">Cross-Validation Folds</label>
        <Input
          type="number"
          value={crossValidationFolds}
          onChange={(e) => setCrossValidationFolds(e.target.value)}
          placeholder="5"
          className="h-10 border-border-color-0"
        />
      </div>
    </div>
  );
};

// Anomaly Detection Parameters Component
const AnomalyDetectionParams = () => {
   const [trainTestSplit, setTrainTestSplit] = useState("80");
  const [crossValidationFolds, setCrossValidationFolds] = useState("5");
  const [userColumn, setUserColumn] = useState("");

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-2">
        <label className="text-sm text-foreground">Evaluation Metric</label>
        <Select value={userColumn} onValueChange={setUserColumn}>
          <SelectTrigger className="!h-10 cursor-pointer border-border-color-0 w-full">
            <SelectValue placeholder="Select Evaluation Metric" />
          </SelectTrigger>
          <SelectContent  className="border border-border-color-0">
            <SelectItem className="!cursor-pointer" value="accuracy">Accuracy</SelectItem>
                <SelectItem className="!cursor-pointer" value="precision">Precision</SelectItem>
                <SelectItem className="!cursor-pointer" value="recall">Recall</SelectItem>
                <SelectItem className="!cursor-pointer" value="f1">F1 Score</SelectItem>
                <SelectItem className="!cursor-pointer" value="auc">AUC-ROC</SelectItem>
          </SelectContent>
        </Select>
      </div>

       <div className="space-y-2">
        <label className="text-sm text-foreground">Train/Test Split (%)</label>
        <Input
          type="number"
          value={trainTestSplit}
          onChange={(e) => setTrainTestSplit(e.target.value)}
          placeholder="80"
          className="h-10 border-border-color-0"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm text-foreground">Cross-Validation Folds</label>
        <Input
          type="number"
          value={crossValidationFolds}
          onChange={(e) => setCrossValidationFolds(e.target.value)}
          placeholder="5"
          className="h-10 border-border-color-0"
        />
      </div>
    </div>
  );
};
