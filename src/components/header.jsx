"use client";

import { Home, Sun, Moon, Bell, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useState } from "react";
import { Separator } from "./ui/separator";
import { NavUser } from "./nav-user";

export function Header({ title = "Agents" }) {
  const [isDark, setIsDark] = useState(false);

  const user = {
    name: "shadcn",
    email: "m@example.com",
    avatar: "https://github.com/shadcn.png",
  }

  return (
    <header className="flex h-16 items-center justify-between bg-white px-6">
      {/* Left side - Trigger and Breadcrumb */}
      <div className="flex items-center gap-4">
        <SidebarTrigger />
        <Separator orientation="vertical" className={"h-8!"} />
        <div className="flex items-center gap-2 text-sm">
          <Home className="size-4 text-muted-foreground" />
          <span className="text-foreground">{title}</span>
        </div>
      </div>

      {/* Right side actions */}
      <div className="flex items-center gap-3">
        {/* Theme toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsDark(!isDark)}
          className="text-gray-600 hover:text-gray-900"
        >
          {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>

        {/* Notifications */}
        <Button
          variant="ghost"
          size="icon"
          className="text-gray-600 hover:text-gray-900"
        >
          <Bell className="h-5 w-5" />
        </Button>

        {/* Help */}
        <Button
          variant="ghost"
          size="icon"
          className="text-gray-600 hover:text-gray-900"
        >
          <HelpCircle className="h-5 w-5" />
        </Button>

        {/* User avatar with dropdown */}
        <div className="flex items-center gap-2 cursor-pointer">
          <NavUser user={user} />
        </div>
      </div>
    </header>
  );
}
