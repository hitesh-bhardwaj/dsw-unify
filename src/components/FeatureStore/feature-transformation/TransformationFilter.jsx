"use client";

import React, { useState } from "react";
import { Tune, GridIcon, ListIcon, SortIcon } from "@/components/Icons";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

const FilterBar = ({
  selectedTags,
  onTagsChange,
  availableTags,
  view,
  setView,
  sortOrder,
  setSortOrder,
}) => {
  const [tagOpen, setTagOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);

  const handleTagToggle = (tag) => {
    if (selectedTags.includes(tag)) {
      onTagsChange(selectedTags.filter((t) => t !== tag));
    } else {
      onTagsChange([...selectedTags, tag]);
    }
  };

  const clearAllTags = () => {
    onTagsChange([]);
  };

  return (
    <div className="w-full flex items-center justify-between mt-6">
      {/* Left Buttons */}
      <div className="flex items-center gap-3">
        {/* Filter by Tags */}
        <Popover open={tagOpen} onOpenChange={setTagOpen}>
          <PopoverTrigger asChild>
            <button className="flex cursor-pointer items-center gap-2 border border-border-color-0 rounded-md px-4 py-2 text-xs">
              <Tune className="w-5 h-5" />
              <span>Filter by Tags</span>
              {selectedTags.length > 0 && (
                <Badge
                  variant="outline"
                  className="ml-1 h-5 w-5 p-0 flex items-center justify-center text-xs rounded-full"
                >
                  {selectedTags.length}
                </Badge>
              )}
            </button>
          </PopoverTrigger>

          <PopoverContent className="w-72 p-4" align="start">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-sm">Filter by Tags</h4>

                {selectedTags.length > 0 && (
                  <button
                    onClick={clearAllTags}
                    className="text-xs text-muted-foreground hover:text-foreground underline"
                  >
                    Clear all
                  </button>
                )}
              </div>

              {/* Tag List */}
              <div className="space-y-3">
                {availableTags.map((tag) => (
                  <div key={tag} className="flex items-center space-x-2">
                    <Checkbox
                      id={tag}
                      checked={selectedTags.includes(tag)}
                      onCheckedChange={() => handleTagToggle(tag)}
                    />
                    <Label
                      htmlFor={tag}
                      className="text-sm font-normal cursor-pointer capitalize flex-1"
                    >
                      {tag}
                    </Label>
                  </div>
                ))}
              </div>

              {/* Selected Tags */}
              {selectedTags.length > 0 && (
                <div className="pt-3 border-t">
                  <p className="text-xs text-muted-foreground mb-2">
                    Selected tags:
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {selectedTags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="text-xs capitalize"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </PopoverContent>
        </Popover>

        {/* Sorting */}
        <Popover open={sortOpen} onOpenChange={setSortOpen}>
          <PopoverTrigger asChild>
            <button className="flex cursor-pointer items-center gap-2 border border-border-color-0 rounded-md px-4 py-2 text-xs">
              <SortIcon className="w-4 h-4" />
              <span>Sorting</span>
            </button>
          </PopoverTrigger>

          <PopoverContent className="w-48 p-3" align="start">
            <div className="space-y-2">
              {/* NONE Option */}
              {/* <button
                onClick={() => {
                  setSortOrder("none");
                  setSortOpen(false);
                }}
                className={`w-full text-left px-3 py-2 rounded-md text-sm ${
                  sortOrder === "none"
                    ? "bg-sidebar-primary text-white"
                    : "hover:bg-muted"
                }`}
              >
                None (Default)
              </button> */}

              {/* A → Z */}
              <button
                onClick={() => {
                  setSortOrder("asc");
                  setSortOpen(false);
                }}
                className={`w-full cursor-pointer text-left px-3 py-2 rounded-md text-sm ${
                  sortOrder === "asc"
                    ? "bg-sidebar-primary text-white"
                    : "hover:bg-muted"
                }`}
              >
                A → Z
              </button>

              {/* Z → A */}
              <button
                onClick={() => {
                  setSortOrder("desc");
                  setSortOpen(false);
                }}
                className={`w-full cursor-pointer text-left px-3 py-2 rounded-md text-sm ${
                  sortOrder === "desc"
                    ? "bg-sidebar-primary text-white"
                    : "hover:bg-muted"
                }`}
              >
                Z → A
              </button>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      {/* Right Side View Toggle */}
      <div>
        <div className="inline-flex border rounded-md overflow-hidden py-2 px-4 gap-5 border-border-color-0">
          {/* Grid View */}
          <button onClick={() => setView("grid")} className="cursor-pointer ">
            <GridIcon
              className={`${view === "grid" ? "opacity-100" : "opacity-[0.4]"}`}
            />
          </button>

          {/* List View */}
          <button onClick={() => setView("list")} className="cursor-pointer">
            <ListIcon
              className={`${view === "list" ? "opacity-100" : "opacity-[0.4]"}`}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
