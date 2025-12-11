"use client";

import React, { useMemo, useState } from "react";
import { Tune, GridIcon, ListIcon, SortIcon } from "@/components/Icons";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const FilterBar = ({
  selectedTags,
  onTagsChange,
  availableTags,
  view,
  setView,
  sortOrder,
  setSortOrder,
  cards
}) => {
  const [tagOpen, setTagOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const [searchTags, setSearchTags] = useState("");

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

  const tagCounts = useMemo(() => {
  const counts = {};
  cards.forEach((card) => {
    (card.tags || []).forEach((tag) => {
      counts[tag] = (counts[tag] || 0) + 1;
    });
  });
  return counts;
}, [cards]);

const filteredTags = useMemo(
  () =>
    availableTags.filter((tag) =>
      tag.toLowerCase().includes(searchTags.toLowerCase())
    ),
  [availableTags, searchTags]
);

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

      {/* number of tags selected */}
      {selectedTags.length > 0 && (
        <>
          <Badge
            variant="outline"
            className="ml-1 h-5 w-5 p-0 flex items-center justify-center text-xs rounded-full"
          >
            {selectedTags.length}
          </Badge>
        </>
      )}
    </button>
  </PopoverTrigger>

  <PopoverContent className="w-85 p-4 !rounded-3xl border border-border-color-0" align="start" avoidCollisions={false} side="bottom">
    <div className="space-y-4">
      {/* Header with title + close icon */}
      <div className="flex items-center justify-between gap-2">
        <h4 className="font-medium text-sm">Filter by Tags</h4>
        {/* close icon */}
        <button
          type="button"
          onClick={() => setTagOpen(false)}
          className="p-1 hover:rotate-90 duration-500 ease-in cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Search bar */}
      <Input
        placeholder="Search tags..."
        value={searchTags}
        onChange={(e) => setSearchTags(e.target.value)}
        className="h-8 text-xs"
      />

      {/* Clear All just below search bar */}
      {selectedTags.length > 0 && (
        <button
          type="button"
          onClick={clearAllTags}
          className="text-[11px] text-muted-foreground hover:text-foreground cursor-pointer"
        >
          Clear All
        </button>
      )}

      {/* Tag List (filtered) */}
      <div className="space-y-3 max-h-45 overflow-y-auto">
        {filteredTags.length === 0 ? (
          <p className="text-xs text-muted-foreground">No tags found.</p>
        ) : (
          filteredTags.map((tag) => (
            <div key={tag} className="flex items-center space-x-2">
              <Checkbox
              className={cn("rounded-xs")}
                id={tag}
                checked={selectedTags.includes(tag)}
                onCheckedChange={() => handleTagToggle(tag)}
              />
              <Label
                htmlFor={tag}
                className="text-sm font-normal cursor-pointer capitalize flex-1 flex items-center justify-between"
              >
                <span>{tag}</span>
                {/* number of cards for this tag */}
                <span className="text-xs text-muted-foreground ml-2">
                 ({tagCounts[tag] || 0})
                </span>
              </Label>
            </div>
          ))
        )}
      </div>

      {/* Selected tags section at the end */}
      {selectedTags.length > 0 && (
        <div className="pt-3 border-t">
          <p className="text-xs font-medium mb-2">Selected tags</p>

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

  <PopoverContent className="w-56 p-3 rounded-2xl border border-border-color-0" align="start">
    <div className="flex items-center justify-between gap-2">
        <h4 className="font-medium text-sm">Sorting</h4>
        {/* close icon */}
        <button
          type="button"
          onClick={() => setSortOpen(false)}
          className="p-1 hover:rotate-90 duration-500 ease-in cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    <RadioGroup
      value={sortOrder}
      onValueChange={(value) => {
        // update sortOrder for all options,
        // but only actually "do" sorting for asc/desc in your logic
        setSortOrder(value);

        // close popover only for the working ones
        if (value === "asc" || value === "desc") {
          setSortOpen(false);
        }
      }}
      className="space-y-2 pt-3"
    >
      {/* A → Z */}
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="asc" id="sort-asc" />
        <Label
          htmlFor="sort-asc"
          className="text-sm cursor-pointer w-full"
        >
          A → Z
        </Label>
      </div>

      {/* Z → A */}
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="desc" id="sort-desc" />
        <Label
          htmlFor="sort-desc"
          className="text-sm cursor-pointer w-full"
        >
          Z → A
        </Label>
      </div>

      {/* Recently modified (UI only, disabled) */}
      <div className="flex items-center space-x-2 opacity-60">
        <RadioGroupItem value="recent" id="sort-recent" disabled />
        <Label
          htmlFor="sort-recent"
          className="text-sm w-full cursor-not-allowed"
        >
          Recently modified
        </Label>
      </div>

      {/* Mostly used (UI only, disabled) */}
      <div className="flex items-center space-x-2 opacity-60">
        <RadioGroupItem value="most-used" id="sort-most-used" disabled />
        <Label
          htmlFor="sort-most-used"
          className="text-sm w-full cursor-not-allowed"
        >
          Mostly used
        </Label>
      </div>
    </RadioGroup>
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
