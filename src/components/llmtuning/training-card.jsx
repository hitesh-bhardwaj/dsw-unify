import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Eye } from "lucide-react";
import { Button } from "../ui/button";
import AnimatedProgressBar from "../animations/ProgressBar";
import { Checkbox } from "@/components/ui/checkbox"


/**
 * Component to display a training card with details about a training job.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.data - The training job data.
 * @param {string} props.data.id - The ID of the training job.
 * @param {string} props.data.name - The name of the training job.
 * @param {string} props.data.description - The description of the training job.
 * @param {Array<{label: string, color: string}>} [props.data.tags=[]] - The tags associated with the training job.
 * @param {string|number} props.data.progress - The progress of the training job (in steps).
 * @param {string} props.data.date - The start date of the training job.
 * @param {string|number} props.data.loss - The loss value of the training job.
 * @param {number} props.data.width - The width percentage for the progress bar.
 * @param {string} props.data.successRate - The success rate of the training job.
 * @param {string|number} props.playKey - A key to trigger re-animation of the progress bar.
 * @returns {React.JSX.Element} The rendered TrainingCard component.
 */
export function TrainingCard({ data, playKey }) {
  const {
    id,
    name,
    description,
    tags = [],
    progress,
    isCompleted,
    date,
    loss,
    width,
    successRate,
  } = data;

  return (
    <Link href={`#`} className="block group">
      <Card
        className={cn(
          "overflow-hidden hover:shadow-xl cursor-pointer transition-all duration-500 ease-out bg-background border  dark:group-hover:bg-sidebar-accent py-4 pb-7"
        )}
      >
        <CardHeader className="">
          <div className="flex items-center w-full justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-3 mt-4">
                <div className="flex flex-col gap-2">

              {isCompleted===true && 
              <Checkbox /> }
                <h3 className="text-xl font-medium text-foreground  transition-all duration-500 ease-out">
                  {name}
                </h3>
              </div>
                <div className="flex flex-wrap gap-1">
                  {tags.map((tag, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className={cn(
                        "rounded-full px-3.5 py-1 text-xs font-normal dark:group-hover:bg-foreground",
                        tag.color === "yellow" &&
                          "bg-badge-yellow text-foreground  transition-all duration-500 ease-out",
                        tag.color === "blue" &&
                          "bg-transparent text-foreground border border-badge-blue dark:group-hover:bg-transparent dark:group-hover:border-foreground dark:border-border-color-0 transition-all duration-500 ease-out",
                        tag.color === "green" &&
                          "bg-transparent text-foreground border border-badge-green dark:group-hover:bg-transparent dark:group-hover:border-foreground dark:border-border-color-0 transition-all duration-500 ease-out",
                        tag.color === "orange" &&
                          "bg-primary text-white  transition-all duration-500 ease-out",
                        tag.color === "red" &&
                          "bg-red-500 text-white  transition-all duration-500 ease-out"
                      )}
                    >
                      {tag.label}
                    </Badge>
                  ))}
                </div>
              </div>

              <p
                className={cn(
                  "text-sm text-gray-600 dark:text-foreground  transition-all duration-500 ease-out"
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
                  "h-7 w-7 opacity-0 group-hover:opacity-100 flex items-center justify-center px-1 py-1 text-foreground dark:text-foreground hover:bg-sidebar-accent"
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
                barClassName="bg-badge-blue h-full absolute top-0 left-0 z-[5] rounded-full"
              />
            </div>

            <div
              className={cn(
                "flex justify-between text-sm mt-3 text-foreground/50 duration-500 ease-out"
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
