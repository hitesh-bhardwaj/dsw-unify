import { cn } from "@/lib/utils";

/**
 * Component for displaying a section header with a title and optional description.
 *
 * @param {Object} props - The component props.
 * @param {string} props.title - The title of the section.
 * @param {string} [props.description] - The description of the section.
 * @param {string} [props.className] - Additional class names.
 * @returns {React.JSX.Element} The rendered SectionHeader component.
 */
export function SectionHeader({ title, description, className }) {
  return (
    <div className={cn("space-y-2", className)}>
      <h2 className="text-3xl font-medium tracking-tight">{title}</h2>
      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
    </div>
  );
}
