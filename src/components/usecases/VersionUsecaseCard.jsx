"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useParams } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  Bin,
  Editor,
  Eye,
  SynthWave,
  Calendar,
  FileTimeout,
  People,
  LineGraph,
  RocketIcon,
} from "../Icons";
import CopyButton from "../animate-ui/components/buttons/CopyButton";

const skeletonShownMap = new Map();

/**
 * Component to display a versioned use case card.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.usecase - The use case data.
 * @param {string} props.usecase.id - The ID of the use case.
 * @param {string} props.usecase.name - The name of the use case.
 * @param {string} props.usecase.ModelSlug - The model slug.
 * @param {string} props.usecase.description - The description of the use case.
 * @param {string|number} props.usecase.accuracy - The accuracy of the version.
 * @param {string} props.usecase.versionSlug - The version slug.
 * @param {React.ReactNode} props.usecase.icon - The icon for the use case.
 * @param {Array<string>} [props.usecase.tags=[]] - The tags associated with the use case.
 * @param {string|number} props.usecase.versions - The number of versions.
 * @param {string|number} props.usecase.features - The number of features.
 * @param {string} props.usecase.status - The status of the use case.
 * @param {string} props.usecase.lastUpdated - The last updated timestamp or text.
 * @param {string} props.usecase.createdAt - The creation timestamp or text.
 * @param {"light"|"dark"} [props.usecase.variant="light"] - The variant of the card.
 * @param {string} props.slug - The slug for the link.
 * @param {number} [minSkeletonMs=500] - The minimum time to show the skeleton loader.
 * @returns {React.JSX.Element} The rendered VersionUsecaseCard component.
 */
export default function VersionUsecaseCard({
  usecase,
  view,
  index,
  minSkeletonMs = 500,
}) {
  const {
    id,
    name,
    ModelSlug,
    description,
    accuracy,
    versionSlug,
    icon: Icon,
    tags = [],
    versions,
    features,
    status,
    lastUpdated,
    createdAt,
    variant = "light",
  } = usecase || {};

  const isDark = variant === "dark";
  const [isModalOpen, setIsModalOpen] = useState(false);
    const params = useParams();
const { id: routeId, modelId } = params;

  // keep skeleton visible for minSkeletonMs
  const [showSkeleton, setShowSkeleton] = useState(() => {
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

  const isGrid = view === "grid";
  const isList = view === "list";

  if (showSkeleton) return <UsecaseInternalCardSkeleton />;

  return (
    <div className=" w-full h-full">
<Link href={`/ai-studio/use-cases/${routeId}/${modelId}/${versionSlug}`}>
        <Card
          onClick={() => setIsModalOpen(true)}
          className={cn(
            "feature-card-hover-container gap-2  transition-all duration-300 hover:drop-shadow-xl hover:bg-transparent group",
            isGrid &&
              " h-full flex flex-col justify-between gap-0 py-5 hover:border-white/20 ",
            isList &&
              "w-full rounded-xl  py-6 bg-white dark:bg-background"
          )}
        >
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between mb-4">
              {/* Icon */}
              <div className="flex gap-2 items-end">
                <div
              className="flex h-14 w-14 items-center justify-center rounded-lg  transition-all group-hover:!bg-white group-hover:!text-black duration-300 p-3"
              style={{
                color: `var(--icon-color-${(index % 4) + 1})`,
                backgroundColor: `rgb(from var(--icon-color-${(index % 4) + 1}) r g b / 0.1)`
              }}
            >
              {Icon && <Icon className="h-6 w-6" />}
            </div>
                <p
                  className={`text-xs border px-2 py-1 rounded-full group-hover:border-white group-hover:text-white duration-300 ${
                    status === "Deployed"
                      ? "border-badge-green"
                      : "border-red-500"
                  }`}
                >
                  {status}
                </p>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "h-7 w-7 flex items-center justify-center text-white px-1 py-1 opacity-0 group-hover:opacity-100",
                    "hover:bg-white/30 group-hover:text-white transition-all duration-300"
                  )}
                >
                  <Eye />
                </Button>

                {/* <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "h-7 w-7 flex items-center justify-center px-1 py-1 text-foreground",
                    "hover:bg-white/30 group-hover:text-white transition-colors duration-300"
                  )}
                >
                  <CopyButton />
                </Button> */}

                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "h-7 w-7 flex items-center justify-center px-1 py-1 text-white opacity-0 group-hover:opacity-100",
                    "hover:bg-white/30 group-hover:text-white transition-all duration-300"
                  )}
                >
                  <Editor />
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "h-7 w-7 flex items-center justify-center px-1 py-1 text-white opacity-0 group-hover:opacity-100",
                    "hover:bg-white/30 group-hover:text-white transition-all duration-300"
                  )}
                >
                  <Bin />
                </Button>
              </div>
            </div>

            {/* Title */}
            <h3 className="text-xl font-medium mb-2 group-hover:text-white transition-colors duration-300">{name}</h3>

            {/* Description */}
            <p className="text-sm text-muted-foreground line-clamp-2 group-hover:text-white/90 transition-colors duration-300">
              {description}
            </p>
          </CardHeader>

          <CardContent
            className={cn(
              isDark ? "bg-background" : "",
              "w-full mx-auto pt-4 space-y-4 rounded-xl duration-300"
            )}
          >
            
            {/* Tags */}
            <div className="flex flex-wrap gap-1 pt-2">
              {tags.map((tag, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className={cn(
                    "rounded-full border border-color-2 px-3 py-1 dark:bg-background text-xs font-light transition-all duration-300 group-hover:text-white group-hover:border-border-color-0 bg-white/10 dark:group-hover:bg-white/10"
                  )}
                >
                  {tag}
                </Badge>
              ))}
            </div>

            <div
              className={` flex flex-col gap-4`}
            >

            {/* Versions + Features */}
            <div
              className={cn(
                "flex items-start justify-between gap-4 rounded-lg p-3 px-2 text-sm py-2 duration-300 dark:bg-background flex-col", isList && 'w-[25%]'
              )}
            >
              <div className="flex items-center gap-6 ">
                <div className="w-5 h-5 text-white">
                  <LineGraph className=" transition-all duration-300" />
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-foreground text-xs group-hover:text-white transition-colors duration-300">Accuracy</p>
                  <p className="text-badge-green  transition-colors duration-300">{accuracy}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 w-full">
                <button className={` text-xs  flex gap-2 items-center p-3 pl-5 py-4 w-full rounded-full text-white  group-hover:text-foreground  transition-all duration-300 bg-primary group-hover:bg-white`}>
                    <RocketIcon className="w-4 h-4 " />
                    {status=="Deployed"?"Undeploy":"Deploy"}
                  
                  </button>
              </div>
            </div>

            {/* Last Updated */}
            <div className="flex items-center gap-3  pl-2">
              <div className="w-4 h-4">
                <Calendar className="text-foreground/80 group-hover:text-white transition-colors duration-300 h-full w-full" />
              </div>
              <span className="text-foreground/80 text-xs group-hover:text-white/80 transition-colors duration-300">
                {" "}
                Updated {lastUpdated}
              </span>
            </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    </div>
  );
}

/* ------------------ Skeleton Loader ------------------ */

/**
 * Skeleton component for UsecaseInternalCard.
 *
 * @returns {React.JSX.Element} The rendered UsecaseInternalCardSkeleton component.
 */
export function UsecaseInternalCardSkeleton() {
  return (
    <div className="group w-full h-full">
      <Card className="overflow-hidden w-full h-full transition-all duration-500 ease-out py-5 bg-background border border-border-color-0">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-black/30">
                <Skeleton className="h-full w-full rounded" />
              </div>

              <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-5 w-10 rounded-sm" />
              </div>
            </div>

            <div className="flex items-center gap-1">
              <Skeleton className="h-7 w-7 rounded" />
              <Skeleton className="h-7 w-7 rounded" />
              <Skeleton className="h-7 w-7 rounded" />
              <Skeleton className="h-7 w-7 rounded" />
            </div>
          </div>

          <Skeleton className="h-6 w-2/3 mb-2" />
          <Skeleton className="h-4 w-11/12 mb-4" />

          <div className="flex flex-wrap gap-1">
            <Skeleton className="h-6 w-16 rounded-full" />
            <Skeleton className="h-6 w-20 rounded-full" />
            <Skeleton className="h-6 w-14 rounded-full" />
          </div>
        </CardHeader>

        <CardContent className="w-[92%] mx-auto pt-5 rounded-xl px-4 border border-black/10 bg-sidebar-accent">
          <div className="flex items-center justify-between text-sm mb-3">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-24" />
          </div>

          <div className="rounded-lg p-3">
            <Skeleton className="h-16 w-full rounded" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
