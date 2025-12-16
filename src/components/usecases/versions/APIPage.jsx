"use client";

import { useState } from "react";
import CountUp from "@/components/animations/CountUp";
import { Input } from "@/components/ui/input";
import AnimatedTabsSection from "@/components/common/TabsPane";
import { Copy, Check } from "lucide-react";
export default function APIPage() {
  const apiBase =
    process.env.NEXT_PUBLIC_MODEL_API_BASE_URL || "https://api.example.com";
  const [endpointUrl] = useState(
    `${apiBase}/v1/models/1/versions/v1-1/predict`
  );
  const [apiKey] = useState(
    process.env.NEXT_PUBLIC_MODEL_API_KEY || "YOUR_API_KEY"
  );

  

  const errorCodes = [
    {
      code: "400",
      title: "Bad Request",
      description: "Invalid input data or missing required fields",
    },
    {
      code: "401",
      title: "Unauthorized",
      description: "Invalid or missing API key",
    },
    {
      code: "429",
      title: "Too Many Requests",
      description: "Rate limit exceeded",
    },
    {
      code: "503",
      title: "Service Unavailable",
      description: "Model is not deployed or temporarily unavailable",
    },
  ];

  const hyperparams = `{
  "max_depth": 6,
  "learning_rate": 0.1,
  "n_estimators": 100,
  "subsample": 0.8  
}`;

  const codeExamples = {
    curl: `curl -X POST "${endpointUrl}" \\
  -H "Authorization: Bearer ${apiKey}" \\
  -H "Content-Type: application/json" \\
  -d '{
    "features": {
      "age": 35,
      "income": 75000,
      "credit_score": 720,
      "account_balance": 15000,
      "transaction_frequency": 45,
      "claim_history": 0,
      "policy_duration": 36,
      "coverage_amount": 500000
    }
  }'`,

    python: `import requests

url = "${endpointUrl}"
headers = {
    "Authorization": "Bearer ${apiKey}",
    "Content-Type": "application/json"
}
data = {
    "features": {
        "age": 35,
        "income": 75000,
        "credit_score": 720,
        "account_balance": 15000,
        "transaction_frequency": 45,
        "claim_history": 0,
        "policy_duration": 36,
        "coverage_amount": 500000
    }
}

response = requests.post(url, headers=headers, json=data)
print(response.json())`,

    javascript: `const response = await fetch("${endpointUrl}", {
  method: "POST",
  headers: {
    "Authorization": "Bearer ${apiKey}",
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    features: {
      age: 35,
      income: 75000,
      credit_score: 720,
      account_balance: 15000,
      transaction_frequency: 45,
      claim_history: 0,
      policy_duration: 36,
      coverage_amount: 500000
    }
  })
});

const data = await response.json();
console.log(data);`,

    java: `import java.net.HttpURLConnection;
import java.net.URL;
import java.io.OutputStream;
import java.io.BufferedReader;
import java.io.InputStreamReader;

public class APIPredict {
    public static void main(String[] args) throws Exception {
        URL url = new URL("${endpointUrl}");
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.setRequestMethod("POST");
        conn.setRequestProperty("Authorization", "Bearer ${apiKey}");
        conn.setRequestProperty("Content-Type", "application/json");
        conn.setDoOutput(true);

        String jsonInput = "{\\"features\\":{\\"age\\":35,\\"income\\":75000,\\"credit_score\\":720,\\"account_balance\\":15000,\\"transaction_frequency\\":45,\\"claim_history\\":0,\\"policy_duration\\":36,\\"coverage_amount\\":500000}}";

        try (OutputStream os = conn.getOutputStream()) {
            os.write(jsonInput.getBytes());
        }

        BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
        String line;
        while ((line = br.readLine()) != null) {
            System.out.println(line);
        }
    }
}`,
  };

  const tabItems = [
    {
      id: "curl",
      value: "curl",
      label: "cURL",
      name: "cURL",
      render: () => <CodeBlock code={codeExamples.curl} />,
    },
    {
      id: "python",
      value: "python",
      label: "Python",
      name: "Python",
      render: () => <CodeBlock code={codeExamples.python} />,
    },
    {
      id: "javascript",
      value: "javascript",
      label: "JavaScript",
      name: "JavaScript",
      render: () => <CodeBlock code={codeExamples.javascript} />,
    },
    {
      id: "java",
      value: "java",
      label: "Java",
      name: "Java",
      render: () => <CodeBlock code={codeExamples.java} />,
    },
  ];

  return (
    <>
      {/* ---------------------------------------------------------------------- */}
      {/* API DOCUMENTATION */}
      {/* ---------------------------------------------------------------------- */}
      <div className="w-full gap-8 py-6">
        <div className="border border-border-color-0 rounded-3xl px-4 py-6 space-y-4">
          <div className="space-y-1">
            <h2 className="text-xl font-medium">API Documentation</h2>
            <p className="text-sm text-foreground/80">
              Use the following endpoints to interact with your deployed model
              version programmatically.
            </p>
          </div>

          {/* Endpoint */}
          <div className="space-y-4">
            <label className="text-lg font-medium text-[#111111]">
              Endpoint URL
            </label>
            <Input
              placeholder={endpointUrl}
              className="h-11 border-[#AAAAAA] mt-2"
            />
          </div>

          {/* Authentication */}
          <div className="space-y-1 pt-4">
            <label className="text-lg font-medium text-[#111111]">
              Authentication
            </label>
            <p className="text-sm text-foreground/80 pt-2">
              All API requests require an API key in the Authorization header.
            </p>
            <Input
              placeholder="Authorization: Bearer YOUR_API_KEY"
              className="h-11 border-[#AAAAAA] mt-2"
            />
          </div>

          {/* Request Format */}
          <div className="pt-6">
            <label className="text-lg font-medium text-[#111111]">
              Request Format
            </label>

            <div className="mt-4">
              <AnimatedTabsSection items={tabItems} defaultValue="curl" />
            </div>
          </div>

          {/* Response Format */}
          <div className="pt-6 space-y-3">
            <label className="text-lg font-medium text-[#111111]">
              Response Format
            </label>

            <pre className="rounded-xl bg-background border border-border-color-0 p-4 text-xs text-foreground/80 overflow-x-auto">
              {`{
  "prediction": "No Fraud",
  "confidence": 0.924,
  "risk_score": 0.076,
  "model_version": "v3",
  "timestamp": "2025-01-15T10:30:45Z",
  "request_id": "req_abc123xyz"
}`}
            </pre>
          </div>

          {/* Rate Limits */}
          <div className="pt-10">
            <h3 className="text-lg font-medium">Rate Limits</h3>

            <div className="flex justify-between gap-4  mt-4 min-h-32">
              <div className="border border-border-color-0 w-full rounded-xl  p-4 bg-background  text-left flex flex-col justify-between">
                <p className="text-sm text-foreground/80">
                  Requests per minute
                </p>
                <p className="text-4xl font-medium mt-1">
                      <CountUp value='1000' duration={1.2} startOnView once />
                  
                  </p>
              </div>

              <div className="border border-border-color-0 w-full rounded-xl p-4 bg-background flex flex-col justify-between text-left">
                <p className="text-sm text-foreground/80">Requests per day</p>
                <p className="text-4xl font-medium mt-1">                      <CountUp value='1000' duration={1.2} startOnView once />


                </p>
              </div>

              <div className="border border-border-color-0 w-full rounded-xl p-4 bg-background flex flex-col justify-between text-left">
                <p className="text-sm text-foreground/80">Average latency</p>
                <p className="text-4xl font-medium mt-1">                      <CountUp value='100' duration={1.2} startOnView once />

                  ms
                </p>
              </div>
            </div>
          </div>

          {/* Error Codes */}
          <div className="pt-4">
            <h3 className="text-lg font-medium">Error Codes</h3>

            <div className="space-y-3 mt-3">
              {errorCodes.map((err, index) => (
                <div
                  key={index}
                  className="border border-border-color-0 rounded-xl px-4 py-5 bg-background flex gap-4"
                >
                  <p className="font-medium text-sm w-12">{err.code}</p>

                  <div className="space-y-1">
                    <p className="font-medium text-sm">{err.title}</p>
                    <p className="text-xs text-foreground/80 ">
                      {err.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function CodeBlock({ code }) {

  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code); 
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 1500);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };


  return (
    <>
    <pre className="rounded-lg bg-background relative  p-4 text-xs text-foreground overflow-x-auto border border-border-color-0">
      <code>{code}</code>
    </pre>
    <div className="absolute right-5 top-5">
      <div
            onClick={handleCopy}
            className="p-3 cursor-pointer text-icon-color-2 bg-icon-color-2/10 rounded-lg transition duration-200 ease-in-out flex items-center justify-center"
          >
            {copied ? (
              <Check className="w-5 h-5 text-icon-color-2" />
            ) : (
              <Copy className="w-5 h-5" />
            )}
          </div>
    </div>
    </>

  );
}



/* ------------------------------------------------------------- */
/* Version History Data */
/* ------------------------------------------------------------- */

const historyData = [
  {
    version: "Version 3",
    current: true,
    modified: "Just now",
    description: "Added 2 new features and updated transformation logic",
  },
  {
    version: "Version 2",
    modified: "1 week ago",
    description: "Updated join configuration for orders table",
    current: false,
  },
  {
    version: "Version 1",
    created: "2025-11-18T10:59:04.265Z",
    description: "Initial feature view creation",
    current: false,
  },
];
