"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton"; // <— shadcn/ui Skeleton
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Calendar, FileTimeout, SynthWave } from "./Icons";
import { Bounce } from "./animations/Animations";


const skeletonShownMap = new Map();

/**
 * Component to display a card representing an agent.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.agent - The agent data object.
 * @param {string} props.agent.id - The unique identifier of the agent.
 * @param {string} props.agent.name - The name of the agent.
 * @param {string} props.agent.description - The description of the agent.
 * @param {React.ReactNode} props.agent.icon - The icon for the agent.
 * @param {string} props.agent.status - The status of the agent (e.g., "active").
 * @param {Array<{label: string}>} [props.agent.tags=[]] - An array of tags associated with the agent.
 * @param {string} [props.agent.lastActivity] - The last activity timestamp or text.
 * @param {string|number} [props.agent.requestCount] - The request count for the agent.
 * @param {"light"|"dark"} [props.agent.variant="light"] - The variant of the card (light or dark mode).
 * @param {number} [minSkeletonMs=500] - The minimum time in milliseconds to show the skeleton loader.
 * @returns {React.JSX.Element} The rendered AgentCard component.
 */
export function AgentCard({ agent,minSkeletonMs = 500 }) {
  const {
    id,
    name,
    description,
    icon,
    status,
    tags = [],
    lastActivity,
    requestCount,
    variant = "light",
  } = agent;

  const isDark = variant === "dark";

  // Show skeleton for 500ms, then show real data
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

    
  if (showSkeleton) {
    // Skeleton that mirrors the real card's structure
    return (
      <Bounce>
        <div className="block h-full">
          <Card className="overflow-hidden  hover:shadow-xl transition-all duration-500 ease-out bg-background border border-border-color-0 py-5">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex h-14 w-14 items-center justify-center rounded-lg relative bg-foreground/40 dark:bg-sidebar-accent">
                  <Skeleton className="h-15 w-15 rounded-lg" />
                  {/* <span className="w-3 h-3 rounded-full bg-badge-green absolute -top-0.5 -right-0.5 opacity-40" /> */}
                </div>
                <div className="rounded-full text-xs font-medium bg-[#DEDEDE] dark:bg-foreground">
                  <Skeleton className="h-6 w-16" />
                </div>
              </div>

              <div className="mt-7 space-y-2">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-5/6" />
              </div>
            </CardHeader>

            <CardContent>
              <div className="mb-20 flex flex-wrap gap-1">
                <Skeleton className="h-6 w-20 rounded-full" />
                <Skeleton className="h-6 w-24 rounded-full" />
                <Skeleton className="h-6 w-16 rounded-full" />
              </div>

              <div className="flex items-center justify-between rounded-lg p-3 text-sm py-6 bg-sidebar-accent border">
                <div className="flex items-center gap-2 font-medium">
                  <Skeleton className="h-4 w-4 rounded" />
                  <Skeleton className="h-4 w-24" />
                </div>
                <div className="flex items-center gap-2">
                  <Skeleton className="h-4 w-4 rounded" />
                  <Skeleton className="h-4 w-20" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </Bounce>
    );
  }

  // Real content after 500ms
  return (
    <Bounce>
      <Link href={`/agent-studio/agents/${id}`} className="block">
          <Card
          className={cn(
            "feature-card-hover-container overflow-hidden group hover:shadow-md cursor-pointer transition-all duration-300 bg-background border border-border-color-0 hover:border-white/20 py-5"
          )}
        >
          <CardHeader className="">
            <div className="flex items-end justify-start gap-2">
              {/* Icon */}
              <div
                className={cn(
                  "flex h-14 w-14 items-center justify-center rounded-lg relative bg-sidebar-accent border border-color-2 text-foreground group-hover:bg-white group-hover:text-black group-hover:border-white transition-all duration-300"
                )}
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
                ></span>
              </div>

              {/* Status badge */}
            <Badge
                className={cn(
                  "rounded-full px-3 py-1 text-foreground text-xs font-medium ",
                  status === "active"
                    ? "border-badge-green bg-transparent dark:bg-transparent group-hover:border-white group-hover:text-white duration-300 "
                    : " text-foreground px-4 "
                )}
              >
                {status === "active" ? "Active" : "Draft"}
              </Badge>
            </div>

            {/* Agent name */}
            <h3 className="mt-7 h-15 text-xl font-medium text-foreground group-hover:text-white transition-colors duration-300">
              {name}
            </h3>

            {/* Description */}
            <p
              className={cn(
                "text-sm text-gray-600 dark:text-foreground group-hover:text-white/90 transition-colors duration-300"
              )}
            >
              {description}
            </p>
          </CardHeader>

          <CardContent>
            {/* Tags */}
            <div className="mb-16 flex flex-wrap gap-1">
              {tags.map((tag, index) => (
                <Badge
                key={index}
                variant="secondary"
                className={cn(
                  "rounded-full border border-color-2 px-3 py-1 dark:bg-background text-xs font-light transition-all duration-300 group-hover:text-white group-hover:border-white/30 bg-white/10 dark:group-hover:bg-white/10"
                )}>
                  {tag.label}
                </Badge>
              ))}
            </div>

            {/* Footer stats */}
            <div
              className={cn(
                "flex items-center justify-between border border-color-2 rounded-lg p-3 text-sm py-6 duration-300 dark:bg-background bg-white/10 dark:group-hover:bg-white/10 group-hover:border-white/30"
              )}
            >
              <div className="flex items-center gap-2 font-medium">
                <div className="w-4 h-4">
                  <Calendar className="text-primary group-hover:text-white transition-all duration-300 dark:text-foreground" />
                </div>
                <span className="text-foreground group-hover:text-white transition-colors duration-300">{lastActivity}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4">
                  <FileTimeout className="text-badge-blue group-hover:text-white transition-all duration-300 dark:text-foreground" />
                </div>
                <span className="font-medium text-foreground group-hover:text-white transition-colors duration-300">{requestCount}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    </Bounce>
  );
}
