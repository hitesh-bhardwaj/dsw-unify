"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
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
          "h-full transition-all duration-300 hover:shadow-xl group",
          href && "cursor-pointer hover:border-primary/50",
          className
        )}
      >
        <CardHeader className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
              {Icon && <Icon className="h-6 w-6" />}
            </div>
          </div>
          <div className="space-y-1.5">
            <h3 className="text-lg font-semibold leading-none tracking-tight">
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
