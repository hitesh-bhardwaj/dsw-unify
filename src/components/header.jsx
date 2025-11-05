"use client";

import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "./ui/separator";
import { NavUser } from "./nav-user";
import { FAQIcons, HomeIcon, NotificationsIcon } from "./Icons";
import { ThemeTogglerBtn } from "./headerdark";

export function Header({ title = "Agents" }) {

  const user = {
    name: "shadcn",
    email: "m@example.com",
    avatar: "https://github.com/shadcn.png",
  }

  return (
    <header className="flex h-16 items-center justify-between bg-background/50 px-6 sticky w-full top-0 z-10 backdrop-blur-sm">
      {/* Left side - Trigger and Breadcrumb */}
      <div className="flex items-center gap-4">
        <SidebarTrigger />
        <Separator orientation="vertical" className={"h-8!"} />
        <div className="flex items-center gap-2 text-sm hover:bg-sidebar-accent p-2 rounded-md duration-300">
          <HomeIcon className="h-5 w-auto !cursor-pointer"/>
          <span className="text-foreground">{title}</span>
        </div>
      </div>

      {/* Right side actions */}
      <div className="flex items-center gap-3">
        {/* Theme toggle */}
        <ThemeTogglerBtn/>

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
        <Separator orientation="vertical" className={"h-8!"} />


        {/* User avatar with dropdown */}
        <div className="flex items-center gap-2 cursor-pointer">
          <NavUser user={user} />
        </div>
      </div>
    </header>
  );
}
