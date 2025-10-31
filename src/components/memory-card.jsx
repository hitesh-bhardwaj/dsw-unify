import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { SynthWave } from "./Icons";

export function MemoryCard({ memories }) {
  const {
    name,
    description,
    status,
    tags = [],
    entries,
    variant = "light",
  } = memories;


  return (
    <Link href={`/#`} className="block group">
      <Card
        className={cn(
          "overflow-hidden  hover:shadow-xl cursor-pointer transition-all duration-500 ease-out bg-white border border-black/30 group-hover:bg-active-card group-hover:text-white group-hover:border-black !py-5",
          // isDark
          //   ? "bg-active-card text-white border-black"
          //   : "bg-white border border-black/20"
        )}
      >
        <CardHeader className="">
          <div className="flex items-start justify-between">
            {/* Icon */}
            <div
              className={cn(
                "flex h-14 w-14 items-center justify-center rounded-lg relative bg-black group-hover:bg-white transition-all duration-500 ease-out ",
                // isDark ? "bg-white" : "bg-black"
              )}
            >
              <span
                className={cn(
                  "w-full h-full flex justify-center items-center  p-4.5 text-white group-hover:text-black transition-all duration-500 ease-out ",
                  // isDark ? "text-black" : "text-white"
                )}
              >
                <SynthWave />
              </span>
              <span
                className={cn(
                  "w-3 h-3 rounded-full bg-badge-green absolute -top-0.5 -right-0.5 animate-pulse",
                  status === "active"
                    ? ""
                    : "hidden"
                )}
              ></span>
            </div>

            {/* Status badge */}
            <Badge
              className={cn(
                "rounded-full px-3 py-1 text-xs font-medium ",
                status === "active"
                  ? "bg-badge-green text-white"
                  : "bg-gray-200 text-foreground px-4"
              )}
            >
              {status === "active" ? "Active" : "Draft"}
            </Badge>
          </div>

          {/* Agent name */}
          <h3 className="mt-7 text-xl font-medium text-black group-hover:text-white transition-all duration-500 ease-out ">{name}</h3>

          {/* Description */}
          <p className={cn("text-sm text-gray-600 group-hover:text-white transition-all duration-500 ease-out ")}>
            {description}
          </p>
        </CardHeader>

        <CardContent>
          {/* Tags */}
          <div className="mb-8 flex flex-wrap gap-1">
            {tags.map((tag, index) => (
              <Badge
                key={index}
                variant="secondary"
                className={cn(
                  "rounded-full px-3.5 py-1 text-xs font-normal",
                  tag.color === "yellow" &&
                    "bg-badge-yellow text-foreground group-hover:bg-white group-hover:text-black transition-all duration-500 ease-out ",
                  tag.color === "blue" && "bg-badge-blue text-white group-hover:bg-white group-hover:text-black transition-all duration-500 ease-out ",
                  tag.color === "green" && "bg-badge-mint text-foreground group-hover:bg-white group-hover:text-black transition-all duration-500 ease-out ",
                  tag.color === "orange" && "bg-badge-yellow text-foreground group-hover:bg-white group-hover:text-black transition-all duration-500 ease-out ",
                  tag.color === "purple" && "bg-purple-500 text-white group-hover:bg-white group-hover:text-black transition-all duration-500 ease-out ",
                  // !tag.color && isDark && "bg-white text-foreground",
                  // !tag.color && !isDark && "bg-gray-100 text-gray-800"
                )}
              >
                {tag.label}
              </Badge>
            ))}
          </div>

          {/* Footer stats */}
          <div
            className={cn(
              "flex items-center justify-between rounded-lg p-3 text-sm py-4 bg-gray-100 border group-hover:bg-white"
            )}
          >
            <div className="flex flex-col items-start gap-1">
              
              <span className=" text-foreground font-medium text-lg">
                {entries}
              </span>
               <span className=" text-gray-600">
                Entries
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
