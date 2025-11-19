import { cn } from "@/lib/utils";

export function SectionHeader({ title, description, className }) {
  return (
    <div className={cn("space-y-2", className)}>
      <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
    </div>
  );
}
