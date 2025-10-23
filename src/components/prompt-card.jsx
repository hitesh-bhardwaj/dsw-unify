import { Star, Eye, Copy, Edit, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function PromptCard({ prompt }) {
  const {
    name,
    description,
    icon,
    rating,
    version,
    tags = [],
    uses,
    lastUpdated,
    preview,
    variant = "light",
  } = prompt;

  const isDark = variant === "dark";

  return (
    <Card
      className={cn(
        "overflow-hidden transition-all hover:shadow-lg",
        isDark ? "bg-black text-white border-black" : "bg-white"
      )}
    >
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between mb-4">
          {/* Icon, Rating, and Version */}
          <div className="flex items-center gap-3">
            <div
              className={cn(
                "flex h-12 w-12 shrink-0 items-center justify-center rounded-lg",
                isDark ? "bg-white" : "bg-black"
              )}
            >
              <span className={cn("text-2xl", isDark ? "text-black" : "text-white")}>
                {icon || "📝"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">{rating}</span>
              <Badge
                variant="secondary"
                className={cn(
                  "rounded-md px-2 py-0.5 text-xs",
                  isDark ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-800"
                )}
              >
                {version}
              </Badge>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "h-8 w-8",
                isDark ? "text-white hover:bg-gray-800" : "text-gray-600 hover:bg-gray-100"
              )}
            >
              <Eye className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "h-8 w-8",
                isDark ? "text-white hover:bg-gray-800" : "text-gray-600 hover:bg-gray-100"
              )}
            >
              <Copy className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "h-8 w-8",
                isDark ? "text-white hover:bg-gray-800" : "text-blue-600 hover:bg-blue-50"
              )}
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "h-8 w-8",
                isDark ? "text-white hover:bg-gray-800" : "text-red-600 hover:bg-red-50"
              )}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl font-semibold mb-2">{name}</h3>

        {/* Description */}
        <p className={cn("text-sm mb-4", isDark ? "text-gray-300" : "text-gray-600")}>
          {description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
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
                !tag.color && isDark && "bg-gray-800 text-white",
                !tag.color && !isDark && "bg-gray-100 text-gray-800"
              )}
            >
              {tag.label}
            </Badge>
          ))}
        </div>
      </CardHeader>

      <CardContent>
        {/* Usage stats */}
        <div className="flex items-center justify-between text-sm mb-3">
          <span className={isDark ? "text-gray-300" : "text-gray-600"}>
            {uses} uses
          </span>
          <span className={isDark ? "text-gray-300" : "text-gray-600"}>
            Updates {lastUpdated}
          </span>
        </div>

        {/* Preview */}
        <div
          className={cn(
            "rounded-lg p-3 text-sm",
            isDark ? "bg-gray-900 text-gray-300" : "bg-gray-50 text-gray-600"
          )}
        >
          {preview}
        </div>
      </CardContent>
    </Card>
  );
}
