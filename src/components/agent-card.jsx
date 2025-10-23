import { Calendar, FileText } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import Link from "next/link";

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
          "overflow-hidden transition-all hover:shadow-lg cursor-pointer",
          isDark ? "bg-black text-white border-black" : "bg-white"
        )}
      >
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          {/* Icon */}
          <div
            className={cn(
              "flex h-12 w-12 items-center justify-center rounded-lg",
              isDark ? "bg-white" : "bg-black"
            )}
          >
            <span className={cn("text-2xl", isDark ? "text-black" : "text-white")}>
              {icon || "🤖"}
            </span>
          </div>

          {/* Status badge */}
          <Badge
            className={cn(
              "rounded-full px-3 py-1 text-xs font-medium",
              status === "active"
                ? "bg-green-500 text-white hover:bg-green-600"
                : "bg-gray-300 text-gray-700 hover:bg-gray-400"
            )}
          >
            {status === "active" ? "Active" : "Draft"}
          </Badge>
        </div>

        {/* Agent name */}
        <h3 className="mt-4 text-xl font-semibold">{name}</h3>

        {/* Description */}
        <p className={cn("text-sm", isDark ? "text-gray-300" : "text-gray-600")}>
          {description}
        </p>
      </CardHeader>

      <CardContent>
        {/* Tags */}
        <div className="mb-4 flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <Badge
              key={index}
              variant="secondary"
              className={cn(
                "rounded-full px-3 py-1 text-xs font-medium",
                tag.color === "yellow" && "bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
                tag.color === "blue" && "bg-blue-500 text-white hover:bg-blue-600",
                tag.color === "green" && "bg-green-500 text-white hover:bg-green-600",
                tag.color === "orange" && "bg-orange-100 text-orange-800 hover:bg-orange-200",
                tag.color === "purple" && "bg-purple-500 text-white hover:bg-purple-600",
                !tag.color && isDark && "bg-gray-800 text-white",
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
            "flex items-center justify-between rounded-lg p-3 text-sm",
            isDark ? "bg-gray-900" : "bg-gray-50"
          )}
        >
          <div className="flex items-center gap-2">
            <Calendar className={cn("h-4 w-4", isDark ? "text-orange-400" : "text-orange-600")} />
            <span className={isDark ? "text-gray-300" : "text-gray-600"}>
              {lastActivity}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <FileText className={cn("h-4 w-4", isDark ? "text-blue-400" : "text-blue-600")} />
            <span className={cn("font-medium", isDark ? "text-white" : "text-gray-900")}>
              {requestCount}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
    </Link>
  );
}
