"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
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
  SidebarRail,
} from "@/components/ui/sidebar";
import { useSidebar } from "@/components/ui/sidebar";
import Image from "next/image";
import logo from "../../public/unify-logo.png";
import { ChevronDown } from "lucide-react";
import {
  AgentsIcon,
  GuardrailsIcon,
  HomeBlock,
  HomeIcon,
  KnowledgeBaseIcon,
  LLMsIcon,
  MemoriesIcon,
  PromptsIcon,
  TestingIcon,
  ToolsIcon
} from "./Icons";

const navigation = [
  { name: "Home", href: "/", icon: HomeBlock },
  {name:'Data Engineering', href:'/data-engineering', icon:AgentsIcon, 
    children: [
      { name: "Data Ingestion", href: "/data-engineering/data-ingestion" },
      { name: "Data Explorer", href: "/data-engineering/data-explorer" },
      { name: "Data Visualization", href: "/data-engineering/data-visualization" },
      { name: "Data Validation", href: "/data-engineering/data-validation" },
    ]
  
  },
  { name: "Agents", href: "/agents", icon: AgentsIcon },
  { name: "Prompts", href: "/prompts", icon: PromptsIcon },
  { name: "LLMs", href: "/llms", icon: LLMsIcon },
  { name: "Knowledge Bases", href: "/knowledge-bases", icon: KnowledgeBaseIcon },
  { name: "Tools", href: "/tools", icon: ToolsIcon },
  { name: "Memories", href: "/memories", icon: MemoriesIcon },
  { name: "Guardrails", href: "/guardrails", icon: GuardrailsIcon },
   { name: "Testing", href: "/testing", icon: TestingIcon},
  { name: "Console", href: "/console", icon: AgentsIcon},
  { name: "Use Cases", href: "/usecases", icon: PromptsIcon},
];

// Store animation state outside component to persist across renders
let hasAnimatedGlobal = false;

export function AppSidebar() {
  const pathname = usePathname();
  const { open } = useSidebar();
  const [shouldAnimate, setShouldAnimate] = useState(hasAnimatedGlobal);
  const [expandedItems, setExpandedItems] = useState({});

  // Check if any child is active and auto-expand parent
  useEffect(() => {
    const newExpandedItems = {};
    navigation.forEach((item) => {
      if (item.children) {
        const hasActiveChild = item.children.some(
          (child) => pathname === child.href || pathname?.startsWith(child.href + "/")
        );
        if (hasActiveChild) {
          newExpandedItems[item.name] = true;
        }
      }
    });
    setExpandedItems(prev => ({ ...prev, ...newExpandedItems }));
  }, [pathname]);

  // Trigger animation only once on initial mount
  useEffect(() => {
    if (!hasAnimatedGlobal) {
      const timer = setTimeout(() => {
        setShouldAnimate(true);
        hasAnimatedGlobal = true;
      }, 50);
      return () => clearTimeout(timer);
    }
  }, []);

  const toggleExpanded = (itemName) => {
    setExpandedItems(prev => ({
      ...prev,
      [itemName]: !prev[itemName]
    }));
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b border-sidebar-border">
        <div className="flex h-12 items-center gap-3 px-2">
          <div className="size-10 shrink-0">
            <Image src={logo} className="" alt="Unify-Logo"/>
          </div>
          <span className="text-2xl font-medium group-data-[collapsible=icon]:hidden">
            UnifyAI
          </span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigation.map((item, index) => {
                const hasChildren = item.children && item.children.length > 0;
                const isExpanded = expandedItems[item.name];
                const isActive = pathname === item.href || pathname?.startsWith(item.href + "/");
                const hasActiveChild = hasChildren && item.children.some(
                  (child) => pathname === child.href || pathname?.startsWith(child.href + "/")
                );
                const Icon = item.icon;
                
                return (
                  <div key={item.name}>
                    <SidebarMenuItem 
                    key={item.name}
                      className={cn(
                        "transition-all duration-600",
                        shouldAnimate 
                          ? "opacity-100 translate-x-0" 
                          : "opacity-0 -translate-x-6"
                      )}
                      style={{
                        transitionDelay: `${index * 70}ms`,
                        transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
                      }}
                    >
                      {hasChildren ? (
                        <SidebarMenuButton
                          size="lg"
                          isActive={isActive || hasActiveChild}
                          tooltip={item.name}
                          className={cn(
                            "cursor-pointer",
                            (isActive || hasActiveChild) && "bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary hover:text-sidebar-primary-foreground data-[active=true]:bg-sidebar-primary data-[active=true]:text-sidebar-primary-foreground",
                          )}
                          onClick={() => toggleExpanded(item.name)}
                        >
                          <Icon size={30} className="!h-5 !w-auto" />
                          <span className="text-nowrap">{item.name}</span>
                          <ChevronDown 
                            className={cn(
                              "ml-auto h-4 w-4 transition-transform duration-200 group-data-[collapsible=icon]:hidden",
                              isExpanded && "rotate-180"
                            )}
                          />
                        </SidebarMenuButton>
                      ) : (
                        <SidebarMenuButton
                          size="lg"
                          asChild
                          isActive={isActive}
                          tooltip={item.name}
                          className={cn(
                            isActive && "bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary hover:text-sidebar-primary-foreground data-[active=true]:bg-sidebar-primary data-[active=true]:text-sidebar-primary-foreground",
                          )}
                        >
                          <Link href={item.href}>
                            <Icon size={30} className="!h-5 !w-auto" />
                            <span className="text-nowrap">{item.name}</span>
                          </Link>
                        </SidebarMenuButton>
                      )}
                    </SidebarMenuItem>

                    {/* Children */}
                    {hasChildren && isExpanded && (
                      <div className="ml-4 mt-1 space-y-1 group-data-[collapsible=icon]:hidden">
                        {item.children.map((child) => {
                          const isChildActive = pathname === child.href || pathname?.startsWith(child.href + "/");
                          return (
                            <SidebarMenuItem key={child.name}>
                              <SidebarMenuButton
                                size="lg"
                                asChild
                                isActive={isChildActive}
                                tooltip={child.name}
                                className={cn(
                                  "pl-6",
                                  isChildActive && " text-sidebar-primary  hover:text-sidebar-primary-foreground  data-[active=true]:text-sidebar-primary",
                                )}
                              >
                                <Link href={child.href}>
                                <Icon size={30} className="!h-5 !w-auto" />
                                  <span className="">{child.name}</span>
                                </Link>
                              </SidebarMenuButton>
                            </SidebarMenuItem>
                          );
                        })}
                      </div>
                    )}
                  </div>
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