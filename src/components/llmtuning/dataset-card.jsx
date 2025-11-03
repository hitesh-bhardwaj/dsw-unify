import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import Link from "next/link";
import {  Bin,UploadIcon } from "../Icons";
import { Button } from "../ui/button";
import { Eye } from "lucide-react";

export function DataSet({ data }) {
  const {
    id,
    name,
    description,
    tags = [],
    records,
    createdBy,
  } = data;


  return (
    <Link href={`/agents/${id}`} className="block group">
      <Card
        className={cn(
          "overflow-hidden  hover:shadow-xl cursor-pointer transition-all duration-500 ease-out bg-white border border-black/30 group-hover:bg-active-card group-hover:text-white group-hover:border-black pt-3 pb-8"
          
        )}
      >
        <CardHeader className="">
          <div className="flex items-center w-full justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-2 mt-4">
                {/* Agent name */}
                <h3 className="text-xl font-medium text-black group-hover:text-white transition-all duration-500 ease-out ">
                  {name}
                </h3>
                <div className=" flex flex-wrap gap-1">
                  {tags.map((tag, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className={cn(
                        "rounded-full px-3.5 py-1 text-xs font-normal",
                        tag.color === "yellow" &&
                          "bg-badge-yellow text-foreground group-hover:bg-white group-hover:text-black transition-all duration-500 ease-out ",
                        tag.color === "blue" &&
                          "bg-badge-blue text-white group-hover:bg-white group-hover:text-black transition-all duration-500 ease-out ",
                        tag.color === "green" &&
                          "bg-badge-green text-white group-hover:bg-white group-hover:text-black transition-all duration-500 ease-out ",
                        tag.color === "mint" &&
                          "bg-badge-mint text-white group-hover:bg-white group-hover:text-black transition-all duration-500 ease-out ",
                        tag.color === "orange" &&
                          "bg-primary  text-white group-hover:bg-white group-hover:text-black transition-all duration-500 ease-out ",
                        tag.color === "red" &&
                          "bg-red-500 text-white group-hover:bg-white group-hover:text-black transition-all duration-500 ease-out ",
                        tag.color === "sea-green" &&
                          "bg-badge-sea-green text-white group-hover:bg-white group-hover:text-black transition-all duration-500 ease-out ",
                        tag.color === "transparent" &&
                          "bg-transparent text-foreground border border-black/20 group-hover:bg-white group-hover:text-foreground transition-all duration-500 ease-out "
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
              <p
                className={cn(
                  "text-sm text-gray-600 group-hover:text-white transition-all duration-500 ease-out "
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
                  "h-7 w-7 flex items-center justify-center px-1 py-1 text-badge-blue hover:bg-stone-700 group-hover:text-white  "
                )}
              >
                <Eye />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "h-6 w-6 flex items-center justify-center px-1 py-1 text-primary hover:bg-stone-700 group-hover:text-white  "
                )}
              >
                <UploadIcon/>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "h-6.5 w-6.5 flex items-center justify-center px-1 py-1 text-red hover:bg-stone-700 group-hover:text-white  "
                )}
              >
                <Bin/>
              </Button>
              
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {/* Footer stats */}
          <div
            className={cn(
              "flex items-center justify-between rounded-lg  text-sm group-hover:text-white"
            )}
          >
            <div className="flex items-center gap-1 ">
              <span className=" ">{records}</span>
              <span>records</span>
            </div>

            <div className="flex items-center text-black/60 group-hover:text-white duration-500 ease-out">
              <span>Created </span>
              <span>{createdBy}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
