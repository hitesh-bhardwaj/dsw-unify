"use client";

import { useMemo, useState, useEffect, Suspense } from "react";
import { MemoriesIcon } from "@/components/Icons";
import { ScaleDown } from "@/components/animations/Animations";
import CountUp from "@/components/animations/CountUp";
import { useSearchParams } from "next/navigation";
import * as memoriesApi from "@/lib/api/memories";
import AnimatedTabsSection from "@/components/common/TabsPane";
import OrganizationMemoryGrid from "@/components/agent-studio/memories/OrganizationMemoryGrid";
import AgentsMemoryGrid from "@/components/agent-studio/memories/AgentsMemoryGrid";

const FALLBACK_MEMORIES = [
  {
    id: "user-preferences",
    name: "User Preferences",
    description: "Individual user preferences and settings",
    icon: <MemoriesIcon />,
    status: "active",
    tags: ["session", "user"],
    size: "2.4 MB",
    entries: 1250,
    variant: "light",
  },
  {
    id: "agent-learning",
    name: "Agent Learning",
    description: "Agent-specific learned behaviors and patterns",
    icon: <MemoriesIcon />,
    status: "active",
    tags: ["agent"],
    size: "12.4 MB",
    entries: 890,
    variant: "light",
  },
  {
    id: "organization-knowledge",
    name: "Organization Knowledge",
    description: "Company-wide shared knowledge and insights",
    icon: <MemoriesIcon />,
    status: "active",
    size: "6.4 MB",
    tags: ["organization"],
    entries: 2340,
    variant: "light",
  },
];

const FALLBACK_STATS = [
  { title: "Agent Memories", value: "06" },
  { title: "Organization Memories", value: "04" },
  { title: "Total Memories", value: "10" },
];
const organizationMemories=[
    {
      id: "california-insurance-regulations",
      content: "California requires 30-day notice for non-renewal. Form SR-22 required for high-risk drivers. Proposition 103 rate filing requirements apply to all policy changes.",
      icon: <MemoriesIcon />,
      modified:"1 week ago",
    },
    {
      id: "hipaa-compliance-guidelines",
      content: "All PHI must be encrypted at rest and in transit. Access logs required for minimum 6 years. Breach notification required within 60 days. Annual security risk assessment mandatory.",
      icon: <MemoriesIcon />,
      modified:"3 days ago",
    },{
      id: "auto-insurance-risk-factors",
      content: "Credit score weight: 30%. Driving record: 40%. Vehicle type: 20%. Location: 10%. Minimum liability: $25K/$50K. High-risk surcharge applies for 2+ accidents in 3 years.",
      icon: <MemoriesIcon />,
      modified:"2 days ago",
    },{
      id: "claims-approval-limits",
      content: "Claims Adjuster: up to $5K. Senior Adjuster: up to $25K. Claims Manager: up to $100K. Director approval required for $100K+. Total loss requires manager approval regardless of amount.",
      icon: <MemoriesIcon />,
      modified:"5 days ago",
    },

  ]
  const agentsMemories=[
    {
      id: "user-preferences",
      content: "Customer prefers email communication and has requested no phone calls after 6 PM EST. Previously filed 2 claims in the last 3 years.",
      icon: <MemoriesIcon />,
      modified:"2 hours ago",
      type:"auto-claims-processing-agent"
    },
    {
      id: "2019-honda-accord",
      content: "2019 Honda Accord - Front bumper damage. Customer reported accident on I-95. Photos received. Estimated repair cost: $2,400. Preferred body shop: Joe's Auto Body.",
      icon: <MemoriesIcon />,
      modified:"5 hours ago",
      type:"auto-claims-processing-agent"
    },
    {
      id: "property-claims-history",
      content: "Property has flood zone designation. Previous water damage claim in 2021. Foundation inspection completed. Updated valuation: $450,000.",
      icon: <MemoriesIcon />,
      modified:"1 day ago",
      type:"property-claims-agent"
    },{
      id: "CPT-99213-guidelines",
      content: "CPT Code 99213: Established patient office visit. Requires 2 of 3 key components: Expanded problem-focused history, Expanded problem-focused exam, Low complexity MDM. Typical time: 15 minutes.",
      icon: <MemoriesIcon />,
      modified:"3 hours ago",
      type:"health-claims-adjudication-agent"
    },
    {
      id: "customer-interaction-notes",
      content: "Customer has called 3 times regarding policy renewal. Prefers detailed email explanations. Successfully resolved billing issue on 12/15. High satisfaction rating.",
      icon: <MemoriesIcon />,
      modified:"30 minutes ago",
      type:"customer-support-agent"
    },
    {
      id: "fraud-indicator-FP-204",
      content: "Alert: Claimant has filed 4 similar incidents in 18 months. Pattern matches known fraud indicator FP-204. Requires manual review and investigation.",
      icon: <MemoriesIcon />,
      modified:"4 hours ago",
      type:"fraud-detection-agent"
    },

  ]
const items = [
    {
      id: "organization-memory",
      value: "organization-memory",
      label: "Organization Memory",
      render: () => (
        <OrganizationMemoryGrid memories={organizationMemories}/>
      ),
    },
    {
      id: "agent-memory",
      value: "agent-memory",
      label: "Agent Memory",
      render: () =>  <AgentsMemoryGrid memories={agentsMemories}/>
        },
  ];

  

function MemoriesContent() {
  const [query, setQuery] = useState("");
  const [memoriesState, setMemoriesState] = useState(FALLBACK_MEMORIES);
  const [stats, setStats] = useState(FALLBACK_STATS);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const searchParams = useSearchParams();

  // Fetch memories and stats from API
  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const [memoriesData, statsData] = await Promise.all([
          memoriesApi.getMemories(),
          memoriesApi.getMemoryStats(),
        ]);

        setMemoriesState(memoriesData);

        // Transform stats object to array format
        setStats([
          { title: "Agents Memories", value: statsData.agentsMemories },
          { title: "Organization Memories", value: statsData.organizationMemories },
          { title: "Total Memories", value: statsData.totalMemories },
        ]);
      } catch (err) {
        setError(err.message || "Failed to load memories");
        console.error("Error fetching memories:", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  // Handle memory deletion from URL parameter
  useEffect(() => {
    const deleteId = searchParams.get("deleteId");
    if (!deleteId) return;

    async function deleteMemory() {
      try {
        // Call API to delete the memory
        await memoriesApi.deleteMemory(deleteId);

        // Refresh the memories list after successful deletion
        const [memoriesData, statsData] = await Promise.all([
          memoriesApi.getMemories(),
          memoriesApi.getMemoryStats(),
        ]);

        setMemoriesState(memoriesData);
        setStats([
          { title: "Total Memories", value: statsData.totalMemories },
          { title: "Active Memories", value: statsData.activeMemories },
          { title: "Total Entries", value: statsData.totalEntries },
        ]);

        // Remove deleteId from URL after successful deletion
        window.history.replaceState({}, "", "/agent-studio/memories");
      } catch (err) {
        setError(err.message || "Failed to delete memory");
        console.error("Error deleting memory:", err);
      }
    }

    deleteMemory();
  }, [searchParams]);

  // FILTER BAR STATE
  const [selectedTags, setSelectedTags] = useState([]);
  const [view, setView] = useState("grid");
  const [sortOrder, setSortOrder] = useState("none");

  // AVAILABLE TAGS
  const availableTags = useMemo(() => {
    const setTag = new Set();
    memoriesState.forEach((m) =>
      m.tags?.forEach((tag) => setTag.add(tag.toLowerCase()))
    );
    return Array.from(setTag).sort();
  }, [memoriesState]);

  // SEARCH + TAG FILTER
  let filteredMemories = memoriesState.filter((memory) => {
    const matchSearch =
      memory.name.toLowerCase().includes(query.toLowerCase()) ||
      memory.description.toLowerCase().includes(query.toLowerCase());

    const matchTags =
      selectedTags.length === 0 ||
      selectedTags.some((t) => memory.tags.includes(t));

    return matchSearch && matchTags;
  });

  // SORTING
  if (sortOrder === "asc") {
    filteredMemories = [...filteredMemories].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
  } else if (sortOrder === "desc") {
    filteredMemories = [...filteredMemories].sort((a, b) =>
      b.name.localeCompare(a.name)
    );
  }

  return (
    <div className="flex flex-col h-full pb-10 w-full ">
      <ScaleDown>
        <div className="space-y-6 p-6">
          {/* HEADER */}
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <h1 className="text-3xl font-medium text-foreground">
                Memories
              </h1>
              <p className="mt-1 text-sm text-gray-600 dark:text-foreground">
                Manage agent memory systems
              </p>
            </div>
          </div>

          {/* STATS */}
          <div className="w-full flex items-center justify-between gap-4">
            {stats.map((item, index) => (
              <div
                key={index}
                className="flex flex-col gap-6 border bg-white border-border-color-0 rounded-3xl py-6 px-4 w-full dark:bg-card"
              >
                <span className="text-sm text-foreground/80">
                  {item.title}
                </span>
                <span className="text-4xl font-medium mt-1">
                  <CountUp value={item.value} startOnView />
                </span>
              </div>
            ))}
          </div>

          {/* SEARCH */}
            <AnimatedTabsSection items={items} defaultValue="organization-memory" />
          
      
        </div>
      </ScaleDown>

     
    </div>
  );
}

export default function MemoriesPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center">Loading...</div>}>
      <MemoriesContent />
    </Suspense>
  );
}