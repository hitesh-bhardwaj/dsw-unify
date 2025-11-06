import React from 'react'
import { TestingAnalyticsCard } from './testing-analytics-card'
import TestingGraph from './testing-graph'

const TestingAnalyticsComp = ({cardData, analytics,tab}) => {
  return (
    <>
      <div className="space-y-6">
          <div className="grid gap-6 grid-cols-4 h-fit">
            {cardData.map((card) => (
                <TestingAnalyticsCard cards={card} key={card.id} tab={tab} />
            ))}
          </div>
        
          <TestingGraph analytics={analytics} tab={tab}/>
        
      </div>
    </>
  )
}

export default TestingAnalyticsComp