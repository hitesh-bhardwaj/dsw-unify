import React from 'react'
import { TestingAnalyticsCard } from './testing-analytics-card'
import TestingGraph from './testing-graph'

const TestingAnalyticsComp = ({cardData, analytics}) => {
  return (
    <>
    <div className="space-y-6">
                    <div className="grid gap-6 grid-cols-4 h-fit">
                        {cardData.map((card) => (
                            <TestingAnalyticsCard key={card.id} cards={card}/>
                        ))}
                    </div>
                    <TestingGraph analytics={analytics}/>
                    </div>
    </>
  )
}

export default TestingAnalyticsComp