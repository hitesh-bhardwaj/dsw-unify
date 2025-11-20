"use client";

import Link from "next/link";
import { Card, CardHeader } from "@/components/ui/card";
import { Bounce } from "@/components/animations/Animations";
import { cn } from "@/lib/utils";

export function FeatureCard({ icon: Icon, title, description, href, className }) {
  const CardWrapper = href
    ? ({ children }) => (
        <Bounce>
          <Link href={href} className="block h-full">
            {children}
          </Link>
        </Bounce>
      )
    : ({ children }) => <Bounce>{children}</Bounce>;

  return (
    <CardWrapper>
      <Card
        className={cn(
          "h-full transition-all duration-300 hover:bg-sidebar-accent dark:hover:bg-sidebar-accent group py-5 pb-10 hover:border-border-color-2",
          href && "cursor-pointer",
          className
        )}
      >
        <CardHeader className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-sidebar-accent border text-foreground transition-all group-hover:bg-foreground group-hover:text-background duration-300 p-3">
              {Icon && <Icon className="h-6 w-6" />}
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-medium leading-none tracking-tight">
              {title}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {description}
            </p>
          </div>
        </CardHeader>
      </Card>
    </CardWrapper>
  );
}
