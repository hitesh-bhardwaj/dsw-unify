"use client";

import CountUp from "@/components/animations/CountUp";
import { Input } from "@/components/ui/input";

export default function APIPage() {
  const metrics = [
    { label: "Accuracy", value: "96.3%" },
    { label: "Precision", value: "91.8%" },
    { label: "Recall", value: "89.5%" },
    { label: "F1 Score", value: "90.6%" },
    { label: "Auc", value: "0.94" },
  ];

  const features = [
    "Age",
    "Income",
    "Credit Score",
    "Account Balance",
    "Transaction Frequency",
    "Claim History",
    "Policy Duration",
    "Coverage Amount",
  ];

  const hyperparams = `{
  "max_depth": 6,
  "learning_rate": 0.1,
  "n_estimators": 100,
  "subsample": 0.8  
}`;

  return (
    <>
      <div className="w-full gap-8 py-6">
        {/* Feature List */}
        <div className="border border-border-color-1 rounded-3xl px-4 py-6 space-y-4">
          <div className="space-y-1">
          <h2 className="text-xl font-medium">API Documentation</h2>
          <p className="text-sm text-foreground/80">Use the following endpoints to interact with your deployed model version programmatically.</p>
          </div>
<div className="space-y-7">
          <div className="space-y-4">
                  <label className="text-lg font-medium text-[#111111]">
                    Endpoint URL
                  </label>
                  <Input
                    placeholder="https://api.unifyai.com/v1/models/1/versions/v1-1/predict"
                    className="h-11 border-[#AAAAAA] mt-2"
                  />
                </div>

                <div className="space-y-4">
                  <label className="text-lg font-medium text-[#111111]">
                    Authentication
                  </label>
                  <p className="text-sm text-foreground/80">All API requests require an API key in the Authorization header.</p>
                  <Input
                    placeholder="Authorization: Bearer YOUR_API_KEY"
                    className="h-11 border-[#AAAAAA] mt-2"
                  />
                </div>

                </div>


          <div className="space-y-2">
            {features.map((item, idx) => (
              <div
                key={idx}
                className="border border-border-color-1 rounded-lg px-4 py-3 text-xs text-foreground/80"
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* Model Configuration */}
        <div className="border border-border-color-1 rounded-2xl px-5 py-6 space-y-6">
          <h2 className="text-xl font-medium ">Model Configuration</h2>

          <div>
            <p className=" text-sm">Algorithm</p>
            <p className="font-semibold text-foreground/80 mt-1 text-xs">
              XGBoost
            </p>
          </div>

          <div className="space-y-2">
            <p className=" text-sm mb-2 text-foreground/80">Hyperparameters</p>
            
            <pre
              className={`rounded-lg bg-sidebar-accent p-4 text-xs border border-border-color-2 text-foreground/80 overflow-x-auto transition-opacity duration-300 ease-in
          }`}
            >
              <code>{hyperparams}</code>
            </pre>
          </div>

          <div>
            <p className="text-sm text-foreground/80">
              Cross-validation
            </p>
            <p className="text-xs font-semibold text-foreground/80 mt-1">
              5-fold
            </p>
          </div>
        </div>
      </div>
      <div className="!w-full mt-10 ">
        <h2 className="text-xl font-medium mb-6">Evaluation Metrics</h2>

        <div className="flex w-full gap-4 justify-between">
          {metrics.map((m, i) => (
            <div
              key={i}
              className="border border-border-color-1 flex flex-col gap-7  rounded-2xl px-4 py-4 !w-full bg-background"
            >
              <p className="text-sm text-foreground mb-2">{m.label}</p>
              <p className="text-2xl font-medium text-badge-green">
                <CountUp value={m.value} startOnView key={m.value}  />
                </p>
            </div>
          ))}
        </div>
      </div>
      
          <div className="w-full h-full mx-auto">
            <h2 className="text-lg font-semibold mt-2">Version History</h2>
      
            <div className="space-y-4 py-2">
              {historyData.map((item, index) => (
                <div
                  key={index}
                  className="!border  border-border-color-2 rounded-lg p-4 bg-white dark:bg-background py-6 text-xs flex justify-between items-center"
                >
                  <div className="">
                      <div className="flex gap-4">
                    <p className="font-semibold text-sm">
                      {item.version}
                      {item.current && (
                          <span className="  ml-1">
                          (Current)
                        </span>
                      )}
                    </p>
                    {item.modified && (
                     <p className="text-foreground/80 text-sm ">Modified {item.modified}</p>
                    )}
                    
                    {item.created && (
                      <p className="text-foreground/80 text-sm">Created {item.created}</p>
                    )}
                      </div>
      
      
                    <p className="text-foreground/80 mt-3 text-xs">{item.description}</p>
                  </div>
      
                  {!item.current && (
                    <button className="border border-[#FFCD41] rounded-full px-4 py-1 text-xs  ">
                      Restore
                    </button>
                  )}
      
                  {item.current && (
                    <span className="border border-[#89D7D8] rounded-full px-4 py-1 text-xs ">
                      Current
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
      
    </>
  );
}


const historyData = [
        {
          version: "Version 3",
          status: "Current",
          modified: "Just now",
          description: "Added 2 new features and updated transformation logic",
          current: true,
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