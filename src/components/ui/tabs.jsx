"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"

import { cn } from "@/lib/utils"

/**
 * Tabs component for managing tabbed content.
 *
 * @param {Object} props - The component props.
 * @param {string} [props.className] - Additional class names.
 * @returns {React.JSX.Element} The rendered Tabs component.
 */
function Tabs({
  className,
  ...props
}) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn("flex flex-col gap-2", className)}
      {...props} />
  );
}

/**
 * TabsList component for the list of tab triggers.
 *
 * @param {Object} props - The component props.
 * @param {string} [props.className] - Additional class names.
 * @returns {React.JSX.Element} The rendered TabsList component.
 */
function TabsList({
  className,
  ...props
}) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        "bg-muted text-muted-foreground inline-flex h-fit w-fit items-center justify-center rounded-lg p-[4px]",
        className
      )}
      {...props} />
  );
}

/**
 * TabsTrigger component for switching tabs.
 *
 * @param {Object} props - The component props.
 * @param {string} [props.className] - Additional class names.
 * @returns {React.JSX.Element} The rendered TabsTrigger component.
 */
function TabsTrigger({
  className,
  ...props
}) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        "data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:border data-[state=active]:font-medium data-[state=active]:border-black/10 dark:data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 text-foreground dark:text-muted-foreground inline-flex h-fit flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-3 text-sm whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 cursor-pointer",
        className
      )}
      {...props} />
  );
}

/**
 * TabsContent component for the content of a tab.
 *
 * @param {Object} props - The component props.
 * @param {string} [props.className] - Additional class names.
 * @returns {React.JSX.Element} The rendered TabsContent component.
 */
function TabsContent({
  className,
  ...props
}) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn("flex-1 outline-none", className)}
      {...props} />
  );
}

export { Tabs, TabsList, TabsTrigger, TabsContent }
