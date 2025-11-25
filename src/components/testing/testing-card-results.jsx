// import { Card, CardContent, CardHeader } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { cn } from "@/lib/utils";
// import Link from "next/link";
// import { Eye } from "lucide-react";
// import { Button } from "../ui/button";

// export function TestingCardResults({ test }) {
//   const {
//     id,
//     name,
//     description,
//     tags = [],
//     tests,
//     date,
//     time,
//     width,
//     successRate,
//     variant = "light",
//   } = test;

//   const isDark = variant === "dark";

//   return (
//     <Link href={`/#`} className="block group">
//       <Card
//         className={cn(
//           "overflow-hidden  hover:shadow-xl cursor-pointer transition-all duration-500 ease-out bg-background border border-border-color-1 group-hover:bg-active-card group-hover:text-white group-hover:border-black !py-3 !pb-1",
//           // isDark
//           //   ? "bg-active-card text-white border-black"
//           //   : "bg-background border border-border-color-1"
//         )}
//       >
//         <CardHeader className="">

//           <div className="flex items-center w-full justify-between">
//             <div className="space-y-3">
//             <div className="flex items-center gap-[3vw] mt-4">
//     {/* Agent name */}
//           <h3 className="text-xl font-medium text-black group-hover:text-white transition-all duration-500 ease-out ">{name}</h3>
//       <div className=" flex flex-wrap gap-1">
//             {tags.map((tag, index) => (
//               <Badge
//                 key={index}
//                 variant="secondary"
//                 className={cn(
//                   "rounded-full px-3.5 py-1 text-xs font-normal",
//                   tag.color === "yellow" &&
//                     "bg-badge-yellow text-foreground group-hover:bg-background group-hover:text-black transition-all duration-500 ease-out ",
//                   tag.color === "blue" && "bg-badge-blue text-white group-hover:bg-background group-hover:text-black transition-all duration-500 ease-out ",
//                   tag.color === "green" && "bg-badge-green text-white group-hover:bg-background group-hover:text-black transition-all duration-500 ease-out ",
//                   tag.color === "orange" && "bg-primary  text-white group-hover:bg-background group-hover:text-black transition-all duration-500 ease-out ",
//                   tag.color === "red" && "bg-red-500 text-white group-hover:bg-background group-hover:text-black transition-all duration-500 ease-out ",
//                   // !tag.color && isDark && "bg-background text-foreground",
//                   // !tag.color && !isDark && "bg-gray-100 text-gray-800"
//                 )}
//               >
//                 {tag.label}
//               </Badge>
//             ))}
//           </div>
// </div>

//           {/* Description */}
//           <p className={cn("text-sm text-gray-600 group-hover:text-white transition-all duration-500 ease-out ")}>
//             {description}
//           </p>
//           </div>
//             <div className="flex items-center gap-2">
//                 <Button
//                               variant="ghost"
//                               size="icon"
//                               className={cn(
//                                 "h-7 w-7 flex items-center justify-center px-1 py-1 text-badge-blue hover:bg-stone-700 group-hover:text-white  ",)}
//                             >
//                               <Eye/>
//                             </Button>
//             </div>
//           </div>

//         </CardHeader>

//         <CardContent>
//             <div>
//                 <div className="space-y-4">
//                 <div className="flex items-center justify-between text-sm font-medium">
// <div className="space-x-1">
//     <span className="text-primary">Tests:</span>
//     <span>{tests}</span>
// </div>
// <div className="space-x-1">
//     <span className="text-primary">{successRate}</span>
//     <span>Success Rate</span>
// </div>
//                 </div>
//                 <div className="w-full bg-gray-200 rounded-full h-2 relative">
//                     <span className={`bg-primary h-full absolute top-0 left-0 z-[5] rounded-full ${width}`}/>
//                 </div>
//                 </div>

//           <div
//             className={cn(
//               "flex items-end justify-end p-3 text-sm py-6 group-hover:text-white",

//             )}
//           >
//             <div className="flex items-center gap-1">
//               <span>
//                Run on
//               </span>
//               <span>{date},</span>
//               <span>{time}</span>
//             </div>
//           </div>
//           </div>
//         </CardContent>
//       </Card>
//     </Link>
//   );
// }
"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Eye } from "lucide-react";
import { Button } from "../ui/button";
// import { motion, useAnimationControls, useInView } from "motion";
import { useRef } from "react";
import AnimatedProgressBar from "../animations/ProgressBar";

export function TestingCardResults({ test ,tab}) {
  const {
    id,
    name,
    description,
    tags = [],
    tests,
    date,
    time,
    width,
    successRate,
    variant = "light",
  } = test;

// console.log(tab)


  // ---- Animate when visible ----
  const ref = useRef(null);
 

  return (
    <Link href={`/#`} className="block group" aria-label={`${name} test card`}>
      <Card
        className={cn(
           "overflow-hidden group hover:shadow-xl cursor-pointer transition-all duration-500 ease-out bg-background border border-border-color-1 hover:bg-sidebar-accent group-hover:bg-active-card dark:group-hover:bg-sidebar-accent group-hover:text-white group-hover:border-border-color-1 !py-5 h-full"
        )}
      >
        <CardHeader>
          <div className="flex items-center w-full justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-[3vw] mt-4">
                {/* Agent name */}
                <h3 className="text-xl font-medium text-black dark:text-white transition-all duration-500 ease-out">
                  {name}
                </h3>

                {/* Tags */}
                <div className="flex flex-wrap gap-1">
                  {tags.map((tag, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className={cn(
                           "rounded-full border border-color-2 px-3 py-1 bg-white dark:bg-background text-xs font-light transition-all duration-500 ease-out dark:group-hover:bg-background"
                      )}
                    >
                      {tag.label}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-foreground/80 transition-all duration-500 ease-out">
                {description}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 flex items-center justify-center px-1 py-1 text-badge-blue hover:bg-white "
                aria-label="View"
              >
                <Eye />
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div ref={ref}>
            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm font-medium">
                <div className="space-x-1">
                  <span className="text-primary">Tests:</span>
                  <span className="text-black dark:text-white">{tests}</span>
                </div>
                <div className="space-x-1 text-black dark:text-white">
                  <span className="text-primary">
                    {typeof successRate === "number"
                      ? `${successRate}%`
                      : successRate}
                  </span>
                  <span>Success Rate</span>
                </div>
              </div>

              {/* Animated Progress Bar */}

              <AnimatedProgressBar
                value={width} // 65 or "65%"
                duration={1.2}
                ease="easeInOut"
                animateOnMount
                playKey={tab}
                className="w-full"
                trackClassName="w-full bg-gray-200 rounded-full h-2 relative overflow-hidden"
                barClassName="bg-primary h-full absolute top-0 left-0 z-[5] rounded-full"
              />
            </div>

            <div className="flex items-end justify-end p-3 text-sm py-6 group-hover:text-white">
              <div className="flex items-center gap-1 text-black dark:text-white">
                <span>Run on</span>
                <span>{date},</span>
                <span>{time}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
