// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { cn } from "@/lib/utils";
// import {
//   Sidebar,
//   SidebarContent,
//   SidebarGroup,
//   SidebarGroupContent,
//   SidebarHeader,
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
//   SidebarRail,
// } from "@/components/ui/sidebar";
// import Image from "next/image";
// import logo from "../../public/unify-logo.png";
// import { AgentsIcon, GuardrailsIcon, KnowledgeBaseIcon, LLMsIcon, MemoriesIcon, PromptsIcon, TestingIcon, ToolsIcon } from "./Icons";

// const navigation = [
//   { name: "Agents", href: "/agents", icon: AgentsIcon },
//   { name: "Prompts", href: "/prompts", icon: PromptsIcon },
//   { name: "LLMs", href: "/llms", icon: LLMsIcon },
//   { name: "Knowledge Bases", href: "/knowledge-bases", icon: KnowledgeBaseIcon },
//   { name: "Tools", href: "/tools", icon: ToolsIcon },
//   { name: "Memories", href: "/memories", icon: MemoriesIcon },
//   { name: "Guardrails", href: "/guardrails", icon: GuardrailsIcon },
//   { name: "Testing", href: "/testing", icon: TestingIcon},
// ];

// export function AppSidebar() {
//   const pathname = usePathname();

//   return (
//     <Sidebar collapsible="icon">
//       <SidebarHeader className="border-b border-sidebar-border">
//         <div className="flex h-12 items-center gap-3 px-2">
//           <div className="size-10 shrink-0">
//             <Image src={logo} className="" alt="Unify-Logo"/>
//           </div>
//           <span className="text-2xl font-medium group-data-[collapsible=icon]:hidden">
//             UnifyAI
//           </span>
//         </div>
//       </SidebarHeader>

//       <SidebarContent>
//         <SidebarGroup>
//           <SidebarGroupContent>
//             <SidebarMenu>
//               {navigation.map((item) => {
//                 const isActive = pathname === item.href || pathname?.startsWith(item.href + "/");
//                 const Icon = item.icon;
//                 return (
//                   <SidebarMenuItem key={item.name}>
//                     <SidebarMenuButton
//                       size="lg"
//                       asChild
//                       isActive={isActive}
//                       tooltip={item.name}
//                       className={cn(
//                         isActive && "bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary hover:text-sidebar-primary-foreground data-[active=true]:bg-sidebar-primary data-[active=true]:text-sidebar-primary-foreground",
//                       )}
//                     >
//                       <Link href={item.href}>
//                        <Icon size={30} className="!h-5 !w-auto" />
//                         <span className="">{item.name}</span>
//                       </Link>
//                     </SidebarMenuButton>
//                   </SidebarMenuItem>
//                 );
//               })}
//             </SidebarMenu>
//           </SidebarGroupContent>
//         </SidebarGroup>
//       </SidebarContent>
//       <SidebarRail />
//     </Sidebar>
//   );
// }

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
import { 
  AgentsIcon, 
  GuardrailsIcon, 
  KnowledgeBaseIcon, 
  LLMsIcon, 
  MemoriesIcon, 
  PromptsIcon, 
  TestingIcon, 
  ToolsIcon 
} from "./Icons";

const navigation = [
  { name: "Agents", href: "/agents", icon: AgentsIcon },
  { name: "Prompts", href: "/prompts", icon: PromptsIcon },
  { name: "LLMs", href: "/llms", icon: LLMsIcon },
  { name: "Knowledge Bases", href: "/knowledge-bases", icon: KnowledgeBaseIcon },
  { name: "Tools", href: "/tools", icon: ToolsIcon },
  { name: "Memories", href: "/memories", icon: MemoriesIcon },
  { name: "Guardrails", href: "/guardrails", icon: GuardrailsIcon },
  { name: "Testing", href: "/testing", icon: TestingIcon},
];

// Store animation state outside component to persist across renders
let hasAnimatedGlobal = false;

export function AppSidebar() {
  const pathname = usePathname();
  const { open } = useSidebar();
  const [shouldAnimate, setShouldAnimate] = useState(hasAnimatedGlobal);

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
                const isActive = pathname === item.href || pathname?.startsWith(item.href + "/");
                const Icon = item.icon;
                return (
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
                        <span className="">{item.name}</span>
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