"use client";

import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "./ui/separator";
import { NavUser } from "./nav-user";
import { FAQIcons, HomeIcon, NotificationsIcon } from "./Icons";
import { ThemeTogglerBtn } from "./headerdark";
import Breadcrumbs from "./common/Breadcrumbs";
import { GlobalSearch } from "./global-search";
import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";

/**
 * Header component containing navigation controls, breadcrumbs, theme toggle, notifications, help, and user profile.
 *
 * @param {Object} props - The component props.
 * @param {string} [props.title="Agents"] - The title displayed in the header (currently unused but good for future extension).
 * @returns {React.JSX.Element} The rendered Header component.
 */
export function Header({ title = "Agents" }) {
  const { user, logout, isLoading } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  // Default user for when not logged in or still loading
  const displayUser = user || {
    name: "Guest",
    email: "guest@example.com",
    avatar: "https://github.com/shadcn.png",
  };

  return (
    <header className="flex min-h-16 flex-wrap items-center justify-between gap-3 bg-background/70 px-4 sm:px-6 sticky w-full top-0 z-50 backdrop-blur-md md:border-none border-b border-border">
      {/* Left side - Trigger and Breadcrumb */}
      <div className="flex items-center gap-3 sm:gap-4 min-w-0">
        <SidebarTrigger className=""/>
        <Separator orientation="vertical" className="hidden lg:block h-8!" />
        <div className="hidden lg:flex items-center gap-2 text-sm py-2 rounded-md duration-300">
          <Breadcrumbs />
        </div>
      </div>

      {/* Right side actions */}

      <div className="flex items-center  gap-2 sm:gap-3 ml-auto ">
        {/* Global Search */}
        <div className="hidden lg:block lg:mr-6">
          <GlobalSearch />
        </div>
        <div className="lg:hidden">
          <GlobalSearch compact />
        </div>

        {/* Theme toggle */}
        <ThemeTogglerBtn />

        {/* Notifications */}
        <Button
          variant="ghost"
          size="icon"
          className="text-foreground hover:text-foreground !cursor-pointer hover:bg-sidebar-accent duration-300 p-2 rounded-md"
        >
          <NotificationsIcon className="!h-5 !w-auto" />
        </Button>

        {/* Help */}
        <Button
          variant="ghost"
          size="icon"
          className="text-foreground hover:text-foreground !cursor-pointer hover:bg-sidebar-accent p-2 rounded-md "
        >
          <FAQIcons className="!h-5 !w-auto " />
        </Button>
        <Separator orientation="vertical" className="hidden sm:block h-8!" />

        {/* User avatar with dropdown */}
        <div className="flex items-center gap-2 cursor-pointer">
          <NavUser user={displayUser} onLogout={handleLogout} />
        </div>
      </div>
    </header>
  );
}
