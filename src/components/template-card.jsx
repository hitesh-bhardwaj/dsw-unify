import { Copy } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Editor, Eye, SynthWave } from "./Icons";

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
export function TemplateCard({ template }) {
  const {
    name,
    description,
    tags = [],
    variable,
    uses,
    icon,
    variant = "light",
  } = template;

  const isDark = variant === "dark";

  return (
    // <Link href={"/"} className="block group">
    <div className="group h-full">
      <Card
        className={cn(
          "feature-card-hover-container overflow-hidden transition-all hover:shadow-md duration-300 py-5 border border-border-color-1 hover:border-white/20 bg-background"
        )}
      >
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between mb-4">
            {/* Icon, Rating, and Version */}
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  "flex h-14 w-14 items-center justify-center rounded-lg relative bg-sidebar-accent border border-color-2 text-foreground group-hover:bg-white group-hover:text-black group-hover:border-white transition-all duration-300"
                )}
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
                size="icon"
                className={cn(
                  "h-7 w-7 flex items-center justify-center px-1 py-1 text-foreground hover:bg-white/30 group-hover:text-white transition-colors duration-300"
                )}
              >
                <Eye />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "h-7 w-7 flex items-center justify-center px-1 py-1 text-foreground hover:bg-white/30 group-hover:text-white transition-colors duration-300"
                )}
              >
                <Copy className="!h-full !w-full" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "h-7 w-7 flex items-center justify-center px-1 py-1 text-primary hover:bg-white/30 group-hover:text-white transition-colors duration-300"
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
                  "rounded-full border border-color-2 px-3 py-1 dark:bg-background text-xs font-light transition-all duration-300 group-hover:text-white group-hover:border-white/30 bg-white/10 dark:group-hover:bg-white/10"
                )}
              >
                {tag.label}
              </Badge>
            ))}
          </div>
        </CardHeader>

        <CardContent
          className={`w-[92%] mx-auto py-5 rounded-xl px-4 text-foreground text-sm duration-300 ${isDark ? "bg-background" : ""}`}
        >
          {/* Usage stats */}
          <div className={`flex items-center justify-between mb-3`}>
            <span className={"text-foreground group-hover:text-white transition-colors duration-300"}>{uses} uses</span>
          </div>
          <div className="bg-white/10 dark:bg-background dark:group-hover:bg-white/10 p-3 rounded-md border border-border-color-2 group-hover:border-white/30 transition-all duration-300">
          <span className="font-medium text-foreground group-hover:text-white transition-colors duration-300">Variables: </span>
          <span className="text-black/60 dark:text-foreground/80 group-hover:text-white/80 transition-colors duration-300">{variable}</span>
          </div>
          {/* Preview */}
        </CardContent>
      </Card>
    </div>
    // </Link>
  );
}
