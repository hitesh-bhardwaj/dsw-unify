"use client";

import { useState } from "react";
import { ArrowLeft, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ApiEndpointModal } from "@/components/api-endpoint-modal";
import Link from "next/link";

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
      <div className="border-b bg-white p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/agents">
              <Button variant="ghost" size="icon" className="shrink-0">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold">Agent Builder</h1>
              <p className="text-sm text-gray-600">
                Configure your AI agent with custom prompts, models, and tools
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={() => setApiModalOpen(true)}
              className="gap-2 border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              <span className="text-lg">📄</span>
              API
            </Button>
            <Button
              variant="outline"
              className="gap-2 border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              <span className="text-lg">🧪</span>
              Test
            </Button>
            <Button className="bg-[#FF5722] hover:bg-[#E64A19] text-white gap-2">
              <span className="text-lg">✏️</span>
              Save Agent
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold">Basic Information</h2>
              <p className="text-sm text-gray-600">
                Set up the basic details for your agent
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Agent Name
                  </label>
                  <Input
                    value={agentName}
                    onChange={(e) => setAgentName(e.target.value)}
                    placeholder="MY AI Assistant"
                    className="h-11"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <Input
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="A Helpful AI Assistant for..."
                    className="h-11"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Configuration Tabs */}
          <Card>
            <CardContent className="pt-6">
              <Tabs defaultValue="prompt" className="w-full">
                <TabsList className="grid w-full grid-cols-8 mb-6">
                  <TabsTrigger value="prompt" className="text-[#FF5722] data-[state=active]:text-[#FF5722]">
                    Prompt
                  </TabsTrigger>
                  <TabsTrigger value="model">Model</TabsTrigger>
                  <TabsTrigger value="tools">Tools</TabsTrigger>
                  <TabsTrigger value="knowledge">Knowledge</TabsTrigger>
                  <TabsTrigger value="memory">Memory</TabsTrigger>
                  <TabsTrigger value="guardrails">Guardrails</TabsTrigger>
                  <TabsTrigger value="finetuning">Finetuning</TabsTrigger>
                  <TabsTrigger value="tags">Tags</TabsTrigger>
                </TabsList>

                <TabsContent value="prompt" className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">System Prompt</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Define how your agent should behave and respond
                    </p>

                    {/* Search Existing Prompts */}
                    <div className="space-y-2 mb-4">
                      <label className="text-sm font-medium text-gray-700">
                        Search Existing Prompts
                      </label>
                      <div className="relative">
                        <Input
                          value={searchPrompt}
                          onChange={(e) => setSearchPrompt(e.target.value)}
                          placeholder="Search by name, tags or content..."
                          className="h-11"
                        />
                      </div>
                    </div>

                    {/* System Prompt Textarea */}
                    <div className="space-y-2 mb-4">
                      <Textarea
                        value={systemPrompt}
                        onChange={(e) => setSystemPrompt(e.target.value)}
                        placeholder="You are a helpful AI assistant that..."
                        className="min-h-[200px] resize-none"
                      />
                    </div>

                    {/* Generate or Enhance Prompt */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        Generate or Enhance Prompt
                      </label>
                      <div className="flex gap-2">
                        <Input
                          value={enhancePrompt}
                          onChange={(e) => setEnhancePrompt(e.target.value)}
                          placeholder="Describe how you want to modify the prompt..."
                          className="h-11 flex-1"
                        />
                        <Button className="bg-[#FF5722] hover:bg-[#E64A19] text-white gap-2">
                          <Sparkles className="h-4 w-4" />
                          Generate
                        </Button>
                      </div>
                      <p className="text-xs text-gray-500">
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
