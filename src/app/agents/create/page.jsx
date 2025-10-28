"use client";

import { useState } from "react";
import { ArrowLeft} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { ApiEndpointModal } from "@/components/api-endpoint-modal";
import Link from "next/link";
import { AiGenerator, EditIcon, LeftArrow, SearchIcon, SparklesIcon } from "@/components/Icons";
import ApiEndpointModal from "@/components/api-endpoint-modal";

export default function CreateAgentPage() {
  const [apiModalOpen, setApiModalOpen] = useState(false);
  const [agentName, setAgentName] = useState("MY AI Assistant");
  const [description, setDescription] = useState("A Helpful AI Assistant for...");
  const [systemPrompt, setSystemPrompt] = useState("You are a helpful AI assistant that...");
  const [searchPrompt, setSearchPrompt] = useState("");
  const [enhancePrompt, setEnhancePrompt] = useState("");

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className=" bg-white p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-start gap-3">
            <Link href="/agents">
              <Button variant="ghost" size="icon" className="shrink-0 w-fit -mt-0.5">
                {/* <ArrowLeft className="h-5 w-5" /> */}
                <LeftArrow/>
              </Button>
            </Link>
            <div className="space-y-2">
              <h1 className="text-2xl font-medium">Agent Builder</h1>
              <p className="text-sm text-gray-600">
                Configure your AI agent with custom prompts, models, and tools
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={() => setApiModalOpen(true)}
              className="gap-2 text-foreground border border-primary"
            >
              <div className="!w-4">
                <AiGenerator/>
              </div>
              API
            </Button>
            <Button
              variant="outline"
              className="gap-2 text-foreground border border-primary"
            >
              <div className="!w-4">
                <AiGenerator/>
              </div>
              Test
            </Button>
            <Link href={`/agents/edit`}>
              <Button className="bg-primary hover:bg-[#E64A19] text-white gap-2">
                <div className="!w-4">
              
                <EditIcon className={"text-white"}/>
              </div>
               Save Agent
              </Button>
            </Link>
          </div>
        
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-6xl mx-auto ">
          {/* Basic Information */}
          <Card className={"h-full py-10 shadow-none border-[#AAAAAA]"}>
            <CardHeader>
              <h2 className="text-xl font-medium">Basic Information</h2>
              <p className="text-sm text-gray-600">
                Set up the basic details for your agent
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <label className="text-sm font-medium text-[#111111]">
                    Agent Name
                  </label>
                  <Input
                    value={agentName}
                    onChange={(e) => setAgentName(e.target.value)}
                    placeholder="MY AI Assistant"
                    className="h-11 border-[#AAAAAA] mt-3"
                  />
                </div>
                <div className="space-y-4">
                  <label className="text-sm font-medium text-[#111111]">
                    Description
                  </label>
                  <Input
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="A Helpful AI Assistant for..."
                    className="h-11 border-[#AAAAAA] mt-3"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Configuration Tabs */}
          <Card className={"border-none shadow-none "}>
            <CardContent className="pt-2 px-0">
              <Tabs defaultValue="prompt" className="w-full">
                <TabsList className="grid w-full grid-cols-8 mb-6 border h-15 px-1.5 py-1.5">
                  <TabsTrigger value="prompt" className="text-[#333333] data-[state=active]:text-[#FF5722] py-3 data-[state=active]:shadow-none data-[state=active]:border-[#DCDCDC]">
                    Prompt
                  </TabsTrigger>
                  <TabsTrigger value="model" className="text-[#333333] data-[state=active]:text-[#FF5722] py-3 data-[state=active]:shadow-none data-[state=active]:border-[#DCDCDC]">Model</TabsTrigger>
                  <TabsTrigger value="tools" className="text-[#333333] data-[state=active]:text-[#FF5722] py-3 data-[state=active]:shadow-none data-[state=active]:border-[#DCDCDC]">Tools</TabsTrigger>
                  <TabsTrigger value="knowledge" className="text-[#333333] data-[state=active]:text-[#FF5722] py-3 data-[state=active]:shadow-none data-[state=active]:border-[#DCDCDC]">Knowledge</TabsTrigger>
                  <TabsTrigger value="memory" className="text-[#333333] data-[state=active]:text-[#FF5722] py-3 data-[state=active]:shadow-none data-[state=active]:border-[#DCDCDC]">Memory</TabsTrigger>
                  <TabsTrigger value="guardrails" className="text-[#333333] data-[state=active]:text-[#FF5722] py-3 data-[state=active]:shadow-none data-[state=active]:border-[#DCDCDC]">Guardrails</TabsTrigger>
                  <TabsTrigger value="finetuning" className="text-[#333333] data-[state=active]:text-[#FF5722] py-3 data-[state=active]:shadow-none data-[state=active]:border-[#DCDCDC]">Finetuning</TabsTrigger>
                  <TabsTrigger value="tags" className="text-[#333333] data-[state=active]:text-[#FF5722] py-3 data-[state=active]:shadow-none data-[state=active]:border-[#DCDCDC]">Tags</TabsTrigger>
                </TabsList>

                <TabsContent value="prompt" className="space-y-6 border rounded-3xl p-6 border-[#AAAAAA] h-full pb-8 ">
                  <div >
                    <h3 className="text-xl font-medium mb-2">System Prompt</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Define how your agent should behave and respond
                    </p>

                    {/* Search Existing Prompts */}
                    <div className="space-y-2 mb-4 mt-8">
                      <label className="text-sm font-medium text-[#11111]">
                        Search Existing Prompts
                      </label>
                      <div className="relative mt-2 ">
                        <div className="absolute top-6 left-5 -translate-y-1/2">
                        <SearchIcon className="!h-4 !w-auto"/>

                        </div>
                        <Input
                          value={searchPrompt}
                          onChange={(e) => setSearchPrompt(e.target.value)}
                          placeholder="Search by name, tags or content..."
                          className="h-11 pl-12 border-[#AAAAAA] !text-xs"
                        />
                      </div>
                    </div>

                    {/* System Prompt Textarea */}
                    <div className="space-y-2 mb-4">
                      <Textarea
                        value={systemPrompt}
                        onChange={(e) => setSystemPrompt(e.target.value)}
                        placeholder="You are a helpful AI assistant that..."
                        className="min-h-[200px] resize-none border-[#AAAAAA] !text-xs p-4"
                      />
                    </div>

                    {/* Generate or Enhance Prompt */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-[#111111]">
                        Generate or Enhance Prompt
                      </label>
                      <div className="flex gap-2 mt-2">
                        <Input
                          value={enhancePrompt}
                          onChange={(e) => setEnhancePrompt(e.target.value)}
                          placeholder="Describe how you want to modify the prompt..."
                          className="h-11 flex-1 !text-xs p-4 border-[#AAAAAA] shadow-none"
                        />
                        <Button className="bg-primary hover:bg-[#E64A19] text-white gap-2 !h-10.5  cursor-pointer w-30 rounded-lg">
                         <SparklesIcon/>
                          Generate
                        </Button>
                      </div>
                      <p className="text-xs text-[#111111]">
                        Use natural language to create a new prompt or enhance the existing one
                      </p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="model">
                  <div className="text-center py-12 text-gray-500">
                    Model configuration coming soon...
                  </div>
                </TabsContent>

                <TabsContent value="tools">
                  <div className="text-center py-12 text-gray-500">
                    Tools configuration coming soon...
                  </div>
                </TabsContent>

                <TabsContent value="knowledge">
                  <div className="text-center py-12 text-gray-500">
                    Knowledge configuration coming soon...
                  </div>
                </TabsContent>

                <TabsContent value="memory">
                  <div className="text-center py-12 text-gray-500">
                    Memory configuration coming soon...
                  </div>
                </TabsContent>

                <TabsContent value="guardrails">
                  <div className="text-center py-12 text-gray-500">
                    Guardrails configuration coming soon...
                  </div>
                </TabsContent>

                <TabsContent value="finetuning">
                  <div className="text-center py-12 text-gray-500">
                    Finetuning configuration coming soon...
                  </div>
                </TabsContent>

                <TabsContent value="tags">
                  <div className="text-center py-12 text-gray-500">
                    Tags configuration coming soon...
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* API Modal */}
      <ApiEndpointModal
        open={apiModalOpen}
        onOpenChange={setApiModalOpen}
        agentId="my-ai-assistant"
      />
    </div>
  );
}
