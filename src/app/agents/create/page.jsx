"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Link from "next/link";
import { AiGenerator, EditIcon, SparklesIcon } from "@/components/Icons";
import ApiEndpointModal from "@/components/api-endpoint-modal";
import LeftArrowAnim from "@/components/animations/LeftArrowAnim";
// import { FadeUp } from "@/components/animations/Animations";
import { RippleButton } from "@/components/ui/ripple-button";
import AnimatedTabsSection from "@/components/common/TabsPane";
import EmptyCard from "@/components/common/EmptyCard";
import PromptCardGrid from "@/components/prompt-card-grid";
import { ScaleDown } from "@/components/animations/Animations";

export default function CreateAgentPage() {
  const [apiModalOpen, setApiModalOpen] = useState(false);
  const [agentName, setAgentName] = useState("");
  const [description, setDescription] = useState("");

  const items = [
    {
      id: "prompt",
      value: "prompt",
      label: "Prompt",
      name: "Prompt",
      render: () => <PromptCardGrid />,
    },
    {
      id: "model",
      value: "model",
      label: "Model",
      name: "Model",
      render: () => (
        <EmptyCard children={"Models configuration coming soon..."} />
      ),
    },
    {
      id: "tools",
      value: "tools",
      label: "Tools",
      name: "Tools",
      render: () => (
        <EmptyCard children={"Tools configuration coming soon..."} />
      ),
    },
    {
      id: "knowledge",
      value: "knowledge",
      label: "Knowledge",
      name: "Knowledge",
      render: () => (
        <EmptyCard children={"Knowledge configuration coming soon..."} />
      ),
    },
    {
      id: "memory",
      value: "memory",
      label: "Memory",
      name: "Memory",
      render: () => (
        <EmptyCard children={"Memory configuration coming soon..."} />
      ),
    },
    {
      id: "guardrails",
      value: "guardrails",
      label: "Guardrails",
      name: "Guardrails",
      render: () => (
        <EmptyCard children={"Guardrails configuration coming soon..."} />
      ),
    },
    {
      id: "finetuning",
      value: "finetuning",
      label: "Finetuning",
      name: "Finetuning",
      render: () => (
        <EmptyCard children={"Finetuning configuration coming soon..."} />
      ),
    },
    {
      id: "tags",
      value: "tags",
      label: "Tags",
      name: "Tags",
      render: () => (
        <EmptyCard children={"Tags configuration coming soon..."} />
      ),
    },
  ];

  return (
    <div className="flex flex-col h-full w-full overflow-hidden">
      {/* Header */}
      <ScaleDown>
      <div className=" bg-background p-6">
        {/* <FadeUp> */}
          <div className="flex items-center justify-between">
            <div className="flex items-start gap-3">
              <LeftArrowAnim link={"/agents"} />

              <div className="space-y-2">
                <h1 className="text-2xl font-medium">Agent Builder</h1>
                <p className="text-sm text-gray-600  dark:text-foreground">
                  Configure your AI agent with custom prompts, models, and tools
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <RippleButton>
                <Button
                  variant="outline"
                  onClick={() => setApiModalOpen(true)}
                  className="gap-2 text-foreground border border-primary"
                >
                  <div className="!w-4">
                    <AiGenerator />
                  </div>
                  API
                </Button>
              </RippleButton>
              <RippleButton>
                <Button
                  variant="outline"
                  className="gap-2 text-foreground border border-primary"
                >
                  <div className="!w-4">
                    <AiGenerator />
                  </div>
                  Test
                </Button>
              </RippleButton>
              <Link href={`/agents/edit`}>
                <RippleButton>
                  <Button className="bg-primary hover:bg-[#E64A19] text-white gap-2">
                    <div className="!w-4">
                      <EditIcon className={"text-white"} />
                    </div>
                    Save Agent
                  </Button>
                </RippleButton>
              </Link>
            </div>
          </div>
        {/* </FadeUp> */}
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="max-w-6xl mx-auto space-y-4">
          {/* Basic Information */}
          {/* <FadeUp delay={0.02}> */}
            <Card className={"h-full py-10 shadow-none border-border-color-1 bg-background"}>
              <CardHeader>
                <h2 className="text-xl font-medium">Basic Information</h2>
                <p className="text-sm text-gray-600 dark:text-foreground  ">
                  Set up the basic details for your agent
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <label className="text-sm font-medium text-[#111111] dark:text-foreground ">
                      Agent Name
                    </label>
                    <Input
                      value={agentName}
                      onChange={(e) => setAgentName(e.target.value)}
                      placeholder="MY AI Assistant"
                      className="h-11 border-border-color-1 mt-3 text-foreground placeholder:text-foreground/70 "
                    />
                  </div>
                  <div className="space-y-4">
                    <label className="text-sm font-medium text-[#111111] dark:text-foreground">
                      Description
                    </label>
                    <Input
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="A Helpful AI Assistant for..."
                      className="h-11 border-border-color-1 mt-3 text-foreground placeholder:text-foreground/70"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          {/* </FadeUp> */}

          {/* <FadeUp delay={0.04}> */}
            <AnimatedTabsSection
              items={items}
              // ctx={ctx}
              defaultValue="prompt"
            />
          {/* </FadeUp> */}
        </div>
      </div>
      </ScaleDown>

      {/* API Modal */}
      <ApiEndpointModal
        open={apiModalOpen}
        onOpenChange={setApiModalOpen}
        agentId="my-ai-assistant"
      />
    </div>
  );
}
