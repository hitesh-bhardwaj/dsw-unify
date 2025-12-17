// import React, { useState } from "react";
// import { FeaturesIcon, HomeIcon, LeftArrow, TablesIcon } from "@/components/Icons";
// import { Button } from "@/components/ui/button";
// import { RippleButton } from "@/components/ui/ripple-button";
// import { Card, CardHeader } from "@/components/ui/card";
// import { Checkbox } from "@/components/ui/checkbox";
// import { cn } from "@/lib/utils";


// const featureServices = [
//   {
//     title:"Customer Demographics",
//     features:"15",
//     tables:"2"
//   },
//   {
//     title:"Transaction History",
//     features:"22",
//     tables:"3"
//   },
//   {
//     title:"Medical Records Summary",
//     features:"18",
//     tables:"2"
//   },
//   {
//     title:"User Behavior Metrics",
//     features:"12",
//     tables:"1"
//   },
//   {
//     title:"Product Analytics",
//     features:"8",
//     tables:"2"
//   },
// ]
// const SelectFeatureViews = ({goBack, isLastStep }) => {

//   return (
//     <div className="w-full h-full step-2">
//       <div className="py-4 px-2 w-full h-full">
//         <div className="space-y-2">
//           <h3 className="text-lg font-medium">Select Feature Views</h3>
//           <p className="text-sm text-foreground/80">
//            Choose the feature views to include in this service
//           </p>
//         </div>

//         <div className="space-y-6 py-8">

//           {featureServices.map((card,index)=>(
//           <Card
//           key={index}
//         className={cn(
//           "h-full transition-all duration-300 group py-4 w-[80%] rounded-md",
//           "cursor-pointer"
//         )}
//       >
//         <CardHeader className=" flex gap-4 items-start">
//             <Checkbox /> 
//           <div className="space-y-3">
//             <h3 className="text-sm font-medium leading-none tracking-tight transition-colors duration-300">
//             {card.title}
//             </h3>
//             <div className="flex items-center gap-4">
//               <div className="flex items-center gap-2">
//                 <div className="h-3 w-3">
//                 <FeaturesIcon/>
//                 </div>
//             <p className="text-xs text-muted-foreground line-clamp-2  transition-colors duration-300">
//               {card.features} features
//             </p>
//             </div>
//             <div className="flex items-center gap-2">
//                 <div className="h-3 w-3">
//                 <TablesIcon/>
//                 </div>
//             <p className="text-xs text-muted-foreground line-clamp-2  transition-colors duration-300">
//               {card.tables} Tables
//             </p>
//             </div>
//             </div>
//           </div>
//         </CardHeader>
//       </Card>
//         ))}

//        <Card
//         className={cn(
//           "h-full transition-all duration-300 group py-4 w-[80%] rounded-md",
//           "cursor-pointer"
//         )}
//       >
//         <CardHeader className=" flex flex-col gap-4 items-start">
//           <div className="space-y-3">
//             <h3 className="text-sm font-medium leading-none tracking-tight transition-colors duration-300">
//             Selected Feature Views
//             </h3>
//           </div>


//         <div className="flex items-center gap-2">
//             <p className="text-xs text-muted-foreground line-clamp-2  bg-sidebar-accent p-1 rounded-full px-5 transition-colors duration-300">
//               features
//             </p>
//             </div>

//         </CardHeader>
//       </Card>
//           <div className="w-full flex justify-end gap-2">
//             <RippleButton>
//               <Button
//                 variant="outline"
//                 className="gap-2 border-primary text-foreground hover:bg-gray-50 w-fit px-7"
//                 onClick={goBack}
//               >
//                 Back
//               </Button>
//             </RippleButton>
//             <RippleButton>
//               <Button
//                 className="bg-sidebar-primary hover:bg-[#E64A19] text-white gap-3 rounded-full !px-6 !py-6 !cursor-pointer duration-300"
//                 // onClick={handleNextOrSubmit}
//               >
//                 {isLastStep ? "Create Service" : "Next Step"}
//                 <div className="w-4 h-auto">
//                   <LeftArrow className="rotate-180" />
//                 </div>
//               </Button>
//             </RippleButton>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SelectFeatureViews;

import React, { useState } from "react";
import { FeaturesIcon, HomeIcon, LeftArrow, TablesIcon } from "@/components/Icons";
import { Button } from "@/components/ui/button";
import { RippleButton } from "@/components/ui/ripple-button";
import { Card, CardHeader } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";


const featureServices = [
  {
    title: "Customer Demographics",
    features: "15",
    tables: "2"
  },
  {
    title: "Transaction History",
    features: "22",
    tables: "3"
  },
  {
    title: "Medical Records Summary",
    features: "18",
    tables: "2"
  },
  {
    title: "User Behavior Metrics",
    features: "12",
    tables: "1"
  },
  {
    title: "Product Analytics",
    features: "8",
    tables: "2"
  },
]

const SelectFeatureViews = ({ goBack, isLastStep }) => {
  const [selectedServices, setSelectedServices] = useState([]);

  const toggleService = (service) => {
    setSelectedServices(prev => {
      const isSelected = prev.some(s => s.title === service.title);
      if (isSelected) {
        return prev.filter(s => s.title !== service.title);
      } else {
        return [...prev, service];
      }
    });
  };

  const isServiceSelected = (service) => {
    return selectedServices.some(s => s.title === service.title);
  };

  return (
    <div className="w-full h-full step-2">
      <div className="py-4 px-2 w-full h-full">
        <div className="space-y-2">
          <div className="flex items-center justify-between pr-5">
            <h3 className="text-lg font-medium">Select Feature Views</h3>
            <p className="text-sm text-foreground/70 flex items-center">
              {selectedServices.length > 0 && (
                <>
                  {selectedServices.length} {selectedServices.length === 1 ? 'view' : 'views'} selected
                  <span className="mx-2 h-1 w-1 rounded-full bg-foreground/60 block"/>
                  {selectedServices.reduce((sum, service) => sum + parseInt(service.features), 0)} total features
                </>
              )}
            </p>
          </div>
          <p className="text-sm text-foreground/80">
            Choose the feature views to include in this service
          </p>
        </div>

        <div className="space-y-6 py-8">

          {featureServices.map((card, index) => (
            <Card
              key={index}
              onClick={() => toggleService(card)}
              className={cn(
                "h-full transition-all duration-300 group py-4  rounded-md dark:bg-background",
                "cursor-pointer hover:border-primary",
                isServiceSelected(card) && "border-primary"
              )}
            >
              <CardHeader className=" flex gap-4 items-start">
                <Checkbox checked={isServiceSelected(card)} />
                <div className="space-y-3">
                  <h3 className="text-sm font-medium leading-none tracking-tight transition-colors duration-300">
                    {card.title}
                  </h3>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3">
                        <FeaturesIcon />
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-2  transition-colors duration-300">
                        {card.features} features
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3">
                        <TablesIcon />
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-2  transition-colors duration-300">
                        {card.tables} Tables
                      </p>
                    </div>
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))}

          <Card
            className={cn(
              "h-full transition-all duration-300 group py-4 rounded-md dark:bg-background"
            )}
          >
            <CardHeader className=" flex flex-col gap-4 items-start">
              <div className="space-y-3">
                <h3 className="text-sm font-medium leading-none tracking-tight transition-colors duration-300">
                  Selected Feature Views
                </h3>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                {selectedServices.length > 0 ? (
                  selectedServices.map((service, index) => (
                    <p key={index} className="text-xs text-muted-foreground line-clamp-2 bg-sidebar-accent p-1 rounded-full px-5 transition-colors duration-300">
                      {service.title}
                    </p>
                  ))
                ) : (
                  <p className="text-xs text-muted-foreground">No services selected</p>
                )}
              </div>

            </CardHeader>
          </Card>
          <div className="w-full flex justify-end gap-2">
            <RippleButton>
              <Button
                variant="outline"
                className="gap-2 border-primary text-foreground hover:bg-gray-50 w-fit px-7"
                onClick={goBack}
              >
                Back
              </Button>
            </RippleButton>
            <RippleButton>
              <Button
                className="bg-sidebar-primary hover:bg-[#E64A19] text-white gap-3 rounded-full !px-6 !py-6 !cursor-pointer duration-300"
              // onClick={handleNextOrSubmit}
              >
                {isLastStep ? "Create Service" : "Next Step"}
                <div className="w-4 h-auto">
                  <LeftArrow className="rotate-180" />
                </div>
              </Button>
            </RippleButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectFeatureViews;
