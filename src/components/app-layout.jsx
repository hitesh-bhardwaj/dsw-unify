"use client";

import { AppSidebar } from "@/components/appsidebar";
import { Header } from "@/components/header";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";

export function AppLayout({ children, title }) {
  return (
    <div className="flex min-h-screen w-full ">
      <SidebarProvider defaultOpen={true}>
        <AppSidebar />
        <SidebarInset className="min-w-0">
          {/* Header */}
          <Header title={title} />

          {/* Page content */}
          <main className="flex-1 overflow-auto bg-background min-w-0">
            {children}
          </main>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
