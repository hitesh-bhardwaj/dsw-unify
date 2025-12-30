import CountUp from '@/components/animations/CountUp'
import { Zap, FileText } from 'lucide-react';
import React from 'react'

const Overview = () => {
  // LLM Configuration data
  const llmConfig = [
    { label: "Llm Model", value: "gpt-4" },
    { label: "Temperature", value: "0.7" },
    { label: "Max Tokens", value: "2000" },
    { label: "Top P", value: "0.9" },
  ];

  // Tools data
  const tools = [
    "Web Search",
    "Calculator",
    "Email Sender",
    "Database Query",
    "Weather API",
  ];

  // Knowledge Base data
  const knowledgeBases = [
    "Company Policies",
    "Product Documentation",
    "FAQ Database",
  ];

  const systemPrompt = "You are a helpful assistant designed to help users with their tasks efficiently.";

  return (
    <>
      <div className="flex-1 overflow-auto bg-background py-3">
        <div className="mx-auto space-y-6">
          {/* Top Three Columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* LLM Configuration */}
            <div className="border border-border-color-0 rounded-3xl bg-white px-4 py-6 space-y-4 dark:bg-card">
              <h2 className="text-xl font-medium mb-4">LLM Configuration</h2>
              <div className="space-y-2">
                {llmConfig.map((item, idx) => (
                  <div
                    key={idx}
                    className="border border-border-color-0 rounded-lg px-4 py-3 space-y-1"
                  >
                    <p className="text-xs text-foreground/60">{item.label}</p>
                    <p className="text-sm text-foreground font-medium">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Tools */}
            <div className="border border-border-color-0 rounded-3xl bg-white px-4 py-6 space-y-4 dark:bg-card">
              <h2 className="text-xl font-medium mb-4">Tools</h2>
              <div className="space-y-2">
                {tools.map((tool, idx) => (
                  <div
                    key={idx}
                    className="border border-border-color-0 rounded-lg px-4 py-3 text-sm text-foreground/80 flex items-center justify-between"
                  >
                    {tool}
                    <Zap className="w-4 h-4 text-foreground/40" />
                  </div>
                ))}
              </div>
            </div>

            {/* Knowledge Base */}
            <div className="border border-border-color-0 rounded-3xl bg-white px-4 py-6 space-y-4 dark:bg-card">
              <h2 className="text-xl font-medium mb-4">Knowledge Base</h2>
              <div className="space-y-2">
                {knowledgeBases.map((kb, idx) => (
                  <div
                    key={idx}
                    className="border border-border-color-0 rounded-lg px-4 py-3 text-sm text-foreground/80 flex items-center justify-between"
                  >
                    {kb}
                    <FileText className="w-4 h-4 text-foreground/40" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* System Prompt Section */}
          <div className="border border-border-color-0 rounded-3xl bg-white px-4 py-6 space-y-4 dark:bg-card">
            <h2 className="text-xl font-medium">System Prompt</h2>
            <div className="border border-border-color-0 rounded-lg px-4 py-3 bg-background text-sm text-foreground/80">
              {systemPrompt}
            </div>
          </div>

          {/* Performance Metrics Cards */}
          <div className="!w-full mt-10">
            <h2 className="text-2xl font-medium mb-6">Performance Metrics</h2>

            <div className="flex w-full gap-4 justify-between">
              <div className="border border-border-color-0 flex flex-col gap-7 rounded-3xl px-4 py-4 !w-full bg-white dark:bg-card">
                <p className="text-sm text-foreground mb-2">Success Rate</p>
                <p className="text-2xl font-medium text-badge-green">
                  <CountUp value="99.2%" startOnView />
                </p>
              </div>
              <div className="border border-border-color-0 flex flex-col gap-7 rounded-3xl px-4 py-4 !w-full bg-white dark:bg-card">
                <p className="text-sm text-foreground mb-2">Avg Response Time</p>
                <p className="text-2xl font-medium text-badge-green">
                  <CountUp value="245ms" startOnView />
                </p>
              </div>
              <div className="border border-border-color-0 flex flex-col gap-7 rounded-3xl px-4 py-4 !w-full bg-white dark:bg-card">
                <p className="text-sm text-foreground mb-2">Total Requests</p>
                <p className="text-2xl font-medium text-badge-green">
                  <CountUp value="12,847" startOnView />
                </p>
              </div>
              <div className="border border-border-color-0 flex flex-col gap-7 rounded-3xl px-4 py-4 !w-full bg-white dark:bg-card">
                <p className="text-sm text-foreground mb-2">Active Users</p>
                <p className="text-2xl font-medium text-badge-green">
                  <CountUp value="156" startOnView />
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Overview