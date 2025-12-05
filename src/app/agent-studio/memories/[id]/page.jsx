"use client";

import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { AiGenerator, Bin, EditIcon } from "@/components/Icons";
import LeftArrowAnim from "@/components/animations/LeftArrowAnim";
import { RippleButton } from "@/components/ui/ripple-button";
import { ScaleDown } from "@/components/animations/Animations";
import AnimatedTabsSection from "@/components/common/TabsPane";
import EmptyCard from "@/components/common/EmptyCard";
import Overviews from "@/components/agent-studio/memories/Overviews";

const toolsData = {
  id: "user-preference",
  name: "User Preference",
  description: "Individual user preferences and settings",
  variant: "light",
};



const items = [
  {
    id: "overview",
    value: "overview",
    label: "Overview",
    name: "Overview",
    render: () => <Overviews />,
  },
  {
    id: "entries",
    value: "entries",
    label: "Entries",
    name: "Entries",
    render: () => (
      <EmptyCard children={"Coming soon..."} />
    ),
  },
  {
    id: "settings",
    value: "settings",
    label: "Settings",
    name: "settings",
    render: () => <EmptyCard children={"Coming soon..."} />,
  },
];

export default function Page() {
  const { id } = useParams();

  function slugToTitle(slug) {
  if (!slug) return "";
  
  return slug
    .split("-")                
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))  
    .join(" ");                
}

    const title = slugToTitle(id);

  return (
    <div className="flex flex-col h-full p-6">
      <ScaleDown>
        <div className="bg-background pb-6">
          <div className="flex items-center justify-between">
            <div className="flex gap-3">
              <LeftArrowAnim link={"/agent-studio/memories"} />
              <div className="space-y-1">
                <h1 className="text-xl font-medium">{title}</h1>
                <p className="text-sm text-foreground/80 pl-0.5 dark:text-foreground">
                  {toolsData.description}
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

              {/* <RippleButton>
                <Button
                  variant="outline"
                  className="gap-2 text-foreground border border-primary"
                >
                  <div className="!w-4">
                    <AiGenerator />
                  </div>
                  Test
                </Button>
              </RippleButton> */}

              <Link href="#">
                <RippleButton>
                  <Button className="bg-primary hover:bg-[#E64A19] text-white gap-4">
                    <div className="!w-4">
                      <EditIcon className="text-white" />
                    </div>
                    Edit
                  </Button>
                </RippleButton>
              </Link>
            </div>
          </div>
        </div>
        <AnimatedTabsSection
          items={items}
          // ctx={ctx}
          defaultValue="overview"
        />

       
      </ScaleDown>
    </div>
  );
}
