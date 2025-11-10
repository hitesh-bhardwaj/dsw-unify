import { Copy } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Editor, Eye, SynthWave } from "./Icons";

export function TemplateCard({ template }) {
  const {
    name,
    description,
    tags = [],
    variable,
    uses,
    variant = "light",
  } = template;

  const isDark = variant === "dark";

  return (
    // <Link href={"/"} className="block group">
    <div className="group h-full">
      <Card
        className={cn(
          "overflow-hidden transition-all hover:shadow-xl duration-500 ease-out py-5 border border-border-color-1 group-hover:bg-active-card dark:group-hover:bg-sidebar-accent group-hover:text-white group-hover:border-border-color-1 bg-background "
          // isDark
          //   ? "bg-active-card text-white border-black"
          //   : "bg-background border border-border-color-1"
        )}
      >
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between mb-4">
            {/* Icon, Rating, and Version */}
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  "flex h-14 w-14 items-center justify-center  rounded-lg relative bg-foreground dark:bg-sidebar-accent group-hover:bg-background dark:group-hover:bg-background transition-all duration-500 ease-out"
                  // isDark ? "bg-background" : "bg-black"
                )}
              >
                <span
                  className={cn(
                    "w-full h-full flex justify-center items-center  p-4.5 text-white group-hover:text-black dark:group-hover:text-foreground transition-all duration-500 ease-out "
                    // isDark ? "text-black" : "text-white"
                  )}
                >
                  <SynthWave />
                </span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "h-7 w-7 flex items-center justify-center px-1 py-1  text-badge-blue hover:bg-stone-700 group-hover:text-white duration-500 ease-out "
                  // isDark
                  //   ? "text-white hover:bg-stone-700"
                  //   : "text-badge-blue hover:bg-sidebar-accent"
                )}
              >
                <Eye />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "h-7 w-7 flex items-center justify-center px-1 py-1 text-foreground hover:bg-stone-700 group-hover:text-white duration-500 ease-out "
                  // isDark
                  //   ? "text-white hover:bg-stone-700"
                  //   : "text-foreground hover:bg-sidebar-accent"
                )}
              >
                <Copy className="!h-full !w-full" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "h-7 w-7 flex items-center justify-center px-1 py-1 text-primary  hover:bg-stone-700 group-hover:text-white duration-500 ease-out"
                  // isDark
                  //   ? "text-white hover:bg-stone-700"
                  //   : "text-primary hover:bg-sidebar-accent"
                )}
              >
                <Editor />
              </Button>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-xl font-medium mb-2">{name}</h3>

          {/* Description */}
          <p
            className={cn(
              "text-sm mb-4 text-gray-600 dark:text-foreground dark:group-hover:text-foreground group-hover:text-background transition-all duration-500 ease-out"
              // isDark ? "text-gray-300" : "text-gray-600"
            )}
          >
            {description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1">
            {tags.map((tag, index) => (
              <Badge
                key={index}
                variant="secondary"
                className={cn(
                  "rounded-full px-3 py-1 text-xs font-light dark:group-hover:bg-foreground transition-all duration-500 ease-out",
                  tag.color === "yellow" &&
                    "bg-badge-yellow text-foreground group-hover:bg-background group-hover:text-black transition-all duration-500 ease-out",
                  tag.color === "blue" &&
                    "bg-badge-blue text-white group-hover:bg-background group-hover:text-black transition-all duration-500 ease-out",
                  tag.color === "green" &&
                    "bg-badge-mint text-foreground group-hover:bg-background group-hover:text-black transition-all duration-500 ease-out",
                  tag.color === "orange" &&
                    "bg-transparent border-primary text-primary group-hover:bg-background group-hover:text-black transition-all duration-500 ease-out"
                  // tag.color === "orange" &&isDark &&
                  //   "bg-transparent border border-white text-white group-hover:bg-background group-hover:text-black transition-all duration-500 ease-out",
                  // !tag.color && isDark && "bg-background text-foreground group-hover:bg-background group-hover:text-black transition-all duration-500 ease-out",
                  // !tag.color && !isDark && "bg-gray-100 text-gray-800 group-hover:bg-background group-hover:text-black transition-all duration-500 ease-out"
                )}
              >
                {tag.label}
              </Badge>
            ))}
          </div>
        </CardHeader>

        <CardContent
          className={`group-hover:bg-sidebar-accent group-hover:border group-hover:border-black/10 w-[92%] mx-auto py-5 rounded-xl px-4 text-foreground text-sm duration-500 ease-out bg-sidebar-accent border border-black/10 dark:group-hover:bg-background`}
        >
          {/* Usage stats */}
          <div className={`flex items-center justify-between mb-3 `}>
            <span className={"text-foreground"}>{uses} uses</span>
          </div>
          <span className="font-medium ">Variables: </span>
          <span className="text-black/60 dark:text-foreground/70">{variable}</span>
          {/* Preview */}
        </CardContent>
      </Card>
    </div>
    // </Link>
  );
}
