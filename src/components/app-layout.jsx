"use client";

import { AppSidebar } from "@/components/appsidebar";
import { Header } from "@/components/header";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";

/**
 * AppLayout component that wraps the application content with a sidebar and header.
 *
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The content to be rendered within the main area.
 * @param {string} props.title - The title to be displayed in the header.
 * @returns {React.JSX.Element} The rendered AppLayout component.
 */
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
