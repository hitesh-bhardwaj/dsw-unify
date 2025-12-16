import CountUp from "@/components/animations/CountUp";
const usageStats = [
  {
    id: "total-calls",
    label: "Total Calls",
    value: "1,234",
  },
  {
    id: "success-rate",
    label: "Success Rate",
    value: "98.5%",
  },
  {
    id: "avg-response",
    label: "Avg Response Time",
    value: "245ms",
  },
  {
    id: "active-agents",
    label: "Active Agents",
    value: "12",
  },
];

export default function ToolsUsage() {
  return (
    <div className="h-full rounded-3xl border border-border-color-0 p-6 space-y-6 dark:bg-card">
      {/* Header */}
      <h2 className="text-xl font-medium">Parameters</h2>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {usageStats.map((stat) => (
          <div
            key={stat.id}
            className="rounded-3xl border border-border-color-0 p-6 flex flex-col justify-between min-h-[140px]"
          >
            <p className="text-sm text-muted-foreground">
              {stat.label}
            </p>

            <p className="text-3xl font-medium text-foreground">
                <CountUp value={stat.value} startOnView />
                
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
