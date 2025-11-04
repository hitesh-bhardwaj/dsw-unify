"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PlusIcon } from "@/components/Icons";
import { KnowledgeCard } from "@/components/knowledge-card";
import SearchBar from "@/components/search-bar";
import { FadeUp } from "@/components/animations/fadeup";

const knowlwdgeBases = [
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

export default function AgentsPage() {
  const [query, setQuery] = useState("");

  const filteredAgents = knowlwdgeBases.filter((agent) =>
    agent.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full">
      {/* Header section */}
      <div className="space-y-6 p-6">
        {/* Title and CTA */}
        <FadeUp>
        <div className="flex items-center justify-between">
          
          <div className="space-y-2">
            <h1 className="text-3xl font-medium text-foreground">
              Knowledge Bases
            </h1>
            <p className="mt-1 text-sm text-gray-600">
              Manage your knowledge sources
            </p>
          </div>
          <Link href="/agents/create">
            <Button className="bg-sidebar-primary hover:bg-[#E64A19] text-white gap-3 rounded-full !px-6 !py-6 !cursor-pointer duration-300">
              <PlusIcon />
              Add Knowledge Base
            </Button>
          </Link>
        </div>
        </FadeUp>
        <FadeUp delay={0.1}>
        <SearchBar
          placeholder="Search Knowledge Bases..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        </FadeUp>
      </div>

      {/* Agents grid */}
      <FadeUp delay={0.2}>
      <div className="flex-1 overflow-auto p-6 pt-0">
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {filteredAgents.map((agent) => (
            <KnowledgeCard key={agent.id} agent={agent} />
          ))}
        </div>

        {filteredAgents.length === 0 && (
          <div className="flex h-64 items-center justify-center text-gray-500">
            No agents found matching "{query}"
          </div>
        )}
      </div>

      </FadeUp>
    </div>
  );
}
