import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { UploadFile } from "@/components/Icons";

/**
 * Component to display a grid of prompt cards with search and generation functionality.
 *
 * @returns {React.JSX.Element} The rendered PromptCardGrid component.
 */
const FinetuningGrid = () => {
  const [learningRate, setLearningRate] = useState([0.0001]);
  const [batchSize, setBatchSize] = useState([16]);
  const [earlyStop, setEarlyStop] = useState(true);
  const [loRA, setLoRA] = useState(true);
  const [gradientCheckpoint, setGradientCheckpoint] = useState(false);
  const [mixedPrecision, setMixedPrecision] = useState(true);

  return (
    <>
      <Card className="">
        <CardHeader className="space-y-0">
          <h1 className="text-2xl font-medium">
            Model Finetuning Configuration
          </h1>
          <p className="text-sm text-foreground/80">
            Configure custom model training and finetuning parameters
          </p>
        </CardHeader>
        <CardContent>
          {/* Training Dataset */}
          <Card className=" border-none px-0 py-0">
            <CardHeader className="px-0">
              <h2 className="text-xl font-medium">Training Dataset</h2>
            </CardHeader>
            <CardContent className="space-y-4 px-0">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="dataset-source">Dataset Source</Label>
                  <Select defaultValue="synthetic">
                    <SelectTrigger
                      id="dataset-source"
                      className="w-full py-5 border border-border-color-0 dark:bg-card cursor-pointer"
                    >
                      <SelectValue placeholder="Select dataset source" />
                    </SelectTrigger>
                    <SelectContent  className="border border-border-color-0">
                      <SelectItem value="synthetic">
                        Generate Synthetic Data
                      </SelectItem>
                      <SelectItem className="!cursor-pointer" value="upload">Upload Custom Data</SelectItem>
                      <SelectItem className="!cursor-pointer" value="existing">
                        Use Existing Dataset
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="data-format">Data Format</Label>
                  <Select defaultValue="jsonl">
                    <SelectTrigger
                      id="data-format"
                      className="w-full py-5 border border-border-color-0 cursor-pointer dark:bg-card"
                    >
                      <SelectValue placeholder="Select format" />
                    </SelectTrigger>
                    <SelectContent  className="border border-border-color-0">
                      <SelectItem className="!cursor-pointer" value="jsonl">JSONL</SelectItem>
                      <SelectItem className="!cursor-pointer" value="csv">CSV</SelectItem>
                      <SelectItem className="!cursor-pointer" value="json">JSON</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="border border-border-color-0 rounded-lg p-12 cursor-pointer">
                <div className="flex flex-col items-center justify-center text-center">
                  <div className="w-12 h-12 bg-white  flex items-center justify-center mb-3">
                    <UploadFile className="w-6 h-6" />
                  </div>
                  <p className="font-medium text-sm">Upload Training Data</p>
                  <p className="text-xs">
                    Drag and drop, or browse files to upload
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Training Parameters */}
          <Card className="border-none">
            <CardHeader className="px-0">
              <h2 className="text-xl font-medium"> Training Parameters </h2>
            </CardHeader>
            <CardContent className="space-y-6 px-0 py-0">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="base-model">Base Model</Label>
                  <Select defaultValue="gpt-4o-mini">
                    <SelectTrigger
                      id="base-model"
                      className="w-full cursor-pointer py-5 border border-border-color-0 dark:bg-card"
                    >
                      <SelectValue placeholder="Select base model" />
                    </SelectTrigger>
                    <SelectContent  className="border border-border-color-0">
                      <SelectItem value="gpt-4o-mini">GPT-4o Mini</SelectItem>
                      <SelectItem value="gpt-4">GPT-4</SelectItem>
                      <SelectItem value="gpt-3.5-turbo">
                        GPT-3.5 Turbo
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="epochs">Training Epochs</Label>
                  <Input id="epochs" type="number" defaultValue="3" />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Learning Rate</Label>
                  <span className="text-sm font-medium text-gray-700 dark:text-foreground">
                    {learningRate[0].toFixed(4)}
                  </span>
                </div>
                <Slider
                  value={learningRate}
                  onValueChange={setLearningRate}
                  min={0.00001}
                  max={0.001}
                  step={0.00001}
                  className="w-full"
                />
                <p className="text-xs text-gray-500 dark:text-foreground/80">
                  Controls how quickly the model learns
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Batch Size</Label>
                  <span className="text-sm font-medium text-gray-700 dark:text-foreground">
                    {batchSize[0]}
                  </span>
                </div>
                <Slider
                  value={batchSize}
                  onValueChange={setBatchSize}
                  min={1}
                  max={128}
                  step={1}
                  className="w-full"
                />
                <p className="text-xs text-gray-500 dark:text-foreground/80">
                  Number of examples processed together
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Validation & Testing */}
          <Card className=" border-none">
            <CardHeader className="px-0">
              <h2 className="text-xl font-medium"> Validation & Testing </h2>
            </CardHeader>
            <CardContent className="space-y-4 px-0">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="validation-split">Validation Split</Label>
                  <Select defaultValue="20">
                    <SelectTrigger
                      id="validation-split"
                      className="w-full cursor-pointer py-5 border border-border-color-0 dark:bg-card"
                    >
                      <SelectValue placeholder="Select split" />
                    </SelectTrigger>
                    <SelectContent  className="border border-border-color-0">
                      <SelectItem className="!cursor-pointer" value="10">10%</SelectItem>
                      <SelectItem className="!cursor-pointer" value="20">20%</SelectItem>
                      <SelectItem className="!cursor-pointer" value="30">30%</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="early-stopping">Early Stopping</Label>
                  <div className="flex items-center space-x-2 h-10 py-5 border border-border-color-0 px-3 rounded-md">
                    <Switch
                      id="early-stopping"
                      checked={earlyStop}
                      onCheckedChange={setEarlyStop}
                    />
                    <span className="text-sm text-gray-600 dark:text-foreground/80">Enable</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Advanced Options */}
          <Card className="mb-6 px-0 border-none">
            <CardHeader className="px-0">
              <h2 className="text-xl font-medium"> Advanced Options </h2>
            </CardHeader>
            <CardContent className="space-y-3 px-0">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900 dark:text-foreground">
                    LoRA (Low-Rank Adaptation)
                  </p>
                  <p className="text-sm text-gray-500 dark:text-foreground/60">
                    Efficient fine-tuning method
                  </p>
                </div>
                <Switch checked={loRA} onCheckedChange={setLoRA} />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900 dark:text-foreground">
                    Gradient Checkpointing
                  </p>
                  <p className="text-sm text-gray-500 dark:text-foreground/60">
                    Reduce memory usage during training
                  </p>
                </div>
                <Switch
                  checked={gradientCheckpoint}
                  onCheckedChange={setGradientCheckpoint}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900 dark:text-foreground">
                    Mixed Precision Training
                  </p>
                  <p className="text-sm text-gray-500 dark:text-foreground/60">
                    Faster training with FP16
                  </p>
                </div>
                <Switch
                  checked={mixedPrecision}
                  onCheckedChange={setMixedPrecision}
                />
              </div>
            </CardContent>
          </Card>
          <div className=" bg-border-color-0/50 h-[1px] w-full rounded-xl"></div>
          {/* Estimated Cost */}
          <Card className="border-none px-0">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-medium ">
                    Estimated Training Cost
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-foreground/60">
                    Based on current configuration
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-medium">$24.50</p>
                  <p className="text-sm text-gray-500 dark:text-foreground/60">~2-3 hours</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </>
  );
};

export default FinetuningGrid;
