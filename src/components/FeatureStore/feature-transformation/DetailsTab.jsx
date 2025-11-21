import React from "react";
import { SynthWave } from "@/components/Icons";

// DetailsTab integrated into HotEncoding
export default function DetailsTab({ description, inputParams, lastUpdated, createdAt }) {
  return (
    <div className="w-full h-fit mx-auto  py-4  space-y-6 ">
      <div className="space-y-1">
        <h2 className="text-lg font-medium">Description</h2>
        <p className="text-foreground/80 text-xs">{description}</p>
      </div>
      <div>
        <h3 className="text-lg font-medium pb-2">Input Parameters</h3>
        <div className="border border-border-color-1 rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead className="text-left ">
              <tr>
                <th className="py-2 px-4 border-b border-border-color-1">
                  Name
                </th>
                <th className="py-2 px-4 border-b border-border-color-1">
                  Type
                </th>
                <th className="py-2 px-4 border-b border-border-color-1">
                  Required
                </th>
                <th className="py-2 px-4 border-b border-border-color-1">
                  Description
                </th>
              </tr>
            </thead>
            <tbody>
              {inputParams?.map((row, index) => (
                <tr key={index} className="text-foreground/80">
                  <td className="py-2 px-4 border-b border-border-color-1">
                    {row.name}
                  </td>
                  <td className="py-2 px-4 border-b border-border-color-1">
                    {row.type}
                  </td>
                  <td className="py-2 px-4 border-b border-border-color-1">
                    {row.required}
                  </td>
                  <td className="py-2 px-4 border-b border-border-color-1">
                    {row.description}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div>
        <h3 className="text-lg font-medium mb-3">Output Type</h3>
        <div className="border border-border-color-1  p-3 rounded-lg text-foreground/80 text-sm">
          Object
        </div>
      </div>
      <div className="w-full flex items-center justify-between text-sm text-foreground/80 pt-4">
        <div className="flex gap-4 items-center ">
            <div className="w-10 h-10 border border-color-2 rounded-lg   p-3">
                <SynthWave />
            </div>
          <div>
            <p className="font-medium text-xs">Created</p>
            <p className="text-black text-sm dark:text-white font-medium">{createdAt}</p>
          </div>
        </div>
       <div className="flex gap-4 items-center ">
            <div className="w-10 h-10 border border-color-2 rounded-lg   p-3">
                <SynthWave />
            </div>
          <div>
            <p className="font-medium text-xs">Last Modified</p>
            <p className="text-black text-sm dark:text-white font-medium">{lastUpdated}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
