// import React from 'react'
// import { TestingAnalyticsCard } from './testing-analytics-card'

// /**
//  * Component to display testing analytics including cards and a graph.
//  *
//  * @param {Object} props - The component props.
//  * @param {Array<Object>} props.cardData - An array of data for the analytics cards.
//  * @param {Array<Object>} props.analytics - The data for the analytics graph.
//  * @param {string} props.tab - The current tab key.
//  * @returns {React.JSX.Element} The rendered TestingAnalyticsComp component.
//  */
// const TestingAnalyticsComp = ({cardData, analytics,tab}) => {
//   return (
//     <>
//       <div className="space-y-6">
//           <div className="grid gap-6 grid-cols-4 h-fit">
//             {cardData.map((card) => (
//                 <TestingAnalyticsCard cards={card} key={card.id} tab={tab} />
//             ))}
//           </div>
        
// <div className="rounded-3xl border border-border-color-0 p-6 space-y-6 bg-background">
//   {/* Header */}
//   <div className="space-y-1">
//     <h2 className="text-xl font-medium">Test Performance Over Time</h2>
//     <p className="text-sm text-muted-foreground">
//       Success rates and response times for recent test runs
//     </p>
//   </div>

//   {/* List */}
//   <div className="space-y-4">
//     {[
//       {
//         name: "Auto Claims Validation",
//         time: "10/12/2025, 15:54:52",
//         success: "100.0%",
//         duration: "0m 2s",
//       },
//       {
//         name: "Auto Claims Validation",
//         time: "10/12/2025, 15:52:23",
//         success: "50.0%",
//         duration: "0m 2s",
//       },
//       {
//         name: "Auto Claims Validation",
//         time: "10/12/2025, 15:54:52",
//         success: "100.0%",
//         duration: "0m 2s",
//       },
//     ].map((item, index) => (
//       <div
//         key={index}
//         className="flex items-center justify-between rounded-2xl border border-border-color-0 p-5 bg-background"
//       >
//         {/* Left */}
//         <div className="space-y-1">
//           <p className="text-base font-medium">{item.name}</p>
//           <p className="text-xs text-muted-foreground">{item.time}</p>
//         </div>

//         {/* Right */}
//         <div className="flex items-center gap-10 text-right">
//           <div className="space-y-1">
//             <p className="text-lg font-medium">{item.success}</p>
//             <p className="text-xs text-muted-foreground">Success Rate</p>
//           </div>

//           <div className="space-y-1">
//             <p className="text-lg font-medium">{item.duration}</p>
//             <p className="text-xs text-muted-foreground">Duration</p>
//           </div>
//         </div>
//       </div>
//     ))}
//   </div>
// </div>
        
//       </div>
//     </>
//   )
// }

// export default TestingAnalyticsComp



// TestingAnalyticsComp.jsx
import React from 'react';
import { TestingAnalyticsCard } from './testing-analytics-card';
import TestingGraph from './testing-graph';
import { cn } from '@/lib/utils';
import EmptyCard from '../common/EmptyCard';
import { Card, CardContent } from '../ui/card';

/**
 * Component to display testing analytics including cards and performance history.
 *
 * @param {Object} props - The component props.
 * @param {Array<Object>} props.cardData - An array of data for the analytics cards.
 * @param {Array<Object>} props.analytics - The data for the analytics graph.
 * @param {string} props.tab - The current tab key.
 * @param {Array<Object>} props.items - Array of test suites that have been run (hasRun: true).
 * @returns {React.JSX.Element} The rendered TestingAnalyticsComp component.
 */
const TestingAnalyticsComp = ({ cardData, analytics, tab, items = [] }) => {
  // Only show performance section if there are items that have been run
  const hasRunTests = items.length > 0;

  return (
    <>
      <div className="space-y-6">
        <div className="grid gap-6 grid-cols-4 h-fit">
          {cardData.map((card) => (
            <TestingAnalyticsCard cards={card} key={card.id} tab={tab} />
          ))}
        </div>

        {/* Show performance history only if tests have been run */}
        {hasRunTests && (
          <div className="rounded-3xl border border-border-color-0 p-6 space-y-6 bg-background dark:bg-card">
            {/* Header */}
            <div className="space-y-1">
              <h2 className="text-xl font-medium">Test Performance Over Time</h2>
              <p className="text-sm text-muted-foreground">
                Success rates and response times for recent test runs
              </p>
            </div>

            {/* List of test runs */}
            <div className="space-y-4">
              {items.map((item, index) => (
                <div
                  key={item.id || index}
                  className="flex items-center justify-between rounded-2xl border border-border-color-0 p-5 bg-background hover:bg-sidebar-accent/50 transition-colors duration-200 dark:bg-card"
                >
                  {/* Left - Test Info */}
                  <div className="space-y-1">
                    <p className="text-base font-medium">{item.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {item.lastRun} at {item.time}
                    </p>
                  </div>

                  {/* Right - Metrics */}
                  <div className="flex items-center gap-7 text-right">
                    <div className="space-y-1">
                      <p
                        className={cn(
                          "text-lg font-medium",
                        )}
                      >
                        {item.successRate}
                      </p>
                      <p className="text-xs text-muted-foreground">Success Rate</p>
                    </div>
                    {/* <div className="space-y-1">
                      <p className="text-lg font-medium">{item.lastRun}</p>
                      <p className="text-xs text-muted-foreground">Last Run</p>
                    </div> */}
                    <div className="space-y-1">
                      <p className="text-lg font-medium">0m 2s</p>
                      <p className="text-xs text-muted-foreground">Duration</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Show empty state if no tests have been run */}
        {!hasRunTests && (
          <Card className=' p-6 h-90'>
            <div className="space-y-1">
              <h2 className="text-xl font-medium">Test Performance Over Time</h2>
              <p className="text-sm text-muted-foreground">
                Success rates and response times for recent test runs
              </p>
            </div>
            <CardContent className='flex items-center justify-center h-full w-full'>
              <p className='text-sm text-muted-foreground'>No test data available yet. Run some tests to see analytics.</p>
            </CardContent>
          </Card>
          
        )}
      </div>
    </>
  );
};

export default TestingAnalyticsComp;