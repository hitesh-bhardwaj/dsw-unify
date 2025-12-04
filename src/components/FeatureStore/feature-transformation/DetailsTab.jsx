import React from "react";
import { Calendar, DocumentIcon, SynthWave } from "@/components/Icons";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

/**
 * Component to display details of a feature transformation.
 *
 * @param {Object} props - The component props.
 * @param {string} props.description - The description of the transformation.
 * @param {Array<{name: string, type: string, required: string, description: string}>} props.inputParams - The input parameters for the transformation.
 * @param {string} props.lastUpdated - The last updated date.
 * @param {string} props.createdAt - The creation date.
 * @returns {React.JSX.Element} The rendered DetailsTab component.
 */
export default function DetailsTab({
  description,
  inputParams,
  lastUpdated,
  createdAt,
}) {
  return (
    <div className="w-full h-fit mx-auto  py-2  space-y-6 ">
      <div className="space-y-2">
        <h2 className="text-lg font-medium">Description</h2>
        <p className="text-foreground/80 text-xs">{description}</p>
      </div>
      <div>
        <h3 className="text-lg font-medium pb-2">Input Parameters</h3>
        <div className=" rounded-lg overflow-hidden">
          <div className="w-full rounded-md   overflow-hidden">
            <Table className="w-full text-xs border border-color-2 dark:hover:bg-background">
  <TableHeader className="bg-sidebar-accent dark:hover:bg-sidebar-accent">
    <TableRow className='dark:hover:bg-sidebar-accent'>
      <TableHead className="py-2 px-4 w-[25%]">Name</TableHead>
      <TableHead className="py-2 px-4 w-[25%]">Type</TableHead>
      <TableHead className="py-2 px-4 w-[25%]">Required</TableHead>
      <TableHead className="py-2 px-4 w-[25%]">Description</TableHead>
    </TableRow>
  </TableHeader>

  <TableBody>
    {inputParams?.map((row, i) => (
      <TableRow key={i} className="text-foreground/80 dark:hover:bg-background">
        <TableCell className="py-2 px-4 w-[25%]">{row.name}</TableCell>
        <TableCell className="py-2 px-4 w-[25%]">{row.type}</TableCell>
        <TableCell className="py-2 px-4 w-[25%]">{row.required}</TableCell>
        <TableCell className="py-2 px-4 w-[25%]">{row.description}</TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>

          </div>
        </div>
      </div>
      <div>
        <h3 className="text-lg font-medium mb-3">Output Type</h3>
        <div className="border border-border-color-1  p-3 rounded-lg text-foreground/80 text-xs">
          Object
        </div>
      </div>
      <div className="w-full flex items-center justify-between text-sm text-foreground/80 pt-4">
        <div className="flex gap-4 items-center ">
          <div className="w-10 h-10 border border-color-2 rounded-lg bg-sidebar-accent   p-3">
            <DocumentIcon/>
          </div>
          <div>
            <p className="font-medium text-xs">Created</p>
            <p className="text-black text-sm dark:text-white font-medium">
              {createdAt}
            </p>
          </div>
        </div>
        <div className="flex gap-4 items-center ">
          <div className="w-10 h-10 border border-color-2 rounded-lg bg-sidebar-accent  p-3">
          <Calendar/>
          </div>
          <div>
            <p className="font-medium text-xs">Last Modified</p>
            <p className="text-black text-sm dark:text-white font-medium">
              {lastUpdated}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
