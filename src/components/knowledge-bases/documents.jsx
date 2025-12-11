import React from "react";
import { Button } from "../ui/button";
import { Download, Upload } from "lucide-react";
import { AiGenerator, SynthWave } from "../Icons";
import { cn } from "@/lib/utils";
import { RippleButton } from "../ui/ripple-button";
import Link from "next/link";

const documnetsData = [
  {
    name: "Employee Handbook.pdf",
    description: "Added 2 new features and updated transformation logic",
    storage:"2.4 MB",
    time:"Updated 2 hours ago"
  },
  {
    name: "Company Policies.docx",
    description: "Updated join configuration for orders table",
    storage:"1.8 MB",
    time:"Updated 1 day ago"
   
  },
  {
    name: "Benefits Guide.pdf",
    description: "Initial feature view creation",
    storage:"3.2 MB",
    time:"Updated 3 days ago"
    
  },
  {
    name: "Code of Conduct.pdf",
    description: "Initial feature view creation",
    storage:"1.1 MB",
    time:"Updated 1 week ago"
    
  },
];

/**
 * Component to display a list of documents with upload and download options.
 *
 * @returns {React.JSX.Element} The rendered Documents component.
 */
export default function Documents() {
  return (
    <div className="w-full h-full mx-auto">
        <div className="w-full flex items-center justify-between mt-4">
      <h2 className="text-lg font-semibold my-2">Documents</h2>
      <RippleButton>
                <Link href={"#"}>
                  <Button
                    variant="outline"
                    className="gap-2 text-foreground border border-primary"
                  >
                    <div className="!w-4 text-primary">
                     <Upload/>
                    </div>
                    Upload Documents
                  </Button>
                </Link>
              </RippleButton>
      </div>

      <div className="space-y-4 py-2 mt-4">
        {documnetsData.map((item, index) => (
          <div
            key={index}
            className="!border  border-border-color-0 rounded-lg p-4 bg-white dark:bg-background text-xs flex justify-between items-center"
          >
            <div className="flex gap-5">
                 <div className="w-13 h-12">
                                       <span
                                         className={cn(
                                           "w-full h-full flex justify-center items-center p-3.5 text-foreground bg-sidebar-accent rounded-lg -mt-1"
                                         )}
                                       >
                                         <SynthWave />
                                       </span>
                                     </div>
                <div className="">
                   
              <p className="font-semibold text-sm">
                {item.name}
              </p>
               <p className="text-foreground/80 mt-2 text-xs flex gap-2 items-center">
               <span>{item.storage}</span>
               <span className="h-1 w-1 rounded-full bg-gray-400"/>
               <span>{item.time}</span>
               </p>
                </div>
            </div>
            <div className="">
                <Download className="w-5"/>
                </div>
    
          </div>
        ))}
      </div>
    </div>
  );
}
