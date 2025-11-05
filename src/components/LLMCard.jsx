import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { SynthWave } from "./Icons";
import { Bounce } from "./animations/Animations";

export function LLMCard({ llm }) {
  const { id, name, description, status, tags = [] } = llm;

  return (
    <Bounce>
    <Link href={`/llms/${id}`} className="block group h-full">
      <Card
        className={cn(
          "overflow-hidden  hover:shadow-xl cursor-pointer transition-all duration-500 ease-out bg-white border border-black/30 group-hover:bg-active-card group-hover:text-white group-hover:border-black h-full py-5"
        )}
      >
        <CardHeader className="">
          <div className="flex items-start justify-between">
            {/* Icon */}
            <div
              className={cn(
                "flex h-14 w-14 items-center justify-center rounded-lg relative bg-black group-hover:bg-white transition-all duration-500 ease-out "
              )}
            >
              <span
                className={cn(
                  "w-full h-full flex justify-center items-center  p-4.5 text-white group-hover:text-black transition-all duration-500 ease-out "
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
            {!llm.deploy?<Badge
              className={cn(
                "rounded-full px-3 py-1 text-xs font-medium ",
                status === "active"
                  ? "bg-badge-green text-white"
                  : "bg-gray-200 text-foreground px-4"
              )}
            >
              {status === "active" ? "Active" : "Draft"}
            </Badge>:<>
            <Badge
              className={cn(
                "rounded-full px-3 py-1 text-xs font-medium text-white bg-badge-sea-green ",
               
              )}
            >
             Deploying
            </Badge>
            </>}
          </div>

          {/* llm name */}
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
          {/* Tags */}
          <div className="mb-10 flex flex-wrap gap-1">
            {tags.map((tag, index) => (
              <Badge
                key={index}
                variant="secondary"
                className={cn(
                  "rounded-full px-3.5 py-1 text-xs font-normal",
                  tag.color === "yellow" &&
                    "bg-badge-yellow text-foreground group-hover:bg-white group-hover:text-black transition-all duration-500 ease-out ",
                  tag.color === "blue" &&
                    "bg-badge-blue text-white group-hover:bg-white group-hover:text-black transition-all duration-500 ease-out ",
                  tag.color === "green" &&
                    "bg-badge-mint text-foreground group-hover:bg-white group-hover:text-black transition-all duration-500 ease-out ",
                  tag.color === "orange" &&
                    "bg-badge-yellow text-foreground group-hover:bg-white group-hover:text-black transition-all duration-500 ease-out ",
                  tag.color === "purple" &&
                    "bg-purple-500 text-white group-hover:bg-white group-hover:text-black transition-all duration-500 ease-out "
                )}
              >
                {tag.label}
              </Badge>
            ))}
          </div>

          {/* Footer stats */}
           {!llm.deploy ? (
            llm.performance ? (
              <div
                className={cn(
                  "flex flex-col gap-4 rounded-lg p-3 text-sm py-6 bg-sidebar-accent group-hover:text-foreground text-foreground group-hover:bg-white border border-black/10"
                )}
              >
                <p>Performance</p>
                <div className="w-full h-full flex justify-between">
                  <div className="w-[35%] h-full flex flex-col">
                    <p className="font-medium">{llm.accuracy}</p>
                    <p className="text-black/60">Accuracy</p>
                  </div>
                  <div className="w-[1px] bg-black" />
                  <div className="w-[40%] h-full flex flex-col">
                    <p className="font-medium">{llm.latency}</p>
                    <p className="text-black/60">Latency</p>
                  </div>
                </div>
              </div>
            ) : (
              <div
                className={cn(
                  "flex flex-col gap-4 rounded-lg p-3 text-sm py-6 bg-sidebar-accent group-hover:text-foreground text-foreground group-hover:bg-white border border-black/10"
                )}
              >
                <p>Usage Stats</p>
                <div className="w-full h-full flex justify-between">
                  <div className="w-[35%] h-full flex flex-col">
                    <p className="font-medium">{llm.requests}</p>
                    <p className="text-black/60">Requests</p>
                  </div>
                  <div className="w-[1px] bg-black" />
                  <div className="w-[40%] h-full flex flex-col">
                    <p className="font-medium">{llm.avgres}</p>
                    <p className="text-black/60">Avg. Response</p>
                  </div>
                </div>
              </div>
            )
          ):<>
          <div className="flex flex-col gap-4 rounded-lg p-3 text-sm py-6 bg-sidebar-accent group-hover:text-foreground text-foreground group-hover:bg-white border border-black/10">
               <p>Deploying Status</p>
               <div className="w-full flex flex-col gap-4">
                <p className="text-primary">Progress:75%</p>
                 <div className="w-full h-[4px] rounded-full bg-black/15 overflow-hidden">
                 <div className="w-[75%] h-full bg-primary rounded-full"/>
                 </div>
               </div>
          </div>
          
          </>}
        </CardContent>
      </Card>
    </Link>
    </Bounce>
  );
}
