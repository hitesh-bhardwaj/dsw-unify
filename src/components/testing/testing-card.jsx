"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { RunTestsIcon } from "../Icons";
import { Button } from "../ui/button";
import { Eye } from "lucide-react";
import { RippleButton } from "../ui/ripple-button";
import { Bin } from "../Icons";
import TestingSuiteViewModal from "../agent-studio/testing/TestingSuiteViewModal";
import { ConfirmDialog } from "../common/Confirm-Dialog";

// Track which tests have already shown their skeleton
const skeletonShownMap = new Map();

/**
 * Component to display a card for a test.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.test - The test data.
 * @param {string} props.test.id - The ID of the test.
 * @param {string} props.test.name - The name of the test.
 * @param {string} props.test.description - The description of the test.
 * @param {Array<{label: string, color: string}>} [props.test.tags=[]] - The tags associated with the test.
 * @param {string|number} props.test.tests - The number of tests.
 * @param {string} props.test.agent - The agent associated with the test.
 * @param {string} props.test.lastrun - The last run time.
 * @param {"light"|"dark"} [props.test.variant="light"] - The variant of the card.
 * @param {number} [minSkeletonMs=500] - The minimum time to show the skeleton loader.
 * @returns {React.JSX.Element} The rendered TestingCard component.
 */

export function TestingCard({ test, onRunTest, minSkeletonMs = 500, onDeleteTest }) {
  const {
    id,
    name,
    description,
    tags = [],
    tests,
    agent,
    lastRun,
    isRunning = false, 
    variant = "light",
  } = test || {};

  const [showSkeleton, setShowSkeleton] = useState(() => {
    return !skeletonShownMap.has(id);
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
   const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    onDeleteTest?.(id);
    setDeleteDialogOpen(false);
  };

  useEffect(() => {
    if (showSkeleton && id) {
      const t = setTimeout(() => {
        setShowSkeleton(false);
        skeletonShownMap.set(id, true);
      }, minSkeletonMs);
      return () => clearTimeout(t);
    }
  }, [minSkeletonMs, id, showSkeleton]);

  if (showSkeleton) return <TestingCardSkeleton />;

  return (
    <div>
      <Card
        className={cn(
          "overflow-hidden group bg-white transition-all duration-500 ease-out border border-border-color-0 hover:bg-sidebar-accent group-hover:bg-active-card dark:group-hover:bg-sidebar-accent group-hover:text-white group-hover:border-border-color-0 !py-5 h-full"
        )}
      >
        <CardHeader>
          <div className="flex items-center w-full justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-2 mt-4">
                <h3 className="text-xl font-medium text-black dark:text-white transition-all duration-500 ease-out">
                  {name}
                </h3>

                <div className="flex flex-wrap gap-1">
                  {tags.map((tag, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className={cn(
                        "rounded-full border px-3 py-1 bg-white dark:bg-background text-xs font-light transition-all duration-500 ease-out dark:group-hover:bg-background",
                        tag.color === "green" && "border-badge-green",
                        tag.color === "orange" && "border-primary",
                        tag.color === "red" && "border-red-500"
                      )}
                    >
                      {tag.label}
                    </Badge>
                  ))}
                </div>
              </div>

              <p className="text-sm text-foreground/80 transition-all duration-500 ease-out">
                {description}
              </p>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                onClick={() => setIsModalOpen(true)}
                size="icon"
                className="h-7 w-7 flex items-center justify-center px-1 py-1 text-foreground/80 hover:bg-white dark:text-foreground dark:hover:bg-white/30"
              >
                <Eye />
              </Button>

              <Button
                variant="ghost"
                 onClick={handleDeleteClick}
                size="icon"
                className="h-7 w-7 flex items-center justify-center px-1 py-1 text-red-500 hover:bg-white dark:hover:text-foreground dark:hover:bg-white/30"
              >
                <Bin />
              </Button>

              <RippleButton>
                <Button
                  variant="outline"
                  disabled={isRunning} // ✅ added
                  onClick={() => onRunTest?.(id)} // ✅ added
                  className="gap-2 text-white bg-primary !border-none duration-300 ease-out hover:bg-[#E64A19] hover:text-white dark:bg-primary dark:hover:bg-[#E64A19] disabled:opacity-70"
                >
                  <div className="!w-4">
                    <RunTestsIcon />
                  </div>
                  {isRunning ? "Running..." : "Run Tests"} {/* ✅ added */}
                </Button>
              </RippleButton>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="flex items-center justify-between text-sm py-4 group-hover:text-white">
            <div className="flex items-center gap-1 text-foreground/80">
              <span>{tests}</span>
              <span>tests</span>
            </div>
            <div className="flex items-center text-foreground/80">
              <span>Agent:&nbsp;</span>
              <span>{agent}</span>
            </div>
            <div className="flex items-center text-foreground/80">
              <span>Last run:&nbsp;</span>
              <span>{lastRun}</span>
            </div>
          </div>
        </CardContent>
      </Card>
       <TestingSuiteViewModal open={isModalOpen} onOpenChange={setIsModalOpen} />
       <ConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        title="Delete Test Suite"
        description={`Are you sure you want to delete "${name}"? This action cannot be undone.`}
        onConfirm={handleConfirmDelete}
        confirmLabel="Delete"
        cancelLabel="Cancel"
        destructive={true}
      />
    </div>
  );
}

/* ---------------------------------------------
   Skeleton (UNCHANGED)
---------------------------------------------- */

export function TestingCardSkeleton() {
  return (
    <div className="group">
      <Card className="overflow-hidden transition-all duration-500 ease-out bg-background border border-border-color-0 !py-3 !pb-1 !pl-0">
        <CardHeader>
          <div className="flex items-center w-full justify-between">
            <div className="space-y-6 w-full">
              <div className="flex items-center gap-2 mt-4">
                <Skeleton className="h-6 w-44" />
                <div className="flex flex-wrap gap-1">
                  <Skeleton className="h-6 w-16 rounded-full" />
                  <Skeleton className="h-6 w-20 rounded-full" />
                  <Skeleton className="h-6 w-14 rounded-full" />
                </div>
              </div>
              <Skeleton className="h-4 w-11/12" />
            </div>

            <div className="flex items-center gap-2">
              <Skeleton className="h-7 w-7 rounded" />
              <Skeleton className="h-9 w-28 rounded" />
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="flex items-center justify-between text-sm py-4">
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-10" />
              <Skeleton className="h-4 w-10" />
            </div>
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-12" />
              <Skeleton className="h-4 w-20" />
            </div>
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-14" />
              <Skeleton className="h-4 w-24" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
