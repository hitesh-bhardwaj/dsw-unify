import React from "react";
import { LLMCard } from "./LLMCard";
import FilterBar from "@/components/FeatureStore/feature-transformation/TransformationFilter";
import { AnimatePresence, motion } from "framer-motion";

/**
 * Component to display LLM cards with built-in filtering + grid/list view.
 *
 * @param {Object} props
 * @param {Array<Object>} props.items
 * @param {"grid" | "list"} props.view
 * @param {Array<string>} props.selectedTags
 * @param {Function} props.onTagsChange
 * @param {Array<string>} props.availableTags
 * @param {string} props.sortOrder
 * @param {Function} props.setSortOrder
 * @param {Function} props.setView
 */
const LLMGrid = ({
  items,
  view = "grid",
  selectedTags = [],
  onTagsChange = () => {},
  availableTags = [],
  sortOrder = "none",
  setSortOrder = () => {},
  setView = () => {},
}) => {
  const isGrid = view === "grid";

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* --- FILTER BAR --- */}
      <FilterBar
        selectedTags={selectedTags}
        onTagsChange={onTagsChange}
        availableTags={availableTags}
        view={view}
        isFilterHidden={true}

        setView={setView}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        cards={items}
      />

      {/* --- GRID / LIST WITH MOTION --- */}
      <AnimatePresence mode="wait">
        <motion.div
          key={view} // triggers animation on change
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className={
            isGrid
              ? "grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-stretch"
              : "flex flex-col gap-4 w-full"
          }
        >
          {items.map((llm, index) => (
            <div key={llm.id} className={isGrid ? "" : "w-full"}>
              <LLMCard llm={llm} index={index} view={view} />
            </div>
          ))}

          {items.length === 0 && (
            <div className="flex h-64 items-center justify-center text-gray-500">
              No LLMs found.
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default LLMGrid;
