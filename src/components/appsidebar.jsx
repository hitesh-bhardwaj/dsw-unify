"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
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
  useSidebar, // 👈 import this
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
  AIStudioIcon,
  AgentStudioIcon,
  WorkFlowBuilderIcon,
  SettingIcon,
  SettingsIcon,
  DataIngestionIcon2,
  DataVisualizationIcon,
  DataValidationIcon,
  FeatureTransformationIcon,
  FeatureViewsIcon,
  FeatureServicesIcon,
  QuickStartIcon,
  UseCasesIcon,
  InferenceIcon,
  MonitoringIcon,
  ModelDevelopmentIcon,
  HomeIcon2,
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
  { name: "Home", href: "/", icon: HomeIcon2 },
  {
    name: "Data Engineering",
    href: "/data-engineering",
    icon: DataEngineeringIcon,
    children: [
      {
        name: "Data Ingestion",
        href: "/data-engineering/data-ingestion",
        icon: DataIngestionIcon2,
      },
      {
        name: "Data Explorer",
        href: "/data-engineering/data-explorer",
        icon: DataExplorerIcon,
      },
      {
        name: "Data Visualization",
        href: "#",
        icon: DataVisualizationIcon,
      },
      {
        name: "Data Validation",
        href: "#",
        icon: DataValidationIcon,
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
        icon: FeatureTransformationIcon,

      },
      {
        name: "Feature Views",
        href: "/feature-store/feature-views",
        icon: FeatureViewsIcon,
      },
      {
        name: "Feature Services",
        href: "/feature-store/feature-services",
        icon: FeatureServicesIcon,
      },
    ],
  },
  {
    name: "AI Studio",
    href: "ai-studio/quick-start",
    icon: AIStudioIcon,
    children: [
      {
        name: "Quick Start",
        href: "/ai-studio/quick-start",
        icon: QuickStartIcon,
      },
      {
        name: "Use Cases",
        href: "/ai-studio/use-cases",
        icon: UseCasesIcon,
      },
      {
        name: "Model Development",
        href: "#",
        icon: ModelDevelopmentIcon,
      },
      {
        name: "Monitoring",
        href: "/ai-studio/monitoring",
        icon: MonitoringIcon,
      },
      {
        name: "Inference",
        href: "/ai-studio/inference",
        icon: InferenceIcon,
      },
    ],
  },
  {
    name: "Agent Studio",
    href: "/agent-studio/agents",
    icon: AgentsIcon,
    children: [
      {
        name: "Agents",
        href: "/agent-studio/agents",
        icon: AgentsIcon,
      },
      {
        name: "Prompts",
        href: "/agent-studio/prompts",
        icon: PromptsIcon,
      },
      {
        name: "LLMs",
        href: "/agent-studio/llms",
        icon: LLMsIcon,
      },
      {
        name: "Knowledge Bases",
        href: "/agent-studio/knowledge-bases",
        icon: KnowledgeBaseIcon,
      },
      {
        name: "Tools",
        href: "/agent-studio/tools",
        icon: ToolsIcon,
      },
      {
        name: "Memories",
        href: "/agent-studio/memories",
        icon: MemoriesIcon,
      },
      {
        name: "Guardrails",
        href: "/agent-studio/guardrails",
        icon: GuardrailsIcon,
      },
      {
        name: "Testing",
        href: "/agent-studio/testing",
        icon: TestingIcon,
      },
    ],
  },

  { name: "Workflow Builder", href: "#", icon: WorkFlowBuilderIcon },
  { name: "Settings", href: "#", icon: SettingsIcon },
];

// Store animation state outside component to persist across renders
let hasAnimatedGlobal = false;

/**
 * Helper component to render text truncated by CSS and show a tooltip if truncated.
 *
 * @param {Object} props - The component props.
 * @param {string} props.text - The text to display.
 * @returns {React.JSX.Element} The rendered TruncatedTextWithTooltip component.
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

/**
 * Main AppSidebar component for navigation.
 *
 * @returns {React.JSX.Element} The rendered AppSidebar component.
 */
export function AppSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { state } = useSidebar(); // get sidebar state
  const isCollapsed = state === "collapsed";
  const [shouldAnimate, setShouldAnimate] = useState(hasAnimatedGlobal);
  const [expandedItems, setExpandedItems] = useState({});
  const [expandedItem, setExpandedItem] = useState(null);

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
                // const hasChildren =
                //   Array.isArray(item.children) && item.children.length > 0;

                // const isActive =
                //   pathname === item.href ||
                //   pathname?.startsWith(item.href + "/");

                // const hasActiveChild =
                //   hasChildren &&
                //   (item.children || []).some(
                //     (child) =>
                //       pathname === child.href ||
                //       pathname?.startsWith(child.href + "/")
                //   );

                // const userExpanded = expandedItems[item.name];
                // const isExpanded =
                //   typeof userExpanded === "boolean"
                //     ? userExpanded
                //     : hasActiveChild;

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

                // 👇 When nothing chosen manually, auto-expand the one that has an active child
                const isExpanded =
                  expandedItem !== null ? expandedItem === item.name : hasActiveChild;

                const Icon = item.icon;

                if (hasChildren) {
                  const firstChild = item.children[0];

                  return (
                    <Collapsible
                      key={item.name}
                      open={isExpanded}
                      // onOpenChange={(openValue) =>
                      //   setExpandedItems((prev) => ({
                      //     ...prev,
                      //     [item.name]: openValue,
                      //   }))
                      // }
                      onOpenChange={(openValue) => {
                        if (openValue) {
                          // open this one, close all others
                          setExpandedItem(item.name);
                        } else {
                          // close it only if it's currently the active one
                          setExpandedItem((prev) => (prev === item.name ? null : prev));
                        }
                      }}
                      className="group/collapsible"
                    >
                      <SidebarMenuItem>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton
                            size="lg"
                            isActive={isActive || hasActiveChild}
                            tooltip={item.name}
                            className={cn(
                              "cursor-pointer transition-colors duration-200 ease-in-out",
                              (isActive || hasActiveChild) &&
                              "bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary hover:text-sidebar-primary-foreground hover:data-[active=true]:bg-sidebar-primary data-[active=true]:hover:text-white data-[active=true]:bg-sidebar-primary data-[active=true]:text-sidebar-primary-foreground"
                            )}
                            onClick={(e) => {
                              if (isCollapsed && firstChild?.href) {
                                e.preventDefault();
                                e.stopPropagation();
                                router.push(firstChild.href);
                              }
                            }}
                          >
                            <Icon size={30} className={cn(
                              "!h-5 !w-auto")} />
                            <span className={cn(
                              "text-nowrap text-sm",
                              (isExpanded || hasActiveChild) && "font-medium"
                            )}>
                              {item.name}
                            </span>
                            <ChevronDown
                              className={cn(
                                "ml-auto !w-4 transition-transform duration-200 ease-in-out group-data-[collapsible=icon]:hidden",
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
                                        "pl-8 transition-colors duration-200 ease-in-out",
                                        isChildActive &&
                                        "text-sidebar-primary data-[active=true]:text-sidebar-primary"
                                      )}
                                    >
                                      <Link href={child.href}>
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

                // items without children
                return (
                  <SidebarMenuItem key={item.name}>
                    <SidebarMenuButton
                      size="lg"
                      asChild
                      isActive={isActive}
                      tooltip={item.name}
                      className={cn(
                        "transition-colors duration-200 ease-in-out",
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