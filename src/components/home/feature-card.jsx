"use client";

import Link from "next/link";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Bounce } from "@/components/animations/Animations";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";

const skeletonShownMap = new Map();

export function FeatureCard({
  icon: Icon,
  title,
  description,
  href,
  className,
  iconColor,
  minSkeletonMs = 500,
  index
}) {
  const id = title; // unique key for skeleton control

  const [showSkeleton, setShowSkeleton] = useState(() => {
    return !skeletonShownMap.has(id);
  });

  useEffect(() => {
    if (showSkeleton && id) {
      const t = setTimeout(() => {
        setShowSkeleton(false);
        skeletonShownMap.set(id, true);
      }, minSkeletonMs);
      return () => clearTimeout(t);
    }
  }, [showSkeleton, minSkeletonMs, id]);

  if (showSkeleton) return <FeatureCardSkeleton />;

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
          "feature-card-hover-container h-full transition-all duration-300 group py-5 pb-10 border border-border-color-0 hover:drop-shadow-xl",
          href && "cursor-pointer",
          className
        )}
      >
        <CardHeader className="space-y-6">
          <div className="flex items-center gap-3">
            <div
              className="flex h-14 w-14 items-center justify-center rounded-lg  transition-all group-hover:!bg-white group-hover:!text-black duration-300 p-3"
              style={{
                color: `var(--icon-color-${(index % 4) + 1})`,
                backgroundColor: `rgb(from var(--icon-color-${(index % 4) + 1}) r g b / 0.1)`
              }}
            >
              {Icon && <Icon className="h-6 w-6" />}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-medium leading-none tracking-tight group-hover:text-white transition-colors duration-300">
              {title}
            </h3>
            <p className="text-sm w-[90%] text-muted-foreground line-clamp-2 group-hover:text-white/90 transition-colors duration-300">
              {description}
            </p>
          </div>
        </CardHeader>
      </Card>
    </CardWrapper>
  );
}

/*             FEATURE CARD SKELETON              */

export function FeatureCardSkeleton() {
  return (
    <div className="group w-full h-full">
      <Card className="overflow-hidden w-full h-full transition-all duration-500 ease-out py-5 bg-background border border-border-color-0">
        <CardHeader className="space-y-6">
          {/* Icon circle */}
          <div className="flex items-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-black/30">
              <Skeleton className="h-full w-full rounded" />
            </div>
          </div>

          {/* Title + description */}
          <div className="space-y-4">
            <Skeleton className="h-6 w-2/3" />
            <Skeleton className="h-4 w-5/6" />
          </div>
        </CardHeader>

        <CardContent />
      </Card>
    </div>
  );
}
