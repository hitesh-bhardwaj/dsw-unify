import { Star, Copy } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Bin, Editor, Eye, SynthWave } from "./Icons";

export function PromptCard({ prompt }) {
  const {
    name,
    description,
    icon,
    rating,
    version,
    tags = [],
    uses,
    lastUpdated,
    preview,
    variant = "light",
  } = prompt;

  const isDark = variant === "dark";

  return (
    // <Link href={"/"} className="block group">
    <div className="group w-full h-full">
      <Card
        className={cn(
          "overflow-hidden w-full h-full transition-all hover:shadow-lg duration-500 ease-out py-5 bg-background border border-black/30 group-hover:bg-active-card group-hover:text-white group-hover:border-black"
          // isDark
          //   ? "bg-active-card text-white border-black"
          //   : "bg-background border border-black/30"
        )}
      >
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between mb-4">
            {/* Icon, Rating, and Version */}
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  "flex h-14 w-14 items-center justify-center  rounded-lg relative bg-black group-hover:bg-background duration-500 ease-out"
                  // isDark ? "bg-background" : "bg-black"
                )}
              >
                <span
                  className={cn(
                    "w-full h-full flex justify-center items-center  p-4.5 text-white group-hover:text-black duration-500 ease-out"
                    // isDark ? "text-black" : "text-white"
                  )}
                >
                  <SynthWave />
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="text-xs">{rating}</span>
                <Badge
                  variant="secondary"
                  className={cn(
                    "px-1.5 py-1 ml-1.5 rounded-sm border border-foreground text-foreground bg-transparent group-hover:border-white group-hover:text-white duration-500 ease-out"
                    // isDark
                    //   ? "border border-white bg-transparent text-white "
                    //   : "border border-foreground text-foreground bg-transparent"
                  )}
                >
                  {version}
                </Badge>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "h-7 w-7 flex items-center justify-center px-1 py-1 text-badge-blue hover:bg-stone-700 group-hover:text-white duration-500 ease-out "
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
                  "h-7 w-7 flex items-center justify-center px-1 py-1 text-foreground hover:bg-stone-700 group-hover:text-white duration-500 ease-out"
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
                  "h-7 w-7 flex items-center justify-center px-1 py-1  text-primary hover:bg-stone-700 group-hover:text-white duration-500 ease-out"
                  // isDark
                  //   ? "text-white hover:bg-stone-700"
                  //   : "text-primary hover:bg-sidebar-accent"
                )}
              >
                {/* <Edit className="h-full w-full" /> */}
                <Editor />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "h-7 w-7 flex items-center justify-center px-1 py-1  text-red-600 hover:bg-stone-700 group-hover:text-white duration-500 ease-out"
                  // isDark
                  //   ? "text-white hover:bg-stone-700"
                  //   : "text-red-600 hover:bg-red-50"
                )}
              >
                <Bin />
              </Button>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-xl font-medium mb-2">{name}</h3>

          {/* Description */}
          <p
            className={cn(
              "text-sm mb-4 text-gray-600 group-hover:text-gray-300 transition-all duration-500 ease-out"
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
                  "rounded-full px-3 py-1 text-xs font-light",
                  tag.color === "yellow" &&
                    "bg-badge-yellow text-foreground group-hover:bg-background group-hover:text-black transition-all duration-500 ease-out ",
                  tag.color === "blue" &&
                    "bg-badge-blue text-white group-hover:bg-background group-hover:text-black transition-all duration-500 ease-out ",
                  tag.color === "green" &&
                    "bg-badge-mint text-foreground group-hover:bg-background group-hover:text-black transition-all duration-500 ease-out ",
                  tag.color === "orange" &&
                    "bg-transparent border-primary text-primary  group-hover:text-white transition-all duration-500 ease-out group-hover:border-white",
                  tag.color === "orange" &&
                    isDark &&
                    "bg-transparent border border-white text-white group-hover:bg-background group-hover:text-black transition-all duration-500 ease-out "
                  // !tag.color && isDark && "bg-background text-foreground group-hover:bg-background group-hover:text-black transition-all duration-500 ease-out ",
                  // !tag.color && !isDark && "bg-gray-100 text-gray-800 group-hover:bg-background group-hover:text-black transition-all duration-500 ease-out "
                )}
              >
                {tag.label}
              </Badge>
            ))}
          </div>
        </CardHeader>

        <CardContent
          className={`${
            isDark ? "bg-background" : "bg-sidebar-accent border border-black/10 "
          } w-[92%] mx-auto py-5 rounded-xl px-4 duration-500 ease-out`}
        >
          {/* Usage stats */}
          <div className={`flex items-center justify-between text-sm mb-3 `}>
            <span className={"text-foreground"}>{uses} uses</span>
            <span className={"text-foreground"}>Updates {lastUpdated}</span>
          </div>

          {/* Preview */}
          <div
            className={cn(
              "rounded-lg p-3 text-xs duration-500 ease-out",
              isDark
                ? "bg-sidebar-accent text-gray-600"
                : "bg-background text-gray-600"
            )}
          >
            {preview}
          </div>
        </CardContent>
      </Card>
    </div>
    // </Link>
  );
}
