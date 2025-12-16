"use client";

export default function Settings() {
  return (
    <div className="w-full rounded-3xl border border-border-color-0 bg-background p-8 dark:bg-card">
      <div className="space-y-6 max-w-3xl">
        {/* Memory Name */}
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">
            Memory Name
          </p>
          <h2 className="text-2xl font-medium text-foreground">
            User Preferences
          </h2>
        </div>

        {/* Description */}
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">
            Description
          </p>
          <p className="text-sm text-foreground">
            Individual user preferences and settings
          </p>
        </div>

        {/* Retention Policy */}
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">
            Retention Policy
          </p>
          <p className="text-sm text-foreground">
            Keep entries for 90 days
          </p>
        </div>

        {/* Max Entries */}
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">
            Max Entries
          </p>
          <p className="text-sm text-foreground">
            10,000 entries
          </p>
        </div>
      </div>
    </div>
  );
}
