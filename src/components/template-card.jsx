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
          "overflow-hidden transition-all hover:shadow-xl duration-500 ease-out py-5 border border-border-color-1 group-hover:bg-sidebar-accent dark:group-hover:bg-sidebar-accent group-hover:text-white group-hover:border-border-color-1 bg-background "
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
                  "flex h-14 w-14 items-center justify-center rounded-lg relative bg-sidebar-accent border border-color-2 dark:bg-background group-hover:bg-black transition-all dark:group-hover:bg-white duration-500 ease-out "
                )}
              >
                <span
                  className={cn(
                    "w-full h-full flex justify-center items-center dark:group-hover:text-black p-4.5 text-black dark:text-white group-hover:text-white transition-all duration-500 ease-out "
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
                  "h-7 w-7 flex items-center justify-center px-1 py-1 hover:bg-white  dark:text-white  group-hover:text-black dark:group-hover:text-white duration-500 ease-out dark:hover:bg-accent "
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
                  "h-7 w-7 flex items-center justify-center px-1 py-1  text-foreground hover:bg-white group-hover:text-black dark:hover:bg-accent dark:group-hover:text-white dark:hover:text-white duration-500 ease-out "
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
                  "h-7 w-7 flex items-center justify-center px-1 py-1 text-primary  hover:bg-white group-hover:text-primary dark:hover:bg-accent duration-500 ease-out"
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
          <h3 className="text-xl font-medium mb-2 text-black dark:text-white ">{name}</h3>

          {/* Description */}
          <p
            className={cn(
              "text-sm mb-4 text-gray-600 dark:text-foreground dark:group-hover:text-foreground  transition-all duration-500 ease-out"
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
                  "rounded-full border border-color-2 px-3 py-1 bg-white dark:bg-background text-xs font-light transition-all duration-500 ease-out dark:group-hover:bg-background"
                )}
              >
                {tag.label}
              </Badge>
            ))}
          </div>
        </CardHeader>

        <CardContent
          className={`group-hover:bg-white  dark:bg-background border border-border-color-2 bg-white group-hover:border group-hover:border-color-2 w-[92%] mx-auto py-5 rounded-xl px-4 text-foreground text-sm duration-500 ease-out   dark:group-hover:bg-background dark:border-color-2`}
        >
          {/* Usage stats */}
          <div className={`flex items-center justify-between mb-3 `}>
            <span className={"text-foreground"}>{uses} uses</span>
          </div>
          <span className="font-medium ">Variables: </span>
          <span className="text-black/60 dark:text-foreground/80">{variable}</span>
          {/* Preview */}
        </CardContent>
      </Card>
    </div>
    // </Link>
  );
}
