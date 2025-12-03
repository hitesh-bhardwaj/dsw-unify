
"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Eye } from "lucide-react";
import { Button } from "../ui/button";
// import { motion, useAnimationControls, useInView } from "motion";
import { useRef } from "react";
import AnimatedProgressBar from "../animations/ProgressBar";

export function TestingCardResults({ test ,tab}) {
  const {
    id,
    name,
    description,
    tags = [],
    tests,
    date,
    time,
    width,
    successRate,
    variant = "light",
  } = test;

// console.log(tab)


  // ---- Animate when visible ----
  const ref = useRef(null);
 

  return (
    <Link href={`/#`} className="block group" aria-label={`${name} test card`}>
      <Card
        className={cn(
           "overflow-hidden group hover:shadow-xl cursor-pointer transition-all duration-500 ease-out bg-background border border-border-color-1 hover:bg-sidebar-accent group-hover:bg-active-card dark:group-hover:bg-sidebar-accent group-hover:text-white group-hover:border-border-color-1 !py-5 h-full"
        )}
      >
        <CardHeader>
          <div className="flex items-center w-full justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-[3vw] mt-4">
                {/* Agent name */}
                <h3 className="text-xl font-medium text-black dark:text-white transition-all duration-500 ease-out">
                  {name}
                </h3>

                {/* Tags */}
                 <div className="flex flex-wrap gap-1">
  {tags.map((tag, index) => (
    <Badge
      key={index}
      variant="secondary"
      className={cn(
        "rounded-full border px-3 py-1 bg-white dark:bg-background text-xs font-light transition-all duration-500 ease-out dark:group-hover:bg-background",
        
        // Conditional border color
        tag.color === "green" && "border-badge-green",
        tag.color === "orange" && "border-primary",
        tag.color === "red" && "border-red-500"
      )}
    >
      {tag.label}
    </Badge>
  ))}
</div>
              </div>

              {/* Description */}
              <p className="text-sm text-foreground/80 transition-all duration-500 ease-out">
                {description}
              </p>
            </div>

            <div className="flex items-center gap-2">
             <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "h-7 w-7 flex items-center bg-sidebar-accent justify-center px-1 py-1 text-foreground/80 hover:bg-white dark:text-foreground dark:hover:text-black"
                )}
              >
                <Eye />
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div ref={ref}>
            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm font-medium">
                <div className="space-x-1">
                  <span className="text-primary">Tests:</span>
                  <span className="group-hover:text-foreground ">{tests}</span>
                </div>
                <div className="space-x-1 ">
                  <span className="text-primary">
                    {typeof successRate === "number"
                      ? `${successRate}%`
                      : successRate}
                  </span>
                  <span>Success Rate</span>
                </div>
              </div>

              {/* Animated Progress Bar */}

              <AnimatedProgressBar
                value={width} // 65 or "65%"
                duration={1.2}
                ease="easeInOut"
                animateOnMount
                playKey={tab}
                className="w-full"
                trackClassName="w-full bg-gray-200 rounded-full h-2 relative overflow-hidden"
                barClassName="bg-badge-blue h-full absolute top-0 left-0 z-[5] rounded-full"
              />
            </div>

            <div className="flex items-end justify-end p-3 text-sm py-6 group-hover:text-white">
              <div className="flex items-center gap-1 text-foreground/80">
                <span>Run on</span>
                <span>{date},</span>
                <span>{time}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
