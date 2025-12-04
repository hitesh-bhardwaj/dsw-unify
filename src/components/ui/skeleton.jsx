import { cn } from "@/lib/utils"

/**
 * Skeleton component for loading states.
 *
 * @param {Object} props - The component props.
 * @param {string} [props.className] - Additional class names.
 * @returns {React.JSX.Element} The rendered Skeleton component.
 */
function Skeleton({
  className,
  ...props
}) {
  return (
    <div
      data-slot="skeleton"
      className={cn("bg-accent animate-pulse rounded-md", className)}
      {...props} />
  );
}

export { Skeleton }
