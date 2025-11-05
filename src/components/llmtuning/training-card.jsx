import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Eye } from "lucide-react";
import { Button } from "../ui/button";
import AnimatedProgressBar from "../animations/ProgressBar";

export function TrainingCard({ data, playKey }) {
  const {
    id,
    name,
    description,
    tags = [],
    progress,
    date,
    loss,
    width,
    successRate,
  } = data;

  return (
    <Link href={`/agents/${id}`} className="block group">
      <Card
        className={cn(
          "overflow-hidden hover:shadow-xl cursor-pointer transition-all duration-500 ease-out bg-background border border-black/30 group-hover:bg-active-card group-hover:text-white group-hover:border-black py-4 pb-7"
        )}
      >
        <CardHeader className="">
          <div className="flex items-center w-full justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-3 mt-4">
                <h3 className="text-xl font-medium text-black group-hover:text-white transition-all duration-500 ease-out">
                  {name}
                </h3>
                <div className="flex flex-wrap gap-1">
                  {tags.map((tag, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className={cn(
                        "rounded-full px-3.5 py-1 text-xs font-normal",
                        tag.color === "yellow" &&
                          "bg-badge-yellow text-foreground group-hover:bg-background group-hover:text-black transition-all duration-500 ease-out",
                        tag.color === "blue" &&
                          "bg-badge-blue text-white group-hover:bg-background group-hover:text-black transition-all duration-500 ease-out",
                        tag.color === "green" &&
                          "bg-badge-green text-white group-hover:bg-background group-hover:text-black transition-all duration-500 ease-out",
                        tag.color === "orange" &&
                          "bg-primary text-white group-hover:bg-background group-hover:text-black transition-all duration-500 ease-out",
                        tag.color === "red" &&
                          "bg-red-500 text-white group-hover:bg-background group-hover:text-black transition-all duration-500 ease-out"
                      )}
                    >
                      {tag.label}
                    </Badge>
                  ))}
                </div>
              </div>

              <p
                className={cn(
                  "text-sm text-gray-600 group-hover:text-white transition-all duration-500 ease-out"
                )}
              >
                {description}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "h-7 w-7 flex items-center justify-center px-1 py-1 text-badge-blue hover:bg-stone-700 group-hover:text-white"
                )}
              >
                <Eye />
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div>
            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm font-medium">
                <div className="space-x-1">
                  <span className="text-primary">Progress:</span>
                  <span>{progress} steps</span>
                </div>
                <div className="space-x-1">
                  <span className="">{successRate}</span>
                </div>
              </div>
              <AnimatedProgressBar
                value={width}
                duration={1.2}
                ease="easeInOut"
                animateOnMount
                playKey={playKey}
                className="w-full"
                trackClassName="w-full bg-gray-200 rounded-full h-2 relative overflow-hidden"
                barClassName="bg-primary h-full absolute top-0 left-0 z-[5] rounded-full"
              />
            </div>

            <div
              className={cn(
                "flex justify-between text-sm mt-3 text-black/50 group-hover:text-white duration-500 ease-out"
              )}
            >
              <p className="">Loss: {loss}</p>
              <div className="flex items-center gap-1">
                <span>Started</span>
                <span>{date}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
