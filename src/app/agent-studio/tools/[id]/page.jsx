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
import Overviews from "@/components/agent-studio/tools/Overviews";
import ToolsConfigure from "@/components/agent-studio/tools/ToolsConfig";
import ToolsUsage from "@/components/agent-studio/tools/ToolsUsage";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { ConfirmDialog } from "@/components/common/Confirm-Dialog";
import * as toolsApi from "@/lib/api/tools";

const FALLBACK_TOOL = {
  id: "web-search",
  name: "Web Search",
  description: "Search the web for current information",
  status: "active",
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
    id: "configuration",
    value: "configuration",
    label: "Configuration",
    name: "Configuration",
    render: () => (
      <ToolsConfigure />
    ),
  },
  {
    id: "usage",
    value: "usage",
    label: "Usage",
    name: "Usage",
    render: () => <ToolsUsage/>,
  },
];

export default function Page() {
  const { id } = useParams();

  const [toolsData, setToolsData] = useState(FALLBACK_TOOL);
  const [error, setError] = useState(null);

  // Fetch tool data from API
  useEffect(() => {
    async function fetchToolData() {
      try {
        const toolData = await toolsApi.getToolById(id);
        setToolsData(toolData);
      } catch (err) {
        setError(err.message || "Failed to load tool");
        console.error("Error fetching tool:", err);
      }
    }
    if (id) {
      fetchToolData();
    }
  }, [id]);

  function slugToTitle(slug) {
  if (!slug) return "";

  return slug
    .split("-")
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

  const router = useRouter();
const [isDeleteOpen, setIsDeleteOpen] = useState(false);

const handleTrashClick = (e) => {
  e.preventDefault();
  e.stopPropagation();
  setIsDeleteOpen(true);
};

const handleConfirmDelete = () => {
  router.push(`/agent-studio/tools?deleteId=${id}`);
  setIsDeleteOpen(false);
};


    const title = slugToTitle(id);

  return (
    <div className="flex flex-col h-full p-6">
      <ScaleDown>
        <div className="bg-background pb-6">
          <div className="flex items-center justify-between">
            <div className="flex gap-3">
              <LeftArrowAnim link={"/agent-studio/tools"} />
              <div>
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
                  onClick={handleTrashClick}
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
                  Test
                </Button>
              </RippleButton>

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
      <ConfirmDialog
  open={isDeleteOpen}
  onOpenChange={setIsDeleteOpen}
  title="Delete Tool?"
  description="This action cannot be undone. The tool will be permanently deleted."
  confirmText="Delete"
  variant="destructive"
  onConfirm={handleConfirmDelete}
/>

    </div>
  );
}
