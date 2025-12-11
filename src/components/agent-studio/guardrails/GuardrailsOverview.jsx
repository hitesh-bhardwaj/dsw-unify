import React from "react";

const stats = [
  {
    title: "Severity",
    value: "High",
    isActive: false,
  },
  {
    title: "Triggers Today",
    value: "45",
    isActive: false,
  },
  {
    title: "Status",
    value: "Active",
    isActive: true,
  },
];

const data = {
  rules: ["Block hate speech", "Filter violence", "Prevent self-harm content"],
  actions: ["Block response", "Log incident", "Alert moderator"],
};

const GuardrailsOverviews = () => {
  return (
    <div className="space-y-6">
      <div className="w-full flex items-center justify-between gap-4">
        {stats.map((item, index) => (
          <div
            key={index}
            className="flex flex-col gap-10 border border-border-color-0 rounded-xl py-6 px-4 w-full"
          >
            <span className="text-sm text-foreground/80">{item.title}</span>

            <div className="flex items-center gap-2">
              <span className="text-2xl font-medium">{item.value}</span>
              {item.isActive && (
                <span className="text-xs border border-badge-green px-3 py-1 rounded-full">
                  Active
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="w-full flex items-start justify-between gap-6">
        {/* Rules */}
        <div className="w-full space-y-4 border rounded-3xl p-6 border-border-color-0">
          <h2 className="text-lg font-medium text-foreground">Rules</h2>

          {data.rules.map((item, index) => (
            <div key={index} className="flex items-center gap-4">
              <span className="w-2 h-2 rounded-full bg-badge-green"></span>
              <span className="text-sm text-foreground">{item}</span>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="w-full space-y-4 border rounded-3xl p-6 border-border-color-0">
          <h2 className="text-lg font-medium text-foreground">Actions</h2>

          {data.actions.map((item, index) => (
            <div key={index} className="flex items-center gap-4">
              <span className="w-2 h-2 rounded-full bg-badge-green"></span>
              <span className="text-sm text-foreground">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GuardrailsOverviews;
