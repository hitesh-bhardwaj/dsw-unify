"use client";

import React, { useState } from "react";
import {
  Check,
  Link as LinkIcon,
  Trash2,
  Edit3,
  ArrowDown,
  ArrowUp,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Separator } from "./ui/separator";
import Link from "next/link";
import { ConfirmDialog } from "./common/Confirm-Dialog";
import { Bin, Editor, Eye } from "./Icons";

/** slugify helper for suite names */
function slugifyName(name) {
  if (!name) return "";
  return name
    .toLowerCase()
    .replace(/&/g, "and") // '&' → 'and'
    .replace(/\+/g, "plus") // '+' → 'plus'
    .replace(/[^a-z0-9]+/g, "-") // anything not a-z/0-9 → '-'
    .replace(/^-+|-+$/g, ""); // trim leading/trailing '-'
}

export function GuardSuiteCard({ suite, view, index, onDelete }) {
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
  } = suite || {};

  const isGrid = view === "grid";
  const isList = view === "list";

  const suiteSlug = name ? slugifyName(name) : (id && String(id)) || "";

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
  };

  return (
    <>
      <ConfirmDialog
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        title="Delete guard suite?"
        description={
          name
            ? `This action cannot be undone. This will permanently remove "${name}" and its configuration from Agent Studio.`
            : "This action cannot be undone. This will permanently remove this guard suite and its configuration from Agent Studio."
        }
        confirmLabel="Delete"
        destructive
        onConfirm={handleConfirmDelete}
      />

      <Link
        href={`/agent-studio/guardrails/suites/${suiteSlug}`}
        className="w-full h-full block"
      >
        <Card
          className={cn(
            "feature-card-hover-container gap-2 hover:drop-shadow-xl transition-all duration-300 group border-border-color-0 hover:border-transparent !py-5 h-full cursor-pointer ",
            isGrid &&
              "h-full flex flex-col gap-0 py-5 hover:border-white/20",
            isList && "w-full rounded-xl py-6 bg-white dark:bg-background   "
          )}
        >
          <CardHeader className="pb-2 h-[40%]">
            <div className="flex items-center justify-between mb-4">
              {/* Icon with rotating colors */}
              <div
                className={`flex gap-2 items-end ${
                  view === "list" ? "gap-5" : ""
                }`}
              >
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
                  <span className="w-full h-full flex justify-center items-center p-4">
                    {typeof icon === "function" ? React.createElement(icon) : icon}
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
                    "rounded-full px-3 py-1 text-xs font-medium bg-white/10 border transition-all duration-300 group-hover:text-white group-hover:border-white dark:bg-background dark:group-hover:bg-white/10",
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
                  // onClick={(e) => {
                  //   e.preventDefault();
                  //   e.stopPropagation();
                  //   // TODO: copy link
                  // }}
                >
                  {/* <LinkIcon className="h-4 w-4" /> */}
                  <Eye />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "h-7 w-7 flex items-center justify-center px-1 py-1 text-white opacity-0 group-hover:opacity-100",
                    "hover:bg-white/30 group-hover:text-white transition-all duration-300"
                  )}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    // TODO: edit action
                  }}
                >
                  {/* <Edit3 className="h-4 w-4" /> */}
                  <Editor />
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

            {/* Title */}
            <h3 className="text-xl font-medium mb-2 group-hover:text-white transition-colors duration-300">
              {name}
            </h3>

            {/* Description */}
            <p className="text-sm text-foreground line-clamp-2 group-hover:text-white/90 transition-colors duration-300">
              {description}
            </p>
          </CardHeader>

          <CardContent className="w-full h-full  mx-auto pt-4 space-y-4 rounded-xl duration-300 flex flex-col justify-evenly">
            {/* Input Guardrails */}
            {inputGuardrails.length > 0 && (
              <div className="space-y-4">
                {/* Header row */}
                <div className="flex gap-2 items-start">
                  {/* icon column */}
                  <div className="flex-shrink-0">
                    <div className="size-5 rounded-full flex items-center justify-center border border-badge-blue transition-colors group-hover:border-white/90 duration-300">
                      <ArrowDown className="size-3.5 text-badge-blue group-hover:text-white/90 duration-300 transition-colors" />
                    </div>
                  </div>

                  {/* text column */}
                  <p className="text-sm font-medium text-foreground transition-colors group-hover:text-white/90 duration-300">
                    Input Guardrails
                  </p>
                </div>

                {/* List */}
                <div className="space-y-2">
                  {inputGuardrails.map((guardrail, idx) => (
                    <div key={idx} className="flex gap-2 items-center">
                      <div className="flex-shrink-0">
                        <div className="size-5 flex items-center justify-center rounded-full border border-badge-green transition-colors group-hover:border-white/90 duration-300">
                          <Check className="size-3.5 text-badge-green group-hover:text-white/90 duration-300 transition-colors" />
                        </div>
                      </div>

                      <span className="text-sm text-foreground transition-colors group-hover:text-white/90 leading-5">
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

            {/* <Separator /> */}

           

            

            {/* Output Guardrails */}
            {outputGuardrails.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-start gap-2">
                  <div className="size-5 rounded-full flex items-center justify-center border border-badge-green transition-colors group-hover:border-white/90 duration-300 flex-shrink-0 mt-0">
                    <ArrowUp className="size-3.5 text-badge-green group-hover:text-white/90 duration-300 transition-colors" />
                  </div>
                  <p className="text-sm font-medium text-foreground transition-colors group-hover:text-white/90 group-hover:border-white/90 duration-300 mt-0">
                    Output Guardrails
                  </p>
                </div>
                <div className="space-y-2">
                  {outputGuardrails.map((guardrail, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <div className="size-5 flex items-center justify-center rounded-full border border-badge-green transition-colors group-hover:border-white/90 duration-300 flex-shrink-0 mt-0">
                        <Check className="size-3.5 text-badge-green group-hover:text-white/90 duration-300 transition-colors" />
                      </div>
                      <span className="text-sm text-foreground transition-colors group-hover:text-white/90 duration-300 mt-0">
                        {guardrail.name}
                        {guardrail.severity && (
                          <span className="ml-2 text-sm text-muted-foreground transition-colors group-hover:text-white/50">
                            ({guardrail.severity})
                          </span>
                        )}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Footer */}
            <div
              className={`flex items-center rounded-lg p-5 py-5 mt-8 text-sm bg-white/10 dark:bg-card dark:group-hover:bg-white/10 border border-border-color-2 group-hover:border-white/60 transition-all ${
                view === "list" ? "justify-between" : "justify-center gap-17"
              }`}
            >
              {/* Left */}
              <div className="flex flex-col gap-1">
                <p className="text-base font-medium group-hover:text-white">
                  {agentsCount}
                </p>
                <p className="text-foreground/70 group-hover:text-white/80">
                  Agents
                </p>
              </div>

              {/* Divider */}
              <div className="w-[1px] h-10 bg-foreground/30 group-hover:bg-white/60" />

              {/* Right */}
              <div className="flex flex-col gap-1 text-left">
                <p className="text-base font-medium group-hover:text-white">
                  {createdDate}
                </p>
                <p className="text-foreground/70 group-hover:text-white/80">
                  Created
                </p>
              </div>
            </div>
          
          </CardContent>
        </Card>
      </Link>
    </>
  );
}
