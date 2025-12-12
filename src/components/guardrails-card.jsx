"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Bounce } from "./animations/Animations";
import { Copy, Eye } from "lucide-react";

const skeletonShownMap = new Map();

/**
 * Component to display a card for guardrails.
 *
 * @param {Object} props - The component props.
 * @param {Object} [props.guardrail] - Guardrail data (new prop).
 * @param {Object} [props.memories] - Guardrail data (legacy prop).
 * @param {number} [minSkeletonMs=500] - The minimum time to show the skeleton loader.
 * @returns {React.JSX.Element} The rendered GuardrailsCard component.
 */
export function GuardrailsCard({ guardrail, memories, index, minSkeletonMs = 500 }) {
  const source = guardrail || memories || {};
  const {
    id,
    name,
    description,
    status = "active",
    tags = [],
    icon,
    direction,
    category,
  } = source;

  // Normalize tags that might come as strings from guardrail data
  const normalizedTags = tags.map((tag) =>
    typeof tag === "string" ? { label: tag } : tag
  );

  const directionLabel = direction ?? "Both";
  const allowedTagLabels = ["security", "content safety", "privacy", "quality", "moderation"];
  const filteredTags = normalizedTags.filter((tag) =>
    allowedTagLabels.includes((tag.label || "").toLowerCase())
  );

  // Ensure category is represented as a badge if provided
  if (category) {
    const exists = filteredTags.some(
      (tag) => (tag.label || "").toLowerCase() === category.toLowerCase()
    );
    if (!exists) {
      filteredTags.push({ label: category });
    }
  }

  let iconNode = null;
  if (icon) {
    if (typeof icon === "function") {
      const IconComp = icon;
      iconNode = <IconComp className="w-6 h-6" />;
    } else {
      iconNode = icon;
    }
  }

  // Keep skeleton visible for at least `minSkeletonMs`
 const [showSkeleton, setShowSkeleton] = useState(() => {
      // Only show skeleton if it hasn't been shown for this test before
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
    }, [minSkeletonMs, id, showSkeleton]);

  if (showSkeleton) return <GuardrailsCardSkeleton />;

  return (
    <Bounce>
      <Link href={`/agent-studio/guardrails/${id}`} className="block  h-full">
        <Card
          className={cn(
           "feature-card-hover-container overflow-hidden group hover:shadow-md cursor-pointer transition-all duration-300 bg-background border border-border-color-0 hover:border-white/20 !py-5 h-full flex justify-between"
          )}
        >
          <CardHeader>
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-end gap-2">
                {/* Icon */}
                <div
                  className={cn(
                    "flex h-14 w-14 items-center justify-center rounded-lg relative bg-sidebar-accent text-foreground group-hover:!bg-white group-hover:!text-black  transition-all duration-300"
                  )}
                  style={{
                    color: `var(--icon-color-${(index % 4) + 1})`,
                    backgroundColor: `rgb(from var(--icon-color-${(index % 4) + 1}) r g b / 0.1)`
                  }}
                >
                  <span
                    className={cn(
                      "w-full h-full flex justify-center items-center p-3.5"
                    )}
                  >
                    {iconNode}
                  </span>
                  <span
                    className={cn(
                      "w-3 h-3 rounded-full bg-badge-green absolute -top-0.5 -right-0.5 animate-pulse",
                      status === "active" ? "" : "hidden"
                    )}
                  />
                </div>

                {/* Status badge */}
                <Badge
                  className={cn(
                    "rounded-full px-3 py-1 text-xs font-medium bg-white/10 border transition-all duration-300 group-hover:text-white group-hover:border-white",
                    status === "active"
                      ? "border-badge-green text-foreground"
                      : "border-badge-sea-green text-foreground px-4 opacity-[0.8]"
                  )}
                >
                  {status === "active" ? "Active" : "Beta"}
                </Badge>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "h-7 w-7 flex items-center justify-center text-white px-1 py-1 opacity-0 group-hover:opacity-100",
                    "hover:bg-white/30 group-hover:text-white transition-all duration-300"
                  )}
                >
                  <Eye className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "h-7 w-7 flex items-center justify-center px-1 py-1 text-white opacity-0 group-hover:opacity-100",
                    "hover:bg-white/30 group-hover:text-white transition-all duration-300"
                  )}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Name */}
            <h3 className="mt-7 text-xl font-medium text-foreground group-hover:text-white transition-colors duration-300">
              {name}
            </h3>

            {/* Description */}
            <p className="text-sm text-foreground/80 group-hover:text-white/90 transition-colors duration-300 pb-10">
              {description}
            </p>
          </CardHeader>

          <CardContent>

          <div className="border border-border-color-0 group-hover:border-white/30 h-full w-full rounded-lg flex px-5 py-2 min-h-20 items-center bg-white/10 dark:bg-background dark:group-hover:bg-white/10 transition-all duration-300">
            <div className="text-sm text-foreground font-medium group-hover:text-white transition-colors duration-300 w-1/2">
              {directionLabel}
            </div>
            <div className="w-px h-10 bg-border-color-3 group-hover:bg-white/40 mx-4 transition-colors duration-300" />
            <div className="flex flex-wrap gap-1 items-center justify-end w-1/2">
              {filteredTags.map((tag, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className={cn(
                    "rounded-full border border-color-2 px-3 py-1 dark:bg-background text-xs font-light transition-all duration-300 group-hover:text-white group-hover:border-white/30 bg-white/10 dark:group-hover:bg-white/10"
                  )}
                >
                  {tag.label}
                </Badge>
              ))}
            </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    </Bounce>
  );
}

/* ---------------------------------------------
   Skeleton that mirrors the GuardrailsCard layout
---------------------------------------------- */
/**
 * Skeleton component for GuardrailsCard.
 *
 * @returns {React.JSX.Element} The rendered GuardrailsCardSkeleton component.
 */
export function GuardrailsCardSkeleton() {
  return (
    <Bounce>
      <div className="block group h-full">
        <Card className="overflow-hidden h-full hover:shadow-xl transition-all duration-500 ease-out bg-background border border-border-color-0 !py-5">
          <CardHeader>
            <div className="flex items-start justify-between">
              {/* Icon placeholder */}
              <div className="flex h-14 w-14 items-center justify-center rounded-lg relative bg-black/40">
                <Skeleton className="h-full w-full rounded" />
                {/* <span className="w-3 h-3 rounded-full bg-badge-green absolute -top-0.5 -right-0.5 opacity-40" /> */}
              </div>

              {/* Status badge placeholder */}
              <div className="rounded-full text-xs font-medium bg-gray-200">
                <Skeleton className="h-6 w-16" />
              </div>
            </div>

            {/* Name & Description placeholders */}
            <div className="mt-7 space-y-2">
              <Skeleton className="h-6 w-2/3" />
              <Skeleton className="h-4 w-11/12" />
            </div>
          </CardHeader>

          <CardContent>
            {/* Tags skeleton */}
            <div className="mb-8 flex flex-wrap gap-1">
              <Skeleton className="h-6 w-20 rounded-full" />
              <Skeleton className="h-6 w-24 rounded-full" />
              <Skeleton className="h-6 w-16 rounded-full" />
            </div>

            {/* Footer stats skeleton */}
            <div className="flex items-center justify-between rounded-lg px-4 text-sm py-8 bg-sidebar-accent border">
              <div className="flex justify-between w-full">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-5 w-12" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Bounce>
  );
}
