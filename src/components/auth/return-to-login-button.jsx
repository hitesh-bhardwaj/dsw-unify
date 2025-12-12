"use client";

import Link from "next/link";
import { LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * ReturnToLoginButton component - circular back button
 *
 * @param {Object} props - The component props
 * @param {string} [props.className] - Additional class names
 * @returns {React.JSX.Element} The rendered ReturnToLoginButton component
 */
export function ReturnToLoginButton({ className }) {
  return (
    <Link
      href="/login"
      className={cn(
        "inline-flex items-center gap-2 rounded-full text-sm font-medium text-foreground hover:text-primary transition-colors",
        className
      )}
    >
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-foreground text-background hover:bg-foreground/90 transition-colors">
        <LogOut className="h-5 w-5 rotate-180" />
      </span>
      <span>Return to login</span>
    </Link>
  );
}
