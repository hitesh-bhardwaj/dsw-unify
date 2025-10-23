"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bot,
  MessageSquare,
  Cpu,
  BookOpen,
  Wrench,
  Database,
  Shield,
  FlaskConical,
} from "lucide-react";
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
import Image from "next/image";
import logo from "../../public/unify-logo.png";

const navigation = [
  { name: "Agents", href: "/agents", icon: Bot },
  { name: "Prompts", href: "/prompts", icon: MessageSquare },
  { name: "LLMs", href: "/llms", icon: Cpu },
  { name: "Knowledge Bases", href: "/knowledge-bases", icon: BookOpen },
  { name: "Tools", href: "/tools", icon: Wrench },
  { name: "Memories", href: "/memories", icon: Database },
  { name: "Guardrails", href: "/guardrails", icon: Shield },
  { name: "Testing", href: "/testing", icon: FlaskConical },
];

export function AppSidebar() {
  const pathname = usePathname();

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
              {navigation.map((item) => {
                const isActive = pathname === item.href || pathname?.startsWith(item.href + "/");
                return (
                  <SidebarMenuItem key={item.name}>
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
                        <item.icon />
                        <span>{item.name}</span>
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
