import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { ChevronRight, MoreHorizontal } from "lucide-react"

import { cn } from "@/lib/utils"

/**
 * Breadcrumb component for navigation.
 *
 * @param {Object} props - The component props.
 * @returns {React.JSX.Element} The rendered Breadcrumb component.
 */
function Breadcrumb({
  ...props
}) {
  return <nav aria-label="breadcrumb" data-slot="breadcrumb" {...props} />;
}

/**
 * BreadcrumbList component for the list of breadcrumb items.
 *
 * @param {Object} props - The component props.
 * @param {string} [props.className] - Additional class names.
 * @returns {React.JSX.Element} The rendered BreadcrumbList component.
 */
function BreadcrumbList({
  className,
  ...props
}) {
  return (
    <ol
      data-slot="breadcrumb-list"
      className={cn(
        "text-muted-foreground flex flex-wrap items-center text-sm break-words",
        className
      )}
      {...props} />
  );
}

/**
 * BreadcrumbItem component for individual breadcrumb items.
 *
 * @param {Object} props - The component props.
 * @param {string} [props.className] - Additional class names.
 * @returns {React.JSX.Element} The rendered BreadcrumbItem component.
 */
function BreadcrumbItem({
  className,
  ...props
}) {
  return (
    <li
      data-slot="breadcrumb-item"
      className={cn("inline-flex items-center gap-1.5", className)}
      {...props} />
  );
}

/**
 * BreadcrumbLink component for breadcrumb links.
 *
 * @param {Object} props - The component props.
 * @param {boolean} [props.asChild=false] - Whether to render as a child component.
 * @param {string} [props.className] - Additional class names.
 * @returns {React.JSX.Element} The rendered BreadcrumbLink component.
 */
function BreadcrumbLink({
  asChild,
  className,
  ...props
}) {
  const Comp = asChild ? Slot : "a"

  return (
    <Comp
      data-slot="breadcrumb-link"
      className={cn("hover:text-foreground transition-colors", className)}
      {...props} />
  );
}

/**
 * BreadcrumbPage component for the current page in the breadcrumb.
 *
 * @param {Object} props - The component props.
 * @param {string} [props.className] - Additional class names.
 * @returns {React.JSX.Element} The rendered BreadcrumbPage component.
 */
function BreadcrumbPage({
  className,
  ...props
}) {
  return (
    <span
      data-slot="breadcrumb-page"
      role="link"
      aria-disabled="true"
      aria-current="page"
      className={cn("text-foreground font-normal", className)}
      {...props} />
  );
}

/**
 * BreadcrumbSeparator component for separating breadcrumb items.
 *
 * @param {Object} props - The component props.
 * @param {React.ReactNode} [props.children] - The separator content.
 * @param {string} [props.className] - Additional class names.
 * @returns {React.JSX.Element} The rendered BreadcrumbSeparator component.
 */
function BreadcrumbSeparator({
  children,
  className,
  ...props
}) {
  return (
    <li
      data-slot="breadcrumb-separator"
      role="presentation"
      aria-hidden="true"
      className={cn("[&>svg]:size-3.5", className)}
      {...props}>
      {children ?? <ChevronRight />}
    </li>
  );
}

/**
 * BreadcrumbEllipsis component for indicating hidden breadcrumb items.
 *
 * @param {Object} props - The component props.
 * @param {string} [props.className] - Additional class names.
 * @returns {React.JSX.Element} The rendered BreadcrumbEllipsis component.
 */
function BreadcrumbEllipsis({
  className,
  ...props
}) {
  return (
    <span
      data-slot="breadcrumb-ellipsis"
      role="presentation"
      aria-hidden="true"
      className={cn("flex size-9 items-center justify-center", className)}
      {...props}>
      <MoreHorizontal className="size-4" />
      <span className="sr-only">More</span>
    </span>
  );
}

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,

}
