"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import CountUp from "../animations/CountUp";

export function TestingAnalyticsCard({ cards, tab }) {
  const { heading, progress, remarks, positive } = cards;

  return (
    <Card className={cn("overflow-hidden hover:shadow-xl transition-all duration-500 ease-out bg-background border border-black/30 group-hover:bg-active-card group-hover:text-white group-hover:border-black !py-5 !rounded-lg")}>
      <CardHeader>
        <div className="flex items-center w-full justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-[3vw]">
              <h3 className="text-sm font-medium text-black group-hover:text-white transition-all duration-500 ease-out">
                {heading}
              </h3>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-2">
          <p className="text-3xl font-medium group-hover:text-white transition-all duration-500 ease-out">
            <CountUp
              key={tab}           
              value={progress}
              duration={1.2}
              startOnView
              once
            />
          </p>

          <p
            className={cn(
              `text-sm group-hover:text-white transition-all duration-500 ease-out ${
                positive === true ? "text-green" : "text-red"
              }`
            )}
          >
            {remarks}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
