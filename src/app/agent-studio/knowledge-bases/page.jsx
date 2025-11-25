"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PlusIcon } from "@/components/Icons";
import { KnowledgeCard } from "@/components/knowledge-card";
import SearchBar from "@/components/search-bar";
// import { FadeUp } from "@/components/animations/Animations";
import { RippleButton } from "@/components/ui/ripple-button";
import { cn } from "@/lib/utils";
import { ScaleDown } from "@/components/animations/Animations";
import KnowledgeBaseModal from "@/components/agent-studio/CreateKnowledgeBaseModal";

const knowledgeBases = [
  {
    id: "company-documentation",
    name: "Company Documentation",
    description: "Internal company policies and procedures",
    status: "active",
    size: "2.3 GB",
    documentsCount: "1250",
    variant: "light",
  },
  {
    id: "product-knowledge-base",
    name: "Product Knowledge Base",
    description: "Product specifications and user guides",
    status: "draft",
    size: "890 MB",
    documentsCount: "450",
    variant: "light",
  },
  
];

export default function KnowledgePage() {
  const [query, setQuery] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredKb = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return knowledgeBases;
    return knowledgeBases.filter((kb) => kb.name.toLowerCase().includes(q));
  }, [query]);

  return (
    <div className="flex flex-col h-full overflow-hidden w-full">
      {/* Header section */}
      <ScaleDown>
      <div className="space-y-6 p-6">
        {/* Title and CTA */}
        {/* <FadeUp> */}
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <h1 className="text-3xl font-medium text-foreground">Knowledge Bases</h1>
              <p className="mt-1 text-sm text-gray-600">Manage your knowledge sources</p>
            </div>

            <RippleButton>
              <Link href="#">
                <Button
                onClick={() => setIsModalOpen(true)}
                className="bg-sidebar-primary hover:bg-[#E64A19] text-white gap-3 rounded-full !px-6 !py-6 !cursor-pointer duration-300">
                  <PlusIcon />
                  Add Knowledge Base
                </Button>
              </Link>
            </RippleButton>
          </div>
        {/* </FadeUp> */}

        {/* <FadeUp delay={0.02}> */}
          <SearchBar
            placeholder="Search Knowledge Bases..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        {/* </FadeUp> */}
      </div>

      {/* <FadeUp delay={0.04}> */}
        <div className="flex-1 pt-0 px-6 h-fit w-full relative">
          <div className={cn("relative inset-0 pt-0 transition-all h-full")}>
            {filteredKb.length > 0 ? (
              <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-stretch">
                {filteredKb.map((kb, i) => (
                  <KnowledgeCard key={`${kb.id}-${i}`} agent={kb} />
                ))}
              </div>
            ) : (
              <div className="flex h-64 items-center justify-center text-gray-500 dark:text-foreground">
                No Knowledge base found matching "{query}"
              </div>
            )}
          </div>
        </div>
      {/* </FadeUp> */}
      </ScaleDown>
      <KnowledgeBaseModal 
            open={isModalOpen}
                  onOpenChange={setIsModalOpen}
      />
    </div>
  );
}
