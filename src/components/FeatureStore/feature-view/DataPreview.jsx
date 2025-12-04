
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { RefreshIcon } from "@/components/Icons";

const sampleData = [
  {
    customer_age: 35,
    is_premium: "true",
    total_spent: "1250.5",
    order_count: 15,
    avg_order_value: 83.37,
  },
  {
    customer_age: 28,
    is_premium: "false",
    total_spent: "450",
    order_count: 5,
    avg_order_value: 80,
  },
  {
    customer_age: 42,
    is_premium: "true",
    total_spent: "2100.75",
    order_count: 28,
    avg_order_value: 75.03,
  },
];

/**
 * Component to display a preview of data in a table format.
 *
 * @returns {React.JSX.Element} The rendered DataPreview component.
 */
export default function DataPreview() {
  return (
    <div className="w-full mx-auto ">
      <div className="w-full flex justify-between items-center">
        <p className="font-medium text-lg mt-4">
          Sample Data{" "}
          <span className="text-muted-foreground">(First 10 rows)</span>
        </p>
        <Button
          variant="outline"
          size="sm"
          className="text-xs flex items-center gap-2 border-primary rounded-full cursor-pointer"
        >
          <RefreshIcon className="h-3 w-3" /> Refresh
        </Button>
      </div>

      <div className="border border-border-color-2 p-0 rounded-2xl">

   
      
          <Table className="w-full text-xs border-none p-1 rounded-2xl overflow-hidden   dark:hover:bg-background">
            <TableHeader className=" bg-sidebar-accent ">
              <TableRow className="bg-sidebar-accent  hover:bg-sidebar-accent dark:hover:bg-sidebar-accent">
                <TableHead className="w-1/5">customer_age</TableHead>
                <TableHead className="w-1/5">is_premium</TableHead>
                <TableHead className="w-1/5">total_spent</TableHead>
                <TableHead className="w-1/5">order_count</TableHead>
                <TableHead className="w-1/5">avg_order_value</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {sampleData.map((row, index) => (
                <TableRow key={index} className='dark:hover:bg-background hover:bg-white'>
                  <TableCell className="py-3 px-4 w-1/5">
                    {row.customer_age}
                  </TableCell>
                  <TableCell className="py-3 px-4 w-1/5">
                    {row.is_premium}
                  </TableCell>
                  <TableCell className="py-3 px-4 w-1/5">
                    {row.total_spent}
                  </TableCell>
                  <TableCell className="py-3 px-4 w-1/5">
                    {row.order_count}
                  </TableCell>
                  <TableCell className="py-3 px-4 w-1/5">
                    {row.avg_order_value}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
             </div>
        
    </div>
  );
}
