"use client";

import { useState } from "react";
import AnimatedTabsSection from "@/components/common/TabsPane";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import EmptyCard from "@/components/common/EmptyCard";
import { Card } from "@/components/ui/card";
import { Sparkles, Settings, Database, Zap, FileText } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { RippleButton } from "@/components/ui/ripple-button";
import { LeftArrow, UploadIcon, EyeIcon } from "@/components/Icons";
import ConfigsList from "./ConfigList";
import DatasetList from "./DatasetList";
import TrainingList from "./JobList";


export default function Finetuning({ isEmbedded = false }) {
  const [baseModel, setBaseModel] = useState("");
  const [dataset, setDataset] = useState("");
  const [description, setDescription] = useState("");
  const [sequenceLength, setSequenceLength] = useState(512);
  const [chatTemplate, setChatTemplate] = useState("chatml");
  const [configBaseModel, setConfigBaseModel] = useState("");
  const [selectedConfig, setSelectedConfig] = useState("");

  const [modelType, setModelType] = useState("");
  const [tokenizerType, setTokenizerType] = useState("AutoTokenizer");

  const [configs, setConfigs] = useState([
  {
    id: "llama3-8b-qlora",
    name: "llama3-8b-qlora",
    description: "QLoRA config for Llama 3 8B",
    fileName: "llama3_8b_qlora.yaml",
    createdAt: "10/01/2025",
  },
  {
    id: "mistral-7b-lora",
    name: "mistral-7b-lora",
    description: "LoRA fine-tuning for Mistral 7B",
    fileName: "mistral_7b_lora.yaml",
    createdAt: "11/01/2025",
  },
]);

const handleDeleteConfig = (id) => {
  setConfigs((prev) => prev.filter((c) => c.id !== id));
};

  
    

  const isStartDisabled =
    !baseModel ||
    !configBaseModel ||
    !modelType ||
    !tokenizerType ||
    !chatTemplate;

  const items = [
    {
      id: "start",
      value: "start",
      label: 'Start Finetuning',
      render: () => (
        <Card className="p-6 space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl font-medium">Create Training Job</h2>
            <p className="text-sm text-foreground/80">
              Configure and start a new model fine-tuning job
            </p>
          </div>

          {/* Base Model */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Base Model</label>
            <Select value={baseModel} onValueChange={setBaseModel}>
              <SelectTrigger className="border border-border-color-0 w-full !h-11 cursor-pointer">
                <SelectValue placeholder="Select a base model" />
              </SelectTrigger>
              <SelectContent className="border border-border-color-0">
                <SelectItem className="cursor-pointer" value="gpt-4">
                  GPT-4
                </SelectItem>
                <SelectItem className="cursor-pointer" value="gpt-3.5">
                  GPT-3.5
                </SelectItem>
                <SelectItem className="cursor-pointer" value="llama">
                  LLaMA
                </SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-foreground/80">
              Choose the base model to fine-tune
            </p>
          </div>

          {/* Description */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">
              Description <span className="text-foreground/80">(Optional)</span>
            </label>
            <Textarea
              placeholder="Describe the purpose of this fine-tuned model..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-[100px]"
            />
          </div>

          {/* Dataset */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Dataset</label>
            <Select value={dataset} onValueChange={setDataset}>
              <SelectTrigger className="border cursor-pointer border-border-color-0 w-full !h-11">
                <SelectValue placeholder="Select a dataset" />
              </SelectTrigger>
              <SelectContent className="border border-border-color-0">
                <SelectItem value="dataset-1">
                  Customer Support Dataset
                </SelectItem>
                <SelectItem value="dataset-2">Insurance Q&A Dataset</SelectItem>
                <SelectItem value="dataset-3">
                  Internal Knowledge Dataset
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="mt-6">
            <AnimatedTabsSection
              defaultValue="configure"
              items={[
                {
                  id: "configure",
                  value: "configure",
                  label: "Configure",
                  render: () => (
                    <div
                      className="
                  border border-border-color-0 rounded-xl
                  max-h-[600px] overflow-y-auto
                "
                    >
                      {/* Scrollable content */}
                      <div className="p-6 space-y-10">
                        {/* Model & Tokenizer */}
                        <div className="space-y-6">
                          <h3 className="text-lg font-medium">
                            Model & Tokenizer
                          </h3>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex flex-col gap-1">
                              <label className="text-sm ">Base Model</label>
                              <Input
                                placeholder="meta-llama/Llama-3.2-1B-Instruct"
                                value={configBaseModel}
                                onChange={(e) =>
                                  setConfigBaseModel(e.target.value)
                                }
                              />
                              <p className="text-xs text-foreground/80">
                                Hugging Face repo ID or local path
                              </p>
                            </div>

                            <div className="flex flex-col gap-1">
                              <label className="text-sm ">Model Type</label>
                              <Input
                                placeholder="LlamaForCausalLM"
                                value={modelType}
                                onChange={(e) => setModelType(e.target.value)}
                              />
                              <p className="text-xs text-foreground/80">
                                Transformers class name
                              </p>
                            </div>

                            <div className="flex flex-col gap-1">
                              <label className="text-sm ">Tokenizer Type</label>
                              <Input
                                value={tokenizerType}
                                onChange={(e) =>
                                  setTokenizerType(e.target.value)
                                }
                              />
                            </div>

                            <div className="flex flex-col gap-1">
                              <label className="text-sm ">Chat Template</label>
                              <Select
                                value={chatTemplate}
                                onValueChange={setChatTemplate}
                              >
                                <SelectTrigger className="w-full border cursor-pointer border-border-color-0 !h-11">
                                  <SelectValue placeholder="Select template" />
                                </SelectTrigger>
                                <SelectContent className="border border-border-color-0">
                                  <SelectItem
                                    className="cursor-pointer"
                                    value="chatml"
                                  >
                                    ChatML
                                  </SelectItem>
                                  <SelectItem
                                    className="cursor-pointer"
                                    value="alpaca"
                                  >
                                    Alpaca
                                  </SelectItem>
                                  <SelectItem
                                    className="cursor-pointer"
                                    value="llama"
                                  >
                                    LLaMA
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                              <p className="text-xs text-foreground/80">
                                Dataset type for uploaded data
                              </p>
                            </div>
                          </div>
                        </div>

                        <Separator />

                        {/* Training Length */}
                        <div className="space-y-6">
                          <h3 className="text-lg font-medium">
                            Training Length
                          </h3>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex flex-col gap-1">
                              <label className="text-sm ">
                                Training Epochs
                              </label>
                              <Input type="number" defaultValue={3} />
                            </div>

                            <div className="flex flex-col gap-1">
                              <label className="text-sm ">
                                Max Steps (Optional)
                              </label>
                              <Input
                                type="number"
                                placeholder="overrides epochs if set"
                              />
                            </div>
                          </div>

                          <div className="flex flex-col gap-3">
                            <div className="flex mb-4 justify-between">
                              <label className="text-sm ">
                                Sequence Length
                              </label>
                              <span className="text-sm text-foreground/80">
                                {sequenceLength}
                              </span>
                            </div>

                            <Slider
                              value={[sequenceLength]}
                              min={256}
                              max={8192}
                              step={128}
                              onValueChange={(v) => setSequenceLength(v[0])}
                            />

                            <p className="text-xs text-foreground/80">
                              Typically 256–8192
                            </p>
                          </div>
                        </div>

                        <Separator />

                        {/* Optimization */}
                        <div className="space-y-6">
                          <h3 className="text-lg font-medium">Optimization</h3>

                          <div className="flex flex-col gap-3">
                            <div className="flex justify-between">
                              <label className="text-sm ">Learning Rate</label>
                              <span className="text-sm text-foreground/80">
                                0.00020
                              </span>
                            </div>

                            <Slider
                              min={0.00001}
                              max={0.001}
                              step={0.00001}
                              defaultValue={[0.0002]}
                            />

                            <p className="text-xs text-foreground/80">
                              Controls how quickly the model learns
                            </p>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex flex-col gap-1">
                              <label className="text-sm ">Optimizer</label>
                              <Select defaultValue="adamw-8bit">
                                <SelectTrigger className="border cursor-pointer border-border-color-0 w-full !h-11">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="border border-border-color-0">
                                  <SelectItem value="adamw-8bit">
                                    AdamW 8-bit
                                  </SelectItem>
                                  <SelectItem value="adamw">AdamW</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            <div className="flex flex-col gap-1">
                              <label className="text-sm ">LR Scheduler</label>
                              <Select defaultValue="cosine">
                                <SelectTrigger className="cursor-pointer border border-border-color-0 w-full !h-11">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="border border-border-color-0">
                                  <SelectItem value="cosine">Cosine</SelectItem>
                                  <SelectItem value="linear">Linear</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </div>

                        <Separator />

                        {/* Batch & Memory Control */}
                        <div className="space-y-6">
                          <h3 className="text-lg font-medium">
                            Batch & Memory Control
                          </h3>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            <div className="flex flex-col gap-4">
                              <label className="text-sm ">
                                Micro Batch Size
                              </label>
                              <Slider
                                min={1}
                                max={16}
                                step={1}
                                defaultValue={[1]}
                              />
                            </div>

                            <div className="flex flex-col gap-4">
                              <div className="flex justify-between">
                                <label className="text-sm ">
                                  Gradient Accumulation Steps
                                </label>
                                <span className="text-sm text-foreground/80">
                                  8
                                </span>
                              </div>
                              <Slider
                                min={1}
                                max={32}
                                step={1}
                                defaultValue={[8]}
                              />
                            </div>
                          </div>
                        </div>

                        <Separator />

                        {/* Precision & Hardware */}
                        <div className="space-y-6">
                          <h3 className="text-lg font-medium">
                            Precision & Hardware
                          </h3>

                          <div className="flex justify-between items-center">
                            <div>
                              <p className="">BF16 (bfloat16)</p>
                              <p className="text-sm text-foreground/80">
                                Requires Ampere+ GPU
                              </p>
                            </div>
                            <Switch defaultChecked />
                          </div>

                          <div className="flex justify-between items-center">
                            <div>
                              <p className="">FP16 (float16)</p>
                              <p className="text-sm text-foreground/80">
                                Mutually exclusive with bf16
                              </p>
                            </div>
                            <Switch />
                          </div>

                          <div className="flex justify-between items-center">
                            <div>
                              <p className="">TF32</p>
                              <p className="text-sm text-foreground/80">
                                CUDA only
                              </p>
                            </div>
                            <Switch />
                          </div>

                          <div className="flex justify-between items-center">
                            <div>
                              <p className="">Gradient Checkpointing</p>
                              <p className="text-sm text-foreground/80">
                                Reduce memory usage during training
                              </p>
                            </div>
                            <Switch defaultChecked />
                          </div>
                        </div>

                        <Separator />

                        {/* Quantization */}
                        <div className="space-y-6">
                          <h3 className="text-lg font-medium">Quantization</h3>

                          <div className="flex justify-between items-center">
                            <div>
                              <p className="">Load in 4-bit</p>
                              <p className="text-sm text-foreground/80">
                                Uses bitsandbytes
                              </p>
                            </div>
                            <Switch defaultChecked />
                          </div>

                          <div className="flex justify-between items-center">
                            <div>
                              <p className="">Load in 8-bit</p>
                              <p className="text-sm text-foreground/80">
                                Mutually exclusive with 4-bit
                              </p>
                            </div>
                            <Switch />
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex flex-col gap-1">
                              <label className="text-sm ">
                                4-bit Quant Type
                              </label>
                              <Select defaultValue="nf4">
                                <SelectTrigger className="cursor-pointer border border-border-color-0 w-full !h-11">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="border border-border-color-0">
                                  <SelectItem value="nf4">NF4</SelectItem>
                                  <SelectItem value="fp4">FP4</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            <div className="flex flex-col gap-1">
                              <label className="text-sm ">
                                4-bit Compute Dtype
                              </label>
                              <Select defaultValue="float16">
                                <SelectTrigger className="cursor-pointer border border-border-color-0 w-full !h-11">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="border border-border-color-0">
                                  <SelectItem value="float16">
                                    Float16
                                  </SelectItem>
                                  <SelectItem value="bfloat16">
                                    BFloat16
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>

                          <div className="flex justify-between items-center">
                            <div>
                              <p className="">Use Double Quantization</p>
                              <p className="text-sm text-foreground/80">
                                Optional optimization
                              </p>
                            </div>
                            <Switch defaultChecked />
                          </div>
                        </div>

                        <Separator />

                        {/* Evaluation & Hardware */}
                        <div className="space-y-6">
                          <h3 className="text-lg font-medium">
                            Evaluation & Hardware
                          </h3>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex flex-col gap-4">
                              <label className="text-sm ">Number of GPUs</label>
                              <Slider
                                min={1}
                                max={8}
                                step={1}
                                defaultValue={[1]}
                              />
                            </div>

                            <div className="flex flex-col gap-1">
                              <label className="text-sm ">
                                Evaluation Metrics (Optional)
                              </label>
                              <Input placeholder="e.g., sacrebleu, perplexity" />
                              <p className="text-xs text-foreground/80">
                                Comma-separated list
                              </p>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex flex-col gap-1">
                              <label className="text-sm ">
                                Eval Steps (Optional)
                              </label>
                              <Input placeholder="Evaluate during training" />
                            </div>

                            <div className="flex flex-col gap-1">
                              <label className="text-sm ">
                                Eval Strategy (Optional)
                              </label>
                              <Select defaultValue="none">
                                <SelectTrigger className="border cursor-pointer border-border-color-0 w-full !h-11">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="border border-border-color-0">
                                  <SelectItem value="none">None</SelectItem>
                                  <SelectItem value="steps">Steps</SelectItem>
                                  <SelectItem value="epoch">Epoch</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>

                          <div className="flex flex-col gap-1">
                            <label className="text-sm ">
                              GPU Type (Optional)
                            </label>
                            <Input defaultValue="a100" />
                          </div>
                        </div>

                        <Separator />

                        {/* Estimated Cost */}
                        <div className="flex justify-between items-center">
                          <div>
                            <h3 className="text-lg font-medium">
                              Estimated Training Cost
                            </h3>
                            <p className="text-sm text-foreground/80">
                              Based on current configuration
                            </p>
                          </div>

                          <div className="text-right">
                            <p className="text-3xl font-semibold">$24.50</p>
                            <p className="text-sm text-foreground/80">
                              ~2–3 hours
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  id: "select-config",
                  value: "select-config",
                  label: "Select Config",
                  render: () => (
                    <div>
                      <div className="flex flex-col gap-1">
                        <Select
                          value={selectedConfig}
                          onValueChange={setSelectedConfig}
                        >
                          <SelectTrigger className="border border-border-color-0 w-full !h-11 cursor-pointer">
                            <SelectValue placeholder="Select a configuration" />
                          </SelectTrigger>

                          <SelectContent className="border border-border-color-0">
                            <SelectItem value="default">
                              Default Config
                            </SelectItem>
                            <SelectItem value="optimized">
                              Optimized Config
                            </SelectItem>
                            <SelectItem value="low-cost">
                              Low Cost Config
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        {selectedConfig && (
                          <div className="mt-2 text-sm text-foreground/80 flex gap-1 items-center">
                            <FileText className="h-4 w-4" />

                            <span className=" ">
                              {selectedConfig.replace("-", " ")}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  ),
                },
                {
                  id: "json",
                  value: "json",
                  label: "JSON",
                  render: () => 
                  (
                    
                            <div className="space-y-4">
  <div className="flex items-center justify-between">
    <h3 className="text-lg font-medium">Configuration JSON/YAML</h3>

     <RippleButton>
             
                <Button className="bg-sidebar-primary hover:bg-[#E64A19] text-white gap-3 rounded-full !px-6 !py-6 !cursor-pointer duration-300">
                  <div className="w-4 h-4">
                    <UploadIcon />
                  </div>
                  Upload File
                </Button>
           
            </RippleButton>
  </div>

  <Textarea
    placeholder="Paste your configuration JSON or YAML here..."
    className="min-h-[160px] font-mono text-sm"
  />
</div>
                      
                  ),
                },
              ]}
              contentClassName="mt-4"
            />
          </div>

          {/* CTA */}
          <div className="w-full flex justify-end gap-2">
            <RippleButton>
              <Button
                variant="outline"
                className="gap-2 border border-border-color-2 text-foreground hover:bg-gray-50 w-fit px-7"
              >
                Reset
              </Button>
            </RippleButton>
            <RippleButton>
              <Button
                // onClick={handleStartTraining}
                disabled={isStartDisabled}
                className="bg-sidebar-primary hover:bg-[#E64A19] text-white gap-3 rounded-full !px-6 !py-6 !cursor-pointer duration-300 disabled:opacity-50"
              >
                Start Training
                <LeftArrow className="rotate-180" />
              </Button>
            </RippleButton>
          </div>
        </Card>
      ),
    },
    {
      id: "configs",
      value: "configs",
      label: 'Configs',
      render: () => <ConfigsList />
    },
    {
      id: "datasets",
      value: "datasets",
      label: 'Datasets',
      render: () => <DatasetList />,
    },
    {
      id: "jobs",
      value: "jobs",
      label: 'Training Jobs',
      render: () => <TrainingList />,
    },
  ];

  return (
    <div className={`w-full ${isEmbedded ? '' : 'p-6'}`}>
      <AnimatedTabsSection
        items={items}
        defaultValue="start"
        contentClassName="mt-6"
      />
    </div>
  );
}



