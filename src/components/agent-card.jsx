import { FileText } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Calendar, FileTimeout, SynthWave } from "./Icons";

export function AgentCard({ agent }) {
  const {
    id,
    name,
    description,
    icon,
    status,
    tags = [],
    lastActivity,
    requestCount,
    variant = "light",
  } = agent;

  const isDark = variant === "dark";

  return (
    <Link href={`/agents/${id}`} className="block">
      <Card
        className={cn(
          "overflow-hidden transition-all hover:shadow-lg cursor-pointer shadow-none",
          isDark
            ? "bg-active-card text-white border-black"
            : "bg-white border border-black/20"
        )}
      >
        <CardHeader className="">
          <div className="flex items-start justify-between">
            {/* Icon */}
            <div
              className={cn(
                "flex h-14 w-14 items-center justify-center rounded-lg relative",
                isDark ? "bg-white" : "bg-black"
              )}
            >
              <span
                className={cn(
                  "w-full h-full flex justify-center items-center  p-4.5",
                  isDark ? "text-black" : "text-white"
                )}
              >
                <SynthWave />
              </span>
              <span
                className={cn(
                  "w-3 h-3 rounded-full bg-card-badge-green absolute -top-0.5 -right-0.5",
                  status === "active"
                    ? ""
                    : "hidden"
                )}
              ></span>
            </div>

            {/* Status badge */}
            <Badge
              className={cn(
                "rounded-full px-3 py-1 text-xs font-medium",
                status === "active"
                  ? "bg-card-badge-green text-white"
                  : "bg-gray-200 text-foreground px-4"
              )}
            >
              {status === "active" ? "Active" : "Draft"}
            </Badge>
          </div>

          {/* Agent name */}
          <h3 className="mt-7 text-xl font-medium">{name}</h3>

          {/* Description */}
          <p className={cn("text-sm", isDark ? "text-white" : "text-gray-600")}>
            {description}
          </p>
        </CardHeader>

        <CardContent>
          {/* Tags */}
          <div className="mb-16 flex flex-wrap gap-1">
            {tags.map((tag, index) => (
              <Badge
                key={index}
                variant="secondary"
                className={cn(
                  "rounded-full px-3.5 py-1 text-xs font-normal",
                  tag.color === "yellow" &&
                    "bg-card-badge-yellow text-foreground ",
                  tag.color === "blue" && "bg-card-badge-blue text-white ",
                  tag.color === "green" && "bg-card-badge-mint text-foreground",
                  tag.color === "orange" && "bg-card-badge-yellow text-foreground",
                  tag.color === "purple" && "bg-purple-500 text-white",
                  !tag.color && isDark && "bg-white text-foreground",
                  !tag.color && !isDark && "bg-gray-100 text-gray-800"
                )}
              >
                {tag.label}
              </Badge>
            ))}
          </div>

          {/* Footer stats */}
          <div
            className={cn(
              "flex items-center justify-between rounded-lg p-3 text-sm py-6",
              isDark ? "bg-white" : "bg-gray-100 border"
            )}
          >
            <div className="flex items-center gap-2 font-medium">
              {/* <Calendar className={cn("h-4 w-4", isDark ? "text-primary" : "text-orange-600")} /> */}
              <div className="w-4 h-4">
                <Calendar
                  className={` ${isDark ? "text-foreground" : "text-primary"}`}
                />
              </div>
              <span className={isDark ? "text-foreground" : "text-foreground"}>
                {lastActivity}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4">
                <FileTimeout
                  className={` ${
                    isDark ? "text-foreground" : "text-card-badge-blue"
                  }`}
                />
              </div>
              <span
                className={cn(
                  "font-medium",
                  isDark ? "text-foreground" : "text-foreground"
                )}
              >
                {requestCount}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
