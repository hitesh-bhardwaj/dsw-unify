"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
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
import ModelGrid from "@/components/agent-studio/agents/ModelGrid";
import KnowledgeBaseList from "@/components/agent-studio/agents/KnowledgeBase/KnowledgeList";
import MemoriesList from "@/components/agent-studio/agents/MemoryList";
import TagsGrid from "@/components/agent-studio/agents/TagsGrid";
import ToolsList from "@/components/agent-studio/agents/tools/ToolsList";
import PromptCardGrid from "@/components/prompt-card-grid";
import GuardrailsGrid from "@/components/agent-studio/agents/GuardrailsGrid";
import FinetuningGrid from "@/components/agent-studio/agents/FinetuningGrid";
import { ScaleDown } from "@/components/animations/Animations";
import { ArrowRight } from "lucide-react";
import * as agentsApi from "@/lib/api/agents";
import TestAgentModal from "@/components/agent-studio/agents/test-agent-modal";

export default function EditAgentPage({ params }) {
  const { id } = use(params);
  const router = useRouter();

  const [apiModalOpen, setApiModalOpen] = useState(false);
  const [agentName, setAgentName] = useState("");
  const [description, setDescription] = useState("");
    const [testModalOpen, setTestModalOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState(null);

  // Fetch agent data on mount
  useEffect(() => {
    async function fetchAgentData() {
      try {
        setIsFetching(true);
        const agentData = await agentsApi.getAgentById(id);

        // Populate form with existing agent data
        setAgentName(agentData.name || "");
        setDescription(agentData.description || "");
      } catch (err) {
        setError(err.message || "Failed to load agent");
        console.error("Error fetching agent:", err);
      } finally {
        setIsFetching(false);
      }
    }

    if (id) {
      fetchAgentData();
    }
  }, [id]);

  // Handle update agent
  const handleUpdateAgent = async () => {
    if (!agentName.trim()) {
      setError("Agent name is required");
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      // TODO: Collect data from all tabs (prompt, model, tools, knowledge, memory, guardrails, finetuning, tags)
      const agentData = {
        name: agentName,
        description: description,
        // Additional fields will be collected from child components
      };

      await agentsApi.updateAgent(id, agentData);

      // Redirect to agent detail page after successful update
      router.push(`/agent-studio/agents/${id}`);
    } catch (err) {
      setError(err.message || "Failed to update agent");
      console.error("Error updating agent:", err);
    } finally {
      setIsLoading(false);
    }
  };

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
       <ModelGrid/>
      ),
    },
    {
      id: "tools",
      value: "tools",
      label: "Tools",
      name: "Tools",
      render: () => (
        <ToolsList/>
      ),
    },
    {
      id: "knowledge",
      value: "knowledge",
      label: "Knowledge",
      name: "Knowledge",
      render: () => (
        <KnowledgeBaseList />
      ),
    },
    {
      id: "memory",
      value: "memory",
      label: "Memory",
      name: "Memory",
      render: () => (
        <MemoriesList/>
      ),
    },
    {
      id: "guardrails",
      value: "guardrails",
      label: "Guardrails",
      name: "Guardrails",
      render: () => (
        <GuardrailsGrid/>
      ),
    },
    {
      id: "finetuning",
      value: "finetuning",
      label: "Finetuning",
      name: "Finetuning",
      render: () => (
        <FinetuningGrid/>
      ),
    },
    {
      id: "tags",
      value: "tags",
      label: "Tags",
      name: "Tags",
      render: () => (
        <TagsGrid/>
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
              <LeftArrowAnim link={"/agent-studio/agents"} />

              <div className="space-y-2">
                <h1 className="text-2xl font-medium">
                  {isFetching ? "Loading..." : `Edit Agent: ${agentName || "Untitled"}`}
                </h1>
                <p className="text-sm text-gray-600  dark:text-foreground">
                  Modify your existing agent configuration
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
                  onClick={() => setTestModalOpen(true)}
                  variant="outline"
                  className="gap-2 text-foreground border border-primary"
                >
                  <div className="!w-4">
                    <AiGenerator />
                  </div>
                  Test
                </Button>
              </RippleButton>
              <RippleButton>
                <Button
                  onClick={handleUpdateAgent}
                  disabled={isLoading || isFetching}
                  className="bg-primary hover:bg-[#E64A19] text-white gap-2 disabled:opacity-50"
                >
                  <div className="!w-4">
                    <EditIcon className={"text-white"} />
                  </div>
                  {isLoading ? "Saving..." : "Save Agent"}
                </Button>
              </RippleButton>
            </div>
          </div>
        {/* </FadeUp> */}
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className=" mx-auto space-y-4">
          {/* Basic Information */}
          {/* <FadeUp delay={0.02}> */}
            <Card className={"h-full py-10 shadow-none border-border-color-0 bg-background"}>
              <CardHeader>
                <h2 className="text-xl font-medium">Basic Information</h2>
                <p className="text-sm text-gray-600 dark:text-foreground  ">
                  Set up the basic details for your agent
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <label className="text-sm font-medium text-foreground dark:text-foreground ">
                      Agent Name
                    </label>
                    <Input
                      value={agentName}
                      onChange={(e) => setAgentName(e.target.value)}
                      placeholder="MY AI Assistant"
                      disabled={isFetching}
                      className="h-11 border-border-color-0 mt-3 text-foreground placeholder:text-foreground/80 disabled:opacity-50"
                    />
                  </div>
                  <div className="space-y-4">
                    <label className="text-sm font-medium text-foreground dark:text-foreground">
                      Description
                    </label>
                    <Input
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="A Helpful AI Assistant for..."
                      disabled={isFetching}
                      className="h-11 border-border-color-0 mt-3 text-foreground placeholder:text-foreground/80 disabled:opacity-50"
                    />
                  </div>
                </div>
                {error && (
                  <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400 text-sm">
                    {error}
                  </div>
                )}
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
          <div className="flex items-end w-full justify-end">
            <RippleButton>
              <Button
                onClick={handleUpdateAgent}
                disabled={isLoading || isFetching}
                className="bg-primary hover:bg-[#E64A19] text-white gap-2 disabled:opacity-50"
              >
                {isLoading ? "Saving..." : "Save Changes"}
                <div className="!w-4">
                  <ArrowRight className="text-white" />
                </div>
              </Button>
            </RippleButton>
          </div>
        </div>
      </div>
      </ScaleDown>

      {/* API Modal */}
      <ApiEndpointModal
        open={apiModalOpen}
        onOpenChange={setApiModalOpen}
        agentId="my-ai-assistant"
      />
      <TestAgentModal
              open={testModalOpen}
              onOpenChange={setTestModalOpen}
              agentId={"Agent Builder"}
            />
    </div>
  );
}
