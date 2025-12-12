"use client";

import { GridIcon, ListIcon } from "@/components/Icons";


export default function ListGridFilter({ view, setView }) {
  return (
    <div className="w-full flex items-center justify-end mt-0 mb-4 px-6">
      <div className="inline-flex border rounded-md overflow-hidden py-2 px-4 gap-5 border-border-color-0">
        {/* Grid View */}
        <button onClick={() => setView("grid")} className="cursor-pointer">
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
  );
}
