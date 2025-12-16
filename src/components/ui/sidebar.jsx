"use client";
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { SidebarIcon } from "../Icons";

const SIDEBAR_COOKIE_NAME = "sidebar_state";
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
const SIDEBAR_WIDTH = "16rem";
const SIDEBAR_WIDTH_MOBILE = "18rem";
const SIDEBAR_WIDTH_ICON = "4.5rem";
const SIDEBAR_KEYBOARD_SHORTCUT = "b";

const SidebarContext = React.createContext(null);

function useSidebar() {
  const context = React.useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.");
  }

  return context;
}

/**
 * SidebarProvider component to manage sidebar state and context.
 *
 * @param {Object} props - The component props.
 * @param {boolean} [props.defaultOpen=true] - The default open state of the sidebar.
 * @param {boolean} [props.open] - The controlled open state of the sidebar.
 * @param {function} [props.onOpenChange] - Callback when the open state changes.
 * @param {string} [props.className] - Additional class names.
 * @param {Object} [props.style] - Inline styles.
 * @param {React.ReactNode} props.children - The children to render.
 * @returns {React.JSX.Element} The rendered SidebarProvider component.
 */
function SidebarProvider({
  defaultOpen = true,
  open: openProp,
  onOpenChange: setOpenProp,
  className,
  style,
  children,
  ...props
}) {
  const isMobile = useIsMobile();
  const [openMobile, setOpenMobile] = React.useState(false);

  const STORAGE_KEY = SIDEBAR_COOKIE_NAME; // "sidebar_state"

  const readPersistedOpen = React.useCallback(() => {
    try {
      if (typeof window !== "undefined") {
        const ls = window.localStorage?.getItem(STORAGE_KEY);
        if (ls === "true" || ls === "false") return ls === "true";
      }
      if (typeof document !== "undefined") {
        const match = document.cookie
          ?.split("; ")
          .find((c) => c.startsWith(`${SIDEBAR_COOKIE_NAME}=`));
        if (match) {
          const v = match.split("=")[1];
          if (v === "true" || v === "false") return v === "true";
        }
      }
    } catch {}
    return undefined;
  }, []);

  const initialOpen = (() => {
    const persisted = readPersistedOpen();
    return persisted ?? defaultOpen;
  })();

  const [_open, _setOpen] = React.useState(initialOpen);
  const open = openProp ?? _open;

  const persistOpen = React.useCallback((value) => {
    try {
      document.cookie = `${SIDEBAR_COOKIE_NAME}=${value}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
      window.localStorage?.setItem(STORAGE_KEY, String(value));
    } catch {}
  }, []);

  React.useEffect(() => {
    if (openProp === undefined) return;
    persistOpen(openProp);
  }, [openProp, persistOpen]);

  const setOpen = React.useCallback(
    (value) => {
      const next = typeof value === "function" ? value(open) : value;
      if (setOpenProp) {
        setOpenProp(next);
      } else {
        _setOpen(next);
      }
      persistOpen(next);
    },
    [open, setOpenProp, persistOpen]
  );

  const toggleSidebar = React.useCallback(() => {
    return isMobile ? setOpenMobile((o) => !o) : setOpen((o) => !o);
  }, [isMobile, setOpen]);

  React.useEffect(() => {
    const handleKeyDown = (event) => {
      if (
        event.key === SIDEBAR_KEYBOARD_SHORTCUT &&
        (event.metaKey || event.ctrlKey)
      ) {
        event.preventDefault();
        toggleSidebar();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleSidebar]);

  React.useEffect(() => {
    if (openProp !== undefined) return;
    const persisted = readPersistedOpen();
    if (typeof persisted === "boolean") {
      _setOpen(persisted);
    }
  }, [openProp, readPersistedOpen]);

  const state = open ? "expanded" : "collapsed";

  const contextValue = React.useMemo(
    () => ({
      state,
      open,
      setOpen,
      isMobile,
      openMobile,
      setOpenMobile,
      toggleSidebar,
    }),
    [state, open, isMobile, openMobile, toggleSidebar, setOpen]
  );

  return (
    <SidebarContext.Provider value={contextValue}>
      <TooltipProvider delayDuration={0}>
        <div
          data-slot="sidebar-wrapper"
          style={{
            "--sidebar-width": SIDEBAR_WIDTH,
            "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
            ...style,
          }}
          className={cn(
            "group/sidebar-wrapper has-data-[variant=inset]:bg-sidebar flex min-h-svh w-full",
            className
          )}
          {...props}
        >
          {children}
        </div>
      </TooltipProvider>
    </SidebarContext.Provider>
  );
}

/**
 * Sidebar component.
 *
 * @param {Object} props - The component props.
 * @param {"left"|"right"} [props.side="left"] - The side where the sidebar is positioned.
 * @param {"sidebar"|"floating"|"inset"} [props.variant="sidebar"] - The variant of the sidebar.
 * @param {"offcanvas"|"icon"|"none"} [props.collapsible="offcanvas"] - The collapsible mode of the sidebar.
 * @param {string} [props.className] - Additional class names.
 * @param {React.ReactNode} props.children - The content of the sidebar.
 * @returns {React.JSX.Element} The rendered Sidebar component.
 */
function Sidebar({
  side = "left",
  variant = "sidebar",
  collapsible = "offcanvas",
  className,
  children,
  ...props
}) {
  const { isMobile, state, openMobile, setOpenMobile } = useSidebar();

  if (collapsible === "none") {
    return (
      <div
        data-slot="sidebar"
        className={cn(
          "bg-sidebar text-sidebar-foreground flex h-full w-(--sidebar-width) flex-col",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }

  if (isMobile) {
    return (
      <Sheet open={openMobile} onOpenChange={setOpenMobile} {...props}>
        <SheetContent
          data-sidebar="sidebar"
          data-slot="sidebar"
          data-mobile="true"
          className="bg-sidebar text-sidebar-foreground w-(--sidebar-width) p-0 [&>button]:hidden"
          style={{
            "--sidebar-width": SIDEBAR_WIDTH_MOBILE,
          }}
          side={side}
        >
          <SheetHeader className="sr-only">
            <SheetTitle>Sidebar</SheetTitle>
            <SheetDescription>Displays the mobile sidebar.</SheetDescription>
          </SheetHeader>
          <div className="flex h-full w-full flex-col">{children}</div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <div
      className="group peer text-sidebar-foreground hidden md:block"
      data-state={state}
      data-collapsible={state === "collapsed" ? collapsible : ""}
      data-variant={variant}
      data-side={side}
      data-slot="sidebar"
    >
      <div
        data-slot="sidebar-gap"
        className={cn(
          "relative w-(--sidebar-width) bg-transparent transition-[width] duration-300 ease-in-out",
          "group-data-[collapsible=offcanvas]:w-0",
          "group-data-[side=right]:rotate-180",
          variant === "floating" || variant === "inset"
            ? "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]"
            : "group-data-[collapsible=icon]:w-(--sidebar-width-icon)"
        )}
      />
      <div
        data-slot="sidebar-container"
        className={cn(
          "fixed inset-y-0 z-10 hidden h-svh w-(--sidebar-width) transition-[left,right,width] duration-300 ease-in-out md:flex",
          side === "left"
            ? "left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]"
            : "right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]",
          variant === "floating" || variant === "inset"
            ? "p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4))+2px)]"
            : "group-data-[collapsible=icon]:w-(--sidebar-width-icon) group-data-[side=left]:border-r group-data-[side=right]:border-l border-border-color-0",
          className
        )}
        {...props}
      >
        <div
          data-sidebar="sidebar"
          data-slot="sidebar-inner"
          className="bg-sidebar group-data-[variant=floating]:border-sidebar-border flex h-full w-full flex-col group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:shadow-sm"
        >
          {children}
        </div>
      </div>
    </div>
  );
}

/**
 * SidebarTrigger component for toggling the sidebar visibility.
 *
 * @param {Object} props - The component props.
 * @param {string} [props.className] - Additional class names.
 * @param {function} [props.onClick] - Callback when the trigger is clicked.
 * @returns {React.JSX.Element} The rendered SidebarTrigger component.
 */
function SidebarTrigger({ className, onClick, ...props }) {
  const { toggleSidebar } = useSidebar();

  return (
    <Button
      data-sidebar="trigger"
      data-slot="sidebar-trigger"
      variant="ghost"
      size="icon"
      className={cn(
        "size-10 hover:bg-sidebar-accent flex items-center justify-center duration-800",
        className
      )}
      onClick={(event) => {
        onClick?.(event);
        toggleSidebar();
      }}
      {...props}
    >
      <SidebarIcon className="size-5"/>
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  );
}

/**
 * SidebarRail component for resizing the sidebar.
 *
 * @param {Object} props - The component props.
 * @param {string} [props.className] - Additional class names.
 * @returns {React.JSX.Element} The rendered SidebarRail component.
 */
function SidebarRail({ className, ...props }) {
  const { toggleSidebar } = useSidebar();

  return (
    <button
      data-sidebar="rail"
      data-slot="sidebar-rail"
      aria-label="Toggle Sidebar"
      tabIndex={-1}
      onClick={toggleSidebar}
      title="Toggle Sidebar"
      className={cn(
        "hover:after:bg-border-color-0 absolute inset-y-0 z-20 hidden w-4 -translate-x-1/2 transition-all ease-linear group-data-[side=left]:-right-4 group-data-[side=right]:left-0 after:absolute after:inset-y-0 after:left-1/2 after:w-[2px] sm:flex",
        "in-data-[side=left]:cursor-w-resize in-data-[side=right]:cursor-e-resize",
        "[[data-side=left][data-state=collapsed]_&]:cursor-e-resize [[data-side=right][data-state=collapsed]_&]:cursor-w-resize",
        "hover:group-data-[collapsible=offcanvas]:bg-sidebar group-data-[collapsible=offcanvas]:translate-x-0 group-data-[collapsible=offcanvas]:after:left-full",
        "[[data-side=left][data-collapsible=offcanvas]_&]:-right-2",
        "[[data-side=right][data-collapsible=offcanvas]_&]:-left-2",
        className
      )}
      {...props}
    />
  );
}

/**
 * SidebarInset component for main content area next to the sidebar.
 *
 * @param {Object} props - The component props.
 * @param {string} [props.className] - Additional class names.
 * @returns {React.JSX.Element} The rendered SidebarInset component.
 */
function SidebarInset({ className, ...props }) {
  return (
    <main
      data-slot="sidebar-inset"
      className={cn(
        "bg-background relative flex w-full flex-1 flex-col",
        "md:peer-data-[variant=inset]:m-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow-sm md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ml-2",
        className
      )}
      {...props}
    />
  );
}

/**
 * SidebarInput component for input fields within the sidebar.
 *
 * @param {Object} props - The component props.
 * @param {string} [props.className] - Additional class names.
 * @returns {React.JSX.Element} The rendered SidebarInput component.
 */
function SidebarInput({ className, ...props }) {
  return (
    <Input
      data-slot="sidebar-input"
      data-sidebar="input"
      className={cn("bg-background h-8 w-full shadow-none", className)}
      {...props}
    />
  );
}

/**
 * SidebarHeader component for the sidebar header.
 *
 * @param {Object} props - The component props.
 * @param {string} [props.className] - Additional class names.
 * @returns {React.JSX.Element} The rendered SidebarHeader component.
 */
function SidebarHeader({ className, ...props }) {
  return (
    <div
      data-slot="sidebar-header"
      data-sidebar="header"
      className={cn("flex flex-col gap-2 p-2", className)}
      {...props}
    />
  );
}

/**
 * SidebarFooter component for the sidebar footer.
 *
 * @param {Object} props - The component props.
 * @param {string} [props.className] - Additional class names.
 * @returns {React.JSX.Element} The rendered SidebarFooter component.
 */
function SidebarFooter({ className, ...props }) {
  return (
    <div
      data-slot="sidebar-footer"
      data-sidebar="footer"
      className={cn("flex flex-col gap-2 p-2", className)}
      {...props}
    />
  );
}

/**
 * SidebarSeparator component for separating sections in the sidebar.
 *
 * @param {Object} props - The component props.
 * @param {string} [props.className] - Additional class names.
 * @returns {React.JSX.Element} The rendered SidebarSeparator component.
 */
function SidebarSeparator({ className, ...props }) {
  return (
    <Separator
      data-slot="sidebar-separator"
      data-sidebar="separator"
      className={cn("bg-sidebar-border mx-2 w-auto", className)}
      {...props}
    />
  );
}

/**
 * SidebarContent component for the main scrollable content of the sidebar.
 *
 * @param {Object} props - The component props.
 * @param {string} [props.className] - Additional class names.
 * @returns {React.JSX.Element} The rendered SidebarContent component.
 */
function SidebarContent({ className, ...props }) {
  return (
    <div
      data-slot="sidebar-content"
      data-sidebar="content"
      className={cn(
        "flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden",
        className
      )}
      {...props}
    />
  );
}

/**
 * SidebarGroup component for grouping items in the sidebar.
 *
 * @param {Object} props - The component props.
 * @param {string} [props.className] - Additional class names.
 * @returns {React.JSX.Element} The rendered SidebarGroup component.
 */
function SidebarGroup({ className, ...props }) {
  return (
    <div
      data-slot="sidebar-group"
      data-sidebar="group"
      className={cn("relative flex w-full min-w-0 flex-col p-4", className)}
      {...props}
    />
  );
}

/**
 * SidebarGroupLabel component for labeling a sidebar group.
 *
 * @param {Object} props - The component props.
 * @param {string} [props.className] - Additional class names.
 * @param {boolean} [props.asChild=false] - Whether to render as a child component.
 * @returns {React.JSX.Element} The rendered SidebarGroupLabel component.
 */
function SidebarGroupLabel({ className, asChild = false, ...props }) {
  const Comp = asChild ? Slot : "div";

  return (
    <Comp
      data-slot="sidebar-group-label"
      data-sidebar="group-label"
      className={cn(
        "text-sidebar-foreground/70 ring-sidebar-ring flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-normal outline-hidden transition-[margin,opacity] duration-200 ease-linear focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
        "group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0",
        className
      )}
      {...props}
    />
  );
}

/**
 * SidebarGroupAction component for actions within a sidebar group.
 *
 * @param {Object} props - The component props.
 * @param {string} [props.className] - Additional class names.
 * @param {boolean} [props.asChild=false] - Whether to render as a child component.
 * @returns {React.JSX.Element} The rendered SidebarGroupAction component.
 */
function SidebarGroupAction({ className, asChild = false, ...props }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="sidebar-group-action"
      data-sidebar="group-action"
      className={cn(
        "text-sidebar-foreground ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground absolute top-3.5 right-3 flex aspect-square w-5 items-center justify-center rounded-md p-0 outline-hidden transition-transform focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
        "after:absolute after:-inset-2 md:after:hidden",
        "group-data-[collapsible=icon]:hidden",
        className
      )}
      {...props}
    />
  );
}

/**
 * SidebarGroupContent component for the content within a sidebar group.
 *
 * @param {Object} props - The component props.
 * @param {string} [props.className] - Additional class names.
 * @returns {React.JSX.Element} The rendered SidebarGroupContent component.
 */
function SidebarGroupContent({ className, ...props }) {
  return (
    <div
      data-slot="sidebar-group-content"
      data-sidebar="group-content"
      className={cn("w-full text-ms", className)}
      {...props}
    />
  );
}

/**
 * SidebarMenu component for a list of menu items.
 *
 * @param {Object} props - The component props.
 * @param {string} [props.className] - Additional class names.
 * @returns {React.JSX.Element} The rendered SidebarMenu component.
 */
function SidebarMenu({ className, ...props }) {
  return (
    <ul
      data-slot="sidebar-menu"
      data-sidebar="menu"
      className={cn("flex w-full min-w-0 flex-col gap-1", className)}
      {...props}
    />
  );
}

/**
 * SidebarMenuItem component for an individual menu item.
 *
 * @param {Object} props - The component props.
 * @param {string} [props.className] - Additional class names.
 * @returns {React.JSX.Element} The rendered SidebarMenuItem component.
 */
function SidebarMenuItem({ className, ...props }) {
  return (
    <li
      data-slot="sidebar-menu-item"
      data-sidebar="menu-item"
      className={cn("group/menu-item relative", className)}
      {...props}
    />
  );
}

const sidebarMenuButtonVariants = cva(
  "peer/menu-button flex w-full text-sidebar-foreground items-center gap-2 overflow-hidden rounded-4xl p-4 text-left text-2xl outline-hidden ring-sidebar-ring transition-[width,height,padding,border] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-1 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-data-[sidebar=menu-action]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:font-normal data-[active=true]:text-sidebar-accent-foreground  group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2! [&>span:last-child]:truncate [&>svg]:size-5 [&>svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        outline:
          "bg-background shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]",
      },
      size: {
        default: "h-8 text-sm",
        sm: "h-7 text-xs",
        lg: "h-12 text-sm font-normal group-data-[collapsible=icon]:p-[0.4rem]! group-data-[collapsible=icon]:rounded-xl!",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

/**
 * SidebarMenuButton component for a button within a sidebar menu.
 *
 * @param {Object} props - The component props.
 * @param {boolean} [props.asChild=false] - Whether to render as a child component.
 * @param {boolean} [props.isActive=false] - Whether the button is active.
 * @param {"default"|"outline"} [props.variant="default"] - The variant of the button.
 * @param {"default"|"sm"|"lg"} [props.size="default"] - The size of the button.
 * @param {string|Object} [props.tooltip] - Tooltip content or props.
 * @param {string} [props.className] - Additional class names.
 * @returns {React.JSX.Element} The rendered SidebarMenuButton component.
 */
function SidebarMenuButton({
  asChild = false,
  isActive = false,
  variant = "default",
  size = "default",
  tooltip,
  className,
  ...props
}) {
  const Comp = asChild ? Slot : "button";
  const { isMobile, state } = useSidebar();

  const button = (
    <Comp
      data-slot="sidebar-menu-button"
      data-sidebar="menu-button"
      data-size={size}
      data-active={isActive}
      className={cn(sidebarMenuButtonVariants({ variant, size }), className)}
      {...props}
    />
  );

  // no tooltip configured
  if (!tooltip) {
    return button;
  }

  // string → Tooltip props object
  if (typeof tooltip === "string") {
    tooltip = {
      children: tooltip,
    };
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>{button}</TooltipTrigger>
      {/* Show tooltip only when the sidebar is collapsed (links truncated) and not on mobile */}
      <TooltipContent
        side="right"
        align="center"
        hidden={state !== "collapsed" || isMobile}
        {...tooltip}
      />
    </Tooltip>
  );
}

/**
 * SidebarMenuAction component for secondary actions on a menu item.
 *
 * @param {Object} props - The component props.
 * @param {string} [props.className] - Additional class names.
 * @param {boolean} [props.asChild=false] - Whether to render as a child component.
 * @param {boolean} [props.showOnHover=false] - Whether to show the action only on hover.
 * @returns {React.JSX.Element} The rendered SidebarMenuAction component.
 */
function SidebarMenuAction({
  className,
  asChild = false,
  showOnHover = false,
  ...props
}) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="sidebar-menu-action"
      data-sidebar="menu-action"
      className={cn(
        "text-sidebar-foreground ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground peer-hover/menu-button:text-sidebar-accent-foreground absolute top-1.5 right-1 flex aspect-square w-5 items-center justify-center rounded-md p-0 outline-hidden transition-transform focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
        "after:absolute after:-inset-2 md:after:hidden",
        "peer-data-[size=sm]/menu-button:top-1",
        "peer-data-[size=default]/menu-button:top-1.5",
        "peer-data-[size=lg]/menu-button:top-2.5",
        "group-data-[collapsible=icon]:hidden",
        showOnHover &&
          "peer-data-[active=true]/menu-button:text-sidebar-accent-foreground group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 data-[state=open]:opacity-100 md:opacity-0",
        className
      )}
      {...props}
    />
  );
}

/**
 * SidebarMenuBadge component for displaying a badge on a menu item.
 *
 * @param {Object} props - The component props.
 * @param {string} [props.className] - Additional class names.
 * @returns {React.JSX.Element} The rendered SidebarMenuBadge component.
 */
function SidebarMenuBadge({ className, ...props }) {
  return (
    <div
      data-slot="sidebar-menu-badge"
      data-sidebar="menu-badge"
      className={cn(
        "text-sidebar-foreground pointer-events-none absolute right-1 flex h-5 min-w-5 items-center justify-center rounded-md px-1 text-xs font-medium tabular-nums select-none",
        "peer-hover/menu-button:text-sidebar-accent-foreground peer-data-[active=true]/menu-button:text-sidebar-accent-foreground",
        "peer-data-[size=sm]/menu-button:top-1",
        "peer-data-[size=default]/menu-button:top-1.5",
        "peer-data-[size=lg]/menu-button:top-2.5",
        "group-data-[collapsible=icon]:hidden",
        className
      )}
      {...props}
    />
  );
}

/**
 * SidebarMenuSkeleton component for loading states in the sidebar menu.
 *
 * @param {Object} props - The component props.
 * @param {string} [props.className] - Additional class names.
 * @param {boolean} [props.showIcon=false] - Whether to show a skeleton icon.
 * @returns {React.JSX.Element} The rendered SidebarMenuSkeleton component.
 */
function SidebarMenuSkeleton({ className, showIcon = false, ...props }) {
  const width = React.useMemo(() => {
    return `${Math.floor(Math.random() * 40) + 50}%`;
  }, []);

  return (
    <div
      data-slot="sidebar-menu-skeleton"
      data-sidebar="menu-skeleton"
      className={cn("flex h-8 items-center gap-2 rounded-md px-2", className)}
      {...props}
    >
      {showIcon && (
        <Skeleton
          className="size-4 rounded-md"
          data-sidebar="menu-skeleton-icon"
        />
      )}
      <Skeleton
        className="h-4 max-w-(--skeleton-width) flex-1"
        data-sidebar="menu-skeleton-text"
        style={{
          "--skeleton-width": width,
        }}
      />
    </div>
  );
}

/**
 * SidebarMenuSub component for a sub-menu.
 *
 * @param {Object} props - The component props.
 * @param {string} [props.className] - Additional class names.
 * @returns {React.JSX.Element} The rendered SidebarMenuSub component.
 */
function SidebarMenuSub({ className, ...props }) {
  return (
    <ul
      data-slot="sidebar-menu-sub"
      data-sidebar="menu-sub"
      className={cn(
        "border-sidebar-border mx-0 flex min-w-0 translate-x-px flex-col gap-2 px-2.5 py-0.5",
        "group-data-[collapsible=icon]:hidden",
        className
      )}
      {...props}
    />
  );
}

/**
 * SidebarMenuSubItem component for an individual item in a sub-menu.
 *
 * @param {Object} props - The component props.
 * @param {string} [props.className] - Additional class names.
 * @returns {React.JSX.Element} The rendered SidebarMenuSubItem component.
 */
function SidebarMenuSubItem({ className, ...props }) {
  return (
    <li
      data-slot="sidebar-menu-sub-item"
      data-sidebar="menu-sub-item"
      className={cn("group/menu-sub-item relative", className)}
      {...props}
    />
  );
}

/**
 * SidebarMenuSubButton component for a button within a sub-menu.
 *
 * @param {Object} props - The component props.
 * @param {boolean} [props.asChild=false] - Whether to render as a child component.
 * @param {"sm"|"md"} [props.size="md"] - The size of the button.
 * @param {boolean} [props.isActive=false] - Whether the button is active.
 * @param {string} [props.className] - Additional class names.
 * @returns {React.JSX.Element} The rendered SidebarMenuSubButton component.
 */
function SidebarMenuSubButton({
  asChild = false,
  size = "md",
  isActive = false,
  className,
  ...props
}) {
  const Comp = asChild ? Slot : "a";

  return (
    <Comp
      data-slot="sidebar-menu-sub-button"
      data-sidebar="menu-sub-button"
      data-size={size}
      data-active={isActive}
      className={cn(
        "text-sidebar-foreground ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground active:bg-sidebar-accent active:text-sidebar-accent-foreground [&>svg]:text-sidebar-accent-foreground flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2 outline-hidden focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50  [&>svg]:size-4 [&>svg]:shrink-0",
        "data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground",
        size === "sm" && "text-xs",
        size === "md" && "text-sm",
        "group-data-[collapsible=icon]:hidden",
        className
      )}
      {...props}
    />
  );
}

export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
};
