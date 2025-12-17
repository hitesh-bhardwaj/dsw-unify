"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { AiGenerator, Bin, EditIcon  } from "@/components/Icons";
import LeftArrowAnim from "@/components/animations/LeftArrowAnim";
import { RippleButton } from "@/components/ui/ripple-button";
import AnimatedTabsSection from "@/components/common/TabsPane";
import EmptyCard from "@/components/common/EmptyCard";
import { ScaleDown } from "@/components/animations/Animations";
import PromptContentGrid from "@/components/prompt-content-grid";
import PromptMetadataGrid from "@/components/prompt-metadata-grid";
import PromptUsageGrid from "@/components/prompt-usage-grid";
import { useRouter } from "next/navigation";
import { ConfirmDialog } from "@/components/common/Confirm-Dialog";
import { useState, useEffect, use } from "react";
import * as promptsApi from "@/lib/api/prompts";

export default function PromptDetailPage({ params }) {
  const { id } = use(params);
  const router = useRouter();

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [promptData, setPromptData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editablePrompt, setEditablePrompt] = useState(null);

  useEffect(() => {
    if (promptData) {
      setEditablePrompt({
        name: title ?? "Customer Support Assistant",
        description:
          promptData.description ??
          "You are a helpful and empathetic customer service representative...",
        category: promptData.category ?? "Customer Service",
        tags: promptData.tags ?? [
          "Customer-service",
          "empathy",
          "problem-solving",
        ],
        content:
          promptData.content ??
          "You are a helpful and empathetic customer service representative...",
      });
    }
  }, [promptData]);

  // Fetch prompt data on mount
  useEffect(() => {
    async function fetchPromptData() {
      try {
        setIsLoading(true);
        const data = await promptsApi.getPromptById(id);
        setPromptData(data);
      } catch (err) {
        setError(err.message || "Failed to load prompt");
        console.error("Error fetching prompt:", err);
      } finally {
        setIsLoading(false);
      }
    }

    if (id) {
      fetchPromptData();
    }
  }, [id]);

  const handleConfirmDelete = () => {
    setIsDeleteOpen(false);
    router.push(`/agent-studio/prompts?deleteId=${id}`);
  };

  function slugToTitle(slug) {
    if (!slug) return "";

    return slug
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
  }

  const title = promptData?.name || slugToTitle(id) || "Loading...";
  const description = promptData?.description || "Loading description...";
  const items = [
    {
      id: "content",
      value: "content",
      label: "Content",
      name: "Content",
      render: () => (
        <PromptContentGrid
          value={editablePrompt?.content}
          isEditing={isEditing}
          onChange={(val) => setEditablePrompt((p) => ({ ...p, content: val }))}
        />
      ),
    },
    {
      id: "metadata",
      value: "metadata",
      label: "Metadata",
      name: "Metadata",
      render: () => (
        <PromptMetadataGrid
          data={editablePrompt}
          isEditing={isEditing}
          onChange={setEditablePrompt}
        />
      ),
    },
    {
      id: "usage",
      value: "usage",
      label: "Usage",
      name: "Usage",
      render: () => <PromptUsageGrid />,
    },
  ];

  return (
    <div className="flex flex-col h-full w-full overflow-hidden">
      <ConfirmDialog
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        title="Delete prompt?"
        description={
          title
            ? `This action cannot be undone. This will permanently delete "${title}".`
            : "This action cannot be undone. This will permanently delete this prompt."
        }
        confirmLabel="Delete"
        destructive
        onConfirm={handleConfirmDelete}
      />

      {/* Header */}
      <ScaleDown>
        <div className=" bg-background p-6">
          {/* <FadeUp> */}
          <div className="flex items-center justify-between">
            <div className="flex items-start gap-3">
              <LeftArrowAnim link={"/agent-studio/prompts"} />

              <div className="space-y-2">
                <h1 className="text-2xl font-medium">
                  {isLoading ? "Loading..." : title}
                </h1>
                <p className="text-sm text-gray-600  dark:text-foreground">
                  {isLoading
                    ? "Helpful and empathetic customer service responses"
                    : description}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <RippleButton>
                <Button
                  onClick={() => setIsDeleteOpen(true)}
                  variant="outline"
                  className="gap-2 text-foreground border border-primary"
                >
                  <div className="!w-4 text-red-500">
                    <Bin />
                  </div>
                  Delete
                </Button>
              </RippleButton>

              <Link href={`#`}>
                <RippleButton>
                  <Button
                    onClick={() => setIsEditing((prev) => !prev)}
                    className="bg-primary hover:bg-[#E64A19] text-white gap-2"
                  >
                    <div className="!w-4">
                      <EditIcon className={"text-white"} />
                    </div>

                    {isEditing ? "Save" : "Edit"}
                  </Button>
                </RippleButton>
              </Link>
            </div>
          </div>
          {/* </FadeUp> */}
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          <div className=" mx-auto space-y-4">
            <AnimatedTabsSection
              items={items}
              // ctx={ctx}
              defaultValue="content"
            />
            {/* </FadeUp> */}
          </div>
        </div>
      </ScaleDown>
    </div>
  );
}
