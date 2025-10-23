"use client";

import { AppSidebar } from "@/components/appsidebar";
import { Header } from "@/components/header";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";

export function AppLayout({ children, title }) {
  return (
    <SidebarProvider defaultOpen={true}>
      <AppSidebar />
      <SidebarInset>
        {/* Header */}
        <Header title={title} />

        {/* Page content */}
        <main className="flex-1 overflow-auto bg-background">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
