"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Bounce } from "./animations/Animations";
import { Copy } from "lucide-react";
import { ConfirmDialog } from "./common/Confirm-Dialog";
import { Bin, Editor, Eye } from "./Icons";

const skeletonShownMap = new Map();

/** 🔹 Slugify helper for guardrail names */
function slugifyName(name) {
  if (!name) return "";
  return name
    .toLowerCase()
    .replace(/&/g, "and") // '&' → 'and'
    .replace(/\+/g, "plus") // '+' → 'plus'
    .replace(/[^a-z0-9]+/g, "-") // non a-z0-9 → '-'
    .replace(/^-+|-+$/g, ""); // trim dashes
}

/**
 * GuardrailsCard component
 */
export function GuardrailsCard({
  guardrail,
  memories,
  index,
  onDelete,
  minSkeletonMs = 500,
}) {
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
    basedOn,
    isCustom,
  } = source;

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const handleTrashClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDeleteOpen(true);
  };

  const handleConfirmDelete = () => {
    if (onDelete && id != null) {
      onDelete(id);
    }
    setIsDeleteOpen(false);
  };

  // 🔹 use slug built from name
  const guardrailSlug =
    name && typeof name === "string"
      ? slugifyName(name)
      : id?.toString?.() ?? "";

  // Normalize tags
  const normalizedTags = tags.map((tag) =>
    typeof tag === "string" ? { label: tag } : tag
  );

  const directionLabel = direction ?? "Both";
  const allowedTagLabels = [
    "security",
    "content safety",
    "privacy",
    "quality",
    "moderation",
  ];
  const filteredTags = normalizedTags.filter((tag) =>
    allowedTagLabels.includes((tag.label || "").toLowerCase())
  );

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

  // Skeleton control keyed by slug/id
  const [showSkeleton, setShowSkeleton] = useState(() => {
    const key = guardrailSlug || id || index;
    return !skeletonShownMap.has(key);
  });

  useEffect(() => {
    const key = guardrailSlug || id || index;
    if (showSkeleton && key != null) {
      const t = setTimeout(() => {
        setShowSkeleton(false);
        skeletonShownMap.set(key, true);
      }, minSkeletonMs);
      return () => clearTimeout(t);
    }
  }, [minSkeletonMs, id, index, guardrailSlug, showSkeleton]);

  if (showSkeleton) return <GuardrailsCardSkeleton />;

  return (
    <>
      {/* 🔴 Delete confirmation dialog */}
      <ConfirmDialog
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        title="Delete guardrail?"
        description={
          name
            ? `This action cannot be undone. This will permanently remove "${name}" and its configuration from Agent Studio.`
            : "This action cannot be undone. This will permanently remove this guardrail and its configuration from Agent Studio."
        }
        confirmLabel="Delete"
        destructive
        onConfirm={handleConfirmDelete}
      />

      <Link
        href={`/agent-studio/guardrails/${guardrailSlug}`}
        className="block h-full"
      >
        <Card
          className={cn(
            "feature-card-hover-container overflow-hidden group hover:shadow-md cursor-pointer transition-all duration-300 bg-background border border-border-color-0 hover:border-white/20 !py-5 h-full flex justify-between"
          )}
        >
          <CardHeader>
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-3">
                {/* Icon */}
                <div
                  className={cn(
                    "flex h-14 w-14 items-center justify-center rounded-lg relative bg-sidebar-accent text-foreground group-hover:!bg-white group-hover:!text-black  transition-all duration-300"
                  )}
                  style={{
                    color: `var(--icon-color-${(index % 4) + 1})`,
                    backgroundColor: `rgb(from var(--icon-color-${
                      (index % 4) + 1
                    }) r g b / 0.1)`,
                  }}
                >
                  <span className="w-full h-full flex justify-center items-center p-3.5">
                    {iconNode}
                  </span>
                </div>

                {/* Custom badge */}
                {isCustom && (
                  <Badge
                    variant="secondary"
                    className="rounded-full border border-border-color-2 px-3 py-1 dark:bg-background text-xs font-light transition-all duration-300 group-hover:text-white group-hover:border-white/60 bg-white/10 dark:group-hover:bg-white/10"
                  >
                    Custom
                  </Badge>
                )}
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "h-7 w-7 flex items-center justify_center text-white px-1 py-1 opacity-0 group-hover:opacity-100",
                    "hover:bg-white/30 group-hover:text-white transition-all duration-300"
                  )}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    // TODO: view action
                  }}
                >
                  <Eye />
                </Button>

                {isCustom && (
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "h-7 w-7 flex items-center justify_center px-1 py-1 text-white opacity-0 group-hover:opacity-100",
                    "hover:bg-white/30 group-hover:text-white transition-all duration-300"
                  )}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    // TODO: edit action
                  }}
                >
                  <Editor />
                </Button>
                )}
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "h-7 w-7 flex items-center justify_center px-1 py-1 text-white opacity-0 group-hover:opacity-100",
                    "hover:bg-white/30 group-hover:text-white transition-all duration-300"
                  )}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    // TODO: duplicate action
                  }}
                >
                  <Copy className="h-4 w-4" />
                </Button>
                {isCustom && (
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "h-7 w-7 flex items-center justify_center px-1 py-1 text-white opacity-0 group-hover:opacity-100",
                    "hover:bg-white/30 group-hover:text-white transition-all duration-300"
                  )}
                  onClick={handleTrashClick}
                >
                  <Bin className="h-4 w-4" />
                </Button>
                )}
              </div>
            </div>

            {/* Name */}
            <h3 className="mt-7 text-xl font-medium text-foreground group-hover:text-white transition-colors duration-300">
              {name}
            </h3>

            {/* Description */}
            <p className="text-sm text-foreground/80 group-hover:text-white/90 transition-colors duration-300">
              {description}
            </p>

            {/* Based on (for custom guardrails) */}
            {basedOn && (
              <p className="text-xs text-muted-foreground mt-2 transition-colors duration-300 group-hover:text-white/60 pb-6">
                Based on: {basedOn}
              </p>
            )}

            {!basedOn && <div className="pb-10" />}
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
    </>
  );
}

/* Skeleton stays same */
export function GuardrailsCardSkeleton() {
  return (
    <Bounce>
      <div className="block group h_full">
        <Card className="overflow-hidden h-full hover:shadow-xl transition-all duration-500 ease-out bg-background border border-border-color-0 !py-5">
          <CardHeader>
            <div className="flex items-start justify_between">
              <div className="flex h-14 w-14 items-center justify-center rounded-lg relative bg-black/40">
                <Skeleton className="h-full w-full rounded" />
              </div>
              <div className="rounded-full text-xs font-medium bg-gray-200">
                <Skeleton className="h-6 w-16" />
              </div>
            </div>
            <div className="mt-7 space-y-2">
              <Skeleton className="h-6 w-2/3" />
              <Skeleton className="h-4 w-11/12" />
            </div>
          </CardHeader>

          <CardContent>
            <div className="mb-8 flex flex-wrap gap-1">
              <Skeleton className="h-6 w-20 rounded-full" />
              <Skeleton className="h-6 w-24 rounded-full" />
              <Skeleton className="h-6 w-16 rounded-full" />
            </div>
            <div className="flex items-center justify_between rounded-lg px-4 text-sm py-8 bg-sidebar-accent border">
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
