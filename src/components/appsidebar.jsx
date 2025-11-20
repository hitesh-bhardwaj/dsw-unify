"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import Image from "next/image";
import logo from "../../public/unify-logo.png";
import { ChevronDown } from "lucide-react";
import {
  AgentsIcon,
  DataEngineeringIcon,
  DataExplorerIcon,
  DataIngestionIcon,
  FeatureStore,
  GuardrailsIcon,
  KnowledgeBaseIcon,
  LLMsIcon,
  MemoriesIcon,
  PromptsIcon,
  TestingIcon,
  ToolsIcon,
} from "./Icons";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@radix-ui/react-collapsible";
import { motion } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const navigation = [
  { name: "Home", href: "/", icon: AgentsIcon },
  {
    name: "Data Engineering",
    href: "/data-engineering",
    icon: DataEngineeringIcon,
    children: [
      {
        name: "Data Ingestion",
        href: "/data-engineering/data-ingestion",
        icon: DataIngestionIcon,
      },
      {
        name: "Data Explorer",
        href: "/data-engineering/data-explorer",
        icon: DataExplorerIcon,
      },
      {
        name: "Data Visualization",
        href: "/data-engineering/data-visualization",
        icon: DataExplorerIcon,
      },
      {
        name: "Data Validation",
        href: "/data-engineering/data-validation",
        icon: DataExplorerIcon,
      },
    ],
  },
  {
    name: "Feature Store",
    href: "/feature-store",
    icon: FeatureStore,
    children: [
      {
        name: "Feature Transformations",
        href: "/feature-store/feature-transformations",
        icon: DataIngestionIcon,
      },
      {
        name: "Feature Views",
        href: "/feature-store/feature-views",
        icon: DataExplorerIcon,
      },
      {
        name: "Feature Services",
        href: "/feature-store/feature-services",
        icon: DataExplorerIcon,
      },
    ],
  },
  { name: "Agents", href: "/agents", icon: AgentsIcon },
  { name: "Prompts", href: "/prompts", icon: PromptsIcon },
  { name: "LLMs", href: "/llms", icon: LLMsIcon },
  {
    name: "Knowledge Bases",
    href: "/knowledge-bases",
    icon: KnowledgeBaseIcon,
  },
  { name: "Tools", href: "/tools", icon: ToolsIcon },
  { name: "Memories", href: "/memories", icon: MemoriesIcon },
  { name: "Guardrails", href: "/guardrails", icon: GuardrailsIcon },
  { name: "Testing", href: "/testing", icon: TestingIcon },
  { name: "Console", href: "/console", icon: AgentsIcon },
  { name: "Use Cases", href: "/usecases", icon: PromptsIcon },
];

// Store animation state outside component to persist across renders
let hasAnimatedGlobal = false;

/**
 * Helper: renders a span that is truncated by parent CSS
 * ([&>span:last-child]:truncate) and shows a tooltip
 * ONLY if the text is actually truncated.
 */
function TruncatedTextWithTooltip({ text }) {
  const spanRef = useRef(null);
  const [isTruncated, setIsTruncated] = useState(false);

  useEffect(() => {
    const el = spanRef.current;
    if (!el) return;

    const checkTruncation = () => {
      if (!el) return;
      const truncated = el.scrollWidth > el.clientWidth + 1;
      setIsTruncated(truncated);
    };

    checkTruncation();
    window.addEventListener("resize", checkTruncation);
    return () => window.removeEventListener("resize", checkTruncation);
  }, []);

  const span = (
    <span ref={spanRef} className="text-sm">
      {text}
    </span>
  );

  if (!isTruncated) {
    return span;
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>{span}</TooltipTrigger>
      <TooltipContent side="right" align="center">
        {text}
      </TooltipContent>
    </Tooltip>
  );
}

export function AppSidebar() {
  const pathname = usePathname();
  const [shouldAnimate, setShouldAnimate] = useState(hasAnimatedGlobal);
  const [expandedItems, setExpandedItems] = useState({});

  useEffect(() => {
    if (!hasAnimatedGlobal) {
      const timer = setTimeout(() => {
        setShouldAnimate(true);
        hasAnimatedGlobal = true;
      }, 50);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b border-sidebar-border">
        <div className="flex h-12 items-center gap-3 px-2">
          <div className="size-10 shrink-0">
            <Image src={logo} className="" alt="Unify-Logo" />
          </div>
          <span className="text-2xl font-medium group-data-[collapsible=icon]:hidden">
            UnifyAI
          </span>
        </div>
      </SidebarHeader>

      <SidebarContent className="no-sidebar-scrollbar overflow-y-auto">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigation.map((item) => {
                const hasChildren =
                  Array.isArray(item.children) && item.children.length > 0;

                const isActive =
                  pathname === item.href ||
                  pathname?.startsWith(item.href + "/");

                const hasActiveChild =
                  hasChildren &&
                  (item.children || []).some(
                    (child) =>
                      pathname === child.href ||
                      pathname?.startsWith(child.href + "/")
                  );

                const userExpanded = expandedItems[item.name];
                const isExpanded =
                  typeof userExpanded === "boolean"
                    ? userExpanded
                    : hasActiveChild;

                const Icon = item.icon;

                if (hasChildren) {
                  return (
                    <Collapsible
                      key={item.name}
                      open={isExpanded}
                      onOpenChange={(openValue) =>
                        setExpandedItems((prev) => ({
                          ...prev,
                          [item.name]: openValue,
                        }))
                      }
                      className="group/collapsible"
                    >
                      <SidebarMenuItem>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton
                            size="lg"
                            isActive={isActive || hasActiveChild}
                            tooltip={item.name}
                            className={cn(
                              "cursor-pointer",
                              (isActive || hasActiveChild) &&
                                "bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary hover:text-sidebar-primary-foreground hover:data-[active=true]:bg-sidebar-primary data-[active=true]:hover:text-white data-[active=true]:bg-sidebar-primary data-[active=true]:text-sidebar-primary-foreground"
                            )}
                          >
                            <Icon size={30} className="!h-5 !w-auto" />
                            <span className="text-nowrap text-sm">
                              {item.name}
                            </span>
                            <ChevronDown
                              className={cn(
                                "ml-auto !w-4 transition-transform duration-300 ease-in-out group-data-[collapsible=icon]:hidden",
                                isExpanded && "rotate-180"
                              )}
                            />
                          </SidebarMenuButton>
                        </CollapsibleTrigger>

                        <CollapsibleContent forceMount asChild>
                          <motion.div
                            initial={hasActiveChild ? "open" : "closed"}
                            animate={isExpanded ? "open" : "closed"}
                            variants={{
                              open: {
                                height: "auto",
                                opacity: 1,
                                transition: {
                                  height: { duration: 0.25 },
                                  opacity: { duration: 0.2, delay: 0.05 },
                                  ease: "easeInOut",
                                },
                              },
                              closed: {
                                height: 0,
                                opacity: 0,
                                transition: {
                                  height: { duration: 0.22 },
                                  opacity: { duration: 0.15 },
                                  ease: "easeInOut",
                                },
                              },
                            }}
                            style={{ overflow: "hidden" }}
                          >
                            <SidebarMenuSub className="py-2">
                              {(item.children || []).map((child) => {
                                const isChildActive =
                                  pathname === child.href ||
                                  pathname?.startsWith(child.href + "/");

                                const ChildIcon = child.icon;

                                return (
                                  <SidebarMenuSubItem key={child.name}>
                                    <SidebarMenuButton
                                      asChild
                                      size="sm"
                                      isActive={isChildActive}
                                      className={cn(
                                        "pl-8",
                                        isChildActive &&
                                          "text-sidebar-primary data-[active=true]:text-sidebar-primary"
                                      )}
                                    >
                                      <Link href={child.href}>
                                        {/* Icon + truncated text (with tooltip only when truncated) */}
                                        {ChildIcon && (
                                          <ChildIcon className="!h-4 !w-4" />
                                        )}
                                        <TruncatedTextWithTooltip
                                          text={child.name}
                                        />
                                      </Link>
                                    </SidebarMenuButton>
                                  </SidebarMenuSubItem>
                                );
                              })}
                            </SidebarMenuSub>
                          </motion.div>
                        </CollapsibleContent>
                      </SidebarMenuItem>
                    </Collapsible>
                  );
                }

                return (
                  <SidebarMenuItem key={item.name}>
                    <SidebarMenuButton
                      size="lg"
                      asChild
                      isActive={isActive}
                      tooltip={item.name}
                      className={cn(
                        isActive &&
                          "bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary hover:text-sidebar-primary-foreground data-[active=true]:bg-sidebar-primary data-[active=true]:text-sidebar-primary-foreground"
                      )}
                    >
                      <Link href={item.href}>
                        <Icon size={30} className="!h-5 !w-auto" />
                        <span className="text-nowrap">{item.name}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  );
}
