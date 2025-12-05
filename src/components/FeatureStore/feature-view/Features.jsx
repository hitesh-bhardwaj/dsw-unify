
import React from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";


const features = [
  {
    feature_name: "customer_age",
    source_column: "customers.dob",
    transformation: "calculate_age",
    data_type: "integer",
    nullable: "No",
  },
  {
    feature_name: "is_premium",
    source_column: "customers.account_type",
    transformation: "one_hot_encode",
    data_type: "boolean",
    nullable: "No",
  },
  {
    feature_name: "total_spent",
    source_column: "orders.amount",
    transformation: "sum_aggregation",
    data_type: "decimal",
    nullable: "Yes",
  },
  {
    feature_name: "order_count",
    source_column: "orders.id",
    transformation: "count_aggregation",
    data_type: "integer",
    nullable: "No",
  },
  {
    feature_name: "avg_order_value",
    source_column: "orders.amount",
    transformation: "avg_aggregation",
    data_type: "decimal",
    nullable: "Yes",
  },
];

/**
 * Component to display the feature schema in a table.
 *
 * @returns {React.JSX.Element} The rendered Features component.
 */
export default function Features() {
  return (
    <div className="w-full mx-auto ">
        <p className="font-medium text-lg mb-4">Feature Schema <span className="text-muted-foreground">(5 features)</span></p>
      
      <div className="border border-border-color-2 p-0 rounded-2xl">


          <Table className="w-full text-xs rounded-2xl overflow-hidden ">
            <TableHeader className='' >
              <TableRow className='bg-sidebar-accent hover:bg-sidebar-accent '>
                <TableHead className='px-3'>Feature Name</TableHead>
                <TableHead className='px-3'>Source Column</TableHead>
                <TableHead className='px-3'>Transformation</TableHead>
                <TableHead className='px-3'>Data Type</TableHead>
                <TableHead className='px-3'>Nullable</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {features.map((f) => (
                <TableRow key={f.feature_name} className="hover:bg-background">
                  <TableCell className="p-3  whitespace-nowrap">{f.feature_name}</TableCell>
                  <TableCell className="p-3  whitespace-nowrap">{f.source_column}</TableCell>
                  <TableCell className="p-3  whitespace-nowrap">{f.transformation}</TableCell>
                  <TableCell className="p-3  whitespace-nowrap">{f.data_type}</TableCell>
                  <TableCell className="p-3  whitespace-nowrap">{f.nullable}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
    </div>
  );
}
