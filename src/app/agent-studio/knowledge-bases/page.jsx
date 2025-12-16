"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { KnowledgeBaseIcon, PlusIcon } from "@/components/Icons";
import { KnowledgeCard } from "@/components/knowledge-card";
import SearchBar from "@/components/search-bar";
import { RippleButton } from "@/components/ui/ripple-button";
import { cn } from "@/lib/utils";
import { ScaleDown } from "@/components/animations/Animations";
import KnowledgeBaseModal from "@/components/agent-studio/CreateKnowledgeBaseModal";
import { motion, AnimatePresence } from "framer-motion";
import CountUp from "@/components/animations/CountUp";

import ListGridFilter from "@/components/common/ListGridFilter";

const stats = [
  { title: "Total Knowledge Bases", value: "04" },
  { title: "Synced", value: "02" },
  { title: "Total Documents", value: "4,580" },
];


const knowledgeBases = [
  {
    id: "company-documentation",
    name: "Company Documentation",
    icon: <KnowledgeBaseIcon />,
    description: "Internal company policies and procedures",
    status: "active",
    size: "2.3 GB",
    documentsCount: "1250",
    variant: "light",
        lastSynced:'Last synced 2 hour ago'

  },
  {
    id: "product-knowledge-base",
    name: "Product Knowledge Base",
    icon: <KnowledgeBaseIcon />,
    description: "Product specifications and user guides",
    status: "draft",
    size: "890 MB",
    documentsCount: "450",
    variant: "light",
    lastSynced:'Last synced 2 hour ago'
  },
];

export default function KnowledgePage() {
  const [query, setQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [view, setView] = useState("grid");

  const filteredKb = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return knowledgeBases;
    return knowledgeBases.filter((kb) =>
      kb.name.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <>
      <div className="flex flex-col h-full overflow-hidden w-full">
        <ScaleDown>
          <div className="space-y-6 p-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <h1 className="text-3xl font-medium text-foreground">
                  Knowledge Bases
                </h1>
                <p className="mt-1 text-sm text-gray-600 dark:text-foreground">
                  Manage your knowledge sources
                </p>
              </div>

              <RippleButton>
                <Link href="#">
                  <Button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-sidebar-primary hover:bg-[#E64A19] text-white gap-3 rounded-full !px-6 !py-6 duration-300"
                  >
                    <PlusIcon />
                    Add Knowledge Base
                  </Button>
                </Link>
              </RippleButton>
            </div>

            <div className="w-full flex items-center justify-between gap-4">
                                      {stats.map((item, index) => (
                                        <div
                                          key={index}
                                          className="flex flex-col gap-6 border border-border-color-0 rounded-3xl py-6 px-4 w-full dark:bg-card"
                                        >
                                          <span className="text-sm text-foreground/80">{item.title}</span>
                                          <span className="text-4xl font-medium mt-1">
                                            <CountUp value={item.value} startOnView />
                                          </span>
                                         
                                        </div>
                                      ))}
                                    </div>

            {/* Search */}
            <SearchBar
              placeholder="Search Knowledge Bases..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          {/* Grid/List Toggle */}
          <ListGridFilter view={view} setView={setView} />

          {/* Cards Section */}
          <div className="flex-1 pt-0 px-6 mb-10 w-full relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={view} // important for triggering animation
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className={cn(
                  view === "grid"
                    ? "grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                    : "flex flex-col gap-5"
                )}
              >
                {filteredKb.map((kb, i) => (
                  <KnowledgeCard key={kb.id} agent={kb} index={i} view={view} />
                ))}

                {filteredKb.length === 0 && (
                  <div className="flex h-64 items-center justify-center text-gray-500 dark:text-foreground">
                    No Knowledge base found matching "{query}"
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </ScaleDown>
      </div>

      {/* Modal */}
      <KnowledgeBaseModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </>
  );
}
