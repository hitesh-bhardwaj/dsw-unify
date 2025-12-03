"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { AiGenerator, Bin, EditIcon} from "@/components/Icons";
import LeftArrowAnim from "@/components/animations/LeftArrowAnim";
import { RippleButton } from "@/components/ui/ripple-button";
import AnimatedTabsSection from "@/components/common/TabsPane";
import EmptyCard from "@/components/common/EmptyCard";
import { ScaleDown } from "@/components/animations/Animations";
import PromptContentGrid from "@/components/prompt-content-grid";
import PromptMetadataGrid from "@/components/prompt-metadata-grid";
import PromptUsageGrid from "@/components/prompt-usage-grid";

export default function CreateAgentPage() {
  const items = [
    {
      id: "content",
      value: "content",
      label: "Content",
      name: "Content",
      render: () =>  <PromptContentGrid/>,
    },
    {
      id: "metadata",
      value: "metadata",
      label: "Metadata",
      name: "Metadata",
      render: () => (
        <PromptMetadataGrid/>
      ),
    },
    {
      id: "usage",
      value: "usage",
      label: "Usage",
      name: "Usage",
      render: () => (
        <PromptUsageGrid/>
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
              <LeftArrowAnim link={"/agent-studio/prompts"} />

              <div className="space-y-2">
                <h1 className="text-2xl font-medium">Customer Support Assistant</h1>
                <p className="text-sm text-gray-600  dark:text-foreground">
                  Helpful and empathetic customer service responses
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
                    Edit
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
