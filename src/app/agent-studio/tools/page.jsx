"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PlusIcon } from "@/components/Icons";
import { ToolsCard } from "@/components/tools-card";
import SearchBar from "@/components/search-bar";
// import { FadeUp } from "@/components/animations/Animations";
import { RippleButton } from "@/components/ui/ripple-button";
import { cn } from "@/lib/utils";
import { ScaleDown } from "@/components/animations/Animations";
import AddToolModal from "@/components/agent-studio/CreateToolsModal";

// Mock data for tools
const tools = [
  {
    id: "web-search",
    name: "Web Search",
    description: "Search the web for current information",
    status: "active",
    tags: [
      { label: "api", color: "yellow" },
      { label: "api", color: "blue" },
    ],
    variant: "light",
  },
  {
    id: "calculator",
    name: "Calculator",
    description: "Perform mathematical calculations",
    status: "active",
    tags: [
      { label: "function", color: "yellow" },
      { label: "utility", color: "blue" },
    ],
    variant: "light",
  },
  {
    id: "code-executor",
    name: "Code Executor",
    description: "Execute Python code safely",
    status: "beta",
    tags: [
      { label: "sandbox", color: "yellow" },
      { label: "development", color: "blue" },
    ],
    variant: "light",
  },
  // duplicates (will be deduped)
 
];

// de-dupe by id+name
const uniqueTools = (() => {
  const seen = new Set();
  return tools.filter((t) => {
    const key = `${t.id}::${t.name}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
})();

export default function ToolsPage() {
  const [query, setQuery] = useState("");
      const [isModalOpen, setIsModalOpen] = useState(false);


  const filteredTools = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return uniqueTools;

    return uniqueTools.filter((tool) => {
      const inName = tool.name.toLowerCase().includes(q);
      const inDesc = tool.description.toLowerCase().includes(q);
      const inTags = (tool.tags || []).some((t) =>
        (t.label || "").toLowerCase().includes(q)
      );
      return inName || inDesc || inTags;
    });
  }, [query]);

  return (
    <div className="flex flex-col h-full w-full overflow-hidden">
      {/* Header section */}
      <ScaleDown>
      <div className="space-y-6 p-6">
        {/* Title and CTA */}
        {/* <FadeUp> */}
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <h1 className="text-3xl font-medium text-foreground">Tools</h1>
              <p className="mt-1 text-sm text-gray-600">
                Manage agent tools and capabilities
              </p>
            </div>
            <RippleButton>
              <Link href="#">
                <Button
                  onClick={() => setIsModalOpen(true)}
                className="bg-sidebar-primary hover:bg-[#E64A19] text-white gap-3 rounded-full !px-6 !py-6 !cursor-pointer duration-300">
                  <PlusIcon />
                  Add Tools
                </Button>
              </Link>
            </RippleButton>
          </div>
        {/* </FadeUp> */}

        {/* <FadeUp delay={0.02}> */}
          <SearchBar
            placeholder="Search Tools..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        {/* </FadeUp> */}
      </div>

      {/* <FadeUp delay={0.04}> */}
        <div className="flex-1 pt-0 px-6 h-fit w-full relative">
          <div className={cn("relative inset-0 pt-0 transition-all h-full")}>
            {filteredTools.length > 0 ? (
              <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-stretch">
                {filteredTools.map((tool, i) => (
                  <ToolsCard key={`${tool.id}-${i}`} tools={tool} />
                ))}
              </div>
            ) : (
              <div className="flex h-64 items-center justify-center text-gray-500 dark:text-foreground">
                No tools found matching "{query}"
              </div>
            )}
          </div>
        </div>
      {/* </FadeUp> */}
      </ScaleDown>
      <AddToolModal 
                  open={isModalOpen}
                        onOpenChange={setIsModalOpen}
            />
    </div>
  );
}
