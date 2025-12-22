"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";

export default function APITab({ agentId, versionId }) {
  const apiBase =
    process.env.NEXT_PUBLIC_AGENT_API_BASE_URL || "https://api.unifyai.com";

  const endpointUrl = `${apiBase}/v1/agents/${agentId}/versions/${versionId}/invoke`;

  const exampleRequest = `curl -X POST \\
  https://api.unifyai.com/v1/agents/1/versions/av1-1/invoke \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
  "message": "Your message here",
  "session_id": "optional-session-id"
}'`;

  const exampleResponse = `{
  "response": "Agent response text",
  "session_id": "session-123",
  "metadata": {
    "tokens_used": 245,
    "response_time": 1.2,
    "tools_called": ["web_search"]
  }
}`;

  return (
    <div className="w-full gap-8 py-3">
      <div className="border border-border-color-0 rounded-3xl px-4 py-6 space-y-6 dark:bg-card">
        <div className="space-y-1">
          <h2 className="text-xl font-medium">API Endpoint</h2>
          <p className="text-sm text-foreground/80">
            Use this endpoint to interact with the agent version.
          </p>
        </div>

        {/* Endpoint URL */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-foreground/80">
            Endpoint URL
          </label>
          <Input
            value={endpointUrl}
            readOnly
            className="h-11 border-border-color-0 bg-background"
          />
        </div>

        {/* Example Request */}
        <div className="space-y-3 pt-4">
          <label className="text-sm font-medium text-foreground">
            Example Request
          </label>
          <pre className="rounded-lg bg-background border border-border-color-0 p-4 text-xs text-foreground/80 overflow-x-auto">
            <code>{exampleRequest}</code>
          </pre>
        </div>

        {/* Example Response */}
        <div className="space-y-3 pt-4">
          <label className="text-sm font-medium text-foreground">
            Example Response
          </label>
          <pre className="rounded-lg bg-background border border-border-color-0 p-4 text-xs text-foreground/80 overflow-x-auto">
            <code>{exampleResponse}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
