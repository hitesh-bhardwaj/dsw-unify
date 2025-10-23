"use client";

import { Copy, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

export function ApiEndpointModal({ open, onOpenChange, agentId = "unnamed-agent" }) {
  const apiKey = "sk-agent-...";
  const endpointUrl = `https://api.agentstudio.com/v1/agents/${agentId}/chat`;

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const codeExamples = {
    curl: `curl -X POST "${endpointUrl}" \\
  -H "Authorization: Bearer ${apiKey}..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "message": "Hello, how can you help me?"
  }'`,
    javascript: `const response = await fetch("${endpointUrl}", {
  method: "POST",
  headers: {
    "Authorization": "Bearer ${apiKey}...",
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    message: "Hello, how can you help me?"
  })
});

const data = await response.json();
console.log(data);`,
    python: `import requests

url = "${endpointUrl}"
headers = {
    "Authorization": "Bearer ${apiKey}...",
    "Content-Type": "application/json"
}
data = {
    "message": "Hello, how can you help me?"
}

response = requests.post(url, headers=headers, json=data)
print(response.json())`,
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">API Endpoint</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Agent ID and Status */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Agent ID</label>
              <Input value={agentId} readOnly className="bg-gray-50" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Status</label>
              <div>
                <Badge className="bg-green-500 text-white hover:bg-green-600">
                  Active
                </Badge>
              </div>
            </div>
          </div>

          {/* API Key */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">API Key</label>
            <div className="flex gap-2">
              <Input value={apiKey} readOnly className="flex-1 bg-gray-50" />
              <Button
                variant="outline"
                size="icon"
                onClick={() => copyToClipboard(apiKey)}
                className="shrink-0"
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-gray-500">
              Keep your API key secure and don't share it publicly
            </p>
          </div>

          {/* Endpoint URL */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Endpoint URL</label>
            <div className="flex gap-2">
              <Input value={endpointUrl} readOnly className="flex-1 bg-gray-50" />
              <Button
                variant="outline"
                size="icon"
                onClick={() => copyToClipboard(endpointUrl)}
                className="shrink-0"
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Code Examples */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Code Examples</h3>
            <Tabs defaultValue="curl" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="curl">cURL</TabsTrigger>
                <TabsTrigger value="javascript">JavaScript</TabsTrigger>
                <TabsTrigger value="python">Python</TabsTrigger>
              </TabsList>
              <TabsContent value="curl" className="mt-4">
                <div className="relative">
                  <pre className="rounded-lg bg-gray-900 p-4 text-sm text-gray-100 overflow-x-auto">
                    <code>{codeExamples.curl}</code>
                  </pre>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => copyToClipboard(codeExamples.curl)}
                    className="absolute right-2 top-2 bg-white"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </TabsContent>
              <TabsContent value="javascript" className="mt-4">
                <div className="relative">
                  <pre className="rounded-lg bg-gray-900 p-4 text-sm text-gray-100 overflow-x-auto">
                    <code>{codeExamples.javascript}</code>
                  </pre>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => copyToClipboard(codeExamples.javascript)}
                    className="absolute right-2 top-2 bg-white"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </TabsContent>
              <TabsContent value="python" className="mt-4">
                <div className="relative">
                  <pre className="rounded-lg bg-gray-900 p-4 text-sm text-gray-100 overflow-x-auto">
                    <code>{codeExamples.python}</code>
                  </pre>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => copyToClipboard(codeExamples.python)}
                    className="absolute right-2 top-2 bg-white"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
