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

export default function ApiEndpointModal({ open, onOpenChange, agentId = "unnamed-agent" }) {
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
    <Dialog open={open} onOpenChange={onOpenChange} className={"w-fit"}>
      <DialogContent className="w-[60%] overflow-y-scroll right-[3%] translate-x-0 left-auto top-[55%] h-[80%] custom-scrollbar">
        <div className=" py-4 px-2 w-full">
        <DialogHeader>
          <DialogTitle className="text-2xl font-medium">API Endpoint</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-8">
          {/* Agent ID and Status */}
          <div className="flex w-full h-fit gap-2">
            <div className="flex flex-col gap-2 w-full">
              <label className="text-sm text-foreground">Agent ID</label>
              <Input value={agentId} readOnly className="border border-black/20" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm text-foreground">Status</label>
              <div>
                <Badge className="bg-badge-green rounded-md px-7 py-3 text-white hover:bg-green-600">
                  Active
                </Badge>
              </div>
            </div>
          </div>

          {/* API Key */}
          <div className="flex flex-col gap-2 w-full">
            <label className="text-sm text-foreground">API Key</label>
            <div className="flex gap-2">
              <Input value={apiKey} readOnly className="border border-black/20" />
              <Button
                variant="outline"
                size="icon"
                onClick={() => copyToClipboard(apiKey)}
                className="shrink-0 flex justify-center items-center cursor-pointer  pr-0 py-5 px-5 min-w-8 bg-gray-100 rounded-lg border-black/20 "
              >
                <Copy className="w-full h-full" />
              </Button>
            </div>
            <p className="text-xs text-black/60">
              Keep your API key secure and don't share it publicly
            </p>
          </div>

          {/* Endpoint URL */}
          <div className="flex flex-col gap-2 w-full">
            <label className="text-sm text-foreground">Endpoint URL</label>
            <div className="flex gap-2">
              <Input value={endpointUrl} readOnly className="border border-black/20" />
              <Button
                variant="outline"
                size="icon"
                onClick={() => copyToClipboard(endpointUrl)}
                className="shrink-0 flex justify-center items-center cursor-pointer  pr-0 py-5 px-5 min-w-8 bg-gray-100 rounded-lg border-black/20"
              >
                <Copy className="w-full h-full" />
              </Button>
            </div>
          </div>

          {/* Code Examples */}
          <div className="space-y-3">
            <h3 className="text-xl font-medium">Code Examples</h3>
            <Tabs defaultValue="curl" className="w-full ">
              <TabsList className="w-full flex border border-black/10">
                <TabsTrigger value="curl">cURL</TabsTrigger>
                <TabsTrigger value="javascript">JavaScript</TabsTrigger>
                <TabsTrigger value="python">Python</TabsTrigger>
              </TabsList>
              <TabsContent value="curl" className="mt-4 border rounded-xl overflow-hidden w-full">
                <div className="relative w-full">
                  <pre className="rounded-lg bg-white p-4 text-sm text-foreground overflow-x-auto">
                    <code>{codeExamples.curl}</code>
                  </pre>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => copyToClipboard(codeExamples.curl)}
                    className="absolute right-2 top-2 shrink-0 flex justify-center items-center cursor-pointer  pr-0 py-5 px-5 min-w-8 bg-gray-100 rounded-lg border-black/20"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </TabsContent>
              <TabsContent value="javascript" className="mt-4 border rounded-xl overflow-hidden w-full">
                <div className="relative">
                  <pre className="rounded-lg bg-white p-4 text-sm text-foreground overflow-x-auto">
                    <code>{codeExamples.javascript}</code>
                  </pre>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => copyToClipboard(codeExamples.javascript)}
                    className="absolute right-2 top-2 shrink-0 flex justify-center items-center cursor-pointer  pr-0 py-5 px-5 min-w-8 bg-gray-100 rounded-lg border-black/20"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </TabsContent>
              <TabsContent value="python" className="mt-4 border rounded-xl overflow-hidden w-full">
                <div className="relative">
                  <pre className="rounded-lg bg-white p-4 text-sm text-foreground overflow-x-auto">
                    <code>{codeExamples.python}</code>
                  </pre>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => copyToClipboard(codeExamples.python)}
                    className="absolute right-2 top-2 shrink-0 flex justify-center items-center cursor-pointer  pr-0 py-5 px-5 min-w-8 bg-gray-100 rounded-lg border-black/20"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        </div>
      </DialogContent>
    </Dialog>
  );
}
