import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { SynthWave } from "./Icons";
import { Separator } from "./ui/separator";
import { Bounce } from "./animations/Animations";

export function KnowledgeCard({ agent }) {
  const {
    id,
    name,
    description,
    status,
    size,
    documentsCount,
    variant = "light",
  } = agent;

  const isDark = variant === "dark";

  return (
    <Bounce>
      <Link href={`/#`} className="block group h-full">
        <Card
          className={cn(
            "overflow-hidden  hover:shadow-xl cursor-pointer transition-all duration-500 ease-out bg-white border border-black/30 group-hover:bg-active-card group-hover:text-white group-hover:border-black !py-5 h-full"
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
                  "flex h-14 w-14 items-center justify-center rounded-lg relative bg-black group-hover:bg-white transition-all duration-500 ease-out "
                  // isDark ? "bg-white" : "bg-black"
                )}
              >
                <span
                  className={cn(
                    "w-full h-full flex justify-center items-center  p-4.5 text-white group-hover:text-black transition-all duration-500 ease-out "
                    // isDark ? "text-black" : "text-white"
                  )}
                >
                  <SynthWave />
                </span>
                <span
                  className={cn(
                    "w-3 h-3 rounded-full bg-badge-green absolute -top-0.5 -right-0.5 animate-pulse",
                    status === "active" ? "" : "hidden"
                  )}
                ></span>
              </div>

              {/* Status badge */}
              <Badge
                className={cn(
                  "rounded-full px-3 py-1 text-xs font-medium ",
                  status === "active"
                    ? "bg-badge-green text-white"
                    : "bg-badge-sea-green text-white px-4 opacity-[0.8]"
                )}
              >
                {status === "active" ? "Synced" : "Syncing"}
              </Badge>
            </div>

            {/* Name */}
            <h3 className="mt-7 text-xl font-medium text-black group-hover:text-white transition-all duration-500 ease-out ">
              {name}
            </h3>

            {/* Description */}
            <p
              className={cn(
                "text-sm text-gray-600 group-hover:text-white transition-all duration-500 ease-out "
              )}
            >
              {description}
            </p>
          </CardHeader>

          <CardContent>
            {/* Footer stats */}
            <div
              className={cn(
                "flex items-center justify-between rounded-lg  text-sm py-4 px-6 mt-10",
                isDark ? "bg-white" : "bg-gray-100 border"
              )}
            >
              <div className="flex flex-col items-start  gap-1 font-medium">
                <span className=" text-foreground text-lg font-medium">
                  {size}
                </span>
                <span className=" text-gray-600">Size</span>
              </div>
              <Separator className={"rotate-90 !w-12"} />
              <div className="flex flex-col items-start  gap-1">
                <span className={cn("font-medium text-foreground text-lg")}>
                  {documentsCount}
                </span>
                <span className={cn(" text-gray-600")}>Documents</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    </Bounce>
  );
}
