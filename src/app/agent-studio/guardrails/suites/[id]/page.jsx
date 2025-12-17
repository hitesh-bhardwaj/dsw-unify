"use client";

import React, { useMemo, useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { ScaleDown } from "@/components/animations/Animations";
import LeftArrowAnim from "@/components/animations/LeftArrowAnim";
import { RippleButton } from "@/components/ui/ripple-button";
import { Button } from "@/components/ui/button";
import { Bin, GuardrailsIcon, EditIcon } from "@/components/Icons";
import { Badge } from "@/components/ui/badge";
import CountUp from "@/components/animations/CountUp";
import { Card } from "@/components/ui/card";
import * as guardrailsApi from "@/lib/api/guardrails";

// --------- MOCK DATA: now driven by slug ----------
const guardSuitesList = [
  {
    slug: "production-safety-suite",
    id: 1,
    name: "Production Safety Suite",
    description: "Prevents harmful or inappropriate content generation",
    status: "active",
    inputGuardrails: [
      {
        id: 1,
        name: "Jailbreak & Unsafe Prompt",
        description: "Detects and blocks attempts to bypass AI safety measures",
        direction: "Input",
        category: "Security",
      },
      {
        id: 2,
        name: "Toxic Language",
        description: "Filters toxic, abusive, or harmful language",
        direction: "Both",
        category: "Content Safety",
      },
      {
        id: 3,
        name: "Sensitive Information",
        description: "Prevents exposure of PII and confidential data",
        direction: "Input",
        category: "Privacy",
      },
    ],
    outputGuardrails: [
      {
        id: 4,
        name: "Hallucination/Correctness",
        description: "Validates factual accuracy and prevents hallucinations",
        direction: "Output",
        category: "Quality",
      },
      {
        id: 5,
        name: "Offensive Check",
        description: "Detects offensive or inappropriate content",
        direction: "Both",
        category: "Content Safety",
      },
    ],
    agentsCount: 12,
  },
  {
    slug: "content-moderation-suite",
    id: 2,
    name: "Content Moderation Suite",
    description: "Focused on toxic and offensive content detection",
    status: "active",
    inputGuardrails: [
      {
        id: 2,
        name: "Toxic Language",
        description: "Filters toxic, abusive, or harmful language",
        direction: "Both",
        category: "Content Safety",
      },
      {
        id: 6,
        name: "Words/Expression Check",
        description: "Monitors specific words and expressions",
        direction: "Input",
        category: "Content Moderation",
      },
    ],
    outputGuardrails: [
      {
        id: 2,
        name: "Toxic Language",
        description: "Filters toxic, abusive, or harmful language",
        direction: "Both",
        category: "Content Safety",
      },
      {
        id: 5,
        name: "Offensive Check",
        description: "Detects offensive or inappropriate content",
        direction: "Both",
        category: "Content Safety",
      },
    ],
    agentsCount: 8,
  },
];

// turn slug into nice title (handles %26, %20, etc)
function titleFromSlug(raw) {
  if (!raw) return "Guard Suite";

  const single = Array.isArray(raw) ? raw[0] : raw;

  // Decode % encodings: %20, %26, etc.
  const decoded = decodeURIComponent(single);

  // "production-safety-suite" -> "production safety suite"
  const spaced = decoded.replace(/-/g, " ");

  // Title case it
  return spaced
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

// Simplified Guardrail Item Card (non-clickable)
function GuardrailItemCard({ guardrail, index }) {
  return (
    <Card className="p-6 space-y-4 border border-border-color-0 bg-white hover:border-border-color-2 transition-all duration-300 dark:bg-card">
      <div
        className="flex items-center justify-center size-14 rounded-lg transition-all duration-300"
        style={{
          color: `var(--icon-color-${(index % 4) + 1})`,
          backgroundColor: `rgb(from var(--icon-color-${(index % 4) + 1}) r g b / 0.1)`,
        }}
      >
        <GuardrailsIcon className="size-6" />
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-medium text-foreground">{guardrail.name}</h3>
        <p className="text-sm text-foreground/80 line-clamp-2">
          {guardrail.description}
        </p>
      </div>

      <div className="flex gap-2 pt-2">
        <Badge
          variant="secondary"
          className="rounded-full border border-border-color-0 px-3 py-1 bg-white dark:bg-card text-xs font-light"
        >
          {guardrail.direction}
        </Badge>
        <Badge
          variant="secondary"
          className="rounded-full border border-border-color-0 px-3 py-1 bg-white dark:bg-card text-xs font-light"
        >
          {guardrail.category}
        </Badge>
      </div>
    </Card>
  );
}

export default function GuardSuiteDetailPage() {
  const params = useParams();
  const slugParam = params?.id;

  const [suiteData, setSuiteData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // normalize slug (handle catch-all / array)
  const slug = useMemo(
    () => (Array.isArray(slugParam) ? slugParam[0] : slugParam) || "",
    [slugParam]
  );

  // Fetch guard suite data on mount
  useEffect(() => {
    async function fetchSuite() {
      if (!slugParam) return;

      try {
        setIsLoading(true);
        const data = await guardrailsApi.getGuardSuiteById(slugParam);
        setSuiteData(data);
      } catch (err) {
        setError(err.message || "Failed to load guard suite");
        console.error("Error fetching guard suite:", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchSuite();
  }, [slugParam]);

  // Use fetched data or fallback to mock data
  const guardSuite =
    suiteData || (guardSuitesList.find((suite) => suite.slug === slug) ?? guardSuitesList[0]);

  // H1 name driven by slug (route), not just data
  const displayName = guardSuite?.name || titleFromSlug(slug || guardSuite?.slug);

  // Combine all guardrails
  const allGuardrails = [
    ...(guardSuite.inputGuardrails || []),
    ...(guardSuite.outputGuardrails || []),
  ];

  // Remove duplicates based on ID
  const uniqueGuardrails = Array.from(
    new Map(allGuardrails.map((item) => [item.id, item])).values()
  );

  const inputCount = guardSuite.inputGuardrails?.length || 0;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-600 dark:text-foreground">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-600 dark:text-red-400">{error}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <ScaleDown>
        <div className="bg-background p-6 space-y-8">
          {/* HEADER */}
          <div className="flex items-center justify-between">
            <div className="flex gap-3">
              <LeftArrowAnim link="/agent-studio/guardrails" />
              <div className="space-y-1">
                <h1 className="text-xl font-medium">{displayName}</h1>
                <p className="text-sm text-gray-600 dark:text-foreground">
                  {guardSuite.description}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <RippleButton>
                <Button
                  variant="outline"
                  className="gap-2 text-foreground border border-primary"
                >
                  <div className="!w-4 text-red-500">
                    <Bin />
                  </div>
                  Delete
                </Button>
              </RippleButton>

              <RippleButton>
                <Button className="bg-sidebar-primary hover:bg-[#E64A19] text-white gap-3 rounded-full !px-6 !py-6 !cursor-pointer duration-300">
                   <div className="!w-4 text-white">
                    <EditIcon />
                  </div>
                  Edit
                </Button>
              </RippleButton>
            </div>
          </div>

          {/* STATS CARDS */}
          <div className="w-full flex flex-col md:flex-row items-stretch justify-between gap-4">
            <div className="flex flex-col gap-3 border border-border-color-0 bg-white dark:bg-card rounded-3xl py-6 px-4 w-full">
              <span className="text-sm text-foreground/80">
                Input Guardrails
              </span>
              <span className="text-3xl font-medium mt-1">
                <CountUp
                  value={Number(String(inputCount).padStart(2, "0"))}
                  startOnView
                />
              </span>
            </div>

            <div className="flex flex-col gap-3 border border-border-color-0 bg-white dark:bg-card rounded-3xl py-6 px-4 w-full">
              <span className="text-sm text-foreground/80">Agents Using</span>
              <span className="text-3xl font-medium mt-1">
                <CountUp value={guardSuite.agentsCount} startOnView />
              </span>
            </div>

            <div className="flex flex-col gap-3 border border-border-color-0 bg-white dark:bg-card rounded-3xl py-6 px-4 w-full">
              <span className="text-sm text-foreground/80">Status</span>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-3xl font-medium">
                  {guardSuite.status === "active" ? "Active" : "Inactive"}
                </span>
                <Badge className="rounded-full px-3 py-1 text-xs font-medium bg-white text-badge-green border border-badge-green dark:bg-card">
                  {guardSuite.status === "active" ? "Active" : "Inactive"}
                </Badge>
              </div>
            </div>
          </div>

          {/* INCLUDED GUARDRAILS SECTION */}
          <div className="space-y-6">
            <h2 className="text-2xl font-medium">Included Guardrails</h2>

            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {uniqueGuardrails.map((guardrail, index) => (
                <GuardrailItemCard
                  key={guardrail.id}
                  guardrail={guardrail}
                  index={index}
                />
              ))}
            </div>
          </div>
        </div>
      </ScaleDown>
    </div>
  );
}
