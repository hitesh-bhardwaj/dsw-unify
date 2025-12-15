import React from 'react'
import { TestingAnalyticsCard } from './testing-analytics-card'
import TestingGraph from './testing-graph'

/**
 * Component to display testing analytics including cards and a graph.
 *
 * @param {Object} props - The component props.
 * @param {Array<Object>} props.cardData - An array of data for the analytics cards.
 * @param {Array<Object>} props.analytics - The data for the analytics graph.
 * @param {string} props.tab - The current tab key.
 * @returns {React.JSX.Element} The rendered TestingAnalyticsComp component.
 */
const TestingAnalyticsComp = ({cardData, analytics,tab}) => {
  return (
    <>
      <div className="space-y-6">
          <div className="grid gap-6 grid-cols-4 h-fit">
            {cardData.map((card) => (
                <TestingAnalyticsCard cards={card} key={card.id} tab={tab} />
            ))}
          </div>
        
<div className="rounded-3xl border border-border-color-0 p-6 space-y-6 bg-background">
  {/* Header */}
  <div className="space-y-1">
    <h2 className="text-xl font-medium">Test Performance Over Time</h2>
    <p className="text-sm text-muted-foreground">
      Success rates and response times for recent test runs
    </p>
  </div>

  {/* List */}
  <div className="space-y-4">
    {[
      {
        name: "Auto Claims Validation",
        time: "10/12/2025, 15:54:52",
        success: "100.0%",
        duration: "0m 2s",
      },
      {
        name: "Auto Claims Validation",
        time: "10/12/2025, 15:52:23",
        success: "50.0%",
        duration: "0m 2s",
      },
      {
        name: "Auto Claims Validation",
        time: "10/12/2025, 15:54:52",
        success: "100.0%",
        duration: "0m 2s",
      },
    ].map((item, index) => (
      <div
        key={index}
        className="flex items-center justify-between rounded-2xl border border-border-color-0 p-5 bg-background"
      >
        {/* Left */}
        <div className="space-y-1">
          <p className="text-base font-medium">{item.name}</p>
          <p className="text-xs text-muted-foreground">{item.time}</p>
        </div>

        {/* Right */}
        <div className="flex items-center gap-10 text-right">
          <div className="space-y-1">
            <p className="text-lg font-medium">{item.success}</p>
            <p className="text-xs text-muted-foreground">Success Rate</p>
          </div>

          <div className="space-y-1">
            <p className="text-lg font-medium">{item.duration}</p>
            <p className="text-xs text-muted-foreground">Duration</p>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>
        
      </div>
    </>
  )
}

export default TestingAnalyticsComp