"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Bounce } from "./animations/Animations";
import { ConfirmDialog } from "./common/Confirm-Dialog";
import { Bin, Editor, Eye } from "./Icons";

const skeletonShownMap = new Map();

/**
 * Custom Tools Card component with CRUD action buttons
 *
 * @param {Object} props - Component props
 * @param {Object} props.tool - Tool data
 * @param {number} props.index - Card index for color rotation
 * @param {string} props.view - View mode (grid/list)
 * @param {Function} props.onDelete - Delete handler
 * @param {Function} props.onEdit - Edit handler
 * @param {number} props.minSkeletonMs - Minimum skeleton display time
 * @returns {React.JSX.Element}
 */
export function ToolsCustomCard({
  tool,
  index,
  view,
  onDelete,
  onEdit,
  minSkeletonMs = 500,
}) {
  const {
    id,
    name,
    description,
    status = "active",
    tags = [],
    icon,
    isCustom = true,
  } = tool || {};

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const handleTrashClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDeleteOpen(true);
  };

  const handleEditClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onEdit) {
      onEdit(tool);
    }
  };

  const handleConfirmDelete = () => {
    if (onDelete && id != null) {
      onDelete(id);
    }
    setIsDeleteOpen(false);
  };

  // Skeleton control
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
  }, [minSkeletonMs, id, showSkeleton]);

  if (showSkeleton) return <ToolsCustomCardSkeleton />;

  const isGrid = view === "grid";
  const isList = view === "list";

  return (
    <>
      {/* Delete confirmation dialog */}
      <ConfirmDialog
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        title="Delete custom tool?"
        description={
          name
            ? `This action cannot be undone. This will permanently remove "${name}" and its configuration from Agent Studio.`
            : "This action cannot be undone. This will permanently remove this tool and its configuration from Agent Studio."
        }
        confirmLabel="Delete"
        destructive
        onConfirm={handleConfirmDelete}
      />

      <Link href={`/agent-studio/tools/${id}`} className="block h-full">
        <Card
          className={cn(
            "feature-card-hover-container overflow-hidden group hover:border-transparent hover:drop-shadow-xl cursor-pointer transition-all duration-300 bg-white border border-border-color-0 !py-5 h-full gap-16",
            isList && "gap-10"
          )}
        >
          <CardHeader>
            <div className="flex items-end justify-between gap-2">
              <div className="flex items-end gap-2">
                {/* Icon */}
                <div
                  className={cn(
                    "flex h-14 w-14 items-center justify-center rounded-lg relative bg-sidebar-accent text-foreground group-hover:!bg-white group-hover:!text-black transition-all duration-300"
                  )}
                  style={{
                    color: `var(--icon-color-${(index % 4) + 1})`,
                    backgroundColor: `rgb(from var(--icon-color-${
                      (index % 4) + 1
                    }) r g b / 0.1)`,
                  }}
                >
                  <span
                    className={cn(
                      "w-full h-full flex justify-center items-center p-4"
                    )}
                  >
                    {icon}
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
                    "rounded-full px-3 py-1 text-xs font-medium bg-white/10 dark:bg-background border border-badge-green text-foreground group-hover:text-white group-hover:border-white transition-all duration-300 dark:group-hover:bg-white/10",
                    status !== "active" &&
                      "border-badge-sea-green opacity-[0.8] px-4"
                  )}
                >
                  {status === "active" ? "Active" : "Beta"}
                </Badge>

                {/* Custom badge */}
                {isCustom && (
                  <Badge
                    variant="secondary"
                    className="rounded-full border border-border-color-2 px-3 py-1 dark:bg-background text-xs font-light transition-all duration-300 group-hover:text-white group-hover:border-white/60 bg-white/10 dark:group-hover:bg-white/10 dark:bg-card"
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
                    "h-7 w-7 flex items-center justify-center text-white px-1 py-1 opacity-0 group-hover:opacity-100",
                    "hover:bg-white/30 group-hover:text-white transition-all duration-300"
                  )}
                >
                  <Eye />
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "h-7 w-7 flex items-center justify-center px-1 py-1 text-white opacity-0 group-hover:opacity-100",
                    "hover:bg-white/30 group-hover:text-white transition-all duration-300"
                  )}
                  onClick={handleEditClick}
                >
                  <Editor className="h-4 w-4" />
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "h-7 w-7 flex items-center justify-center px-1 py-1 text-white opacity-0 group-hover:opacity-100",
                    "hover:bg-white/30 group-hover:text-white transition-all duration-300"
                  )}
                  onClick={handleTrashClick}
                >
                  <Bin className="h-4 w-4" />
                </Button>
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
          </CardHeader>

          <CardContent>
            <div className="border border-border-color-2 py-10 group-hover:border-white/60 h-full w-full rounded-lg flex px-5 min-h-20 items-center bg-white/10 dark:bg-card dark:group-hover:bg-white/10 transition-all duration-300">
              {/* Tags */}
              <div className="h-fit flex flex-wrap gap-1">
                {tags.map((tag, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className={cn(
                      "rounded-full border border-color-2 px-3 py-1 dark:bg-card text-xs font-light transition-all duration-300 group-hover:text-white group-hover:border-white/60 bg-white/10 dark:group-hover:bg-white/10"
                    )}
                  >
                    {tag}
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

/**
 * Skeleton component for ToolsCustomCard
 */
export function ToolsCustomCardSkeleton() {
  return (
    <Bounce>
      <div className="block group h-full">
        <Card className="overflow-hidden hover:shadow-xl transition-all duration-500 ease-out bg-background border border-border-color-0 !pt-5">
          <CardHeader>
            <div className="flex items-start justify-between">
              {/* Icon placeholder */}
              <div className="flex h-14 w-14 items-center justify-center rounded-lg relative bg-black/40">
                <Skeleton className="h-full w-full rounded" />
              </div>

              {/* Status badge placeholder */}
              <div className="rounded-full text-xs font-medium bg-gray-200">
                <Skeleton className="h-6 w-16" />
              </div>
            </div>

            {/* Name & description placeholders */}
            <div className="mt-7 space-y-2">
              <Skeleton className="h-6 w-2/3" />
              <Skeleton className="h-4 w-11/12" />
            </div>
          </CardHeader>

          <CardContent>
            {/* Tags skeleton */}
            <div className="mb-16 flex flex-wrap gap-1">
              <Skeleton className="h-6 w-20 rounded-full" />
              <Skeleton className="h-6 w-24 rounded-full" />
              <Skeleton className="h-6 w-16 rounded-full" />
            </div>
          </CardContent>
        </Card>
      </div>
    </Bounce>
  );
}
