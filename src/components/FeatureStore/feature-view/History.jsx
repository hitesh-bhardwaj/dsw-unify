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

export default function History() {
  return (
    <div className="w-full h-full mx-auto">
      <h2 className="text-lg font-semibold my-2">Version History</h2>

      <div className="space-y-4 py-2">
        {historyData.map((item, index) => (
          <div
            key={index}
            className="!border  border-border-color-2 rounded-lg p-4 bg-white dark:bg-background text-xs flex justify-between items-center"
          >
            <div>
                <div className="flex gap-5">
              <p className="font-semibold">
                {item.version}
                {item.current && (
                    <span className="  ml-1">
                    (Current)
                  </span>
                )}
              </p>
              {item.modified && (
               <p className="text-foreground/80 text-xs ">Modified {item.modified}</p>
              )}
              
              {item.created && (
                <p className="text-foreground/80 text-xs">Created {item.created}</p>
              )}
                </div>


              <p className="text-foreground/80 mt-2 text-xs">{item.description}</p>
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
