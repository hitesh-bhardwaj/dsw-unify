"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Link from "next/link";
import { AiGenerator, Bin, EditIcon, SparklesIcon } from "@/components/Icons";
import ApiEndpointModal from "@/components/api-endpoint-modal";
import LeftArrowAnim from "@/components/animations/LeftArrowAnim";
// import { FadeUp } from "@/components/animations/Animations";
import { RippleButton } from "@/components/ui/ripple-button";
import AnimatedTabsSection from "@/components/common/TabsPane";
import EmptyCard from "@/components/common/EmptyCard";
import PromptCardGrid from "@/components/prompt-card-grid";
import { ScaleDown } from "@/components/animations/Animations";
import { ArrowRight } from "lucide-react";

export default function CreateAgentPage() {
  const [apiModalOpen, setApiModalOpen] = useState(false);
  const [agentName, setAgentName] = useState("");
  const [description, setDescription] = useState("");

  const items = [
    {
      id: "content",
      value: "content",
      label: "Content",
      name: "Content",
      render: () =>  <EmptyCard children={"Content configuration coming soon..."} />,
    },
    {
      id: "metadata",
      value: "metadata",
      label: "Metadata",
      name: "Metadata",
      render: () => (
        <EmptyCard children={"Metadata configuration coming soon..."} />
      ),
    },
    {
      id: "usage",
      value: "usage",
      label: "Usage",
      name: "Usage",
      render: () => (
        <EmptyCard children={"Usage configuration coming soon..."} />
      ),
    },
  ];

  return (
    <div className="flex flex-col h-full w-full overflow-hidden">
      {/* Header */}
      <ScaleDown>
      <div className=" bg-background p-6">
        {/* <FadeUp> */}
          <div className="flex items-center justify-between">
            <div className="flex items-start gap-3">
              <LeftArrowAnim link={"/agents"} />

              <div className="space-y-2">
                <h1 className="text-2xl font-medium">Edit Agent: Auto Claims Processing Agent</h1>
                <p className="text-sm text-gray-600  dark:text-foreground">
                  Modify your existing agent configuration
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <RippleButton>
                <Button
                  variant="outline"
                  className="gap-2 text-foreground border border-primary"
                >
                  <div className="!w-4">
                    <Bin />
                  </div>
                 Delete
                </Button>
              </RippleButton>
              <RippleButton>
                <Button
                  variant="outline"
                  className="gap-2 text-foreground border border-primary"
                >
                  <div className="!w-4">
                    <AiGenerator />
                  </div>
                 Copy
                </Button>
              </RippleButton>
              <Link href={`agent-studio/agents/edit`}>
                <RippleButton>
                  <Button className="bg-primary hover:bg-[#E64A19] text-white gap-2">
                    <div className="!w-4">
                      <EditIcon className={"text-white"} />
                    </div>
                    Save Agent
                  </Button>
                </RippleButton>
              </Link>
            </div>
          </div>
        {/* </FadeUp> */}
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="max-w-6xl mx-auto space-y-4">
         
            <AnimatedTabsSection
              items={items}
              // ctx={ctx}
              defaultValue="prompt"
            />
          {/* </FadeUp> */}
        </div>
      </div>
      </ScaleDown>
    </div>
  );
}
