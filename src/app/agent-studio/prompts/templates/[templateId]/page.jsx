"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import LeftArrowAnim from "@/components/animations/LeftArrowAnim";
import { RippleButton } from "@/components/ui/ripple-button";
import { PlusIcon } from "@/components/Icons";
import { PromptsIcon, SparklesIcon } from "@/components/Icons";

export default function CreatePromptFromTemplate() {
  const [enhancePrompt, setEnhancePrompt] = useState("");
  const [tags, setTags] = useState("");
  const [tagsList, setTagsList] = useState([]);

  const handleAddTag = () => {
    if (tags.trim()) {
      setTagsList([...tagsList, tags.trim()]);
      setTags("");
    }
  };

  const handleRemoveTag = (indexToRemove) => {
    setTagsList(tagsList.filter((_, index) => index !== indexToRemove));
  };
  return (
    <div className="w-full h-full flex flex-col gap-6 p-6 bg-background">
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 pb-4">
          <LeftArrowAnim link={`/agent-studio/prompts/`} />

          <p className="text-sm">Back to Prompts</p>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline">Cancel</Button>
          <RippleButton>
            <Button
              className="bg-sidebar-primary hover:bg-[#E64A19] text-white gap-3 rounded-full !px-6 !py-6"
              // onClick={() => setCreatePrompt(true)}
            >
              <PromptsIcon /> Save as Prompt
            </Button>
          </RippleButton>
        </div>
      </div>

      {/* Template Info Banner */}
      <div className="flex items-start gap-3 border border-orange-200 bg-orange-50 rounded-xl p-4">
        <div className="text-orange-500 text-lg">ⓘ</div>
        <div className="space-y-1">
          <p className="text-sm font-medium text-foreground">
            Using Template: Content Writer Assistant
          </p>
          <p className="text-xs text-foreground/70">
            Customize the content below by replacing placeholders (e.g.,
            <span className="font-mono"> {"{{VARIABLE}}"} </span>) with your
            specific values. When you save, it will create a new prompt.
          </p>
        </div>
      </div>

      {/* Main Form */}
      <div className="w-full border border-border-color-0 rounded-2xl p-6 space-y-8 bg-background">
        {/* Name */}
        <div className="space-y-2">
          <label className="text-sm text-foreground/70">Name</label>
          <Input
            defaultValue="Content Writer Assistant"
            className="border-border-color-0"
          />
        </div>

        <div className="" />

        {/* Description */}
        <div className="space-y-2">
          <label className="text-sm text-foreground/70">Description</label>
          <Textarea
            defaultValue="Template for content creation and writing assistance"
            className="border-border-color-0 h-24"
          />
        </div>

        <div className="" />

        {/* Prompt Content */}
        <div className="space-y-2">
          <label className="text-sm text-foreground/70">Prompt Content</label>
          <Textarea
            className="border-border-color-0 font-mono text-sm min-h-[320px]"
            defaultValue={`You are a professional content writer specializing in {{CONTENT_TYPE}}.

Target Audience: {{TARGET_AUDIENCE}}
Tone: {{TONE}}
Writing Style: {{WRITING_STYLE}}

Your responsibilities:
- Create engaging and high-quality content
- Maintain consistency in voice and style
- Optimize for readability and SEO
- Follow brand guidelines

Content Guidelines:
- Use clear and concise language
- Structure content with proper headings
- Include relevant examples and data
- Proofread for grammar and clarity

Brand Voice: {{BRAND_VOICE}}

Additional Instructions:
{{ADDITIONAL_INSTRUCTIONS}}
`}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground dark:text-foreground">
            Generate or Enhance Prompt
          </label>
          <div className="flex gap-2 mt-2">
            <Input
              value={enhancePrompt}
              onChange={(e) => setEnhancePrompt(e.target.value)}
              placeholder="Describe how you want to modify the prompt..."
              className="h-12 flex-1 !text-xs p-4 border-border-color-0 shadow-none text-foreground placeholder:text-foreground/80"
            />
            <RippleButton className={"rounded-lg"}>
              <Button className="bg-primary hover:bg-[#E64A19] text-white gap-2  cursor-pointer w-30 rounded-lg">
                <SparklesIcon />
                Generate
              </Button>
            </RippleButton>
          </div>

          <p className="text-xs text-foreground/70">
            Use natural language to create a new prompt or enhance the existing
            one
          </p>
        </div>

        <div className="space-y-2">
          <label className="text-sm text-foreground">Tags</label>

          <div className="flex gap-2 items-end">
            <Input
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAddTag();
                }
              }}
              placeholder="Add a tag"
              className="placeholder:text-foreground/40"
            />

            <RippleButton className={"rounded-lg"}>
              <Button
                onClick={handleAddTag}
                className="bg-primary hover:bg-[#E64A19] text-white gap-2 flex justify-center  cursor-pointer w-30 rounded-lg"
              >
                <PlusIcon />
                Add
              </Button>
            </RippleButton>
          </div>

          {tagsList.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {tagsList.map((tag, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 px-3 py-0.5 border border-border-color-0 rounded-full text-xs"
                >
                  <span>{tag}</span>
                  <button
                    onClick={() => handleRemoveTag(index)}
                    className="text-foreground/60 hover:text-foreground"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
