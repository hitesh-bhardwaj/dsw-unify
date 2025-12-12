"use client";

import { Check, Link as LinkIcon, Trash2, Edit3, ArrowDown, ArrowUp, ArrowUp01 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Separator } from "./ui/separator";

/**
 * GuardSuiteCard component for displaying guard suite information
 *
 * @param {Object} props - Component props
 * @param {Object} props.suite - Suite data
 * @param {string} props.view - View mode ('grid' | 'list')
 * @param {number} props.index - Card index for color rotation
 * @returns {React.JSX.Element}
 */
export function GuardSuiteCard({ suite, view, index }) {
  const {
    id,
    name,
    description,
    status,
    icon,
    inputGuardrails = [],
    outputGuardrails = [],
    agentsCount,
    createdDate,
    tags = [],
  } = suite || {};

  const isGrid = view === "grid";
  const isList = view === "list";

  return (
    <div className="w-full h-full">
      <Card
        className={cn(
          "feature-card-hover-container gap-2 hover:drop-shadow-md transition-all duration-300 group border-border-color-0 hover:border-white/20 !py-5 h-full",
          isGrid &&
          "h-full flex flex-col justify-between gap-0 py-5 hover:border-white/20",
          isList && "w-full rounded-xl py-6 bg-white dark:bg-background"
        )}
      >
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between mb-4">
            {/* Icon with rotating colors */}
            <div className={`flex gap-2 items-end ${view === 'list' ? 'gap-5' : ''}`}>
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
                <LinkIcon className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "h-7 w-7 flex items-center justify-center px-1 py-1 text-white opacity-0 group-hover:opacity-100",
                  "hover:bg-white/30 group-hover:text-white transition-all duration-300"
                )}
              >
                <Edit3 className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "h-7 w-7 flex items-center justify-center px-1 py-1 text-white opacity-0 group-hover:opacity-100",
                  "hover:bg-white/30 group-hover:text-white transition-all duration-300"
                )}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-xl font-medium mb-2 group-hover:text-white transition-colors duration-300">
            {name}
          </h3>

          {/* Description */}
          <p className="text-sm text-foreground line-clamp-2 group-hover:text-white/90 transition-colors duration-300">
            {description}
          </p>
        </CardHeader>

        <CardContent className="w-full mx-auto pt-4 space-y-4 rounded-xl duration-300">

          {/* Input Guardrails Section */}
          {inputGuardrails.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="size-5 rounded-full flex items-center justify-center border border-badge-green transition-colors group-hover:border-white/90 duration-300">
                  <ArrowDown className="size-3.5 group-hover:text-white/90 duration-300 transition-colors" />
                </div>
                <p className="text-sm font-medium text-foreground transition-colors group-hover:text-white/90 group-hover:border-white/90 duration-300">
                  Input Guardrails
                </p>
              </div>
              <div className="space-y-2">
                {inputGuardrails.map((guardrail, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <div className="size-5 flex items-center justify-center rounded-full border border-badge-green transition-colors group-hover:border-white/90 duration-300">
                      <Check className="size-3.5 group-hover:text-white/90 duration-300 transition-colors" />
                    </div>
                    <span className="text-sm text-foreground transition-colors group-hover:text-white/90">
                      {guardrail.name}
                      {guardrail.severity && (
                        <span className="ml-2 text-xs text-muted-foreground transition-colors group-hover:text-white/50">
                          ({guardrail.severity})
                        </span>
                      )}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <Separator />

          {/* Output Guardrails Section */}
          {outputGuardrails.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="size-5 rounded-full flex items-center justify-center border border-badge-green transition-colors group-hover:border-white/90 duration-300">
                  <ArrowUp className="size-3.5 group-hover:text-white/90 duration-300 transition-colors" />
                </div>
                <p className="text-sm font-medium text-foreground transition-colors group-hover:text-white/90 group-hover:border-white/90 duration-300">
                  Output Guardrails
                </p>
              </div>
              <div className="space-y-2">
                {outputGuardrails.map((guardrail, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <div className="size-5 flex items-center justify-center rounded-full border border-badge-green transition-colors group-hover:border-white/90 duration-300">
                      <Check className="size-3.5 group-hover:text-white/90 duration-300 transition-colors" />
                    </div>
                    <span className="text-sm text-foreground transition-colors group-hover:text-white/90 duration-300">
                      {guardrail.name}
                      {guardrail.severity && (
                        <span className="ml-2 text-xs text-muted-foreground transition-colors group-hover:text-white/50">
                          ({guardrail.severity})
                        </span>
                      )}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Footer with Stats */}
          <div className="border border-border-color-0 group-hover:border-white/30 w-full rounded-lg flex px-5 py-2 items-center bg-white/10 dark:bg-background dark:group-hover:bg-white/10 transition-all duration-300">
            <div className="flex flex-col justify-between gap-1 w-1/2">
              <div className="flex gap-2">
                <span className="text-foreground font-medium group-hover:text-white transition-colors duration-300">
                  {agentsCount}
                </span>
              </div>
              <span className="text-gray-600 dark:text-foreground/60 group-hover:text-white/80 transition-colors duration-300">Agents</span>
            </div>
            <div className="w-16 h-[0.2px] bg-border-color-3 group-hover:bg-white/40 rotate-90 transition-colors duration-300" />
            <div className="flex items-center justify-between text-sm py-5 duration-300 w-1/2">
              <div className="flex justify-between gap-1 flex-col w-full">
                <div className="flex gap-2">
                  <span className="text-foreground font-medium group-hover:text-white transition-colors duration-300">
                    {new Date(createdDate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    })}
                  </span>
                </div>
                <span className="text-gray-600 dark:text-foreground/60 group-hover:text-white/80 transition-colors duration-300">Created</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
