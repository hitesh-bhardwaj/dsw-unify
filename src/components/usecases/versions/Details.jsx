"use client";

import CountUp from "@/components/animations/CountUp";

export default function Details() {
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
      <div className="w-full  grid grid-cols-1 md:grid-cols-2 gap-8 py-6">
        {/* Feature List */}
        <div className="border border-border-color-1 rounded-3xl px-4 py-6 space-y-4">
          <h2 className="text-xl font-medium mb-4">Feature List</h2>

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
    </>
  );
}
