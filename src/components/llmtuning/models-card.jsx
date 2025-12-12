import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Bin, RocketIcon, UploadIcon } from "../Icons";
import { Button } from "../ui/button";
import { Eye } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { RippleButton } from "../ui/ripple-button";

const skeletonShownMap = new Map();

/**
 * Component to display a model card.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.data - The model data.
 * @param {string} props.data.id - The ID of the model.
 * @param {string} props.data.name - The name of the model.
 * @param {string} props.data.description - The description of the model.
 * @param {Array<{label: string, color: string}>} [props.data.tags=[]] - The tags associated with the model.
 * @param {string|number} props.data.records - The number of records.
 * @param {string} props.data.createdBy - The creator of the model.
 * @param {string} props.data.response - The average response time.
 * @param {boolean} props.data.deployed - Whether the model is deployed.
 * @param {number} [minSkeletonMs=500] - The minimum time to show the skeleton loader.
 * @returns {React.JSX.Element} The rendered ModelsCard component.
 */
export function ModelsCard({ data , minSkeletonMs = 500 }) {
   const { id, name, description, tags = [], records, createdBy, response , deployed} = data;
  const [showSkeleton, setShowSkeleton] = useState(() => {
    // Only show skeleton if it hasn't been shown for this test before
    return !skeletonShownMap.has(id);
  });

  useEffect(() => {
    if (showSkeleton && id) {
      const t = setTimeout(() => {
        setShowSkeleton(false);
        skeletonShownMap.set(id, true);
      }, minSkeletonMs);
      return () => clearTimeout(t);
    }
  }, [minSkeletonMs, id, showSkeleton]);

  if (showSkeleton) {
    return (
      <div className="block">
        <Card
          className={cn(
            "overflow-hidden hover:shadow-xl transition-all duration-500 ease-out bg-background border border-border-color-0 pt-3 pb-8"
          )}
        >
          <CardHeader>
            <div className="flex items-center w-full justify-between">
              <div className="space-y-3 w-full max-w-[75%]">
                <div className="flex items-center gap-2 mt-4">
                  <Skeleton className="h-6 w-56" />
                  <div className="flex flex-wrap gap-2">
                    <Skeleton className="h-6 w-16 rounded-full" />
                    <Skeleton className="h-6 w-20 rounded-full" />
                    <Skeleton className="h-6 w-14 rounded-full" />
                  </div>
                </div>
                <Skeleton className="h-4 w-[90%]" />
                <Skeleton className="h-4 w-2/3" />
              </div>

              <div className="flex items-center gap-2">
                <Skeleton className="h-7 w-7 rounded-md" />
                <Skeleton className="h-6 w-6 rounded-md" />
                <Skeleton className="h-6 w-6 rounded-md" />
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <div className="flex items-center justify-between rounded-lg text-sm">
              <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-10" />
                <Skeleton className="h-4 w-16" />
              </div>
              <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-24" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }



  return (
    <Link href={`#`} className="block group">
      <Card
        className={cn(
          "overflow-hidden hover:shadow-xl cursor-pointer transition-all duration-500 ease-out bg-background border  dark:group-hover:border-border-color-0 dark:group-hover:bg-sidebar-accent pt-3 pb-8"
        )}
      >
        <CardHeader>
          <div className="flex items-center w-full justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-2 mt-4">
                <h3 className="text-xl font-medium text-foreground transition-all duration-500 ease-out">
                  {name}
                </h3>

                {/* Tags */}
                <div className="flex flex-wrap gap-1">
                  {tags.map((tag, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className={cn(
                        "rounded-full px-3.5 py-1 text-xs font-normal dark:group-hover:bg-foreground ",
                        tag.color === "yellow" &&
                          "bg-transparent text-foreground  transition-all duration-500 ease-out border border-badge-yellow",
                        tag.color === "blue" &&
                          "bg-badge-blue text-white  transition-all duration-500 ease-out",
                        tag.color === "green" &&
                          "bg-transparent text-foreground border border-badge-green dark:group-hover:bg-transparent dark:group-hover:border-foreground dark:border-border-color-0 transition-all duration-500 ease-out",
                        tag.color === "mint" &&
                          "bg-transparent text-foreground  border border-badge-mint dark:group-hover:bg-transparent dark:group-hover:border-foreground dark:border-border-color-0 transition-all duration-500 ease-out",
                        tag.color === "orange" &&
                          "bg-primary text-white  transition-all duration-500 ease-out",
                        tag.color === "red" &&
                          "bg-red-500 text-white  transition-all duration-500 ease-out",
                        tag.color === "sea-green" &&
                          "bg-badge-sea-green text-white  transition-all duration-500 ease-out",
                        tag.color === "transparent" &&
                          "bg-transparent text-foreground border border-border-color-0 dark:group-hover:bg-transparent dark:group-hover:border-foreground dark:border-border-color-0 transition-all duration-500 ease-out"
                      )}
                    >
                      {tag.label}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-gray-600 dark:text-foreground transition-all duration-500 ease-out">
                {description}
              </p>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "h-6.5 w-6.5 opacity-0 group-hover:opacity-100 flex items-center justify-center px-1 py-1 dark:text-foreground text-red hover:bg-sidebar-accent"
                )}
              >
                <Bin />
              </Button>
               <RippleButton>
             
                <Button href="#" className="bg-sidebar-primary hover:bg-[#E64A19] text-white gap-3 rounded-full !px-6 !py-6 !cursor-pointer duration-300">
                  <div className="w-4 h-4">
                    <RocketIcon className="text-white" />
                  </div>
                  {deployed ? "Undeploy":"Deploy"}
                </Button>
              
            </RippleButton>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {/* Footer stats */}
          <div className="flex items-center justify-between rounded-lg text-sm ">
            <div className="flex items-center gap-1">
              <span>{records}</span>
              <span>records</span>
            </div>
             <div className="flex items-center gap-1">
            <span>Avg response: </span>
              <span>{response}</span>
             
            </div>

            <div className="flex items-center text-foreground/60 duration-500 ease-out">
              <span>Created&nbsp;</span>
              <span>{createdBy}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
