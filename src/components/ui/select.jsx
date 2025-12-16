"use client"

import * as React from "react"
import * as SelectPrimitive from "@radix-ui/react-select"
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from "lucide-react"

import { cn } from "@/lib/utils"

/**
 * Select component for choosing an item from a list.
 *
 * @param {Object} props - The component props.
 * @returns {React.JSX.Element} The rendered Select component.
 */
function Select({
  ...props
}) {
  return <SelectPrimitive.Root data-slot="select" {...props} />;
}

/**
 * SelectGroup component for grouping items in the select menu.
 *
 * @param {Object} props - The component props.
 * @returns {React.JSX.Element} The rendered SelectGroup component.
 */
function SelectGroup({
  ...props
}) {
  return <SelectPrimitive.Group data-slot="select-group" {...props} />;
}

/**
 * SelectValue component for displaying the selected value.
 *
 * @param {Object} props - The component props.
 * @returns {React.JSX.Element} The rendered SelectValue component.
 */
function SelectValue({
  ...props
}) {
  return <SelectPrimitive.Value data-slot="select-value" {...props} />;
}

/**
 * SelectTrigger component for the dropdown trigger.
 *
 * @param {Object} props - The component props.
 * @param {string} [props.className] - Additional class names.
 * @param {string} [props.size="default"] - The size of the trigger.
 * @param {React.ReactNode} props.children - The content of the trigger.
 * @returns {React.JSX.Element} The rendered SelectTrigger component.
 */
function SelectTrigger({
  className,
  size = "default",
  children,
  ...props
}) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      data-size={size}
      className={cn(
        "border-input data-[placeholder]:text-muted-foreground [&_svg:not([class*='text-'])]:text-muted-foreground  aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-background flex w-fit items-center justify-between gap-2 rounded-md border bg-transparent px-3 py-2 text-xs whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none  disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:h-9 data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 text-foreground",
        className
      )}
      {...props}>
      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronDownIcon className="size-4 text-foreground/80" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
}

/**
 * SelectContent component for the dropdown content.
 *
 * @param {Object} props - The component props.
 * @param {string} [props.className] - Additional class names.
 * @param {React.ReactNode} props.children - The content of the dropdown.
 * @param {string} [props.position="popper"] - The position of the content.
 * @param {string} [props.align="center"] - The alignment of the content.
 * @returns {React.JSX.Element} The rendered SelectContent component.
 */
function SelectContent({
  className,
  children,
  position = "popper",
  align = "center",
  ...props
}) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        data-slot="select-content"
        className={cn(
          "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] origin-(--radix-select-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border shadow-md dark:bg-background",
          position === "popper" &&
            "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
          className
        )}
        position={position}
        align={align}
        {...props}>
        <SelectScrollUpButton />
        <SelectPrimitive.Viewport
          className={cn("p-1", position === "popper" &&
            "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] scroll-my-1")}>
          {children}
        </SelectPrimitive.Viewport>
        <SelectScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
}

/**
 * SelectLabel component for labeling groups in the select menu.
 *
 * @param {Object} props - The component props.
 * @param {string} [props.className] - Additional class names.
 * @returns {React.JSX.Element} The rendered SelectLabel component.
 */
function SelectLabel({
  className,
  ...props
}) {
  return (
    <SelectPrimitive.Label
      data-slot="select-label"
      className={cn("text-muted-foreground px-2 py-1.5 text-xs ", className)}
      {...props} />
  );
}

/**
 * SelectItem component for individual items in the select menu.
 *
 * @param {Object} props - The component props.
 * @param {string} [props.className] - Additional class names.
 * @param {React.ReactNode} props.children - The content of the item.
 * @returns {React.JSX.Element} The rendered SelectItem component.
 */
function SelectItem({
  className,
  children,
  ...props
}) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        "focus:bg-accent dark:focus:bg-sidebar-accent focus:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2 dark:hover:bg-sidebar-accent",
        className
      )}
      {...props}>
      <span className="absolute right-2 flex size-3.5 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <CheckIcon className="size-4" />
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
}

/**
 * SelectSeparator component for separating items in the select menu.
 *
 * @param {Object} props - The component props.
 * @param {string} [props.className] - Additional class names.
 * @returns {React.JSX.Element} The rendered SelectSeparator component.
 */
function SelectSeparator({
  className,
  ...props
}) {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={cn("bg-border pointer-events-none -mx-1 my-1 h-px", className)}
      {...props} />
  );
}

/**
 * SelectScrollUpButton component for scrolling up in the select menu.
 *
 * @param {Object} props - The component props.
 * @param {string} [props.className] - Additional class names.
 * @returns {React.JSX.Element} The rendered SelectScrollUpButton component.
 */
function SelectScrollUpButton({
  className,
  ...props
}) {
  return (
    <SelectPrimitive.ScrollUpButton
      data-slot="select-scroll-up-button"
      className={cn("flex cursor-default items-center justify-center py-1", className)}
      {...props}>
      <ChevronUpIcon className="size-4" />
    </SelectPrimitive.ScrollUpButton>
  );
}

/**
 * SelectScrollDownButton component for scrolling down in the select menu.
 *
 * @param {Object} props - The component props.
 * @param {string} [props.className] - Additional class names.
 * @returns {React.JSX.Element} The rendered SelectScrollDownButton component.
 */
function SelectScrollDownButton({
  className,
  ...props
}) {
  return (
    <SelectPrimitive.ScrollDownButton
      data-slot="select-scroll-down-button"
      className={cn("flex cursor-default items-center justify-center py-1", className)}
      {...props}>
      <ChevronDownIcon className="size-4" />
    </SelectPrimitive.ScrollDownButton>
  );
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
}
