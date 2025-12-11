import React from "react";

const historyData = [
  {
    version: "Version 3",
    status: "Current",
    modified: "Just now",
    description: "Added 2 new features and updated transformation logic",
    current: true,
  },
  {
    version: "Version 2",
    modified: "1 week ago",
    description: "Updated join configuration for orders table",
    current: false,
  },
  {
    version: "Version 1",
    created: "2025-11-18T10:59:04.265Z",
    description: "Initial feature view creation",
    current: false,
  },
];

/**
 * Component to display the version history of a feature view.
 *
 * @returns {React.JSX.Element} The rendered History component.
 */
export default function History() {
  return (
    <div className="w-full h-full mx-auto">
      <h2 className="text-lg font-semibold mt-2">Version History</h2>

      <div className="space-y-4 py-2">
        {historyData.map((item, index) => (
          <div
            key={index}
            className="!border  border-border-color-0 rounded-lg p-4 bg-white dark:bg-background py-6 text-xs flex justify-between items-center"
          >
            <div className="">
                <div className="flex gap-4">
              <p className="font-semibold text-sm">
                {item.version}
                {item.current && (
                    <span className="  ml-1">
                    (Current)
                  </span>
                )}
              </p>
              {item.modified && (
               <p className="text-foreground/80 text-sm ">Modified {item.modified}</p>
              )}
              
              {item.created && (
                <p className="text-foreground/80 text-sm">Created {item.created}</p>
              )}
                </div>


              <p className="text-foreground/80 mt-3 text-xs">{item.description}</p>
            </div>

            {!item.current && (
              <button className="border border-[#FFCD41] rounded-full px-4 py-1 text-xs  ">
                Restore
              </button>
            )}

            {item.current && (
              <span className="border border-[#89D7D8] rounded-full px-4 py-1 text-xs ">
                Current
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
