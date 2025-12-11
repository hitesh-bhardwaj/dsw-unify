"use client"

import * as React from "react"
import * as SeparatorPrimitive from "@radix-ui/react-separator"

import { cn } from "@/lib/utils"

/**
 * Separator component for visually separating content.
 *
 * @param {Object} props - The component props.
 * @param {string} [props.className] - Additional class names.
 * @param {"horizontal"|"vertical"} [props.orientation="horizontal"] - The orientation of the separator.
 * @param {boolean} [props.decorative=true] - Whether the separator is purely decorative.
 * @returns {React.JSX.Element} The rendered Separator component.
 */
function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}) {
  return (
    <SeparatorPrimitive.Root
      data-slot="separator"
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "bg-border-color-0 shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
        className
      )}
      {...props} />
  );
}

export { Separator }
