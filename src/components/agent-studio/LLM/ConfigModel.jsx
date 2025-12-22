"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import AnimatedTabsSection from "@/components/common/TabsPane";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { RippleButton } from "@/components/ui/ripple-button";
import { Upload } from "lucide-react";
import { LeftArrow } from "@/components/Icons";

export default function ConfigModel({ open, onOpenChange }) {
  const [activeTab, setActiveTab] = useState("configure");

  /** CONFIGURE STATE */
  const [baseModel, setBaseModel] = useState(
    "meta-llama/Llama-3.2-1B-Instruct"
  );
  const [modelType, setModelType] = useState("");
  const [tokenizerType, setTokenizerType] = useState("AutoTokenizer");
  const [chatTemplate, setChatTemplate] = useState("chatml");
  const [epochs, setEpochs] = useState(3);
  const [maxSteps, setMaxSteps] = useState("");
  const [sequenceLength, setSequenceLength] = useState(512);

  /** JSON STATE */
  const [jsonConfig, setJsonConfig] = useState("");

  const slide = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  };

  /** SUBMIT FUNCTIONS */
  const handleConfigureSubmit = () => {
    console.log({
      baseModel,
      modelType,
      tokenizerType,
      chatTemplate,
      epochs,
      maxSteps,
      sequenceLength,
    });
    onOpenChange(false);
  };

  const handleJsonSubmit = () => {
    console.log(jsonConfig);
    onOpenChange(false);
  };

  /** ================= TAB RENDER FUNCTIONS ================= */

  const renderConfigureTab = () => (
    <motion.div
      variants={slide}
      initial="initial"
      animate="animate"
      exit="exit"
      className="space-y-8"
    >
      <div
        className="
                  border border-border-color-0 rounded-xl 
                  h-110 overflow-hidden
                "
      >
        {/* Scrollable content */}
        <div className="h-full overflow-y-auto p-6 space-y-10">
          {/* Model & Tokenizer */}
          <div className="space-y-6">
            <h3 className="text-lg font-medium">Model & Tokenizer</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-1">
                <label className="text-sm">Base Model</label>
                <Input
                  placeholder="meta-llama/Llama-3.2-1B-Instruct"
                  value={baseModel}
                  onChange={(e) => setBaseModel(e.target.value)}
                />
                <p className="text-xs text-foreground/80">
                  Hugging Face repo ID or local path
                </p>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm">Model Type</label>
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
                <label className="text-sm">Tokenizer Type</label>
                <Input
                  value={tokenizerType}
                  onChange={(e) => setTokenizerType(e.target.value)}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm">Chat Template</label>
                <Select value={chatTemplate} onValueChange={setChatTemplate}>
                  <SelectTrigger className="w-full border cursor-pointer border-border-color-0 !h-11">
                    <SelectValue placeholder="Select template" />
                  </SelectTrigger>
                  <SelectContent className="border border-border-color-0">
                    <SelectItem value="chatml">ChatML</SelectItem>
                    <SelectItem value="alpaca">Alpaca</SelectItem>
                    <SelectItem value="llama">LLaMA</SelectItem>
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
            <h3 className="text-lg font-medium">Training Length</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-1">
                <label className="text-sm">Training Epochs</label>
                <Input
                  type="number"
                  value={epochs}
                  onChange={(e) => setEpochs(Number(e.target.value))}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm">Max Steps (Optional)</label>
                <Input
                  type="number"
                  placeholder="overrides epochs if set"
                  value={maxSteps}
                  onChange={(e) => setMaxSteps(e.target.value)}
                />
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <div className="flex mb-4 justify-between">
                <label className="text-sm">Sequence Length</label>
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

              <p className="text-xs text-foreground/80">Typically 256–8192</p>
            </div>
          </div>

          <Separator />

          {/* Optimization */}
          <div className="space-y-6">
            <h3 className="text-lg font-medium">Optimization</h3>

            <div className="flex flex-col gap-3">
              <div className="flex justify-between">
                <label className="text-sm">Learning Rate</label>
                <span className="text-sm text-foreground/80">0.00020</span>
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
                <label className="text-sm">Optimizer</label>
                <Select defaultValue="adamw-8bit">
                  <SelectTrigger className="border cursor-pointer border-border-color-0 w-full !h-11">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="border border-border-color-0">
                    <SelectItem value="adamw-8bit">AdamW 8-bit</SelectItem>
                    <SelectItem value="adamw">AdamW</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm">LR Scheduler</label>
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
          <div className="space-y-6">
            <h3 className="text-lg font-medium">Optimization</h3>

            <div className="flex flex-col gap-3">
              <div className="flex justify-between">
                <label className="text-sm ">Learning Rate</label>
                <span className="text-sm text-foreground/80">0.00020</span>
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
                    <SelectItem value="adamw-8bit">AdamW 8-bit</SelectItem>
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
            <h3 className="text-lg font-medium">Batch & Memory Control</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="flex flex-col gap-4">
                <label className="text-sm ">Micro Batch Size</label>
                <Slider min={1} max={16} step={1} defaultValue={[1]} />
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex justify-between">
                  <label className="text-sm ">
                    Gradient Accumulation Steps
                  </label>
                  <span className="text-sm text-foreground/80">8</span>
                </div>
                <Slider min={1} max={32} step={1} defaultValue={[8]} />
              </div>
            </div>
          </div>

          <Separator />

          {/* Precision & Hardware */}
          <div className="space-y-6">
            <h3 className="text-lg font-medium">Precision & Hardware</h3>

            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm">BF16 (bfloat16)</p>
                <p className="text-sm text-foreground/80">
                  Requires Ampere+ GPU
                </p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm">FP16 (float16)</p>
                <p className="text-sm text-foreground/80">
                  Mutually exclusive with bf16
                </p>
              </div>
              <Switch />
            </div>

            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm">TF32</p>
                <p className="text-sm text-foreground/80">CUDA only</p>
              </div>
              <Switch />
            </div>

            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm">Gradient Checkpointing</p>
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
                <p className="text-sm text-foreground/80">Uses bitsandbytes</p>
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
                <label className="text-sm ">4-bit Quant Type</label>
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
                <label className="text-sm ">4-bit Compute Dtype</label>
                <Select defaultValue="float16">
                  <SelectTrigger className="cursor-pointer border border-border-color-0 w-full !h-11">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="border border-border-color-0">
                    <SelectItem value="float16">Float16</SelectItem>
                    <SelectItem value="bfloat16">BFloat16</SelectItem>
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
            <h3 className="text-lg font-medium">Evaluation & Hardware</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-4">
                <label className="text-sm ">Number of GPUs</label>
                <Slider min={1} max={8} step={1} defaultValue={[1]} />
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
                <label className="text-sm ">Eval Steps (Optional)</label>
                <Input placeholder="Evaluate during training" />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm ">Eval Strategy (Optional)</label>
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
              <label className="text-sm ">GPU Type (Optional)</label>
              <Input defaultValue="a100" />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );

  const renderJsonTab = () => (
    <div>
      <div className="w-full space-y-6">
        {/* Config Name */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Config Name</label>
          <Input
            placeholder="e.g., llama3-8b-qlora"
            className="border-border-color-0"
          />
        </div>

        {/* Description */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Description</label>
          <Input
            placeholder="e.g., QLoRA config for Llama 3 8B"
            className="border-border-color-0"
          />
        </div>

        {/* Configuration */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">
            Configuration (JSON/YAML)
          </label>
          <Textarea
            placeholder="Paste your JSON or YAML configuration here..."
            className="h-30 font-mono text-sm border-border-color-0"
          />
        </div>

        {/* Upload File */}
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            className="flex items-center gap-2 px-2 border-border-color-0"
          >
            <Upload />
            Upload JSON/YAML File
          </Button>

          <p className="text-xs text-foreground/70">
            Upload a file to populate the content above
          </p>
        </div>

        {/* Footer */}
      </div>
    </div>
  );

  /** ================= TABS ================= */

  const items = [
    {
      id: "configure",
      value: "configure",
      label: "Configure",
      render: renderConfigureTab,
    },
    {
      id: "json",
      value: "json",
      label: "JSON",
      render: renderJsonTab,
    },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[70%] h-[90%] overflow-hidden py-8 px-2">
        <div className="w-full h-full overflow-y-auto px-4">
          <DialogHeader>
            <DialogTitle className="text-2xl font-medium">
              Add Training Configuration
            </DialogTitle>
            <p className="text-sm text-foreground/70 my-2">
              Configure training parameters or provide JSON/YAML directly
            </p>
          </DialogHeader>

          <AnimatedTabsSection
            items={items}
            defaultValue={activeTab}
            onValueChange={setActiveTab}
          />

          <div className="pt-6 mt-2 flex justify-end gap-3">
            <RippleButton>
              <Button 
                className="gap-2 border border-border-color-2 text-foreground hover:bg-gray-50 w-fit px-7"
              variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
            </RippleButton>

            <RippleButton>
              <Button
                onClick={
                  activeTab === "configure"
                    ? handleConfigureSubmit
                    : handleJsonSubmit
                }
                className="bg-sidebar-primary text-white !px-4 flex gap-3"
              >
                Create Config
                <LeftArrow className='rotate-180' />
              </Button>
            </RippleButton>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
