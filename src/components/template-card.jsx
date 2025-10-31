import { Copy } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Editor, Eye, SynthWave } from "./Icons";
import Link from "next/link";

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
    <Link href={"/"} className="block group">
    <Card
      className={cn(
        "overflow-hidden transition-all hover:shadow-xl duration-500 ease-out py-5  bg-white border border-black/30 group-hover:bg-active-card group-hover:text-white group-hover:border-black ",
        // isDark
        //   ? "bg-active-card text-white border-black"
        //   : "bg-white border border-black/30"
      )}
    >
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between mb-4">
          {/* Icon, Rating, and Version */}
          <div className="flex items-center gap-3">
            <div
              className={cn(
                "flex h-14 w-14 items-center justify-center  rounded-lg relative bg-black group-hover:bg-white",
                // isDark ? "bg-white" : "bg-black"
              )}
            >
              <span
                className={cn(
                  "w-full h-full flex justify-center items-center  p-4.5 text-white group-hover:text-black",
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
                "h-7 w-7 flex items-center justify-center px-1 py-1  text-badge-blue hover:bg-stone-700 group-hover:text-white ",
                // isDark
                //   ? "text-white hover:bg-stone-700"
                //   : "text-badge-blue hover:bg-sidebar-accent"
              )}
            >
              <Eye/>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "h-7 w-7 flex items-center justify-center px-1 py-1 text-foreground hover:bg-stone-700 group-hover:text-white ",
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
                "h-7 w-7 flex items-center justify-center px-1 py-1 text-primary  hover:bg-stone-700 group-hover:text-white",
                // isDark
                //   ? "text-white hover:bg-stone-700"
                //   : "text-primary hover:bg-sidebar-accent"
              )}
            >
              <Editor/>
            </Button>
            
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl font-medium mb-2">{name}</h3>

        {/* Description */}
        <p
          className={cn(
            "text-sm mb-4 text-gray-600 group-hover:text-gray-300",
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
                  "bg-badge-yellow text-foreground group-hover:bg-white group-hover:text-black transition-all duration-500 ease-out",
                tag.color === "blue" &&
                  "bg-badge-blue text-white group-hover:bg-white group-hover:text-black transition-all duration-500 ease-out",
                tag.color === "green" &&
                  "bg-badge-mint text-foreground group-hover:bg-white group-hover:text-black transition-all duration-500 ease-out",
                tag.color === "orange" &&
                  "bg-transparent border-primary text-primary group-hover:bg-white group-hover:text-black transition-all duration-500 ease-out",
                // tag.color === "orange" &&isDark &&
                //   "bg-transparent border border-white text-white group-hover:bg-white group-hover:text-black transition-all duration-500 ease-out",
                // !tag.color && isDark && "bg-white text-foreground group-hover:bg-white group-hover:text-black transition-all duration-500 ease-out",
                // !tag.color && !isDark && "bg-gray-100 text-gray-800 group-hover:bg-white group-hover:text-black transition-all duration-500 ease-out"
              )}
            >
              {tag.label}
            </Badge>
          ))}
        </div>
      </CardHeader>

      <CardContent className={`${isDark?"bg-white":"bg-sidebar-accent border border-black/10"} group-hover:bg-sidebar-accent group-hover:border group-hover:border-black/10 w-[92%] mx-auto py-5 rounded-xl px-4 text-foreground text-sm`}>
        {/* Usage stats */}
        <div className={`flex items-center justify-between mb-3 `}>
          <span className={ "text-foreground"}>
            {uses} uses
          </span>
          
        </div>
         <span className="font-medium ">Variables: </span><span className="text-black/60">{variable}</span>
        {/* Preview */}
       
      </CardContent>
    </Card>
    </Link>
  );
}
