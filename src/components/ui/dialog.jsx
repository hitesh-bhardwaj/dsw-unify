"use client"

import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { XIcon } from "lucide-react"

import { cn } from "@/lib/utils"

/**
 * Dialog component.
 *
 * @param {Object} props - The component props.
 * @returns {React.JSX.Element} The rendered Dialog component.
 */
function Dialog({
  ...props
}) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />;
}

/**
 * DialogTrigger component.
 *
 * @param {Object} props - The component props.
 * @returns {React.JSX.Element} The rendered DialogTrigger component.
 */
function DialogTrigger({
  ...props
}) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />;
}

/**
 * DialogPortal component.
 *
 * @param {Object} props - The component props.
 * @returns {React.JSX.Element} The rendered DialogPortal component.
 */
function DialogPortal({
  ...props
}) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />;
}

/**
 * DialogClose component.
 *
 * @param {Object} props - The component props.
 * @returns {React.JSX.Element} The rendered DialogClose component.
 */
function DialogClose({
  ...props
}) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />;
}

/**
 * DialogOverlay component.
 *
 * @param {Object} props - The component props.
 * @param {string} [props.className] - Additional class names.
 * @returns {React.JSX.Element} The rendered DialogOverlay component.
 */
function DialogOverlay({
  className,
  ...props
}) {
  return (
    <DialogPrimitive.Overlay
      data-slot="dialog-overlay"
      className={cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      )}
      {...props} />
  );
}

/**
 * DialogContent component.
 *
 * @param {Object} props - The component props.
 * @param {string} [props.className] - Additional class names.
 * @param {React.ReactNode} props.children - The content of the dialog.
 * @param {boolean} [props.showCloseButton=true] - Whether to show the close button.
 * @returns {React.JSX.Element} The rendered DialogContent component.
 */
function DialogContent({
  className,
  children,
  showCloseButton = true,
  ...props
}) {
  return (
    <DialogPortal data-slot="dialog-portal">
      <DialogOverlay />
      <DialogPrimitive.Content
        data-slot="dialog-content"
        className={cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-3xl border p-6 duration-200 ",
          className
        )}
        {...props}>
        {children}
        {/* {showCloseButton && (
          <DialogPrimitive.Close
            data-slot="dialog-close"
            className="ring-offset-background w-6 h-6 cursor-pointer focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-7 right-6 rounded-xs opacity-70  hover:opacity-100 focus:ring-0 focus:ring-offset-0 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 hover:rotate-[90deg] duration-500 transition-all">
            <XIcon className="!w-full !h-full  "/>
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        )} */}
      </DialogPrimitive.Content>
    </DialogPortal>
  );
}

/**
 * DialogHeader component.
 *
 * @param {Object} props - The component props.
 * @param {string} [props.className] - Additional class names.
 * @param {boolean} [props.showCloseButton=true] - Whether to show the close button.
 * @param {React.ReactNode} props.children - The content of the header.
 * @returns {React.JSX.Element} The rendered DialogHeader component.
 */
function DialogHeader({
  className,
  showCloseButton = true,
  ...props
}) {
  return (
    <div
      data-slot="dialog-header"
      className={cn(
        "relative flex flex-col gap-2 text-center sm:text-left",
        className
      )}
      {...props}
    >
      {props.children}

      {showCloseButton && (
        <DialogPrimitive.Close
          data-slot="dialog-close"
          className="ring-offset-background w-6 h-6 cursor-pointer focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-0 -right-2 rounded-xs opacity-70 hover:opacity-100 focus:ring-0 focus:ring-offset-0 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 hover:rotate-[90deg] duration-500 transition-all"
        >
          <XIcon className="!w-full !h-full" />
          <span className="sr-only">Close</span>
        </DialogPrimitive.Close>
      )}
    </div>
  );
}


/**
 * DialogFooter component.
 *
 * @param {Object} props - The component props.
 * @param {string} [props.className] - Additional class names.
 * @returns {React.JSX.Element} The rendered DialogFooter component.
 */
function DialogFooter({
  className,
  ...props
}) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn("flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className)}
      {...props} />
  );
}

/**
 * DialogTitle component.
 *
 * @param {Object} props - The component props.
 * @param {string} [props.className] - Additional class names.
 * @returns {React.JSX.Element} The rendered DialogTitle component.
 */
function DialogTitle({
  className,
  ...props
}) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn("text-lg leading-none font-semibold", className)}
      {...props} />
  );
}

/**
 * DialogDescription component.
 *
 * @param {Object} props - The component props.
 * @param {string} [props.className] - Additional class names.
 * @returns {React.JSX.Element} The rendered DialogDescription component.
 */
function DialogDescription({
  className,
  ...props
}) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props} />
  );
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
}
