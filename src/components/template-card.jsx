import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Editor, Eye, SynthWave } from "./Icons";
import CopyButton from "./animate-ui/components/buttons/CopyButton";
import Link from "next/link";

/**
 * Component to display a card for a template.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.template - The template data.
 * @param {string} props.template.name - The name of the template.
 * @param {string} props.template.description - The description of the template.
 * @param {Array<{label: string}>} [props.template.tags=[]] - The tags associated with the template.
 * @param {string} props.template.variable - The variables used in the template.
 * @param {string|number} props.template.uses - The number of uses.
 * @param {React.ReactNode} props.template.icon - The icon for the template.
 * @param {"light"|"dark"} [props.template.variant="light"] - The variant of the card.
 * @returns {React.JSX.Element} The rendered TemplateCard component.
 */
export function TemplateCard({ template, index, view }) {
  const {
    name,
    description,
    slug,
    tags = [],
    variable,
    uses,
    icon,
    variant = "light",
  } = template;

  const isDark = variant === "dark";

   const isGrid = view === "grid";
  const isList = view === "list";

  const stopLinkNavigation = (e) => {
  e.preventDefault();
  e.stopPropagation();
};


  return (
    <Link href={`/agent-studio/prompts/templates/${slug}/`} className="block ">
    <div className="group h-full">
      <Card
        className={cn(
          "feature-card-hover-container overflow-hidden transition-all hover:drop-shadow-xl duration-300 py-5 border border-border-color-0 hover:border-transparent bg-background"
        )}
      >
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between mb-4">
            {/* Icon, Rating, and Version */}
            <div className="flex items-center gap-3">
               <div
                className={cn(
                  "flex h-14 w-14 items-center justify-center rounded-lg relative bg-sidebar-accent text-foreground group-hover:!bg-white group-hover:!text-black  transition-all duration-300"
                )}
                 style={{
                color: `var(--icon-color-${(index % 4) + 1})`,
                backgroundColor: `rgb(from var(--icon-color-${(index % 4) + 1}) r g b / 0.1)`
              }}
              >
                <span
                  className={cn(
                    "w-full h-full flex justify-center items-center p-4"
                  )}
                >
                  {icon}
                </span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                onClick={stopLinkNavigation}
                size="icon"
                className={cn(
                  "h-7 w-7 opacity-0 group-hover:opacity-100 flex items-center justify-center px-1 py-1 text-white hover:bg-white/30 group-hover:text-white transition-colors duration-300"
                )}
              >
                <Eye />
              </Button>
              <Button
                variant="ghost"
                onClick={stopLinkNavigation}
                size="icon"
                className={cn(
                  "h-7 w-7 opacity-0 group-hover:opacity-100 flex items-center justify-center px-1 py-1 text-white hover:bg-white/30 group-hover:text-white transition-colors duration-300"
                )}
              >
                <CopyButton className='!duration-0' />
              </Button>
              <Button
                variant="ghost"
                onClick={stopLinkNavigation}
                size="icon"
                className={cn(
                  "h-7 w-7 opacity-0 group-hover:opacity-100 flex items-center justify-center px-1 py-1 text-white hover:bg-white/30 group-hover:text-white transition-colors duration-300"
                )}
              >
                <Editor />
              </Button>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-xl font-medium mb-2 text-foreground group-hover:text-white transition-colors duration-300">{name}</h3>

          {/* Description */}
          <p
            className={cn(
              "text-sm mb-4 text-gray-600 dark:text-foreground group-hover:text-white/90 transition-colors duration-300"
            )}
          >
            {description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1 mt-7">
            {tags.map((tag, index) => (
              <Badge
                key={index}
                variant="secondary"
                className={cn(
                  "rounded-full border border-color-2 px-3 py-1 dark:bg-background text-xs font-light transition-all duration-300 group-hover:text-white group-hover:border-white/60 bg-white/10 dark:group-hover:bg-white/10", tag === "+1 more" ? "border-primary" : "border-color-2"
                )}
              >
                {tag}
              </Badge>
            ))}
          </div>
        </CardHeader>

        <CardContent
          className={` mx-auto border border-border-color-2 group-hover:border-white/60 py-5 rounded-xl px-4 text-foreground text-sm duration-300 ${isDark ? "bg-background" : ""} ${view==='list'? 'w-[97%]': 'w-[92%]'}`}
        >
          {/* Usage stats */}
          <div className={`flex items-center justify-between mb-3`}>
            <span className={"text-foreground group-hover:text-white transition-colors duration-300"}>{uses} uses</span>
          </div>
          <div className="bg-sidebar-accent group-hover:bg-transparent border border-transparent dark:bg-background dark:group-hover:bg-white/10 p-3 rounded-md   group-hover:border-white/60 transition-all ">
          <span className="font-medium text-foreground group-hover:text-white transition-colors duration-300">Variables: </span>
          <span className="text-black/60 dark:text-foreground/80 group-hover:text-white/80 transition-colors duration-300">{variable}</span>
          </div>
          {/* Preview */}
        </CardContent>
      </Card>
    </div>
     </Link>
  );
}
