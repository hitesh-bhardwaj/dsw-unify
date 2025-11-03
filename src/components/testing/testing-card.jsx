import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { AiGenerator, Calendar, FileTimeout, SynthWave } from "../Icons";
import { Button } from "../ui/button";
import { Eye } from "lucide-react";

export function TestingCard({ test }) {
  const {
    id,
    name,
    description,
    tags = [],
    tests,
    agent,
    lastrun,
    variant = "light",
  } = test;

  const isDark = variant === "dark";

  return (
    <Link href={`/#`} className="block group">
      <Card
        className={cn(
          "overflow-hidden  hover:shadow-xl cursor-pointer transition-all duration-500 ease-out bg-white border border-black/30 group-hover:bg-active-card group-hover:text-white group-hover:border-black !py-3 !pb-1 !pl-0",
          // isDark
          //   ? "bg-active-card text-white border-black"
          //   : "bg-white border border-black/20"
        )}
      >
        <CardHeader className="">
          
          <div className="flex items-center w-full justify-between">
            <div className="space-y-3">
            <div className="flex items-center gap-[3vw] mt-4">
    {/* Agent name */}
          <h3 className="text-xl font-medium text-black group-hover:text-white transition-all duration-500 ease-out ">{name}</h3>
      <div className=" flex flex-wrap gap-1">
            {tags.map((tag, index) => (
              <Badge
                key={index}
                variant="secondary"
                className={cn(
                  "rounded-full px-3.5 py-1 text-xs font-normal",
                  tag.color === "yellow" &&
                    "bg-badge-yellow text-foreground group-hover:bg-white group-hover:text-black transition-all duration-500 ease-out ",
                  tag.color === "blue" && "bg-badge-blue text-white group-hover:bg-white group-hover:text-black transition-all duration-500 ease-out ",
                  tag.color === "green" && "bg-badge-green text-white group-hover:bg-white group-hover:text-black transition-all duration-500 ease-out ",
                  tag.color === "orange" && "bg-primary  text-white group-hover:bg-white group-hover:text-black transition-all duration-500 ease-out ",
                  tag.color === "red" && "bg-red-500 text-white group-hover:bg-white group-hover:text-black transition-all duration-500 ease-out ",
                  // !tag.color && isDark && "bg-white text-foreground",
                  // !tag.color && !isDark && "bg-gray-100 text-gray-800"
                )}
              >
                {tag.label}
              </Badge>
            ))}
          </div>
</div>
          

          {/* Description */}
          <p className={cn("text-sm text-gray-600 group-hover:text-white transition-all duration-500 ease-out ")}>
            {description}
          </p>
          </div>
            <div className="flex items-center gap-2">
                <Button
                              variant="ghost"
                              size="icon"
                              className={cn(
                                "h-7 w-7 flex items-center justify-center px-1 py-1 text-badge-blue hover:bg-stone-700 group-hover:text-white  ",
                                // isDark
                                //   ? "text-white hover:bg-stone-700"
                                //   : "text-badge-blue hover:bg-sidebar-accent"
                              )}
                            >
                              <Eye/>
                            </Button>
                  <Button
              variant="outline"
            //   onClick={() => setApiModalOpen(true)}
              className="gap-2 text-white bg-primary !border-none"
            >
              <div className="!w-4">
                <AiGenerator/>
              </div>
              Run Tests
            </Button>
            </div>
          </div>

        </CardHeader>

        <CardContent>
          {/* Footer stats */}
          <div
            className={cn(
              "flex items-center justify-between  text-sm py-4 group-hover:text-white",
             
            )}
          >
            <div className="flex items-center gap-1">
              <span className=" ">
               {tests}
              </span>
              <span>
                tests
              </span>
            </div>
            <div className="flex items-center">
              <span>
               Agent: 
              </span>
              <span>{agent}</span>
            </div>
            <div className="flex items-center">
              <span>
               Last run: 
              </span>
              <span>{lastrun}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
